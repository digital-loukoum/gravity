import { GravityError } from "./GravityError";

export class GravityUnknownError extends GravityError {
	constructor(public error: unknown) {
		super("gravity/unknown-error");
	}
}
