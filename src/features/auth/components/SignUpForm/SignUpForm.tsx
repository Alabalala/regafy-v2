"use client";

import { useUserStore } from "@/features/auth/stores/userStore";
import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signupAction } from "../../actions/signup";
import {
	SIGNUP_FORM_INITIAL_DATA,
	SIGNUP_FORM_INPUTS,
} from "../../constants/forms";
import { SingupFormSchema } from "../../schemas/signupForm";
import { resendConfirmationEmail } from "../../services/supabase";
import { SignUpFormTypes } from "../../types/forms";
import { useTranslations } from "next-intl";

const SignUpForm = () => {
	const [message, setMessage] = useState<string | undefined>("");
	const { user } = useUserStore();
	const router = useRouter();
	const [singupComplete, setSingupComplete] = useState(false);
	const [resendLoading, setResendLoading] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormTypes>({
		resolver: zodResolver(SingupFormSchema),
		defaultValues: SIGNUP_FORM_INITIAL_DATA,
	});

	useEffect(() => {
		if (user) {
			router.push(getPath("Home"));
		}
	}, [user, router]);
	const email = watch("email");
	const t = useTranslations("auth");
	const tButtons = useTranslations("buttons");

	const onSubmit = async (formData: SignUpFormTypes) => {
		setMessage("");

		const result = await signupAction(formData);
		if (!result.success) {
			setMessage(result.errors?.root);
			return;
		}

		if (result.success) {
			setSingupComplete(true);
		}
	};

	const handleEmailResend = async () => {
		if (!email) return; // safeguard

		setResendLoading(true);
		const result = await resendConfirmationEmail(email);
		if (!result.success) {
			setMessage(result.error);
		} else {
			setMessage(t("confirmationForm.toast.resent"));
		}

		setResendLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={"flex flex-col gap-4"}
		>
			{singupComplete ? (
				<div className="flex flex-col gap-4 items-center">
					<p>{t("signUpForm.completedSignup")}</p>
					<Button
						loading={resendLoading}
						onClick={handleEmailResend}
						variant="primary"
						loadingText={tButtons("resending")}
					>
						{tButtons("resendEmail")}
					</Button>
					<NextLink href={getPath("Login")}>{tButtons("backLogin")}</NextLink>
				</div>
			) : (
				<div className={"flex flex-col gap-4"}>
					{SIGNUP_FORM_INPUTS.map((input) => {
						const fieldName = input.name as keyof SignUpFormTypes;
						return (
							<div
								key={fieldName}
								className={"flex flex-col gap-2"}
							>
								<p className={"font-bold"}>{t("signUpForm." + input.labelKey)}</p>

								<Input
									placeholder={t("signUpForm." + input.placeholderKey)}
									{...register(fieldName)}
									input={input}
									currentValue={watch(fieldName) || ""}
									error={!!errors[fieldName]}
								/>
								<div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
							</div>
						);
					})}

					<p className="text-sm text-gray-400">
						{t("signUpForm.passwordInstructions")}
					</p>

					<div className={"flex justify-center"}>
						<Button
							type="submit"
							disabled={isSubmitting}
							loading={isSubmitting}
							loadingText={tButtons("signingUp")}
						>
							{tButtons("signUp")}
						</Button>
					</div>

					<div className={"flex flex-row justify-center items-center gap-2"}>
						<p>{t("yesAccount")}</p>
						<NextLink
							isPlain
							variant="primary"
							href={getPath("Login")}
						>
							{tButtons("logIn")}
						</NextLink>
					</div>
				</div>
			)}
			{message && <div className="text-red-500 text-sm">{message}</div>}
		</form>
	);
};

export default SignUpForm;
