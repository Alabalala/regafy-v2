interface Props {
	className?: string;
	filled?: boolean;
}

const MoonSVG = ({ className, filled = false }: Props) => {
	return (
		<svg
			className={`${className} ${!filled && "active:animate-bounce duration-200"}`}
			width={"35"}
			height={"35"}
			viewBox={"0 0 35 35"}
			fill={"none"}
			xmlns={"http://www.w3.org/2000/svg"}
		>
			<path
				d="M21.1787 4.00879C23.5197 4.09648 25.6979 4.83466 27.5479 6.0459C27.9483 6.3081 28.1067 6.81759 27.9258 7.26074C27.7449 7.70388 27.2752 7.95719 26.8057 7.86426C26.3154 7.76722 25.8148 7.71387 25.3066 7.71387C20.6468 7.71412 16.6904 11.9593 16.6904 17.4287L16.7012 17.9297C16.9306 23.0719 20.6721 27.0156 25.0957 27.1357C25.5678 27.1487 25.9664 27.4906 26.0518 27.9551C26.1371 28.4196 25.886 28.8807 25.4492 29.0605C24.0761 29.626 22.5842 29.9569 21.0215 29.9961L20.708 30C13.6667 30 8 24.1563 8 17C8 9.84365 13.6667 4 20.708 4L21.1787 4.00879Z"
				className={`stroke-2 stroke-black dark:stroke-white ${filled ? "fill-tertiary dark:fill-tertiary-dark" : "fill-none"} group-hover:fill-tertiary-50 group-hover:dark:fill-tertiary-dark-50 group-active:fill-tertiary-100 group-active:dark:fill-tertiary-dark-100`}
				stroke="black"
				strokeWidth="2"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default MoonSVG;
