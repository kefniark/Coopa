import pkg from "./package.json"
import typescript from "rollup-plugin-typescript"
import filesize from "rollup-plugin-filesize"
import versionInjector from "rollup-plugin-version-injector"

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs"
		},
		{
			file: pkg.module,
			format: "es"
		}
	],
	external: [...Object.keys(pkg.peerDependencies || {})],
	plugins: [
		typescript(),
		versionInjector({
			injectInComments: {
				fileRegexp: /\.(js|mjs)$/g,
				tag: `[${pkg.name.toUpperCase()}] Build: {version} - {date}`,
				dateFormat: "longDate"
			}
		}),
		filesize({
			showGzippedSize: false
		})
	]
}
