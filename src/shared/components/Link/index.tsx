import { buttonVariants, variant } from "@/shared/styles/buttonVariant";
import { plainButtonVariants } from "@/shared/styles/plainButtonVariants";
import Link from "next/link";

interface Props {
	href: string;
	children: React.ReactNode;
	variant?: variant;
	isPlain?: boolean;
	floating?: boolean;
	isGroup?: boolean;
	size?: "default" | "small" | "icon";
	shrink?: boolean;
}

export const NextLink = ({
	href,
	children,
	isPlain = false,
	variant,
	floating = false,
	size = "default",
	isGroup = false,
	shrink = false,
}: Props) => {
	return (
		<Link
			className={
				isPlain
					? plainButtonVariants({ variant: variant, size: size, isGroup: isGroup })
					: buttonVariants({ variant: variant, floating: floating, shrink: shrink })
			}
			href={href}
		>
			{children}
		</Link>
	);
};
