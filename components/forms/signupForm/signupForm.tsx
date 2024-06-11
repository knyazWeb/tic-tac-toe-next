"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "@/components/ui/customInput/customInput";
import CustomButton from "@/components/ui/customButton/customButton";

interface Fields {
  login: string;
  password: string;
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Fields>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Fields> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <CustomInput
          style={{ outlineColor: errors.login && "#E93E3E" }}
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
          placeholder="Пароль"
          {...register("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 8,
              message: "Минимальная длина пароля 8 символов",
            },
          })}
        />
        {errors.password && <p className="text-error text-xs mt-1">{errors.password.message}</p>}
      </div>

      <CustomButton
        type="submit"
        size="medium"
        active={isValid}
      >
        Зарегистрироваться
      </CustomButton>
    </form>
  );
}
