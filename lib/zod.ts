import { object, string } from "zod";

export const loginSchema = object({
  login: string({ required_error: "Login is required" }).min(2, "Login is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(7, "Password must be more than 7 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const signUpSchema = object({
  login: string({ required_error: "Login is required" }).min(2, "Login is required").max(30, "Login must be less than 30 characters"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(7, "Password must be more than 7 characters")
    .max(32, "Password must be less than 32 characters"),
});
