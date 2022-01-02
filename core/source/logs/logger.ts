import { print } from "@digitak/print";

const { format: formatDate } = new Intl.DateTimeFormat([], {
	dateStyle: "short",
	timeStyle: "short",
});
const now = () => formatDate(new Date());

export const logger = {
	info(title: string, message: string) {
		print`[blue: ${now()} • [bold: ${title} •] ${message}]`;
	},
	success(title: string, message: string) {
		print`[green: ${now()} • [bold: ${title} •] ${message}]`;
	},
	warning(title: string, message: string, stack?: string) {
		print`[yellow: ${now()} • [bold: ${title} •] ${message}]`;
		if (stack) console.log(stack);
	},
	error(title: string, message: string, stack?: string) {
		print`[red:[bold:[ ${now()} ] • ${title} •] ${message}]`;
		if (stack) console.log(stack);
	},
};
