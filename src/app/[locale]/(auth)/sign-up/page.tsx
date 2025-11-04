import LoginForm from "@/features/auth/components/LoginForm/LoginForm";
import SignUpForm from "@/features/auth/components/SignUpForm/SignUpForm";
import { getTranslations } from "next-intl/server";

export default async function SignUpPage() {
	const t = await getTranslations("auth");
	return (
		<div className="flex flex-col gap-5 p-5">
			<h1 className="text-xl font-bold">{t("signUp")}</h1>
			<SignUpForm></SignUpForm>
		</div>
	);
}
