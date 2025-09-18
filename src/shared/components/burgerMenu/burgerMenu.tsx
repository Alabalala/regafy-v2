import { BURGER_MENU_ITEMS } from "@/shared/constants/burgerMenuItems";
import Hamburger from "hamburger-react";
import { NextLink } from "../Link/Link";
import { Button } from "../Button/Button";
import { useLogout } from "@/features/auth/hooks/useLogout";

interface Props {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
}

export const BurgerMenu = ({ setIsOpen, isOpen }: Props) => {
	const { logout } = useLogout();
	return (
		<div
			className={`flex flex-col gap-10 p-4 left-0 top-20 bg-secondary fixed h-full w-full z-20 transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
		>
			<div
				className="flex flex-col gap-4"
				onClick={() => setIsOpen(false)}
			>
				{BURGER_MENU_ITEMS.map((item) => (
					<NextLink
						key={item.name}
						isPlain
						href={item.pathName}
						variant="primary"
					>
						{item.name}
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
					Log out
				</Button>
			</div>
		</div>
	);
};
