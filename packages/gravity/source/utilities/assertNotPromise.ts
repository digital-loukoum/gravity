import { gravityError } from "../errors/GravityError.js";

export function assertNotPromise(value: any) {
	if (value instanceof Promise) {
		throw gravityError({
			message: "Guards cannot be asynchronous",
			status: 500,
		});
	}
}
