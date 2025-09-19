interface Props {
	filled?: boolean;
	height?: string;
	width?: string;
}

const BookMarkSVG = ({
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
			className={`${!filled && "active:animate-bounce duration-200"} stroke-2 stroke-black dark:stroke-white`}
		>
			<path
				d="M6 1H30C31.1046 1 32 1.89543 32 3V29.5488C32 31.1251 30.2613 32.0816 28.9297 31.2383L20.1406 25.6719C18.8338 24.8442 17.1662 24.8442 15.8594 25.6719L7.07031 31.2383C5.73868 32.0817 4 31.1251 4 29.5488V3L4.01074 2.7959C4.113 1.78722 4.96435 1 6 1Z"
				className={`stroke-2 stroke-black dark:stroke-white ${filled ? "fill-secondary dark:fill-secondary-dark" : "fill-none"} group-hover:fill-secondary-50 group-hover:dark:fill-secondary-dark-50 group-active:fill-secondary-100 group-active:dark:fill-secondary-dark-100`}
				stroke="black"
				strokeWidth="2"
			/>
			<path
				d="M18.4512 9.69141L19.4609 12.8008H25.8086L23.3184 14.6094L20.6729 16.5303L21.6836 19.6406L22.6348 22.5674L20.1455 20.7588L17.5 18.8369L14.8545 20.7588L12.3652 22.5674L13.3164 19.6406L14.3262 16.5303L11.6816 14.6094L9.19141 12.8008H15.5391L16.5488 9.69141L17.5 6.76367L18.4512 9.69141Z"
				className={`stroke-2 stroke-black dark:stroke-white ${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
				stroke="black"
				strokeWidth="2"
			/>
		</svg>
	);
};

export default BookMarkSVG;
