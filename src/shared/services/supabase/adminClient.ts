// lib/supabase-admin.ts (or wherever you keep your supabase utils)
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
}
