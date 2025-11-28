import { Pool } from 'pg'

// Create connection pool
let pool = null

function getPool() {
  if (!pool) {
    // Use Neon connection string or standard Postgres connection string
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
    
    if (!connectionString) {
      console.warn('Database connection string not found. Please set POSTGRES_URL or DATABASE_URL environment variable.')
      return null
    }

    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })
  }
  return pool
}

// Initialize database schema
export async function initDatabase() {
  try {
    const db = getPool()
    if (!db) {
      return false
    }

    // Create projects table if it doesn't exist
    await db.query(`
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
    `)
    
    // Create indexes for better query performance
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_deliveryStatus ON projects("deliveryStatus")
    `).catch(() => {}) // Ignore if index already exists
    
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_department ON projects(department)
    `).catch(() => {}) // Ignore if index already exists
    
    return true
  } catch (error) {
    // Table might already exist, which is fine
    if (error.message.includes('already exists')) {
      return true
    }
    console.error('Database initialization error:', error.message)
    return false
  }
}

// Helper function to create sql template tag
function createSqlTemplate() {
  return async (strings, ...values) => {
    const db = getPool()
    if (!db) {
      throw new Error('Database not configured. Please add a Postgres database (Neon, Supabase, etc.) from Vercel Marketplace.')
    }
    
    // Build query from template
    let queryText = ''
    let paramIndex = 1
    const params = []
    
    for (let i = 0; i < strings.length; i++) {
      queryText += strings[i]
      if (i < values.length) {
        queryText += `$${paramIndex}`
        params.push(values[i])
        paramIndex++
      }
    }
    
    return db.query(queryText, params)
  }
}

// Export sql template tag for compatibility
export const sql = {
  query: createSqlTemplate()
}

// Also export direct query function
export async function query(text, params) {
  const db = getPool()
  if (!db) {
    throw new Error('Database not configured. Please add a Postgres database (Neon, Supabase, etc.) from Vercel Marketplace.')
  }
  return db.query(text, params)
}
