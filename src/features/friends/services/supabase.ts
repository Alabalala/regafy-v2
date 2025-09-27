import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getFriendsWithProfile(
	userId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("friends")
		.select(
			`
 friend_id,
      friend:profiles!friends_friend_id_fkey(*)
    `,
		)
		.eq("user_id", userId);

	if (error) throw error;

	return data.map((friend) => friend.friend);
}

export async function getFriendsIds(
	userId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("friends")
		.select("friend_id")
		.eq("user_id", userId);

	if (error) throw error;

	return (data ?? []).map((f) => f.friend_id);
}

export async function searchProfilesByUsername(
	query: string,
	supabase: SupabaseClient,
) {
	if (!query) return [];

	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.or(`userName.ilike.${query}%,name.ilike.${query}%`)
		.limit(10)
		.order("userName");
	if (error) {
		throw error;
	}

	return data;
}
