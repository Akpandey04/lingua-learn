# LinguaLearn API Contract

This document outlines the REST API exposed by the LinguaLearn backend. It is the single source of truth for both the LinguaLearn React Frontend and the SMIDHA College Website integration.

## Global Response Structure

All endpoints return JSON responses adhering to the following structure:

**Success Response (200 OK, 201 Created)**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

**Error Response (400, 401, 403, 404, 500)**
```json
{
  "success": false,
  "error": {
      "code": "ERROR_CODE",
      "message": "Human readable error message"
  }
}
```

## Endpoints

### 1. Health
- **Endpoint:** `/health`
- **Method:** `GET`
- **Authentication:** None
- **Response:**
  ```json
  {
      "status": "ok",
      "database": "connected",
      "version": "1.0.0"
  }
  ```

### 2. Authentication

#### Register
- **Endpoint:** `/api/v1/auth/register`
- **Method:** `POST`
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
       "id": "uuid",
       "email": "user@example.com"
    },
    "message": "User registered successfully"
  }
  ```

#### Login
- **Endpoint:** `/api/v1/auth/login`
- **Method:** `POST`
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
       "access_token": "jwt.token.string",
       "token_type": "bearer",
       "refresh_token": "refresh.token.string"
    },
    "message": "Login successful"
  }
  ```

### 3. Dashboard
- **Endpoint:** `/api/v1/dashboard`
- **Method:** `GET`
- **Authentication:** Required (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
       "recent_courses": [],
       "reviews_due": 12,
       "daily_goal_progress": 25,
       "streak": 5
    },
    "message": "Dashboard data retrieved"
  }
  ```

#### Create Guest Session
- **Endpoint:** `/api/v1/auth/guest`
- **Method:** `POST`
- **Authentication:** None
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
       "access_token": "jwt.token.string",
       "token_type": "bearer",
       "refresh_token": "refresh.token.string"
    },
    "message": "Guest session created"
  }
  ```

#### Upgrade Guest Account
- **Endpoint:** `/api/v1/auth/upgrade`
- **Method:** `POST`
- **Authentication:** Required (Bearer Token from Guest Session)
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
       "id": "uuid",
       "email": "user@example.com",
       "is_guest": false
    },
    "message": "Account upgraded successfully"
  }
  ```

#### Current User Profile
- **Endpoint:** `/api/v1/auth/me`
- **Method:** `GET`
- **Authentication:** Required (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
       "id": "uuid",
       "email": "user@example.com",
       "is_guest": false
    },
    "message": "User profile retrieved"
  }
  ```

#### Logout
- **Endpoint:** `/api/v1/auth/logout`
- **Method:** `POST`
- **Authentication:** Required (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {},
    "message": "Logout successful"
  }
  ```
- **Endpoint:** `/api/v1/dashboard`
- **Method:** `GET`
- **Authentication:** Required (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
       "recent_courses": [],
       "reviews_due": 12,
       "daily_goal_progress": 25,
       "streak": 5
    },
    "message": "Dashboard data retrieved"
  }
  ```

### 5. Curriculum

#### Languages
- **Endpoint:** `/api/v1/languages`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
       { "id": "uuid", "code": "fr", "name": "French" }
    ],
    "message": "Languages retrieved"
  }
  ```

#### Language Details
- **Endpoint:** `/api/v1/languages/{id}`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):** (Same schema as above for single object)

#### Courses
- **Endpoint:** `/api/v1/courses`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
       { "id": "uuid", "language_id": "uuid", "level": "A1" }
    ],
    "message": "Courses retrieved"
  }
  ```

#### Course Details
- **Endpoint:** `/api/v1/courses/{id}`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": { 
       "id": "uuid", 
       "language_id": "uuid", 
       "level": "A1",
       "language": { "id": "uuid", "code": "fr", "name": "French" },
       "units": [
          { "id": "uuid", "course_id": "uuid", "title": "Unit 1", "order_index": 1 }
       ]
    },
    "message": "Course retrieved"
  }
  ```

#### Unit Details
- **Endpoint:** `/api/v1/courses/units/{id}`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):** Unit JSON object.

#### Lesson Details
- **Endpoint:** `/api/v1/lessons/{id}`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": { "id": "uuid", "unit_id": "uuid", "title": "Lesson 1", "order_index": 1 },
    "message": "Lesson retrieved"
  }
  ```

#### Lesson Content (Vocabulary)
- **Endpoint:** `/api/v1/lessons/{id}/vocabulary`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):** Array of Vocabulary JSON objects `[{ "id": "uuid", "term": "...", "translation": "..." }]`.

#### Lesson Content (Exercises)
- **Endpoint:** `/api/v1/lessons/{id}/exercises`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):** Array of Exercise JSON objects `[{ "id": "uuid", "type": "mcq", "data": {} }]`.

