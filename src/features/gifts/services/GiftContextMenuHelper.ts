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
			labelKey: "edit",
			onClick: () => {
				router.push(getPath("Edit gift", giftId));
			},
		},
		{
			labelKey: "delete",
			onClick: () => {},
		},
		{
			labelKey: "goToYourProfile",
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
			labelKey: "goToUserProfile",
			onClick: () => {
				router.push(getPath("Friend profile", profileId));
			},
		},
	];
};
