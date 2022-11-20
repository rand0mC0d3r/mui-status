import typescript from '@rollup/plugin-typescript';
import { visualizer } from "rollup-plugin-visualizer";

export default {
  input: 'src/index.tsx',
	output: [
		{
			file: 'lib/esm/bundle.js',
			format: 'esm'
		}
	],
	plugins: [typescript(), visualizer({template: 'list'})],
	external: [
		'react',
		'react-dom',
		'react/jsx-runtime',
		'@mui/material',
		'@mui/material/styles',
		'@mui/icons-material/**'
	]
};
