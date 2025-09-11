import Image from "next/image";
import AddDocumentSVG from "../SVGs/AddDocumentSVG";
import { FileInputDataType, InputType } from "../../../.next/types/forms";
import { Button } from "../Button/Button";

interface Props {
	input: InputType;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	preview?: string;
	setFile: React.Dispatch<React.SetStateAction<FileInputDataType>>;
}

export default function FileInput({
	input,
	onChange,
	preview,
	setFile,
}: Props) {
	const onClick = () => {
		setFile((prev) => ({ ...prev, file: null, preview: null }));
	};

	return (
		<div>
			{!preview ? (
				<label
					htmlFor={"fileInput"}
					className={"flex flex-col gap-2 border-2 border-dashed p-10"}
				>
					<input
						id={"fileInput"}
						className={"hidden"}
						type={input.type}
						accept={input.accept ?? ""}
						onChange={onChange}
					/>
					<div className={"mx-auto flex flex-col gap-2 justify-center items-center"}>
						<AddDocumentSVG
							height={"40px"}
							width={"40px"}
						/>
						<p>Add picture</p>
					</div>
				</label>
			) : (
				<div
					className={
						"flex flex-col gap-2 border-2 border-dashed justify-center items-center p-10 relative"
					}
				>
					<p>Your image</p>
					<Image
						width={100}
						height={100}
						className={"object-cover rounded"}
						src={preview}
						alt={"Preview of your image"}
					/>

					<Button
						onClick={onClick}
						type={"button"}
					>
						Remove
					</Button>
				</div>
			)}
		</div>
	);
}
