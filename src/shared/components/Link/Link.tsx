import { buttonVariants, variant } from "@/shared/styles/buttonVariant";
import Link from "next/link";

interface Props {
	href: string;
	children: React.ReactNode;
	variant?: variant;
	floating?: boolean;
}

export const NextLink = ({
	href,
	children,
	variant,
	floating = false,
}: Props) => {
	return (
		<Link
			className={buttonVariants({ variant: variant, floating: floating })}
			href={href}
		>
			{children}
		</Link>
	);
};
