import { poppins } from "@/fonts/fonts";
import Image from "next/image";
import Link from "next/link";
import ShareSVG from "../SVGs/ShareSVG";
import QuestionChatSVG from "../SVGs/QuestionChatSVG";
import BookMarkSVG from "../SVGs/BookMarkSVG";

export default function GiftPost({}) {
	return (
		<article
			className={
				"flex flex-col bg-tertiary dark:bg-tertiary-dark w-full p-4 border-2 rounded-md gap-4"
			}
		>
			<div className={"flex flex-row justify-between"}>
				<div className={"flex flex-row gap-4"}>
					<div className={"relative w-12 h-12 overflow-hidden rounded-4xl border-2"}>
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

				<div className={"flex items-center"}>
					<p>1h</p>
				</div>
			</div>

			<div className={"flex flex-col gap-3"}>
				<div className={"flex flex-row justify-between font-bold text-md"}>
					<p className={`${poppins.className} `}>Zapatillas Adidas</p>
					<p>50 €</p>
				</div>

				<p>
					Me gustan mucho estas zapatillas y no las en ningún sitio. Si alguien
					quiere intentarlo para mi cumple, sería genial!
				</p>

				<p>
					<span className={`font-semibold`}>{`Talla: `}</span>
					<span>2 XL</span>
				</p>

				<p>
					<span className={`font-semibold`}>{`¿Dónde comprar?: `}</span>
					<span>Shein</span>
				</p>
			</div>

			<div className={"border-2"}>
				<Image
					src={"/shoes-pic-test.webp"}
					width={400}
					height={400}
					className={"object-cover"}
					alt={"sdfsdf"}
				/>
			</div>

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
