import { useEffect, useState } from "react";

export default function useTheme() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const preferredTheme = localStorage.getItem("theme");
		if (preferredTheme) {
			setTheme(preferredTheme);
		}
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		localStorage.setItem("theme", theme);
		const html = document.documentElement;
		if (theme === "light") {
			html.classList.remove("dark");
		} else {
			html.classList.add("dark");
		}
	}, [theme]);

	return {
		theme,
		toggleTheme,
	};
}
