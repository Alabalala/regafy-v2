import { createAdminClient } from "@/shared/services/supabase/adminClient";

export const deleteAccountAction = async (userId: string) => {
	const supabase = await createAdminClient();

	const { error } = await supabase.auth.admin.deleteUser(userId);

	if (error) throw error;

	const { error: deleteProfileError } = await supabase
		.from("profiles")
		.delete()
		.eq("id", userId);

	if (deleteProfileError) throw deleteProfileError;
};
