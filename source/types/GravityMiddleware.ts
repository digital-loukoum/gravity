import { Service } from "../services/Service"

export type GravityMiddleware = (input: {
	services: Record<string, Service>
	apiPath?: string
}) => any
