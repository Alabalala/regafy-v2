import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { markNotificationAsRead } from "@/shared/services/supabase/notifications";
import { NotificationWithSender } from "@/shared/types/supabase/supabase";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import Notification from "../Notification";
import CloseSVG from "../SVGs/CloseSVG";
import { useTranslations } from "next-intl";

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
	) => {
		handleRead(notificationId);
		setIsOpen(false);
		router.push(
			getPath(type === "event" ? "Event" : "Friend profile", String(referenceId)),
		);
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
					{notifications.map((notification) => (
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
