// return the type of the instances of a class constructor
export type Instance<Constructor> = Constructor extends new (
	...args: any[]
) => infer I
	? I
	: never;

class Zabu {
	x = 12;
}
