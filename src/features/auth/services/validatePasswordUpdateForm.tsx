import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { UpdatePasswordFormTypes } from "../types/forms";
import { updatePasswordFormSchema } from "../schemas/updatePassword";

export const validateUpdatePasswordForm = (
	formData: UpdatePasswordFormTypes,
): ValidationResult => {
	const result = updatePasswordFormSchema.safeParse(formData);

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
