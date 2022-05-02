import type { ServicesRecord } from "./ServicesRecord.js";

export type GetContext<Services extends ServicesRecord<unknown>> = InstanceType<
	Services[keyof Services]
>["context"];
