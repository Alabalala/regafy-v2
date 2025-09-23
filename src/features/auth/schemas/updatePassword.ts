import z from "zod";

export const updatePasswordFormSchema = z
	.object({
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
		passwordConfirmation: z.string("Password confirmation is required"),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Emails do not match",
		path: ["passwordConfirmation"],
	});
