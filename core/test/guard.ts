import { guard, defineGuard } from "../source";

const log = (service: unknown) => console.log("Passing guard", service);
const Log = () => defineGuard(log);

class Zabu {
	context = "context";

	@Log()
	x = 23;

	@Log()
	getX = () => {
		return this.x;
	};

	@Log()
	getX2() {
		return this.x;
	}

	@Log()
	get X() {
		return this.x;
	}
}

const zabu = new Zabu();
console.log("x", zabu.x);
console.log("getX", zabu.getX());
console.log("getX2", zabu.getX2());
console.log("X", zabu.X);

class Coco {
	constructor() {
		return guard(this, log);
	}

	x = 23;

	getX = () => this.x;

	get X() {
		return this.x;
	}

	getX2() {
		return this.x;
	}
}

const coco = new Coco();
console.log("COCO", coco);
console.log("x", coco.x);
console.log("getX", coco.getX());
console.log("getX2", coco.getX2());
console.log("X", coco.X);
