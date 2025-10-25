"use server";

import { validateForm } from "@/shared/services/validateData";
import { SingupFormSchema } from "../schemas/signupForm";
import { signup } from "../services/supabase";
import { SignUpFormTypes } from "../types/forms";

export const signupAction = async (formData: SignUpFormTypes) => {
	const result = validateForm(SingupFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		const signupResult = await signup(formData);

		if (signupResult.error) {
			return {
				success: false,
				errors: {
					root: signupResult.error,
				},
			};
		}

		return {
			success: true,
			data: signupResult,
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
