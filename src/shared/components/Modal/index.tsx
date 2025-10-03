"use client";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import CloseSVG from "../SVGs/CloseSVG";
import LoadingComponent from "../loadingModule";
import { useRouter } from "next/navigation";

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
			shrink?: boolean;
			isPlain?: boolean;
			isCancel?: boolean;
			apiRoute?: string;
			method?: string;
			variant?: "primary" | "secondary" | "delete";
		};
		rightButton: {
			text: string;
			shrink?: boolean;
			isPlain?: boolean;
			apiRoute: string;
			method: string;
			variant?: "primary" | "secondary" | "delete";
		};
	};
	modalTitle: string;
	modalContent: string;
	redirect?: string;
}

const Modal = ({ buttons, modalTitle, modalContent, redirect }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState("");
	const router = useRouter();

	const handleClick = async (api: string, method: string) => {
		setLoading(true);
		try {
			const res = await fetch(api, { method });

			if (res.ok) {
				setIsOpen(false);
				if (redirect) router.replace(redirect);
			} else {
				setErrorText("There's been a problem. Try again later.");
			}
		} catch (err) {
			setErrorText("Network error. Try again later.");
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		setErrorText("");
		setLoading(false);
	};

	return (
		<div>
			<div className="w-fit">
				<Button
					shrink={buttons.initial.shrink}
					variant={buttons.initial.variant}
					onClick={() => setIsOpen(true)}
				>
					{buttons.initial.text}
				</Button>
			</div>
			{isOpen && (
				<button
					onClick={handleClose}
					disabled={loading}
					className="fixed h-full w-full top-0 left-0 opacity-70 bg-black z-30"
				></button>
			)}
			{isOpen && (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background dark:bg-background-dark p-8  border-2 rounded-md flex flex-col gap-4">
					<div className="flex flex-col gap-5">
						<div className="flex flex-row justify-between items-center">
							<p className="font-bold uppercase">{modalTitle}</p>
							<Button
								onClick={handleClose}
								disabled={loading}
								isPlain
							>
								<CloseSVG />
							</Button>
						</div>
						<div>{modalContent}</div>
						{loading && <LoadingComponent onlySpinner />}
						{errorText && <p className="text-red-500">{errorText}</p>}
						<div className="flex flex-row gap-5">
							<Button
								isPlain={buttons.leftButton.isPlain}
								variant={buttons.leftButton.variant}
								onClick={
									buttons.leftButton.isCancel
										? handleClose
										: () =>
												handleClick(
													buttons.leftButton.apiRoute ?? "",
													buttons.leftButton.method ?? "",
												)
								}
								disabled={loading}
							>
								Cancel
							</Button>

							<Button
								isPlain={buttons.rightButton.isPlain}
								variant={buttons.rightButton.variant}
								onClick={() =>
									handleClick(buttons.rightButton.apiRoute, buttons.rightButton.method)
								}
								disabled={loading}
							>
								{buttons.rightButton.text}
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Modal;
