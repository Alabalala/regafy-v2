"use client";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { BURGER_MENU_ITEMS } from "@/shared/constants/burgerMenuItems";
import { getPath } from "@/shared/services/getPath";
import { useTranslations } from "next-intl";
import { Button } from "../Button";
import LanguageSwitch from "../LanguageSwitch";
import { NextLink } from "../Link";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

interface Props {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}

export const BurgerMenu = ({ setIsOpen, isOpen }: Props) => {
	const { logout } = useLogout();
	const tBurger = useTranslations("burgerMenu");
	const tButtons = useTranslations("buttons");

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
