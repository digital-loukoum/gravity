import { guard } from "../../../source";
import { RawRequest } from "../../../source/metadata/RawRequest";
import { Context } from "../Context";
import { isAdmin } from "../guards/Admin";
import { Service } from "../Service";

export class admin extends Service {
	constructor(context: Context) {
		super(context);
		return guard(this, isAdmin);
	}

	rawString = "onlyForAdmins";

	@RawRequest()
	onlyForAdmins() {
		return "onlyForAdmins";
	}

	nested = {
		value: 12,
	};
}
