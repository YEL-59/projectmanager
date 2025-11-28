# Project Manager - Full Stack Next.js Application

A full-stack project management application built with Next.js 15, featuring a SQLite database backend for tracking personal projects.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete projects
- ✅ **SQLite Database**: Persistent data storage using better-sqlite3
- ✅ **RESTful API**: Backend API routes for all project operations
- ✅ **Real-time Search**: Search projects by name, assignees, or department
- ✅ **Status Filtering**: Filter projects by delivery status
- ✅ **Project Details**: View comprehensive project information
- ✅ **Financial Tracking**: Track budget, value, and ROI for each project
- ✅ **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Vercel Postgres (for production) / SQLite (for local development)
- **UI Components**: shadcn/ui, Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup

#### For Local Development (SQLite)
The app uses Vercel Postgres by default. For local development, you can use SQLite by installing `better-sqlite3`:
```bash
npm install better-sqlite3
```
Then update `src/lib/db.js` to use SQLite instead of Vercel Postgres.

#### For Production (Vercel Postgres)
When deploying to Vercel, the database will be automatically set up. See deployment section below.

## Project Structure

```
projectmanager/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── projects/          # API routes for CRUD operations
│   │   ├── page.js               # Main page component
│   │   └── layout.js
│   ├── components/
│   │   ├── AddProjectDialog.jsx  # Dialog for adding new projects
│   │   ├── EditProjectDialog.jsx # Dialog for editing projects
│   │   ├── ProjectTable.jsx      # Projects table component
│   │   ├── ProjectDetailsDialog.jsx
│   │   └── ui/                   # shadcn/ui components
│   └── lib/
│       ├── db.js                 # Database initialization and connection
│       └── utils.js
└── data/
    └── projects.db               # SQLite database (local dev only)
```

## API Endpoints

- `GET /api/projects` - Get all projects (supports `?status=` and `?search=` query params)
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get a single project
- `PUT /api/projects/[id]` - Update a project
- `DELETE /api/projects/[id]` - Delete a project

## Database Schema

The `projects` table includes the following fields:
- Basic info: projectName, days, profile, deliveryStatus
- Team info: assignees, department, team, currentPhase
- Timeline: deadline, deliveryDate, timing
- Financial: amount (budget), value
- Additional: orderSheet, planFor, notes
- Metadata: createdAt, updatedAt

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and configure settings

### Step 3: Set Up Vercel Postgres
1. In your Vercel project dashboard, go to the **Storage** tab
2. Click **Create Database** → Select **Postgres**
3. Choose a name for your database (e.g., "project-manager-db")
4. Select a region closest to you
5. Click **Create**

### Step 4: Connect Database to Your Project
1. Vercel will automatically add the database connection environment variables
2. The `@vercel/postgres` package will automatically use these variables
3. Your database will be initialized automatically on first API call

### Step 5: Deploy
1. Click **Deploy** in Vercel
2. Once deployed, your app will be live at `https://your-project.vercel.app`
3. The database will be automatically initialized when you first use the app

### Using Your Deployed App
- Your app URL: `https://your-project.vercel.app`
- All API routes work: `https://your-project.vercel.app/api/projects`
- Data persists across deployments
- No additional configuration needed!

### Environment Variables
Vercel Postgres automatically provides these environment variables (you don't need to set them manually):
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

The `@vercel/postgres` package uses these automatically.
