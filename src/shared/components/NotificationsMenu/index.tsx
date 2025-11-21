import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { markNotificationAsRead } from "@/shared/services/supabase/notifications";
import {
	NotificationWithOptionalEvent,
	NotificationWithSender,
} from "@/shared/types/supabase/supabase";
import { Button } from "../Button";
import Notification from "../Notification";
import CloseSVG from "../SVGs/CloseSVG";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getSingleEvent } from "@/features/calendar/services/supabase";
import { getPathFromType } from "@/shared/services/getPathFromType";
import { useRouter } from "@/i18n/routing";

interface Props {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
	notifications: NotificationWithSender[];
	setNotifications: React.Dispatch<
		React.SetStateAction<NotificationWithSender[]>
	>;
	setHasUnreadNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationsMenu = ({
	setIsOpen,
	isOpen,
	notifications,
	setNotifications,
	setHasUnreadNotifications,
}: Props) => {
	const supabase = createClient();
	const router = useRouter();
	const [items, setItems] = useState<NotificationWithOptionalEvent[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			const results = await Promise.all(
				notifications.map(async (n) => {
					if (n.type.includes("event")) {
						const event = await getSingleEvent(Number(n.reference_id), supabase);
						return { ...n, event };
					}
					return n;
				}),
			);
			setItems(results);
		};

		fetchEvents();
	}, [notifications]);

	const handleRead = async (notificationId: number) => {
		try {
			await markNotificationAsRead(notificationId, supabase);
			const newNotifications = notifications.filter(
				(notification) => notification.id !== notificationId,
			);
			setNotifications(newNotifications);
			if (newNotifications.length === 0) {
				setHasUnreadNotifications(false);
			}
		} catch (error) {
			console.error("marking notification as read error:", error);
		}
	};
	const t = useTranslations("notifications");
	const handleClick = async (
		type: string,
		referenceId: string,
		notificationId: number,
		senderId: string,
	) => {
		handleRead(notificationId);
		setIsOpen(false);
		const path = getPathFromType(type, referenceId, senderId);
		console.log(path);
		router.push(path);
	};

	return (
		<div
			className={`flex flex-col border-2 gap-10 p-4 left-0 top-20 bg-tertiary dark:bg-tertiary-dark fixed h-full w-full z-30 transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
		>
			<div className="flex justify-between items-center">
				<h2 className="font-bold text-xl">{t("notifications")}</h2>
				<Button
					isPlain
					onClick={() => setIsOpen(false)}
				>
					<CloseSVG />
				</Button>
			</div>

			{notifications.length === 0 ? (
				<div className="flex justify-center">{t("noNotifications")}</div>
			) : (
				<div className="flex flex-col pb-20 gap-4 overflow-y-scroll">
					{items.map((notification) => (
						<Notification
							key={notification.id}
							notification={notification}
							handleRead={handleRead}
							handleClick={handleClick}
						></Notification>
					))}
				</div>
			)}

			<div></div>
		</div>
	);
};
