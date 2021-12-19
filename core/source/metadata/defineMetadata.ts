import { operationsStore, servicesStore } from "./metadataStores"

export const defineMetadata = <Metadata extends Record<never, any>>() => {
	return {
		setMetadata: <Key extends keyof Metadata>({
			key,
			service,
			operation,
			value,
		}: {
			key: Key
			service: string
			operation?: string
			value: Metadata[Key]
		}) => {
			if (operation == null) {
				if (!(key in servicesStore[service])) servicesStore[service] = {}
				servicesStore[service][String(key)] = value
			} else {
				if (!(service in operationsStore)) operationsStore[service] = {}
				if (!(key in operationsStore[service][operation]))
					operationsStore[service][operation] = {}
				operationsStore[service][operation][String(key)] = value
			}
		},
		getMetadata: <Key extends keyof Metadata>({
			key,
			service,
			operation,
		}: {
			key: Key
			service: string
			operation?: string
		}): Metadata[Key] | undefined => {
			if (operation == null) return servicesStore[service]?.[String(key)] as any
			else return operationsStore[service]?.[operation]?.[String(key)] as any
		},
	}
}
