"use client";
import ProfileImage from "@/features/profile/components/ProfileImage";
import { getPrettyDate } from "../../services/getPrettyDate";

interface Props {
	message: string;
	profileImage: string | null;
	profileName: string;
	isDescription?: boolean;
	isOwner?: boolean;
	messageTime: string;
}
//Todo fix comments
const EventComment = ({
	messageTime,
	message,
	profileImage,
	profileName,
	isDescription,
	isOwner,
}: Props) => {
	return (
		<div className={`${isOwner && "w-fit ml-auto mr-0"}`}>
			<div
				className={`flex ${isOwner ? "flex-row-reverse" : "flex-row"} items-end gap-2`}
			>
				<ProfileImage
					small
					profileImage={profileImage}
				></ProfileImage>
				<div>
					<p
						className={`flex ${isOwner ? "flex-row-reverse" : "flex-row"} items-center justify-between gap-4 ${isOwner ? "text-right" : "text-left"}`}
					>
						{profileName}
						<span className="text-xs text-gray-600">
							{getPrettyDate(new Date(messageTime), "en-UK", true)}
						</span>
					</p>
					<div
						className={`min-w-60 w-fit border-2 rounded-md p-3  ${isDescription ? "bg-accent dark:bg-accent-dark" : isOwner ? "bg-secondary dark:bg-secondary-dark text-right ml-auto mr-0" : " bg-tertiary dark:bg-tertiary-dark"}`}
					>
						<p>{message}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventComment;
