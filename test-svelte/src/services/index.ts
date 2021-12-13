import { useServices } from "@digitak/gravity"
import { Dog } from "./Dog"
import { Cat } from "./Cat"

export const services = useServices({
	cat: new Cat(),
	dog: new Dog(),
})
