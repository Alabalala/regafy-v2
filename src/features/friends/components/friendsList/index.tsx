"use client";

import { useEffect, useState } from "react";
import { getFriendsWithProfile } from "../../services/supabase";
import { useUser } from "@/features/auth/hooks/useUser";
import { createClient } from "@/shared/services/supabase/client";
import { Profile } from "@/features/profile/types/supabase.types";
import Link from "next/link";
import { NextLink } from "@/shared/components/Link/Link";
import FriendLink from "../friendLink";

const FriendsList = () => {
	const [friends, setFriends] = useState<Profile[]>([]);
	const [user] = useUser();
	const supabase = createClient();

	useEffect(() => {
		const fetchFriends = async () => {
			if (user) {
				const fetchedFriends = await getFriendsWithProfile(user?.id, supabase);
				setFriends(fetchedFriends);
			}
		};
		fetchFriends();
	});

	if (!user || !friends) return <p>Loading...</p>;

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
