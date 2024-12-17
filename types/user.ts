export type UserRole = 'supplier' | 'store';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

