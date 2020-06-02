import { tokenizeExpr } from './token';

export function isOperator(val) {
  const regexOp = /[^.\d]+/;
  return val.length === 1 && regexOp.test(val);
}

export function isNumber(val) {
  const regexNum = /[\d]+/;
  return regexNum.test(val);
}

/* Given an infix expression string,
   Return it as a postfix array. */
export function toPostfixArr(infixStr) {
  const postfixArr = [];
  const stack = [];

  const precedence = (operator) => {
    switch (operator) {
      case '^':
        return 3;
      case '*':
      case '/':
        return 2;
      case '+':
      case '-':
        return 1;
    }
    return -1;
  };

  const infixArr = tokenizeExpr(infixStr);
  infixArr.forEach((val) => {
    if (isOperator(val)) {
      while (
        stack.length !== 0 &&
        precedence(val) <= precedence(stack[stack.length - 1])
      ) {
        const stackTop = stack.pop();
        postfixArr.push(stackTop);
      }
      stack.push(val);
    } else {
      postfixArr.push(val);
    }
  });

  while (stack.length !== 0) {
    const stackTop = stack.pop();
    postfixArr.push(stackTop);
  }

  return postfixArr;
}
