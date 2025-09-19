interface Props {
	className?: string;
	filled?: boolean;
}

const StarSVG = ({ className, filled = false }: Props) => {
	return (
		<svg
			className={`${className} ${filled ? "fill-accent dark:fill-accent-dark" : "none"} stroke-black dark:stroke-white`}
			height="35px"
			width="35px"
			viewBox="0 -960 960 960"
			xmlns="http://www.w3.org/2000/svg"
			strokeWidth={40}
		>
			<path d="M233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z" />{" "}
		</svg>
	);
};

export default StarSVG;
