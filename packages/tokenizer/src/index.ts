import Lexer from "@cato-script/lexer";

export enum TokenTypes {
	IF = "^if",
	ELSE = "^else",
	L_PAREN = "^\\(",
	R_PAREN = "^\\)",
	NUMBER = "^[0-9]+",
	EQUALS_COMPARE = "^==",
	SPACE = "^\\s+",
}

export interface Token {
	type: TokenTypes;
	value: string;
}

export default class Tokenizer {
	#tokens: Token[];

	public constructor(lexer: Lexer) {
		this.#tokens = [];
		const tokenTypes = Object.keys(TokenTypes);
		let source = lexer.source;
		let index = 0;

		const run = () => {
			for (const tokenType of tokenTypes) {
				const regex = new RegExp((TokenTypes as any)[tokenType]);
				const match = source.match(regex);

				if (match && match[0]) {
					const token: Token = {
						type: (TokenTypes as any)[tokenType],
						value: match[0],
						start: index,
						end: index + match[0].length,
					};

					index += match[0].length;

					this.#tokens.push(token);
					source = source.replace(regex, "");

					if (source.length !== 0) {
						run();
					}

					break;
				}
			}
		}

		run();

		console.log(this.#tokens);
	}
}
