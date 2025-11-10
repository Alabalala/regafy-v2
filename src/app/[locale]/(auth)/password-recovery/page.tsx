import RecoverPasswordForm from "@/features/auth/components/RecoverPasswordForm";
import { getTranslations } from "next-intl/server";

export default async function sendPasswordRecoveryPage() {
	const t = await getTranslations("auth");

	return (
		<div>
			<div className="flex flex-col  gap-5 p-5 min-h-screen">
				<h1 className="text-xl font-bold">{t("passwordRecovery.title")}</h1>
				<RecoverPasswordForm></RecoverPasswordForm>
			</div>
		</div>
	);
}
