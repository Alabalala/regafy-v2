import { Database } from "@/shared/types/database.types";
import { Event } from "@/shared/types/supabase/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export const getEvents = async (
	userId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("event_guests")
		.select(
			`
            events!event_guests_event_id_fkey(*)
            `,
		)
		.eq("guest_id", userId)
		.order("created_at", { ascending: false });

	if (error) throw error;

	return data?.map((d) => d.events) ?? [];
};
