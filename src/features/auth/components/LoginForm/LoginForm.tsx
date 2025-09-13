"use client";

import { useEffect, useState } from "react";
import {
	LOGIN_FORM_INITIAL_DATA,
	LOGIN_FORM_INPUTS,
} from "../../constants/forms";
import { FieldErrors } from "@/shared/types/forms";
import Input from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button/Button";
import { validateLoginForm } from "../../services/validateLoginForm";
import { login } from "../../services/supabase";
import { useUserStore } from "@/shared/stores/userStore";
import { useRouter } from "next/navigation";
import { getPath } from "@/shared/utils/getPath";

const LoginForm = () => {
	const [formData, setFormData] = useState<LoginFormTypes>(
		LOGIN_FORM_INITIAL_DATA,
	);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [supabaseError, setSupabaseErrors] = useState<string | undefined>("");
	const [isLoading, setIsLoading] = useState(false);
	const { user, setUser } = useUserStore();
	const router = useRouter();

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
		setIsLoading(true);
		const validationResult = validateLoginForm(formData);

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setIsLoading(false);
			return;
		}

		setErrors({});

		const supabaseResult = await login(formData);

		if (!supabaseResult.success) {
			setSupabaseErrors(supabaseResult.error);
			setIsLoading(false);
			return;
		}

		if (supabaseResult.user) {
			setUser(supabaseResult.user);
		}

		router.push(getPath("Home"));
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{LOGIN_FORM_INPUTS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					<Input
						onChange={onChange}
						input={input}
						value={formData[input.name as keyof LoginFormTypes]}
						error={!!errors[input.name]?.length}
					/>
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}

			{supabaseError && (
				<div className="text-red-500 text-sm">{supabaseError}</div>
			)}

			<div className={"flex justify-center"}>
				<Button
					loading={isLoading}
					loadingText="Logging in..."
					type={"button"}
					onClick={onSubmit}
				>
					Log in
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
