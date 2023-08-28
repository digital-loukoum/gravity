export function getAllowedOrigin(
	origin: string | null | undefined,
	allowedOrigins: string[] | null | undefined,
): string | undefined {
	return origin &&
		allowedOrigins?.some((allowed) => allowed == "*" || allowed == origin)
		? origin
		: undefined;
}
