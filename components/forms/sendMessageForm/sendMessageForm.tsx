"use client";
import CustomInput from "@/components/ui/customInput/customInput";
import { useForm } from "react-hook-form";
import CustomButtonIcon from "@/components/ui/customButtonIcon/customButtonIcon";
import Send from "/public/send.svg";
import { useContext } from "react";
import { OnlinePlayContext } from "@/contexts/onlinePlayContext";
import { useSocket } from "@/socket/socket";

interface Fields {
  message: string;
}

export default function SendMessageForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Fields>();
  const active = useContext(OnlinePlayContext);
  const { socket, roomId } = useSocket();

  const onSubmit = (data: Fields) => {
    if (isValid) {
      socket.emit("chat_message", data.message, roomId);
      reset();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
    >
      <div className="flex gap-3">
        <CustomInput
          autoComplete={"off"}
          id="message"
          type="text"
          name="message"
          disabled={!active}
          placeholder={active ? "Сообщение..." : "Вас никто не услышит"}
          {...register("message", {
            required: true,
          })}
        />
        <CustomButtonIcon
          icon={Send}
          type="submit"
          active={isValid && active}
        />
      </div>
    </form>
  );
}
