"use client";
import { getPath } from "@/shared/services/getPath";
import { NextLink } from "../Link";
import CalendarSVG from "../SVGs/calendarSVG";
import FriendsSVG from "../SVGs/FriendsSVG";
import GiftSVG from "../SVGs/GiftSVG";
import GroupsSVG from "../SVGs/GroupsSVG";
import { usePathname } from "next/navigation";
import NewGiftSVG from "../SVGs/NewGiftSVG";
import HomeSVG from "../SVGs/HomeSVG";

export default function Footer({}) {
	const pathName = usePathname();

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
					<p className={"text-sm"}>Home</p>
				</div>
			</NextLink>
			<NextLink
				isGroup
				isPlain
				href={getPath("Gifts")}
			>
				<div className={"flex flex-col items-center"}>
					<GiftSVG
						filled={pathName === getPath("Gifts")}
						className={"w-8 h-8"}
					/>
					<p className={"text-sm"}>Gifts</p>
				</div>
			</NextLink>

			<NextLink
				isGroup
				isPlain
				href={getPath("New gift")}
			>
				<div className={"flex flex-col items-center"}>
					<NewGiftSVG className={"w-8 h-8"} />
					<p className={"text-sm"}>New Gift</p>
				</div>
			</NextLink>

			<NextLink
				isGroup
				isPlain
				href={getPath("Friends")}
			>
				<div className={"flex flex-col items-center"}>
					<FriendsSVG
						filled={pathName === getPath("Friends")}
						className={"w-8 h-8"}
					/>
					<p className={"text-sm"}>Friends</p>
				</div>
			</NextLink>
			<NextLink
				isGroup
				isPlain
				href={getPath("Calendar")}
			>
				<div className={"flex flex-col items-center"}>
					<CalendarSVG
						filled={pathName === getPath("Calendar")}
						className={"w-8 h-8"}
					/>
					<p className={"text-sm"}>Calendar</p>
				</div>
			</NextLink>
		</footer>
	);
}
