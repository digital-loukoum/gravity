import adapter from '@sveltejs/adapter-auto';
import { kitDocsPlugin } from '@svelteness/kit-docs/node';
import Icons from 'unplugin-icons/vite';
import preprocess from 'svelte-preprocess';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [preprocess()],
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),

		prerender: {
			default: true,
			entries: ['*']
		},

		vite: {
			resolve: {
				alias: {
					src: `${__dirname}/src`
				}
			},
			plugins: [
				Icons({ compiler: 'svelte' }),
				kitDocsPlugin({
					shiki: {
						theme: 'dracula'
					}
				})
			]
		}
	}
};

export default config;
