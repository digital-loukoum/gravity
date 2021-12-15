import { Dog } from "./Dog"
import { Cat } from "./Cat"
import { userService } from "./userService"
import { defineServices } from "@digitak/gravity"

export const services = defineServices({
	cat: new Cat(),
	dog: new Dog(),
	userService,
})
