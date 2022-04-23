import { ApiStore } from "./ApiStore.js";

export const apiCache = new Map<string, ApiStore<unknown>>();
