"use client";

import { createClient } from "@/shared/services/supabase/client";
import { useRouter } from "next/navigation";
import { useUserStore } from "../stores/userStore";
import { getPath } from "@/shared/services/getPath";

export function useLogout() {
	const supabase = createClient();
	const router = useRouter();
	const { clearUser } = useUserStore();

	async function logout() {
		try {
			await supabase.auth.signOut();
			clearUser();
			router.push(getPath("Login"));
		} catch (err) {
			console.error("Error logging out:", err);
		}
	}

	return { logout };
}
