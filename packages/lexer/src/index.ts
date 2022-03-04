export interface LexerChar {
	char: string;
	index: number;
	line: number;
	column: number;
}

export interface Token {
	type: TokenTypes;
	value: string;
	line: number;
	column: number;
	start: number;
	end: number;
}

export enum TokenTypes {
	IF = "^if",
	ELSE = "^else",
	L_PAREN = "^\\(",
	R_PAREN = "^\\)",
	L_BRACE = "^\\{",
	R_BRACE = "^\\}",
	L_BRACKET = "^\\[",
	R_BRACKET = "^\\]",
	MEOW = "^meow",
	STRING = "^(?<!\\\\)(?:\\\\\\\\)*\"",
	NUMBER = "^[0-9]+",
	EQUALS_COMPARE = "^==",
	SPACE = "^\\s+",
	PLAIN_TEXT = "^[^\\s]+",
}

export default class Lexer {
	readonly #source: string;
	readonly #positionals: LexerChar[];
	#index = 0;
	readonly #chunks: string[];
	readonly #tokens: Token[];

	public constructor(source: string) {
		this.#source = source;
		this.#chunks = source.split(' ');
		this.#positionals = [];

		let currentIndex = 0;

		source.split('\n').forEach((lineString, lineNumber) => {
			lineString.split('').forEach((charString, charIndex) => {
				this.#positionals.push({
					char: charString,
					index: currentIndex,
					line: lineNumber + 1,
					column: charIndex
				});

				currentIndex++;
			});
		});

		this.#tokens = [];
		const tokenTypes = Object.keys(TokenTypes);
		let tokenSource = this.source.replace(/\n/g, '');
		let index = 0;

		const run = () => {
			for (const tokenType of tokenTypes) {
				const regex = new RegExp((TokenTypes as any)[tokenType]);
				const match = tokenSource.match(regex);

				if (match && match[0]) {
					this.jumpNext();

					const token: Token = {
						type: (TokenTypes as any)[tokenType],
						value: match[0],
						start: index,
						end: index + match[0].length,
						line: this.peek(0).line,
						column: this.peek(0).column,
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
		this.jumpTo(0);
	}

	public peek(offset: number = 1) {
		return this.#positionals[this.#index + offset];
	}

	public get next() {
		return this.#positionals[this.#index + 1];
	}

	public get prev() {
		return this.#positionals[this.#index + 1];
	}

	public jumpNext(offset: number = 1) {
		this.#index += offset;
	}

	public jumpPrev(offset: number = 1) {
		this.#index -= offset;
	}

	public jumpTo(index: number) {
		this.#index = index < 0 ? 0 : index;
	}

	public get count() {
		return this.#positionals.length;
	}

	public get chunks() {
		return [ ...this.#chunks ];
	}

	public get source() {
		return this.#source;
	}

	public get tokens() {
		return [ ...this.#tokens ];
	}

	public get chars() {
		return [ ...this.#positionals ];
	}
}
