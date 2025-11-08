"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { eventFormSchema } from "../schemas/eventFormSchema";
import { createEvent } from "../services/supabase";
import { EventFormPayload } from "../types/events";
import { createNotificationAction } from "@/shared/actions/createNotification";

export const createEventAction = async (formData: EventFormPayload) => {
	const supabase = await createClient();
	const result = validateForm(eventFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		const newEvent = await createEvent(formData, supabase);
		await createNotificationAction(
			formData.guests,
			"event",
			newEvent.created_by,
			String(newEvent.id),
		);
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
