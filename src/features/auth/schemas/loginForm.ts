import z from "zod";

export const LoginFormSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(30, "Password must be at most 30 characters long"),
});
