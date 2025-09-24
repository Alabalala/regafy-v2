"use client";
import { useUser } from "@/features/auth/hooks/useUser";
import { getFriendsIds } from "@/features/friends/services/supabase";
import GiftList from "@/features/gifts/components/GiftList";
import { useChangeReserve } from "@/features/gifts/hooks/useChangeReserve";
import LoadingComponent from "@/shared/components/loadingModule";
import { createClient } from "@/shared/services/supabase/client";
import { Gift } from "@/shared/types/supabase/supabase";
import { useEffect, useRef, useState } from "react";
import { getFeed } from "../../services/supabase";

const Feed = () => {
	const [feed, setFeed] = useState<Gift[]>([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const supabase = createClient();
	const [user] = useUser();
	const { changeReserve } = useChangeReserve(feed, setFeed);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const loadMore = async () => {
		if (!user || loading || !hasMore) return;
		setLoading(true);
		const friends = await getFriendsIds(user.id, supabase);
		const gifts = await getFeed(user.id, friends, page, 10, supabase);
		setFeed((prev) => [...prev, ...gifts]);
		setHasMore(gifts.length === 10);
		setPage((prev) => prev + 1);
		setLoading(false);
	};

	useEffect(() => {
		const loadInitial = async () => {
			if (!user) return;
			setLoading(true);
			const friends = await getFriendsIds(user.id, supabase);
			const gifts = await getFeed(user.id, friends, 0, 10, supabase);
			setFeed(gifts);
			setHasMore(gifts.length === 10);
			setPage(1);
			setLoading(false);
		};
		loadInitial();
	}, [user]);

	useEffect(() => {
		if (!loadMoreRef.current) return;

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore && !loading) {
				loadMore();
			}
		});

		observer.observe(loadMoreRef.current);

		return () => {
			if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
		};
	}, [hasMore, loading]);

	return (
		<div className="flex min-h-screen flex-col">
			<h1 className="text-xl font-bold">Feed</h1>
			<GiftList
				loadMoreRef={loadMoreRef}
				gifts={feed}
				changeReserve={changeReserve}
			/>
			{loading && <LoadingComponent />}
		</div>
	);
};

export default Feed;
