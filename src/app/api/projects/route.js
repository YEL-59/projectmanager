import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { initDatabase } from '@/lib/db'

// Initialize database on first request
let dbInitialized = false

// GET all projects
export async function GET(request) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDatabase()
      dbInitialized = true
    }

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')
    const searchTerm = searchParams.get('search')

    let projects

    // Build query based on filters
    if (statusFilter && statusFilter !== 'all' && searchTerm) {
      const searchPattern = `%${searchTerm}%`
      projects = await sql`
        SELECT * FROM projects 
        WHERE "deliveryStatus" = ${statusFilter} 
        AND ("projectName" ILIKE ${searchPattern} OR assignees ILIKE ${searchPattern} OR department ILIKE ${searchPattern})
        ORDER BY "createdAt" DESC
      `
    } else if (statusFilter && statusFilter !== 'all') {
      projects = await sql`
        SELECT * FROM projects 
        WHERE "deliveryStatus" = ${statusFilter}
        ORDER BY "createdAt" DESC
      `
    } else if (searchTerm) {
      const searchPattern = `%${searchTerm}%`
      projects = await sql`
        SELECT * FROM projects 
        WHERE "projectName" ILIKE ${searchPattern} OR assignees ILIKE ${searchPattern} OR department ILIKE ${searchPattern}
        ORDER BY "createdAt" DESC
      `
    } else {
      projects = await sql`SELECT * FROM projects ORDER BY "createdAt" DESC`
    }
    
    return NextResponse.json(projects.rows)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST create new project
export async function POST(request) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      await initDatabase()
      dbInitialized = true
    }

    const data = await request.json()

    // Validate required fields
    if (!data.projectName || !data.assignees || !data.department) {
      return NextResponse.json(
        { error: 'Missing required fields: projectName, assignees, department' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO projects (
        "projectName", days, profile, "deliveryStatus", assignees, department,
        "currentPhase", deadline, amount, value, "orderSheet", "planFor", team,
        "deliveryDate", notes, timing
      ) VALUES (
        ${data.projectName || ''},
        ${data.days || 0},
        ${data.profile || ''},
        ${data.deliveryStatus || 'WIP'},
        ${data.assignees || ''},
        ${data.department || ''},
        ${data.currentPhase || ''},
        ${data.deadline || null},
        ${data.amount || 0},
        ${data.value || 0},
        ${data.orderSheet || ''},
        ${data.planFor || ''},
        ${data.team || ''},
        ${data.deliveryDate || null},
        ${data.notes || ''},
        ${data.timing || 'This Month'}
      )
      RETURNING *
    `

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
