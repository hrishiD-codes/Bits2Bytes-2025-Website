/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: false,
	},
	async headers() {
		return [
			{
				source: "/_next/static/(.*)",
				headers: [
					{ key: "Cache-Control", value: "public, max-age=31536000, immutable" },
					{ key: "CDN-Cache-Control", value: "public, max-age=31536000, immutable" },
				],
			},
			{
				source: "/_next/image(.*)",
				headers: [
					{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
					{ key: "CDN-Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
				],
			},
			{
				source: "/:all*(js|css|png|jpg|jpeg|gif|svg|webp|avif|ico|mp4|pdf|ttf|otf|woff|woff2)",
				headers: [
					{ key: "Cache-Control", value: "public, max-age=31536000, immutable" },
					{ key: "CDN-Cache-Control", value: "public, max-age=31536000, immutable" },
				],
			},
			{
				source: "/(.*)",
				headers: [
					{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
					{ key: "CDN-Cache-Control", value: "public, max-age=0, must-revalidate" },
				],
			},
		];
	},
};

module.exports = nextConfig;
