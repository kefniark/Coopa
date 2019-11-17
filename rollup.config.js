import pkg from "./package.json"
import typescript from "rollup-plugin-typescript"
import filesize from "rollup-plugin-filesize"
import versionInjector from "rollup-plugin-version-injector"

export default {
	input: "src/index.ts",
	external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})],
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
