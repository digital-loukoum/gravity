import { getApiPath } from "../initialize"
import { normalizePath } from "./normalizePath"

/**
 * Check if an url matches Gravity's api path
 */
export default function pathMatchesApi(path?: string): boolean {
	return !!path && getApiPath() == normalizePath(path)
}
