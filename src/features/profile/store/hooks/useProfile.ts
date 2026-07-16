"use client";
import { useEffect } from "react";
import { useProfileStore } from "../profileStore";
import { useUser } from "@/features/auth/hooks/useUser";
import { getProfile } from "../../services/supabase";
import { createClient } from "@/shared/services/supabase/client";
import { useRouter } from "next/navigation";
import { getPath } from "@/shared/services/getPath";

export default function useProfile() {
	const [user] = useUser();
	const { profile, setProfile, clearProfile } = useProfileStore();
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			if (profile && user && profile.id !== user.id) {
				clearProfile();
				return
			}

			if (!profile && user) {
				try {
					const fetchedProfile = await getProfile(user.id, supabase);
					if (!fetchedProfile) {
						router.push(getPath("New profile"));
					}
					setProfile(fetchedProfile);
				} catch (err) {
					console.log(err);
				}
			}
		};
		fetchData();
	}, [profile, user, setProfile, supabase, router]);

	return [profile];
}
