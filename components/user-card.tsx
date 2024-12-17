import { User } from '@/types/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface UserCardProps {
  user: User
  onLogout: () => void
}

export function UserCard({ user, onLogout }: UserCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center space-x-4 p-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          Logout
        </Button>
      </CardContent>
    </Card>
  )
}

