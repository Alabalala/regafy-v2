import { useRouter } from "next/navigation";
import { getPath } from "@/shared/services/getPath";
import { MenuItem } from "../types/helperFunction.types";

export const giftContextMenuHelper = (
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
			label: "Go to user profile",
			onClick: () => {
				router.push(getPath("Profile", profileId));
			},
		},
	];
};
