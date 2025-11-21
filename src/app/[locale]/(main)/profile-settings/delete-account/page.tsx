"use client";
import { deleteAccountAction } from "@/features/auth/actions/deleteAccount";
import { useUser } from "@/features/auth/hooks/useUser";
import { Button } from "@/shared/components/Button";
import { NextLink } from "@/shared/components/Link";
import LoadingComponent from "@/shared/components/loadingModule";
import MessageBox from "@/shared/components/MessageBox";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";

import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function DeleteAccountPage() {
	const t = useTranslations("profileSettings.deleteAccountPage");
	const tButtons = useTranslations("buttons");
	const tErrors = useTranslations("errors");
	const supabase = createClient();
	const [user] = useUser();
	const [error, setError] = useState(false);

	if (!user) {
		return <LoadingComponent />;
	}

	const onDelete = async () => {
		try {
			await deleteAccountAction(user.id);
			await supabase.auth.signOut();
			redirect(getPath("Login"));
		} catch (error) {
			console.log(error);
			setError(true);
		}
	};

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-xl font-bold">{t("title")}</h1>
			<p>{t("body")}</p>

			<div className="flex flex-col items-center gap-5">
				<NextLink
					variant="primary"
					href={getPath("Home")}
				>
					{tButtons("goBack")}
				</NextLink>
				<Button
					onClick={onDelete}
					variant="delete"
					disabled={error}
				>
					{tButtons("deleteAccount")}
				</Button>
			</div>
			{error && <MessageBox type="error">{tErrors("generic")}</MessageBox>}
		</div>
	);
}
