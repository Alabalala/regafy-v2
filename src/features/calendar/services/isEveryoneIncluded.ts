import { Profile } from "@/features/profile/types/supabase.types";
import { SecretFriendType } from "@/shared/types/supabase/supabase";
import { Assigments } from "../types/events";

export const isEveryoneIncluded = (
	secretFriend: SecretFriendType[] | Assigments[],
	guests: Profile[],
	userId: string,
	creatorId: string,
) => {
	const guestsIncluded = secretFriend.every(
		(s) => s.user_id === userId || guests.some((g) => g.id === s.user_id) || s.user_id === creatorId,
	);

	const userIncluded = secretFriend.some((s) => s.user_id === userId);
	const allIncluded = guestsIncluded && userIncluded;
	console.log({ userIncluded, allIncluded });
	return {
		userIncluded,
		allIncluded,
	};
};
