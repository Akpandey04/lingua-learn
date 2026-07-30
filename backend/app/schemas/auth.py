from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import uuid

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters long")

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)

class GuestUpgrade(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters long")

class UserResponse(BaseModel):
    id: uuid.UUID
    email: Optional[EmailStr] = None
    is_guest: bool

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: str

class TokenData(BaseModel):
    user_id: Optional[str] = None
