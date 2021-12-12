import { bunker } from "@digitak/bunker/library/index.js";
import { decodeRawBody } from "./decodeRawBody.js";
export default async function resolveApiRequest(services, headers, rawBody) {
    try {
        if (!rawBody)
            throw `Bad request: a body is expected`;
        const body = decodeRawBody(headers, rawBody);
        const service = services[body.service];
        if (!service)
            throw `Bad request: the service '${body.service}' does not exist.`;
        const operation = service[body.operation];
        if (!operation) {
            throw `Bad request: the operation '${body.operation}' does not exist in service '${body.service}'.`;
        }
        else if (typeof operation != "function") {
            throw `Bad request: the operation '${body.operation}' in service '${body.service}' is not a function.`;
        }
        const response = await operation.apply(service, body.properties);
        return {
            status: 200,
            headers: {
                "content-type": "x-bunker",
            },
            body: bunker(response),
        };
    }
    catch (error) {
        return {
            status: 500,
            headers: {},
            body: String(error),
        };
    }
}