#### Lesson Content (Quiz)
- **Endpoint:** `/api/v1/lessons/{id}/quiz`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):** Array of Quiz JSON objects.

*(Additional endpoints for Dashboard and Settings follow the exact same structural pattern. See Swagger UI `/docs` for exhaustive interactive schemas).*

### 6. Progress & Learning Engine

#### Get User Progress
- **Endpoint:** `/api/v1/progress`
- **Method:** `GET`
- **Authentication:** Required
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
       { "id": "uuid", "user_id": "uuid", "lesson_id": "uuid", "status": "completed", "score": 100 }
    ],
    "message": "Progress retrieved"
  }
  ```

#### Complete Lesson
- **Endpoint:** `/api/v1/progress/complete`
- **Method:** `POST`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "lesson_id": "uuid",
    "score": 90
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { "id": "uuid", "status": "completed", "score": 90 },
    "message": "Lesson completed"
  }
  ```

#### Get Due Reviews
- **Endpoint:** `/api/v1/review`
- **Method:** `GET`
- **Authentication:** Required
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
       { "id": "uuid", "concept_id": "concept_1", "interval": 1, "next_review_date": "2023-10-01T00:00:00Z" }
    ],
    "message": "Review items retrieved"
  }
  ```

#### Submit Review Result
- **Endpoint:** `/api/v1/review/result`
- **Method:** `POST`
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "concept_id": "concept_1",
    "is_correct": true
  }
  ```
- **Response (200 OK):** Updates spacing algorithm and returns updated item.

#### Mistake Notebook CRUD
- **GET** `/api/v1/mistakes` - List all mistakes (Auth required)
- **POST** `/api/v1/mistakes` - Create mistake (Auth required)
  - `{"mistake_type": "grammar", "data": {}, "lesson_id": "uuid"}`
- **PUT** `/api/v1/mistakes/{id}` - Update mistake
- **DELETE** `/api/v1/mistakes/{id}` - Delete mistake

### 7. Consolidated Dashboard

#### Get Dashboard Overview
- **Endpoint:** `/api/v1/dashboard`
- **Method:** `GET`
- **Authentication:** Required (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
       "user": { "id": "uuid", "email": "user@example.com", "is_guest": false },
       "current_language": { "id": "uuid", "code": "fr", "name": "French" },
       "current_course": { "id": "uuid", "level": "A1" },
       "current_unit": { "id": "unit_1", "title": "Basics & Greetings" },
       "current_lesson": { "id": "lesson_1", "title": "Common Expressions" },
       "overall_progress_percentage": 25.0,
       "completed_lessons": 3,
       "completed_exercises": 15,
       "completed_quizzes": 3,
       "xp": 150,
       "streak": 3,
       "study_time_minutes": 45,
       "pending_reviews_count": 4,
       "mistake_count": 2,
       "recent_activity": [],
       "today_progress": { "xp_earned": 50, "daily_goal_xp": 50, "completed": true },
       "upcoming_reviews": []
    },
    "message": "Dashboard data retrieved"
  }
  ```

### 8. User Settings

#### Get Settings
- **Endpoint:** `/api/v1/settings`
- **Method:** `GET`
- **Authentication:** Required (Bearer Token)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
       "id": "uuid",
       "user_id": "uuid",
       "theme": "system",
       "language_preference": "en",
       "notifications_enabled": true,
       "daily_goal_xp": 50,
       "learning_reminder": true,
       "audio_speed": 1.0,
       "reduced_motion": false
    },
    "message": "Settings retrieved successfully"
  }
  ```

#### Update Settings
- **Endpoint:** `/api/v1/settings`
- **Method:** `PUT`
- **Authentication:** Required (Bearer Token)
- **Request Body:**
  ```json
  {
    "theme": "dark",
    "daily_goal_xp": 100,
    "reduced_motion": true
  }
  ```
- **Response (200 OK):** Updated settings object.

### 9. Health & System Monitoring

#### System Health Check
- **Endpoint:** `/health`
- **Method:** `GET`
- **Authentication:** None
- **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "database": "connected",
    "version": "1.0.0",
    "environment": "production",
    "uptime": "1234s",
    "timestamp": "2026-07-30T09:40:00Z",
    "api_version": "v1"
  }
  ```

### 10. Rate Limiting & Protection
Auth endpoints (`POST /api/v1/auth/login`, `POST /api/v1/auth/register`, `POST /api/v1/auth/guest`) enforce a rate limit of 10 requests per minute per IP address. Exceeding this limit returns:
```json
{
  "success": false,
  "error": {
    "code": "HTTP_429",
    "message": "Rate limit exceeded. Please try again later."
  }
}
```
