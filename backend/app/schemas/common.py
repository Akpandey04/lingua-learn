from typing import Any, Dict, Optional, Generic, TypeVar
from pydantic import BaseModel

T = TypeVar("T")

class ApiError(BaseModel):
    code: str
    message: str

class ApiResponse(BaseModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    message: Optional[str] = ""
    error: Optional[ApiError] = None
