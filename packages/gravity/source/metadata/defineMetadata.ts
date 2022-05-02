import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import { propertiesStore, servicesStore } from "./metadataStores.js";

export const defineMetadata = <Metadata extends Record<never, any>>() => {
	return {
		setMetadata: <Key extends keyof Metadata>({
			service,
			property,
			key,
			value,
		}: {
			key: Key;
			service: BaseServiceConstructor;
			property?: string;
			value: Metadata[Key];
		}) => {
			if (property == null) {
				let store = servicesStore.get(service);
				if (!store) servicesStore.set(service, (store = {}));
				store[String(key)] = value;
			} else {
				let rootStore = propertiesStore.get(service);
				if (!rootStore) propertiesStore.set(service, (rootStore = new Map()));
				let store = rootStore.get(property);
				if (!store) rootStore.set(property, (store = {}));
				store[String(key)] = value;
			}
		},
		getMetadata: <Key extends keyof Metadata>({
			service,
			property,
			key,
		}: {
			key: Key;
			service: BaseServiceConstructor;
			property?: string;
		}): Metadata[Key] | undefined => {
			if (property == null) {
				const store = servicesStore.get(service);
				return store?.[String(key)] as any;
			} else {
				const rootStore = propertiesStore.get(service);
				if (!rootStore) return undefined;
				const store = rootStore.get(property);
				return store?.[String(key)] as any;
			}
		},
	};
};
