import { debunker } from "@digitak/bunker/library/index.js";
const jsonDecoder = rawBody => JSON.parse(new TextDecoder().decode(rawBody));
const bunkerDecoder = debunker;
/**
 * Transform a raw body into a Gravity body
 */
export const decodeRawBody = (headers, rawBody) => {
    const decode = headers["content-type"] == "x-bunker" ? bunkerDecoder : jsonDecoder;
    const body = decode(rawBody);
    if (!body || typeof body != "object")
        throw "Bad request: a body is expected";
    if (!body.service)
        throw "Bad request: missing service in body";
    if (typeof body.service != "string")
        throw "Bad request: service should be a string";
    if (!body.operation)
        throw "Bad request: missing operation in body";
    if (typeof body.operation != "string")
        throw "Bad request: operation should be a string";
    if (!body.properties)
        body.properties = [];
    else if (!Array.isArray(body.properties))
        body.properties = [body.properties];
    return body;
};
