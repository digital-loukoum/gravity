import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import { addMarkdownAnchors } from './preprocessors/addMarkdownAnchors.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		addMarkdownAnchors(),
		preprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: []
		})
	],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
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
