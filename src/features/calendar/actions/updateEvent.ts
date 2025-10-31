"use server";

import { Profile } from "@/features/profile/types/supabase.types";
import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { eventFormSchema } from "../schemas/eventFormSchema";
import { updateEvent } from "../services/supabase";
import { EventFormPayload } from "../types/events";

export const updateEventAction = async (
	formData: EventFormPayload,
	oldGuests: Profile[],
	eventId: number,
) => {
	const supabase = await createClient();
	const result = validateForm(eventFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { guests, ...eventWithoutImage } = formData;

	const deletedGuests = oldGuests
		.filter((g) => !guests.includes(g.id))
		.map((g) => g.id);

	const newGuests = guests.filter((id) => !oldGuests.some((g) => g.id === id));

	try {
		await updateEvent(
			eventId,
			eventWithoutImage,
			newGuests,
			deletedGuests,
			supabase,
		);
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
