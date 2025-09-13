import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { createClient } from "@/shared/utils/supabase/client";

export function useUser() {
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const supabase = createClient();

	useEffect(() => {
		if (!user) {
			supabase.auth.getUser().then(({ data: { user } }) => {
				if (user) setUser(user);
			});

			const { data: listener } = supabase.auth.onAuthStateChange(
				(_event, session) => {
					setUser(session?.user ?? null);
				},
			);

			return () => listener.subscription.unsubscribe();
		}
	}, [user, setUser]);

	return user;
}
