export function getOptimizedImageUrl(
	publicUrl: string,
	width = 400,
	quality = 70,
	format: "webp" | "jpg" = "webp",
) {
	return `${publicUrl}?width=${width}&quality=${quality}&format=${format}`;
}
