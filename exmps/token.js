import Tokenizer from "@cato-script/tokenizer";
import Lexer from "@cato-script/lexer";

const lexer = new Lexer([
    'if (5 == 5) {',
    '    meow "If statement is true";',
    '}'
].join('\n'));

const tokenizer = new Tokenizer(lexer);
