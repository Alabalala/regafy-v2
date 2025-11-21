import { createAdminClient } from "@/shared/services/supabase/adminClient";

export const deleteAccountAction = async (userId: string) => {
	const supabase = await createAdminClient();

	const { error } = await supabase.auth.admin.deleteUser(
		"715ed5db-f090-4b8c-a067-640ecee36aa0",
	);

	if (error) throw error;

	const { error: deleteProfileError } = await supabase
		.from("profiles")
		.delete()
		.eq("id", userId);

	if (deleteProfileError) throw deleteProfileError;
};
