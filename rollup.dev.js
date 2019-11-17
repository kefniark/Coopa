import pkg from "./package.json"
import typescript from "rollup-plugin-typescript"
import serve from 'rollup-plugin-serve'

export default {
	input: "src/index.ts",
	output: [
		{
			name: "Coopa",
			file: pkg.main,
			format: "umd"
		}
	],
	plugins: [
		typescript(),
		serve({
			open: true,
			openPage: "/samples/",
			contentBase: ["."],
			port: 8085,
			verbose: true
		})
	]
}
