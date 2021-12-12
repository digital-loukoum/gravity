import { normalizePath } from "../utilities/normalizePath.js";
import resolveApiRequest from "../utilities/resolveApiRequest.js";
export const gravity = ({ services, apiPath = "/api" }) => {
    apiPath = normalizePath(apiPath);
    const handler = async ({ request, resolve }) => {
        const { rawBody, path, headers } = request;
        console.log("Resolving request:", path);
        if (apiPath == normalizePath(path)) {
            return resolveApiRequest(services, headers, rawBody);
        }
        else
            return resolve(request);
    };
    return handler;
};
