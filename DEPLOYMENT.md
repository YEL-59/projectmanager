# Deployment Guide - Vercel

This guide will help you deploy your Project Manager app to Vercel with a full-stack database.

## Quick Start

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Add Vercel Postgres Database**
   - In your Vercel project → **Storage** tab
   - Click **Create Database** → **Postgres**
   - Name it (e.g., "project-manager-db")
   - Select region → **Create**

4. **Deploy**
   - Click **Deploy**
   - Wait for deployment to complete
   - Your app is live! 🎉

## How It Works

- **Database**: Vercel Postgres is automatically connected
- **API Routes**: All `/api/projects/*` routes work immediately
- **Data Persistence**: All data is stored in Vercel Postgres
- **Auto-initialization**: Database tables are created on first API call

## Access Your App

Once deployed, you can access:
- **Frontend**: `https://your-project.vercel.app`
- **API**: `https://your-project.vercel.app/api/projects`

## Local Development

For local development, you have two options:

### Option 1: Use Vercel Postgres (Recommended)
1. In Vercel dashboard → Storage → Your database → **.env.local**
2. Copy the connection string
3. Create `.env.local` in your project root
4. Add: `POSTGRES_URL=<your-connection-string>`
5. Run `npm run dev`

### Option 2: Use SQLite (Local Only)
1. Install: `npm install better-sqlite3`
2. Update `src/lib/db.js` to use SQLite
3. Database file will be created in `data/projects.db`

## Troubleshooting

### Database Connection Issues
- Make sure Vercel Postgres is created in your project
- Check that environment variables are set (automatic with Vercel Postgres)
- Verify your database region matches your deployment region

### API Errors
- Check Vercel function logs in the dashboard
- Ensure database is initialized (first API call will do this)
- Verify all environment variables are present

### Build Errors
- Make sure `@vercel/postgres` is in `package.json`
- Check that all dependencies are installed
- Review build logs in Vercel dashboard

## Free Tier Limits

Vercel Postgres Free Tier includes:
- 256 MB storage
- 60 hours compute time/month
- Perfect for personal project tracking!

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

