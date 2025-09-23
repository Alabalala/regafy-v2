"use client";

import { createClient } from "@/shared/services/supabase/client";
import { useRouter } from "next/navigation";
import { useUserStore } from "../stores/userStore";
import { getPath } from "@/shared/services/getPath";
import { useProfileStore } from "@/features/profile/store/profileStore";

export function useLogout() {
	const supabase = createClient();
	const router = useRouter();
	const { clearUser } = useUserStore();
	const { clearProfile } = useProfileStore();

	async function logout() {
		try {
			await supabase.auth.signOut();
			clearUser();
			clearProfile();
			router.push(getPath("Login"));
		} catch (err) {
			console.error("Error logging out:", err);
		}
	}

	return { logout };
}
