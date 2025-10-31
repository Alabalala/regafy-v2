"use server";

import { validateForm } from "@/shared/services/validateData";
import { LoginFormSchema } from "../schemas/loginForm";
import { login, resetPassword } from "../services/supabase";
import { LoginFormTypes, UpdatePasswordFormTypes } from "../types/forms";
import { updatePasswordFormSchema } from "../schemas/updatePassword";

export const updatePasswordAction = async (
	formData: UpdatePasswordFormTypes,
) => {
	const result = validateForm(updatePasswordFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { password } = formData;
	try {
		const passwordUpdateResult = await resetPassword(password);

		if (passwordUpdateResult.error) {
			return {
				success: false,
				errors: {
					root: passwordUpdateResult.error,
				},
			};
		}

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
