import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import UploadForm from "./components/UploadForm";
import "./styles/tailwind.css";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-sky-700">Save the Reef</h1>
            <nav className="flex gap-6 text-sky-700">
              <a href="/">Home</a>
              <a href="/explore">Explore</a>
              <a href="/upload">Upload</a>
              <a href="/about">About</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="bg-sky-50 border-t border-sky-100 py-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Save the Reef — Built with ❤️ for our oceans</p>
        </footer>
      </div>
    </Router>
  );
}
