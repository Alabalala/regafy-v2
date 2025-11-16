"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
	const pathname = usePathname();

	useEffect(() => {
		const main = document.querySelector("main");
		if (main) main.scrollTo({ top: 0, behavior: "auto" });
		window.scrollTo({ top: 0, behavior: "auto" });
	}, [pathname]);

	return null;
}
