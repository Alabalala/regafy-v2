import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getNews = async (supabase: SupabaseClient<Database>) => {
	const { data, error } = await supabase
		.from("news")
		.select("*")
		.eq("active", true)
		.order("created_at", { ascending: false })
		.limit(5);
	if (error) throw error;
	return data;
};
