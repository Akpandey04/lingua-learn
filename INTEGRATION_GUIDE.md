# LinguaLearn API Integration Guide

Welcome to the LinguaLearn Backend API documentation for the SMIDHA Frontend Team. This guide outlines how to connect the React/Next.js frontend to the backend services.

## Base Configuration

- **Base URL**: `http://127.0.0.1:8000` (Local Development)
- **API Prefix**: `/api/v1`
- **Swagger UI**: `http://127.0.0.1:8000/docs` (Interactive API Documentation)
- **Health Check**: `GET /health`

## Standard API Envelope

All endpoints return JSON wrapped in a standard envelope. Always check `success` before reading `data`.

### Success Response Example
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "French Basics"
  },
  "message": "Course fetched successfully"
}
```

### Error Response Example
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input should be a valid dictionary"
  }
}
```

## Authentication Flow

The backend uses JWT (JSON Web Tokens) for authentication.

### 1. Registration (`POST /api/v1/auth/register`)
- **Body**: `{"email": "user@example.com", "password": "securepassword"}`
- **Response**: `201 Created` with User data.

### 2. Login (`POST /api/v1/auth/login`)
- **Body**: `{"email": "user@example.com", "password": "securepassword"}`
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### 3. Protected Endpoints
Include the `access_token` in the Authorization header for all protected endpoints.
- **Header**: `Authorization: Bearer <access_token>`

Example using `fetch`:
```javascript
const response = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  }
});
```

*(Note: There is also a `/api/v1/auth/token` endpoint which is exclusively for Swagger UI compatibility. The frontend should always use `/api/v1/auth/login`).*

## Key Endpoints List

### Authentication
- `POST /api/v1/auth/register` - Create an account
- `POST /api/v1/auth/login` - Authenticate & get tokens
- `POST /api/v1/auth/guest` - Create an anonymous guest session
- `POST /api/v1/auth/upgrade` - Upgrade guest to registered user
- `GET /api/v1/auth/me` - Get current user profile
- `POST /api/v1/auth/logout` - Logout session

### Dashboard & Progress
- `GET /api/v1/dashboard` - Get comprehensive dashboard stats (streak, xp, next lesson)
- `GET /api/v1/progress` - Get learning progress across all languages
- `POST /api/v1/progress` - Update progress (e.g. mark lesson complete)
- `GET /api/v1/review` - Get items due for spaced repetition review
- `GET /api/v1/mistakes` - Get user's mistake notebook

### Curriculum
- `GET /api/v1/languages` - List all available languages
- `GET /api/v1/courses` - List courses (e.g. French A1)
- `GET /api/v1/lessons/{id}` - Fetch a specific lesson with its vocabulary and exercises

## Common HTTP Status Codes

- **200 OK**: Request succeeded.
- **201 Created**: Resource successfully created (e.g. Registration).
- **400 Bad Request**: Malformed syntax or invalid business logic.
- **401 Unauthorized**: Missing, invalid, or expired JWT token.
- **404 Not Found**: Resource doesn't exist.
- **409 Conflict**: Resource already exists (e.g. Email already registered).
- **422 Unprocessable Content**: Pydantic validation failed (e.g. missing required field, bad email format).
- **429 Too Many Requests**: Rate limit exceeded (10 requests/minute for Auth).
- **500 Internal Server Error**: Backend crash.

## Integration Notes

1. **State Management**: It's highly recommended to use React Context or a state library (Redux/Zustand) to manage the global `user` and `access_token` state.
2. **Axios/Fetch Interceptor**: Configure an interceptor to automatically attach the `Authorization: Bearer <token>` header to all outgoing requests.
3. **Handling 401s**: If an API call returns `401 Unauthorized`, intercept the error and trigger a logout flow (or token refresh flow, if implemented on frontend) to clear invalid credentials and redirect to `/login`.
4. **CORS**: Currently set via the `CORS_ORIGINS` environment variable. Ensure this variable includes your frontend domain in production (e.g., `https://app.lingualearn.com`).
