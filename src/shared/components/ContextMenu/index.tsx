"use client";
import { useEffect, useRef, useState } from "react";
import MoreVerticalSVG from "../SVGs/MoreVerticalSVG";
import { MenuItem } from "@/shared/types/helperFunction.types";
import { set } from "zod";
import { useTranslations } from "next-intl";

interface Props {
	helperFunction: () => MenuItem[];
}

export const ContextMenu = ({ helperFunction }: Props) => {
	const [isOpen, setOpen] = useState(false);
	const contextElements = helperFunction();
	const menuRef = useRef<HTMLDivElement>(null);
	const t = useTranslations("contextMenu");

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={menuRef}
			className="relative"
		>
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
							key={item.labelKey}
							className="cursor-pointer p-3 hover:bg-secondary-50 hover:text-on-secondary active:bg-secondary-100 active:text-on-secondary rounded-xl"
							onClick={() => {
								item.onClick && item.onClick();
								setOpen(false);
							}}
						>
							{t(item.labelKey)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
