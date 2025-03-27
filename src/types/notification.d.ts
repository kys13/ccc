import { NotificationType, NotificationChannel } from '@prisma/client';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  link?: string;
  isRead: boolean;
  channels: NotificationChannel[];
  metadata?: Record<string, unknown>;
  expiresAt?: Date;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreference {
  id: number;
  type: NotificationType;
  channels: NotificationChannel[];
  enabled: boolean;
}

export interface NotificationResponse {
  notifications: Notification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 