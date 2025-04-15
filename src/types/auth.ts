export type Role = 'ADMIN' | 'CLIENT' | 'USER';
export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING';

export const ROLES = {
  ADMIN: 'ADMIN' as Role,
  CLIENT: 'CLIENT' as Role,
  USER: 'USER' as Role
} as const;

export const STATUSES = {
  ACTIVE: 'ACTIVE' as Status,
  INACTIVE: 'INACTIVE' as Status,
  PENDING: 'PENDING' as Status
} as const;

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  role: Role;
  status: Status;
  token?: string;
} 