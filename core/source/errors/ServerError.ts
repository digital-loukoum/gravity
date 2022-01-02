export class ServerError<ErrorName extends string = string> extends Error {
	readonly name: string;
	status = 500;

	constructor(
		name: ErrorName,
		{ message = "", status = 500 }: { message?: string; status?: number } = {},
	) {
		super(message);
		this.name = name;
		this.status = status;
		delete this.stack; // we dont send stack informations to client (for safety)
	}
}
