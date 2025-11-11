import { messageBoxVariants } from "@/shared/styles/messageBoxVariants";

interface Props {
	children: React.ReactNode;
	type: "error" | "success" | "warning";
	size?: "default" | "small" | "bold";
}

const MessageBox = ({ children, type, size }: Props) => {
	return (
		<div className={messageBoxVariants({ variant: type, size })}>{children}</div>
	);
};

export default MessageBox;
