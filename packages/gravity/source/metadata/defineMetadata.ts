import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";
import { propertiesStore, servicesStore } from "./metadataStores.js";

export const defineMetadata = <Values = unknown>() => {
	return {
		setMetadata: ({
			service,
			property,
			key,
			value,
		}: {
			key: symbol;
			service: BaseServiceConstructor;
			property?: string;
			value: Values;
		}) => {
			if (property == null) {
				let store = servicesStore.get(service);
				if (!store) servicesStore.set(service, (store = {}));
				store[key] = value;
			} else {
				let rootStore = propertiesStore.get(service);
				if (!rootStore) propertiesStore.set(service, (rootStore = new Map()));
				let store = rootStore.get(property);
				if (!store) rootStore.set(property, (store = {}));
				store[key] = value;
			}
		},
		getMetadata: ({
			service,
			property,
			key,
		}: {
			key: symbol;
			service: BaseServiceConstructor;
			property?: string;
		}): Values | undefined => {
			if (property == null) {
				const store = servicesStore.get(service);
				return store?.[key] as any;
			} else {
				const rootStore = propertiesStore.get(service);
				if (!rootStore) return undefined;
				const store = rootStore.get(property);
				return store?.[key] as any;
			}
		},
	};
};
