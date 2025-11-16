"use client";
import { resendConfirmationEmail } from "@/features/auth/services/supabase";
import { Button } from "@/shared/components/Button";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { useToastStore } from "@/shared/stores/toastStore";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EmailConfirmationPage() {
	const [confirmationStatus, setConfirmationStatus] = useState("pending");
	const [resendLoading, setResendLoading] = useState(false);
	const supabase = createClient();
	const router = useRouter();
	const searchParams = useSearchParams();
	const t = useTranslations("auth.confirm");
	const tButtons = useTranslations("buttons");
	const tForm = useTranslations("auth.confirmationForm");
	const email = searchParams.get("email");
	const { message, setMessage } = useToastStore();
	const tErrors = useTranslations("errors");

	useEffect(() => {
		if (message) {
			toast.dismiss();
			toast.success(message);
			setMessage("");
		}
	}, [message]);

	useEffect(() => {
		async function confirmEmail() {
			const tokenHash = searchParams.get("token_hash");
			const type = searchParams.get("type");

			if (tokenHash && type) {
				try {
					const { error } = await supabase.auth.verifyOtp({
						token_hash: tokenHash,
						type: "email",
					});

					if (error) {
						console.error("Confirmation error:", error);
						setConfirmationStatus("error");
					} else {
						setConfirmationStatus("success");
						router.push(getPath("Create profile") + "?type=create");
					}
				} catch (err) {
					console.error("Unexpected error:", err);
					setConfirmationStatus("error");
				}
			} else {
				setConfirmationStatus("error");
			}
		}

		confirmEmail();
	}, [searchParams, router]);

	if (confirmationStatus === "pending") {
		return <LoadingComponent></LoadingComponent>;
	}

	if (confirmationStatus === "success") {
		return (
			<div className="p-5 flex flex-col items-center">
				{t("confirmed")}
				<LoadingComponent></LoadingComponent>
			</div>
		);
	}

	const handleEmailResend = async () => {
		if (!email) return;

		setResendLoading(true);
		const result = await resendConfirmationEmail(email);
		if (!result.success) {
			setMessage(tErrors("generic"));
		} else {
			setMessage(tForm("toast.resent"));
		}

		setResendLoading(false);
	};

	return (
		<div className="p-5 flex flex-col  items-center text-center gap-5">
			<p>{t("expired")}</p>
			<div>
				<Button
					loading={resendLoading}
					onClick={handleEmailResend}
					variant="primary"
					loadingText={tButtons("resending")}
				>
					{tButtons("resendEmail")}
				</Button>
			</div>
		</div>
	);
}

export default EmailConfirmationPage;
