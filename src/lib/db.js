import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create database instance
const dataDir = path.join(__dirname, '../../data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, 'projects.db')
const db = new Database(dbPath)

// Initialize database schema
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectName TEXT NOT NULL,
      days INTEGER DEFAULT 0,
      profile TEXT,
      deliveryStatus TEXT DEFAULT 'WIP',
      assignees TEXT NOT NULL,
      department TEXT NOT NULL,
      currentPhase TEXT,
      deadline TEXT,
      amount REAL DEFAULT 0,
      value REAL DEFAULT 0,
      orderSheet TEXT,
      planFor TEXT,
      team TEXT,
      deliveryDate TEXT,
      notes TEXT,
      timing TEXT DEFAULT 'This Month',
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  // Create indexes for better query performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_deliveryStatus ON projects(deliveryStatus);
    CREATE INDEX IF NOT EXISTS idx_department ON projects(department);
  `)
}

// Initialize database on import
initDatabase()

export default db

