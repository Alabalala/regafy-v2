import LogoSVG from "../SVGs/LogoSVG";

const Regafy = ({}) => {
	return (
		<div className={"flex gap-1 items-center"}>
			<p className={"font-bold text-xl"}>REG</p>
			<div>
				<LogoSVG />
			</div>
			<p className={"font-bold text-xl"}>FY</p>
		</div>
	);
};

export default Regafy;
