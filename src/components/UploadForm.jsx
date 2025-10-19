// src/components/UploadForm.jsx
// Upload form for divers to submit reef images with geolocation metadata.

import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    notes: "",
    dive_site: ""
  });
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setStatus("Please select an image before submitting.");

    const data = new FormData();
    data.append("reefImage", image);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("notes", formData.notes);
    data.append("dive_site", formData.dive_site);

    try {
      setStatus("Uploading...");
      const res = await axios.post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setStatus(`Upload successful: ${res.data.image.filename}`);
      setFormData({ latitude: "", longitude: "", notes: "", dive_site: "" });
      setImage(null);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload Reef Observation</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg bg-white p-6 rounded-xl shadow-md border border-gray-100"
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Reef Image</label>
          <input type="file" onChange={handleImageChange} className="w-full" required />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Dive Site</label>
          <input
            type="text"
            name="dive_site"
            value={formData.dive_site}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            placeholder="e.g., Hon Mun Reef"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows="3"
            placeholder="Describe coral condition, fish species, etc."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
        >
          Submit
        </button>

        {status && <p className="mt-3 text-gray-600">{status}</p>}
      </form>
    </div>
  );
};

export default UploadForm;
