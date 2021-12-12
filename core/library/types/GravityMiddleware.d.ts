import { Service } from "../services/Service.js";
export declare type GravityMiddleware = (input: {
    services: Record<string, Service>;
    apiPath?: string;
}) => any;
