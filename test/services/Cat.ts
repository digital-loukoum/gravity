export class Cat {
	name = "A cat"

	meow() {
		return [new Date(), "Meow!"]
	}
	attack(target: string) {
		return "Shhhhhh!"
	}
}
