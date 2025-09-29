"use client";

import { Profile } from "@/features/profile/types/supabase.types";
import FriendCard from "../FriendCard";
import { Event } from "@/shared/types/supabase/supabase";

interface Props {
	friends: Profile[];
	searchResults?: Profile[] | null;
	isSearching?: boolean;
	event?: Event;
	isEvent?: boolean;
	onClick?: (guest: Profile) => void;
	guests?: Profile[];
}

const FriendsList = ({
	friends,
	searchResults,
	isSearching,
	event,
	isEvent,
	onClick,
	guests,
}: Props) => {
	const list = searchResults ?? (isEvent ? friends.slice(0, 3) : friends);
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
						onClick={onClick}
						isEvent={isEvent}
						event={event}
						key={friend.id}
						friend={friend}
						isInvited={guests?.some((guest) => guest.id === friend.id)}
					></FriendCard>
				))
			)}
		</div>
	);
};

export default FriendsList;
