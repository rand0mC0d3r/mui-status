import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
  input: 'src/index.tsx',
	output: [
		{
			file: 'lib/cjs/bundle.js',
			format: 'cjs'
		},
		{
			file: 'lib/esm/bundle.js',
			format: 'esm'
		}
	],
	plugins: [typescript(), terser()],
	external: [
		'react',
		'react-dom',
		'react/jsx-runtime',
		'@mui/material',
		'@mui/material/styles',
		'@mui/icons-material/**'
	]
};
