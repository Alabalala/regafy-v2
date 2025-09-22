import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

//Create a profile for the auth user
export async function createProfile(formData, supabase) {
	const { name, userName, avatar, birthday } = formData;

	const { error: profilesError } = await supabase
		.from("profiles")
		.insert({ name: name, userName: userName, avatar: avatar, birthday });

	profilesError && console.error(profilesError);
}

export async function updateProfile(formData, supabase) {
	const { name, userName, avatar, id, birthday } = formData;

	const { error: profilesError } = await supabase
		.from("profiles")
		.update({ name, userName, avatar, birthday })
		.eq("id", id);

	profilesError && console.error(profilesError);
}

//Get profile info
export async function getProfile(
	userId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) throw error;

	return data;
}
