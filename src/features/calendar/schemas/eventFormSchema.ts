import z from "zod";

const today = new Date();

export const eventFormSchema = z.object({
	title: z
		.string()
		.trim()
		.min(3, "Title must be at least 3 characters long")
		.max(30, "Title must be at most 30 characters"),
	description: z
		.string()
		.trim()
		.min(5, "Description must be at least 5 characters long")
		.max(500, "Description must be at most 400 characters"),
	date: z.string().refine((val) => new Date(val) > today, {
		message: "Your event can't be in the past.",
	}),
});
