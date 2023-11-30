import { NextApiResponse } from "next";
import { Server as NetServer } from "net";
import { Server as SocketIOServer } from "socket.io";

/** NextApiResponse에 웹소켓 서버와 관련된 속성을 추가한 타입 */
export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
