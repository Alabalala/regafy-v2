import z from "zod";

export const answerSchema = z.object({
	answer: z
		.string()
		.trim()
		.min(3, "Answer must be at least 3 characters long")
		.max(100, "Answer must be at most 100 characters long"),
});
