# TaskFlow — Full-Stack Task Manager

A student mini-project built with React, React Router, Express, Prisma, and SQLite.

## Features
- Create, view, edit, and delete tasks (CRUD)
- Task status: Pending, In Progress, Completed
- Priority: Low, Medium, High
- Search by title/description
- Filter by status and priority
- Dashboard summary cards
- Responsive layout
- Class-based React ErrorBoundary
- Express REST API with input validation and centralized error handling

## Stack
- Frontend: React + Vite, React Router, plain CSS
- Backend: Node.js + Express
- Database: SQLite through Prisma ORM

> This is a learning project. It intentionally does not implement user authentication. Do not expose a production deployment without adding authentication, authorization, rate limiting, and secure configuration.

## Prerequisites
Install Node.js 20+ only. SQLite is a local database file, so no database server or Workbench is required.

## 1. Configure SQLite
Copy `server/.env.example` to `server/.env`. The default connection is:
```env
DATABASE_URL="file:./dev.db"
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```
Prisma will use a local SQLite database file. You do not need to install or configure SQLite.

## 2. Start the backend
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
API health check: http://localhost:5000/api/health

## 3. Start the frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```
Open the URL Vite prints, normally http://localhost:5173.

## API routes
| Method | Route | Purpose |
|---|---|---|
| GET | /api/tasks | List tasks; optional `?search=&status=&priority=` |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/health | Server health check |

## React concept map
- Components: Navbar, TaskForm, TaskCard, TaskList, StatsCards
- Class component: ErrorBoundary
- Functional components: all main screens and UI components
- Parent-child communication: Home passes task records and callbacks to TaskList/TaskCard
- Props: TaskCard receives a task and event callbacks
- useState: form inputs, search/filter values, page-level UI state
- useEffect: loads tasks and refreshes data when filters change
- Events/forms: submit, click, change, delete confirmation
- Client-side routing: `/`, `/tasks`, `/tasks/new`, `/tasks/:id/edit`
- Responsive UI: CSS grid and media queries
- Express: REST endpoints, validation, status codes, centralized errors

## Personal modifications
1. Priority levels and priority filter.
2. Status workflow and status filter.
3. Search and summary dashboard are extra improvements.

## Tutorial
Title: Build a Full Stack Task Manager App | Node.js, Express, Prisma, SQLite, React, TailwindCSS
YouTube: https://www.youtube.com/watch?v=4gOE2b3OX-Y
The repository URL supplied in the assignment prompt was truncated. Replace the source-code link in your report with the complete link from the video's description after verifying it.

## Before submission
- [ ] Run the app locally and test CRUD.
- [ ] Test search and both filters.
- [ ] Capture your own screenshots (Dashboard, Tasks filters, Add/Edit form, mobile view).
- [ ] Add your name, course, faculty, and submission date to the report.
- [ ] Push your own implementation to GitHub and replace the placeholder repository URL.
