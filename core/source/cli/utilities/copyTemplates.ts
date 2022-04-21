import { templates } from "../templates.js";
import { writeFileSystem } from "./writeFileSystem.js";

type FileSystemDirectory = { [Key: string]: string | FileSystemDirectory };

export async function copyTemplates(
	templateNames: Array<string>,
	destination = "",
) {
	await Promise.all(
		templateNames.map(async (template) => {
			if (template in templates) {
				return await writeFileSystem(
					(templates as FileSystemDirectory)[template],
					destination,
				);
			}
		}),
	);
}
