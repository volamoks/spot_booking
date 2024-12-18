'use client'

import { useAuth } from '@hooks/auth/useAuth'
import { UserRole } from 'types/user/user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withRoleProtection(WrappedComponent: React.ComponentType, allowedRoles: UserRole[]) {
  return function ProtectedRoute(props: any) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (user && !allowedRoles.includes(user.role)) {
        router.push('/')
      }
    }, [user, router])

    if (!user || !allowedRoles.includes(user.role)) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
