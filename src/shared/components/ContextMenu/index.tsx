import { useEffect, useState } from "react";
import MoreVerticalSVG from "../SVGs/MoreVerticalSVG";
import { MenuItem } from "@/shared/types/helperFunction.types";
import { set } from "zod";

interface Props {
	helperFunction: () => MenuItem[];
}

export const ContextMenu = ({ helperFunction }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const contextElements = helperFunction();

	return (
		<div className="relative">
			<div
				className="cursor-pointer"
				onClick={() => setOpen(!isOpen)}
			>
				<MoreVerticalSVG></MoreVerticalSVG>
			</div>

			{isOpen && (
				<div className="absolute w-50 right-0 bg-secondary dark:bg-secondary-dark border-2 rounded-lg flex flex-col z-20">
					{contextElements.map((item) => (
						<div
							key={item.label}
							className="cursor-pointer p-3 hover:bg-secondary-50 hover:text-on-secondary active:bg-secondary-100 active:text-on-secondary rounded-xl"
							onClick={() => {
								item.onClick && item.onClick();
								setOpen(false);
							}}
						>
							{item.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
