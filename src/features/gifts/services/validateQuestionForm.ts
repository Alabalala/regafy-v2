import { ValidationResult } from "@/shared/types/forms";
import { questionSchema } from "../schema/questionSchema";
import z from "zod";

export const validateQuestionForm = (value: string): ValidationResult => {
	const result = questionSchema.safeParse({ content: value });

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
