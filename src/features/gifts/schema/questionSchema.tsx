import z from "zod";

export const questionSchema = z.object({
	content: z
		.string()
		.trim()
		.min(3, "Question must be at least 3 characters long")
		.max(100, "Question must be at most 100 characters long"),
});
