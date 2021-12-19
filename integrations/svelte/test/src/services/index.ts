import { defineServices } from "@digitak/gravity"
import { Dog } from "./Dog"
import { Cat } from "./Cat"

export const services = defineServices({
	cat: new Cat(),
	dog: new Dog(),
})
