export interface LexerChar {
	char: string;
	index: number;
	line: number;
	column: number;
}

export default class Lexer {
	readonly #source: string;
	readonly #positional: LexerChar[];
	readonly #chunks: string[];
	#index = 0;

	public constructor(source: string) {
		this.#source = source.replace(/\r\n/g, "\n");
		this.#chunks = source.split(' ');
		this.#positional = [];

		let currentIndex = 0;

		this.#source.split('\n').forEach((lineString, lineNumber) => {
			lineString.split('').forEach((charString, charIndex) => {
				this.#positional.push({
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
		return this.#positional[this.#index + offset];
	}

	public get next() {
		return this.#positional[this.#index + 1];
	}

	public get prev() {
		return this.#positional[this.#index + 1];
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
		return this.#positional.length;
	}

	public get chunks() {
		return [ ...this.#chunks ];
	}

	public get source() {
		return this.#source;
	}

	public get chars() {
		return [ ...this.#positional ];
	}
}
