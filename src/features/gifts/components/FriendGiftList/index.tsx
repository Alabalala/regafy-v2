"use client";
import { Ref, useEffect, useState } from "react";
import { getPath } from "@/shared/services/getPath";
import { Gift } from "@/shared/types/supabase/supabase";
import { useChangeReserve } from "../../hooks/useChangeReserve";
import GiftList from "../GiftList";
import { useParams } from "next/navigation";

interface Props {
	gifts: Gift[];
	friendId?: string;
	loadMoreRef?: Ref<HTMLDivElement> | null;
}

const FriendGiftList = ({ gifts, loadMoreRef }: Props) => {
	const [friendGifts, setFriendGifts] = useState<Gift[]>([]);
	const { changeReserve } = useChangeReserve(friendGifts, setFriendGifts);
	const params = useParams();
	const { id } = params;
	const normalisedFriendId = Array.isArray(id) ? id[0] : id;

	useEffect(() => {
		if (gifts) {
			setFriendGifts(gifts);
		}
	}, [gifts, setFriendGifts]);

	return (
		<GiftList
			setGifts={setFriendGifts}
			gifts={friendGifts}
			changeReserve={changeReserve}
			loadMoreRef={loadMoreRef}
			newGiftLink={getPath("New gift for friend", normalisedFriendId)}
		/>
	);
};

export default FriendGiftList;
