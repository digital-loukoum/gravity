/// <reference types="node" />
import type { IncomingMessage } from "http";
/**
 * Extract the raw body from an incoming request
 */
export default function extractRawBody(request: IncomingMessage): Promise<Uint8Array>;
