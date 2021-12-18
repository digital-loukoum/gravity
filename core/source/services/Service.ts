import { BaseService } from "./BaseService"

export function Service(): new () => BaseService
export function Service<O extends object>(object: O): new () => BaseService & O
export function Service<O extends object>(object?: O) {
	if (!object) return BaseService
	return class extends BaseService {
		constructor() {
			super()
			Object.assign(this, object)
		}
	}
}
