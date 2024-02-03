// 用原生JavaScript实现事件代理
function delegate(element, targetSelector, type, handler) {
  element.addEventListener(type, function(event) {
    var event = event || window.event;
    var targets = Array.prototype.slice.call(element.querySelectorAll(targetSelector));
    var target = event.target || event.srcElement;;
    if (targets.indexOf(target) != -1) {
      return handler.apply(target, arguments);
    }
  }, false);
}
