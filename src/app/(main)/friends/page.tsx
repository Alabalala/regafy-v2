import { getCurrentUser } from "@/features/auth/services/supabase";
import FriendsList from "@/features/friends/components/friendsList";
import { getFriendsWithProfile } from "@/features/friends/services/supabase";
import LoadingComponent from "@/shared/components/loadingModule";
import { createClient } from "@/shared/services/supabase/server";

const FriendsPage = async () => {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const friends = await getFriendsWithProfile(user.id, supabase);

	if (!user || !friends) return <LoadingComponent />;
	return (
		<div className={"flex flex-col gap-5"}>
			<h1 className="text-xl font-bold">Friends</h1>
			<FriendsList friends={friends}></FriendsList>
		</div>
	);
};

export default FriendsPage;
