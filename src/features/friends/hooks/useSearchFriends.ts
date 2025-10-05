import { Profile } from "@/features/profile/types/supabase.types";
import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { searchProfilesByUsername } from "../services/supabase";
import { useDebounce } from "./useDebounce";

interface Props {
	query: string;
	type: "event" | "link" | "request";
	friends: Profile[];
	supabase: SupabaseClient<Database>;
}

export default function useSearchFriends({
	query,
	type,
	friends,
	supabase,
}: Props) {
	const [searchResults, setSearchResults] = useState<Profile[] | null>(null);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const debouncedValue = useDebounce(query, 500);

	useEffect(() => {
		if (!query) {
			setSearchResults(null);
			setLoading(false);
			return;
		}

		if (type === "event") {
			const foundFriends = friends
				.filter(
					(friend) =>
						friend.userName.toLowerCase().includes(query.toLowerCase()) ||
						friend.name.toLowerCase().includes(query.toLowerCase()),
				)
				.sort((a, b) => a.userName.localeCompare(b.userName))
				.slice(0, 10);

			setSearchResults(foundFriends);
			setLoading(false);
			return;
		}

		if (query !== debouncedValue) {
			setLoading(true);
			return;
		}

		const fetchResults = async () => {
			setLoading(true);

			try {
				const results = await searchProfilesByUsername(debouncedValue, supabase);
				setSearchResults(results ?? []);
				setError(false);
				setErrorMessage("");
			} catch (err) {
				setError(true);
				setErrorMessage("Error searching for friends");
				setSearchResults([]);
			} finally {
				setLoading(false);
			}
		};

		fetchResults();
	}, [query, debouncedValue, type, friends, supabase]);

	return { searchResults, error, errorMessage, loading };
}
