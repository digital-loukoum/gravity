import { GravityErrorName } from "./GravityErrorName";
import { ServerError } from "./ServerError";

// export type GravityError =
// 	| (serviceName: string) => ({
// 			kind: "gravity/service-inexistant";
// 			serviceName: string;
// 	  })
// 	| "gravity/service-missing"
// 	| "gravity/target-missing"
// 	| "gravity/target-inexistant"
// 	| "gravity/target-should-be-a-function"
// 	| "gravity/bad-parameters"
// 	| "gravity/guards-cannot-be-asynchronous"
// 	| "gravity/unknown-error";

export type GravityError =
	| {
			kind: "gravity";
			name: "Service inexistant";
			serviceName: string;
	  }
	| {
			kind: "gravity";
			name: "Service missing";
			serviceName: string;
	  }
	| {
			kind: "gravity";
			name: "Target missing";
			path: string;
	  }
	| {
			kind: "gravity";
			name: "Target inexistant";
			path: string;
	  }
	| {
			kind: "gravity";
			name: "Target should be a function";
			path: string;
	  }
	| {
			kind: "gravity";
			name: "Bad parameters";
			errors: string[];
	  }
	| {
			kind: "gravity";
			name: "Guards cannot be asynchronous";
			guardName: string;
	  }
	| {
			kind: "gravity";
			name: "Wild error";
	  };

// export const gravityErrors = {
// 	"gravity/service-missing": (serviceName: string) => ({
// 		serviceName,
// 		message: `Service "${serviceName}" is missing`,
// 	}),
// 	"gravity/service-inexistant": (serviceName: string) => ({
// 		serviceName,
// 		message: `Service "${serviceName}" does not exist`,
// 	}),
// 	"gravity/target-missing": (path: string) => ({
// 		path,
// 		message: `Target "${path}" is missing`,
// 	}),
// 	"gravity/target-inexistant": (path: string) => ({
// 		path,
// 		message: `Target "${path}" does not exist`,
// 	}),
// 	"gravity/target-should-be-a-function": (path: string) => ({
// 		path,
// 		message: `Target "${path}" should be a function`,
// 	}),
// 	"gravity/wrong-parameters": (errors: string[]) => ({
// 		errors,
// 		message: `Target "${path}" should be a function`,
// 	}),
// };

// export type GravityError = {
// 	[Kind in keyof typeof gravityErrors]: {
// 		kind: Kind;
// 	} & ReturnType<typeof gravityErrors[Kind]>;
// }[keyof typeof gravityErrors];

// export type GravityErrorKind = keyof typeof gravityErrors;

// export const gravityError = <Kind extends GravityErrorKind>(
// 	kind: Kind,
// 	...rest: Parameters<typeof gravityErrors[Kind]>
// ): {
// 	kind: Kind;
// } & ReturnType<typeof gravityErrors[Kind]> => {
// 	return gravityErrors[kind].apply(null, rest) as any;
// };

// const hey = gravityError("gravity/service-inexistant", "hey");
