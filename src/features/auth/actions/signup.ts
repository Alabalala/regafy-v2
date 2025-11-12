"use server";

import { validateForm } from "@/shared/services/validateData";
import { SignupFormSchema } from "../schemas/signupForm";
import { signup } from "../services/supabase";
import { SignUpFormTypes } from "../types/forms";
import { getSignupErrorCode } from "../services/getSignupErrorCode";

export const signupAction = async (formData: SignUpFormTypes) => {
	const result = validateForm(SignupFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		const signupResult = await signup(formData);

		if (signupResult.error) {
			const errorCode = getSignupErrorCode(signupResult.error);

			return {
				success: false,
				errors: {
					root: errorCode,
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
				root: "generic",
			},
		};
	}
};
