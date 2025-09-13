"use client";
import { useEffect } from "react";
import GiftPost from "../GiftPost/GiftPost";
import { useUserStore } from "@/features/auth/stores/userStore";
import { NextLink } from "../../../../shared/components/Link/Link";
import { getPath } from "@/shared/utils/getPath";
import { useGiftStore } from "../../stores/giftStore";
import { Gift } from "@/shared/types/supabase/supabase";

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
		<div className={"flex flex-col gap-5 mt-5 relative"}>
			{storeGifts.map((gift) => (
				<GiftPost
					isOwnGift
					key={gift.id}
					gift={gift}
				></GiftPost>
			))}
			<NextLink
				variant={"primary"}
				floating
				href={getPath("New gift")}
			>
				New gift
			</NextLink>
		</div>
	);
};

export default GiftListClient;
