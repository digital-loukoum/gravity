import { BaseService } from "./BaseService"
import { defineService } from "./defineService"

/**
 * A default service without context
 */
export const Service = defineService(class Service extends BaseService<never> {})
