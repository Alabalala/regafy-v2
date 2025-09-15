interface Props {
	className?: string;
	filled?: boolean;
}

const FriendsSVG = ({ className, filled = false }: Props) => {
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
					"M14.8359 31.0906C12.2203 20.628 19.0396 17.0782 23.7105 17.0782C28.3813 17.0782 36.2458 20.628 33.3922 31.0906H29.7825H18.5726H14.8359Z"
				}
				className={`${filled ? "fill-background dark:fill-background-dark" : "fill-none"} group-hover:fill-background-50 group-hover:dark:fill-background-dark-50 group-active:fill-background-100 group-active:dark:fill-background-dark-100`}
			/>
			<path
				d={
					"M14.8359 31.0906L13.8658 31.3332L14.0552 32.0906H14.8359V31.0906ZM33.3922 31.0906V32.0906H34.156L34.357 31.3537L33.3922 31.0906ZM30.7825 25.4857V24.4857H28.7825V25.4857H29.7825H30.7825ZM23.7105 17.0782V16.0782C21.1582 16.0782 17.9875 17.0412 15.7951 19.4946C13.5616 21.9941 12.4982 25.8626 13.8658 31.3332L14.8359 31.0906L15.8061 30.8481C14.5581 25.856 15.5965 22.7184 17.2864 20.8273C19.0175 18.8901 21.5919 18.0782 23.7105 18.0782V17.0782ZM23.7105 17.0782V18.0782C25.8418 18.0782 28.6992 18.8996 30.6656 20.8677C32.5669 22.7708 33.7751 25.8864 32.4275 30.8275L33.3922 31.0906L34.357 31.3537C35.8629 25.8322 34.5656 21.9416 32.0804 19.4542C29.6602 17.0318 26.2499 16.0782 23.7105 16.0782V17.0782ZM14.8359 31.0906V32.0906H18.5726V31.0906V30.0906H14.8359V31.0906ZM18.5726 31.0906H19.5726V25.4857H18.5726H17.5726V31.0906H18.5726ZM18.5726 31.0906V32.0906H29.7825V31.0906V30.0906H18.5726V31.0906ZM29.7825 31.0906V32.0906H33.3922V31.0906V30.0906H29.7825V31.0906ZM29.7825 31.0906H30.7825V25.4857H29.7825H28.7825V31.0906H29.7825Z"
				}
				fill={"black"}
			/>
			<circle
				cx={"24.1775"}
				cy={"11.0062"}
				r={"6.00619"}
				className={`${filled ? "fill-background dark:fill-background-dark" : "fill-none"} group-hover:fill-background-50 group-hover:dark:fill-background-dark-50 group-active:fill-background-100 group-active:dark:fill-background-dark-100`}
				stroke={"black"}
				strokeWidth={"2"}
			/>
			<path
				d={
					"M2.57948 31.0906C-0.0361679 20.628 6.78317 17.0782 11.454 17.0782C16.1248 17.0782 23.9893 20.628 21.1358 31.0906H17.526H6.3161H2.57948Z"
				}
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
			/>
			<path
				d={
					"M2.57948 31.0906L1.60933 31.3332L1.7987 32.0906H2.57948V31.0906ZM21.1358 31.0906V32.0906H21.8995L22.1005 31.3537L21.1358 31.0906ZM18.526 25.4857V24.4857H16.526V25.4857H17.526H18.526ZM11.454 17.0782V16.0782C8.90171 16.0782 5.73105 17.0412 3.53865 19.4946C1.30512 21.9941 0.241703 25.8626 1.60933 31.3332L2.57948 31.0906L3.54962 30.8481C2.30161 25.856 3.34004 22.7184 5.02997 20.8273C6.76104 18.8901 9.33546 18.0782 11.454 18.0782V17.0782ZM11.454 17.0782V18.0782C13.5854 18.0782 16.4427 18.8996 18.4091 20.8677C20.3104 22.7708 21.5186 25.8864 20.171 30.8275L21.1358 31.0906L22.1005 31.3537C23.6065 25.8322 22.3092 21.9416 19.8239 19.4542C17.4038 17.0318 13.9934 16.0782 11.454 16.0782V17.0782ZM2.57948 31.0906V32.0906H6.3161V31.0906V30.0906H2.57948V31.0906ZM6.3161 31.0906H7.3161V25.4857H6.3161H5.3161V31.0906H6.3161ZM6.3161 31.0906V32.0906H17.526V31.0906V30.0906H6.3161V31.0906ZM17.526 31.0906V32.0906H21.1358V31.0906V30.0906H17.526V31.0906ZM17.526 31.0906H18.526V25.4857H17.526H16.526V31.0906H17.526Z"
				}
				fill={"black"}
			/>
			<circle
				cx={"11.921"}
				cy={"11.0062"}
				r={"6.00619"}
				className={`${filled ? "fill-accent dark:fill-accent-dark" : "fill-none"} group-hover:fill-accent-50 group-hover:dark:fill-accent-dark-50 group-active:fill-accent-100 group-active:dark:fill-accent-dark-100`}
				stroke={"black"}
				strokeWidth={"2"}
			/>
		</svg>
	);
};

export default FriendsSVG;
