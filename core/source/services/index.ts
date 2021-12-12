import { Service } from "./Service"

// To check if this store is really useful
export let servicesStore: Record<string, Service> = {}

export const useServices = <Services extends Record<string, Service>>(
	services: Services
) => (servicesStore = services)
