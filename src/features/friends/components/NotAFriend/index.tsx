"use client";
import {
	acceptFriendRequest,
	getFriendRequest,
	sendFriendRequest,
} from "@/features/profile/services/supabase";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import { createClient } from "@/shared/services/supabase/client";
import { useToastStore } from "@/shared/stores/toastStore";
import { FriendRequestType } from "@/shared/types/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
	profile: Profile;
	userId: string;
}

const NotAFriend = ({ userId, profile }: Props) => {
	const [hasFriendRequest, setHasFriendRequest] =
		useState<FriendRequestType | null>(null);
	const supabase = createClient();
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const { setMessage } = useToastStore();

	useEffect(() => {
		const checkFriendRequest = async () => {
			const data = await getFriendRequest(userId, profile.id, supabase);
			setHasFriendRequest(data);
			setLoading(false);
		};
		checkFriendRequest();
	}, [userId, profile.id, supabase]);

	const sendRequest = async () => {
		setErrorMessage("");
		setLoading(true);
		try {
			const request = await sendFriendRequest(profile.id, userId, supabase);
			setHasFriendRequest(request);
			setMessage("Friend request sent!");
		} catch (err) {
			console.log(err);
			setErrorMessage("There's been an error, try again later.");
		} finally {
			setLoading(false);
		}
	};

	const AcceptRequest = async () => {
		if (!hasFriendRequest) {
			return;
		}
		setErrorMessage("");
		setLoading(true);
		try {
			await acceptFriendRequest(userId, profile.id, hasFriendRequest.id, supabase);
			router.refresh();
			setMessage("Friend added!");
		} catch (err) {
			console.log(err);
			setErrorMessage("There's been an error, try again later.");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="bg-tertiary dark:bg-tertiary-dark p-2 rounded border-2 opacity-60">
				<p>You and {profile.name} are not friends yet.</p>
			</div>
			{hasFriendRequest && hasFriendRequest.sender_id === userId && (
				<Button disabled={true}>Request sent</Button>
			)}
			{hasFriendRequest && hasFriendRequest.sender_id === profile.id && (
				<div className="flex flex-col gap-2 items-center">
					<p>{profile.name} has sent you a friend request</p>
					<Button
						onClick={AcceptRequest}
						loading={loading}
					>
						Accept request
					</Button>
				</div>
			)}
			{!hasFriendRequest && (
				<Button
					loading={loading}
					onClick={sendRequest}
				>
					Send request
				</Button>
			)}
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
		</div>
	);
};

export default NotAFriend;
