"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { giftFormSchema } from "../schema/giftForm";

import { createGift } from "../services/supabase";
import { FormPayloadType } from "../types/form";

export const createGiftAction = async (formData: FormPayloadType) => {
	const supabase = await createClient();
	const result = validateForm(giftFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		const newEvent = await createGift(formData, supabase);

		return { success: true, data: newEvent };
	} catch (error) {
		return {
			success: false,
			errors: {
				root: (error as Error).message ?? "There's been an error, try again later.",
			},
		};
	}
};
