import { GravityBody } from "../types/GravityBody.js";
import type { IncomingHttpHeaders } from "http";
/**
 * Transform a raw body into a Gravity body
 */
export declare const decodeRawBody: (headers: IncomingHttpHeaders, rawBody: Uint8Array) => GravityBody;
