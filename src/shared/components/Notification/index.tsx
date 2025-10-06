import ProfileImage from "@/features/profile/components/ProfileImage";
import CloseSVG from "../SVGs/CloseSVG";
import { NotificationWithSender } from "@/shared/types/supabase/supabase";
import { useState } from "react";

interface Props {
	notification: NotificationWithSender;
	handleRead: (notificationId: number) => void;
	handleClick: (
		type: string,
		referenceId: string,
		notificationId: number,
	) => void;
}

const Notification = ({ notification, handleRead, handleClick }: Props) => {
	const [isReading, setIsReading] = useState(false);

	return (
		<div
			className={`relative w-full transition duration-200 ${isReading && "-translate-x-full"}`}
		>
			<button
				onClick={() =>
					handleClick(notification.type, notification.reference_id, notification.id)
				}
				className="w-full pr-10 border-2 rounded-md "
			>
				<div className=" text-left text-xs p-3 flex flex-row gap-4 items-center">
					<ProfileImage
						canEdit={false}
						small
						profileImage={notification.sender.profileImage}
					/>
					<div className="flex flex-col ">
						<p className="font-bold">{notification.subject}</p>
						<p>{notification.message}</p>
					</div>
				</div>
				<div></div>
			</button>
			<div className="absolute top-1/2 right-2 -translate-y-1/2 ">
				<button
					onClick={() => {
						handleRead(notification.id);
						setIsReading(true);
					}}
				>
					<CloseSVG />
				</button>
			</div>
		</div>
	);
};

export default Notification;
