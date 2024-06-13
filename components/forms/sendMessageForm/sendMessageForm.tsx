"use client";
import CustomInput from "@/components/ui/customInput/customInput";
import { useForm } from "react-hook-form";
import CustomButtonIcon from "@/components/ui/customButtonIcon/customButtonIcon";
import Send from "/public/send.svg";

interface Fields {
  message: string;
}

export default function SendMessageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Fields>();
  return (
    <form className="w-full">
      <div className="flex gap-3">
        <CustomInput
          id="message"
          type="text"
          name="message"
          placeholder="Сообщение..."
          {...register("message", {
            required: true,
          })}
        />
        <CustomButtonIcon
          icon={Send}
          type="submit"
          active={isValid}
        />
      </div>
    </form>
  );
}
