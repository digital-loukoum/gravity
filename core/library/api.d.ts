declare type Awaited<Type> = Type extends Promise<infer Subtype> ? Promise<Subtype> : Promise<Type>;
declare type ServiceOperations<Service> = {
    [Key in keyof Service as Service[Key] extends (...args: any[]) => any ? Key : never]: Service[Key] extends (...args: any[]) => any ? (...args: Parameters<Service[Key]>) => Awaited<ReturnType<Service[Key]>> : never;
};
declare type Api<Services> = {
    [Key in keyof Services]: ServiceOperations<Services[Key]>;
};
export declare const useApi: <Services extends Record<string, unknown>>(apiPath?: string) => Api<Services>;
export {};
