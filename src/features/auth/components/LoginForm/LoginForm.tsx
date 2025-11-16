"use client";

import { useEffect, useState } from "react";
import {
	LOGIN_FORM_INITIAL_DATA,
	LOGIN_FORM_INPUTS,
} from "../../constants/forms";
import Input from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { useUserStore } from "@/features/auth/stores/userStore";
import { useRouter } from "next/navigation";
import { getPath } from "@/shared/services/getPath";
import { NextLink } from "@/shared/components/Link";
import { useForm } from "react-hook-form";
import { LoginFormTypes } from "../../types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../../schemas/loginForm";
import { loginAction } from "../../actions/login";
import { useTranslations } from "next-intl";
import { getProfile } from "@/features/profile/services/supabase";
import { createClient } from "@/shared/services/supabase/client";

const LoginForm = () => {
	const [supabaseToast, setSupabaseToast] = useState<string | undefined>("");
	const { user } = useUserStore();
	const router = useRouter();
	const t = useTranslations("auth");
	const tButtons = useTranslations("buttons");
	const tErrors = useTranslations("errors");
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormTypes>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: LOGIN_FORM_INITIAL_DATA,
	});

	useEffect(() => {
		if (user) {
			router.push(getPath("Home"));
		}
	}, [user, router]);

	const onSubmit = async (formData: LoginFormTypes) => {
		setSupabaseToast("");
		const result = await loginAction(formData);
		const supabase = await createClient();
		if (!result.success && result.errors?.root) {
			setSupabaseToast(tErrors(result.errors?.root) ?? tErrors("generic"));
			return;
		}

		if (result.success) {
			if (result.data?.user?.id) {
				const profile = await getProfile(result.data.user.id, supabase);
				if (new Date(profile.updated_at) < new Date(2025, 1, 1)) {
					router.push(getPath("Create profile") + "?type=update");
				} else {
					router.push(getPath("Home"));
					return;
				}
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={"flex flex-col gap-4"}
		>
			{LOGIN_FORM_INPUTS.map((input) => {
				const fieldName = input.name as keyof LoginFormTypes;
				return (
					<div
						key={fieldName}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{t("loginForm." + input.labelKey)}</p>

						<Input
							placeholder={t("loginForm." + input.placeholderKey)}
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
					disabled={isSubmitting}
					loading={isSubmitting}
					loadingText={tButtons("loggingIn")}
				>
					{tButtons("logIn")}
				</Button>
			</div>

			<div className={"flex flex-row justify-center gap-2"}>
				<p>{t("noAccount")}</p>
				<NextLink
					isPlain
					href={getPath("Sign up")}
				>
					{tButtons("signUp")}
				</NextLink>
			</div>

			<div className={"flex flex-row justify-center gap-2"}>
				<NextLink
					isPlain
					href={getPath("Forgot password")}
				>
					{t("forgotPassword.link")}
				</NextLink>
			</div>
		</form>
	);
};

export default LoginForm;
