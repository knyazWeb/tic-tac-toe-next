"use client";
import SendMessageForm from "@/components/forms/sendMessageForm/sendMessageForm";
import MessageCard from "@/components/ui/messageCard/messageCard";
import { useEffect, useState } from "react";
import { useSocket } from "@/socket";

export default function Chat() {
  const [messages, setMessages] = useState<any>([]);
  const { socket, players, room } = useSocket();
  useEffect(() => {
    if (room) {
      socket.on("chat_message", (message: string) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      socket.off("chat_message");
    };
  }, []);
  return (
    <div className="max-w-[420px] w-full self-stretch flex flex-col justify-end pb-[88px] gap-3">
      <div className="flex flex-col gap-3">
        {messages.map((message, index) => {
          let date = new Date(message?.time);
          let hours = date.getHours();
          let minutes = date.getMinutes();
          let formattedTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
          return (
            <MessageCard
              key={index}
              time={formattedTime}
              name={message?.user === players[0] ? players[0] : players[1]}
              isCross={message?.user === players[0] ? true : false}
              message={message.message}
            />
          );
        })}
      </div>
      <SendMessageForm />
    </div>
  );
}
