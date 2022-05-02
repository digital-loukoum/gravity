export function getAllowedOrigin(
	origin: string | null | undefined,
	allowedOrigins: string[] | null | undefined,
): string | undefined {
	return origin && allowedOrigins?.includes(origin) ? origin : undefined;
}
