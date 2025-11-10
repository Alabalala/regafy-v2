"use server";

import { validateForm } from "@/shared/services/validateData";
import { ForgotPasswordFormSchema } from "../schemas/forgotPassword";
import { sendPasswordRecoveryEmail } from "../services/supabase";
import { ForgotPasswordFormTypes } from "../types/forms";

export const sendPasswordRecoveryAction = async (
	formData: ForgotPasswordFormTypes,
) => {
	const result = validateForm(ForgotPasswordFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { email } = formData;
	try {
		const result = await sendPasswordRecoveryEmail(email);

		if (result.error) {
			return {
				success: false,
				errors: {
					root: result.error,
				},
			};
		}

		return {
			success: true,
			data: result.data,
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
