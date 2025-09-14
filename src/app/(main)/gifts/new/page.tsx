import GiftForm from "@/features/gifts/components/GiftForm/GiftForm";
import H1WithExit from "@/shared/components/H1WithExit/H1WithExit";
import { getPath } from "@/shared/utils/getPath";

const NewGift = () => {
	return (
		<div className={"flex flex-col gap-5 p-5"}>
			<H1WithExit href={getPath("Gifts")}>New gift</H1WithExit>
			<GiftForm></GiftForm>
		</div>
	);
};

export default NewGift;
