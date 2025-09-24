import { useUser } from "@/features/auth/hooks/useUser";
import { createClient } from "@/shared/services/supabase/client";
import { Gift } from "@/shared/types/supabase/supabase";
import { reserveGift } from "../services/supabase";

export function useChangeReserve(
	gifts: Gift[],
	setGifts: (gifts: Gift[]) => void,
) {
	const [user] = useUser();
	const supabase = createClient();

	const changeReserve = async (giftId: string) => {
		let isReserved = false;
		const updatedGifts = gifts.map((gift) => {
			if (gift.id === giftId) {
				isReserved = !gift.reserved;
				return { ...gift, reserved: !gift.reserved };
			}
			return gift;
		});

		setGifts(updatedGifts);
		await reserveGift(giftId, supabase, isReserved, user?.id);
	};

	return { changeReserve };
}
