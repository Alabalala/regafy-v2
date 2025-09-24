"use client";

import { NextLink } from "@/shared/components/Link";
import { useState } from "react";
import { Button } from "@/shared/components/Button";
import ProfileForm from "../ProfileForm";
import { useUser } from "@/features/auth/hooks/useUser";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { getPath } from "@/shared/services/getPath";
import ProfileBirthday from "../ProfileBirthday";
import ProfileInfo from "../ProfileInfo";
import useProfile from "../../store/hooks/useProfile";
import UpdateEmailForm from "@/features/auth/components/UpdateEmailForm";
import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm";
import LoadingComponent from "@/shared/components/loadingModule";

export const ProfileSettings = ({}) => {
	const [profile] = useProfile();
	const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
	const [user] = useUser();
	const { logout } = useLogout();

	if (!profile || !user) return <LoadingComponent />;

	return (
		<div className="flex flex-col gap-5">
			<div className="bg-tertiary p-2 border-2 flex flex-col gap-5 pb-6 border-b-2 ">
				<ProfileInfo
					canEdit
					profile={profile}
				></ProfileInfo>

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
					<h2 className="font-bold uppercase">Change your email</h2>
					<p>Your email: {user.email}</p>
					<div>
						<UpdateEmailForm></UpdateEmailForm>
					</div>
				</div>

				<hr />

				<div className="flex flex-col gap-2">
					<h2 className="font-bold uppercase">Change your password</h2>
					<div>
						<UpdatePasswordForm></UpdatePasswordForm>
					</div>
				</div>

				<hr />
				<div className="flex flex-col gap-2">
					<h2 className="font-bold">Logout</h2>
					<p>
						You can log out from here, but you will need to log in again with your
						email and password.
					</p>
					<div className="w-fit mx-auto">
						<Button onClick={() => logout()}>Log out</Button>
					</div>
				</div>

				<hr />

				{/*TODO*/}
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
