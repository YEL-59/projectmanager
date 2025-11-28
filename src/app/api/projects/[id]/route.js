import { NextResponse } from 'next/server'
import { sql, initDatabase } from '@/lib/db'

// Initialize database on first request
let dbInitialized = false

// GET single project by ID
export async function GET(request, { params }) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      const initialized = await initDatabase()
      dbInitialized = true
      if (!initialized) {
        return NextResponse.json(
          { error: 'Database not configured. Please add a Postgres database (Neon, Supabase, etc.) from Vercel Marketplace.' },
          { status: 503 }
        )
      }
    }

    const { id } = params
    const result = await sql.query`SELECT * FROM projects WHERE id = ${id}`

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT update project
export async function PUT(request, { params }) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      const initialized = await initDatabase()
      dbInitialized = true
      if (!initialized) {
        return NextResponse.json(
          { error: 'Database not configured. Please add a Postgres database (Neon, Supabase, etc.) from Vercel Marketplace.' },
          { status: 503 }
        )
      }
    }

    const { id } = params
    const data = await request.json()

    // Check if project exists
    const existing = await sql.query`SELECT * FROM projects WHERE id = ${id}`
    if (existing.rows.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const existingProject = existing.rows[0]

    const result = await sql.query`
      UPDATE projects SET
        "projectName" = ${data.projectName ?? existingProject.projectName},
        days = ${data.days ?? existingProject.days},
        profile = ${data.profile ?? existingProject.profile},
        "deliveryStatus" = ${data.deliveryStatus ?? existingProject.deliveryStatus},
        assignees = ${data.assignees || existingProject.assignees},
        department = ${data.department || existingProject.department},
        "currentPhase" = ${data.currentPhase ?? existingProject.currentPhase},
        deadline = ${data.deadline ?? existingProject.deadline},
        amount = ${data.amount ?? existingProject.amount},
        value = ${data.value ?? existingProject.value},
        "orderSheet" = ${data.orderSheet ?? existingProject.orderSheet},
        "planFor" = ${data.planFor ?? existingProject.planFor},
        team = ${data.team ?? existingProject.team},
        "deliveryDate" = ${data.deliveryDate ?? existingProject.deliveryDate},
        notes = ${data.notes ?? existingProject.notes},
        timing = ${data.timing ?? existingProject.timing},
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE project
export async function DELETE(request, { params }) {
  try {
    // Initialize database if not already done
    if (!dbInitialized) {
      const initialized = await initDatabase()
      dbInitialized = true
      if (!initialized) {
        return NextResponse.json(
          { error: 'Database not configured. Please add a Postgres database (Neon, Supabase, etc.) from Vercel Marketplace.' },
          { status: 503 }
        )
      }
    }

    const { id } = params

    // Check if project exists
    const existing = await sql.query`SELECT * FROM projects WHERE id = ${id}`
    if (existing.rows.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    await sql.query`DELETE FROM projects WHERE id = ${id}`

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
