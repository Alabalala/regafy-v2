import z from "zod";

export const commentSchema = z.object({
	comment: z.string().trim().min(3, "minLength").max(300, "maxLength"),
});
