export type UserRole = 'supplier' | 'worker';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}
