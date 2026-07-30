from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.common import ApiResponse
from app.schemas.auth import UserCreate, UserLogin, UserResponse, TokenResponse, GuestUpgrade
from app.core.database import get_db
from app.core.rate_limit import rate_limit_auth
from app.core.logging import log_event
from app.services.auth_service import AuthService
from app.api.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

def get_auth_service(session: AsyncSession = Depends(get_db)) -> AuthService:
    return AuthService(session)

@router.post("/register", response_model=ApiResponse[UserResponse], status_code=201, dependencies=[Depends(rate_limit_auth)])
async def register(user_in: UserCreate, auth_service: AuthService = Depends(get_auth_service)):
    log_event("AUTH_REGISTER_ATTEMPT", "Registration attempt", email=user_in.email)
    user = await auth_service.register(user_in)
    log_event("AUTH_REGISTER_SUCCESS", "Registration success", user_id=str(user.id))
    return ApiResponse(success=True, data=user, message="User registered successfully")

@router.post("/login", response_model=ApiResponse[TokenResponse], dependencies=[Depends(rate_limit_auth)])
async def login(login_in: UserLogin, auth_service: AuthService = Depends(get_auth_service)):
    log_event("AUTH_LOGIN_ATTEMPT", "Login attempt", email=login_in.email)
    tokens = await auth_service.login(login_in)
    log_event("AUTH_LOGIN_SUCCESS", "Login success", email=login_in.email)
    return ApiResponse(success=True, data=tokens, message="Login successful")

@router.post("/token", response_model=TokenResponse, include_in_schema=False)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), auth_service: AuthService = Depends(get_auth_service)):
    """
    Dedicated endpoint for OAuth2 compatibility (Swagger UI).
    This strictly returns the token dict without the ApiResponse envelope.
    """
    login_in = UserLogin(email=form_data.username, password=form_data.password)
    log_event("AUTH_TOKEN_ATTEMPT", "OAuth2 token attempt", email=login_in.email)
    tokens = await auth_service.login(login_in)
    log_event("AUTH_TOKEN_SUCCESS", "OAuth2 token success", email=login_in.email)
    return tokens

@router.post("/guest", response_model=ApiResponse[TokenResponse], status_code=201, dependencies=[Depends(rate_limit_auth)])
async def create_guest(auth_service: AuthService = Depends(get_auth_service)):
    log_event("AUTH_GUEST_CREATE", "Guest session requested")
    tokens = await auth_service.create_guest()
    log_event("AUTH_GUEST_SUCCESS", "Guest session created")
    return ApiResponse(success=True, data=tokens, message="Guest session created")

@router.post("/upgrade", response_model=ApiResponse[UserResponse])
async def upgrade_guest(
    upgrade_in: GuestUpgrade,
    current_user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service)
):
    log_event("AUTH_UPGRADE_ATTEMPT", "Account upgrade attempt", user_id=str(current_user.id))
    user = await auth_service.upgrade_guest(current_user, upgrade_in)
    log_event("AUTH_UPGRADE_SUCCESS", "Account upgraded successfully", user_id=str(user.id))
    return ApiResponse(success=True, data=user, message="Account upgraded successfully")

@router.get("/me", response_model=ApiResponse[UserResponse])
async def get_me(current_user: User = Depends(get_current_user)):
    user_response = UserResponse(id=current_user.id, email=current_user.email, is_guest=current_user.is_guest)
    return ApiResponse(success=True, data=user_response, message="User profile retrieved")

@router.post("/logout", response_model=ApiResponse[dict])
async def logout(
    current_user: User = Depends(get_current_user),
    auth_service: AuthService = Depends(get_auth_service)
):
    await auth_service.logout(current_user)
    log_event("AUTH_LOGOUT", "User logged out", user_id=str(current_user.id))
    return ApiResponse(success=True, data={}, message="Logout successful")
