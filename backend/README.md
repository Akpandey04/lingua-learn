# LinguaLearn API Backend v1.0.0

FastAPI production-ready backend for LinguaLearn, serving both the React frontend and the SMIDHA College Website integration.

## Layered Architecture
```text
Client (React / SMIDHA Website)
      │
      ▼
 API Routers (FastAPI / Versioned /api/v1)
      │
      ▼
 Service Layer (Business Logic & Decoupled Spaced Repetition)
      │
      ▼
 Repository Interface (Generic Postgres Async Repositories)
      │
      ▼
 PostgreSQL Database (SQLAlchemy 2.0 Async + asyncpg)
```

## Technology Stack
- **Framework**: FastAPI
- **Database**: PostgreSQL (via SQLAlchemy async and asyncpg)
- **Migrations**: Alembic
- **Validation**: Pydantic v2
- **Auth**: JWT with Passlib (bcrypt password hashing)
- **Logging**: Custom JSON Structured Logger (token/password masked)
- **Rate Limiting**: Sliding window IP Rate Limiter

---

## Setup Instructions

### 1. Database & Services via Docker
Run the PostgreSQL database and backend service together:
```bash
docker compose up -d
```

### 2. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=postgresql+asyncpg://lingua:password@localhost:5432/lingualearn
SECRET_KEY=super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=production
```

### 3. Local Virtual Environment Installation
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Database Migrations
```bash
alembic upgrade head
```

### 5. Running the Application
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 6. Running Test Suite (Pytest)
```bash
pytest tests/
```

---

## API & Health Documentation
Once the server is running, explore:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **Health Monitoring**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

## Production Security & Hardening Features
1. **JWT Auth & Guest Upgrades**: Supports standard login/register and guest sessions with upgrade capabilities.
2. **Rate Limiting**: Auth endpoints (`/login`, `/register`, `/guest`) are rate-limited to prevent brute-force attacks.
3. **Structured & Masked Logging**: Operational events and exceptions are logged in structured JSON with all sensitive credentials (`password`, `token`, `secret`) masked.
4. **Standard Error Envelope**: All API errors follow the uniform response structure:
   ```json
   {
     "success": false,
     "error": {
       "code": "HTTP_401",
       "message": "Could not validate credentials"
     }
   }
   ```
