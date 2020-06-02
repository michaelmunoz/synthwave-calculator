import { toPostfixArr, isOperator } from './util';

/* Given an infix expression string,
   Return its result. */
export function evalExpr(expr) {
  /* Convert infix string to postfix array */
  const postfix = toPostfixArr(expr);
  const stack = [];

  postfix.forEach((val) => {
    if (isOperator(val)) {
      // Check if operator is just a negative sign, else perform operator
      if (val === '-' && stack.length === 1) {
        const num = stack.pop();
        stack.push(-1 * num);
      } else {
        const num2 = stack.pop();
        const num1 = stack.pop();
        switch (val) {
          case '+':
            stack.push(num1 + num2);
            break;
          case '-':
            stack.push(num1 - num2);
            break;
          case '*':
            stack.push(num1 * num2);
            break;
          case '/':
            stack.push(num1 / num2);
            break;
        }
      }
    } else {
      stack.push(parseFloat(val));
    }
  });

  return stack.pop();
}
