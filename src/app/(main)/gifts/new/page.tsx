import GiftForm from "@/features/gifts/components/GiftForm";
import H1WithExit from "@/shared/components/H1WithExit";
import { getPath } from "@/shared/services/getPath";
//todo fix new gift for friend
const NewGift = () => {
	return (
		<div className={"flex flex-col gap-5"}>
			<H1WithExit href={getPath("Gifts")}>New gift</H1WithExit>
			<GiftForm></GiftForm>
		</div>
	);
};

export default NewGift;
