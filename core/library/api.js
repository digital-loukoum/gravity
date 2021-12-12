import { bunker, debunker } from "@digitak/bunker/library/index.js";
import { isBrowser } from "./utilities/isBrowser.js";
import { proxy } from "./utilities/proxy.js";
export const useApi = (apiPath = "/api") => {
    return proxy(service => {
        return proxy(operation => {
            return async (...properties) => {
                console.log("isBrowser?", isBrowser());
                if (!isBrowser())
                    return undefined;
                const headers = new Headers();
                headers.append("Content-Type", "x-bunker");
                const response = await fetch(apiPath, {
                    method: "POST",
                    headers,
                    body: bunker({ service, operation, properties }),
                });
                return debunker(new Uint8Array(await response.arrayBuffer()));
            };
        });
    });
};
