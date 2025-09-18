import { buttonVariants, variant } from "@/shared/styles/buttonVariant";
import LoadingSVG from "../SVGs/LoadingSVG";
import { plainButtonVariants } from "@/shared/styles/plainButtonVariants";

interface Props {
	children: React.ReactNode;
	variant?: variant;
	isGroup?: boolean;
	floating?: boolean;
	onClick?: () => void;
	type?: "button" | "submit";
	loading?: boolean;
	loadingText?: string;
	isPlain?: boolean;
	size?: "default" | "small" | "icon";
	disabled?: boolean;
}

export const Button = ({
	onClick,
	disabled = false,
	children,
	isGroup,
	variant,
	floating = false,
	loading = false,
	type = "button",
	loadingText,
	isPlain = false,
	size = "default",
}: Props) => {
	return (
		<button
			type={type}
			className={`
				${
					isPlain
						? plainButtonVariants({ variant: variant, size: size, isGroup: isGroup })
						: buttonVariants({ variant: variant, floating: floating })
				} ${loading && "flex flex-row justify-center items-center gap-2"}`}
			onClick={onClick}
			disabled={loading || disabled}
		>
			{loading ? (
				<div className="flex gap-2">
					<LoadingSVG className="animate-spin" /> {loadingText}
				</div>
			) : (
				children
			)}
		</button>
	);
};
