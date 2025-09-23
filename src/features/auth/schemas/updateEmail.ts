import z from "zod";

export const updateEmailFormSchema = z
	.object({
		email: z.email("Email is required"),
		emailConfirmation: z.email("Email is required"),
	})
	.refine((data) => data.email === data.emailConfirmation, {
		message: "Emails do not match",
		path: ["emailConfirmation"],
	});
