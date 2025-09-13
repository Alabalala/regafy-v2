import { ValidationResult } from "@/shared/types/forms";
import { LoginFormSchema } from "../schemas/loginForm";
import z from "zod";

export const validateLoginForm = (
	formData: LoginFormTypes,
): ValidationResult => {
	const result = LoginFormSchema.safeParse(formData);

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
