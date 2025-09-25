import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "eunexxzwglmvabkegiiy.supabase.co",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
