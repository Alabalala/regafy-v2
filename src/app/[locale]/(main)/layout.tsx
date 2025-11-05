import Footer from "@/shared/components/Footer";
import { NavBar } from "@/shared/components/NavBar";
import ScrollReset from "@/shared/components/ScrollReset";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className={"flex flex-col h-screen"}>
			<NavBar type={"user"} />
			<ScrollReset></ScrollReset>
			<main className={"flex-1 overflow-y-auto p-4"}>{children}</main>
			<Footer />
		</div>
	);
}
