"use client";

import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useToastStore } from "@/shared/stores/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateEmailAction } from "../../actions/updateEmail";
import {
	CHANGE_EMAIL_FORM_INPUTS,
	INITIAL_CHANGE_EMAIL_FORM_DATA,
} from "../../constants/forms";
import { updateEmailFormSchema } from "../../schemas/updateEmail";
import { UpdateEmailFormTypes } from "../../types/forms";
import { useTranslations } from "next-intl";

const UpdateEmailForm = () => {
	const [supabaseToast, setsupabaseToast] = useState<string | undefined>("");
	const { setMessage } = useToastStore();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<UpdateEmailFormTypes>({
		resolver: zodResolver(updateEmailFormSchema),
		defaultValues: INITIAL_CHANGE_EMAIL_FORM_DATA,
	});
	const t = useTranslations("profileSettings.emailForm");
	const tButtons = useTranslations("buttons");

	const onSubmit = async (data: UpdateEmailFormTypes) => {
		const result = await updateEmailAction(data);
		if (!result.success) {
			if (result.errors?.root) {
				setsupabaseToast(result.errors?.root);
			}
			return;
		} else if (result.success) {
			setMessage(t("toast.updated"));
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={"flex flex-col gap-4"}
		>
			{CHANGE_EMAIL_FORM_INPUTS.map((input) => {
				const fieldName = input.name as keyof UpdateEmailFormTypes;
				return (
					<div
						key={input.name}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{t(input.labelKey)}</p>
						<Input
							placeholder={t(input.placeholderKey)}
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
					loadingText={tButtons("saving")}
				>
					{tButtons("updateEmail")}
				</Button>
			</div>
		</form>
	);
};

export default UpdateEmailForm;
