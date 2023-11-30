"use client";

import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

type Message = {
  author: string;
  message: string;
};

export default function SocketChat() {
  const [username, setUsername] = useState(""); //이름 지정
  const [chosenUsername, setChosenUsername] = useState(""); //선택된 유저 이름 지정
  const [message, setMessage] = useState(""); // 메시지 (채팅창에 치는 중인 글)
  const [messages, setMessages] = useState<Array<Message>>([]); //매세지들 (채티창에 전부 다 쳐서 쌓인 글들)

  const socketRef = useRef<Socket | null>(null);
  const isInitialized = useRef<boolean>(false); // 소켓이 초기화 되었는지 여부

  useEffect(() => {
    // strict mode가 true일때나 다른 상황으로 인해 재랜더링 될때 useEffect가 2번 이상 실행되어 이벤트 리스너가 중복으로 설정되지 않기 위해 소켓 초기화 여부를 확인함
    if (isInitialized.current) {
      return;
    }

    // 소켓에 연결하고 이벤트 리스너를 설정하기 위한 위한 비동기 함수
    const setupSocket = async () => {
      if (!socketRef.current) {
        await fetch("/api/socket");
        socketRef.current = io();
      }

      // 웹소켓에 연결된 상대들에게서 메시지가 도착할 때마다 이 함수가 호출됨
      // 받은 메시지를 채팅 기록(이 코드에서는 messages)에 추가함
      socketRef.current.on("newIncomingMessage", (msg: Message) => {
        setMessages((currentMsg) => [...currentMsg, msg]);
      });
    };

    // 소켓 연결 및 설정 함수 실행
    setupSocket();

    // 소켓이 초기화되었음을 체크함
    isInitialized.current = true;

    return () => {
      // 컴포넌트가 언마운트될 때, 현재 설정된 소켓 연결이 있다면 그 연결을 종료함
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message && socketRef.current) {
      // 서버에 새 메시지 전송함
      // createdMessage 이벤트는 클라이언트에서 서버로 메시지를 보내는 데 사용됨. 이벤트에는 메시지 데이터가 포함됨
      // 클라이언트에서의 emit은 서버에서의 emit과 다르게 서버로의 이벤트 전송의 기능만을 담당함. 자신을 제외한 다른 사용자들에게 전송하는 기능이 아님. 그건 서버에서 사용됐을때의 기능임
      socketRef.current.emit("createdMessage", {
        author: chosenUsername,
        message,
      });

      // // 전송한 메시지를 메시지 목록에 추가
      // // 직접 배열에 추가하여 서버 데이터 교환전에도 UI에 전송한 메시지가 바로 보이도록 함
      // setMessages((currentMsg) => [
      //   ...currentMsg,
      //   { author: chosenUsername, message },
      // ]);
      console.log("Sent Message");
      // 메시지 전송 후 input 초기화
      setMessage("");
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-cyan-700">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {!chosenUsername ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setChosenUsername(username);
              }}
              className="flex flex-col items-center"
            >
              <h3 className="font-bold text-white text-xl ">
                사용할 닉네임을 입력해주세요
              </h3>
              <input
                type="text"
                value={username}
                className="py-2 px-4 rounded-md outline-none my-6"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-white rounded-md px-4 py-2 text-lg font-bold text-black/70"
              >
                채팅 시작하기
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="font-bold text-white text-xl mb-4">
              Username : {username}
            </p>
            <div className="flex flex-col justify-end bg-white h-80 min-w-[10rem] rounded-md shadow-md overflow-hidden">
              <div className="h-full overflow-y-scroll">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className="w-full py-1 px-2 border-b last:border-b-0 border-gray-200"
                      key={i}
                    >
                      {msg.author} : {msg.message}
                    </div>
                  );
                })}
              </div>
              <form
                onSubmit={sendMessage}
                className="border-t border-gray-300 w-full flex rounded-bl-md"
              >
                <input
                  type="text"
                  placeholder="새로운 메시지를 입력하세요"
                  value={message}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="border-l font-bold border-gray-300 flex justify-center items-center rounded-br-md group hover:bg-purple-500/60 transition-all px-3 h-full">
                  Send
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
