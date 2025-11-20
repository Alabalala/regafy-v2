import Image from "next/image";
import ShareSVG from "../../../../shared/components/SVGs/ShareSVG";
import QuestionChatSVG from "../../../../shared/components/SVGs/QuestionChatSVG";
import BookMarkSVG from "../../../../shared/components/SVGs/BookMarkSVG";
import { Gift } from "@/shared/types/supabase/supabase";
import { poppins } from "@/shared/services/fonts";
import { ContextMenu } from "@/shared/components/ContextMenu";
import { useTimeAgo } from "@/shared/hooks/useTimeAgo";
import {
	FriendGiftContextMenuHelper,
	OwnGiftContextMenuHelper,
} from "../../services/GiftContextMenuHelper";
import { Button } from "@/shared/components/Button";

import StarRate from "../StarRate";
import { useUser } from "@/features/auth/hooks/useUser";
import { useEffect, useState } from "react";
import QuestionsAnswers from "../QuestionsAnswers";
import { getOptimizedImageUrl } from "@/shared/services/getOptimisedImageUrl";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import LoadingComponent from "@/shared/components/loadingModule";
import { createClient } from "@/shared/services/supabase/client";
import { getProfile } from "@/features/profile/services/supabase";
import { Profile } from "@/features/profile/types/supabase.types";
import ProfileImage from "@/features/profile/components/ProfileImage";
import { useTranslations } from "next-intl";
import { deleteGift } from "../../services/supabase";
import { useToastStore } from "@/shared/stores/toastStore";

interface Props {
	gift: Gift;
	changeReserve: (giftId: string) => void;
	gifts: Gift[];
	setGifts: (gifts: Gift[]) => void;
}

export default function GiftPost({
	gift,
	changeReserve,
	gifts,
	setGifts,
}: Props) {
	const timeAgo = useTimeAgo(gift.created_at);
	const t = useTranslations("gifts");
	const tShare = useTranslations("share");
	const tImages = useTranslations("images");
	const tButtons = useTranslations("buttons");
	const [user] = useUser();
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
	const [reserver, setReserver] = useState<Profile | null>(null);
	const supabase = createClient();
	const { setMessage } = useToastStore();

	useEffect(() => {
		const getReserverProfile = async () => {
			if (!gift.reserved_by) return;
			const profile = await getProfile(gift.reserved_by, supabase);
			setReserver(profile);
		};
		getReserverProfile();
	}, [gift.reserved_by, supabase]);

	if (!user || !gift || !gift.owner) return <LoadingComponent />;
	const isOwnGift = gift.profile_id === user.id;

	const handleShare = async () => {
		const giftText = tShare("giftText", {
			name: gift.profiles.name,
			title: gift.title,
		});
		const giftUrl = `${window.location.origin}/friends/${gift.profile_id}`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: tShare("title"),
					text: giftText,
					url: giftUrl,
				});
			} catch (err) {
				console.error("Error sharing", err);
			}
		} else {
			alert(tShare("notSupported"));
		}
	};

	const handleDelete = async () => {
		try {
			await deleteGift(gift.id, supabase);
			const newGifts = gifts.filter((g) => g.id !== gift.id);
			setGifts(newGifts);
			setMessage(t("post.toast.deleted"));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<article className={"border-2 rounded-md"}>
			<div
				className={`flex flex-col bg-tertiary dark:bg-tertiary-dark p-4 w-full gap-6 relative ${isCommentsOpen ? "rounded-t-md" : "rounded-md"}`}
			>
				<div className="absolute top-4 right-0 flex flex-row gap-3">
					<div className={"flex items-center text-xs"}>
						<p>{timeAgo}</p>
					</div>
					<ContextMenu
						helperFunction={() =>
							isOwnGift || user.id === gift.added_by
								? OwnGiftContextMenuHelper(gift.id, handleDelete)
								: FriendGiftContextMenuHelper(gift.id, gift.profile_id)
						}
					/>
				</div>
				<div className={"flex flex-row justify-between"}>
					<ProfileInfo
						canEdit={false}
						sided
						profile={gift.profiles}
					></ProfileInfo>
				</div>
				{gift.profile_id !== gift.added_by && (
					<div
						className={
							"flex flex-col gap-2 border-2 p-2 rounded-md bg-secondary dark:bg-secondary-dark"
						}
					>
						<p>{t("post.friendAddedGift")}</p>
						<div className={"flex flex-row "}>
							<ProfileInfo
								canEdit={false}
								sided
								profile={gift.owner}
							></ProfileInfo>
						</div>
					</div>
				)}

				<div className={"flex flex-col gap-3"}>
					<div className={"flex flex-col justify-between font-bold text-md"}>
						<p className={`${poppins.className} `}>{gift.title}</p>
						<p>🏷️ {gift.price} €</p>
					</div>

					<p>{gift.description}</p>
				</div>
				{gift.image_link && (
					<div className={"border-2 relative w-full h-50"}>
						<Image
							src={`${getOptimizedImageUrl(gift.image_link)}`}
							fill
							className={"object-cover"}
							alt={tImages("alt.genericGiftImage")}
						/>
					</div>
				)}

				{gift.owner.id === gift.added_by && (
					<StarRate rating={String(gift.rating)}></StarRate>
				)}
				<hr />
				<div className={`flex flex-row justify-around`}>
					{!isOwnGift && (
						<Button
							disabled={(gift.reserved ?? false) || gift.added_by === user?.id}
							isGroup
							isPlain
							variant="primary"
							onClick={() => changeReserve(gift.id)}
						>
							<div className="relative">
								<div className={"flex flex-col items-center z-10 relative"}>
									<BookMarkSVG filled={gift.reserved ?? false} />
									<p>{gift.reserved ? tButtons("reserved") : tButtons("reserve")}</p>
								</div>
								{reserver && (
									<div className="absolute top-0 right-0 z-0">
										<ProfileImage
											xs
											profileImage={reserver?.profileImage}
										/>
									</div>
								)}
							</div>
						</Button>
					)}
					<Button
						isGroup
						isPlain
						variant="primary"
						onClick={() => setIsCommentsOpen(!isCommentsOpen)}
					>
						<div className={"flex flex-col items-center"}>
							<QuestionChatSVG filled={isCommentsOpen} />
							<p>{t("post.Q&A.questions")}</p>
						</div>
					</Button>
					<Button
						isGroup
						isPlain
						variant="primary"
						onClick={handleShare}
					>
						<div className={"flex flex-col items-center"}>
							<ShareSVG />
							<p>{tButtons("share")}</p>
						</div>
					</Button>
				</div>
			</div>
			{isCommentsOpen && (
				<div className="flex inset-shadow-black inset-shadow-sm/40 flex-col gap-5 border-t-1 rounded-b-md p-4 bg-tertiary-100">
					<QuestionsAnswers
						gifts={gifts}
						setGifts={setGifts}
						questions={gift.questions}
						createdBy={gift.added_by}
						userId={user?.id}
						giftId={gift.id}
					/>
				</div>
			)}
		</article>
	);
}
