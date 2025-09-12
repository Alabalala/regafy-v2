import z, { success } from "zod";
import { giftFormScheme } from "./giftFormScheme";
import { GiftFormData, ValidationResult } from "../types/form";

export const validateGiftForm = (formData: GiftFormData): ValidationResult => {
	const result = giftFormScheme.safeParse(formData);

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
