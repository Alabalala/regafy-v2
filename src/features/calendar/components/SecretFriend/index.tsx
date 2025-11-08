"use client";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { SecretFriendType } from "@/shared/types/supabase/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createAssignments } from "../../services/createAssignments";
import { addAssignment, updateAssigments } from "../../services/supabase";
import { g } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import { isEveryoneIncluded } from "../../services/isEveryoneIncluded";
import { useToastStore } from "@/shared/stores/toastStore";
import { useTranslations } from "next-intl";
import { createNotification } from "@/shared/services/supabase/notifications";
import { createNotificationAction } from "@/shared/actions/createNotification";

interface Props {
	guests: Profile[];
	secretFriend?: SecretFriendType[];
	eventId: number;
	hasSecretFriend?: boolean;
	userId: string;
	isUserCreator: boolean;
}

//to do, fix create assignments to add user too!<

const SecretFriend = ({
	guests,
	secretFriend,
	eventId,
	hasSecretFriend,
	userId,
	isUserCreator,
}: Props) => {
	const supabase = createClient();
	const [assigmentProfile, setAsignmentProfile] = useState<Profile>();
	const [loading, setLoading] = useState(false);
	const [isAllIncluded, setIsAllIncluded] = useState(false);
	const [isUserIncluded, setIsUserIncluded] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isFlipped, setIsFlipped] = useState(false);
	const { setMessage } = useToastStore();
	const t = useTranslations("events.event.secretFriend");
	const tErrors = useTranslations("errors");
	const tButtons = useTranslations("buttons");
	useEffect(() => {
		if (secretFriend) {
			const asignment = secretFriend.find((s) => s.user_id === userId);
			const asignee = guests.find((g) => g.id === asignment?.assignee_id);

			setAsignmentProfile(asignee);

			const { userIncluded, allIncluded } = isEveryoneIncluded(
				secretFriend,
				guests,
				userId,
			);
			setIsUserIncluded(userIncluded);
			setIsAllIncluded(allIncluded);
		}
	}, [secretFriend, userId, guests]);

	const assignSecretFriend = async (mode: "create" | "update") => {
		if (
			mode === "create" &&
			Array.isArray(secretFriend) &&
			secretFriend.length > 0
		)
			return;
		if (!userId) {
			setErrorMessage(tErrors("generic"));
			return;
		}
		setLoading(true);
		const guestsId = guests.map((guest) => guest.id);
		const allIds = [...guestsId, userId];
		try {
			const assigments = createAssignments(allIds);
			const result =
				mode === "create"
					? await addAssignment(eventId, assigments, supabase)
					: await updateAssigments(eventId, assigments, supabase);
			if (result) {
				const assignment = result.find(
					(assignment) => assignment.user_id === userId,
				);
				const asigneeProfile = guests.find(
					(guest) => guest.id === assignment?.assignee_id,
				);
				setAsignmentProfile(asigneeProfile);
				const { userIncluded, allIncluded } = isEveryoneIncluded(
					result,
					guests,
					userId,
				);
				setIsUserIncluded(userIncluded);
				setIsAllIncluded(allIncluded);
				setMessage(t("toast.assigmentDone"));
				await createNotificationAction(guestsId, "secret_friend", userId, eventId);
			}
		} catch (error) {
			console.log(error);

			setErrorMessage(tErrors("generic"));
		} finally {
			setLoading(false);
		}
	};

	if (!hasSecretFriend && !assigmentProfile)
		return (
			<div className="flex flex-col gap-5">
				<h2 className="text-xl font-bold">{t("secretFriend")}</h2>
				<p>{t("startMessage")}</p>
				{errorMessage && <p className="text-red-500">{errorMessage}</p>}

				<div className="flex justify-center">
					<Button
						loading={loading}
						onClick={() => assignSecretFriend("create")}
					>
						{tButtons("start")}
					</Button>
				</div>
			</div>
		);

	if (!isUserCreator && !isUserIncluded) {
		return (
			<div className="flex flex-col gap-5">
				<h2 className="text-xl font-bold">{t("secretFriend")}</h2>
				<p>{t("onGoingSecretFriend")}</p>
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-5 ">
			<h2 className="text-xl font-bold">{t("secretFriend")}</h2>

			{assigmentProfile && (
				<div className="flex flex-col justify-center gap-2">
					<Button
						isPlain
						onClick={() => setIsFlipped(!isFlipped)}
					>
						<div
							id="flip-card"
							className="flex bg-transparent mx-auto h-[300px] w-[250px] perspective-midrange"
						>
							<div
								id="flip-card-inner"
								className={`relative w-full h-full transition-transform duration-1000 transform-3d ${isFlipped && "rotate-y-180"}`}
							>
								<div
									id="flip-card-front"
									className="absolute w-full h-full backface-hidden flex justify-center bg-tertiary-100 dark:bg-tertiary-dark-100 rounded-md 
						border-2 p-5"
								>
									<Image
										className="w-1/2 h-full object-contain"
										width={100}
										height={200}
										alt={t("imageAlt")}
										src={"/illustrations/incognito-caddy.webp"}
									/>
								</div>
								<div
									id="flip-card-back"
									className="absolute w-full h-full backface-hidden rotate-y-180 bg-background-100 dark:bg-background-dark-100 flex flex-col justify-center items-center rounded-md border-2 p-5"
								>
									<ProfileInfo
										canEdit={false}
										profile={assigmentProfile}
									/>
									<NextLink href={getPath("Friend profile", assigmentProfile.id)}>
										{tButtons("viewProfile")}
									</NextLink>
								</div>
							</div>
						</div>
					</Button>
					<p className="text-center font-semibold">{t("flipCardMessage")}</p>
				</div>
			)}

			{isUserCreator && !isAllIncluded && (
				<div className="flex flex-col gap-5">
					<div>
						<p>{t("psst")}</p>
						<p>{t("everyoneNotIncluded")}</p>
					</div>
					{errorMessage && <p className="text-red-500">{errorMessage}</p>}

					<div className="flex justify-center">
						<Button
							loading={loading}
							onClick={() => assignSecretFriend("update")}
						>
							t{tButtons("restart")}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
export default SecretFriend;
