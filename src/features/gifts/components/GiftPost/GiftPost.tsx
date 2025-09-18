import Image from "next/image";
import ShareSVG from "../../../../shared/components/SVGs/ShareSVG";
import QuestionChatSVG from "../../../../shared/components/SVGs/QuestionChatSVG";
import BookMarkSVG from "../../../../shared/components/SVGs/BookMarkSVG";
import { Gift } from "@/shared/types/supabase/supabase";
import { poppins } from "@/shared/services/fonts";
import { ContextMenu } from "@/shared/components/ContextMenu/ContextMenu";
import { getTimeAgo } from "@/shared/services/getTimeAgo";
import {
	FriendGiftContextMenuHelper,
	OwnGiftContextMenuHelper,
} from "../../services/GiftContextMenuHelper";
import { Button } from "@/shared/components/Button/Button";

import StarRate from "../StarRate/StarRate";
import { useUser } from "@/features/auth/hooks/useUser";
import { useState } from "react";
import QuestionsAnswers from "../QuestionsAnswers/QuestionsAnswers";
import { getOptimizedImageUrl } from "@/shared/services/getOptimisedImageUrl";

interface Props {
	gift: Gift;
	changeReserve: (giftId: string) => void;
}

export default function GiftPost({ gift, changeReserve }: Props) {
	const isOwnGift = gift.profile_id === gift.added_by;
	const timeAgo = getTimeAgo(gift.created_at);
	const [user] = useUser();
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
	console.log(gift.image_link);

	if (!user) return <p>Loading...</p>;

	return (
		<article className={"border-2 rounded-md"}>
			<div
				className={`flex flex-col bg-tertiary dark:bg-tertiary-dark p-4 w-full gap-4 relative ${isCommentsOpen ? "rounded-t-md" : "rounded-md"}`}
			>
				<div className="absolute top-4 right-4 flex flex-row gap-3">
					<div className={"flex items-center"}>
						<p>{timeAgo}</p>
					</div>
					<ContextMenu
						helperFunction={() =>
							isOwnGift
								? OwnGiftContextMenuHelper(gift.id, gift.profile_id)
								: FriendGiftContextMenuHelper(gift.id, gift.profile_id)
						}
					/>
				</div>
				<div className={"flex flex-row justify-between"}>
					<div className={"flex flex-row gap-4"}>
						<div
							className={"relative w-12 h-12 overflow-hidden rounded-4xl border-2"}
						>
							<Image
								src={"/test-image-profile.png"}
								fill
								className={"object-cover"}
								alt={"sdfsdf"}
							/>
						</div>
						<div className={""}>
							<p className={"font-bold"}>Cady Lover</p>
							<p className={"font-light"}>@cady</p>
						</div>
					</div>
				</div>
				<div className={"flex flex-col gap-3"}>
					<div className={"flex flex-row justify-between font-bold text-md"}>
						<p className={`${poppins.className} `}>{gift.title}</p>
						<p>{gift.price} €</p>
					</div>

					<p>{gift.description}</p>
				</div>
				{gift.image_link && (
					<div className={"border-2 relative w-full h-50"}>
						<Image
							src={`${getOptimizedImageUrl(gift.image_link)}?t=${Date.now()}`}
							fill
							className={"object-cover"}
							alt={"Imagen del regalo"}
						/>
					</div>
				)}

				<StarRate rating={String(gift.rating)}></StarRate>
				<hr />
				<div className={`flex flex-row justify-around`}>
					{isOwnGift && (
						<Button
							disabled={(gift.reserved ?? false) && gift.added_by !== user?.id}
							isGroup
							isPlain
							variant="primary"
							onClick={() => changeReserve(gift.id)}
						>
							<div className={"flex flex-col items-center"}>
								<BookMarkSVG filled={gift.reserved ?? false} />
								<p>Reserve{gift.reserved && "d"}</p>
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
							<p>Questions</p>
						</div>
					</Button>
					<Button
						isGroup
						isPlain
						variant="primary"
					>
						<div className={"flex flex-col items-center"}>
							<ShareSVG />
							<p>Share</p>
						</div>
					</Button>
				</div>
			</div>
			{isCommentsOpen && (
				<div className="flex inset-shadow-black inset-shadow-sm/40 flex-col gap-5 border-t-1 rounded-b-md p-4 bg-tertiary-100">
					<QuestionsAnswers
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
