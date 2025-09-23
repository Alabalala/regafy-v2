import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { ProfileFormData } from "../types/form.types";
import { ProfileFormSchema } from "../schemas/profileFormSchema";

export const ValidateProfileFormData = (
	formData: ProfileFormData,
): ValidationResult => {
	const result = ProfileFormSchema.safeParse(formData);

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
