import Link from "next/link";
import CloseSVG from "../SVGs/CloseSVG";

interface HeadingWithExitProps {
	children: React.ReactNode;
	href: string;
}

export default function H1WithExit({ children, href }: HeadingWithExitProps) {
	return (
		<div className="flex justify-between items-center">
			<h1 className="text-xl font-bold">{children}</h1>
			<Link
				href={href}
				className=" text-gray-500 hover:text-gray-800"
			>
				<CloseSVG></CloseSVG>
			</Link>
		</div>
	);
}
