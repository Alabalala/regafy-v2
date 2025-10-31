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

const LoginForm = () => {
	const [supabaseToast, setSupabaseToast] = useState<string | undefined>("");
	const { user } = useUserStore();
	const router = useRouter();

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
		console.log(result);
		if (!result.success) {
			setSupabaseToast(result.errors?.root);
			return;
		}

		if (result.success) {
			router.push(getPath("Home"));
			return;
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
						<p className={"font-bold"}>{input.label}</p>

						<Input
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
					loadingText={"Logging in..."}
				>
					Log in
				</Button>
			</div>

			<div className={"flex flex-col items-center gap-2"}>
				<p>Don&apos;t have an account?</p>
				<NextLink
					variant="secondary"
					href={getPath("Sign up")}
				>
					Sign up now
				</NextLink>
			</div>
		</form>
	);
};

export default LoginForm;
