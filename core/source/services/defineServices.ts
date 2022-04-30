import type { ServicesRecord } from "../handler/ServicesRecord.js";
import type { BaseServiceConstructor } from "./BaseServiceConstructor.js";

export const defineServices = <
	Context,
	Services extends ServicesRecord<Context>,
>(
	services: Services,
) => services;
