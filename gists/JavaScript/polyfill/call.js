Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;
  let args = [...arguments].slice(1);
  let res = context.fn(...args);
  delete context.fn;
  return res;
}
