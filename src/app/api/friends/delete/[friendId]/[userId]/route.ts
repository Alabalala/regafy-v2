import { deleteFriend } from "@/features/profile/services/supabase";
import { createClient } from "@/shared/services/supabase/server";

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ userId: string; friendId: string }> },
) {
	if (!params) {
		return Response.json({ message: "Missing params" }, { status: 400 });
	}

	try {
		const { userId, friendId } = await params;
		const supabase = await createClient();
		const res = await deleteFriend(userId, friendId, supabase);
		return Response.json({ message: "Friend deleted" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ message: "Error deleting friend" }, { status: 500 });
	}
}
