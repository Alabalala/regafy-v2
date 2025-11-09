"use server";

import { createAdminClient } from "../services/supabase/adminClient";

export async function createNotificationAction(
	userIds: string[],
	type:
		| "event"
		| "event_secret_friend"
		| "request_sent"
		| "request_accepted"
		| "event_comment"
		| "question"
		| "answer",
	senderId: string,
	referenceId: string | number,
) {
	const supabase = await createAdminClient();

	const notifications = userIds.map((userId) => {
		return {
			user_id: userId,
			type,
			sender_id: senderId,
			reference_id: String(referenceId),
		};
	});

	const { error } = await supabase.from("notifications").insert(notifications);

	if (error) throw error;
}
