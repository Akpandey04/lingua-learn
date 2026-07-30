from sqlalchemy import String, Integer, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import BaseModel
import uuid

class Language(BaseModel):
    __tablename__ = "languages"
    
    code: Mapped[str] = mapped_column(String, unique=True, index=True) # e.g. "fr"
    name: Mapped[str] = mapped_column(String)
    
    courses: Mapped[list["Course"]] = relationship("Course", back_populates="language")

class Course(BaseModel):
    __tablename__ = "courses"
    
    language_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("languages.id"), index=True)
    level: Mapped[str] = mapped_column(String) # e.g. "A1"
    
    language: Mapped["Language"] = relationship("Language", back_populates="courses")
    units: Mapped[list["Unit"]] = relationship("Unit", back_populates="course", cascade="all, delete-orphan")

class Unit(BaseModel):
    __tablename__ = "units"
    
    course_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("courses.id"), index=True)
    title: Mapped[str] = mapped_column(String)
    order_index: Mapped[int] = mapped_column(Integer)
    
    course: Mapped["Course"] = relationship("Course", back_populates="units")
    lessons: Mapped[list["Lesson"]] = relationship("Lesson", back_populates="unit", cascade="all, delete-orphan")

class Lesson(BaseModel):
    __tablename__ = "lessons"
    
    unit_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("units.id"), index=True)
    title: Mapped[str] = mapped_column(String)
    order_index: Mapped[int] = mapped_column(Integer)
    
    unit: Mapped["Unit"] = relationship("Unit", back_populates="lessons")
    vocabulary: Mapped[list["Vocabulary"]] = relationship("Vocabulary", back_populates="lesson", cascade="all, delete-orphan")
    exercises: Mapped[list["Exercise"]] = relationship("Exercise", back_populates="lesson", cascade="all, delete-orphan")
    quizzes: Mapped[list["Quiz"]] = relationship("Quiz", back_populates="lesson", cascade="all, delete-orphan")

class Vocabulary(BaseModel):
    __tablename__ = "vocabulary"
    
    lesson_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("lessons.id"), index=True)
    term: Mapped[str] = mapped_column(String)
    translation: Mapped[str] = mapped_column(String)
    
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="vocabulary")

class Exercise(BaseModel):
    __tablename__ = "exercises"
    
    lesson_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("lessons.id"), index=True)
    type: Mapped[str] = mapped_column(String)
    data: Mapped[dict] = mapped_column(JSON)
    
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="exercises")

class Quiz(BaseModel):
    __tablename__ = "quizzes"
    
    lesson_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("lessons.id"), index=True)
    questions: Mapped[dict] = mapped_column(JSON)
    
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="quizzes")
