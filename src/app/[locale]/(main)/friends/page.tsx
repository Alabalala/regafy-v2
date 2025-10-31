import { getCurrentUser } from "@/features/auth/services/supabase";
import FriendsRequests from "@/features/friends/components/FriendRequests";
import FriendsList from "@/features/friends/components/friendsList";
import FriendsPanel from "@/features/friends/components/FriendsPanel";
import { getFriendsWithProfile } from "@/features/friends/services/supabase";
import { getAllFriendRequests } from "@/features/profile/services/supabase";
import LoadingComponent from "@/shared/components/loadingModule";
import { createClient } from "@/shared/services/supabase/server";

const FriendsPage = async () => {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const friends = await getFriendsWithProfile(user.id, supabase);
	const friendRequests = await getAllFriendRequests(user.id, supabase);

	if (!user || !friends) return <LoadingComponent />;

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-2xl font-bold">Friends</h1>
			{friendRequests && friendRequests.length > 0 && (
				<FriendsRequests
					userId={user.id}
					friendRequests={friendRequests}
				></FriendsRequests>
			)}
			<FriendsPanel
				type="link"
				friends={friends}
			></FriendsPanel>
		</div>
	);
};

export default FriendsPage;
