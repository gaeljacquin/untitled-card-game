'use client';

import { useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export default function socketInit() {
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = io(`${process.env.serverUrl}`);
  }

  const socket = socketRef.current!;

  return socket;
}
