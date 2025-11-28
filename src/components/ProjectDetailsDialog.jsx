'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Calendar, Users, Building, Target, DollarSign, FileText } from 'lucide-react'

export default function ProjectDetailsDialog({ project, isOpen, onClose, onEdit, onDelete }) {
    if (!project) return null

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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{project.projectName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Status and Profile Row */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Status:</span>
                            {getStatusBadge(project.deliveryStatus)}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Profile:</span>
                            {getProfileBadge(project.profile)}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Timing:</span>
                            {getTimingBadge(project.timing)}
                        </div>
                    </div>

                    {/* Main Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Team & Assignees
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Assignees:</span>
                                        <p className="text-gray-900">{project.assignees}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Team:</span>
                                        <p className="text-gray-900">{project.team}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Department:</span>
                                        <p className="text-gray-900">{project.department}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        Project Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Current Phase:</span>
                                        <p className="text-gray-900">{project.currentPhase}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Days:</span>
                                        <p className="text-gray-900">{project.days} days</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Plan For:</span>
                                        <p className="text-gray-900">{project.planFor}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Deadline:</span>
                                        <p className="text-gray-900">
                                            {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Delivery Date:</span>
                                        <p className="text-gray-900">
                                            {project.deliveryDate ? new Date(project.deliveryDate).toLocaleDateString() : 'Not set'}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Financial
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Budget Amount:</span>
                                        <p className="text-gray-900 text-lg font-semibold">${(project.amount || 0).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Project Value:</span>
                                        <p className="text-gray-900 text-lg font-semibold text-green-600">${(project.value || 0).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">ROI:</span>
                                        <p className="text-gray-900 text-lg font-semibold text-blue-600">
                                            {project.amount && project.amount > 0 
                                                ? (((project.value || 0) - (project.amount || 0)) / project.amount * 100).toFixed(1)
                                                : '0'
                                            }%
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Order Sheet and Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.orderSheet && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Order Sheet
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild className="w-full">
                                        <a href={project.orderSheet} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            View Order Sheet
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{project.notes || 'No notes available'}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        {onDelete && (
                            <Button onClick={() => {
                                if (confirm('Are you sure you want to delete this project?')) {
                                    onDelete()
                                }
                            }} variant="destructive">
                                Delete Project
                            </Button>
                        )}
                        {onEdit && (
                            <Button onClick={onEdit} variant="default">
                                Edit Project
                            </Button>
                        )}
                        <Button onClick={onClose} variant="outline">
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
