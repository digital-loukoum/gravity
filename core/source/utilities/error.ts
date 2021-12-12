import { GravityResponse } from "../types/GravityResponse"

export default function error(status: number, message: string): GravityResponse {
	return {
		status,
		headers: {},
		body: message,
	}
}
