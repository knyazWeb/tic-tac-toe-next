"use client";
import SendMessageForm from "@/components/forms/sendMessageForm/sendMessageForm";
import MessageCard from "@/components/ui/messageCard/messageCard";
import { useEffect, useState } from "react";
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
    <div className=" max-w-[420px] w-full self-end max-h-[665px] flex flex-col justify-end pb-[90px] gap-3">
      <div className="relative flex flex-col gap-3 overflow-y-scroll scrollbar-hide">
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
        {/*{messages.length > 0 && <Fade position="bottom" />}*/}
        <SendMessageForm />
      </div>
    </div>
  );
}
