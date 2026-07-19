import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "blexbnirlfleeeroxhah.supabase.co",
				pathname: "/storage/v1/object/public/**",
			},
			{ protocol: "https", hostname: "i.pravatar.cc" },
			{ protocol: "https", hostname: "picsum.photos" },
			{ protocol: "https", hostname: "fastly.picsum.photos" },
		],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
