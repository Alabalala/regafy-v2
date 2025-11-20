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
