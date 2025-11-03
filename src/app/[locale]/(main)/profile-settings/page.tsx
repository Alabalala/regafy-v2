import { ProfileSettings } from "@/features/profile/components/ProfileSettings";
import { useTranslations } from "next-intl";

const ProfileSettingsPage = () => {
	const t = useTranslations("profileSettings");
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-xl font-bold uppercase">{t("profileSettings")}</h1>
			<ProfileSettings></ProfileSettings>
		</div>
	);
};

export default ProfileSettingsPage;
