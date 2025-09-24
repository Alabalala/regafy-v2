import { Database } from "@/shared/types/database.types";
import { Gift } from "@/shared/types/supabase/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getFeed(
	userId: string,
	friendsIds: string[],
	page = 0,
	pageSize = 10,
	supabase: SupabaseClient<Database>,
): Promise<Gift[]> {
	const ids = [...friendsIds, userId];

	const { data, error } = await supabase
		.from("gifts")
		.select(
			`
        *,
        profiles!gifts_added_by_fkey(*),
        questions!questions_gift_id_fkey(
            *,
            answers!answers_question_id_fkey(*)
        )
    `,
		)
		.in("profile_id", ids)
		.order("created_at", { ascending: false })
		.range(page * pageSize, (page + 1) * pageSize - 1);

	if (error) throw error;

	return (data as unknown as Gift[]) ?? [];
}
