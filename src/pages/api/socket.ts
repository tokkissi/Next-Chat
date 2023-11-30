import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseServerIO } from "../../../types/chat";

// next.js 프로젝트 생성 시, App Router를 사용하면 HTTP 메소드인 GET, POST, PUT, DELETE를 API 함수명으로 사용하지 않으면 에러가 발생하므로, App Router를 선택하지 않고 page Router를 사용해서 해결함
// 웹소켓은 HTTP 기반의 프로토콜이지만, 일반 HTTP 요청과는 다르게 동작하기 때문임. 웹소켓은 연결 초기에 HTTP 요청을 통해 핸드셰이크를 수행하지만, 이후에는 전이중(full-duplex) 연결을 통해 데이터를 주고받음. 따라서, 웹소켓은 GET, POST 등의 HTTP 메소드를 사용하지 않고, 대신 지속적인 연결을 통해 데이터를 전송함
// 연결 초기에 웹소켓이 HTTP 요청을 사용한다고 하더라도, 이는 웹소켓 연결을 시작하기 위한 특수한 유형의 HTTP GET 요청임. 웹소켓은 일반적인 HTTP GET 요청을 처리하는 방식과 다름. 일반적인 HTTP GET 요청은 단방향 통신을 위한 것이며, 연결이 완료되면 종료됩니다. 반면, 웹소켓의 GET 요청은 연결을 시작하고, 이후 지속적이고 양방향 통신을 가능하게 함. 그래서 Next.js와 같은 프레임워크에서 일반적인 HTTP 메소드(GET, POST 등)를 사용하여 웹소켓 연결을 처리하려고 하면 문제가 발생함. 웹소켓 연결은 이러한 HTTP 메소드로 처리되지 않고, 별도의 프로토콜 및 처리 메커니즘을 사용하기 때문임
export default async function sockethandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  // 실행중인 웹소켓이 없다면 새 웹소켓 서버 실행
  if (!res.socket.server.io) {
    console.log("Initializing WebSocket");

    // res.socket.server의 기본 타입이 http.Server와 정확히 일치하지 않아서, Socket.IO와 호환되도록 타입을 강제로 맞추기 위해 타입 단언을 사용함
    const httpServer: NetServer = res.socket.server as any;

    // httpServer는 Next.js 서버의 HTTP 서버 인스턴스로, 이를 사용하여 Socket.IO 서버가 클라이언트의 연결 요청을 듣고 처리할 수 있도록 함
    // new ServerIO(httpServer)에서 path 옵션을 포함하지 않은 경우, 기본적으로 Socket.IO는 클라이언트 연결을 위한 기본 경로 /socket.io를 사용함. 이는 Socket.IO 서버와 클라이언트 간의 통신을 위한 기본 엔드포인트로 설정되어 있음. 해당 코드에서는 기본 경로(/socket.io)를 사용해도 되므로 path 옵션을 사용하지 않음
    // path 옵션은 다음의 경우에 사용함
    // 1. 다른 HTTP 요청과 충돌을 피하기 위해서
    // 2. 서버가 프록시 뒤에 있거나 특정 서브디렉토리에서 웹소켓 서비스를 제공해야 하는 경우, 이를 명시하기 위해서
    // 3. 보안, 네트워크 정책, 또는 아키텍처상의 이유로 인해 특정 경로를 통해서만 웹소켓 트래픽을 허용해야 할 수도 있습니다. 이럴 때 path 옵션을 사용하여 이를 구성함
    const io = new ServerIO(httpServer);

    // 클라이언트가 웹소켓 서버에 연결될 때 실행될 이벤트 핸들러를 정의함
    io.on("connection", (socket) => {
      // 클라이언트가 'createdMessage' 이벤트와 함께 메시지를 보낼 때 실행됨
      socket.on("createdMessage", (msg) => {
        // io.emit은 모든 클라이언트(메시지 전송자 포함)에게 클라이언트에서 받은 메시지를 전송
        // 메시지 전송자를 제외한 다른 모두에게 전송하기를 원하면 socket.broadcast.emit가 있지만 이 프로젝트에서는 emit이 적절하므로 io.emit을 사용함
        io.emit("newIncomingMessage", msg);
      });
    });

    //  초기화된 Socket.IO 서버 인스턴스(io)를 Next.js의 서버 객체(res.socket.server)에 할당하여, 추후 요청에서 해당 인스턴스를 재사용할 수 있게 함
    res.socket.server.io = io;

    // 웹소켓이 이미 실행중이라면
  } else {
    console.log("WebSocket already initialized");
  }

  // 해당 api 요청에 대한 응답을 완료하고 연결을 종료함
  res.end();
}
