import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { EventImageSchema } from "../schemas/eventImageSchema";

export const ValidateEventImage = (file: File): ValidationResult => {
	const result = EventImageSchema.safeParse({ file: file });
	console.log(result);
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
