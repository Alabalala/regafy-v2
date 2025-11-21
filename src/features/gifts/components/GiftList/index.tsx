import { Gift } from "@/shared/types/supabase/supabase";
import GiftPost from "../GiftPost";
import { NextLink } from "@/shared/components/Link";
import { Ref, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
	gifts: Gift[];
	changeReserve: (giftId: string) => void;
	newGiftLink?: string;
	loadMoreRef?: Ref<HTMLDivElement> | null;
	setGifts: (gifts: Gift[]) => void;
}

const GiftList = ({
	setGifts,
	gifts,
	changeReserve,
	newGiftLink,
	loadMoreRef,
}: Props) => {
	const tButtons = useTranslations("buttons");
	const [hash, setHash] = useState("");

	useEffect(() => {
		const handleHashChange = () => setHash(window.location.hash.replace("#", ""));
		handleHashChange();
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	return (
		<div>
			<div className={"flex flex-col gap-5 mt-5 relative"}>
				{gifts.map((gift, index) => (
					<div key={gift.id}>
						<GiftPost
							hash={hash}
							gifts={gifts}
							setGifts={setGifts}
							gift={gift}
							changeReserve={() => changeReserve(gift.id)}
						></GiftPost>
						{index === gifts.length - 2 && loadMoreRef && (
							<div ref={loadMoreRef}></div>
						)}
					</div>
				))}
				{newGiftLink && (
					<NextLink
						variant={"primary"}
						floating
						href={newGiftLink}
					>
						{tButtons("newGift")}
					</NextLink>
				)}
			</div>
		</div>
	);
};

export default GiftList;
