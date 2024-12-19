import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Card, CardContent } from 'components/ui/card';
import { User } from 'types/user';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from 'components/ui/dialog';

interface UserCardProps {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/users/${user.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUserData(data);
            setOpen(true);
        } catch (error) {
            console.error('Failed to fetch user data', error);
        }
    };


    return (
        <>
            <Card onClick={fetchUserData} className="cursor-pointer">
                <CardContent className="flex items-center space-x-4 p-4">
                    <Avatar>
                        <AvatarImage
                            src={user?.avatar}
                            alt={user?.name}
                        />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{userData?.name}</DialogTitle>
                        <DialogDescription>
                            Email: {userData?.email}
                            <br />
                            Role: {userData?.role}
                            <br />
                            Company: {userData?.company}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
