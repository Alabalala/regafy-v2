"use client";
import { useEffect } from "react";
import GiftPost from "../GiftPost/GiftPost";
import { useUserStore } from "@/features/auth/stores/userStore";
import { NextLink } from "../../../../shared/components/Link/Link";
import { getPath } from "@/shared/services/getPath";
import { useGiftStore } from "../../stores/giftStore";
import { Gift } from "@/shared/types/supabase/supabase";
import { reserveGift } from "../../services/supabase";
import { useUser } from "@/features/auth/hooks/useUser";
import { createClient } from "@/shared/services/supabase/client";

interface Props {
	gifts: Gift[];
	friendId?: string;
}

const GiftListClient = ({ gifts, friendId }: Props) => {
	const { setGifts } = useGiftStore();
	const { gifts: storeGifts } = useGiftStore();
	const [user] = useUser();
	const supabase = createClient();

	useEffect(() => {
		setGifts(gifts);
	}, [gifts, setGifts]);

	const changeReserve = async (giftId: string) => {
		let isReserved = false;
		const updatedGifts = storeGifts.map((gift) => {
			if (gift.id === giftId) {
				isReserved = !gift.reserved;
				return { ...gift, reserved: !gift.reserved };
			}
			return gift;
		});
		setGifts(updatedGifts);
		reserveGift(giftId, supabase, isReserved, user?.id);
	};

	return (
		<div className={"flex flex-col gap-5 mt-5 relative"}>
			{storeGifts.map((gift) => (
				<GiftPost
					key={gift.id}
					gift={gift}
					changeReserve={changeReserve}
				></GiftPost>
			))}
			<NextLink
				variant={"primary"}
				floating
				href={
					friendId ? getPath("New gift for friend", friendId) : getPath("New gift")
				}
			>
				New gift
			</NextLink>
		</div>
	);
};

export default GiftListClient;
