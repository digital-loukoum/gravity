export class ServerError extends Error {
	public name: "ServerError" = "ServerError";
	public status: number;

	constructor(message: string, { status }: { status: number }) {
		super(message);
		this.status = status;
	}
}
