import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { getTranslations } from "next-intl/server";

export default async function forgotPasswordPage() {
	const t = await getTranslations("auth");

	return (
		<div>
			<div className="flex flex-col  gap-5 p-5 min-h-screen">
				<h1 className="text-xl font-bold">{t("forgotPassword.title")}</h1>
				<ForgotPasswordForm></ForgotPasswordForm>
			</div>
		</div>
	);
}
