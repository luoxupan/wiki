function add() {
  var args = [...arguments];
  var func = function() {
    args = [...args, ...arguments]
    return func;
  }
  func.toString = () => args.reduce((x, y) => x + y)
  return func
}

console.log(add(1,2)); // 3
console.log(add(1)(2)); // 3
console.log(add(1)(2)(3)); // 6
console.log(add(1,2,3)(4)); // 10
