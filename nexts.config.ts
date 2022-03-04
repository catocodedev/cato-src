export default {
	version: "1.0.0-dev.1",
	author: "EmeraldMike, XFaonAE",
	typescript: true,
	packages: [
		{
			name: "cli",
			org: 'cato-script',
			path: './packages/cli',
			main: './src/index.ts',
		},
		{
			name: 'vm',
			org: 'cato-script',
			path: './packages/vm',
			main: './src/index.ts',
		},
		{
			name: 'lexer',
			org: 'cato-script',
			path: './packages/lexer',
			main: './src/index.ts',
		},
		{
			name: 'tokenizer',
			org: 'cato-script',
			path: './packages/tokenizer',
			main: './src/index.ts',
			dependencies: {
				'@cato-script/lexer': '*'
			},
		}
	]
}
