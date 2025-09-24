import LoadingSVG from "../SVGs/LoadingSVG";

const LoadingComponent = () => {
	return (
		<div className="flex flex-col justify-center gap-3 items-center mt-5">
			<LoadingSVG
				isModule
				className="animate-spin h-8 w-8 "
			></LoadingSVG>
			<p>Loading</p>
		</div>
	);
};

export default LoadingComponent;
