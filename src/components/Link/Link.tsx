import Link from "next/link";

export const NextLink = ({ href, children }: any) => (
	<Link href={href}>{children}</Link>
);
