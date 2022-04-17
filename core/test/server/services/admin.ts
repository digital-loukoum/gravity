import { Admin } from "../guards/Admin";
import { Service } from "../Service";

@Admin
export class admin extends Service {
	rawNumber = 12;

	onlyForAdmins() {
		return "onlyForAdmins";
	}
}
