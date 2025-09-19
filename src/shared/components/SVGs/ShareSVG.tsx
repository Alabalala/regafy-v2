interface Props {
	filled?: boolean;
	height?: string;
	width?: string;
}

const ShareSVG = ({
	filled = false,
	height = "24px",
	width = "24px",
}: Props) => {
	return (
		<svg
			xmlns={"http://www.w3.org/2000/svg"}
			height={height}
			viewBox="0 0 35 35"
			width={width}
			className={`${!filled && "active:animate-bounce duration-200"}`}
		>
			<path
				className="stroke-2 stroke-black dark:stroke-white"
				d="M24 28L9.5 20M9.5 15L24 8.5"
			/>
			<circle
				cx="29"
				cy="29"
				r="5"
				className={`stroke-2 stroke-black dark:stroke-white ${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<circle
				cx="6"
				cy="17"
				r="5"
				className={`stroke-2 stroke-black dark:stroke-white ${filled ? "fill-secondary dark:fill-secondary-dark" : "fill-none"} group-hover:fill-secondary-50 group-hover:dark:fill-secondary-dark-50 group-active:fill-secondary-100 group-active:dark:fill-secondary-dark-100`}
			/>
			<circle
				cx="29"
				cy="6"
				r="5"
				className={`stroke-2 stroke-black dark:stroke-white ${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
		</svg>
	);
};

export default ShareSVG;
