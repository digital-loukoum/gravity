import { defineServices } from "../../../source";
import { admin } from "./admin";
import { foo } from "./foo";
import { math } from "./math";
import { privateService } from "./privateService";
import { user } from "./user";

export const services = defineServices({
	math,
	foo,
	admin,
	privateService,
	user,
});
