import { develop } from "../source/cli/develop";

develop({
	entryFile: "./test/example/index.ts",
	servicesFile: "./test/example/services/index.ts",
	clientSourceDirectory: "./test/example",
});
