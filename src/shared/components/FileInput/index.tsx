import Image from "next/image";
import AddDocumentSVG from "../SVGs/AddDocumentSVG";

import { Button } from "../Button";
import { FileInputDataType, InputType } from "@/shared/types/forms";
import { useTranslations } from "next-intl";

interface Props {
	input: InputType;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	preview?: string;
	setFile: React.Dispatch<React.SetStateAction<FileInputDataType>>;
	error?: boolean;
}

export default function FileInput({
	input,
	onChange,
	preview,
	setFile,
	error = false,
}: Props) {
	const onClick = () => {
		setFile((prev) => ({ ...prev, file: null, preview: null }));
	};
	const tButtons = useTranslations("buttons");
	const tErrors = useTranslations("errors");
	const tImages = useTranslations("images");

	return (
		<div>
			{!preview ? (
				<label
					htmlFor={"fileInput"}
					className={`flex flex-col gap-2 border-2 border-dashed p-10 cursor-pointer`}
				>
					<input
						id={"fileInput"}
						className={"hidden"}
						type={input.type}
						accept={input.accept ?? ""}
						onChange={onChange}
						name={input.name}
					/>
					<div className={"mx-auto flex flex-col gap-2 justify-center items-center"}>
						<AddDocumentSVG
							height={"40px"}
							width={"40px"}
						/>
						<p>{tButtons("addImage")}</p>
					</div>
				</label>
			) : (
				<div
					className={`flex flex-col gap-2 border-2 border-dashed justify-center items-center p-10 relative ${error && "border-red-600"}`}
				>
					{error ? (
						<p className="text-red-600">{tErrors("wrongFileType")}</p>
					) : (
						<p>{tImages("yourImage")}</p>
					)}
					{!error && (
						<Image
							width={100}
							height={100}
							className={"object-cover rounded"}
							src={preview}
							alt={"Preview of your image"}
						/>
					)}

					<Button
						onClick={onClick}
						type={"button"}
					>
						{tButtons("deleteImage")}
					</Button>
				</div>
			)}
		</div>
	);
}
