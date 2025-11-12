import z from "zod";

export const LoginFormSchema = z.object({
	email: z.email("invalidEmail"),
	password: z.string().min(6, "minLength").max(30, "maxLength"),
});
