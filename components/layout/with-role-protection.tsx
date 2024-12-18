'use client';

import { useAuth } from 'hooks/auth/useAuth';

export function withRoleProtection(
    WrappedComponent: React.ComponentType,
) {
    return function ProtectedRoute(props: Record<string, unknown>) {
        useAuth();
        return <WrappedComponent {...props} />;
    };
}
