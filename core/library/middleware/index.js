import extractRawBody from "../utilities/extractRawBody.js";
import { normalizePath } from "../utilities/normalizePath.js";
import resolveApiRequest from "../utilities/resolveApiRequest.js";
export const gravity = ({ services, apiPath = "/api" }) => {
    apiPath = normalizePath(apiPath);
    return async (request, response, next) => {
        if (apiPath != normalizePath(request.url ?? ""))
            return next();
        const rawBody = await extractRawBody(request);
        const { status, headers, body } = await resolveApiRequest(services, request.headers, rawBody);
        response.statusCode = status;
        for (const header in headers) {
            response.setHeader(header, headers[header]);
        }
        response.end(body);
    };
};
