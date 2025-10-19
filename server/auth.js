// server/auth.js
// Authentication routes and token middleware for Save the Reef
// Handles user registration, login, and JWT verification.

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pool from "./utils/db.js"; // Assumes a Postgres Pool exported from utils/db.js

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_in_env";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

/**
 * Registers a new user.
 * Expects: { username, email, password }
 */
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email and password are required" });
    }

    // Check for existing user
    const { rows: existing } = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password and insert
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const insertQuery = `
      INSERT INTO users (username, email, password_hash, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, username, email
    `;
    const { rows } = await pool.query(insertQuery, [username, email, hashed]);
    const user = rows[0];

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Account created", user, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Login endpoint.
 * Expects: { email, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const { rows } = await pool.query("SELECT id, username, email, password_hash FROM users WHERE email = $1", [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Middleware: verify token and attach user payload to req.user
 * Expects Authorization: Bearer <token>
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) return res.status(401).json({ error: "Authorization header required" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Invalid authorization format" });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default router;
