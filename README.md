# Notification System

A modern notification system built with Next.js, Prisma, and TypeScript. This system provides a comprehensive solution for managing and displaying notifications with support for multiple notification types and delivery channels.

## Features

- Multiple notification types (System Update, Security Alert, Account Update, etc.)
- Multiple delivery channels (Email, SMS, Push, In-App)
- Real-time notification display
- Notification preferences management
- Mark notifications as read/unread
- Delete notifications
- Pagination support
- TypeScript support
- Responsive design

## Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notification-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/notification_db"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── notifications/     # Notification pages
├── components/            # React components
│   └── notifications/     # Notification-related components
├── lib/                   # Utility functions and configurations
│   ├── api/              # API client functions
│   ├── auth.ts           # Authentication configuration
│   └── prisma.ts         # Prisma client configuration
├── types/                # TypeScript type definitions
└── prisma/              # Prisma schema and migrations
```

## API Routes

- `GET /api/notifications` - Get notifications for a user
- `PUT /api/notifications/:id/read` - Mark a notification as read
- `DELETE /api/notifications/:id` - Delete a notification
- `GET /api/notifications/preferences` - Get notification preferences
- `PUT /api/notifications/preferences` - Update notification preferences

## Components

- `NotificationList` - Displays a list of notifications with read/unread status
- `NotificationSettings` - Manages notification preferences for different types and channels

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 