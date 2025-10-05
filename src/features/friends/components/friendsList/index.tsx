"use client";

import { Profile } from "@/features/profile/types/supabase.types";
import FriendCard from "../FriendCard";
import { Event } from "@/shared/types/supabase/supabase";

interface Props {
	friends: Profile[];
	searchResults?: Profile[] | null;
	isSearching?: boolean;
	event?: Event;
	type?: "event" | "link" | "request";
	onClick?: (guest: Profile) => void;
	onClickRequest?: (index: number) => void;
	guests?: Profile[];
	loading?: { [key: number]: boolean };
}

const FriendsList = ({
	friends,
	searchResults,
	isSearching,
	event,
	type,
	onClick,
	guests,
	loading,
	onClickRequest,
}: Props) => {
	const list =
		searchResults ?? (type === "event" ? friends.slice(0, 3) : friends);
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
				list.map((friend, index) => (
					<FriendCard
						loading={loading && Object.values(loading)[index]}
						onClick={onClick}
						onClickRequest={onClickRequest}
						type={type}
						event={event}
						key={friend.id}
						friend={friend}
						index={index}
						isInvited={guests?.some((guest) => guest.id === friend.id)}
					></FriendCard>
				))
			)}
		</div>
	);
};

export default FriendsList;
