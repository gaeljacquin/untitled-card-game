'use client';

import { useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export default function SocketInit() {
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = io(`${import.meta.env.VITE_SERVER_URL}`);
  }

  const socket = socketRef.current!;

  return socket;
}
