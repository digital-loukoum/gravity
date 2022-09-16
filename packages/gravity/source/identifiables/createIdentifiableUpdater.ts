import { defaultIdentifier } from "./defaultIdentifier.js";
import type { Identify } from "./Identify.js";

export type IdentifiableUpdater = (responseData: unknown) => void;

export function createIdentifiableUpdater({
	identify,
	setIdentifiable,
}: {
	identify: Identify | undefined | boolean;
	setIdentifiable: ((uniqueKey: string, value: unknown) => void) | undefined;
}): IdentifiableUpdater {
	const updateIdentifiables: IdentifiableUpdater = (responseData) => {
		if (!identify) return;
		if (!setIdentifiable) {
			console.warn(
				`[Gravity] Identifiables only work with compatible front-end frameworks.`,
			);
			return;
		}
		if (
			Array.isArray(responseData) ||
			responseData instanceof Map ||
			responseData instanceof Set
		) {
			responseData.forEach(updateIdentifiables);
		} else {
			// the default identifier check if responseData has an "id" string property
			if (identify === true) {
				identify = defaultIdentifier;
			}

			const key = identify(responseData);
			if (key !== undefined) {
				setIdentifiable(key, responseData);
			}
		}
	};

	return updateIdentifiables;
}
