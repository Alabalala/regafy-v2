import Link from "next/link";

interface Props {
	href: string;
	children: React.ReactNode;
}

export const NextLink = ({ href, children, variant }: Props) => (
	<Link
		className={""}
		href={href}
	>
		{children}
	</Link>
);
