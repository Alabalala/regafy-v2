"use server";

import { createClient } from "@/shared/services/supabase/server";
import { updateProfile } from "../services/supabase";
import { ValidateProfileFormData } from "../services/validateProfileFormData";
import { ProfileFormData } from "../types/form.types";
import { Profile } from "../types/supabase.types";

export default async function updateProfileAction(
	formData: ProfileFormData,
	id: string,
): Promise<
	| { success: true; data: Profile }
	| { success: false; errors: Record<string, string[] | undefined> }
> {
	const supabase = await createClient();
	const validationResult = await ValidateProfileFormData(formData);

	if (!validationResult.success) {
		return { success: false, errors: validationResult.errors };
	}

	try {
		const profile = await updateProfile(formData, id, supabase);
		return { success: true, data: profile };
	} catch (error) {
		console.log(error);
		return {
			success: false,
			errors: {
				root: [`There was a problem updating your profile`],
			},
		};
	}
}
