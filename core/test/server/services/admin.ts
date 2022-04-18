import { guard } from "../../../source";
import { Context } from "../Context";
import { isAdmin } from "../guards/Admin";
import { Service } from "../Service";

export class admin extends Service {
	constructor(context: Context) {
		super(context);
		return guard(this, isAdmin);
	}

	rawString = "onlyForAdmins";

	onlyForAdmins() {
		return "onlyForAdmins";
	}
}
