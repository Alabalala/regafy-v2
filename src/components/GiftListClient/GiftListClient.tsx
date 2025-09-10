"use client";
import { useEffect } from "react";
import { Gift } from "../../../.next/types/supabase/Gifts";
import { useGiftStore } from "@/stores/giftStore";
import GiftPost from "../GiftPost/GiftPost";
import { useUserStore } from "@/stores/userStore";

interface Props {
	gifts: Gift[];
}

const GiftListClient = ({ gifts }: Props) => {
	const { setGifts } = useGiftStore();
	const { gifts: storeGifts } = useGiftStore();

	useEffect(() => {
		setGifts(gifts);
	}, [gifts, setGifts]);

	return (
		<div className={"flex flex-col gap-5 mt-5"}>
			{storeGifts.map((gift) => (
				<GiftPost
					isOwnGift
					key={gift.id}
					gift={gift}
				></GiftPost>
			))}
		</div>
	);
};

export default GiftListClient;
