<img width="987" height="374" alt="image" src="https://github.com/user-attachments/assets/30f00d39-a97e-44aa-8d40-bd688c9458ae" />🌊 Save the Reef

An open-source platform for divers and researchers to upload, analyze, and visualize coral reef data through geotagged images and AI-powered health monitoring.

🎯 Features

Image Upload Portal: Divers can upload coral reef photos with automatic GPS tagging

AI Integration: Connects to Coral Reef Health Monitoring System for real-time coral health analysis

Interactive Map Dashboard: Visualizes reef health conditions across global dive locations

Open Data Access: Provides public API for NGOs and researchers to access coral datasets

Community Collaboration: Supports open contributions from divers, students, and scientists

🗺️ Platform Workflow

Divers Upload Images → through web interface or mobile portal

Backend Processing → stores image and metadata (date, GPS, diver ID)

AI Model Integration → performs disease and bleaching detection

Database Storage → results and metadata saved to PostgreSQL + PostGIS

Dashboard Display → visualizes coral health status and trends

🚀 Installation
Prerequisites

Python 3.9+

Node.js 18+

PostgreSQL with PostGIS extension

AWS S3 or DigitalOcean Spaces account (for image storage)

1️⃣ Clone the Repository
git clone https://github.com/yourusername/save-the-reef.git
cd save-the-reef

2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

💻 Core Components
Component	Description
backend/main.py	FastAPI entry point handling requests and routes
backend/routers/upload.py	Handles image upload and metadata
backend/services/ai_integration.py	Connects to YOLO11m detection API
frontend/src/App.js	Main web interface for divers and researchers
frontend/src/components/MapView.jsx	Displays reef health heatmap
docs/api-reference.md	REST API endpoints and response formats
📊 Architecture

Save the Reef follows a modular, service-oriented architecture:

The React-based frontend allows divers to upload geotagged reef images and explore reef health data through an interactive map. The FastAPI backend manages user authentication, image storage, and AI analysis requests. Images and coral health metadata are stored in a PostgreSQL + PostGIS database, while processed results are visualized through the dashboard. The platform integrates directly with the Coral Reef Health Monitoring System for AI-based coral disease detection and stores all media in cloud storage (AWS S3 / DigitalOcean Spaces).

🌐 API Endpoints (Preview)
Endpoint	Method	Description
/upload	POST	Uploads coral reef image and metadata
/reefs	GET	Retrieves all reef entries
/reefs/{id}	GET	Gets specific reef data
/stats/global	GET	Returns global coral health statistics
/auth/register	POST	User registration
/auth/login	POST	User login and authentication
📦 Data Model
Field	Type	Description
id	UUID	Unique reef entry ID
image_url	String	Cloud storage link
latitude	Float	Image geolocation
longitude	Float	Image geolocation
status	String	Coral health result (Healthy, Bleached, Diseased)
confidence	Float	AI model confidence score
uploaded_by	String	Diver or user ID
timestamp	Datetime	Upload date and time
🔧 Configuration

Edit .env file or config.py to customize:

Database credentials

AI model API URL

Cloud storage keys

Map display options

🧠 Integration with Coral Reefs Health Monitoring System

Model Used: YOLO11m

Communication: REST API with JSON response

Returned Data: Coral class, confidence score, bounding boxes

Update Frequency: On upload or scheduled reanalysis

🧩 Future Roadmap

 Mobile app support for underwater uploads

 Community leaderboard for top contributors

 Integration with environmental sensors (temperature, pH)

 Public dataset export for research institutions

 AI feedback loop for model retraining

📝 License

This project is licensed under the MIT License — see the LICENSE file for details.

🤝 Contributing

Fork this repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📞 Support

For support, feedback, or collaboration:

Open an issue on GitHub

Review the documentation in docs/

Contact via project email or community Slack

🌊 Join the mission — upload, analyze, and protect our coral reefs. 🐚
