(function(){"use strict";var n={3:function(n,t,r){var e=r(7195),o=function(){var n=this,t=n._self._c;return t("div",{staticClass:"home-view"},[t("p",{staticClass:"p"},[n._v("外层组件")]),t("HelloWorld",{attrs:{msg:"Hello World!"}}),t("SigleItem"),t("div",[t("button",{staticClass:"button",on:{click:n.handleClick}},[n._v("这是外部组件点击Crash")]),t("span",{staticClass:"counter"},[n._v(n._s(n.counter>0?n.counter.data.n:n.counter))])])],1)},i=[],u=function(){var n=this,t=n._self._c;return t("div",{staticClass:"hello"},[t("h1",[n._v(n._s(n.msg))]),t("h3",[n._v(" 这是一个单独的组件 ")])])},a=[],c={name:"HelloWorld",props:{msg:String}},s=c,l=r(1001),f=(0,l.Z)(s,u,a,!1,null,"688c0a7f",null),p=f.exports,v=function(){var n=this,t=n._self._c;return t("div",{staticClass:"sigle-item"},[t("h3",[n._v(" 这是一个单独的组件 ")]),t("div",[t("button",{staticClass:"button",on:{click:n.handleClick}},[n._v("点击Crash")]),t("span",{staticClass:"counter"},[n._v(n._s(n.params.counter>0?n.params.data.counter:n.params.counter))])])])},d=[],h={name:"HelloWorld",props:{},data:function(){return{counter:0,params:{counter:0}}},methods:{handleClick(){this.counter++,this.params.counter++}}},m=h,g=(0,l.Z)(m,v,d,!1,null,"085fa0b8",null),_=g.exports,b={name:"App",components:{HelloWorld:p,SigleItem:_},data:function(){return{counter:0}},methods:{handleClick(){this.counter++}}},C=b,w=(0,l.Z)(C,o,i,!1,null,null,null),k=w.exports;e.ZP.config.productionTip=!1,new e.ZP({render:n=>n(k)}).$mount("#app"),e.ZP.config.errorHandler=function(n,t,r){console.log("err:",n,t,r),window.postMessage({type:"vue2errorhandler",data:{error:n}},"*")}}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return n[e](i,i.exports,r),i.exports}r.m=n,function(){var n=[];r.O=function(t,e,o,i){if(!e){var u=1/0;for(l=0;l<n.length;l++){e=n[l][0],o=n[l][1],i=n[l][2];for(var a=!0,c=0;c<e.length;c++)(!1&i||u>=i)&&Object.keys(r.O).every((function(n){return r.O[n](e[c])}))?e.splice(c--,1):(a=!1,i<u&&(u=i));if(a){n.splice(l--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var l=n.length;l>0&&n[l-1][2]>i;l--)n[l]=n[l-1];n[l]=[e,o,i]}}(),function(){r.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return r.d(t,{a:t}),t}}(),function(){r.d=function(n,t){for(var e in t)r.o(t,e)&&!r.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){var n={143:0};r.O.j=function(t){return 0===n[t]};var t=function(t,e){var o,i,u=e[0],a=e[1],c=e[2],s=0;if(u.some((function(t){return 0!==n[t]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(c)var l=c(r)}for(t&&t(e);s<u.length;s++)i=u[s],r.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return r.O(l)},e=self["webpackChunkvue2project"]=self["webpackChunkvue2project"]||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))}();var e=r.O(void 0,[998],(function(){return r(3)}));e=r.O(e)})();
//# sourceMappingURL=app.5766b5ad.js.map