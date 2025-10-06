import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

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
