import {config} from '@hyper-stack/cli';
import CLIPluginJSTS from '@hyper-stack/cli-plugin-jsts';

export default config({
	plugins: [
		new CLIPluginJSTS({
			projects: [
				{
					path: './packages/parser',
					entry: './src/index.ts',
					distroTypes: {
						esm: './build/js/module.mjs',
						cjs: './build/js/common.cjs',
						browser: './build/js/browser.js'
					}
				},
				{
					path: './packages/executor',
					entry: './src/index.ts',
					distroTypes: {
						esm: './build/js/module.mjs',
						cjs: './build/js/common.cjs',
						browser: './build/js/browser.js'
					}
				}
			]
		})
	]
});
