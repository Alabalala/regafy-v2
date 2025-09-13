import Footer from "@/shared/components/Footer/Footer";
import { NavBar } from "@/shared/components/NavBar/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className={"flex-1 overflow-y-auto p-4"}>
			<NavBar />
			{children}
			<Footer />
		</main>
	);
}
