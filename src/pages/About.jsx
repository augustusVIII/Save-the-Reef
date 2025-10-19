import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-gray-800 px-8 py-12">
      <h2 className="text-3xl font-semibold text-sky-700 mb-4">About Save the Reef</h2>
      <p className="text-lg leading-relaxed max-w-3xl mb-6">
        Save the Reef is an open-source platform dedicated to connecting the diving
        community and researchers through real-time coral reef data. By combining
        geotagged images, satellite inputs, and AI-driven analysis, we aim to help
        monitor and protect coral ecosystems worldwide.
      </p>
      <p className="text-lg leading-relaxed max-w-3xl">
        This project is built by a passionate community of developers, scientists,
        and ocean advocates who believe in the power of open collaboration for
        environmental impact.
      </p>
    </div>
  );
}
