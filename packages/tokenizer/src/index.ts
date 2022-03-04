import Lexer from "@cato-script/lexer";
import {Token, TokenTypes} from "@cato-script/lexer/src";

export default class Tokenizer {
	readonly #tokens: Token[];

	public constructor(lexer: Lexer) {
		this.#tokens = [];
		const tokenTypes = Object.keys(TokenTypes);
		let tokenSource = lexer.source.replace(/\n/g, '');
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
						line: lexer.peek(0).line,
						column: lexer.peek(0).column,
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
