import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { commentSchema } from "../schemas/commentFormSchema";

export const ValidateCommentForm = (newComment: string): ValidationResult => {
	const result = commentSchema.safeParse({ newComment: newComment });

	if (!result.success) {
		const { fieldErrors } = z.flattenError(result.error);
		return {
			success: false,
			errors: fieldErrors,
		};
	}

	return {
		success: true,
	};
};
