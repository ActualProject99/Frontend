// import classNames from "classnames";
// import {
//   ChangeEvent,
//   FormEvent,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000/chat");

// interface IChat {
//   username: string;
//   message: string;
// }

// const Chatting = () => {
//   const [chats, setChats] = useState<IChat[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const chatContainerEl = useRef<HTMLDivElement>(null);

//   // 채팅이 길어지면(chats.length) 스크롤이 생성되므로, 스크롤의 위치를 최근 메시지에 위치시키기 위함
//   useEffect(() => {
//     if (!chatContainerEl.current) return;

//     const chatContainer = chatContainerEl.current;
//     const { scrollHeight, clientHeight } = chatContainer;

//     if (scrollHeight > clientHeight) {
//       chatContainer.scrollTop = scrollHeight - clientHeight;
//     }
//   }, [chats.length]);

//   // message event listener
//   useEffect(() => {
//     const messageHandler = (chat: IChat) =>
//       setChats((prevChats) => [...prevChats, chat]);
//     socket.on("message", messageHandler);

//     return () => {
//       socket.off("message", messageHandler);
//     };
//   }, []);

//   const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
//   }, []);

//   const onSendMessage = useCallback(
//     (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       if (!message) return alert("메시지를 입력해 주세요.");

//       socket.emit("message", message, (chat: IChat) => {
//         setChats((prevChats) => [...prevChats, chat]);
//         setMessage("");
//       });
//     },
//     [message]
//   );

//   return (
//     <>
//       <div className="flex flex-col m-auto w-1/2 h-[30rem] border rounded-lg">
//         <h1>WebSocket Chat</h1>
//         <div className="flex flex-col h-52 border p-4" ref={chatContainerEl}>
//           {chats.map((chat, index) => (
//             <div
//               key={index}
//               className={classNames({
//                 my_message: socket.id === chat.username,
//               })}
//             >
//               <span>
//                 {chat.username
//                   ? socket.id === chat.username
//                     ? ""
//                     : chat.username
//                   : ""}
//               </span>
//               <span className="mb-2 bg-[#fff] w-fit p-3 rounded-lg ">
//                 {chat.message}
//               </span>
//             </div>
//           ))}
//         </div>
//         <form
//           className="flex justify-items-center items-center mt-6"
//           onSubmit={onSendMessage}
//         >
//           <input
//             className="flex-grow"
//             type="text"
//             onChange={onChange}
//             value={message}
//           />
//           <button>보내기</button>
//         </form>
//       </div>
//     </>
//   );
// };
// export default Chatting;

import React from "react";

const Chatting = () => {
  return <div>Chatting</div>;
};

export default Chatting;
