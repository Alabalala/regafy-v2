"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { eventFormSchema } from "../schemas/eventFormSchema";
import { createEvent, createEventComment } from "../services/supabase";
import { EventFormPayload } from "../types/events";
import { createNotificationAction } from "@/shared/actions/createNotification";
import { commentSchema } from "../schemas/commentFormSchema";

export const createCommentAction = async (
	comment: string,
	eventId: number,
	userId: string,
	guestIds: string[],
) => {
	const supabase = await createClient();
	const result = validateForm(commentSchema, { comment });
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	try {
		const newComment = await createEventComment(
			Number(eventId),
			comment,
			userId,
			supabase,
		);
		const guestsWithoutUser = guestIds.filter((id) => id !== userId);
		await createNotificationAction(guestsWithoutUser, "comment", userId, eventId);
		return { success: true, data: newComment };
	} catch (error) {
		return {
			success: false,
			errors: {
				root: (error as Error).message ?? "There's been an error, try again later.",
			},
		};
	}
};
