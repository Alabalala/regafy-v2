import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { SingupFormSchema } from "../schemas/signupForm";
import { SignUpFormTypes } from "../types/forms";

export const validateSignUpForm = (
	formData: SignUpFormTypes,
): ValidationResult => {
	const result = SingupFormSchema.safeParse(formData);

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
