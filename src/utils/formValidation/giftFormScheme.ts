import z from "zod";

export const giftFormScheme = z.object({
	title: z
		.string()
		.trim()
		.min(3, "Title must be at least 3 characters long")
		.max(30, "Title must be at most 30 characters"),
	description: z
		.string()
		.trim()
		.min(
			3,
			"Description must be at least 3 characters long. If you don't want a description, leave it empty!",
		)
		.max(400, "Description must be at most 300 characters.")
		.optional()
		.or(z.literal("")),
	price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
		message: "Price must be a positive number",
	}),
	file: z.file().max(10_000_000, "File must be less than 10MB").optional(),
});
