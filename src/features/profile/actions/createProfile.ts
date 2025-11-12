"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { ProfileFormSchema } from "../schemas/profileFormSchema";
import { createProfile } from "../services/supabase";
import { ProfileFormData } from "../types/form.types";

export default async function createProfileAction(
	formData: ProfileFormData,
	id: string,
) {
	const supabase = await createClient();
	const validationResult = await validateForm(ProfileFormSchema, formData);

	if (!validationResult.success) {
		return { success: false, errors: validationResult.errors };
	}

	try {
		const profile = await createProfile(formData, supabase, id);
		return { success: true, data: profile };
	} catch (error) {
		return {
			success: false,
			errors: { root: `There was a problem creating your profile: ${error}` },
		};
	}
}
