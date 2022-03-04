/**
 * The basic lexer for CSI which splits all characters into position tokens.
 */
export default class Lexer {
	public source: string;

	public constructor(source: string) {
		this.source = source;
	}
}
