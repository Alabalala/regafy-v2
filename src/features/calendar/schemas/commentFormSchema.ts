import z from "zod";

export const commentSchema = z.object({
	comment: z
		.string()
		.trim()
		.min(3, "Comment must be at least 3 characters long")
		.max(300, "Comment must be at most 300 characters long"),
});
