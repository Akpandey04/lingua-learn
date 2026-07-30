from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
import uuid

# Base models for standard responses
class LanguageResponse(BaseModel):
    id: uuid.UUID
    code: str
    name: str

    model_config = ConfigDict(from_attributes=True)

class UnitResponse(BaseModel):
    id: uuid.UUID
    course_id: uuid.UUID
    title: str
    order_index: int

    model_config = ConfigDict(from_attributes=True)

class CourseResponse(BaseModel):
    id: uuid.UUID
    language_id: uuid.UUID
    level: str
    
    model_config = ConfigDict(from_attributes=True)

class CourseDetailResponse(CourseResponse):
    language: LanguageResponse
    units: List[UnitResponse]

    model_config = ConfigDict(from_attributes=True)

class LessonResponse(BaseModel):
    id: uuid.UUID
    unit_id: uuid.UUID
    title: str
    order_index: int

    model_config = ConfigDict(from_attributes=True)

class VocabularyResponse(BaseModel):
    id: uuid.UUID
    lesson_id: uuid.UUID
    term: str
    translation: str

    model_config = ConfigDict(from_attributes=True)

class ExerciseResponse(BaseModel):
    id: uuid.UUID
    lesson_id: uuid.UUID
    type: str
    data: Dict[str, Any]

    model_config = ConfigDict(from_attributes=True)

class QuizResponse(BaseModel):
    id: uuid.UUID
    lesson_id: uuid.UUID
    questions: Dict[str, Any]

    model_config = ConfigDict(from_attributes=True)
