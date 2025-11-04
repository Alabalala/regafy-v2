import CalendarSVG from "@/shared/components/SVGs/calendarSVG";
import { useTranslations } from "next-intl";

const ProfileBirthday = ({ birthday }: { birthday: string }) => {
	const date = new Date(birthday).toLocaleDateString("en-GB");
	const t = useTranslations("friends.profile");
	return (
		<div className="border-2 w-3/4 mx-auto p-2 rounded bg-background-50 dark:bg-background-dark-50">
			<div className="flex flex-row gap-5 w-fit mx-auto items-center">
				<CalendarSVG
					className="w-8 h-8"
					filled
				></CalendarSVG>
				<div className="flex flex-col items-center">
					<div className="font-bold">{t("birthday")}</div>
					<div>{date}</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileBirthday;
