"use client";

import LoadingComponent from "@/shared/components/loadingModule";
import { createClient } from "@/shared/services/supabase/client";
import { useToastStore } from "@/shared/stores/toastStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";

const RecoverPasswordForm = () => {
	const [checking, setChecking] = useState(true);
	const [expired, setExpired] = useState(false);
	const { message } = useToastStore();
	const t = useTranslations("auth.passwordRecovery.form");
	const tButtons = useTranslations("buttons");
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		const checkToken = async () => {
			const params = new URLSearchParams(window.location.search);
			const token_hash = params.get("token_hash");
			if (!token_hash) {
				setExpired(true);
				setChecking(false);
				return;
			}

			try {
				const { error } = await supabase.auth.verifyOtp({
					type: "recovery",
					token_hash,
				});

				if (error) {
					setExpired(true);
				} else {
					router.push(getPath("Profile settings") + "#password-change");
				}
			} catch {
				setExpired(true);
			} finally {
				setChecking(false);
			}
		};

		checkToken();
	}, [router, supabase]);

	useEffect(() => {
		if (message) {
			toast.dismiss();
			toast.success(message);
		}
	}, [message]);

	if (checking) {
		return <LoadingComponent />;
	}

	if (expired) {
		return (
			<div className="flex flex-col gap-5 justify-center items-center">
				<p>{t("expired")}</p>
				<NextLink href={getPath("Forgot password")}>{tButtons("go")}</NextLink>
			</div>
		);
	}

	return null;
};

export default RecoverPasswordForm;
