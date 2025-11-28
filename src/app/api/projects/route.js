import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET all projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')
    const searchTerm = searchParams.get('search')

    let query = 'SELECT * FROM projects ORDER BY createdAt DESC'
    const params = []

    // Apply filters
    const conditions = []
    if (statusFilter && statusFilter !== 'all') {
      conditions.push('deliveryStatus = ?')
      params.push(statusFilter)
    }
    if (searchTerm) {
      conditions.push('(projectName LIKE ? OR assignees LIKE ? OR department LIKE ?)')
      const searchPattern = `%${searchTerm}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    const projects = db.prepare(query).all(...params)
    
    return NextResponse.json(projects)
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
    const data = await request.json()

    // Validate required fields
    if (!data.projectName || !data.assignees || !data.department) {
      return NextResponse.json(
        { error: 'Missing required fields: projectName, assignees, department' },
        { status: 400 }
      )
    }

    const stmt = db.prepare(`
      INSERT INTO projects (
        projectName, days, profile, deliveryStatus, assignees, department,
        currentPhase, deadline, amount, value, orderSheet, planFor, team,
        deliveryDate, notes, timing
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      data.projectName || '',
      data.days || 0,
      data.profile || '',
      data.deliveryStatus || 'WIP',
      data.assignees || '',
      data.department || '',
      data.currentPhase || '',
      data.deadline || null,
      data.amount || 0,
      data.value || 0,
      data.orderSheet || '',
      data.planFor || '',
      data.team || '',
      data.deliveryDate || null,
      data.notes || '',
      data.timing || 'This Month'
    )

    const newProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

