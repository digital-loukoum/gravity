export type ServicesRecord<Context> = Record<
	string,
	new (context: Context) => { context: Context }
>;
