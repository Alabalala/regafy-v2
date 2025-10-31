import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function uploadImageFile(
	id: string | number,
	file: File,
	supabase: SupabaseClient<Database>,
	store: "gift-images" | "event-images" | "profile-images" | "images",
) {
	const fileName = id.toString();
	const { error } = await supabase.storage.from(store).upload(fileName, file, {
		cacheControl: "no-store",
		upsert: true,
	});

	if (error) throw error;

	const publicUrl = supabase.storage.from(store).getPublicUrl(fileName)
		.data.publicUrl;

	return publicUrl;
}
