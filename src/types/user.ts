export interface User {
  id: number;
  email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: string;
  image?: string | null;
  created_at?: Date;
  updated_at?: Date;
  image_url?: string;
  is_verified?: boolean;
  notification_settings?: {
    email: boolean;
    push: boolean;
  };
}

export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE'; 