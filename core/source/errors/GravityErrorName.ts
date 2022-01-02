export type GravityErrorName =
	| "gravity/body-missing"
	| "gravity/service-inexistant"
	| "gravity/service-missing"
	| "gravity/service-name-should-be-a-string"
	| "gravity/operation-missing"
	| "gravity/operation-name-should-be-a-string"
	| "gravity/operation-inexistant"
	| "gravity/operation-should-be-a-function"
	| "gravity/guards-cannot-be-asynchronous"
	| "gravity/unknown-error";
