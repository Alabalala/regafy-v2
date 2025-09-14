import { useRouter } from "next/navigation";
import { getPath } from "@/shared/services/getPath";

export const giftContextMenuHelper = (giftId, profileId) => {
	const router = useRouter();

	return [
		{
			name: "Edit",
			onClick: () => {
				router.push(getPath("Edit gift", giftId));
			},
		},
		{
			name: "Delete Gift",
			onClick: () => {},
		},
		{
			name: "Go to user profile",
			onClick: () => {
				router.push(getPath("Profile", profileId));
			},
		},
	];
};
