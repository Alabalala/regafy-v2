import Link from "next/link";
import { Profile as ProfileType } from "../../types/supabase.types";
import Image from "next/image";
import { getPath } from "@/shared/services/getPath";
import { NextLink } from "@/shared/components/Link/Link";

interface Props {
	profile: ProfileType;
}

export const Profile = ({ profile }: Props) => {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col justify-center items-center">
					<div className="relative w-20 h-20 bg-background-100 dark:bg-background-dark-100 rounded-full border-2">
						<Image
							alt="Profile image"
							src={profile.profileImage || "/illustrations/caddy.webp"}
							fill
						></Image>
					</div>

					<div className="font-bold">{profile.name}</div>
					<div className="font-light">@{profile.userName}</div>
				</div>
				<div className="w-fit mx-auto my-auto">
					<NextLink
						size="small"
						variant="secondary"
						href={getPath("Edit profile")}
					>
						Edit profile
					</NextLink>
				</div>
			</div>
		</div>
	);
};
