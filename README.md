# 🌊 Save the Reef

An open-source platform for divers and researchers to upload, analyze, and visualize coral reef data through geotagged images and AI-powered health monitoring.

---

## 🎯 Features

- **Image Upload Portal**: Divers can upload coral reef photos with automatic GPS tagging  
- **AI Integration**: Connects to *Coral Reef Health Monitoring System* for real-time coral health analysis  
- **Interactive Map Dashboard**: Visualizes reef health conditions across global dive locations  
- **Open Data Access**: Provides public API for NGOs and researchers to access coral datasets  
- **Community Collaboration**: Supports open contributions from divers, students, and scientists  

---

## 🗺️ Platform Workflow

1. **Divers Upload Images** → through web interface or mobile portal  
2. **Backend Processing** → stores image and metadata (date, GPS, diver ID)  
3. **AI Model Integration** → performs disease and bleaching detection  
4. **Database Storage** → results and metadata saved to PostgreSQL + PostGIS  
5. **Dashboard Display** → visualizes coral health status and trends  

---

## 🚀 Installation

### Prerequisites
- Python 3.9+  
- Node.js 18+  
- PostgreSQL with PostGIS extension  
- AWS S3 or DigitalOcean Spaces account (for image storage)  

---

### 1️⃣ Clone the Repository
```bash
git clone https: https://github.com/augustusVIII/Save-the-Reef
cd save-the-reef

