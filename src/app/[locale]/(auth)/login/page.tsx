import LoginForm from "@/features/auth/components/LoginForm/LoginForm";
import Regafy from "@/shared/components/Regafy";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
	const t = await getTranslations("auth");

	return (
		<div>
			<div className="flex justify-center bg-secondary dark:bg-secondary-dark p-5 border-b-2">
				<Regafy></Regafy>
			</div>
			<div className="flex flex-col  gap-5 p-5 min-h-screen">
				<h1 className="text-xl font-bold">{t("loginWithAccount")}</h1>
				<LoginForm></LoginForm>
			</div>
		</div>
	);
}
