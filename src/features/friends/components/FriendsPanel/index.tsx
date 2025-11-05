"use client";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import LoadingComponent from "@/shared/components/loadingModule";
import { createClient } from "@/shared/services/supabase/client";
import { useState } from "react";
import { FIND_PEOPLE_FORM_INPUTS } from "../../constants/form";
import useSearchFriends from "../../hooks/useSearchFriends";
import FriendsList from "../friendsList";
import { Event } from "@/shared/types/supabase/supabase";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

interface Props {
	friends: Profile[];
	type: "event" | "link" | "request";
	event?: Event;
	onClick?: (guest: Profile) => void;
	guests?: Profile[];
}

const FriendsPanel = ({
	friends,
	type = "link",
	event,
	onClick,
	guests,
}: Props) => {
	const { register, watch, setValue } = useForm({
		defaultValues: { query: "" },
	});
	const query = watch("query");
	const supabase = createClient();
	const { searchResults, error, errorMessage, loading } = useSearchFriends({
		query,
		type,
		friends,
		supabase,
	});
	const t = useTranslations("friends");
	console.log(query);
	return (
		<div className="flex flex-col gap-5">
			<div className={"flex flex-col gap-5"}>
				<h1 className="text-xl font-bold">
					{event ? t("inviteFriends") : t("findFriends")}
				</h1>
				<div>
					<div className="flex flex-row relative">
						<Input
							currentValue={query}
							placeholder={t(FIND_PEOPLE_FORM_INPUTS[0].placeholderKey)}
							error={error}
							{...register("query")}
							input={FIND_PEOPLE_FORM_INPUTS[0]}
						></Input>
						<div
							className={`absolute right-10 top-2 transition-opacity duration-75 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
						>
							<LoadingComponent
								small
								onlySpinner
							></LoadingComponent>
						</div>
						<div className="absolute right-2 top-2">
							<Button
								isPlain
								onClick={() => setValue("query", "")}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="#000000"
								>
									<path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
								</svg>
							</Button>
						</div>
					</div>
				</div>
				{error && <p className="text-red-500">{errorMessage}</p>}
			</div>
			<div className={"flex flex-col gap-5"}>
				<h1 className="text-xl font-bold">
					{type === "event" && !query && !searchResults
						? t("suggestedFriends")
						: searchResults && searchResults.length > 0
							? t("results")
							: t("friends")}
				</h1>

				<FriendsList
					guests={guests}
					isSearching={loading}
					searchResults={searchResults}
					friends={friends}
					event={event}
					type={type}
					onClick={onClick}
				></FriendsList>
			</div>
		</div>
	);
};

export default FriendsPanel;
