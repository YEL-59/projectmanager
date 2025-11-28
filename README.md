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
- **Database**: SQLite (better-sqlite3)
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

The database will be automatically created in the `data/` directory on first run.

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
    └── projects.db               # SQLite database (auto-created)
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

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
