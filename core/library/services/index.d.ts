import { Service } from "./Service.js";
export { Service };
export declare let servicesStore: Record<string, Service>;
export declare const useServices: <Services extends Record<string, Service>>(services: Services) => Services;
