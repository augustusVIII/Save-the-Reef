import React from "react";
import ReefMap from "../components/ReefMap";
import Dashboard from "../components/Dashboard";

export default function Explore() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-8">
      <h2 className="text-3xl font-semibold text-sky-700 mb-6">Explore Reefs</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-2xl shadow-sm p-4">
          <ReefMap />
        </div>
        <div className="border rounded-2xl shadow-sm p-4">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
