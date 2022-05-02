import { Service } from "../Service";
import { Admin } from "../guards/Admin";
import { Private } from "../guards/Private";

export class foo extends Service {
	foo() {
		return "foo";
	}

	rawString = "rawString";
	rawArray = [1, 2, 3];
	rawDate = new Date();

	nested = {
		value: 12,
	};

	// unexposed values
	_underscore = "unexposed";
	$dollar = "unexposed";
	#sharp = "unexposed";
	protected protected = "unexposed";
	private private = "unexposed";

	// guards
	@Admin
	onlyForAdmins() {
		return "onlyForAdmins";
	}

	@Admin
	primitiveForAdmins = 12;

	@Admin
	nestedForAdmins = {
		value: 12,
	};

	@Private
	onlyForPrivate() {
		return "onlyForPrivate";
	}

	@Private
	primitiveForPrivate = 12;

	@Private
	nestedPrivate = {
		value: 12,
	};
}
