"use client";
import { getPath } from "@/shared/services/getPath";
import { usePathname } from "next/navigation";
import { NextLink } from "../Link";
import CalendarSVG from "../SVGs/calendarSVG";
import FriendsSVG from "../SVGs/FriendsSVG";
import GiftSVG from "../SVGs/GiftSVG";
import HomeSVG from "../SVGs/HomeSVG";
import NewGiftSVG from "../SVGs/NewGiftSVG";
import { useTranslations } from "next-intl";

export default function Footer({}) {
	const pathName = usePathname();
	const tButtons = useTranslations("buttons");

	return (
		<footer
			className={
				"flex justify-around items-center p-2 bg-secondary dark:bg-secondary-dark border-t-2"
			}
		>
			<NextLink
				isGroup
				isPlain
				href={getPath("Home")}
			>
				<div className={"flex flex-col items-center"}>
					<HomeSVG
						filled={pathName === getPath("Home")}
						className={"w-8 h-8"}
					/>
					<p className={"text-sm"}>{tButtons("home")}</p>
				</div>
			</NextLink>
			<NextLink
				isGroup
				isPlain
				href={getPath("Gifts")}
			>
				<div className={"flex flex-col items-center"}>
					<GiftSVG
						filled={pathName.startsWith(getPath("Gifts"))}
						className={"w-8 h-8"}
					/>
					<p className={"text-sm"}>{tButtons("gifts")}</p>
				</div>
			</NextLink>

			<NextLink
				isGroup
				isPlain
				href={getPath("New gift")}
			>
				<div className={"flex flex-col items-center"}>
					<NewGiftSVG className={"w-8 h-8"} />
					<p className={"text-sm"}>{tButtons("newGift")}</p>
				</div>
			</NextLink>

			<NextLink
				isGroup
				isPlain
				href={getPath("Friends")}
			>
				<div className={"flex flex-col items-center"}>
					<FriendsSVG
						filled={pathName.startsWith(getPath("Friends"))}
						className={"w-8 h-8"}
					/>
					<p className={"text-sm"}>{tButtons("friends")}</p>
				</div>
			</NextLink>
			<NextLink
				isGroup
				isPlain
				href={getPath("Calendar")}
			>
				<div className={"flex flex-col items-center"}>
					<CalendarSVG
						filled={pathName.startsWith(getPath("Calendar"))}
						className={"w-8 h-8"}
					/>
					<p className={"text-sm"}>{tButtons("calendar")}</p>
				</div>
			</NextLink>
		</footer>
	);
}
