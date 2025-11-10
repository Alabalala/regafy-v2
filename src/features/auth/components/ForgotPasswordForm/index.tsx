"use client";
import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { getPath } from "@/shared/services/getPath";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendPasswordRecoveryAction } from "../../actions/sendPasswordRecovery";
import {
	FORGOT_PASSWORD_FORM_INPUTS,
	INITIAL_FORGOT_PASSWORD_FORM_DATA,
} from "../../constants/forms";
import { ForgotPasswordFormSchema } from "../../schemas/forgotPassword";
import { useUserStore } from "../../stores/userStore";
import { ForgotPasswordFormTypes } from "../../types/forms";

const ForgotPasswordForm = () => {
	const [supabaseToast, setSupabaseToast] = useState<string | undefined>("");
	const [timer, setTimer] = useState<number>(0);
	const { user } = useUserStore();
	const router = useRouter();
	const t = useTranslations("auth.forgotPassword");
	const tButtons = useTranslations("buttons");
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormTypes>({
		resolver: zodResolver(ForgotPasswordFormSchema),
		defaultValues: INITIAL_FORGOT_PASSWORD_FORM_DATA,
	});

	useEffect(() => {
		if (user) {
			router.push(getPath("Home"));
		}
	}, [user, router]);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	const onSubmit = async (formData: ForgotPasswordFormTypes) => {
		setSupabaseToast("");
		const result = await sendPasswordRecoveryAction(formData);

		if (!result.success) {
			setSupabaseToast(result.errors?.root);
			return;
		}

		if (result.success) {
			setSupabaseToast(t("form.toast.emailSent"));
			setTimer(60);
			return;
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={"flex flex-col gap-4"}
		>
			<p>{t("form.description")}</p>
			{FORGOT_PASSWORD_FORM_INPUTS.map((input) => {
				const fieldName = input.name as keyof ForgotPasswordFormTypes;
				return (
					<div
						key={fieldName}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{t("form." + input.labelKey)}</p>

						<Input
							placeholder={t("form." + input.placeholderKey)}
							{...register(fieldName)}
							input={input}
							currentValue={watch(fieldName) || ""}
							error={!!errors[fieldName]}
						/>
						<div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
					</div>
				);
			})}

			{supabaseToast && (
				<div className="text-red-500 text-sm">{supabaseToast}</div>
			)}

			<div className={"flex justify-center"}>
				<Button
					type="submit"
					disabled={isSubmitting || timer > 0}
					loading={isSubmitting}
					loadingText={tButtons("sending")}
				>
					{timer > 0 ? t("form.resend") + timer : tButtons("send")}
				</Button>
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
