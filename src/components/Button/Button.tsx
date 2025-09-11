import { buttonVariants, variant } from "@/styles/buttonVariant";

interface Props {
	children: React.ReactNode;
	variant?: variant;
	floating?: boolean;
	onClick?: () => void;
	type?: "button" | "submit";
}

export const Button = ({
	onClick,
	children,
	variant,
	floating = false,
	type = "button",
}: Props) => {
	return (
		<button
			type={type}
			className={buttonVariants({ variant: variant, floating: floating })}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
