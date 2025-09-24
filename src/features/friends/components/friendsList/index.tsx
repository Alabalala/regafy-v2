"use client";

import { Profile } from "@/features/profile/types/supabase.types";
import { NextLink } from "@/shared/components/Link/Link";
import FriendLink from "../friendLink";

interface Props {
	friends: Profile[];
}

const FriendsList = ({ friends }: Props) => {
	return (
		<div className="flex flex-col gap-2">
			{friends.length === 0 ? (
				<div className="flex flex-col gap-4">
					<p>No friends yet</p>
					<NextLink
						variant="primary"
						href="/search"
					>
						Find friends
					</NextLink>
				</div>
			) : (
				friends.map((friend) => (
					<FriendLink
						key={friend.id}
						friend={friend}
					></FriendLink>
				))
			)}
		</div>
	);
};

export default FriendsList;
