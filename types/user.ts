export type UserRole = 'supplier' | 'worker';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    company: string;
    avatar?: string;
    token?: string;
}
