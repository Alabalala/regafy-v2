"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { giftFormSchema } from "../schema/giftForm";
import { updateGift } from "../services/supabase";
import { FormPayloadType } from "../types/form";

export const updateGiftAction = async (
	formData: FormPayloadType,
	giftId: string,
) => {
	const supabase = await createClient();
	const result = validateForm(giftFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "invalidData" } };

	try {
		await updateGift(formData, giftId, supabase);
		return { success: true };
	} catch (error) {
		return {
			success: false,
			errors: {
				root: "generic",
			},
		};
	}
};
