import StarSVG from "@/shared/components/SVGs/StarSVG";

const StarRate = ({ rating }: { rating: string }) => {
	return (
		<div className={"flex gap-2 justify-around pointer-none "}>
			{Array.from({ length: 5 }).map((_, index) => {
				return <StarSVG filled={index + 1 <= Number(rating)} />;
			})}
		</div>
	);
};

export default StarRate;
