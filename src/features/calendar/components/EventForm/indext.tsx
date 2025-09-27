"use client";

interface Props {
	event?: Event;
}

const GiftForm = ({ event }: Props) => {
	return (
		<form className={"flex flex-col gap-4"}>
			{GIFT_FORM_FIELDS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					{input.type === "file" ? (
						<FileInput
							setFile={setFile}
							onChange={onChange}
							input={input}
							preview={file.preview ?? ""}
							error={!!errors[input.name]?.length}
						></FileInput>
					) : (
						<Input
							onChange={onChange}
							input={input}
							value={formData[input.name as keyof GiftFormData]}
							error={!!errors[input.name]?.length}
						/>
					)}
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}

			{!friendId && (
				<div className={"flex flex-col gap-2"}>
					<p className={"font-bold"}>Rate how much you want this gift</p>
					<StarRateInput
						rating={rating}
						setRating={setRating}
					/>
				</div>
			)}
			<div className={"flex justify-center"}>
				<Button
					onClick={onSubmit}
					disabled={isLoading}
					loading={isLoading}
					loadingText={"Saving..."}
				>
					Save gift
				</Button>
			</div>
			{formError && <div className="text-red-500 text-sm">{formError}</div>}
		</form>
	);
};

export default GiftForm;
