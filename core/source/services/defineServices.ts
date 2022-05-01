import type { ServicesRecord } from "../handler/ServicesRecord.js";

export const defineServices = <Services extends ServicesRecord<any>>(
	services: Services,
) => services;
