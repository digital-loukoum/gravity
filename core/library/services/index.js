import { Service } from "./Service.js";
export { Service };
// To check if this store is really useful
export let servicesStore = {};
export const useServices = (services) => (servicesStore = services);
