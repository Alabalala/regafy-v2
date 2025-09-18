import useTheme from "@/shared/hooks/useTheme";
import SunSVG from "../SVGs/SunSVG";
import MoonSVG from "../SVGs/MoonSVG";

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="flex gap-2 items-center">
			<SunSVG
				filled={theme === "light"}
				className="w-8 h-8"
			/>
			<div className="w-16 bg-background dark:bg-background-dark rounded p-0.5 border-2 flex items-center ">
				<button
					onClick={toggleTheme}
					className={`bg-accent dark:bg-accent-dark w-8 h-8 border-2 rounded transition-transform ${theme === "dark" ? "translate-x-6" : ""}`}
				></button>
			</div>
			<MoonSVG
				filled={theme === "dark"}
				className="w-8 h-8"
			/>
		</div>
	);
};
