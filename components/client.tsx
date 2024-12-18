'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WorkerProfile {
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    avatar: string;
}

const dummyProfile: WorkerProfile = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    department: 'Store Operations',
    position: 'Store Manager',
    avatar: '/placeholder.svg?height=100&width=100',
};

export function WorkerProfileClient() {
    const [profile, setProfile] = useState<WorkerProfile>(dummyProfile);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Here you would typically send the updated profile to your backend
        console.log('Saving profile:', profile);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Profile"
                description="View and edit your worker profile"
            />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Worker Information
                        <Button onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage
                                src={profile.avatar}
                                alt={profile.name}
                            />
                            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold">{profile.name}</h2>
                            <p className="text-muted-foreground">{profile.position}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Input
                                    id="department"
                                    name="department"
                                    value={profile.department}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position</Label>
                                <Input
                                    id="position"
                                    name="position"
                                    value={profile.position}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        {isEditing && (
                            <Button
                                onClick={handleSave}
                                className="w-full"
                            >
                                Save Changes
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
