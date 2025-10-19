// server/upload.js
// Image upload and metadata endpoint for Save the Reef
// Accepts image files and associated geolocation + metadata, stores file and creates a DB record.

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import pool from "./utils/db.js"; // Assumes a Postgres Pool exported from utils/db.js

const router = express.Router();

// Ensure uploads directory exists
const UPLOAD_DIR = path.resolve("uploads");
fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(() => { /* ignore errors here */ });

// Multer storage configuration (file system)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
    cb(null, `${timestamp}-${Math.round(Math.random() * 1e6)}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg files are allowed"));
    }
  }
});

/**
 * POST /upload
 * Form-data fields:
 *  - reefImage (file)
 *  - latitude (string/number)
 *  - longitude (string/number)
 *  - notes (optional)
 *  - dive_site (optional)
 *
 * Requires authenticated user (expects req.user from verifyToken middleware)
 */
router.post("/", upload.single("reefImage"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "Image file is required" });

    const { latitude, longitude, notes = null, dive_site = null } = req.body;

    // Basic validation of coordinates
    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);
    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      // Remove uploaded file if metadata invalid
      await fs.unlink(path.join(UPLOAD_DIR, file.filename)).catch(() => {});
      return res.status(400).json({ error: "Valid latitude and longitude are required" });
    }

    // Insert record into reef_images table with PostGIS point (assuming table exists)
    const insertQuery = `
      INSERT INTO reef_images (user_id, filename, filepath, notes, dive_site, geom, created_at)
      VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326), NOW())
      RETURNING id, filename, created_at
    `;
    // If req.user present (from verifyToken), use user id; otherwise null
    const userId = req.user?.id || null;

    const { rows } = await pool.query(insertQuery, [userId, file.filename, path.join(UPLOAD_DIR, file.filename), notes, dive_site, lonNum, latNum]);
    const record = rows[0];

    res.status(201).json({
      message: "Image uploaded successfully",
      image: {
        id: record.id,
        filename: record.filename,
        url: `/uploads/${record.filename}`,
        uploaded_at: record.created_at
      },
      location: { latitude: latNum, longitude: lonNum }
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to process upload" });
  }
});

export default router;
