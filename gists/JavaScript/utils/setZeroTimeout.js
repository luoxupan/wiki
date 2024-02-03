// 在浏览器中实现0ms延时的定时器
(function() {
  var timeouts = [];
  var messageName = "zero-timeout-message";

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {
    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        var fn = timeouts.shift();
        fn();
      }
    }
  }
  window.addEventListener("message", handleMessage, true);

  // Add the one thing we want added to the window object.
  window.setZeroTimeout = setZeroTimeout;
})();

// 最小延时 >=4ms
// 在浏览器中，setTimeout()/setInterval() 的每调用一次定时器的最小间隔是4ms，
// 这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的setInterval的回调函数阻塞导致的。
