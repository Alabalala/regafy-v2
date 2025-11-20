import { useRouter } from "next/navigation";
import { getPath } from "@/shared/services/getPath";
import { MenuItem } from "../../../shared/types/helperFunction.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/shared/types/database.types";
import { deleteGift } from "./supabase";

export const OwnGiftContextMenuHelper = (
	giftId: string,
	deleteGift: (giftId: string) => void,
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
			onClick: () => {
				deleteGift(giftId);
			},
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
