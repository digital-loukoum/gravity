import adapter from '@sveltejs/adapter-auto';
import { dirname } from 'path';
import preprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			optimizeDeps: {
				exclude: []
			},
			server: {
				fs: {
					allow: ['..']
				}
			},
			resolve: {
				alias: {
					'src/': `${__dirname}/src/`,
					'@digitak/gravity-svelte': `${__dirname}/../source`
				}
			}
		}
	}
};

export default config;
