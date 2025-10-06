import { Database } from "@/shared/types/database.types";
import { Notification } from "@/shared/types/supabase/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { title } from "process";

export const getAllNotifications = async (
	userId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("notifications")
		.select(
			`
    *,
    sender:profiles!notifications_sender_id_fkey(*)
  `,
		)

		.eq("user_id", userId)
		.eq("read", false)
		.order("created_at", { ascending: false })
		.limit(10);
	if (error) throw error;
	return data;
};

export const markNotificationAsRead = async (
	id: number,
	supabase: SupabaseClient,
) => {
	const { data, error } = await supabase
		.from("notifications")
		.update({ read: true })
		.eq("id", id);
	if (error) throw error;
	return data;
};

export const createNotification = async (
	subject: string,
	message: string,
	referenceId: string,
	senderId: string,
	user_id: string,
	type: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase.from("notifications").insert({
		subject,
		message,
		reference_id: referenceId,
		sender_id: senderId,
		type,
		read: false,
		user_id,
	});
	if (error) throw error;
	return data;
};
