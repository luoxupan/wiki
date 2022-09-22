### YP编辑器页面导出代码

```js
document.querySelector('div[data-id="123"]');
// or
document.querySelector('[data-id="123"]')
```

```html

<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <link rel="stylesheet" href="//shop.io.mi-img.com/app/shop/pages/editor-static/css/page-output-lib.min.css?update=28">
  <style>        
      [data-name="scroll_nav"] {
margin: auto;
position: relative;
overflow: hidden;
}
[data-name="scroll_nav"] a {
display: block;
position: relative;
padding-top: 11px;
padding-bottom: 9px;
margin: 0 13px;
font-size: 15px;
}
[data-name="scroll_nav"] .splitter {
position: absolute;
right: 0;
top: 10px;
bottom: 10px;
width: 1px;
opacity: 0;
}
[data-name="scroll_nav"] .item {
position: relative;
text-align: center;
-moz-flex: 1;
-ms-flex: 1;
-webkit-flex: 1;
flex: 1;
}
[data-name="scroll_nav"] .prevent {
pointer-events: none;
}
[data-name="scroll_nav"] .wrap {
-webkit-display: inline-flex;
display: inline-flex;
min-width: 10rem;
margin: 0;
padding: 0;
white-space: nowrap;
text-align: center;
overflow: visible;
box-sizing: border-box;
}
[data-name="scroll_nav"] .wrap > li {
display: inline-block;
}
[data-name="scroll_nav"] .pull_div_common {
padding: 0 6px 6px 6px;
}
[data-name="scroll_nav"] .pull_div_common .pull_item_wrap {
border-radius: 4px;
}
[data-name="scroll_nav"] .pull_div_fixed {
position: fixed;
top: 0;
z-index: 11;
}
[data-name="scroll_nav"] .pull_div_fixed .pull_item_wrap {
border-radius: 0;
}
[data-name="scroll_nav"] .pull_div {
display: none;
width: 100%;
max-width: 640px;
margin: 0 auto;
}
[data-name="scroll_nav"] .pull_div .pull_item_wrap {
background: #fff;
}
[data-name="scroll_nav"] .pull_div .pull_item_wrap span {
padding-top: 7px;
text-align: center;
font-size: 15px;
width: 33%;
}
[data-name="scroll_nav"] .pull_div .pull_item_wrap span a {
padding-top: 15px;
padding-bottom: 4px;
display: inline;
padding-right: 0;
}
[data-name="scroll_nav"] .pull_div .pull_title {
display: flex;
flex-direction: row;
justify-content: space-between;
height: 40px;
}
[data-name="scroll_nav"] .pull_div .pull_title .pull_div_tit {
line-height: 40px;
padding-left: 14px;
font-size: 14px;
color: #999;
}
[data-name="scroll_nav"] .pull_div .pull_title .pull_div_arr {
width: 47px;
background-image: url("https://shop.io.mi-img.com/app/shop/img?id=shop_30f46524f0cc62409cecddfd36002d24.jpeg&w=48&h=76");
background-size: 28px 42px;
background-repeat: no-repeat;
}
[data-name="scroll_nav"] .pull_div .pull_title .pull_div_arr > img {
display: block;
margin-top: 17px;
margin-left: 22px;
width: 13px;
height: 8px;
}
[data-name="scroll_nav"] .scroll-nav-root {
padding: 0 10px;
margin: 10px auto;
}
[data-name="scroll_nav"] .nav_common {
position: relative;
border-radius: 4px;
}
[data-name="scroll_nav"] .nav_common .pull_more {
top: 5px;
right: 0;
}
[data-name="scroll_nav"] .nav_fixed {
position: fixed;
top: 0;
z-index: 10;
border-radius: 0;
}
[data-name="scroll_nav"] .nav_fixed .pull_more {
z-index: 12;
top: 0;
right: 0;
}
[data-name="scroll_nav"] .nav_fixed a {
padding: 7px 0;
}
[data-name="scroll_nav"] .scroll-nav-cont {
width: 100%;
max-width: 640px;
margin: 0 auto;
overflow: hidden;
background-color: #fff;
}
[data-name="scroll_nav"] .scroll-nav-cont .pull_more {
position: absolute;
height: 34px;
width: 60px;
display: flex;
}
[data-name="scroll_nav"] .scroll-nav-cont .pull_more .more_shadow {
width: 26px;
height: 36px;
}
[data-name="scroll_nav"] .scroll-nav-cont .pull_more > div {
flex: 1;
background-color: #fff;
}
[data-name="scroll_nav"] .scroll-nav-cont .pull_more .more_img {
transform: rotate(180deg);
margin-top: 15px;
margin-left: 10px;
width: 13px;
height: 8px;
}
[data-name="venue_minor_title"] .container {
width: 100%;
height: 1.25rem;
color: #de2839;
background: no-repeat 0 0;
background-size: 100% 100%;
text-align: center;
font-family: 'FZLanTingHei-R-GBK', 'FZLanTingHei-L-GBK', "FZLTHK--GBK1-0", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
[data-name="venue_minor_title"] .container .title {
font-size: 0.47222222rem;
line-height: 1.25rem;
position: relative;
}
[data-name="venue_minor_title"] .container .before {
position: absolute;
height: 1px;
width: 1.38888889rem;
background: #de2839;
top: 0.61111111rem;
left: -1.53703704rem;
}
[data-name="venue_minor_title"] .container .after {
position: absolute;
height: 1px;
width: 1.38888889rem;
background: #de2839;
top: 0.61111111rem;
right: -1.53703704rem;
}
[data-name="footer_navbar"] .fixed-bottom-nav {
display: none;
z-index: 13;
position: fixed;
bottom: 0;
}
[data-name="footer_navbar"] .footer-nav {
width: 100%;
max-width: 640px;
height: 55px;
padding: 0 20px;
bottom: 0;
background-color: #fff;
}
[data-name="footer_navbar"] .footer-nav-3 {
padding: 0 40px;
}
[data-name="footer_navbar"] .footer-nav-4 {
padding: 0 20px;
}
[data-name="footer_navbar"] .footer-nav-5 {
padding: 0 10px;
}
[data-name="footer_navbar"] .nav-content {
width: 100%;
height: 55px;
display: flex;
flex-direction: row;
justify-content: space-between;
}
[data-name="footer_navbar"] .nav-item {
width: 65px;
height: 50px;
margin-top: 5px;
text-align: center;
}
[data-name="footer_navbar"] .nav-item .item-img {
display: block;
width: 31px;
height: 31px;
margin: 0 auto;
}
[data-name="footer_navbar"] .nav-item .item-text {
height: 18px;
line-height: 17px;
display: block;
font-size: 12px;
}
.editor-sync-max-width {
max-width: 640px;
}

  </style>
  <style id="adjust-tag-style"></style>
  <style>
    body.editor-platform-iOS .editor-iOS-font-adjust{     
      -webkit-text-size-adjust: 110%; 
    }
  </style>
  <script></script>    
</head>

<body style="background-color:undefined" class="" data-max-width="640px">
  <script>
    if(window.__wxjs_environment === 'miniprogram' || /^wechatdevtools/.test(navigator.userAgent)){
      document.body.addEventListener("click",function(e){
        if(e.target.tagName === 'A'){
          e.preventDefault();
        }
      });
    }
    window.zeptoCbs=[];
    window.registerAfterZepto=function(func){
      zeptoCbs.push(func);
    }
    !(function(){
      if(!document.body){
        return ;
      }
      var html = document.querySelector('html');
      html.style.fontSize = '16px';
      var d = document.createElement('div');
      d.style.cssText = "width:1rem;height:0;overflow: hidden;position:absolute;z-index:-1;visibility: hidden;";
      document.body.appendChild(d);
      var dw = d.offsetWidth || 16; // 1rem的实际展示px值
  
      document.body.removeChild(d);            
      var fz = 16;
      var remRatio= dw / fz;
      document.documentElement.style.fontSize=Math.min(document.documentElement.clientWidth,parseInt(document.body.dataset.maxWidth)) / 10 / remRatio+"px";
    })();
  </script>
  
<div class="rag hide editor-app-ad" data-name="editor_app_ad"></div>
    <div id="wrap"><main id="rags-container" class="rag-viewer-area" style="max-width: 640px;">
      <div class="rag" data-name="scroll_nav" data-editor-trace="1" data-id="editor-rag-0"><div class="scroll-nav-root">
      <div class="scroll-nav-cont scroll_cont nav_common">
        <ul class="wrap">
          <li class="item clickable">
              <a data-href="#1" class="ng-binding" style="color: rgb(102, 102, 102);">饮食酒水</a>
          </li><li class="item clickable">
              <a data-href="#2" class="ng-binding" style="color: rgb(102, 102, 102);">餐厨居家</a>
          </li><li class="item clickable">
              <a data-href="#3" class="ng-binding" style="color: rgb(102, 102, 102);">婴童智趣</a>
          </li><li class="item clickable">
              <a data-href="#4" class="ng-binding" style="color: rgb(102, 102, 102);">出行健康</a>
          </li>
        </ul>
        <div class="pull_more onpull">
          <img class="more_shadow" src="https://shop.io.mi-img.com/app/shop/img?id=shop_6a94a0a58cc75922f42583ad630e9df4.png">
          <div>
            <img class="more_img" src="https://shop.io.mi-img.com/app/shop/img?id=shop_d339859d71a5d5f267ef923c57252584.png">
          </div>
        </div>
      </div>
    </div>
    <div class="pull_div pull_div_common">
      <div class="pull_item_wrap">
        <div class="pull_title">
          <div class="pull_div_tit">切换楼层</div>
          <div class="pull_div_arr onpush">
            <img src="https://shop.io.mi-img.com/app/shop/img?id=shop_d339859d71a5d5f267ef923c57252584.png">
          </div>
        </div>
        <div style="display: flex;flex-wrap: wrap">
          <span style="height: 44px">
            <a class="pull_0" data-href="#1" style="color: rgb(102, 102, 102);">饮食酒水</a>
          </span><span style="height: 44px">
            <a class="pull_1" data-href="#2" style="color: rgb(102, 102, 102);">餐厨居家</a>
          </span><span style="height: 44px">
            <a class="pull_2" data-href="#3" style="color: rgb(102, 102, 102);">婴童智趣</a>
          </span><span style="height: 44px">
            <a class="pull_3" data-href="#4" style="color: rgb(102, 102, 102);">出行健康</a>
          </span>
        </div>
      </div>
    </div></div><div class="rag" data-name="venue_minor_title" id="1" data-editor-trace="2" data-id="editor-rag-1"><div class="container" style="background-image: url(&quot;&quot;);">
        <span class="title" style="color: rgb(242, 206, 134); font-size: 0.472222rem;">
            <i class="before" style="background-color: rgb(242, 206, 134); width: 1.38889rem; left: -1.53704rem;"></i>
            <span class="ng-binding">饮食酒水</span>
            <i class="after" style="background-color: rgb(242, 206, 134); width: 1.38889rem; right: -1.53704rem;"></i>
        </span>
    </div></div><div class="rag" data-name="img" data-editor-trace="5" data-id="editor-rag-2"><div style="margin-top:7px;margin-bottom:7px;">
    <img style="width:100%;display:block;" src="https://shop.io.mi-img.com/app/shop/img?id=shop_9dabcd82fc8ebe6cb5aa70c23ff4edcb.jpeg&amp;w=1080&amp;h=576">
</div></div><div class="rag" data-name="venue_minor_title" id="2" data-editor-trace="6" data-id="editor-rag-3"><div class="container" style="background-image: url(&quot;&quot;);">
        <span class="title" style="color: rgb(242, 206, 134); font-size: 0.472222rem;">
            <i class="before" style="background-color: rgb(242, 206, 134); width: 1.38889rem; left: -1.53704rem;"></i>
            <span class="ng-binding">餐厨居家</span>
            <i class="after" style="background-color: rgb(242, 206, 134); width: 1.38889rem; right: -1.53704rem;"></i>
        </span>
    </div></div><div class="rag" data-name="img" data-editor-trace="7" data-id="editor-rag-4"><div style="margin-top:7px;margin-bottom:7px;">
    <img style="width:100%;display:block;" src="https:////img.youpin.mi-img.com/800_pic/9e3b18b8205f6e1b287cc528269b1f75.png@base@tag=imgScale&amp;w=1080&amp;h=576">
</div></div><div class="rag" data-name="venue_minor_title" id="3" data-editor-trace="8" data-id="editor-rag-5"><div class="container" style="background-image: url(&quot;&quot;);">
        <span class="title" style="color: rgb(242, 206, 134); font-size: 0.472222rem;">
            <i class="before" style="background-color: rgb(242, 206, 134); width: 1.38889rem; left: -1.53704rem;"></i>
            <span class="ng-binding">婴童智趣</span>
            <i class="after" style="background-color: rgb(242, 206, 134); width: 1.38889rem; right: -1.53704rem;"></i>
        </span>
    </div></div><div class="rag" data-name="img_nogap" data-editor-trace="9" data-id="editor-rag-6"><img style="width:100%;margin-top:0px;margin-bottom:0px;display:block;float: none;" src="https:////img.youpin.mi-img.com/800_pic/33fcc618d472bb6d9ee494c1ddb8c367.png@base@tag=imgScale&amp;w=528&amp;h=329"></div><div class="rag" data-name="venue_minor_title" id="4" data-editor-trace="10" data-id="editor-rag-7"><div class="container" style="background-image: url(&quot;&quot;);">
        <span class="title" style="color: rgb(242, 206, 134); font-size: 0.472222rem;">
            <i class="before" style="background-color: rgb(242, 206, 134); width: 1.38889rem; left: -1.53704rem;"></i>
            <span class="ng-binding">出行健康</span>
            <i class="after" style="background-color: rgb(242, 206, 134); width: 1.38889rem; right: -1.53704rem;"></i>
        </span>
    </div></div><div class="rag" data-name="img_nogap" data-editor-trace="11" data-id="editor-rag-8"><img style="width:100%;margin-top:0px;margin-bottom:0px;display:block;float: none;" src="https:////img.youpin.mi-img.com/800_pic/90998d3f641f2e290d4c9b85126f0311.png@base@tag=imgScale&amp;w=528&amp;h=329"></div><div class="rag" data-name="footer_navbar" data-editor-trace="12" data-id="editor-rag-9"><div class="footer-nav footer-nav-3 fixed-bottom-nav" style="background-color: rgb(255, 255, 255);">
    <div class="nav-content">
        <div class="nav-item" ng-onurl="https://home.mi.com/app/shop/content?id=uf8d6f039425cdb37">
            <img class="item-img" src="https://shop.io.mi-img.com/app/shop/img?id=shop_d78c8d4024bfe220b9f58e69e09a4aff.png&amp;w=36&amp;h=32">
            <span class="item-text ng-binding" style="color: rgb(153, 153, 153);">主会场</span>
        </div><div class="nav-item" ng-onurl="https://home.mi.com/app/shop/content?id=v9871103965ec79d7">
            <img class="item-img" src="https://shop.io.mi-img.com/app/shop/img?id=shop_14f4e5e0e8f76fcdbce9c2833e55aeb8.png&amp;w=36&amp;h=32">
            <span class="item-text ng-binding" style="color: rgb(153, 153, 153);">重磅爆品</span>
        </div><div class="nav-item" ng-onurl="https://home.mi.com/app/shop/content?id=r586b103900938774">
            <img class="item-img" src="https://shop.io.mi-img.com/app/shop/img?id=shop_6b002341db7db129c2a170f473435b07.png&amp;w=32&amp;h=30">
            <span class="item-text ng-binding" style="color: rgb(153, 153, 153);">所有会场</span>
        </div>
    </div>
</div></div>
</main></div>
<script type="text/javascript" src="//shop.io.mi-img.com/app/shop/pages/editor-static/js/zepto.min.js"></script> 
<script type="text/javascript" src="https://shop.io.mi-img.com/app/shop/pages/editor-static/js/iscroll5.2.0.min.js"></script>
<script type="text/javascript" src="//shop.io.mi-img.com/app/shop/pages/editor-static/js/page-output-lib.min.js?update=48"></script>
<script>
  (function () {      
    zeptoCbs.forEach(function(v){
      v();
    });
    if (ua&&ua.weixin && !isEditor) {
      $(".weixin-only").removeClass("weixin-only");
    }
    if (ua&&!ua.app && !isEditor) {
      $(".not-in-app").removeClass("not-in-app");
    }
  })();
</script>
<script>
  $(function(){window.publicAttribute = {};
    !(function() {
      const conditionHideMethod=args.insupport?'hide':'remove';
      const nowms=window.editorDate || Date.now();
      const now = nowms/1000;
      function conditionShow(selector,hide){
        if(hide){
          $rags.filter(selector).addClass("editor-removed")[conditionHideMethod]();
        }else{                    
          $rags.filter(selector).removeClass('hide');
        }
      }
      for (let i = 0; i < $rags.length; i++) {
        if ($rags.eq(i).hasClass('editor-removed')) {
          Array.prototype.splice.call($rags, i, 1);
          i--;
        }
      }      
    })();;

    window.editorGlobalConfig={};
    window.articleMode='mi';
    window.articleId='19465';
    window.articleModeTraceName='m1z1';
    window.spmPartB='0';
    const allModuleMap={
      'util':window.miHomeLib,
      'mi-home-lib':window.miHomeLib,
      'timers':window,
      'react':window.React,
      'prop-types':window.PropTypes
    };
    window.exportInfo = {
      user: 'lpan',
      articleId: '19465',
      time: '2019年1月16日 10:11:19'
    };
    !(function() {    
      window.traceInit&&window.traceInit();
    })();;

  (function () {
    var imgList = [];
    function markImages(){
      $('img[data-lazy-src]').each(function () {
        if(this.editorLazyMarked){
          return ;
        }
        this.editorLazyMarked=true;
        imgList.push($(this));
      });
    }
    markImages();
    setTimeout(function () {
      $window.scroll(onScroll);
      onScroll();
    }, 500);

    function reset1($img) {
      var lazySrc = $img.attr("data-lazy-src");
      if (!lazySrc) {
        return;
      }
      if (ua.android&&!/[&?]t=/.test(lazySrc)) {
        var img=new YoupinImg(lazySrc);
        img.setWebp();
        lazySrc=img.url;            
      }
      $img.attr("src", lazySrc).removeAttr("data-lazy-src").css("width", "100%").css("opacity", "1");
      var $rag = window.getRag($img);
      if ($rag && $rag.length && $rag[0].eventEmitter) {
        $rag[0].eventEmitter.emit("lazyload-reach");
      }
      setTimeout(function () {
        if ($img[0].complete) {                
          reset2($img);
        }
        $img.on("load", function () {                
          reset2($img);
        })
      });
    }

    function reset2($img) {
      setTimeout(() => {
        var height = parseInt($img[0].naturalHeight);
        if (height < 1) {
            //可能是懒加载的bug
            console.log("reset failed",$img.attr('src'));                
        }
        var $parent = $img.parent();

        if ($parent.hasClass('product-big-img-link') && $img.css('position') === 'absolute') {
            //nothing                
        } else {
            $parent.css("padding-top", "0").css("overflow", "visible");
            $img.css("position", "static");
        }
        if ($parent.hasClass('product-big-img-link')) {
            $parent.css("overflow", "hidden");
        }
      });
    }
    var $window = $(window);

    var timeout = setTimeout(doCheck, 900);

    function doCheck() {
        clearTimeout(timeout);
        if (imgList.length) {
            onScroll();
            timeout = setTimeout(doCheck, 400);
        }
    }
    window.eventEmitter.on('view-update', function () {
        markImages();
        doCheck();
    });
    function onScroll() {
          var top = $window.scrollTop();
          var windowHeight = $window.height();
          imgList = imgList.filter(function ($img, i, a) {
              var topThis = $img.offset().top;
              if (topThis < top + windowHeight * 2.3 && topThis > top - windowHeight * 1.5 && $img[0].offsetParent) {
                  reset1($img);
                  return false;
              } else {
                  return true;
              }
          });
      }
  })();

  $(".rag[data-name='article_page_header']").each(function () {
    var $dom = $(this);
    var $img = $dom.find(".wrap1>img");

    function showMask() {
      $dom.find(".wrap1>div").removeClass("hide");
    }
    if ($img[0].complete) {
      showMask();
    } else {
      $img.on("load", function () {
        showMask();
      })
    }
  });
  window.editorShowQrcode=true;;

  if ($(".rag[data-name='app_ad']").length == 0 && !isEditor) {
    $(".rag[data-name='editor_app_ad']").removeClass("hide");
  }
  function appendArg(arg){
    var value=args[arg];
    if(value){
      $("a").each(function(){
        var $dom=$(this);
        var href=$dom.attr("href");
        if(!href)
            return;
        if(href[0]==="#")
            return;
        if(href.match(/itunes.apple.com/)){
            return ;
        }
        if(href.indexOf(arg)!==-1){
            return;
        }
        if(href.match(/\?/)){
            href+=("&"+arg+"="+value);
        }else{
            href+=("?"+arg+"="+value);
        }
        $dom.attr("href",href);
      });
    }
  }
  appendArg("source");

  class Tools{
    constructor($dom,data){
      this.$rag=getRag($dom);
      this.$dom=$dom;
      this.pressCbArr=[];
      this.upperPressCbArr=[];
      this.$rag.on("tap",  () =>{
        this.upperPressCbArr.forEach(function (cb) {
          cb();
        });
      });
      this.$dom.on("tap",  () =>{
        this.pressCbArr.forEach(function (cb) {
          cb();
        });
      });
    }
    jump(link,replace){
      if(replace){
          location.replace(link);
      }else{
          location.href=link;
      }
    }
    onUpperPress(cb) {
        this.upperPressCbArr.push(cb);
    }

    onPress(cb) {
        this.pressCbArr.push(cb);
    }
    setInnerImage(src){
        this.$dom.css("background", "url(" + src + ") center center / contain no-repeat");
    }
    setImage(src){
      let $frontImg=this.$rag.find(".editor-front-img");
      if(!$frontImg.length){
          $frontImg=this.$rag.find("img");
      }
      $frontImg.setSrc(src);            
    }
  }

  let currentProcessingModule;
  let registerActionMap={};
  let thisModule;
  function registerAction(func){
      registerActionMap[currentProcessingModule]=func;
  } 
  window.registerActionMap=registerActionMap;
  window.allModuleMap=allModuleMap;
  function require(str) {
      if (allModuleMap[str]) {
          return allModuleMap[str];
      }
      console.warn("(web)Can't find module",str);
      return undefined; //if not founded
  }
  currentProcessingModule='/cloud/module/scroll_nav/scroll_nav.action.js'
  ;(function () {
    const module = {type:'resource'};
    (function (require, module) {
      const {eventEmitter,ua}=require('util');
      module.exports = class {
        constructor(props, id) {
            const that = this;
            const $dom = $(`[data-id=${id}]`);
            const $$ = $dom.find.bind($dom);
            $dom.css({
                'min-height':'65px'
            });
            this.$$ = $$;
            this.$dom = $dom;
            this.props = props;
            this.onPulling = false;
            $$('.item').on('tap', (e) => {
                this.scrollTouch(e);
            });
            $$('.pull_item_wrap').on('click', (e) => {
                this.scrollTouch(e);
            });
            $$('.pull_more,.pull_div_arr').on('tap', function() {
                if(!that.onPulling ) {
                    that.onPulling = true;
                    setTimeout(()=>{
                        that.onPulling = false;
                    },300);
                    that.pullOrpushNav($(this),that);
                }
            });
            this.render();
            if (!ua.pc) {
                $dom.find('.wrap').addClass('hide-scrollbar');
            }
            eventEmitter.on('view-update', this.setUpTargetList.bind(this));
            $dom[0].addEventListener('touchmove', (e) => { e.preventDefault(); }, false);
        }
        scrollTouch(e) {
            const $target = $(e.target);
            if ($target.prop('tagName') === 'A') {
                this.onTap($target);
                this.$$('.pull_div').animate({
                    display:'none'
                });
                this.$$('.scroll_cont').show();
                e.preventDefault();
            }
        }
        pullOrpushNav(e,$this) {
            const className = e.attr('class');
            const pullState = $this.$$('.pull_div').css('display');
            if(className.indexOf('onpull')>0 && pullState == 'none') {
                $this.$$('.more_img').animate({
                    rotate:'180deg'
                });
                $this.$$('.scroll_cont').hide();
                $this.$$('.pull_div').animate({
                    display:'block'
                });
            }else {
                $this.$$('.more_img').animate({
                    rotate:'180deg'
                });
                $this.$$('.scroll_cont').show();
                $this.$$('.pull_div').animate({
                    display:'none'
                });
            }
        }

        active($dom) {
            const baseWidth = $('#rags-container').width();
            const offset = $dom.offset();
            this.iscroll && this.iscroll.scrollToElement($dom[0], 700, 0 - baseWidth / 2 + offset.width / 2);
            $dom.css({
                color: this.props.colorHighlightText,
                borderBottom: '2px solid ' + this.props.colorHighlightText,
            });
            const a_arr = this.$dom.find('a');
            this.$dom.find('.splitter').remove();
            a_arr.forEach((dom, i) => {
                const isNextSelected = a_arr[i + 1] === $dom[0];
                const isSelected = dom === $dom[0];
                if (i !== a_arr.length - 1 && !isNextSelected && !isSelected) {
                    $(dom).parent().append(`<div class="splitter" style="background-color:${this.props.colorText};"></div>`);
                }
            });

        }
        inactive($dom) {
            $dom.css({
                color: this.props.colorText,
                borderBottom: 'none'
            });
        }
        show() {
            if (!this.iscroll) {
                setTimeout(() => {
                    this.iscroll = new window.IScroll($(this.$dom[0]).find('.scroll_cont')[0], {
                        mouseWheel: true,

                        tap: true,
                        scrollX: true,
                        scrollY: false,
                    });
                }, 200);
            }
        }
        setUpTargetList() {
            this.targetList = [];
            this.props.arr.forEach(({ id }) => {
                const $dom = $(`#${id}`);
                this.targetList.push({ $dom });
            });
        }
        render() {
            const $window = $(window);
            let dirty = true;
            $window.on("scroll", () => {
                onScroll();

            });
            this.setUpTargetList();
            this.show();
            const onScroll = () => {
                let areas = [];
                let pageScroll = $window.scrollTop();
                if(pageScroll >= this.$dom.offset().top + 10) {
                    this.$dom.find('.scroll-nav-root').css('padding','0');
                    this.$dom.find('.scroll_cont').addClass("nav_fixed").removeClass("nav_common").show();
                    this.$dom.find('.pull_div').addClass("pull_div_fixed").removeClass("pull_div_common").animate({
                        display:'none'
                    });
                }else {
                    this.$dom.find('.scroll_cont').addClass("nav_common").removeClass('nav_fixed');
                    this.$dom.find('.pull_div').addClass("pull_div_common").removeClass("pull_div_fixed");
                    this.$dom.find('.scroll-nav-root').css('padding','0 6px');
                }
                this.targetList.forEach(({ $dom }, i) => {
                    const offset = $dom.offset();
                    if (!offset) {
                        return;
                    }
                    const topThis = offset.top;
                    areas[i] = topThis;
                });

                areas = areas.map((start, i) => {
                    let end = Infinity;
                    areas.forEach((startThis, j) => {
                        if (i === j) {
                            return;
                        }
                        if (startThis > start && startThis < end) {
                            end = startThis;
                        }
                    });
                    return [start - 43, end - 43];
                });
                let targetIndex = 0;
                areas.some(([start, end], i) => {
                    if (pageScroll >= start && pageScroll < end) {
                        targetIndex = i;
                        return true;
                    }
                });

                const that = this;
                if (targetIndex !== this.activeIndex) {
                    this.$dom.find('.wrap').find(`[data-href]`).each(function (i) {
                        const $dom = $(this);
                        if (i === targetIndex) {
                            that.active($dom);
                            $('.pull_div .pull_'+i).css({
                                color:that.props.colorHighlightText,
                                borderBottom: '2px solid ' + that.props.colorHighlightText
                            })
                        } else {
                            that.inactive($dom);
                            $('.pull_div .pull_'+i).css({
                                color:that.props.colorText,
                                borderBottom: 'none'
                            })
                        }
                    });
                    that.activeIndex = targetIndex;
                }
            };
            setTimeout(()=>{
                onScroll();
            },100);






        }
        onTap($btn) {
            let href = $btn.data("href");
            if (!href) {
                return;
            }
            if (href[0] !== "#") {
                return;
            }
            href = href.replace(/^##/, '#');
            const $target = $(href);
            if (!$target.length) {
                if (window.superLongOptimize) {
                    window.superLongOptimize.quickenTo(href).then(($dom) => {
                        this.doScroll($dom, $btn);
                    }).catch(() => {});
                }
                return;
            } else {
                this.doScroll($target, $btn);
            }
        }
        doScroll($target, $btn) {
          const top = $target.offset().top;
          setTimeout(() => {

              let scrollTo = top;
              $(window).scrollTop(scrollTo -39);
          });
          const that = this;
          this.$dom.find('.wrap').find(`[data-href]`).each(function (i) {
                const $domThis = $(this);
                if ($domThis[0] === $btn[0]) {
                    that.active($domThis, {
                        preventCheckingScroll: true,
                    });
                    $('.pull_div .pull_'+i).css({
                        color:that.props.colorHighlightText,
                        borderBottom: '2px solid ' + that.props.colorHighlightText
                    });
                    that.activeIndex = i;
                } else {
                    that.inactive($domThis);
                    $('.pull_div .pull_'+i).css({
                        color:that.props.colorText,
                        borderBottom: 'none'
                    })
                }
            });
        }
      };;
    })(require, module);
    if(module.exports){         
      allModuleMap['/cloud/module/scroll_nav/scroll_nav.action.js']=module.exports;           
    }       
  })();
  currentProcessingModule='/cloud/module/footer_navbar/footer_navbar.action.js'
  ;(function () {
    const module = {type:'resource'};
    (function (require, module) {
      const {Rag}=require("mi-home-lib");
      module.exports = class extends Rag {
        constructor(...args) {
            super(...args);
            const $this = this;
            const tabs = args[0].tabs;
            let selIndex = -1;
            $("#wrap").addClass("wrap-bottom");
            $(".wrap-bottom").css("padding-bottom","60px");
            setTimeout(()=>{
                $(".editior-toolbox-wrap").css('bottom','70px');
            },1000);
            tabs.forEach((res,index)=>{
                if(location.href.startsWith(res.href)) {
                    selIndex = index;
                }
            });
            if(selIndex > -1) {
                const $sel = $(this.$$('.nav-item')[selIndex]);
                $sel.find('.item-img').attr('src',tabs[selIndex].activeImg);
                $sel.find('.item-text').css('color',args[0].active_color);
            }
            this.$$('.fixed-bottom-nav').css('display','block');
            this.$$('.nav-content').on('click','.nav-item', function(){
                const url = $(this).attr('ng-onurl');
                if(!location.href.startsWith(url)) {
                    jumpTo(url, {
                        $dom: $this.$dom
                    });
                }
            });

        }
      };;
    })(require, module);
    if(module.exports){         
      allModuleMap['/cloud/module/footer_navbar/footer_navbar.action.js']=module.exports;           
    }       
  })();;
  $('[data-id="editor-rag-0"]').length && new allModuleMap['/cloud/module/scroll_nav/scroll_nav.action.js']({colorHighlightText:"#9e0044",colorText:"#666",arr:[{id:"1",text:"饮食酒水"},{id:"2",text:"餐厨居家"},{id:"3",text:"婴童智趣"},{id:"4",text:"出行健康"}]},"editor-rag-0");;
  $('[data-id="editor-rag-9"]').length && new allModuleMap['/cloud/module/footer_navbar/footer_navbar.action.js']({background_color:"#ffffff",active_color:"#666666",fll_active_color:"#999999",tabs:[{title:"主会场",activeImg:"https://shop.io.mi-img.com/app/shop/img?id=shop_38029e20ea6e1cdf7b96d69cc10097ff.png&w=35&h=33",inactiveImg:"https://shop.io.mi-img.com/app/shop/img?id=shop_d78c8d4024bfe220b9f58e69e09a4aff.png&w=36&h=32",href:"https://home.mi.com/app/shop/content?id=uf8d6f039425cdb37"},{title:"重磅爆品",activeImg:"https://shop.io.mi-img.com/app/shop/img?id=shop_3ee820f6a4948ec1b1ef9ea49ad32776.png&w=36&h=33",inactiveImg:"https://shop.io.mi-img.com/app/shop/img?id=shop_14f4e5e0e8f76fcdbce9c2833e55aeb8.png&w=36&h=32",href:"https://home.mi.com/app/shop/content?id=v9871103965ec79d7"},{title:"所有会场",activeImg:"https://shop.io.mi-img.com/app/shop/img?id=shop_8be49d8c8fdcb2350b39dd63fc3c7b17.png&w=33&h=30",inactiveImg:"https://shop.io.mi-img.com/app/shop/img?id=shop_6b002341db7db129c2a170f473435b07.png&w=32&h=30",href:"https://home.mi.com/app/shop/content?id=r586b103900938774"}]},"editor-rag-9");;
  })
</script>
</body>
</html>
```
