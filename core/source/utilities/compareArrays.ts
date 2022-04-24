type ArrayLike = {
	length: number;
	[key: number]: unknown;
};

export function compareArrays(
	a: ArrayLike | null,
	b: ArrayLike | null,
): boolean {
	if (!a) return !b;
	if (!b) return !a;

	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}

	return true;
}
