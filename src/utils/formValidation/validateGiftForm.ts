import z, { success } from "zod";
import { GiftFormData, ValidationResult } from "../../../.next/types/forms";
import { giftFormScheme } from "./giftFormScheme";

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
