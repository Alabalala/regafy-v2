"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { eventFormSchema } from "../schemas/eventFormSchema";
import {
	addImageToEvent,
	createEvent,
	uploadEventImageFile,
} from "../services/supabase";
import { EventFormPayload } from "../types/events";

export const createEventAction = async (formData: EventFormPayload) => {
	const supabase = await createClient();
	const result = validateForm(eventFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		const newEvent = await createEvent(formData, supabase);

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
