import FriendsList from "@/features/friends/components/friendsList";

const FriendsPage = () => {
	return (
		<div className={"flex flex-col gap-5"}>
			<h1 className="text-xl font-bold">Friends</h1>
			<FriendsList></FriendsList>
		</div>
	);
};

export default FriendsPage;
