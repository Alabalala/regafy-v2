import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";
import { Event } from "@/shared/types/supabase/supabase";
import { useTranslations } from "next-intl";

interface Props {
	friend: Profile;
	isFriend?: boolean;
	event?: Event;
	type?: "event" | "link" | "request";
	onClick?: (guest: Profile) => void;
	onClickRequest?: (index: number) => void;
	isInvited?: boolean;
	loading?: boolean;
	index?: number;
}

const FriendCard = ({
	friend,
	type = "link",
	onClick,
	onClickRequest,
	isInvited,
	loading,
	index,
}: Props) => {
	const tButtons = useTranslations("buttons");

	return (
		<div className="flex flex-row justify-between border-2 px-5 py-2 items-center rounded-lg">
			<ProfileInfo
				canEdit={false}
				sided
				profile={friend}
			></ProfileInfo>
			<div className="flex flex-shrink-0">
				{type === "event" && (
					<Button
						onClick={() => onClick?.(friend as Profile)}
						shrink
						loading={loading}
						loadingText={tButtons("adding")}
						variant={isInvited ? "delete" : "primary"}
					>
						{isInvited ? tButtons("uninvite") : tButtons("invite")}
					</Button>
				)}
				{type === "link" && (
					<NextLink
						variant="primary"
						shrink
						href={getPath("Friend profile", friend.id)}
					>
						{tButtons("viewProfile")}
					</NextLink>
				)}
				{type === "request" && (
					<Button
						loading={loading}
						onClick={() => onClickRequest?.(Number(index))}
						shrink
						variant={"primary"}
					>
						{tButtons("accept")}
					</Button>
				)}
			</div>
		</div>
	);
};

export default FriendCard;
