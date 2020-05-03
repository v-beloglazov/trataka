import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import replaceHtmlVars from 'rollup-plugin-replace-html-vars';

const production = !process.env.ROLLUP_WATCH;

const MAIN_BUNDLE_PATH = production ? 'build/trataka.js' : 'public/bundle.js';
const CSS_BUNDLE_PATH = production ? 'build/bundle.css' : 'public/bundle.css';

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: MAIN_BUNDLE_PATH
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write(CSS_BUNDLE_PATH);
			}
		}),
		replaceHtmlVars({
			files: 'index.html',
			from: ['MAIN_BUNDLE_PATH', 'CSS_BUNDLE_PATH'],
			to: [MAIN_BUNDLE_PATH, CSS_BUNDLE_PATH],
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
