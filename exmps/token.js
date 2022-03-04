import Tokenizer from "@cato-script/tokenizer";
import Lexer from "@cato-script/lexer";
import Parser from '@cato-script/parser';

const lexer = new Lexer([
    'if // Com', // 13 CH
].join('\n'));

const tokenizer = new Tokenizer(lexer);
const parser = new Parser(tokenizer);
