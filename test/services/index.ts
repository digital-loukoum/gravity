import { useServices } from "../../source/services"
import { Cat } from "./Cat"
import { Dog } from "./Dog"

export const services = useServices({
	cat: new Cat(),
	dog: new Dog(),
})
