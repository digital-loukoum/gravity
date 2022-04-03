import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { addMarkdownAnchors } from './preprocessors/addMarkdownAnchors.js';
import { processMarkdown } from './preprocessors/processMarkdown.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [addMarkdownAnchors(), processMarkdown(), preprocess()],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
		prerender: {
			crawl: true
		},
		vite: {
			resolve: {
				alias: {
					src: `${__dirname}/src`
				}
			}
		}
	}
};

export default config;
