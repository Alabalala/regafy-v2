// components/ViewportContainer.tsx
"use client";

import { useEffect, useState, ReactNode } from "react";

export default function ViewportWrapper({ children }: { children: ReactNode }) {
	const [height, setHeight] = useState<number | null>(null);

	useEffect(() => {
		const update = () => setHeight(window.innerHeight);
		update();

		window.addEventListener("resize", update);
		window.addEventListener("orientationchange", update);

		let timeout: NodeJS.Timeout;
		const onScroll = () => {
			clearTimeout(timeout);
			timeout = setTimeout(update, 150);
		};
		window.addEventListener("scroll", onScroll, true);

		return () => {
			window.removeEventListener("resize", update);
			window.removeEventListener("orientationchange", update);
			window.removeEventListener("scroll", onScroll, true);
		};
	}, []);

	return (
		<div
			style={{
				minHeight: height ? `${height}px` : "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{children}
		</div>
	);
}
