import { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_SOCKET_URL), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
