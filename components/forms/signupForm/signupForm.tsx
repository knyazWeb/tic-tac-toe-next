"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/ui/customInput/customInput";
import CustomButton from "@/components/ui/customButton/customButton";
import toast from "react-hot-toast";
import { submitSignupForm } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Fields {
  login: string;
  password: string;
}

export default function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
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
    const toastId = toast.loading("Регистрация...");

    const error = await submitSignupForm(formData);

    if (!error) {
      toast.success("Успешная регистрация", { id: toastId });
      router.replace("/login");
    } else {
      toast.error(String(error), { id: toastId });
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
            required: "Логин обязателен",
            minLength: {
              value: 2,
              message: "Минимальная длина логина 2 символа",
            },
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
            minLength: {
              value: 8,
              message: "Минимальная длина пароля 8 символов",
            },
            maxLength: {
              value: 32,
              message: "Максимальная длина пароля 32 символа",
            },
          })}
        />
        {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
      </div>

      <CustomButton
        type="submit"
        size="medium"
        active={isValid && !isSubmitting}
      >
        Зарегистрироваться
      </CustomButton>
    </form>
  );
}
