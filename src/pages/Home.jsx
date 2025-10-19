import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800 px-6">
      <h1 className="text-4xl font-bold text-sky-700 mb-4">Save the Reef</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        A global platform for divers, researchers, and ocean lovers to upload,
        visualize, and monitor coral reef health through open data collaboration.
      </p>

      <div className="flex gap-4">
        <Link
          to="/explore"
          className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-xl transition"
        >
          Explore Reefs
        </Link>
        <Link
          to="/upload"
          className="border border-sky-600 text-sky-600 hover:bg-sky-50 px-5 py-2 rounded-xl transition"
        >
          Upload Data
        </Link>
      </div>
    </main>
  );
}
