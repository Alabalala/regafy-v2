import LoginForm from "@/features/auth/components/LoginForm/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
	const t = await getTranslations("auth");

	return (
		<div className="flex flex-col gap-5 p-5">
			<h1 className="text-xl font-bold">{t("loginWithAccount")}</h1>
			<LoginForm></LoginForm>
		</div>
	);
}
