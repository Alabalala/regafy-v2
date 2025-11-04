import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
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

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (session) {
				const {
					data: { user },
					error,
				} = await supabase.auth.getUser();
				setUser(user ?? null);
			} else {
				setUser(null);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [setUser]);

	return [user];
}
