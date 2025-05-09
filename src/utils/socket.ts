// utils/useSocket.js
"use client";
import { useMemo } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socket = useMemo(() => {
    if (typeof window !== "undefined") {
      return io(process.env.NEXT_PUBLIC_SOCKET_URL);
    }
    return null;
  }, []);

  return socket;
};
