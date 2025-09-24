"use client";
import { Ref, useEffect } from "react";
import { getPath } from "@/shared/services/getPath";
import { useGiftStore } from "../../stores/giftStore";
import { Gift } from "@/shared/types/supabase/supabase";
import { useChangeReserve } from "../../hooks/useChangeReserve";
import GiftList from "../GiftList";

interface Props {
	gifts: Gift[];
	loadMoreRef?: Ref<HTMLDivElement> | null;
}

const UserGiftList = ({ gifts, loadMoreRef }: Props) => {
	const { setGifts } = useGiftStore();
	const { gifts: storeGifts } = useGiftStore();
	const { changeReserve } = useChangeReserve(gifts, setGifts);
	useEffect(() => {
		setGifts(gifts);
	}, [gifts, setGifts]);

	return (
		<GiftList
			gifts={storeGifts}
			changeReserve={changeReserve}
			loadMoreRef={loadMoreRef}
			newGiftLink={getPath("New gift")}
		/>
	);
};

export default UserGiftList;
