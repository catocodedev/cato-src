import Lexer from '@cato-script/lexer';

const lexer = new Lexer(`5 + 5
+ 10`);

for (let i = 0; i < lexer.count; i++) {
  const token = lexer.peek(i);
  console.log(token);
}

