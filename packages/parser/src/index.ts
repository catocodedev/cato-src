import Tokenizer, { TokenTypes } from '@cato-script/tokenizer';

export default class Parser {
    #comments: string[] = [];
    #inComment = false;
    #inKeyword = false;
    #inString = false;

    public constructor(tokenizer: Tokenizer) {
        const comment = {
            open: false,
            start: 0,
            end: 0
        }

        tokenizer.tokens.forEach((token, index) => {
            tokenizer.lexer.jumpTo(index);

            if (!this.#inString) {
                if (!comment.open && token.type === TokenTypes.COMMENT) {
                    const tokensBefore = tokenizer.tokens.filter(t => t.start < token.start);
                    console.log(tokensBefore)

                    this.#comments.push('');
                } else if (comment.open && comment.startLine === token.line && token.start >= comment.startColumn) {
                    this.#comments[this.#comments.length - 1] += token.value;
                } else if (comment.open && token.line > comment.endLine) {
                    comment.open = false;
                }
            }
        });

        console.log(this.#comments)
    }
}
