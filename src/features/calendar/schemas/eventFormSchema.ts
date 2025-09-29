import z from "zod";

const today = new Date();

const guestSchema = z.array(z.string());

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
	date: z
		.string()
		.transform((val) => new Date(val))
		.refine((date) => date > today, {
			message: "Your event can't be in the past.",
		}),
	guests: guestSchema,
	image: z
		.file()
		.refine((file) => file.type.startsWith("image/"), "File must be an image")
		.max(5_000_000, "File must be less than 10MB")
		.nullable()
		.optional(),
});
