type Promisify<Type> = Type extends Promise<infer Subtype>
	? Promise<Subtype>
	: Promise<Type>

type DefineApi<Service> = {
	[Key in keyof Service as Service[Key] extends (...args: any[]) => any
		? Key
		: never]: Service[Key] extends (...args: any[]) => any
		? (...args: Parameters<Service[Key]>) => Promisify<ReturnType<Service[Key]>>
		: never
}

export type Api<Services> = { [Key in keyof Services]: DefineApi<Services[Key]> }
