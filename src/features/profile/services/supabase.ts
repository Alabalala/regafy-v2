import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { ProfileFormData } from "../types/form.types";

//Create a profile for the auth user
export async function createProfile(
	formData: ProfileFormData,
	supabase: SupabaseClient<Database>,
) {
	const { name, userName, birthday } = formData;

	const { data, error } = await supabase
		.from("profiles")
		.insert({ name: name, userName: userName, birthday: birthday })
		.select("*")
		.single();

	if (error) throw error;

	return data;
}

export async function updateProfile(
	formData: ProfileFormData,
	profileId: string,
	supabase: SupabaseClient<Database>,
) {
	const { name, userName, birthday } = formData;

	const { error } = await supabase
		.from("profiles")
		.update({ name, userName, birthday })
		.eq("id", profileId);

	if (error) throw error;
}

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

export async function uploadProfileImage(
	image: File,
	profileId: string,
	supabase: SupabaseClient<Database>,
) {
	const fileName = profileId;
	const { error } = await supabase.storage
		.from("profile-images")
		.upload(fileName, image, {
			cacheControl: "no-store",
			upsert: true,
		});

	if (error) throw error;

	const publicUrl = supabase.storage
		.from("profile-images")
		.getPublicUrl(fileName).data.publicUrl;

	return publicUrl;
}

export async function updateProfileImage(
	image: File,
	profileId: string,
	supabase: SupabaseClient<Database>,
) {
	const imageLink = await uploadProfileImage(image, profileId, supabase);

	const { error } = await supabase
		.from("profiles")
		.update({ profileImage: imageLink })
		.eq("id", profileId);

	if (error) throw error;

	return imageLink;
}
