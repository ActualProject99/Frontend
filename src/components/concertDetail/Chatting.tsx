import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// let interval = 3000;
// const socket = io("");
const Chatting = (): JSX.Element => {
  //   const [chat, setChat] = useState<string[]>([]);
  //   const [message, setMessage] = useState<string>("");

  //   const sendMessageHandler = () => {
  //     socket.emit("message", message);
  //     setMessage("");
  //   };

  //   useEffect(() => {
  //     socket.on("message", (message) => {
  //       setChat([...chat, message]);
  //     });
  //   }, []);

  //   const onSocket = () => {
  //     setInterval(() => {
  //       socket.emit("good", "클라이언트 -> 서버");
  //     }, interval);

  //     // socket.on("hi", (data) => console.log(data)); // 서버 -> 클라이언트
  //   };
  return (
    <div>
      {/* <div>
        <h1>Messages</h1>
        <ul>
          {chat.map((data, idx) => {
            return <li key={idx}>{data}</li>;
          })}
        </ul>
      </div>

      <div>
        <h1>Chat Box</h1>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessageHandler}>Send Message</button>
      </div>
      <button
        className="w-[140px] h-10 mr-5 text-white bg-[#7151A1] flex  justify-center items-center rounded-2xl"
        onClick={onSocket}
      >
        socket 통신 시작
      </button> */}
    </div>
  );
};

export default Chatting;
