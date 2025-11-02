"use client";
import { BURGER_MENU_ITEMS } from "@/shared/constants/burgerMenuItems";
import Hamburger from "hamburger-react";
import { NextLink } from "../Link";
import { Button } from "../Button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { getPath } from "@/shared/services/getPath";
import LanguageSwitch from "../LanguageSwitch";
import { useTranslations } from "next-intl";

interface Props {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}

export const BurgerMenu = ({ setIsOpen, isOpen }: Props) => {
	const { logout } = useLogout();
	const tBurger = useTranslations("burgerMenu");
	const tButtons = useTranslations("buttons");
	console.log(tBurger);

	return (
		<div
			className={`flex flex-col gap-10 p-4 left-0 top-20 bg-secondary dark:bg-secondary-dark fixed h-full w-full z-30 transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
		>
			<div
				className="flex flex-col gap-4"
				onClick={() => setIsOpen(false)}
			>
				{BURGER_MENU_ITEMS.map((item) => (
					<NextLink
						key={item.nameKey}
						isPlain
						href={getPath(item.pathName)}
						variant="primary"
					>
						{tBurger(item.nameKey)}
					</NextLink>
				))}
			</div>
			<div className="flex flex-col justify-center items-center gap-4">
				<Button
					variant="primary"
					onClick={() => {
						logout();
						setIsOpen(false);
					}}
				>
					{tButtons("logOut")}
				</Button>
			</div>

			<div className="h-full flex flex-col gap-15 justify-center">
				<div className="flex flex-col justify-center items-center gap-4">
					<p>{tBurger("switchTheme")}</p>
					<ThemeSwitcher></ThemeSwitcher>
				</div>

				<div className="flex flex-col justify-center items-center gap-4">
					<p>{tBurger("changeLanguage")}</p>
					<LanguageSwitch></LanguageSwitch>
				</div>
			</div>
		</div>
	);
};
