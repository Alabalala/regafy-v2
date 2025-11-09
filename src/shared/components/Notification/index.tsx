import ProfileImage from "@/features/profile/components/ProfileImage";
import { NotificationWithOptionalEvent } from "@/shared/types/supabase/supabase";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CloseSVG from "../SVGs/CloseSVG";

interface Props {
	notification: NotificationWithOptionalEvent;
	handleRead: (notificationId: number) => void;
	handleClick: (
		type: string,
		referenceId: string,
		notificationId: number,
	) => void;
}

const Notification = ({ notification, handleRead, handleClick }: Props) => {
	const [isReading, setIsReading] = useState(false);
	const t = useTranslations("notifications");
	const body = notification.event
		? t(`templates.${notification.type}.body`, {
				sender: notification.sender.userName,
				event: notification.event.title,
			})
		: t(`templates.${notification.type}.body`, {
				sender: notification.sender.userName,
			});

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
						<p>{body}</p>
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
