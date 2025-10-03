import { Profile } from "@/features/profile/types/supabase.types";
import { SecretFriendType } from "@/shared/types/supabase/supabase";
import { Assigments } from "../types/events";

export const isEveryoneIncluded = (
	secretFriend: SecretFriendType[] | Assigments[],
	guests: Profile[],
	userId: string,
) => {
	const guestsIncluded = secretFriend.some((s) =>
		guests.some((g) => g.id === s.assignee_id),
	);

	const userIncluded = secretFriend.some((s) => s.user_id === userId);
	const allIncluded = guestsIncluded && userIncluded;

	return {
		userIncluded,
		allIncluded,
	};
};
