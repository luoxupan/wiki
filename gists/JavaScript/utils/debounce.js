// 防抖: 在n秒内执行最后一次func,后置执行。应用场景：手机号邮箱等输入检测，搜索框输入完执行最后一次搜索，鼠标移动-适用于用户输入完整的内容后执行
function debounce(fn, delay) {
  var timer;
  return function () {
    var self = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(self, args);
    }, delay);
  };
}
