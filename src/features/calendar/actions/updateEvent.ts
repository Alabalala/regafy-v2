"use server";

import { Profile } from "@/features/profile/types/supabase.types";
import { EventFormPayload } from "../types/events";
import {
	addImageToEvent,
	updateEvent,
	uploadEventImageFile,
} from "../services/supabase";
import { createClient } from "@/shared/services/supabase/server";

export const updateEventAction = async (
	formData: EventFormPayload,
	oldGuests: Profile[],
	eventId: number,
) => {
	const supabase = await createClient();
	const result = validateForm(eventFormSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { image, guests, ...eventWithoutImage } = formData;

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
		if (image) {
			const imageLink = await uploadEventImageFile(eventId, image, supabase);
			if (imageLink) {
				await addImageToEvent(eventId, imageLink, supabase);
			}
		}
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
