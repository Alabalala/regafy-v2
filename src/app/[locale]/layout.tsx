import "@/shared/styles/globals.css";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "react-hot-toast";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("metadata");

	return {
		title: t("title"),
		description: t("description"),
	};
}

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const messages = await getMessages();
	return (
		<html lang={locale}>
			<head>
				{locale === "es" ? (
					<>
						<meta
							property="og:locale"
							content="es_ES"
						/>
						<meta
							property="og:title"
							content="Regafy – Descubre el regalo perfecto al instante"
						/>
						<meta
							property="og:description"
							content="Regafy te ayuda a descubrir qué regalar a cualquiera en segundos."
						/>
						<meta
							property="og:url"
							content="https://regafy.netlify.app/es"
						/>
					</>
				) : (
					<>
						<meta
							property="og:locale"
							content="en_US"
						/>
						<meta
							property="og:title"
							content="Regafy – Find the Perfect Gift Instantly"
						/>
						<meta
							property="og:description"
							content="Regafy helps you discover what to buy for anyone in seconds."
						/>
						<meta
							property="og:url"
							content="https://regafy.netlify.app/en"
						/>
					</>
				)}
				<meta
					property="og:image"
					content="https://regafy.netlify.app/OG/regafy.png"
				/>
			</head>
			<body
				className={
					"bg-background dark:bg-background-dark text-on-background dark:text-on-background-dark h-screen font-sans overflow-clip"
				}
			>
				<NextIntlClientProvider
					locale={locale}
					messages={messages}
				>
					<Toaster
						toastOptions={{
							className:
								"bg-background-100! dark:bg-background-dark-100! text-on-background! dark:text-on-background-dark! border-2 dark:border-white",
						}}
					></Toaster>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
