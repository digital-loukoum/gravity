/// <reference types="node" />
import type { IncomingHttpHeaders } from "http";
import { GravityResponse } from "../types/GravityResponse.js";
export default function resolveApiRequest(services: Record<string, any>, headers: IncomingHttpHeaders, rawBody: Uint8Array): Promise<GravityResponse>;
