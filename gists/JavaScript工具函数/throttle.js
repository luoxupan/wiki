// 节流：在n秒内只执行一次func, 前置执行。应用场景：搜索框联想功能，表单重复提交，滚动加载-适用于触发之后内容不再变化
function throttle(fn, delay) {
  var timer;
  return function() {
    var self = this; // 取执行的匿名函数的指向，而不是throttle的指向
    var args = arguments;
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      fn.apply(self, args)
      timer = null;
    }, delay)
  }
}
