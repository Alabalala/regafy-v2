interface Props {
	className?: string;
	filled?: boolean;
}

const NewGiftSVG = ({ className, filled }: Props) => {
	return (
		<svg
			viewBox={"0 0 35 36"}
			fill={"none"}
			xmlns={"http://www.w3.org/2000/svg"}
			className={`${className} ${!filled && "active:animate-bounce duration-200"} stroke-black dark:stroke-white`}
		>
			<rect
				x="1"
				y="1"
				width="33"
				height="34"
				rx="3"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<rect
				x="1"
				y="1"
				width="33"
				height="34"
				rx="3"
				className="stroke-2 stroke-black dark:stroke-white "
			/>
			<line
				x1="18"
				y1="12"
				x2="18"
				y2="25"
				className="stroke-2 stroke-black dark:stroke-white "
				strokeLinecap="round"
			/>
			<line
				x1="24"
				y1="18"
				x2="11"
				y2="18"
				className="stroke-2 stroke-black dark:stroke-white "
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default NewGiftSVG;
