from fastapi.testclient import TestClient
from app.main import app
from app.core.database import get_db

client = TestClient(app)

async def mock_get_db():
    yield None

app.dependency_overrides[get_db] = mock_get_db

def test_health_check_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["ok", "degraded"]
    assert "version" in data
    assert "uptime" in data
    assert data["api_version"] == "v1"
