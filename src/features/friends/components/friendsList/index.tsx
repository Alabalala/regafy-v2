"use client";

import { Profile } from "@/features/profile/types/supabase.types";
import FriendCard from "../FriendCard";

interface Props {
	friends: Profile[];
	searchResults?: Profile[] | null;
	isSearching?: boolean;
	event?: Event;
}

const FriendsList = ({ friends, searchResults, isSearching, event }: Props) => {
	const list = searchResults ?? friends;
	return (
		<div className="flex flex-col gap-2 relative">
			{list.length === 0 ? (
				<div className="flex flex-col gap-4 relative">
					<div>
						{isSearching
							? ""
							: searchResults !== null && searchResults?.length === 0
								? "No results"
								: "No friends yet"}
					</div>
				</div>
			) : (
				list.map((friend) => (
					<FriendCard
						event={event}
						key={friend.id}
						friend={friend}
					></FriendCard>
				))
			)}
		</div>
	);
};

export default FriendsList;
