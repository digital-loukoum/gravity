/**
 * A Gravity's hook is a function that takes at least a context as argument
 * and returns the given context maybe augmented with new values.
 */
export type GravityHandler<Parameter, OutputContext = unknown, InputContext = unknown> = (
	input: Parameter & { context: InputContext }
) => Parameter & { context: OutputContext }

export type GravityRequestHandler<
	OutputContext = unknown,
	InputContext = unknown
> = GravityHandler<{ request: Request }, InputContext, OutputContext>

const requestHook: GravityRequestHandler<unknown> = ({ request, context }) => ({
	request,
	context,
})
