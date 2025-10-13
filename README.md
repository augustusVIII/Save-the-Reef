# 🌊 Save the Reef
**An open-source coral data platform connecting divers, researchers, and AI.**

Save the Reef is a community-driven web platform that allows divers to upload **geotagged reef images**, contributing to a global coral health database.  
The system integrates with the [Coral Reefs Health Monitoring System](https://github.com/augustusVIII/coral_disease_detection) to enhance **AI-based coral disease detection** and promote **data transparency in marine conservation**.

---

## 🚀 Project Overview

**Goal:**  
Empower citizen scientists and researchers to collaboratively monitor coral reefs through open data and machine learning.

**Core Features (Planned):**
- 📸 Upload reef images with automatic GPS tagging  
- 🧠 Integrate with the Coral Health AI model for live coral condition analysis  
- 🗺️ Interactive dashboard visualizing reef health across locations  
- 🌐 Open API for researchers and NGOs to access coral data

---

## 🧩 Architecture
The platform uses a modular design combining a React frontend, a FastAPI backend, and a PostgreSQL + PostGIS database. Uploaded reef images are analyzed by a YOLO11m AI model for disease detection, then stored with geolocation data in cloud storage. Results are visualized through an interactive dashboard and shared via an open API for researchers and conservation groups.

