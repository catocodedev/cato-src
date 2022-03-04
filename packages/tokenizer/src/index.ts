import Lexer from "@cato-script/lexer";

export default class Tokenizer {
	#inExpression = false;
	#inString = false;
	#inComment = false;
	#inKeyword = false;

	public constructor(lexer: Lexer) {
		for (let i = 0; i < lexer.tokens.length; i++) {
			process.stdout.write(lexer.tokens[i].value);
			lexer.jumpNext();
		}
	}
}
