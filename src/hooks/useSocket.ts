import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

export function useSocket() {
  const { data: session } = useSession();
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!session?.user) return;

    // Initialize socket connection
    const socket = io({
      path: '/api/socketio',
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [session]);

  return socketRef.current;
} 