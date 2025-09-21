interface Props {
	className?: string;
	filled?: boolean;
}

const HomeSVG = ({ className, filled = false }: Props) => {
	return (
		<svg
			className={`${className} ${!filled && "active:animate-bounce duration-200"}`}
			width={"35"}
			height={"35"}
			viewBox={"0 0 35 35"}
			fill={"none"}
			xmlns={"http://www.w3.org/2000/svg"}
		>
			<rect
				x="5"
				y="14"
				width="25"
				height="18"
				rx="1"
				className={`${filled ? "fill-tertiary dark:fill-tertiary-dark" : "fill-none"} group-hover:fill-tertiary-50 group-hover:dark:fill-tertiary-dark-50 group-active:fill-tertiary-100 group-active:dark:fill-tertiary-dark-100 stroke-2 stroke-black dark:stroke-white`}
			/>
			<path
				d="M16.8174 4.21777C17.2175 3.92743 17.7825 3.92743 18.1826 4.21777L30.5801 13.2139C30.9933 13.5137 31.074 13.9349 30.9434 14.3047C30.8106 14.6805 30.456 14.9998 29.8984 15H5.10156C4.54402 14.9998 4.18945 14.6805 4.05664 14.3047C3.92604 13.9349 4.00666 13.5137 4.41992 13.2139L16.8174 4.21777Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100 stroke-2 stroke-black dark:stroke-white`}
			/>
		</svg>
	);
};

export default HomeSVG;
