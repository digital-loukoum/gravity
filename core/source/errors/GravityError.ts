import { GravityErrorName } from "./GravityErrorName";
import { ServerError } from "./ServerError";

export class GravityError extends ServerError<GravityErrorName> {}
