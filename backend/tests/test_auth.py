from fastapi.testclient import TestClient
from app.main import app
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.api.v1.auth import get_auth_service
from app.schemas.auth import UserResponse, TokenResponse
from app.models.user import User
from fastapi import HTTPException
import uuid

client = TestClient(app)

# Mock get_db
async def override_get_db():
    yield None

app.dependency_overrides[get_db] = override_get_db

# Mock AuthService
class MockAuthService:
    async def register(self, user_in):
        if user_in.email == "duplicate@test.com":
            raise HTTPException(status_code=409, detail="Email already registered")
        return UserResponse(id=uuid.uuid4(), email=user_in.email, is_guest=False)
    
    async def login(self, login_in):
        if login_in.password == "wrongpass":
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        if login_in.email == "invalid@test.com":
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        return TokenResponse(access_token="mock_token", refresh_token="mock_refresh")

    async def create_guest(self):
        return TokenResponse(access_token="mock_guest_token", refresh_token="mock_guest_refresh")

    async def logout(self, user):
        pass

def override_get_auth_service():
    return MockAuthService()

app.dependency_overrides[get_auth_service] = override_get_auth_service

# Mock get_current_user
async def override_get_current_user():
    return User(id=uuid.uuid4(), email="test@test.com", is_guest=False)

app.dependency_overrides[get_current_user] = override_get_current_user

# --- TESTS ---

def test_register_success():
    response = client.post("/api/v1/auth/register", json={"email": "test@test.com", "password": "validpassword"})
    assert response.status_code == 201
    assert response.json()["success"] == True

def test_register_duplicate():
    response = client.post("/api/v1/auth/register", json={"email": "duplicate@test.com", "password": "validpassword"})
    assert response.status_code == 409
    assert response.json()["error"]["message"] == "Email already registered"

def test_register_invalid_email():
    response = client.post("/api/v1/auth/register", json={"email": "not-an-email", "password": "validpassword"})
    assert response.status_code == 422 # Pydantic validation error
    assert response.json()["success"] == False

def test_register_invalid_password_length():
    response = client.post("/api/v1/auth/register", json={"email": "test@test.com", "password": "short"})
    assert response.status_code == 422 # Pydantic validation error
    assert response.json()["success"] == False

def test_login_success():
    response = client.post("/api/v1/auth/login", json={"email": "test@test.com", "password": "validpassword"})
    assert response.status_code == 200
    assert "access_token" in response.json()["data"]

def test_login_invalid_password():
    response = client.post("/api/v1/auth/login", json={"email": "test@test.com", "password": "wrongpass"})
    assert response.status_code == 401
    assert response.json()["success"] == False

def test_login_invalid_email():
    response = client.post("/api/v1/auth/login", json={"email": "invalid@test.com", "password": "validpassword"})
    assert response.status_code == 401
    assert response.json()["success"] == False

def test_get_me():
    # Since we mocked get_current_user, we don't need a real Authorization header here for the mock to work
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 200
    assert response.json()["data"]["email"] == "test@test.com"

def test_unauthorized_access():
    # Remove the override temporarily to test the real dependency behavior without a token
    app.dependency_overrides.pop(get_current_user)
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401
    # Restore the override
    app.dependency_overrides[get_current_user] = override_get_current_user
