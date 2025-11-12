"use server";

import { validateForm } from "@/shared/services/validateData";
import { LoginFormSchema } from "../schemas/loginForm";
import { login } from "../services/supabase";
import { LoginFormTypes } from "../types/forms";
import { getLoginErrorCode } from "../services/getLoginErrorCode";

export const loginAction = async (formData: LoginFormTypes) => {
	const result = validateForm(LoginFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "invalidData" } };

	try {
		const loginResult = await login(formData);
		const errorCode = getLoginErrorCode(loginResult.error);
		if (loginResult.error) {
			return {
				success: false,
				errors: {
					root: errorCode,
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
				root: (error as Error).message ?? "generic",
			},
		};
	}
};
