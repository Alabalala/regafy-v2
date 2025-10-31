import StarSVG from "@/shared/components/SVGs/StarSVG";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { GiftFormData } from "../../types/form";

interface Props {
	watch: UseFormWatch<GiftFormData>;
	setValue: UseFormSetValue<GiftFormData>;
}

const StarRateInput = ({ watch, setValue }: Props) => {
	const rating = watch("rating");
	const options = [1, 2, 3, 4, 5];

	return (
		<div className="flex gap-2 justify-around">
			{options.map((value) => (
				<button
					type="button"
					key={value}
					onClick={() => setValue("rating", value.toString())}
					className="focus:outline-none"
				>
					<StarSVG filled={Number(rating) >= value} />
				</button>
			))}
		</div>
	);
};

export default StarRateInput;
