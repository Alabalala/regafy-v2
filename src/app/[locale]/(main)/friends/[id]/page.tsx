import { getCurrentUser } from "@/features/auth/services/supabase";
import NotAFriend from "@/features/friends/components/NotAFriend";
import FriendGiftList from "@/features/gifts/components/FriendGiftList";
import { getGifts } from "@/features/gifts/services/supabase";
import ProfileBirthday from "@/features/profile/components/ProfileBirthday";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import {
	checkIfFriends,
	getProfile,
} from "@/features/profile/services/supabase";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import ClientToaster from "@/shared/components/ClientToaster";
import LoadingComponent from "@/shared/components/loadingModule";
import Modal from "@/shared/components/Modal";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";
import { Gift } from "@/shared/types/supabase/supabase";
import { redirect } from "next/navigation";

interface Props {
	params: Promise<{ [key: string]: string }>;
}

export default async function FriendProfile({ params }: Props) {
	const id = (await params).id;
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const isFriend = await checkIfFriends(user.id, id, supabase);
	let profile: Profile | null = null;
	let gifts: Gift[] = [];
	try {
		profile = await getProfile(id, supabase);
		gifts = await getGifts(id, supabase);
	} catch (err) {
		console.log(err);
	}
	if (!id || !profile || !gifts) return <LoadingComponent />;
	if (user.id === id) {
		redirect(getPath("Gifts"));
	}
	return (
		<div className="flex flex-col gap-4">
			<ClientToaster />
			<div className="flex flex-col gap-4">
				<ProfileInfo
					canEdit={false}
					profile={profile}
				/>
				{isFriend && (
					<ProfileBirthday birthday={profile.birthday}></ProfileBirthday>
				)}
			</div>

			{isFriend && (
				<div className="flex flex-col gap-6">
					<div>
						<h2 className="text-xl font-bold">Gift list</h2>
						<FriendGiftList gifts={gifts}></FriendGiftList>
					</div>
					<hr />

					<div className="flex flex-row justify-center">
						<Modal
							buttons={{
								initial: { variant: "delete", text: "Delete friend" },
								leftButton: { isPlain: true, text: "Cancel", isCancel: true },
								rightButton: {
									variant: "delete",
									text: "Delete",
									method: "DELETE",
									apiRoute: "/api/friends/delete/" + id + "/" + user.id,
								},
							}}
							modalTitle={"Delete friend?"}
							modalContent={"Are you sure? You won't be able to undo this."}
							redirect={getPath("Friends")}
						/>
					</div>
				</div>
			)}

			{!isFriend && (
				<NotAFriend
					userId={user.id}
					profile={profile}
				></NotAFriend>
			)}
		</div>
	);
}
