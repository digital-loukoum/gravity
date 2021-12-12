// export const isBrowser = (): boolean => typeof window != "undefined" && this === window
export const isBrowser = () => (0, eval)(`typeof window != 'undefined' && this === window`);
