import { tv } from "tailwind-variants";

export type PlainButtonVariant = "primary" | "secondary" | "delete";

export const plainButtonVariants = tv({
	base: "cursor-pointer transition-colors flex items-center justify-center",
	variants: {
		variant: {
			primary: "text-black hover:text-gray-700 active:text-gray-500",
			secondary: "text-black hover:text-gray-600 active:text-gray-400",
			accent: "text-accent hover:text-accent-50 active:text-accent-100",
			delete: "text-red-600 hover:text-red-700 active:text-red-800",
		},
		size: {
			default: "text-base px-2 py-1",
			small: "text-sm px-1 py-0.5",
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
