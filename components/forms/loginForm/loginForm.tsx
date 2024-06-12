"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CustomInput from "@/components/ui/customInput/customInput";
import CustomButton from "@/components/ui/customButton/customButton";
import { submitLoginForm } from "@/lib/actions";
import { useState } from "react";

interface Fields {
  login: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isValid },
  } = useForm<Fields>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const toastId = toast.loading("Вход...");

    const error = await submitLoginForm(formData);

    if (!error) {
      toast.success("Успешный вход", { id: toastId });
      router.replace("/");
    } else {
      setError("password", { message: "Неправильный пароль или логин" });
      toast.remove(toastId);
    }
    setIsSubmitting(false);
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <CustomInput
          style={{ outlineColor: errors.login && "#E93E3E" }}
          id="login"
          type="text"
          name="login"
          placeholder="Логин"
          {...register("login", {
            onChange: () => {
              clearErrors("password");
            },
            required: "Логин обязателен",
          })}
        />
        {errors.login && <p className="text-error text-xs mt-1">{errors.login.message}</p>}
      </div>
      <div className="mb-3">
        <CustomInput
          style={{ outlineColor: errors.password && "#E93E3E" }}
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          {...register("password", {
            required: "Пароль обязателен",
          })}
        />
        {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
      </div>
      <CustomButton
        type="submit"
        size="medium"
        active={isValid && !isSubmitting}
      >
        Войти
      </CustomButton>
    </form>
  );
}
