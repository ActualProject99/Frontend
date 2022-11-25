import Badge from "../Badge";
import icons from "../icons";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

type JoinState = "before" | "opened" | "closed";
const Room = ({
  joinState,
  setJoinState,
}: {
  joinState: JoinState;
  setJoinState: Function;
}) => {
  const [startPosition, setStartPosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  const [isMoved, setIsMoved] = useState(false);
  const [messages, setMessages] = useState(["hi", "hello", "bye!"]);
  const [newMessage, setNewMessage] = useState("");
  const roomRef = useRef<HTMLUListElement | null>(null);
  const handleChange = ({ target }: any) => {
    setNewMessage(target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessages((cur) => [...cur, newMessage]);
    setNewMessage("");
  };
  useEffect(() => {
    if (roomRef.current) {
      roomRef.current.scrollTo({ top: roomRef.current.scrollHeight });
    }
  }, [newMessage]);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    if (isMoved) return;
    if (joinState === "opened") {
      setJoinState("closed");
    } else {
      setJoinState("opened");
    }
  };
  const handleMouseDown = (e: any) => {
    if (!ref.current) {
      setStartPosition({
        x: e.pageX,
        y: e.pageY,
      });
    } else {
      setStartPosition({
        x: e.pageX - +ref.current.style.left.slice(0, -2),
        y: e.pageY - +ref.current.style.top.slice(0, -2),
      });
    }
  };
  const xy = (e: any) => {
    setIsMoved(true);
    if (!ref.current || !startPosition.y || !startPosition.x) return;
    ref.current.style.top = `${-startPosition.y + e.pageY}px`;
    ref.current.style.left = `${-startPosition.x + e.pageX}px`;
  };
  useEffect(() => {
    (function () {
      if (!ref.current || !startPosition.y || !startPosition.x) return;
      const firstX = +ref.current.style.left.slice(0, -2);
      const firstY = +ref.current.style.top.slice(0, -2);

      if (!ref.current) return;
      ref.current.addEventListener("mousemove", xy);
      ref.current.addEventListener("mouseup", () => {
        if (!ref.current) return;
        ref.current.removeEventListener("mousemove", xy);
        if (
          firstX === +ref.current.style.left.slice(0, -2) &&
          firstY === +ref.current.style.top.slice(0, -2)
        ) {
          setIsMoved(false);
        }
      });
    })();
  }, [startPosition]);
  const firstX = ref.current && +ref.current.style.left.slice(0, -2);
  const firstY = ref.current && +ref.current.style.top.slice(0, -2);
  const moveOnDoc = useCallback((e: any) => {
    if (isMoved) {
      xy(e);
    }
  }, []);
  const upOndDoc = () => {
    console.log("hi");
    document.removeEventListener("mousemove", moveOnDoc);
    if (!ref.current || !startPosition.y || !startPosition.x) return;
    if (
      firstX === +ref.current.style.left.slice(0, -2) &&
      firstY === +ref.current.style.top.slice(0, -2)
    ) {
      setIsMoved(false);
    }
  };
  useEffect(() => {
    if (!ref.current || !startPosition.y || !startPosition.x) return;

    document.addEventListener("mousemove", moveOnDoc);
    document.addEventListener("mouseup", upOndDoc);
    return () => {
      document.removeEventListener("mouseup", upOndDoc);
    };
  }, [startPosition, isMoved]);
  return (
    <div className="relative">
      <div className="absolute z-10 top-0 left-0" ref={ref}>
        <div
          className="w-32 h-12 bg-lime-400"
          onMouseDown={handleMouseDown}
          onClick={handleClick}
        ></div>
        {joinState === "opened" ? (
          <>
            <ul
              ref={roomRef}
              className="w-32 h-80 bg-lime-200 overflow-y-scroll"
            >
              {messages.map((message, i) => (
                <li key={i}>{message}</li>
              ))}
            </ul>
            <form onSubmit={handleSubmit}>
              <input type="text" value={newMessage} onChange={handleChange} />
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
};
const Chat = () => {
  const [joinState, setJoinState] = useState<JoinState>("before");
  const handleClick = () => {
    if (joinState === "opened") {
      setJoinState("closed");
    } else {
      setJoinState("opened");
    }
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="relative inline-block cursor-pointer"
      >
        <icons.Chat
          iconClassName="w-12 h-12 fill-white"
          className="w-20 h-20 bg-zinc-600 rounded-full flex items-center justify-center text-white"
          strokeWidth={0.5}
        />
        <Badge />
      </div>
      {joinState !== "before" ? (
        <Room joinState={joinState} setJoinState={setJoinState} />
      ) : null}
    </>
  );
};

export default Chat;
