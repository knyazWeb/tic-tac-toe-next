"use client";
import CustomInput from "@/components/ui/customInput/customInput";
import { useForm } from "react-hook-form";
import CustomButtonIcon from "@/components/ui/customButtonIcon/customButtonIcon";
import Send from "/public/send.svg";
import { useContext } from "react";
import { OnlinePlayContext } from "@/contexts/singlePlayContext";

interface Fields {
  message: string;
}

export default function SendMessageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Fields>();
  const active = useContext(OnlinePlayContext);
  return (
    <form className="w-full">
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
