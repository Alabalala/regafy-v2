import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { ProfileImageSchema } from "../schemas/profileImageSchema";

export const ValidateProfileImage = (file: File): ValidationResult => {
	const result = ProfileImageSchema.safeParse({ file: file });
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
