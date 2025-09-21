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
				d="M19.5039 9.76319C20.5074 6.75808 23.4046 0.268475 27 4.26335C30.5988 8.26207 23.5046 9.59583 19.5039 9.76319Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M24.3359 2.02148C25.5579 1.8773 26.7106 2.44748 27.7432 3.59472C28.749 4.71237 29.2408 5.90985 28.8613 7.09179C28.5085 8.1906 27.5079 8.89566 26.5264 9.35546C24.5184 10.2959 21.582 10.6775 19.5459 10.7627C19.5446 10.7627 19.5431 10.7626 19.542 10.7627L19.5 9.77441L18.5518 9.45898C18.5531 9.45496 18.5543 9.45031 18.5557 9.44628C19.0651 7.92098 20.0897 5.38844 21.5244 3.73339C22.2394 2.90865 23.1791 2.15801 24.3359 2.02148ZM24.5703 4.00781C24.1414 4.05843 23.6194 4.36903 23.0352 5.04296C22.2083 5.99684 21.5034 7.39219 20.9863 8.65038C22.6388 8.47746 24.4368 8.1261 25.6777 7.54492C26.5196 7.1506 26.8668 6.76136 26.957 6.48046C27.0206 6.28252 27.0501 5.81414 26.2568 4.93261C25.4917 4.0825 24.9341 3.9649 24.5703 4.00781Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M16 10.2634C15.0575 7.25849 12.3242 0.74792 8.93115 4.75443C5.5381 8.76095 12.2299 10.0964 16 10.2634Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M11.459 2.51003C10.2519 2.35857 9.13938 2.96075 8.16797 4.10768C7.21326 5.23501 6.76822 6.41808 7.11719 7.57155C7.44697 8.66149 8.39101 9.37497 9.33398 9.84401C11.2452 10.7946 14.0316 11.1768 15.9561 11.262L17.3809 11.3255L16.9541 9.96413C16.4766 8.44185 15.5121 5.9063 14.1592 4.24733C13.4894 3.42618 12.5896 2.65195 11.459 2.51003ZM11.21 4.4944C11.5754 4.54027 12.0539 4.83082 12.6094 5.51198C13.3923 6.47203 14.0599 7.87846 14.5479 9.14382C13.0165 8.96907 11.3654 8.62044 10.2246 8.053C9.4478 7.66657 9.11973 7.28483 9.03125 6.99245C8.96198 6.76348 8.95252 6.27658 9.69434 5.40065C10.4193 4.54468 10.9209 4.45815 11.21 4.4944Z"
				className="fill-black dark:fill-white"
			/>
			<path
				d="M20 8C20 9.10457 19.1046 10 18 10C16.8954 10 16 9.10457 16 8C16 6.89543 16.8954 6 18 6C19.1046 6 20 6.89543 20 8Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M20 8C20 6.89543 19.1046 6 18 6C16.8954 6 16 6.89543 16 8C16 9.10457 16.8954 10 18 10C19.1046 10 20 9.10457 20 8ZM21 8C21 9.65685 19.6569 11 18 11C16.3431 11 15 9.65685 15 8C15 6.34315 16.3431 5 18 5C19.6569 5 21 6.34315 21 8Z"
				className="fill-black dark:fill-white"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14 16H8C6.34315 16 5 17.3431 5 19V29.1765C5 30.7359 6.34315 32 8 32H14V16ZM21 16V32H28C29.6569 32 31 30.7359 31 29.1765V19C31 17.3431 29.6569 16 28 16H21Z"
				className={`${filled ? "fill-tertiary dark:fill-tertiary-dark" : "fill-none"} group-hover:fill-tertiary-50 group-hover:dark:fill-tertiary-dark-50 group-active:fill-tertiary-100 group-active:dark:fill-accent-dark-100 `}
			/>
			<path
				d="M21 16H14V32H21V16Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M30 19C30 17.8954 29.1046 17 28 17H22V31H28C29.1624 31 29.9998 30.1275 30 29.1768V19ZM15 31H20V17H15V31ZM6 29.1768C6.00017 30.1275 6.83757 31 8 31H13V17H8C6.89543 17 6 17.8954 6 19V29.1768ZM32 29.1768C31.9998 31.3445 30.1511 33 28 33H8C5.84893 33 4.00016 31.3445 4 29.1768V19C4 16.7909 5.79086 15 8 15H28C30.2091 15 32 16.7909 32 19V29.1768Z"
				className="fill-black dark:fill-white"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M14 9.26337H5C3.89543 9.26337 3 10.1588 3 11.2634V15.2634C3 16.3679 3.89543 17.2634 5 17.2634H14V9.26337ZM21 17.2634H31C32.1046 17.2634 33 16.3679 33 15.2634V11.2634C33 10.1588 32.1046 9.26337 31 9.26337H21V17.2634Z"
				className={`${filled ? "fill-tertiary dark:fill-tertiary-dark" : "fill-none"} group-hover:fill-tertiary-50 group-hover:dark:fill-tertiary-dark-50 group-active:fill-tertiary-100 group-active:dark:fill-accent-dark-100 `}
			/>
			<path
				d="M14 9.26337V17.2634H21V9.26337H14Z"
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d="M31 11.2634H22V15.2634H31V17.2634H5V15.2634H13V11.2634H5V17.2634C3.89543 17.2634 3 16.3679 3 15.2634V11.2634C3 10.1588 3.89543 9.26337 5 9.26337H31C32.1046 9.26337 33 10.1588 33 11.2634V15.2634C33 16.3679 32.1046 17.2634 31 17.2634V11.2634ZM15 15.2634H20V11.2634H15V15.2634Z"
				className="fill-black dark:fill-white"
			/>
		</svg>
	);
};

export default GiftSVG;
