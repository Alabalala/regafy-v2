import { useUser } from "@/features/auth/hooks/useUser";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";
import { Event } from "@/shared/types/supabase/supabase";

interface Props {
	friend: Profile;
	isFriend?: boolean;
	event?: Event;
	isEvent?: boolean;
	onClick?: (guest: Profile) => void;
	isInvited?: boolean;
}

const FriendCard = ({ friend, isEvent, onClick, isInvited }: Props) => {
	return (
		<div className="flex flex-row justify-between border-2 px-5 py-2 items-center rounded-lg">
			<ProfileInfo
				sided
				profile={friend}
			></ProfileInfo>
			<div className="flex flex-shrink-0">
				{isEvent ? (
					<Button
						onClick={() => onClick?.(friend)}
						shrink
						variant={isInvited ? "delete" : "primary"}
					>
						{isInvited ? "Uninvite" : "Invite"}
					</Button>
				) : (
					<NextLink
						variant="primary"
						shrink
						href={getPath("Friend profile", friend.id)}
					>
						View Profile
					</NextLink>
				)}
			</div>
		</div>
	);
};

export default FriendCard;
