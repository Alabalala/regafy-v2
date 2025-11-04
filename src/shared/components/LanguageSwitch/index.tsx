import { usePathname, useRouter } from "@/i18n/routing";
import { LANGUAGES } from "@/shared/constants/languages";
import { useLocale } from "next-intl";
import { useState } from "react";
import LanguageSVG from "../SVGs/LanguageSVG";

export default function LanguageSwitch({}) {
	const locale = useLocale(); // Gets current locale
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const handleLanguageChange = (code: string) => {
		router.push(pathname, { locale: code });
		setIsOpen(false);
	};

	return (
		<div className="flex flex-col gap-5 justify-center items-center">
			<div className="flex flex-row gap-2 justify-center items-center">
				<LanguageSVG filled></LanguageSVG>
				<div className="relative">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex justify-between select-none cursor-pointer bg-background dark:bg-background-dark p-2 border-2 text-center w-32"
					>
						<p>{LANGUAGES.find((l) => l.code === locale)?.name}</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							className="fill-black dark:fill-white"
						>
							<path d="M480-360 280-560h400L480-360Z" />
						</svg>
					</button>
					<div className="absolute top-12 ">
						{isOpen &&
							LANGUAGES.map((language) => {
								return (
									<div key={language.code}>
										<button
											className="w-32 text-left bg-background dark:bg-background-dark p-2 cursor-pointer hover:bg-background-50 dark:hover:bg-background-dark-50"
											onClick={() => {
												handleLanguageChange(language.code);
											}}
										>
											{language.name}
										</button>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
