"use client";
import ProfileImage from "@/features/profile/components/ProfileImage";
import { NextLink } from "@/shared/components/Link";
import { normalisedEvent } from "../../types/events";
import { getPath } from "@/shared/services/getPath";

const EventCard = ({ event }: { event: normalisedEvent }) => {
	return (
		<NextLink
			href={
				event.type === "event"
					? getPath("Event", String(event.id))
					: getPath("Friend profile", String(event.id))
			}
			isPlain
		>
			<div className="w-full border-2 rounded-md overflow-hidden flex bg-background-50 dark:bg-background-dark-50">
				<div
					className={`w-4 ${event.type === "event" ? `bg-accent dark:bg-accent-dark` : "bg-tertiary dark:bg-tertiary-dark"}`}
				></div>

				<div className="w-full p-2 flex flex-row gap-6 justify-between items-center">
					<div className="flex flex-row gap-2 items-center">
						<ProfileImage
							small
							profileImage={event.image ?? "/illustrations/caddy.webp"}
						></ProfileImage>
						<div className="text-sm font-normal">{event.title}</div>
					</div>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#000000"
					>
						<path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
					</svg>
				</div>
			</div>
		</NextLink>
	);
};

export default EventCard;
