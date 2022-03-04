import Tokenizer, { TokenTypes } from '@cato-script/tokenizer';

export default class Parser {
    #comments: string[] = [];
    #inComment = false;
    #inKeyword = false;
    #inString = false;

    public constructor(tokenizer: Tokenizer) {
        const comment = {
            open: false,
            startLine: 0,
            endLine: 0,
            startColumn: 0,
            endColumn: 0,
        }

        tokenizer.tokens.forEach((token) => {
            if (!this.#inString) {
                if (!comment.open && token.type === TokenTypes.COMMENT) {
                    comment.open = true;
                    comment.startLine = token.line;
                    comment.endLine = token.line;
                    comment.startColumn = token.column;
                    comment.endColumn = token.column + token.value.length;

                    this.#comments.push('');
                } else if (comment.open && comment.startLine === token.line && token.column >= comment.startColumn && token.column <= comment.endColumn && token.line <= comment.endLine) {
                    this.#comments[this.#comments.length - 1] += token.value;
                }
            }
        });

        console.log(this.#comments)
    }
}