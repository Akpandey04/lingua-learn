from fastapi.testclient import TestClient
from fastapi import HTTPException
import uuid
import pytest

from app.main import app
from app.api.v1.languages import get_language_service
from app.api.v1.courses import get_course_service
from app.api.v1.lessons import get_lesson_service
from app.schemas.course import (
    LanguageResponse, CourseResponse, CourseDetailResponse,
    UnitResponse, LessonResponse, VocabularyResponse,
    ExerciseResponse, QuizResponse
)

client = TestClient(app)

# Mocks
mock_uuid = uuid.uuid4()

class MockLanguageService:
    async def get_all(self):
        return [LanguageResponse(id=mock_uuid, code="fr", name="French")]
    
    async def get_by_id(self, id: uuid.UUID):
        if str(id) == str(uuid.UUID(int=0)):
            raise HTTPException(status_code=404, detail="Language not found")
        return LanguageResponse(id=id, code="fr", name="French")

class MockCourseService:
    async def get_all(self):
        return [CourseResponse(id=mock_uuid, language_id=mock_uuid, level="A1")]
    
    async def get_by_id(self, id: uuid.UUID):
        if str(id) == str(uuid.UUID(int=0)):
            raise HTTPException(status_code=404, detail="Course not found")
        lang = LanguageResponse(id=mock_uuid, code="fr", name="French")
        units = [UnitResponse(id=mock_uuid, course_id=id, title="Unit 1", order_index=1)]
        return CourseDetailResponse(id=id, language_id=mock_uuid, level="A1", language=lang, units=units)

    async def get_unit(self, id: uuid.UUID):
        if str(id) == str(uuid.UUID(int=0)):
            raise HTTPException(status_code=404, detail="Unit not found")
        return UnitResponse(id=id, course_id=mock_uuid, title="Unit 1", order_index=1)

class MockLessonService:
    async def get_lesson(self, id: uuid.UUID):
        if str(id) == str(uuid.UUID(int=0)):
            raise HTTPException(status_code=404, detail="Lesson not found")
        return LessonResponse(id=id, unit_id=mock_uuid, title="Lesson 1", order_index=1)

    async def get_vocabulary(self, id: uuid.UUID):
        await self.get_lesson(id) # Check 404
        return [VocabularyResponse(id=mock_uuid, lesson_id=id, term="Bonjour", translation="Hello")]

    async def get_exercises(self, id: uuid.UUID):
        await self.get_lesson(id)
        return [ExerciseResponse(id=mock_uuid, lesson_id=id, type="mcq", data={})]

    async def get_quizzes(self, id: uuid.UUID):
        await self.get_lesson(id)
        return [QuizResponse(id=mock_uuid, lesson_id=id, questions={})]

# Overrides
app.dependency_overrides[get_language_service] = lambda: MockLanguageService()
app.dependency_overrides[get_course_service] = lambda: MockCourseService()
app.dependency_overrides[get_lesson_service] = lambda: MockLessonService()


def test_get_languages():
    response = client.get("/api/v1/languages")
    assert response.status_code == 200
    assert response.json()["success"] == True
    assert len(response.json()["data"]) == 1

def test_get_language_by_id():
    response = client.get(f"/api/v1/languages/{mock_uuid}")
    assert response.status_code == 200
    assert response.json()["data"]["id"] == str(mock_uuid)

def test_get_language_404():
    response = client.get(f"/api/v1/languages/{uuid.UUID(int=0)}")
    assert response.status_code == 404
    assert response.json()["error"]["message"] == "Language not found"

def test_get_courses():
    response = client.get("/api/v1/courses")
    assert response.status_code == 200

def test_get_course_by_id():
    response = client.get(f"/api/v1/courses/{mock_uuid}")
    assert response.status_code == 200
    assert "units" in response.json()["data"]
    assert "language" in response.json()["data"]

def test_get_unit_by_id():
    response = client.get(f"/api/v1/courses/units/{mock_uuid}")
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Unit 1"

def test_get_lesson_by_id():
    response = client.get(f"/api/v1/lessons/{mock_uuid}")
    assert response.status_code == 200

def test_get_vocabulary():
    response = client.get(f"/api/v1/lessons/{mock_uuid}/vocabulary")
    assert response.status_code == 200
    assert response.json()["data"][0]["term"] == "Bonjour"

def test_get_exercises():
    response = client.get(f"/api/v1/lessons/{mock_uuid}/exercises")
    assert response.status_code == 200
    assert response.json()["data"][0]["type"] == "mcq"

def test_get_quizzes():
    response = client.get(f"/api/v1/lessons/{mock_uuid}/quiz")
    assert response.status_code == 200

def test_lesson_not_found_cascades_to_relations():
    response = client.get(f"/api/v1/lessons/{uuid.UUID(int=0)}/vocabulary")
    assert response.status_code == 404

def test_invalid_uuid():
    response = client.get("/api/v1/languages/invalid-uuid-string")
    assert response.status_code == 422 # Pydantic validation failure on UUID path param
