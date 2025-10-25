import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { GiftImageSchema } from "../schema/giftImageSchema";

export const validateGiftImage = (file: File): ValidationResult => {
	const result = GiftImageSchema.safeParse({ file: file });

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
