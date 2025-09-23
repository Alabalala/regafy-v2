"use client";

import { Profile as ProfileType } from "../../types/supabase.types";
import Image from "next/image";
import { NextLink } from "@/shared/components/Link/Link";
import { useState } from "react";
import { Button } from "@/shared/components/Button/Button";
import ProfileForm from "../ProfileForm/ProfileForm";
import CalendarSVG from "@/shared/components/SVGs/calendarSVG";
import { useUser } from "@/features/auth/hooks/useUser";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { getPath } from "@/shared/services/getPath";
import ProfileBirthday from "../ProfileBirthday/ProfileBirthday";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import useProfile from "../../store/hooks/useProfile";

export const ProfileSettings = ({}) => {
	const [profile] = useProfile();
	const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
	const [user] = useUser();
	const logout = useLogout();

	if (!profile || !user) return <p>Loading...</p>;

	return (
		<div className="flex flex-col gap-5">
			<div className="bg-tertiary p-2 border-2 flex flex-col gap-5 pb-6 border-b-2 ">
				<ProfileInfo profile={profile}></ProfileInfo>

				<ProfileBirthday birthday={profile.birthday}></ProfileBirthday>

				{!isProfileFormOpen && (
					<div className="w-fit mx-auto my-auto">
						<Button
							variant="secondary"
							onClick={() => setIsProfileFormOpen(true)}
						>
							Edit profile info
						</Button>
					</div>
				)}

				{isProfileFormOpen && (
					<ProfileForm
						setIsFormOpen={setIsProfileFormOpen}
						profile={profile}
					></ProfileForm>
				)}
			</div>
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-2">
					<h2 className="font-bold">Email</h2>
					<p>Your email: {user.email}</p>
					<div>
						<Button
							isPlain
							variant="secondary"
						>
							Change email
						</Button>
					</div>
				</div>

				<hr />

				<div className="flex flex-col gap-2">
					<h2 className="font-bold">Logout</h2>
					<div className="w-fit mx-auto">
						<Button onClick={() => logout}>Log out</Button>
					</div>
				</div>

				<hr />

				<div className="flex flex-col gap-2">
					<h2 className="font-bold">Delete account</h2>
					<div className="flex justify-center">
						<NextLink
							href={getPath("Delete account")}
							variant="delete"
						>
							Delete account
						</NextLink>
					</div>
				</div>
			</div>
		</div>
	);
};
