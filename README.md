# Project Tracker

A full-stack project and task management app with user authentication, built to practice production patterns: JWT auth, ownership-scoped data access, and a REST API consumed by a separate React frontend.

**Live demo:** https://project-tracker-api-kappa.vercel.app
**API docs:** https://project-tracker-api-hjit.onrender.com/docs

> Note: the backend is hosted on Render's free tier and spins down after periods of inactivity. The first request after idle time may take 30–60 seconds to respond.

## Features

- Email/password registration and login with hashed passwords (bcrypt) and JWT-based sessions
- Create, view, and manage projects, each scoped to the logged-in user
- Nested task management within each project (create, list, toggle complete)
- Ownership checks on every request — a user can only ever read or modify their own data
- Protected routes on both the API (token required) and the frontend (redirects to login if the token is missing or expired)

## Tech stack

**Backend**
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL, hosted on Supabase
- JWT authentication (`python-jose`) and password hashing (`passlib` + `bcrypt`)

**Frontend**
- React (Vite)
- Plain `fetch` for API calls, no external data-fetching library

**Deployment**
- Backend: Render
- Frontend: Vercel
- Database: Supabase

## Architecture

```
frontend/          React app (Vite)
  src/
    api.js         All API calls in one place
    Login.jsx
    Register.jsx
    Dashboard.jsx        Project list + create form
    ProjectDetail.jsx    Task list for a single project

backend/
  app/
    main.py         App entrypoint, CORS, router registration
    database.py      DB connection/session setup
    models/          SQLAlchemy models (User, Project, Task)
    schemas/         Pydantic request/response shapes
    routes/          auth, projects, tasks endpoints
    utils/auth.py    Password hashing, JWT creation/verification
```

Authentication flow: a user logs in, the API returns a signed JWT containing their user ID, and the frontend stores it in `localStorage` and attaches it as an `Authorization: Bearer <token>` header on every subsequent request. The API decodes and verifies that token on every protected route before doing any database lookup, and every query is filtered by the requesting user's ID — never by anything the client sends directly — so one user can never read or modify another user's data.

Tasks are nested under projects (`/projects/{project_id}/tasks/`), and a task's ownership is derived through its parent project rather than stored redundantly on the task itself.

## Running locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with:
```
DATABASE_URL=your_postgres_connection_string
SECRET_KEY=any_long_random_string
```

Start the server:
```bash
uvicorn app.main:app --reload
```
API runs at `http://127.0.0.1:8000`, with interactive docs at `/docs`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`. Update `API_URL` in `src/api.js` if your backend isn't running on the default port.

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create an account, returns a token |
| POST | `/auth/login` | Log in, returns a token |
| GET | `/projects/` | List the current user's projects |
| POST | `/projects/` | Create a project |
| PUT | `/projects/{id}` | Update a project |
| DELETE | `/projects/{id}` | Delete a project |
| GET | `/projects/{id}/tasks/` | List tasks for a project |
| POST | `/projects/{id}/tasks/` | Create a task |
| PUT | `/projects/{id}/tasks/{task_id}` | Update a task |
| DELETE | `/projects/{id}/tasks/{task_id}` | Delete a task |

All routes except register/login require a valid `Authorization: Bearer <token>` header.

## What I'd add next

- Password reset flow
- Project and task filtering (by status, due date)
- Tests for the auth and ownership logic
- Refresh tokens instead of a single 24-hour token

## Author

Simon Ike — [github.com/ikesimon221](https://github.com/ikesimon221)
