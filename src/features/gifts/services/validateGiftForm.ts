import { giftFormScheme } from "./giftFormScheme";
import { GiftFormData } from "../types/form";
import { ValidationResult } from "@/shared/types/forms";
import z from "zod";

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
