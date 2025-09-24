import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { Profile } from "@/features/profile/types/supabase.types";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";

const FriendLink = ({ friend }: { friend: Profile }) => {
	return (
		<div className="flex flex-row justify-between border-2 px-5 py-2 items-center rounded-lg">
			<ProfileInfo
				sided
				profile={friend}
			></ProfileInfo>
			<div>
				<NextLink
					variant="primary"
					href={getPath("Friend profile", friend.id)}
				>
					View Profile
				</NextLink>
			</div>
		</div>
	);
};

export default FriendLink;
