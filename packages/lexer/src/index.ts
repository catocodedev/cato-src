export interface LexerChar {
	char: string;
	index: number;
	line: number;
	column: number;
}

export default class Lexer {
	#source: string;
	#positionals: LexerChar[];
	#index = 0;
	#chunks: string[];

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

	public get count() {
		return this.#positionals.length;
	}

	public get chunks() {
		return [ ...this.#chunks ];
	}

	public get source() {
		return this.#source;
	}
}
