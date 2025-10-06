"use client";
import { useEffect, useState } from "react";
import LogoSVG from "../SVGs/LogoSVG";
import Hamburger from "hamburger-react";
import { BurgerMenu } from "../burgerMenu";
import NotificationSVG from "../SVGs/NotificationSVG";
import { Button } from "../Button";
import { NotificationsMenu } from "../NotificationsMenu";
import { getAllNotifications } from "@/shared/services/supabase/notifications";
import { useUser } from "@/features/auth/hooks/useUser";
import { createClient } from "@/shared/services/supabase/client";
import { NotificationWithSender } from "@/shared/types/supabase/supabase";

export const NavBar = () => {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
	const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
	const [notifications, setNotifications] = useState<NotificationWithSender[]>(
		[],
	);
	const supabase = createClient();
	const [user] = useUser();
	useEffect(() => {
		if (isBurgerMenuOpen) setIsNotificationsOpen(false);
		if (isNotificationsOpen) setIsBurgerMenuOpen(false);
	}, [isBurgerMenuOpen, isNotificationsOpen]);

	useEffect(() => {
		const fetchNotifications = async () => {
			if (user) {
				try {
					const fetchedNotifications = await getAllNotifications(user.id, supabase);
					setNotifications(fetchedNotifications);

					const hasUnreadNotifications = fetchedNotifications.some(
						(notification) => notification.read === false,
					);
					setHasUnreadNotifications(hasUnreadNotifications);
				} catch (error) {
					console.error(error);
				}
			}
		};

		fetchNotifications();
	}, [user, supabase]);

	return (
		<nav
			className={
				"flex justify-between items-center p-4 bg-secondary dark:bg-secondary-dark border-b-2 z-20"
			}
		>
			<div className={"flex gap-1 items-center"}>
				<p className={"font-bold text-xl"}>REG</p>
				<div>
					<LogoSVG />
				</div>
				<p className={"font-bold text-xl"}>FY</p>
			</div>

			<div className={"flex gap-2 items-center"}>
				<Button
					onClick={() => {
						setIsBurgerMenuOpen(false); // close burger
						setIsNotificationsOpen((prev) => !prev); // toggle notifications
					}}
					isPlain
				>
					<NotificationSVG
						hasUnreadNotifications={hasUnreadNotifications}
						filled={isNotificationsOpen}
					></NotificationSVG>
				</Button>
				<Hamburger
					size={24}
					toggled={isBurgerMenuOpen}
					toggle={(next) => {
						setIsNotificationsOpen(false);
						setIsBurgerMenuOpen(next);
					}}
				/>
			</div>

			<BurgerMenu
				setIsOpen={setIsBurgerMenuOpen}
				isOpen={isBurgerMenuOpen}
			></BurgerMenu>

			<NotificationsMenu
				setHasUnreadNotifications={setHasUnreadNotifications}
				setNotifications={setNotifications}
				notifications={notifications}
				setIsOpen={setIsNotificationsOpen}
				isOpen={isNotificationsOpen}
			></NotificationsMenu>
		</nav>
	);
};
