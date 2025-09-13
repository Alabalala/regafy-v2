import z from "zod";

export const SingupFormSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(30, "Password must be at most 30 characters long")
		.refine((password) => /[A-Z]/.test(password), {
			message: "Password must contain at least one uppercase letter",
		})
		.refine((password) => /[a-z]/.test(password), {
			message: "Password must contain at least one lowercase letter",
		})
		.refine((password) => /[0-9]/.test(password), {
			message: "Password must contain at least one number",
		})
		.refine((password) => /[!@#$%^&*]/.test(password), {
			message: "Password must contain at least one special character",
		}),
});
