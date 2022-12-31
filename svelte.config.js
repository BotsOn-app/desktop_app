import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter(),
		alias: {
			'$lib/*': "./src/lib/",
			'$utils/*': "./src/lib/components/utils/"
		}
	}
};

export default config;
