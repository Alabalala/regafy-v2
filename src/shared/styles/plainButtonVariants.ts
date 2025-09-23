import { tv } from "tailwind-variants";

export type PlainButtonVariant = "primary" | "secondary" | "delete";

export const plainButtonVariants = tv({
	base: "cursor-pointer transition-colors flex items-center justify-center",
	variants: {
		variant: {
			primary:
				"text-black hover:text-gray-700 active:text-gray-500 dark:text-white dark:hover:text-gray-300 dark:active:text-gray-200",
			secondary: "text-black hover:text-gray-600 active:text-gray-400",
			accent:
				"text-accent hover:text-accent-50 active:text-accent-100 dark:text-accent-dark dark:hover:text-accent-dark-50 dark:active:text-accent-dark-100",
			delete:
				"text-red-600 hover:text-red-700 active:text-red-800 dark:text-red-500 dark:hover:text-red-600 dark:active:text-red-700",
		},
		size: {
			default: "text-base",
			small: "text-sm",
			icon: "w-6 h-6 p-0",
		},
		isGroup: {
			true: "group",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});
