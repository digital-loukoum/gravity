import { Service } from "../Service";

export type User = {
	id: string;
	name: string;
	email: string;
};

const john: User = {
	id: "john",
	name: "John Doe",
	email: "john.doe@supermail",
};

/**
 * This is a service to test the *identifiables* feature.
 * The `setUser` function returns the transformed user.
 * Because a user is identifiable, it should automatically update all instances of the identified user.
 */
export class user extends Service {
	getJohn() {
		return john;
	}

	setJohn(input: Omit<Partial<User>, "id">): User {
		return Object.assign(john, input);
	}
}
