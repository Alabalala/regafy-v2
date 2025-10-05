"use client";
import { acceptFriendRequest } from "@/features/profile/services/supabase";
import { createClient } from "@/shared/services/supabase/client";
import { allFriendRequests } from "@/shared/types/supabase/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FriendsList from "../friendsList";

interface Props {
	friendRequests: allFriendRequests[];
	userId: string;
}

const FriendsRequests = ({ friendRequests, userId }: Props) => {
	const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
	const supabase = createClient();
	const friendRequestsProfiles = friendRequests.map((request) => request.sender);
	const FilteredRequestsProfiles = friendRequestsProfiles.filter(
		(profile) => profile !== null,
	);
	const router = useRouter();
	const acceptRequest = (index: number) => {
		setLoading({ [index]: true });
		try {
			acceptFriendRequest(
				userId,
				FilteredRequestsProfiles[index].id,
				friendRequests[index].id,
				supabase,
			);
			router.refresh();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-xl font-bold">Friend requests</h2>
			<FriendsList
				loading={loading}
				onClickRequest={acceptRequest}
				friends={FilteredRequestsProfiles}
				type="request"
			/>
		</div>
	);
};

export default FriendsRequests;
