import SignUpForm from "@/features/auth/components/SignUpForm/SignUpForm";
import Regafy from "@/shared/components/Regafy";
import { getTranslations } from "next-intl/server";

export default async function SignUpPage() {
	const t = await getTranslations("auth");
	return (
		<div>
			<div className="flex justify-center bg-secondary dark:bg-secondary-dark p-5 border-b-2">
				<Regafy></Regafy>
			</div>
			<div className="flex flex-col gap-5 p-5">
				<h1 className="text-xl font-bold">{t("signUp")}</h1>
				<SignUpForm></SignUpForm>
			</div>
		</div>
	);
}
