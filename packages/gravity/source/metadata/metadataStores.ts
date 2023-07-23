import type { BaseServiceConstructor } from "../services/BaseServiceConstructor.js";

type MetadataStore = Record<string, unknown>;

export const servicesStore = new Map<BaseServiceConstructor, MetadataStore>();
export const propertiesStore = new Map<
	BaseServiceConstructor,
	Map<string, MetadataStore>
>();
