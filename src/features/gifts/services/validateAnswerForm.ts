import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { answerSchema } from "../schema/answerSchema";

export const validateAnswerForm = (value: string): ValidationResult => {
	const result = answerSchema.safeParse({ content: value });

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
