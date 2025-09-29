import ProfileImage from "@/features/profile/components/ProfileImage";

interface Props {
	message: string;
	profileImage: string | null;
	profileName: string;
	isDescription?: boolean;
}

const EventComment = ({
	message,
	profileImage,
	profileName,
	isDescription,
}: Props) => {
	return (
		<div>
			<div className="flex flex-row gap-2">
				<ProfileImage
					small
					profileImage={profileImage}
				></ProfileImage>
				<div>
					<p>{profileName}</p>
					<div
						className={`border-2 rounded-md p-3 ${isDescription ? "bg-accent dark:bg-accent-dark" : " bg-tertiary dark:bg-tertiary-dark"}`}
					>
						<p>{message}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventComment;
