import LoadingSVG from "../SVGs/LoadingSVG";

interface Props {
	onlySpinner?: boolean;
	small?: boolean;
}

const LoadingComponent = ({ onlySpinner = false, small = false }: Props) => {
	return (
		<div
			className={`flex flex-col justify-center gap-3 items-center ${!onlySpinner && "mt-5"}`}
		>
			<LoadingSVG
				isModule
				className={`animate-spin ${small ? "w-6 h-6" : "w-8 h-8"}`}
			></LoadingSVG>
			{!onlySpinner && <p>Loading</p>}
		</div>
	);
};

export default LoadingComponent;
