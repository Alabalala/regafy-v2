"use client";
import { Ref, useEffect } from "react";
import { getPath } from "@/shared/services/getPath";
import { useGiftStore } from "../../stores/giftStore";
import { Gift } from "@/shared/types/supabase/supabase";
import { useChangeReserve } from "../../hooks/useChangeReserve";
import GiftList from "../GiftList";
import { useToastStore } from "@/shared/stores/toastStore";
import toast from "react-hot-toast";

interface Props {
	gifts: Gift[];
	loadMoreRef?: Ref<HTMLDivElement> | null;
}

const UserGiftList = ({ gifts, loadMoreRef }: Props) => {
	const { setGifts } = useGiftStore();
	const { gifts: storeGifts } = useGiftStore();
	const { message, clearMessage } = useToastStore();
	const handleNoOp = () => {};

	useEffect(() => {
		setGifts(gifts);
	}, [gifts, setGifts]);

	useEffect(() => {
		if (message) {
			toast.dismiss();
			toast.success(message);
			clearMessage();
		}
	}, [message, clearMessage]);

	return (
		<GiftList
			setGifts={setGifts}
			gifts={storeGifts}
			changeReserve={handleNoOp}
			loadMoreRef={loadMoreRef}
			newGiftLink={getPath("New gift")}
		/>
	);
};

export default UserGiftList;
