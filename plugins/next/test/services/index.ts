import { Dog } from "./Dog"
import { Cat } from "./Cat"
import { users } from "./users"
import { defineServices } from "@digitak/gravity"

export const services = defineServices({
	cat: new Cat(),
	dog: new Dog(),
	users,
})
