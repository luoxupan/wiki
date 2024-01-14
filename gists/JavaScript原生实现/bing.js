Function.prototype.bind2 = function(context) {
  var args = [...arguments];
  var _this = this;
  return function() {
    _this.apply(context, [...args.slice(1), ...arguments]);
  }
}
