import StarSVG from "@/shared/components/SVGs/StarSVG";

interface Props {
	setRating: React.Dispatch<React.SetStateAction<string>>;
	rating: string;
}

const StarRateInput = ({ setRating, rating }: Props) => {
	const options = [1, 2, 3, 4, 5];

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRating(e.target.value);
		console.log(e.target.value);
	};

	return (
		<div className={"flex gap-2 justify-around"}>
			{options.map((value, index) => (
				<label key={value}>
					<input
						name={`rate-${index}`}
						id={`rate-${index}`}
						type="radio"
						checked={rating === String(value)}
						value={value}
						hidden
						onChange={onChange}
					/>
					<StarSVG filled={index + 1 <= Number(rating)} />
				</label>
			))}
		</div>
	);
};

export default StarRateInput;
