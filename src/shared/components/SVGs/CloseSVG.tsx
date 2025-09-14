interface Props {
	fill?: string;
	height?: string;
	width?: string;
}

const CloseSVG = ({
	fill = "#000000",
	height = "24px",
	width = "24px",
}: Props) => {
	return (
		<svg
			xmlns={"http://www.w3.org/2000/svg"}
			height={height}
			viewBox={"0 -960 960 960"}
			width={width}
			fill={fill}
		>
			<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
		</svg>
	);
};

export default CloseSVG;
