// src/components/ReefMap.jsx
// Interactive reef visualization using LeafletJS.

import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const ReefMap = ({ reefs = [] }) => {
  useEffect(() => {
    const map = L.map("reef-map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    reefs.forEach((reef) => {
      const marker = L.marker([reef.latitude, reef.longitude]).addTo(map);
      marker.bindPopup(
        `<strong>${reef.site_name}</strong><br/>
         Lat: ${reef.latitude.toFixed(2)}<br/>
         Lon: ${reef.longitude.toFixed(2)}`
      );
    });

    return () => {
      map.remove();
    };
  }, [reefs]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Reef Map</h1>
      <div
        id="reef-map"
        className="w-full h-[70vh] rounded-xl shadow-md border border-gray-200"
      ></div>
    </div>
  );
};

export default ReefMap;
