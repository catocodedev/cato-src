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
	readonly #chunks: string[];
	#index = 0;

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

	public get chars() {
		return [ ...this.#positionals ];
	}
}
