import z from "zod";

const today = new Date();

export const eventFormSchema = z.object({
	title: z.string().trim().min(3, "titleTooShort").max(30, "titleTooLong"),
	description: z
		.string()
		.trim()
		.min(5, "descriptionTooShort")
		.max(500, "descriptionTooLong"),
	date: z.string().refine((val) => new Date(val) > today, {
		message: "dateInPast",
	}),
});
