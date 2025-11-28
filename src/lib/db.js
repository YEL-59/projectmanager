import { sql } from '@vercel/postgres'

// Initialize database schema
export async function initDatabase() {
  try {
    // Create projects table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        "projectName" TEXT NOT NULL,
        days INTEGER DEFAULT 0,
        profile TEXT,
        "deliveryStatus" TEXT DEFAULT 'WIP',
        assignees TEXT NOT NULL,
        department TEXT NOT NULL,
        "currentPhase" TEXT,
        deadline TEXT,
        amount REAL DEFAULT 0,
        value REAL DEFAULT 0,
        "orderSheet" TEXT,
        "planFor" TEXT,
        team TEXT,
        "deliveryDate" TEXT,
        notes TEXT,
        timing TEXT DEFAULT 'This Month',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    // Create indexes for better query performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_deliveryStatus ON projects("deliveryStatus")
    `.catch(() => {}) // Ignore if index already exists
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_department ON projects(department)
    `.catch(() => {}) // Ignore if index already exists
  } catch (error) {
    // Table might already exist, which is fine
    if (!error.message.includes('already exists')) {
      console.log('Database initialization:', error.message)
    }
  }
}

// Initialize database on module load (only in development)
if (process.env.NODE_ENV !== 'production') {
  initDatabase().catch(console.error)
}

export { sql }
