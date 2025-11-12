import z from "zod";

export const SignupFormSchema = z.object({
	email: z.email("invalidEmail"),
	password: z
		.string()
		.min(6, "minLength")
		.max(30, "maxLength")
		.refine((password) => /[A-Z]/.test(password), {
			message: "uppercaseRequired",
		})
		.refine((password) => /[a-z]/.test(password), {
			message: "lowercaseRequired",
		})
		.refine((password) => /[0-9]/.test(password), {
			message: "numberRequired",
		})
		.refine((password) => /[!@#$%^&*]/.test(password), {
			message: "specialRequired",
		}),
});
