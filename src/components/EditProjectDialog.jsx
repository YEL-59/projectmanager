'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

export default function EditProjectDialog({ project, isOpen, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        projectName: '',
        days: '',
        profile: '',
        deliveryStatus: 'WIP',
        assignees: '',
        department: '',
        currentPhase: '',
        deadline: '',
        amount: '',
        value: '',
        orderSheet: '',
        planFor: '',
        team: '',
        deliveryDate: '',
        notes: '',
        timing: 'This Month'
    })

    // Populate form when project changes
    useEffect(() => {
        if (project) {
            setFormData({
                projectName: project.projectName || '',
                days: project.days || '',
                profile: project.profile || '',
                deliveryStatus: project.deliveryStatus || 'WIP',
                assignees: project.assignees || '',
                department: project.department || '',
                currentPhase: project.currentPhase || '',
                deadline: project.deadline ? project.deadline.split('T')[0] : '',
                amount: project.amount || '',
                value: project.value || '',
                orderSheet: project.orderSheet || '',
                planFor: project.planFor || '',
                team: project.team || '',
                deliveryDate: project.deliveryDate ? project.deliveryDate.split('T')[0] : '',
                notes: project.notes || '',
                timing: project.timing || 'This Month'
            })
        }
    }, [project])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate required fields
        if (!formData.projectName || !formData.assignees || !formData.department) {
            alert('Please fill in all required fields')
            return
        }

        // Convert numeric fields
        const projectData = {
            ...formData,
            days: parseInt(formData.days) || 0,
            amount: parseFloat(formData.amount) || 0,
            value: parseFloat(formData.value) || 0
        }

        onUpdate(projectData)
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-projectName">Project Name *</Label>
                                    <Input
                                        id="edit-projectName"
                                        value={formData.projectName}
                                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                                        placeholder="Enter project name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-days">Days</Label>
                                    <Input
                                        id="edit-days"
                                        type="number"
                                        value={formData.days}
                                        onChange={(e) => handleInputChange('days', e.target.value)}
                                        placeholder="Number of days"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-profile">Profile</Label>
                                    <Select value={formData.profile} onValueChange={(value) => handleInputChange('profile', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select profile" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High Priority">High Priority</SelectItem>
                                            <SelectItem value="Medium Priority">Medium Priority</SelectItem>
                                            <SelectItem value="Low Priority">Low Priority</SelectItem>
                                            <SelectItem value="Critical">Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-deliveryStatus">Delivery Status</Label>
                                    <Select value={formData.deliveryStatus} onValueChange={(value) => handleInputChange('deliveryStatus', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="WIP">WIP</SelectItem>
                                            <SelectItem value="Delivered">Delivered</SelectItem>
                                            <SelectItem value="On Hold">On Hold</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Team & Department */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Team & Department</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-assignees">Assignees *</Label>
                                    <Input
                                        id="edit-assignees"
                                        value={formData.assignees}
                                        onChange={(e) => handleInputChange('assignees', e.target.value)}
                                        placeholder="Enter assignee names"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-department">Department *</Label>
                                    <Input
                                        id="edit-department"
                                        value={formData.department}
                                        onChange={(e) => handleInputChange('department', e.target.value)}
                                        placeholder="Enter department"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-team">Team</Label>
                                    <Input
                                        id="edit-team"
                                        value={formData.team}
                                        onChange={(e) => handleInputChange('team', e.target.value)}
                                        placeholder="Enter team name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-currentPhase">Current Phase</Label>
                                    <Input
                                        id="edit-currentPhase"
                                        value={formData.currentPhase}
                                        onChange={(e) => handleInputChange('currentPhase', e.target.value)}
                                        placeholder="e.g., Planning, Design, Development"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-deadline">Deadline</Label>
                                    <Input
                                        id="edit-deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-deliveryDate">Delivery Date</Label>
                                    <Input
                                        id="edit-deliveryDate"
                                        type="date"
                                        value={formData.deliveryDate}
                                        onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-timing">Timing Category</Label>
                                    <Select value={formData.timing} onValueChange={(value) => handleInputChange('timing', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="This Month">This Month</SelectItem>
                                            <SelectItem value="Next Month">Next Month</SelectItem>
                                            <SelectItem value="Previous Month">Previous Month</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Financial */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-amount">Budget Amount ($)</Label>
                                    <Input
                                        id="edit-amount"
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) => handleInputChange('amount', e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-value">Project Value ($)</Label>
                                    <Input
                                        id="edit-value"
                                        type="number"
                                        step="0.01"
                                        value={formData.value}
                                        onChange={(e) => handleInputChange('value', e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-orderSheet">Order Sheet URL</Label>
                                    <Input
                                        id="edit-orderSheet"
                                        type="url"
                                        value={formData.orderSheet}
                                        onChange={(e) => handleInputChange('orderSheet', e.target.value)}
                                        placeholder="https://docs.google.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-planFor">Plan For</Label>
                                    <Input
                                        id="edit-planFor"
                                        value={formData.planFor}
                                        onChange={(e) => handleInputChange('planFor', e.target.value)}
                                        placeholder="e.g., Q1 2024 Launch, App Store Release"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-notes">Notes</Label>
                                    <Textarea
                                        id="edit-notes"
                                        value={formData.notes}
                                        onChange={(e) => handleInputChange('notes', e.target.value)}
                                        placeholder="Additional notes about the project..."
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Update Project
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

