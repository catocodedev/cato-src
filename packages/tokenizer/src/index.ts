import Lexer from "@cato-script/lexer";

export interface Token {
	type: TokenTypes;
	value: string;
	line: number;
	column: number;
	start: number;
	end: number;
}

export enum TokenTypes {
	NEW_LINE = "^\n",
	COMMENT = "^//",
	L_PAREN = "^\\(",
	R_PAREN = "^\\)",
	L_BRACE = "^\\{",
	R_BRACE = "^\\}",
	L_BRACKET = "^\\[",
	R_BRACKET = "^\\]",
	IF = "^if",
	ELSE = "^else",
	MEOW = "^meow",
	STRING = "^(?<!\\\\)(?:\\\\\\\\)*\"",
	NUMBER = "^[0-9]+",
	EQUALS_COMPARE = "^==",
	SPACE = "^\\s+",
	PLAIN_TEXT = "^[^\\s]+",
}

export default class Tokenizer {
	readonly #tokens: Token[];
	readonly lexer;

	public constructor(lexer: Lexer) {
		this.lexer = lexer;
		this.#tokens = [];
		const tokenTypes = Object.keys(TokenTypes);
		let tokenSource = lexer.source;
		let index = 0;

		const run = () => {
			for (const tokenType of tokenTypes) {
				const regex = new RegExp((TokenTypes as any)[tokenType]);
				const match = tokenSource.match(regex);

				if (match && match[0]) {
					lexer.jumpNext();

					const token: Token = {
						type: (TokenTypes as any)[tokenType],
						value: match[0],
						start: index,
						end: index + match[0].length,
						line: lexer.chars[index].line,
						column: lexer.chars[index].column,
					};

					index += match[0].length;

					this.#tokens.push(token);
					tokenSource = tokenSource.replace(regex, "");

					if (tokenSource.length !== 0) {
						run();
					}

					break;
				}
			}
		}

		run();
		lexer.jumpTo(0);
	}

	public get tokens() {
		return [ ...this.#tokens ];
	}
}
