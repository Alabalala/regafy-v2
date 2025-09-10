import GiftPost from "@/components/GiftPost/GiftPost";

export default function Home() {
	return (
		<main className={"flex min-h-screen flex-col gap-5"}>
			<GiftPost></GiftPost>
			<GiftPost></GiftPost>
		</main>
	);
}
