import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { createClient } from "@/shared/utils/supabase/client";
import { getCurrentUser } from "../services/supabase";

export function useUser() {
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const supabase = createClient();

	useEffect(() => {
		if (!user) {
			const fetchUser = async () => {
				const supabaseUser = await getCurrentUser(supabase);
				if (supabaseUser) setUser(supabaseUser);
			};

			fetchUser();

			const { data: listener } = supabase.auth.onAuthStateChange(
				(_event, session) => {
					setUser(session?.user ?? null);
				},
			);

			return () => listener.subscription.unsubscribe();
		}
	}, [user, setUser]);

	return [user];
}
