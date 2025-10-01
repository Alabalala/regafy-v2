"use client";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { NextLink } from "../Link";
import CloseSVG from "../SVGs/CloseSVG";

interface Props {
	buttons: {
		initial: {
			text: string;
			variant: "primary" | "secondary" | "delete";
			shrink?: boolean;
			isPlain?: boolean;
		};
		leftButton: {
			text: string;
			href: string;
			shrink?: boolean;
			isPlain?: boolean;
			variant?: "primary" | "secondary" | "delete";
		};
		rightButton: {
			text: string;
			href: string;
			shrink?: boolean;
			isPlain?: boolean;
			variant?: "primary" | "secondary" | "delete";
		};
	};
	modalTitle: string;
	modalContent: string;
}

const Modal = ({ buttons, modalTitle, modalContent }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		console.log(isOpen);
	}, [isOpen]);

	return (
		<div>
			<div className="w-fit">
				<Button
					shrink={buttons.initial.shrink}
					variant={buttons.initial.variant}
					onClick={() => setIsOpen(!isOpen)}
				>
					{buttons.initial.text}
				</Button>
			</div>
			{isOpen && (
				<button
					onClick={() => setIsOpen(false)}
					className="fixed h-full w-full top-0 left-0 opacity-70 bg-black z-30"
				></button>
			)}
			{isOpen && (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background dark:bg-background-dark p-8  border-2 rounded-md flex flex-col gap-4">
					<div className="flex flex-col gap-5">
						<div className="flex flex-row justify-between items-center">
							<p className="font-bold uppercase">{modalTitle}</p>
							<Button
								onClick={() => setIsOpen(false)}
								isPlain
							>
								<CloseSVG />
							</Button>
						</div>
						<div>{modalContent}</div>
						<div className="flex flex-row gap-5">
							<NextLink
								isPlain
								variant={buttons.leftButton.variant}
								href={buttons.leftButton.href}
							>
								{buttons.leftButton.text}
							</NextLink>
							<NextLink
								variant={buttons.rightButton.variant}
								href={buttons.rightButton.href}
							>
								{buttons.rightButton.text}
							</NextLink>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Modal;
