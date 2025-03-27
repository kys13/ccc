import 'next-auth';
import { Role, Status } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      role: Role;
      status: Status;
    };
  }
  
  interface User {
    id: number;
    email: string;
    name: string;
    role: Role;
    status: Status;
  }
} 