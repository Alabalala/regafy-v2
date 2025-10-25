"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { giftFormScheme } from "../services/giftFormScheme";
import { updateGift } from "../services/supabase";
import { FormPayloadType } from "../types/form";

export const updateGiftAction = async (
	formData: FormPayloadType,
	giftId: string,
) => {
	const supabase = await createClient();
	const result = validateForm(giftFormScheme, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		await updateGift(formData, giftId, supabase);
		return { success: true };
	} catch (error) {
		return {
			success: false,
			errors: {
				root: (error as Error).message ?? "There's been an error, try again later.",
			},
		};
	}
};
