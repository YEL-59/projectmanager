'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Edit, ExternalLink, Trash2 } from 'lucide-react'
import ProjectDetailsDialog from './ProjectDetailsDialog'
import EditProjectDialog from './EditProjectDialog'

export default function ProjectTable({ projects, onUpdate, onDelete }) {
    const [selectedProject, setSelectedProject] = useState(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [editingProject, setEditingProject] = useState(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const openProjectDetails = (project) => {
        setSelectedProject(project)
        setIsDetailsOpen(true)
    }

    const openEditDialog = (project) => {
        setEditingProject(project)
        setIsEditDialogOpen(true)
    }

    const handleUpdate = (updatedData) => {
        if (editingProject && onUpdate) {
            onUpdate(editingProject.id, updatedData)
            setIsEditDialogOpen(false)
            setEditingProject(null)
        }
    }

    const handleDelete = (projectId) => {
        if (onDelete) {
            onDelete(projectId)
        }
    }

    const getStatusBadge = (status) => {
        if (status === 'WIP') {
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">WIP</Badge>
        } else if (status === 'Delivered') {
            return <Badge variant="secondary" className="bg-green-100 text-green-800">Delivered</Badge>
        }
        return <Badge variant="outline">{status}</Badge>
    }

    const getProfileBadge = (profile) => {
        if (profile === 'High Priority' || profile === 'Critical') {
            return <Badge variant="destructive">{profile}</Badge>
        } else if (profile === 'Medium Priority') {
            return <Badge variant="secondary">{profile}</Badge>
        }
        return <Badge variant="outline">{profile}</Badge>
    }

    const getTimingBadge = (timing) => {
        if (timing === 'This Month') {
            return <Badge variant="default" className="bg-blue-100 text-blue-800">This Month</Badge>
        } else if (timing === 'Next Month') {
            return <Badge variant="outline" className="border-purple-200 text-purple-700">Next Month</Badge>
        } else if (timing === 'Previous Month') {
            return <Badge variant="outline" className="border-gray-200 text-gray-700">Previous Month</Badge>
        }
        return <Badge variant="outline">{timing}</Badge>
    }

    if (projects.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-gray-500 text-lg mb-4">No projects found</p>
                    <p className="text-gray-400">Try adjusting your search or filters</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Projects Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Project Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Days</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Profile</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Assignees</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phase</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Deadline</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Budget</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Value</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Timing</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{project.projectName}</div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{project.days}</td>
                                        <td className="py-3 px-4">{getProfileBadge(project.profile)}</td>
                                        <td className="py-3 px-4">{getStatusBadge(project.deliveryStatus)}</td>
                                        <td className="py-3 px-4 text-gray-600 max-w-[150px] truncate" title={project.assignees}>
                                            {project.assignees}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{project.department}</td>
                                        <td className="py-3 px-4 text-gray-600">{project.currentPhase || '-'}</td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">${(project.amount || 0).toLocaleString()}</td>
                                        <td className="py-3 px-4 text-gray-600">${(project.value || 0).toLocaleString()}</td>
                                        <td className="py-3 px-4">{getTimingBadge(project.timing)}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openProjectDetails(project)}
                                                    className="h-8 w-8 p-0"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEditDialog(project)}
                                                    className="h-8 w-8 p-0"
                                                    title="Edit Project"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(project.id)}
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    title="Delete Project"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                {project.orderSheet && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                        className="h-8 w-8 p-0"
                                                        title="Open Order Sheet"
                                                    >
                                                        <a href={project.orderSheet} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Project Details Dialog */}
            {selectedProject && (
                <ProjectDetailsDialog
                    project={selectedProject}
                    isOpen={isDetailsOpen}
                    onClose={() => {
                        setIsDetailsOpen(false)
                        setSelectedProject(null)
                    }}
                    onEdit={() => {
                        setIsDetailsOpen(false)
                        openEditDialog(selectedProject)
                    }}
                    onDelete={() => {
                        setIsDetailsOpen(false)
                        handleDelete(selectedProject.id)
                        setSelectedProject(null)
                    }}
                />
            )}

            {/* Edit Project Dialog */}
            {editingProject && (
                <EditProjectDialog
                    project={editingProject}
                    isOpen={isEditDialogOpen}
                    onClose={() => {
                        setIsEditDialogOpen(false)
                        setEditingProject(null)
                    }}
                    onUpdate={handleUpdate}
                />
            )}
        </>
    )
}
