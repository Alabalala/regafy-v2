import { buttonVariants, variant } from "@/shared/styles/buttonVariant";

interface Props {
	children: React.ReactNode;
	variant?: variant;
	floating?: boolean;
	onClick?: () => void;
	type?: "button" | "submit";
	disabled?: boolean;
}

export const Button = ({
	onClick,
	children,
	variant,
	floating = false,
	type = "button",
	disabled = false,
}: Props) => {
	return (
		<button
			type={type}
			className={buttonVariants({ variant: variant, floating: floating })}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
