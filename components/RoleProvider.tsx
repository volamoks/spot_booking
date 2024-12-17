'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { withRoleProtection } from './with-role-protection';
import { UserRole } from '../types/user';
import { useAuth } from '../hooks/useAuth';

interface RoleContextType {
  role: UserRole | null;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const { user } = useAuth();
  const role = user?.role || null;

  return (
    <RoleContext.Provider value={{ role }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

interface ProtectedComponentProps {
  component: React.ComponentType<unknown>;
  allowedRoles: UserRole[];
  props?: Record<string, unknown>;
}

export function ProtectedComponent({ 
  component: Component, 
  allowedRoles,
  props = {}
}: ProtectedComponentProps): React.ReactElement {
  const ProtectedComponent = withRoleProtection(Component, allowedRoles);
  return <ProtectedComponent {...props} />;
}
