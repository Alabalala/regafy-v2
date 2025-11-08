"use client";
import { acceptFriendRequest } from "@/features/profile/services/supabase";
import { createNotificationAction } from "@/shared/actions/createNotification";
import { createClient } from "@/shared/services/supabase/client";
import { useToastStore } from "@/shared/stores/toastStore";
import { allFriendRequests } from "@/shared/types/supabase/supabase";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
	const { message, setMessage, clearMessage } = useToastStore();
	const t = useTranslations("friends.requests");

	const acceptRequest = async (index: number) => {
		setLoading({ [index]: true });
		try {
			await acceptFriendRequest(
				userId,
				FilteredRequestsProfiles[index].id,
				friendRequests[index].id,
				supabase,
			);
			await createNotificationAction(
				[userId],
				"request_accepted",
				FilteredRequestsProfiles[index].id,
				userId,
			);
			setMessage(t("toast.accepted"));
			router.refresh();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (message) {
			toast.dismiss();
			toast.success(message);
			clearMessage();
		}
	}, [message, clearMessage]);

	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-xl font-bold">{t("requests")}</h2>
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
