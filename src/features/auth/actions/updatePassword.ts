"use server";

import { validateForm } from "@/shared/services/validateData";
import { updatePasswordFormSchema } from "../schemas/updatePassword";
import { updatePassword } from "../services/supabase";
import { UpdatePasswordFormTypes } from "../types/forms";

export const updatePasswordAction = async (
	formData: UpdatePasswordFormTypes,
) => {
	const result = validateForm(updatePasswordFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { password } = formData;
	try {
		await updatePassword(password);
		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
			errors: {
				root: (error as Error).message ?? "There's been an error, try again later.",
			},
		};
	}
};
