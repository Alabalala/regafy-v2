import { useUser } from "@/features/auth/hooks/useUser";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";

interface Props {
	friend: Profile;
	isFriend?: boolean;
	event?: Event;
}

const FriendCard = ({ friend, event }: Props) => {
	const [user] = useUser();
	let isInvited;
	if (event) {
		isInvited = user && event.guests.find((guest) => guest.id === user.id);
	}

	return (
		<div className="flex flex-row justify-between border-2 px-5 py-2 items-center rounded-lg">
			<ProfileInfo
				sided
				profile={friend}
			></ProfileInfo>
			<div>
				{event ? (
					isInvited ? (
						<Button
							disabled
							variant="secondary"
						>
							Invited
						</Button>
					) : (
						<Button variant="primary">Invite</Button>
					)
				) : (
					<NextLink
						variant="primary"
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
