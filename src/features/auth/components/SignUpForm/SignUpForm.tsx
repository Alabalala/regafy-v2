"use client";

import { useEffect, useState } from "react";
import {
	SIGNUP_FORM_INITIAL_DATA,
	SIGNUP_FORM_INPUTS,
} from "../../constants/forms";
import { FieldErrors } from "@/shared/types/forms";
import Input from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button/Button";
import { resendConfirmationEmail, signup } from "../../services/supabase";
import { useUserStore } from "@/shared/stores/userStore";
import { useRouter } from "next/navigation";
import { getPath } from "@/shared/utils/getPath";
import { NextLink } from "@/shared/components/Link/Link";
import { validateSignUpForm } from "../../services/validateSignUpForm";

const SignUpForm = () => {
	const [formData, setFormData] = useState<SignUpFormTypes>(
		SIGNUP_FORM_INITIAL_DATA,
	);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [supabaseToast, setSupabaseToast] = useState<string | undefined>("");
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUserStore();
	const router = useRouter();
	const [singupComplete, setSingupComplete] = useState(false);

	useEffect(() => {
		if (user) {
			router.push(getPath("Home"));
		}
	}, [user]);

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target as HTMLInputElement;
		const normalisedValue = value.replace(/^ +/, "");

		setFormData({
			...formData,
			[name]: normalisedValue,
		});
	};

	const onSubmit = async () => {
		setSupabaseToast("");
		setIsLoading(true);
		const validationResult = validateSignUpForm(formData);

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setIsLoading(false);
			return;
		}

		setErrors({});

		const supabaseResult = await signup(formData);

		if (!supabaseResult.success) {
			setSupabaseToast(supabaseResult.error);
			setIsLoading(false);
			return;
		}

		setSingupComplete(true);
		setIsLoading(false);
	};

	const handleEmailresend = async () => {
		setIsLoading(true);
		const result = await resendConfirmationEmail(formData.email);

		if (!result.success) {
			setSupabaseToast(result.error);
			setIsLoading(false);
			return;
		}

		setIsLoading(false);
		setSupabaseToast("Email resent! Check your inbox.");
	};

	return (
		<form>
			{singupComplete ? (
				<div className="flex flex-col gap-4 items-center">
					<p className={"font-bold"}>
						Sign up complete! Check your email to verify your account.
					</p>
					{supabaseToast && <div className="text-sm">{supabaseToast}</div>}
					<Button
						loading={isLoading}
						onClick={handleEmailresend}
						variant="primary"
						loadingText="Resending..."
					>
						Resend email
					</Button>
					<NextLink href={getPath("Login")}>Go back to Login</NextLink>
				</div>
			) : (
				<div className={"flex flex-col gap-4"}>
					{SIGNUP_FORM_INPUTS.map((input) => (
						<div
							key={input.name}
							className={"flex flex-col gap-2"}
						>
							<p className={"font-bold"}>{input.label}</p>
							<Input
								onChange={onChange}
								input={input}
								value={formData[input.name as keyof SignUpFormTypes]}
								error={!!errors[input.name]?.length}
							/>
							<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
						</div>
					))}

					<p className="text-sm text-gray-400">
						Password must be at least 6 characters, contain at least one uppercase
						letter, one lowercase letter, one number and one special character.{" "}
					</p>

					{supabaseToast && (
						<div className="text-red-500 text-sm">{supabaseToast}</div>
					)}

					<div className={"flex justify-center"}>
						<Button
							loading={isLoading}
							loadingText="Signing up..."
							type={"button"}
							onClick={onSubmit}
						>
							Sign up
						</Button>
					</div>

					<div className={"flex flex-col items-center gap-2"}>
						<p>Already have an account?</p>
						<NextLink
							variant="secondary"
							href={getPath("Login")}
						>
							Log in
						</NextLink>
					</div>
				</div>
			)}
		</form>
	);
};

export default SignUpForm;
