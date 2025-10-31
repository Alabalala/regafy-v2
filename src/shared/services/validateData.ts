import { ZodType } from "zod";
import { ValidationResult } from "../types/forms";
import { flattenError } from "zod";

export const validateForm = <T>(
	schema: ZodType<T>,
	data: unknown,
): ValidationResult => {
	const result = schema.safeParse(data);

	if (!result.success) {
		const flattened = flattenError(result.error);
		return {
			success: false,
			errors: {
				...flattened.fieldErrors, // field-level errors
				root: flattened.formErrors[0] ?? "", // top-level errors, mapped to 'root'
			},
		};
	}

	return { success: true };
};
