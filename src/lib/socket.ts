import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

let io: SocketIOServer;

export function initSocketServer(server: NetServer) {
  if (!io) {
    io = new SocketIOServer(server, {
      path: '/api/socketio',
      addTrailingSlash: false,
    });

    io.on('connection', async (socket) => {
      try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
          socket.disconnect();
          return;
        }

        // Join user's room
        socket.join(session.user.id);

        socket.on('disconnect', () => {
          socket.leave(session.user.id);
        });
      } catch (error) {
        console.error('Socket connection error:', error);
        socket.disconnect();
      }
    });
  }

  return io;
}

export function getSocketServer() {
  return io;
} 