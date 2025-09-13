import { ValidationResult } from "@/shared/types/forms";
import { LoginFormSchema } from "../schemas/loginForm";
import z from "zod";
import { SingupFormSchema } from "../schemas/signupForm";

export const validateLoginForm = (
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
