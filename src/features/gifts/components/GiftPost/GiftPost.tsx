import Image from "next/image";
import Link from "next/link";
import ShareSVG from "../../../../shared/components/SVGs/ShareSVG";
import QuestionChatSVG from "../../../../shared/components/SVGs/QuestionChatSVG";
import BookMarkSVG from "../../../../shared/components/SVGs/BookMarkSVG";
import { Gift } from "@/shared/types/supabase/supabase";
import { poppins } from "@/shared/utils/fonts";

interface Props {
	gift: Gift;
	isOwnGift: boolean;
}

export default function GiftPost({ gift, isOwnGift }: Props) {
	return (
		<article
			className={
				"flex flex-col bg-tertiary dark:bg-tertiary-dark w-full p-4 border-2 rounded-md gap-4"
			}
		>
			<div className={"flex flex-row justify-between"}>
				{!isOwnGift && (
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
				)}

				<div className={"flex items-center"}>
					<p>TODO 1h</p>
				</div>
			</div>

			<div className={"flex flex-col gap-3"}>
				<div className={"flex flex-row justify-between font-bold text-md"}>
					<p className={`${poppins.className} `}>{gift.name}</p>
					<p>{gift.price}</p>
				</div>

				<p>{gift.comments}</p>

				{/* <p>
					<span className={`font-semibold`}>{`Talla: `}</span>
					<span>2 XL</span>
				</p>

				<p>
					<span className={`font-semibold`}>{`¿Dónde comprar?: `}</span>
					<span>Shein</span>
				</p> */}
			</div>

			{gift.image_link && (
				<div className={"border-2"}>
					<Image
						src={`/${gift.image_link}?t=${Date.now()}`}
						width={400}
						height={400}
						className={"object-cover"}
						alt={"Imagen del regalo"}
					/>
				</div>
			)}

			<div className={"flex flex-row justify-between"}>
				<Link
					href={""}
					className={"flex flex-col items-center"}
				>
					<BookMarkSVG />
					<p>Reserve</p>
				</Link>
				<Link
					href={""}
					className={"flex flex-col items-center"}
				>
					<QuestionChatSVG />
					<p>Questions</p>
				</Link>
				<Link
					href={""}
					className={"flex flex-col items-center"}
				>
					<ShareSVG />
					<p>Share</p>
				</Link>
			</div>
		</article>
	);
}
