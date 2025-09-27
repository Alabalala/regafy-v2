import { getCurrentUser } from "@/features/auth/services/supabase";
import FriendsPanel from "@/features/friends/components/FriendsPanel";
import { getFriendsWithProfile } from "@/features/friends/services/supabase";
import LoadingComponent from "@/shared/components/loadingModule";
import { createClient } from "@/shared/services/supabase/server";

const FriendsPage = async () => {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const friends = await getFriendsWithProfile(user.id, supabase);

	if (!user || !friends) return <LoadingComponent />;
	return <FriendsPanel friends={friends}></FriendsPanel>;
};

export default FriendsPage;
