import workspaces from "../workspaces.json";
import { print } from "@digitak/print";
import { exec } from "child_process";

import "./build";

print`[blue: Starting deployment...]`;

let deploymentCount = 0;

for (const workspace of workspaces) {
	exec(`npm publish --access public --prefix ${workspace}/package`, (error) => {
		if (error) {
			print`[red: －－－ [bold:${workspace}] • An error occured during deployment －－－]`;
			console.log(error, "\n");
		} else {
			print`[green: [bold:${workspace}] • Deployment successful 😉]`;
			if (++deploymentCount == workspaces.length) {
				print`\n[green.bold: Deployment done 🎉]\n`;
			}
		}
	});
}
