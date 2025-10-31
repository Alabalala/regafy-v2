"use server";

import { validateForm } from "@/shared/services/validateData";
import { LoginFormSchema } from "../schemas/loginForm";
import { login } from "../services/supabase";
import { LoginFormTypes } from "../types/forms";

export const loginAction = async (formData: LoginFormTypes) => {
	const result = validateForm(LoginFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		const loginResult = await login(formData);

		if (loginResult.error) {
			return {
				success: false,
				errors: {
					root: loginResult.error,
				},
			};
		}

		return {
			success: true,
			data: loginResult,
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
