import { useRouter } from "next/navigation";
import { getPath } from "@/shared/services/getPath";
import { MenuItem } from "../../../shared/types/helperFunction.types";

export const OwnGiftContextMenuHelper = (
	giftId: string,
	profileId: string,
): MenuItem[] => {
	const router = useRouter();

	return [
		{
			label: "Edit",
			onClick: () => {
				router.push(getPath("Edit gift", giftId));
			},
		},
		{
			label: "Delete Gift",
			onClick: () => {},
		},
		{
			label: "Go to your profile",
			onClick: () => {
				router.push(getPath("Gifts"));
			},
		},
	];
};

export const FriendGiftContextMenuHelper = (
	giftId: string,
	profileId: string,
): MenuItem[] => {
	const router = useRouter();
	return [
		{
			label: "Go to user profile",
			onClick: () => {
				router.push(getPath("Friend profile", profileId));
			},
		},
	];
};
