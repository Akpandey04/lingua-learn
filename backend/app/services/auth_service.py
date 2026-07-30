from app.repositories.postgres.user_repository import UserRepository
from app.schemas.auth import UserCreate, UserLogin, UserResponse, TokenResponse, GuestUpgrade
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User, Session
from sqlalchemy import delete
import uuid

class AuthService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)
        
    async def register(self, user_in: UserCreate) -> UserResponse:
        existing_user = await self.user_repo.get_by_email(user_in.email)
        if existing_user:
            raise HTTPException(status_code=409, detail="Email already registered")
            
        hashed_password = get_password_hash(user_in.password)
        new_user = User(email=user_in.email, hashed_password=hashed_password, is_guest=False)
        self.user_repo.session.add(new_user)
        await self.user_repo.session.commit()
        await self.user_repo.session.refresh(new_user)
        
        return UserResponse(id=new_user.id, email=new_user.email, is_guest=new_user.is_guest)
        
    async def login(self, login_in: UserLogin) -> TokenResponse:
        user = await self.user_repo.get_by_email(login_in.email)
        if not user or not user.hashed_password or not verify_password(login_in.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Incorrect email or password")
            
        return await self._create_tokens_for_user(user)

    async def create_guest(self) -> TokenResponse:
        guest_user = User(is_guest=True)
        self.user_repo.session.add(guest_user)
        await self.user_repo.session.commit()
        await self.user_repo.session.refresh(guest_user)
        
        return await self._create_tokens_for_user(guest_user)

    async def upgrade_guest(self, user: User, upgrade_in: GuestUpgrade) -> UserResponse:
        if not user.is_guest:
            raise HTTPException(status_code=400, detail="User is already registered")
            
        existing_user = await self.user_repo.get_by_email(upgrade_in.email)
        if existing_user:
            raise HTTPException(status_code=409, detail="Email already registered")
            
        user.email = upgrade_in.email
        user.hashed_password = get_password_hash(upgrade_in.password)
        user.is_guest = False
        
        self.user_repo.session.add(user)
        await self.user_repo.session.commit()
        await self.user_repo.session.refresh(user)
        
        return UserResponse(id=user.id, email=user.email, is_guest=user.is_guest)

    async def logout(self, user: User) -> None:
        # In a real app we'd revoke the token in the Session table or a blocklist
        # For this foundation, we just acknowledge the logout (client drops token).
        pass

    async def _create_tokens_for_user(self, user: User) -> TokenResponse:
        access_token = create_access_token(data={"sub": str(user.id)})
        refresh_token = create_refresh_token(data={"sub": str(user.id)})
        
        # Save refresh token session in DB (Optional per strict requirements, but good practice)
        new_session = Session(user_id=user.id, refresh_token=refresh_token, is_active=True)
        self.session.add(new_session)
        await self.session.commit()
        
        return TokenResponse(access_token=access_token, refresh_token=refresh_token)
