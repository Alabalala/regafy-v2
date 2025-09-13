import { buttonVariants, variant } from "@/shared/styles/buttonVariant";
import LoadingSVG from "../SVGs/LoadingSVG";

interface Props {
	children: React.ReactNode;
	variant?: variant;
	floating?: boolean;
	onClick?: () => void;
	type?: "button" | "submit";
	loading?: boolean;
	loadingText?: string;
}

export const Button = ({
	onClick,
	children,
	variant,
	floating = false,
	loading = false,
	type = "button",
	loadingText,
}: Props) => {
	return (
		<button
			type={type}
			className={buttonVariants({ variant: variant, floating: floating })}
			onClick={onClick}
			disabled={loading}
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
