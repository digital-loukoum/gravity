import type { BaseService } from "../services"

export type GravityMiddleware = (input: {
	services: Record<string, BaseService>
	apiPath?: string
}) => any
