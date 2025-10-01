"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
	const pathname = usePathname();

	useEffect(() => {
		const main = document.querySelector("main");
		if (main) main.scrollTop = 0;
		else window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
