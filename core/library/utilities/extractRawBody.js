/**
 * Extract the raw body from an incoming request
 */
export default async function extractRawBody(request) {
    const chunks = [];
    for await (const chunk of request)
        chunks.push(chunk);
    return Buffer.concat(chunks);
}
