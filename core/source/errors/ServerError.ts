export class ServerError<ErrorName extends string = string> extends Error {
	readonly name: ErrorName;
	readonly critical: boolean;
	status = 500;

	constructor(
		name: ErrorName,
		{
			message = "",
			status = 500,
			critical = false,
		}: { message?: string; status?: number; critical?: boolean } = {},
	) {
		super(message);
		this.name = name;
		this.status = status;
		this.critical = critical;
	}
}
