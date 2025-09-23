import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { UpdateEmailFormTypes } from "../types/forms";
import { updateEmailFormSchema } from "../schemas/updateEmail";

export const validateUpdateEmailForm = (
	formData: UpdateEmailFormTypes,
): ValidationResult => {
	const result = updateEmailFormSchema.safeParse(formData);

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
