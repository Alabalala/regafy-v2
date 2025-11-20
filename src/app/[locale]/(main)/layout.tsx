import Footer from "@/shared/components/Footer";
import { NavBar } from "@/shared/components/NavBar";
import ScrollReset from "@/shared/components/ScrollReset";
import ViewportWrapper from "@/shared/components/ViewpoertContainer";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ViewportWrapper>
			<NavBar type={"user"} />
			<ScrollReset></ScrollReset>
			<main
				className={"flex-1 overflow-y-auto p-4 max-w-[800px] mx-auto no-scrollbar"}
			>
				{children}
			</main>
			<Footer />
		</ViewportWrapper>
	);
}
