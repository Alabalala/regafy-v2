import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

import { getCurrentUser } from "../services/supabase";
import { createClient } from "@/shared/services/supabase/client";

export function useUser() {
	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const supabase = createClient();

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (data?.user) setUser(data.user);
		};

		fetchUser();

		const { data: listener } = supabase.auth.onAuthStateChange(
			async (_event, session) => {
				if (session) {
					const {
						data: { user },
						error,
					} = await supabase.auth.getUser();
					setUser(user ?? null);
				} else {
					setUser(null);
				}
			},
		);

		return () => {
			listener.subscription.unsubscribe();
		};
	}, [setUser]);

	return [user];
}
