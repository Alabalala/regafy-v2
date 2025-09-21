interface Props {
	className?: string;
	filled?: boolean;
}

const CalendarSVG = ({ className, filled }: Props) => {
	return (
		<svg
			viewBox={"0 0 33 33"}
			fill={"none"}
			xmlns={"http://www.w3.org/2000/svg"}
			className={` ${className} ${!filled && "active:animate-bounce duration-200"}`}
		>
			<path
				d="M3 30C3 31.6569 4.34315 33 6 33H30C31.6569 33 33 31.6569 33 30V13.5H3V30Z"
				className={`${filled ? "fill-background dark:fill-background-dark" : "fill-none"} group-hover:fill-background-50 group-hover:dark:fill-background-dark-50 group-active:fill-background-100 group-active:dark:fill-background-dark-100`}
			/>
			<path
				d="M33 9C33 7.34315 31.6569 6 30 6H6C4.34315 6 3 7.34315 3 9V13.5H33V9Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M30 31V33H6V31H30ZM31 9C31 8.44772 30.5523 8 30 8H6C5.44772 8 5 8.44772 5 9V12.5H31V9ZM33 30C33 31.6569 31.6569 33 30 33V31C30.5523 31 31 30.5523 31 30V14.5H5V30C5 30.5523 5.44772 31 6 31V33C4.34315 33 3 31.6569 3 30V9C3 7.34315 4.34315 6 6 6H30C31.6569 6 33 7.34315 33 9V30Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M8 4.5C8 3.11929 9.11929 2 10.5 2V2C11.8807 2 13 3.11929 13 4.5V8.5C13 9.88071 11.8807 11 10.5 11V11C9.11929 11 8 9.88071 8 8.5V4.5Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"}  group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M11 8.5V4.5C11 4.22386 10.7761 4 10.5 4C10.2239 4 10 4.22386 10 4.5V8.5C10 8.77614 10.2239 9 10.5 9V11C9.20566 11 8.14082 10.0164 8.0127 8.75586L8 8.5V4.5C8 3.11929 9.11929 2 10.5 2C11.8807 2 13 3.11929 13 4.5V8.5L12.9873 8.75586C12.8592 10.0164 11.7943 11 10.5 11V9C10.7761 9 11 8.77614 11 8.5Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M11 8.5V4.5C11 4.22386 10.7761 4 10.5 4C10.2239 4 10 4.22386 10 4.5V8.5C10 8.77614 10.2239 9 10.5 9V11C9.20566 11 8.14082 10.0164 8.0127 8.75586L8 8.5V4.5C8 3.11929 9.11929 2 10.5 2C11.8807 2 13 3.11929 13 4.5V8.5L12.9873 8.75586C12.8592 10.0164 11.7943 11 10.5 11V9C10.7761 9 11 8.77614 11 8.5Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M23 4.5C23 3.11929 24.1193 2 25.5 2V2C26.8807 2 28 3.11929 28 4.5V8.5C28 9.88071 26.8807 11 25.5 11V11C24.1193 11 23 9.88071 23 8.5V4.5Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"}  group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M26 8.5V4.5C26 4.22386 25.7761 4 25.5 4C25.2239 4 25 4.22386 25 4.5V8.5C25 8.77614 25.2239 9 25.5 9V11C24.2057 11 23.1408 10.0164 23.0127 8.75586L23 8.5V4.5C23 3.11929 24.1193 2 25.5 2C26.8807 2 28 3.11929 28 4.5V8.5L27.9873 8.75586C27.8592 10.0164 26.7943 11 25.5 11V9C25.7761 9 26 8.77614 26 8.5Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M26 8.5V4.5C26 4.22386 25.7761 4 25.5 4C25.2239 4 25 4.22386 25 4.5V8.5C25 8.77614 25.2239 9 25.5 9V11C24.2057 11 23.1408 10.0164 23.0127 8.75586L23 8.5V4.5C23 3.11929 24.1193 2 25.5 2C26.8807 2 28 3.11929 28 4.5V8.5L27.9873 8.75586C27.8592 10.0164 26.7943 11 25.5 11V9C25.7761 9 26 8.77614 26 8.5Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M15.858 18.2727V27H13.4886V20.4545H13.4375L11.5284 21.5966V19.5852L13.6761 18.2727H15.858ZM17.6499 27V25.2955L20.9055 22.6023C21.1214 22.4233 21.3061 22.2557 21.4595 22.0994C21.6158 21.9403 21.7351 21.777 21.8175 21.6094C21.9027 21.4418 21.9453 21.2557 21.9453 21.0511C21.9453 20.8267 21.897 20.6349 21.8004 20.4759C21.7067 20.3168 21.576 20.1946 21.4084 20.1094C21.2408 20.0213 21.0476 19.9773 20.8288 19.9773C20.6101 19.9773 20.4169 20.0213 20.2493 20.1094C20.0845 20.1974 19.9567 20.3267 19.8658 20.4972C19.7749 20.6676 19.7294 20.875 19.7294 21.1193H17.4794C17.4794 20.5057 17.6172 19.9773 17.8928 19.5341C18.1683 19.0909 18.5575 18.75 19.0604 18.5114C19.5632 18.2727 20.1527 18.1534 20.8288 18.1534C21.5277 18.1534 22.1328 18.2656 22.6442 18.4901C23.1584 18.7116 23.5547 19.0241 23.8331 19.4276C24.1143 19.831 24.255 20.304 24.255 20.8466C24.255 21.1818 24.1854 21.5156 24.0462 21.848C23.907 22.1776 23.657 22.5426 23.2962 22.9432C22.9354 23.3438 22.4226 23.821 21.7578 24.375L20.9396 25.0568V25.108H24.3487V27H17.6499Z"
				className="fill-black dark:fill-white"
			/>
		</svg>
	);
};

export default CalendarSVG;
