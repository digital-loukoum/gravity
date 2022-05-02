import type { ServicesRecord } from "./ServicesRecord.js";

export const defineServices = <Services extends ServicesRecord<any>>(
	services: Services,
) => services;
