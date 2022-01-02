import { BaseServiceConstructor } from "../services/BaseService";
import { operationsStore, servicesStore } from "./metadataStores";

export const defineMetadata = <Metadata extends Record<never, any>>() => {
	return {
		setMetadata: <Key extends keyof Metadata>({
			service,
			operation,
			key,
			value,
		}: {
			key: Key;
			service: BaseServiceConstructor;
			operation?: string;
			value: Metadata[Key];
		}) => {
			if (operation == null) {
				let store = servicesStore.get(service);
				if (!store) servicesStore.set(service, (store = {}));
				store[String(key)] = value;
			} else {
				let rootStore = operationsStore.get(service);
				if (!rootStore) operationsStore.set(service, (rootStore = new Map()));
				let store = rootStore.get(operation);
				if (!store) rootStore.set(operation, (store = {}));
				store[String(key)] = value;
			}
		},
		getMetadata: <Key extends keyof Metadata>({
			service,
			operation,
			key,
		}: {
			key: Key;
			service: BaseServiceConstructor;
			operation?: string;
		}): Metadata[Key] | undefined => {
			if (operation == null) {
				const store = servicesStore.get(service);
				return store?.[String(key)] as any;
			} else {
				const rootStore = operationsStore.get(service);
				if (!rootStore) return undefined;
				const store = rootStore.get(operation);
				return store?.[String(key)] as any;
			}
		},
	};
};
