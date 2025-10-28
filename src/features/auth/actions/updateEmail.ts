"use server";

import { validateForm } from "@/shared/services/validateData";
import { updateEmailFormSchema } from "../schemas/updateEmail";
import { updateEmail } from "../services/supabase";
import { UpdateEmailFormTypes } from "../types/forms";

export const updateEmailAction = async (formData: UpdateEmailFormTypes) => {
	const result = validateForm(updateEmailFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { email } = formData;
	try {
		const result = await updateEmail(email);
		console.log(result);
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
