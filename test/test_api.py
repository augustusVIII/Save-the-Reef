import requests
import pytest

BASE_URL = "http://localhost:5000"

def test_login_endpoint():
    payload = {"email": "diver@example.com", "password": "reef123"}
    response = requests.post(f"{BASE_URL}/auth/login", json=payload)
    assert response.status_code == 200
    assert "token" in response.json()

def test_upload_endpoint():
    files = {"reefImage": open("sample_reef.jpg", "rb")}
    data = {"latitude": "16.07", "longitude": "108.23", "notes": "Healthy coral"}
    response = requests.post(f"{BASE_URL}/upload", files=files, data=data)
    assert response.status_code == 200
    assert "file" in response.json()
