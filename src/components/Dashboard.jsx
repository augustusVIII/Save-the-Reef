// src/components/Dashboard.jsx
// Coral reef dashboard: displays latest uploads and reef health data.

import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("/api/reefs/recent");
        setUploads(res.data || []);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUploads();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Reef Health Dashboard</h1>

      {loading ? (
        <p>Loading reef data...</p>
      ) : uploads.length === 0 ? (
        <p>No recent reef updates available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploads.map((reef) => (
            <div
              key={reef.id}
              className="bg-white rounded-xl shadow p-4 border border-gray-100 hover:shadow-md transition"
            >
              <img
                src={reef.image_url}
                alt={reef.site_name}
                className="rounded-lg mb-3 w-full h-40 object-cover"
              />
              <h2 className="font-medium text-lg">{reef.site_name}</h2>
              <p className="text-gray-500 text-sm">
                {reef.latitude.toFixed(2)}, {reef.longitude.toFixed(2)}
              </p>
              <p className="text-gray-700 mt-1 text-sm">{reef.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
