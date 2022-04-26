import { useState, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";

type Store = {
	value: number;
};

export const getStore = (key: string) => {
	const cache = useMemo(
		() => new Map<string, [Store, Dispatch<SetStateAction<Store>>]>(),
		undefined,
	);
	let cached = cache.get(key);
	if (!cached) cache.set(key, (cached = useState<Store>({ value: 12 })));
	return cached;
};
