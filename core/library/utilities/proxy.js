/**
 * @return a simple proxy that takes no target and has only a getter
 */
export const proxy = (getter) => new Proxy({}, { get: (_, property) => getter(String(property)) });
