import time
from datetime import datetime, timezone
from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.config import settings as app_settings
from app.core.database import get_db, engine
from app.core.logging import setup_logging, log_event, logger
from app.api.v1 import auth, dashboard, courses, lessons, progress, review, mistakes, settings as user_settings, languages

# Import all models so Base.metadata knows about them
from app.models import Base  # noqa: F401
import app.models  # noqa: F401

setup_logging()
START_TIME = time.time()


app = FastAPI(
    title="LinguaLearn API",
    description="Production-ready backend API for LinguaLearn and SMIDHA College integration.",
    version="1.0.0",
)

origins = [origin.strip() for origin in app_settings.CORS_ORIGINS.split(",")] if app_settings.CORS_ORIGINS != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    log_event("STARTUP", "Database tables created/verified successfully")

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    msg = errors[0].get("msg", "Validation error") if errors else "Validation error"
    log_event("VALIDATION_ERROR", msg, level=30, path=str(request.url))
    return JSONResponse(
        status_code=422,
        content={"success": False, "error": {"code": "VALIDATION_ERROR", "message": msg}},
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    log_event("HTTP_EXCEPTION", str(exc.detail), level=30, status_code=exc.status_code, path=str(request.url))
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error": {"code": f"HTTP_{exc.status_code}", "message": exc.detail}},
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url}: {str(exc)}", exc_info=exc)
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": {"code": "INTERNAL_SERVER_ERROR", "message": "An unexpected internal server error occurred."}},
    )

@app.get("/health", tags=["Health"])
async def health_check(db: AsyncSession = Depends(get_db)):
    db_status = "connected"
    try:
        if db is not None:
            await db.execute(select(1))
    except Exception as e:
        db_status = "disconnected"

    uptime_seconds = int(time.time() - START_TIME)
    
    return {
        "status": "ok" if db_status == "connected" else "degraded",
        "database": db_status,
        "version": "1.0.0",
        "environment": app_settings.ENVIRONMENT,
        "uptime": f"{uptime_seconds}s",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "api_version": "v1"
    }

# Include API Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(languages.router, prefix="/api/v1/languages", tags=["Languages"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(courses.router, prefix="/api/v1/courses", tags=["Courses"])
app.include_router(lessons.router, prefix="/api/v1/lessons", tags=["Lessons"])
app.include_router(progress.router, prefix="/api/v1/progress", tags=["Progress"])
app.include_router(review.router, prefix="/api/v1/review", tags=["Review"])
app.include_router(mistakes.router, prefix="/api/v1/mistakes", tags=["Mistakes"])
app.include_router(user_settings.router, prefix="/api/v1/settings", tags=["Settings"])
