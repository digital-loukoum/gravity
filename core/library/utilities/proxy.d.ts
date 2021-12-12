/**
 * @return a simple proxy that takes no target and has only a getter
 */
export declare const proxy: <T = unknown>(getter: (property: string) => any) => T;
