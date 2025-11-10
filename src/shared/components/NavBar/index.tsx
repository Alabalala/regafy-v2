"use client";
import { useUser } from "@/features/auth/hooks/useUser";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { getAllNotifications } from "@/shared/services/supabase/notifications";
import { NotificationWithSender } from "@/shared/types/supabase/supabase";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import { BurgerMenu } from "../burgerMenu";
import { Button } from "../Button";
import { NextLink } from "../Link";
import { NotificationsMenu } from "../NotificationsMenu";
import Regafy from "../Regafy";
import NotificationSVG from "../SVGs/NotificationSVG";

export const NavBar = ({ type }: { type: "user" | "auth" }) => {
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
	}, [user]);

	return (
		<nav
			className={
				"flex justify-between items-center p-4 bg-secondary dark:bg-secondary-dark border-b-2 z-30"
			}
		>
			<NextLink
				isPlain
				href={getPath("Home")}
			>
				<Regafy></Regafy>
			</NextLink>

			<div className={"flex gap-2 items-center"}>
				{type === "user" && (
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
				)}
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
				type={type}
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
