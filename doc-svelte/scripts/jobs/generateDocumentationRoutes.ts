import fs from 'fs-extra';
import path from 'path';
import { removeFileNameIndex } from '../../src/utilities/removeFileNameIndex';
import { formatRouteName } from '../../src/utilities/formatRouteName';

const documentationAlias = (source: string) =>
	`
<script lang="ts">
	import Page from "${source}";
</script>

<Page />
`.trim();

export function generateDocumentationRoutes(
	source = 'src/documentation',
	target = 'src/routes/documentation'
) {
	fs.ensureDirSync(target);

	for (const fileName of fs.readdirSync(source)) {
		const filePath = path.join(source, fileName);
		const targetPath = path.join(target, formatRouteName(removeFileNameIndex(fileName)));

		if (fs.statSync(filePath).isDirectory()) {
			generateDocumentationRoutes(filePath, targetPath);
		} else {
			if (fileName == '__layout.svelte') {
				fs.copyFileSync(filePath, targetPath);
			} else {
				fs.writeFileSync(targetPath, documentationAlias(path.relative(target, filePath)));
			}
		}
	}
}
