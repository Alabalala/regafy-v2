import { deleteEvent } from "@/features/calendar/services/supabase";
import { createClient } from "@/shared/services/supabase/server";
import { NextRequest } from "next/server";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	console.log("working");
	try {
		const { id } = await params;

		if (!id) {
			return Response.json({ message: "Missing id" }, { status: 400 });
		}

		const supabase = await createClient();
		await deleteEvent(id, supabase);
		return Response.json({ message: "Event deleted" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return Response.json({ message: "Error deleting event" }, { status: 500 });
	}
}
