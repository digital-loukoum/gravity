import { BaseService } from "./BaseService"
import { Service } from "./Service"

export { BaseService, Service }

// To check if this store is really useful
export let servicesStore: Record<string, BaseService> = {}

export const defineServices = <Services extends Record<string, BaseService>>(
	services: Services
) => (servicesStore = services)
