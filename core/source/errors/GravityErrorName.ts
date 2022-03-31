export type GravityErrorName =
	| "gravity/service-inexistant"
	| "gravity/service-missing"
	| "gravity/target-missing"
	| "gravity/target-inexistant"
	| "gravity/target-should-be-a-function"
	| "gravity/bad-parameters"
	| "gravity/guards-cannot-be-asynchronous"
	| "gravity/unknown-error";
