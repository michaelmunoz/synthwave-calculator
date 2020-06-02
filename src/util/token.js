/* Tokenize a given infix expression */
export function tokenizeExpr(expr) {
  const regexOp = /[^.\d]+/;
  const arr = [];
  let i = 0;
  while (i < expr.length) {
    // Find the next operator relative to i
    const nextOperatorIdx = expr.slice(i).search(regexOp);
    if (nextOperatorIdx === -1) {
      // No more operators left in expr, simply add the rest of expr
      const num = expr.substring(i);
      arr.push(num);
      i = expr.length;
    } else if (nextOperatorIdx === 0) {
      // Current character is an operator
      const op = expr.charAt(i);
      arr.push(op);
      i++;
    } else {
      // Current character is the start of a number
      const absIdx = nextOperatorIdx + i;
      const num = expr.substring(i, absIdx);
      arr.push(num);
      i = absIdx;
    }
  }
  return arr;
}
