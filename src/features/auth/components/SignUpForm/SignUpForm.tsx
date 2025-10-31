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
	console.log(errors);
	useEffect(() => {
		if (user) {
			router.push(getPath("Home"));
		}
	}, [user, router]);
	const email = watch("email");

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
			setMessage("Email resent! Check your inbox.");
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
					<p>Sign up complete! Check your email to verify your account.</p>
					<Button
						loading={resendLoading}
						onClick={handleEmailResend}
						variant="primary"
						loadingText="Resending..."
					>
						Resend email
					</Button>
					<NextLink href={getPath("Login")}>Go back to Login</NextLink>
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

					<p className="text-sm text-gray-400">
						Password must be at least 6 characters, contain at least one uppercase
						letter, one lowercase letter, one number and one special character.{" "}
					</p>

					<div className={"flex justify-center"}>
						<Button
							type="submit"
							disabled={isSubmitting}
							loading={isSubmitting}
							loadingText={"Logging in..."}
						>
							Sign up
						</Button>
					</div>

					<div className={"flex flex-row justify-center items-center gap-2"}>
						<p>Already have an account?</p>
						<NextLink
							isPlain
							variant="primary"
							href={getPath("Login")}
						>
							Log in
						</NextLink>
					</div>
				</div>
			)}
			{message && <div className="text-red-500 text-sm">{message}</div>}
		</form>
	);
};

export default SignUpForm;
