(function () {
  const
    docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    scale = 1 / window.devicePixelRatio,
    recalc = function () {
      const uiWidth = 1080; // 设计稿的尺寸是1080
      const clientWidth = docEl.clientWidth;

      docEl.style.fontSize = (clientWidth / uiWidth) + 'px';
    };
  // document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable = no, shrink-to-fit=no');

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
})()

// 按照设计稿宽度，1rem=1px（1px指的是设计稿标注的尺寸）, 其他屏宽按比例缩放
// 使用：当设计稿标注的尺寸是45px的时候，我们代码里面写45rem
// 从网易与淘宝的font-size思考前端设计稿与工作流：https://www.cnblogs.com/lyzg/p/4877277.html
