export type GravityErrorName =
	| "gravity/service-inexistant"
	| "gravity/service-missing"
	| "gravity/operation-missing"
	| "gravity/operation-not-in-service"
	| "gravity/operation-inexistant"
	| "gravity/operation-should-be-a-function"
	| "gravity/guards-cannot-be-asynchronous"
	| "gravity/unknown-error";
