import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";

export async function getCurrentUser(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase.auth.getUser();

	if (error) throw error;

	const user = data.user;
	return user;
}

// export async function getCurrentUserServer() {
// 	const supabase = await createServerClient();
// 	const { data, error } = await supabase.auth.getUser();

// 	if (error) throw error;

// 	const user = data.user;
// 	return user;
// }
