import ProfileImage from "@/features/profile/components/ProfileImage";
import CloseSVG from "../SVGs/CloseSVG";
import {
	Event,
	NotificationWithSender,
} from "@/shared/types/supabase/supabase";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getSingleEvent } from "@/features/calendar/services/supabase";
import { createClient } from "@/shared/services/supabase/client";
import LoadingComponent from "../loadingModule";

interface Props {
	notification: NotificationWithSender;
	handleRead: (notificationId: number) => void;
	handleClick: (
		type: string,
		referenceId: string,
		notificationId: number,
	) => void;
}

const Notification = ({ notification, handleRead, handleClick }: Props) => {
	const [isReading, setIsReading] = useState(false);
	const [event, setEvent] = useState<Event | null>(null);
	const t = useTranslations("notifications");
	const supabase = createClient();
	useEffect(() => {
		if (notification.type !== "event" || event) return;

		const fetchEvent = async () => {
			try {
				const newEvent = await getSingleEvent(
					Number(notification.reference_id),
					supabase,
				);
				setEvent(newEvent);
			} catch (error) {
				console.error(error);
			}
		};

		fetchEvent();
	}, [notification.type, notification.reference_id, event]);

	if (notification.type === "event" && !event) {
		return <LoadingComponent />;
	}

	return (
		<div
			className={`relative w-full transition duration-200 ${isReading && "-translate-x-full"} bg-background dark:bg-background-dark`}
		>
			<button
				onClick={() =>
					handleClick(notification.type, notification.reference_id, notification.id)
				}
				className="w-full pr-10 border-2 rounded-md "
			>
				<div className=" text-left text-xs p-3 flex flex-row gap-4 items-center">
					<ProfileImage
						canEdit={false}
						small
						profileImage={notification.sender.profileImage}
					/>
					<div className="flex flex-col ">
						<p className="font-bold">
							{t("templates." + notification.type + ".title")}
						</p>
						<p>
							{t("templates." + notification.type + ".body", {
								sender: notification.sender.userName,
								...(notification.type === "event" && event
									? { event: event.title }
									: {}),
							})}
						</p>
					</div>
				</div>
				<div></div>
			</button>
			<div className="absolute top-1/2 right-2 -translate-y-1/2 ">
				<button
					onClick={() => {
						handleRead(notification.id);
						setIsReading(true);
					}}
				>
					<CloseSVG />
				</button>
			</div>
		</div>
	);
};

export default Notification;
