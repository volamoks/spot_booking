'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from 'hooks/auth/useAuth';

interface RoleContextType {
    role: string | null;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
    children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
    const { user } = useAuth();
    const role = user?.role || null;

    return <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleContextType {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}

export function ProtectedComponent<T extends Record<string, unknown>>({
    component: Component,
    props,
}: { component: React.ComponentType<T>, props?: T }): React.ReactElement {
    return <Component {...(props as T)} />;
}
