interface Props {
	className?: string;
	filled?: boolean;
}

const SunSVG = ({ className, filled = false }: Props) => {
	return (
		<svg
			className={`stroke-2 stroke-black dark:stroke-white ${className} ${!filled && "active:animate-bounce duration-200"}`}
			width={"35"}
			height={"35"}
			viewBox={"0 0 35 35"}
			fill={"none"}
			xmlns={"http://www.w3.org/2000/svg"}
		>
			<circle
				cx="18"
				cy="17"
				r="13"
				className={`stroke-2 stroke-black dark:stroke-white ${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
				stroke="black"
				strokeWidth="2"
			/>
		</svg>
	);
};

export default SunSVG;
