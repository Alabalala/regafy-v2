import { useEffect, useState } from "react";
import MoreVerticalSVG from "../SVGs/MoreVerticalSVG";

export const ContextMenu = () => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="w-fit">
			<div
				className="cursor-pointer"
				onClick={() => setOpen(!isOpen)}
			>
				<MoreVerticalSVG></MoreVerticalSVG>
			</div>

			{isOpen && (
				<div className="absolute bg-secondary p-4 border-2 rounded-lg flex flex-col gap-3">
					<p>Option 1</p>
					<p>Option 2</p>
					<p>Option 3</p>
				</div>
			)}
		</div>
	);
};
