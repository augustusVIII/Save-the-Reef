# Save-the-Reef
Open Source Coral Data Platform

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
 Divers / Users
      │
      ▼
 ┌────────────────────────────┐
 │  Frontend (React / Next.js)│
 │  • Upload reef images      │
 │  • View interactive map    │
 │  • Track reef health stats │
 └────────────┬───────────────┘
              │ REST / WebSocket API
              ▼
 ┌────────────────────────────┐
 │  Backend (FastAPI)         │
 │  • Handles authentication  │
 │  • Stores reef data (PostgreSQL + PostGIS) │
 │  • Integrates with AI model │
 └────────────┬───────────────┘
              │
              ▼
 ┌────────────────────────────┐
 │  AI Model API (YOLO11m)    │
 │  • Analyzes coral images   │
 │  • Detects bleaching & disease │
 │  • Returns annotated results │
 └────────────┬───────────────┘
              │
              ▼
 ┌────────────────────────────┐
 │  Cloud Storage (S3 / Spaces)│
 │  • Stores raw & processed images │
 │  • Provides public data access for researchers │
 └────────────────────────────┘

