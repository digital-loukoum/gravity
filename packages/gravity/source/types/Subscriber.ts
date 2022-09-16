import type { Unsubscriber } from "./Unsubscriber.js";

export type Subscriber<IdentifierStore> = (
	store: IdentifierStore,
	onChange: (newValue: unknown) => void,
) => Unsubscriber;
