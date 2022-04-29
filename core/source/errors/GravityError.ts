export const gravityError = <E extends GravityErrorInput>(
	error: E & { status?: number },
): Error & {
	name: "GravityError";
	status: number;
} & E => {
	return Object.assign(
		new Error(),
		{
			name: "GravityError",
			status: 500,
		} as const,
		error,
	);
};

export function isGravityError(error: Error): error is GravityError {
	return error.name === "GravityError";
}

export type GravityError = {
	name: "GravityError";
	status: number;
	stack?: string;
} & GravityErrorInput;

export type GravityErrorInput =
	| {
			message: "Schema is not in sync with services";
	  }
	| {
			message: "Service inexistant";
			serviceName: string;
	  }
	| {
			message: "Service missing";
			serviceName: string;
	  }
	| {
			message: "Target missing";
			serviceName: string;
	  }
	| {
			message: "Target inexistant";
			serviceName: string;
			target: string;
	  }
	| {
			message: "Target should be a function";
			target: string;
	  }
	| {
			message: "Bad parameters";
			errors: string[];
	  }
	| {
			message: "Guards cannot be asynchronous";
	  }
	| {
			message: "Unexpected error";
	  };
