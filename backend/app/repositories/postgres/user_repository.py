from app.repositories.postgres.base import PostgresRepository
from app.models.user import User
from app.schemas.auth import UserCreate
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional

class UserUpdate(BaseModel):
    pass

class UserRepository(PostgresRepository[User, UserCreate, UserUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=User, session=session)
        
    async def get_by_email(self, email: str) -> Optional[User]:
        query = select(self.model).where(self.model.email == email)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
