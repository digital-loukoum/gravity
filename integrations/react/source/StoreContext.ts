import { createContext, createElement } from "react";
import { Store } from "./Store.js";

export const StoreContext = createContext(new Map<string, Store<unknown>>());

export const StoreContextProvider = ({ children }: any) => {
	console.log("StoreContextProvider is called");

	const defaultStore = new Map<string, Store<unknown>>();

	return createElement(StoreContext.Provider, {
		value: defaultStore,
		children,
	});
};
