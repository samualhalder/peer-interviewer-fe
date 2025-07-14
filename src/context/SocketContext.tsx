import { RootState } from "@/redux/store";
import { createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const {user}=useSelector((state:RootState)=>state.user)
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_SOCKET_URL), []);
  socket.emit("connect-user",{userId:user?.id})
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
