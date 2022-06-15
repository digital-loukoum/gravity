import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { api } from "./api";
import start from "fartest";

let server: ChildProcessWithoutNullStreams | null = spawn(`npm`, [
	"run",
	"test:server",
]);

const sleep = (value: number) =>
	new Promise((resolve) => setTimeout(resolve, value));

const stopServer = () => {
	server?.kill();
	server = null;
};

const serverIsReady = new Promise((resolve) => {
	server?.stdout.on("data", (data) => {
		// console.log(data.toString());
		if (data.toString().includes("Gravity server is running")) {
			resolve(undefined);
		}
	});
});

start("gravity/core", async ({ stage, same, test }) => {
	await serverIsReady;

	stage(`Data fetching`);
	{
		same(await api.math.add(3, 4), { data: 7 }, `Fetch addition`);
		same(await api.foo.bar(), { data: "bar" }, `Fetch string`);
		same(await api.foo.void(), { data: undefined }, `Fetch undefined`);
		same(await api.foo.rawString(), { data: "rawString" }, `Fetch raw string`);
		same(await api.foo.rawArray(), { data: [1, 2, 3] }, `Fetch raw array`);
		same(await api.foo.rawArray[0](), { data: 1 }, `Fetch raw array element`);
		test((await api.foo.rawDate()).data instanceof Date, `Fetch raw date`);
		same(await api.foo.nested.value(), { data: 12 }, `Fetch nested value`);
	}

	stage(`Parameters validation`);
	{
		same(
			(await api.math.add(3, "4" as any)).error?.message,
			"Bad parameters",
			`String as number`,
		);
		same(
			(await (api.math.add as any)(3)).error?.message,
			"Bad parameters",
			`Not enough parameters`,
		);
		same(
			(await (api.math.add as any)(3, 4, 5)).error?.message,
			"Bad parameters",
			`Too much parameters`,
		);
	}

	stage(`Guards`);
	{
		same(
			(await api.foo.onlyForAdmins()).error?.message,
			"Forbidden access",
			`Method-level guard`,
		);
		same(
			(await api.foo.primitiveForAdmins()).error?.message,
			"Forbidden access",
			`Primitive-level guard`,
		);
		same(
			(await api.foo.nestedForAdmins.value()).error?.message,
			"Forbidden access",
			`Nested guard`,
		);
		same(
			(await api.admin.onlyForAdmins()).error?.message,
			"Forbidden access",
			`Service-level guard`,
		);
		same(
			(await api.admin.rawString()).error?.message,
			"Forbidden access",
			`Primitive of service-level guard`,
		);
		same(
			(await api.admin.nested.value()).error?.message,
			"Forbidden access",
			`Service-level nested guard`,
		);
	}

	stage(`Tags`);
	{
		same(
			(await api.foo.onlyForPrivate()).error?.message,
			"Forbidden access",
			`Method-level tag`,
		);
		same(
			(await api.foo.primitiveForPrivate()).error?.message,
			"Forbidden access",
			`Primitive-level tag`,
		);
		same(
			(await api.foo.nestedPrivate.value()).error?.message,
			"Forbidden access",
			`Nested tag`,
		);
		same(
			(await api.privateService.onlyForPrivate()).error?.message,
			"Forbidden access",
			`Service-level guard`,
		);
		same(
			(await api.privateService.rawString()).error?.message,
			"Forbidden access",
			`Primitive of service-level guard`,
		);
		same(
			(await api.privateService.nested.value()).error?.message,
			"Forbidden access",
			`Service-level nested tag`,
		);
	}

	stopServer();
});
