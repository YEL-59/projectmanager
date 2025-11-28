import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET single project by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id)

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
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
    const { id } = params
    const data = await request.json()

    // Check if project exists
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id)
    if (!existing) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const stmt = db.prepare(`
      UPDATE projects SET
        projectName = ?,
        days = ?,
        profile = ?,
        deliveryStatus = ?,
        assignees = ?,
        department = ?,
        currentPhase = ?,
        deadline = ?,
        amount = ?,
        value = ?,
        orderSheet = ?,
        planFor = ?,
        team = ?,
        deliveryDate = ?,
        notes = ?,
        timing = ?,
        updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `)

    stmt.run(
      data.projectName || existing.projectName,
      data.days ?? existing.days,
      data.profile ?? existing.profile,
      data.deliveryStatus ?? existing.deliveryStatus,
      data.assignees || existing.assignees,
      data.department || existing.department,
      data.currentPhase ?? existing.currentPhase,
      data.deadline ?? existing.deadline,
      data.amount ?? existing.amount,
      data.value ?? existing.value,
      data.orderSheet ?? existing.orderSheet,
      data.planFor ?? existing.planFor,
      data.team ?? existing.team,
      data.deliveryDate ?? existing.deliveryDate,
      data.notes ?? existing.notes,
      data.timing ?? existing.timing,
      id
    )

    const updatedProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(id)
    return NextResponse.json(updatedProject)
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
    const { id } = params

    // Check if project exists
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id)
    if (!existing) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    db.prepare('DELETE FROM projects WHERE id = ?').run(id)

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}

