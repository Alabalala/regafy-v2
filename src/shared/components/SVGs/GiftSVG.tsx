interface Props {
	className?: string;
	filled?: boolean;
}

const GiftSVG = ({ className, filled = false }: Props) => {
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
				d={
					"M19.5039 9.76319C20.5074 6.75808 23.4046 0.268475 27 4.26335C30.5988 8.26207 23.5046 9.59583 19.5039 9.76319Z"
				}
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d={
					"M19.5 9.77473C20.5 6.77473 23.4 0.263354 27 4.26335C30.6 8.26335 23.5 9.59669 19.5 9.76335"
				}
				stroke={"black"}
				strokeWidth={"2"}
			/>
			<path
				d={
					"M16 10.2634C15.0575 7.25849 12.3242 0.747924 8.93115 4.75443C5.5381 8.76094 12.2299 10.0964 16 10.2634Z"
				}
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
				stroke={"black"}
				strokeWidth={"2"}
			/>
			<circle
				cx={"18"}
				cy={"8"}
				r={"2.5"}
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
				stroke={"black"}
			/>
			<path
				fillRule={"evenodd"}
				clipRule={"evenodd"}
				d={
					"M14 15.2634H5V29.2634C5 30.9202 6.34315 32.2634 8 32.2634H14V15.2634ZM21 15.2634V32.2634H28C29.6569 32.2634 31 30.9202 31 29.2634V15.2634H21Z"
				}
				className={`${filled ? "fill-tertiary dark:fill-tertiary-dark" : "fill-none"} group-hover:fill-tertiary-50 group-hover:dark:fill-tertiary-dark-50 group-active:fill-tertiary-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d={"M21 15.2634H14V32.2634H21V15.2634Z"}
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d={
					"M13 16.2634V31.2634H8C6.89543 31.2634 6 30.3679 6 29.2634V16.2634H13ZM30 16.2634V29.2634C30 30.3679 29.1046 31.2634 28 31.2634H22V16.2634H30ZM20 16.2634V31.2634H15V16.2634H20Z"
				}
				stroke={"black"}
				strokeWidth={"2"}
			/>
			<path
				fillRule={"evenodd"}
				clipRule={"evenodd"}
				d={
					"M14 9.26337H5C3.89543 9.26337 3 10.1588 3 11.2634V17.2634H14V9.26337ZM21 17.2634H31C32.1046 17.2634 33 16.3679 33 15.2634V11.2634C33 10.1588 32.1046 9.26337 31 9.26337H21V17.2634Z"
				}
				className={`${filled ? "fill-tertiary dark:fill-tertiary-dark" : "fill-none"} group-hover:fill-tertiary-50 group-hover:dark:fill-tertiary-dark-50 group-active:fill-tertiary-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d={"M14 9.26337V17.2634H21V9.26337H14Z"}
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d={
					"M31 10.2634C31.5523 10.2634 32 10.7111 32 11.2634V15.2634C32 15.8157 31.5523 16.2634 31 16.2634H22V10.2634H31ZM20 10.2634V16.2634H15V10.2634H20ZM5 10.2634H13V16.2634H4V11.2634C4 10.7111 4.44772 10.2634 5 10.2634Z"
				}
				stroke={"black"}
				strokeWidth={"2"}
			/>
		</svg>
	);
};

export default GiftSVG;
