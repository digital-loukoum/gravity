import print from "cute-print";

export const logger = {
	info(title: string, message: string) {
		print`[blue][${new Date().toLocaleTimeString()}] [bold: ${title}] • ${message}`;
	},
	warning(title: string, message: string) {
		print`[yellow][${new Date().toLocaleTimeString()}] [bold: ${title}] • ${message}`;
	},
	success(title: string, message: string) {
		print`[green][${new Date().toLocaleTimeString()}] [bold: ${title}] • ${message}`;
	},
	error(title: string, message: string, stack?: string) {
		print`[red][${new Date().toLocaleTimeString()}] [bold: ${title}] • ${message}\n[grey:${
			stack || ""
		}]`;
	},
};
