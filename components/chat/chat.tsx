"use client";
import SendMessageForm from "@/components/forms/sendMessageForm/sendMessageForm";
import MessageCard from "@/components/ui/messageCard/messageCard";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/socket/socket";
import Fade from "@/components/chat/fade/fade";

interface IMessage {
  user: string;
  message: string;
  time: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { socket, room } = useSocket();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight - 5);
    setIsScrolledToTop(scrollTop === 0);
  };

  useEffect(() => {
    const chatContainer = chatRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const chatContainer = chatRef.current;
    chatContainer.addEventListener("scroll", handleScroll);
    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (room) {
      socket.on("chat_message", (message: IMessage) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      socket.off("chat_message");
    };
  }, []);
  return (
    <div className="relative max-w-[420px] shrink-0 grow-0 w-full self-end max-h-[665px] flex flex-col justify-end pb-[90px] gap-3">
      {!isScrolledToTop && <Fade className={"absolute top-0 left-0 h-[70px] to-white/0 from-[#F6F6F6]/100 "} />}

      <div
        ref={chatRef}
        className="flex flex-col gap-3 overflow-y-scroll scrollbar-hide pb-1"
      >
        {messages.length > 0 ? (
          messages.map((message, index) => {
            let date = new Date(message?.time);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let formattedTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
            return (
              <MessageCard
                key={index}
                time={formattedTime}
                name={message?.user === room.players[0] ? room.players[0] : room.players[1]}
                isCross={message?.user === room.players[0] ? true : false}
                message={message?.message}
              />
            );
          })
        ) : (
          <div className="text-center text-[#898993] mb-4">Сообщений ещё нет</div>
        )}
      </div>
      <div className="relative">
        {!isScrolledToBottom && (
          <Fade className={"absolute -top-[70px] left-0 h-[70px] from-white/0 to-[#F6F6F6]/100 "} />
        )}
        <SendMessageForm />
      </div>
    </div>
  );
}
