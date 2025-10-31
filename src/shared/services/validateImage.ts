import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { imageSchema } from "../schemas/imageSchema";

export const validateImage = (file: File): ValidationResult => {
	const result = imageSchema.safeParse({ file: file });

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
