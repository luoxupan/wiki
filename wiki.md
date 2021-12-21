当然可以啊。比赛不限年龄学历的，比较常见的竞赛网站天池，aistudio，kaggle。拿个第一名基本都是五六万起步

```js
// 以下是最终得到的数据结构
[
  {
    type: 'select', // array, object, input, radio, select, textarea ...
    subType: '',
    name: 'filed_name', // 字段名字
    label: '字段名字',
    label_en: '字段名字',
    required: true,
    dataSource: {
      type: '',
      enum: [],
      dictUrl: '',
    },
    items: []
  },
  {
    type: 'array',
    name: 'filed_name',
    label: '字段名字',
    label_en: '字段名字',
    required: true,
    items: [
      {
        type: 'input',
        name: 'filed_name',
        label: '字段名字',
        label_en: '字段名字',
        required: true,
        items: [
          {
            type: 'input',
            name: 'filed_name',
            label: '字段名字',
            label_en: '字段名字',
            required: true,
            items: []
          },
        ]
      },
    ]
  },
  {
    type: 'object',
    name: 'filed_name',
    label: '字段名字',
    label_en: '字段名字',
    required: true,
    items: [
      {
        type: 'input',
        name: 'filed_name',
        label: '字段名字',
        label_en: '字段名字',
        required: true,
        items: []
      },
    ]
  },
]
```

```js
window.addEventListener('hashchange', (event) => {
  console.log('event:', event);
});
```
### 数组拍平

```js
function flat(arr) {
  let ret = [];
  for (let i = 0; i < arr.length; ++i) {
    if (Array.isArray(arr[i])) {
      let data = flat(arr[i]);
      ret.push(...data);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
};
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
console.log(flat(arr));
```
支持深度
```js
function flat(arr, d = 1) {
  if (d <= 0) {
    return arr.slice();
  }
  let ret = [];
  for (let i = 0; i < arr.length; ++i) {
    if (Array.isArray(arr[i])) {
      let data = flat(arr[i], d - 1);
      ret.push(...data);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
};
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
console.log(flat(arr));
```

### useState倒计时
```js
function Count() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    console.log('========2')
    this.timer = setInterval(() => {
      setCount(count + 1)
    }, 1000);
    return () => {
      clearInterval(this.timer);
    }
  }, []);
  console.log('========1')
  return (
    <div>{count}</div>
  );
}
```
```js
// 原理：相当于函数传参
var count = 1;
function log() {
  var num = count; // 相当于hook的useState
  setTimeout(() => {
    console.log(num);
  }, 3000);
}
log();
count = 10;
log();
```

### hooks模拟 this.setState(value, () => {}) [链接](https://github.com/luoxupan/wiki/blob/master/issues/reactjs%20%E6%8A%80%E6%9C%AF%E7%82%B9.md#hooks%E6%A8%A1%E6%8B%9Fsetstatestatechange-callback%E7%9A%84callback)

### add(1, 2); add(1)(2);
```js
function add() {
  var args = [...arguments];
  var func = function() {
    args = [...args, ...arguments];
    return func;
  }
  func.toString = () => args.reduce((x, y) => x + y)
  return func;
}
console.log(add(1,2)); // 3
console.log(add(1)(2)); // 3
console.log(add(1)(2)(3)); // 6
console.log(add(1,2,3)(4)); // 10
```

### 深拷贝
```js
function deepCopy(data) {
  var ret = data;
  if (Array.isArray(data)) {
    ret = [];
    data.forEach((item) => ret.push(deepCopy(item)));
  }
  if (Object.prototype.toString.call(data) === '[object Object]') {
    ret = {};
    Object.keys(data).forEach(key => ret[key] = deepCopy(data[key]));
  }
  return ret;
}
```

### 事件代理
```js
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
```

### rem自适应方案初始化代码
```js
(function() {
  var
    docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    scale = 1 / window.devicePixelRatio,
    recalc = function() {
      var uiWidth = 1080; // 设计稿的尺寸是1080
      var clientWidth = docEl.clientWidth;

      docEl.style.fontSize = 100 * (clientWidth / uiWidth) + 'px'; // 分成100等份
    };
    // 下面是根据设备像素设置viewport
  document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable = no, shrink-to-fit=no');

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
})();
```
### rem布局中，1px像素处理: https://www.cnblogs.com/sonechao/p/14822241.html

### 正则匹配替换
```js
// 正则匹配替换
function tranformMsg(string, keyword) {
  // var reg = /@\w+/g;
  var reg = new RegExp(`(@\\w+_${keyword}|@\\w+)`, 'g');
  var regReplaceFunc = function (match) {
    return `<a href='https://ddp.com/profile/${match}'>${match}</a>`
  };
  return string.replaceAll(reg, regReplaceFunc);
}
tranformMsg('@sds_4353ff_把九点半@nihao 第三方不仅是对', '把');
```

### webpack打包产物
```js
(function (modules) {
  var installedModules = {};
  function require(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, require);
    module.l = true;
    return module.exports;
  }
  return require("./src/index.js");
})({
  "./src/a.js": function (module, require) {
    let b = require("./src/base/b.js")
    module.exports = 'a'+ b;
  },
  "./src/base/b.js": function (module) {
    module.exports = 'b';
  },
  "./src/index.js": function (module, require) {
    let str = require("./src/a.js")
    console.log(str);
  }
})
```

### 归并排序
```js
/**
 * 
 * @param {*} array 
 * @param {*} left 
 * @param {*} right 
 * @param {*} temp 
 * 归并排序的实现
 */
 function mergesort(array, left, right) {
  if (left < right) {
    var mid = Math.floor((left + right) / 2);
    mergesort(array, left, mid); // 左边有序
    mergesort(array, mid + 1, right); // 右边有序
    mergearray(array, left, mid, right); // 再将二个有序数列合并
  }
}
// 将有二个有序数列array[left...mid]和array[mid...right]合并。
function mergearray(array, left, mid, right) {
  var i = left;
  var j = mid + 1;
  var p = 0;
  var temp = [];
  while (i <= mid && j <= right) {
    if (array[i] <= array[j]) {
      temp[p++] = array[i++];
    } else {
      temp[p++] = array[j++];
    }
  }
  while (i <= mid) {
    temp[p++] = array[i++];
  }
  while (j <= right) {
    temp[p++] = array[j++];
  }
  for (i = 0; i < p; i++) {
    array[left + i] = temp[i];
  }
}
// 测试用例
var array = [7,5,6,4];
mergesort(array, 0, array.length - 1)
console.log(array); // [ 4, 5, 6, 7 ]
```

### Promise.all
```js
Promise.prototype.all = function(args) {
  let index = 0
  const res = []
  return new Promise((resolve, reject) => {
    const n = args.length
    if (n === 0) {
      resolve([]);
    } else {
      for (let i = 0; i < n; i++) {
        // 用Promise.resolve是考虑到参数可能是一个非Promise的变量
        Promise.resolve(args[i]).then(
          (value) => {
            res[i] = value;
            if (++index === n) {
              resolve(res);
            }
          },
          (reason) => {
            reject(reason)
          },
        )
      }
    }
  })
}
```

### Promise.finally
```js
Promise.prototype.finally = function(onDone) {
  if (typeof onDone !== 'function') return this.then();
  let Promise = this.constructor;
  return this.then(
    value => Promise.resolve(onDone()).then(() => value),
    reason => Promise.resolve(onDone()).then(() => { throw reason })
  );
}

Promise.resolve(4).finally(() => {
  console.log('finally')
}).then((v) => {
  console.log(v); // 4
});

new Promise((resolve, reject) => {
  resolve(4);
}).then((v) => {
  console.log(v);
});

try {
  Promise.reject().then(() => {
    console.log('======');
    return Promise.resolve(3)
  }).catch(() => {
    console.log('===catch===');
  })
} catch (error) {
  console.log('error:', error);
}
```

### 节流(throttle)：在n秒内只执行一次func
```js
// 节流：在n秒内只执行一次func, 前置执行。
// 应用场景：搜索框联想功能，表单重复提交，滚动加载-适用于触发之后内容不再变化
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
```
### 防抖(debounce): 在n秒内执行最后一次func
```js
// 防抖: 在n秒内执行最后一次func,后置执行。
// 应用场景：手机号邮箱等输入检测，搜索框输入完执行最后一次搜索，鼠标移动-适用于用户输入完整的内容后执行
function debounce(fn, delay) {
  var timer;
  return function () {
    var self = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(self, args);
    }, delay);
  };
}
```
### bind
```js
Function.prototype.bind2 = function(context) {
  var args = [...arguments];
  var _this = this;
  return function() {
    _this.apply(context, [...args.slice(1), ...arguments]);
  }
}
```
### call
```js
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;
  let args = [...arguments].slice(1);
  let res = context.fn(...args);
  delete context.fn;
  return res;
}
```
### instanceof
```js
function instance_of(left, right) {
  let rightProto = right.prototype; // 取右表达式的 prototype 值
  left = left.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (left === null) {
      return false;
    }
    if (left === rightProto) {
      return true;
    }
    left = left.__proto__;
  }
}
// 原理 也就是说__proto__指向的是被实例（构造函数）的那个prototype
function Func() {
}
var func = new Func();
func.__proto__ === Func.prototype; // true
```
### new
```js
// new操作符都做了什么
// 四大步骤：
// 1、创建一个空对象，并且 this 变量引用该对象，// lat target = {};
// 2、继承了函数的原型。// target.proto = func.prototype;
// 3、属性和方法被加入到 this 引用的对象中。并执行了该函数func// func.call(target);
// 4、新创建的对象由 this 所引用，并且最后隐式的返回 this 。// 如果func.call(target)返回的res是个对象或者function 就返回它
function new(func) {
  let target = {};
  target.__proto__ = func.prototype;
  let res = func.call(target);
  if (typeof(res) == "object" || typeof(res) == "function") {
    return res;
  }
  return target;
}
```
### asyncPool
```js
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}
// 运行
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
const results = await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
```

```js
function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = [];
  const enqueue = function() {
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++];
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    let r = Promise.resolve();

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        r = Promise.race(executing);
      }
    }

    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}
// 运行
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
return asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
  ...
});
```
### 连续子数组的和最大和
```js
/**
 * @param {number[]} nums
 * @return {number}
 * 连续子数组的和最大和
 */
 var maxSubArray = function(nums) {
  var sum = nums[0];
  var max = nums[0];
  for (var i = 1; i < nums.length; ++i) {
    sum += nums[i];
    if (sum < nums[i]) {
      sum = nums[i];
    }
    max = Math.max(max, sum)
  }
  return max;
};
```

```js
function maxSubNum(nums) {
  // 求数组非连续子序列的最大和
  nums[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; ++i) {
    nums[i] = Math.max(Math.max(nums[i], nums[i - 1]), nums[i] + nums[i - 2]);
  }
  return nums[nums.length - 1];
}
maxSubNum([2,-3,3,50]);
```

```js
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
```
### 字符串相加
```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 * 字符串相加
 */
 var addStrings = function(num1, num2) {
  var array = [];
  var i = num1.length - 1;
  var j = num2.length - 1;
  var cur = 0;
  while (i >= 0 || j >= 0 || cur > 0) {
    if (i >= 0) {
      cur += parseInt(num1[i--]);
    }
    if (j >= 0) {
      cur += parseInt(num2[j--]);
    }
    array.unshift(cur % 10);
    cur = Math.floor(cur / 10);
  }
  return array.join('');
};
```

### React.lazy
```js
function LoadPage(loader: any) {
  const Com = React.lazy(loader);
  // 已经Resolved了（已经加载完毕）则直接返回,否则将通过 throw 将 thenable 抛出到上层
  const Loading = (
    <Spin />
  );
  return props => (
    // 如果 thenable 处于 pending 状态，则会将其 children 都渲染成 fallback 的值，
    // 一旦 thenable 被 resolve 则 SuspenseComponent 的子组件会重新渲染一次。
    <React.Suspense fallback={Loading}>
      <Com {...props}></Com>
    </React.Suspense>
  );
}
// 使用方式
LoadPage(() => import('src/app.tsx'));
```
### React.lazy原理

[需整理](https://github.com/liyongning/webpack-bundle-analysis)

1. `React.lazy`：[React.lazy源代码](https://github.com/facebook/react/blob/main/packages/react/src/ReactLazy.js#L121)
    1. 如果组件已经加载完成（`payload._status === Resolved`）直接返回`return payload._result;`
    2. 如果组件未加载，`import('src/app.tsx');`加载文件，然后`throw payload._result`（叫thenable是Promise）
    3. 加载完成后将`resolved._result = defaultExport;`结果缓存起来, `resolved._status = Resolved;`
2. `React.Suspense`：
    1. 如果`React.lazy`已经加载，直接渲染返回的组件
    2. 如果组件未加载，`React.lazy`抛出thenable，渲染fallback，resolved后渲染组件


[import()懒加载例子](https://luoxupan.github.io/wiki/pages/page02/index.html)

`LoadPage(() => import('src/app.tsx'));`会被webpack编译成如下代码
```js
LoadPage(function() {
  return Promise.all([
    __webpack_require__.e(0),  /*! import() | layout_app */
    __webpack_require__.e("layout_app"),
  ]).then(__webpack_require__.bind(null, "./src/pages/app/app.tsx"));
});
```
`import('src/app.tsx')`会被单独打成一个chunks文件`http://xxx.com/assets/js/chunks/layout_app_c25913c2.js`, 文件内容类似如下
```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout_app"], {
  "./src/pages/app/app.tsx":
  /*!*******************************!*\
    !*** ./src/pages/app/app.tsx ***!
    \*******************************/
  /*! exports provided: default */
  /***/
  (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "default", function() {
      return App;
    });
    function App(props) {
      var _this = this;
      return (
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: 'head-portrait'
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
          src: 'https://img0.didiglobal.com/static/gstar/img/XvsRAxSaPb1617940385585.png'
        }))
      );
    }
  }),
}]);
```

### setState更新
```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    } as any;
  }
  componentDidMount() {
    this.setState({
      count: this.state.count + 1
    });
    console.log(this.state.count)
    this.setState({
      count: this.state.count + 1
    });
    console.log(this.state.count)
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1
      });
      console.log(this.state.count)
      this.setState({
        count: this.state.count + 1
      });
      console.log(this.state.count)
    })
  }
  render() {
    console.log('this.state.count:', this.state.count)
    return <h1>Hello, {this.state.count}</h1>;
  }
}
```

```js
Object.prototype.a = () => console.log('a')
Function.prototype.b = () => console.log('b')
function Func() {
  console.log('c')
}
Func.b(); // b
(new Func()).a(); // c a
(new Func()).b(); // c 报错
```

### flex:1; 具体是什么 [链接](https://github.com/luoxupan/wiki/blob/master/issues/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9.md#flex%E5%B8%83%E5%B1%80)

### 事件机制 [链接](https://github.com/luoxupan/wiki/blob/master/issues/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9.md#%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6)

### padding: 100%; 指的是多高 [链接](https://github.com/luoxupan/wiki/blob/master/issues/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9.md#margin-padding-%E8%B5%8B%E5%80%BC%E4%B8%BA%E7%99%BE%E5%88%86%E6%AF%94%E7%9A%84%E6%97%B6%E5%80%99%E6%98%AF%E6%8C%89%E7%88%B6%E5%85%83%E7%B4%A0%E7%9A%84width%E4%B8%BA%E5%8F%82%E7%85%A7%E7%89%A9)

### ES5的继承和ES6的继承有什么区别？
参考答案
1. ES5的继承时通过prototype或构造函数机制来实现。ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）。
2. ES6的继承机制完全不同，实质上是先创建父类的实例对象this（所以必须先调用父类的super()方法），然后再用子类的构造函数修改this。
3. 具体的：ES6通过class关键字定义类，里面有构造方法，类之间通过extends关键字实现继承。
   - 子类必须在constructor方法中调用super方法，否则新建实例报错。因为子类没有自己的this对象，
   - 而是继承了父类的this对象，然后对其进行加工。如果不调用super方法，子类得不到this对象。
4. ps：super关键字指代父类的实例，即父类的this对象。在子类构造函数中，调用super后，才可使用this关键字，否则报错。


### TCP三次握手和四次挥手
参考答案

三次握手之所以是三次是保证client和server均让对方知道自己的接收和发送能力没问题而保证的最小次数。
1. 第一次client => server 只能server判断出client具备发送能力
2. 第二次 server => client client就可以判断出server具备发送和接受能力。此时client还需让server知道自己接收能力没问题于是就有了第三次
3. 第三次 client => server 双方均保证了自己的接收和发送能力没有问题。其中，为了保证后续的握手是为了应答上一个握手，每次握手都会带一个标识 seq，后续的ACK都会对这个seq进行加一来进行确认。


### webpack构建流程（原理）
从启动构建到输出结果一系列过程：
1. 初始化参数：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数，形成最后的配置结果。
2. 开始编译：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译。
3. 确定入口：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去。
4. 编译模块：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译并输出：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry配置生成代码块chunk。
6. 输出完成：输出所有的chunk到文件系统。

**注意：** 在构建生命周期中有一系列插件在做合适的时机做合适事情，比如UglifyPlugin会在loader转换递归完对结果使用UglifyJs压缩覆盖之前的结果。

### loader和plugin的不同
- 作用不同：
  1. loader让webpack有加载和解析非js的能力；
  2. plugin可以扩展webpack功能，在webpack运行周期中会广播很多事件，Plugin可以监听一些事件，通过webpack的api改变结果。
- 用法不同：
  1. loader在module.rule中配置。类型为数组，每一项都是Object；
  2. plugin是单独配置的，类型为数组，每一项都是plugin实例，参数通过构造函数传入。

### webpack的热更新原理
1. 浏览器端和服务端有 websocket 长连接
2. webpack监听源文件的变化，即当开发者保存文件时触发webpack的重新编译。
   - 每次编译都会生成hash值、已改动模块的json文件、已改动模块代码的js文件
   - 编译完成后通过socket通知客户端文件有变动
3. 通过ajax获取json数据和script标签获取最新js资源

webpack打包优化
1. happypack多线程打包
2. splitChunks.cacheGroups将功能库打成一个包（antd...）
3. loader配置对应的include、exclude

Tree Shaking 哪些情况下不会生效
1. 只有在ES Module中才会生效
2. CommonJS

webpack chunk
文件内容没改变单身hash值改变了 https://juejin.cn/post/6844903942384517127

webpack打包成es modal的时候 最后是怎么执行的
1. 最后都是CommonJS
webpack循环引用配置
webpack有哪些事件


### setTimeout 后面的时间指的是什么意思？

函数 setTimeout 接受两个参数：待加入队列的消息和一个时间值（可选，默认为 0）。
这个时间值代表了消息被实际加入到队列的最小延迟时间

### 事件循环机制
1. 由于JavaScript是单线程
2. JavaScript代码执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。
3. 任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。
4. macro-task大概包括: script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
5. micro-task大概包括: process.nextTick, Promise, Object.observe(已废弃), MutationObserver(html5新特性)
6. setTimeout/Promise等我们称之为任务源。来自不同任务源的任务会进入到不同的任务队列，而进入任务队列的是他们指定的具体执行任务。
7. **evenloop执行顺序**
   - 宏任务：DOM渲染后触发，如setTimeout
   - 微任务：DOM渲染前触发，如Promise
  
### CommonJS 和 ES6 中模块引入的区别？
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJs 是单个值导出，ES6 Module可以导出多个
4. CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层

### 对称加密：加密解密都是同一把秘钥
优点：算法简单，加密解密容易，效率高，执行快。
缺点：相对来说不算特别安全，只有一把钥匙，密文如果被拦截，且密钥也被劫持，那么，信息很容易被破译。

### 非对称加密：
优点：安全，即使密文被拦截、公钥被获取，但是无法获取到私钥，也就无法破译密文。作为接收方，务必要保管好自己的密钥。
缺点：加密算法及其复杂，安全性依赖算法与密钥，而且加密和解密效率很低。

### 请解释一下 CSS3 的 Flex box（弹性盒布局模型），以及适用场景

flex布局是CSS3新增的一种布局方式，我们可以通过将一个元素的display属性值设置为flex从而使它成为一个flex
容器，它的所有子元素都会成为它的项目。

一个容器默认有两条轴，一个是水平的主轴，一个是与主轴垂直的交叉轴。我们可以使用flex-direction来指定主轴的方向。
我们可以使用justify-content来指定元素在主轴上的排列方式，使用align-items来指定元素在交叉轴上的排列方式。还
可以使用flex-wrap来规定当一行排列不下时的换行方式。

对于容器中的项目，我们可以使用order属性来指定项目的排列顺序，还可以使用flex-grow来指定当排列空间有剩余的时候，
项目的放大比例。还可以使用flex-shrink来指定当排列空间不足时，项目的缩小比例。

### 闭包
```js
var name = "The Window";
var object = {
  name : "My Object",
  getNameFunc : function(){
    return function(){
      return this.name;
    };
  }
};
alert(object.getNameFunc()()); // result:The Window
```
this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window，而当函数被作为某个对象调用时，this等于那个对象。不过，匿名函数具有全局性，因此this对象通常指向window。


### 图片之间的缝隙: [链接]()
   - 原因：是行内元素之间的回车符系统默认为一个空格，占据了一定宽度
   - 深入原因：vertical-align默认的对齐方式是baseline。
**如何消除:**
1. 父元素设置font-size: 0;
2. img标签设置display: block;
3. img标签设置vertical-align: bottom;

### async await原理
1. async 函数是 Generator 函数的语法糖。
2. async 返回值是 Promise。比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用
3. 更好的语义。async 和 await 相较于 * 和 yield 更加语义化

### CORB [链接](https://github.com/luoxupan/wiki/blob/master/issues/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9.md#corb)

### 前端性能优化
1. CDN（回源机制，如何判断回源）
2. 图片懒加载
3. PNG图片压缩大小
4. 搜索框节流（throttle）处理
5. splitChunks提取公共第三⽅库
6. Tree Shaking
6. 代码压缩

### react合成事件特点
1. React 上注册的事件最终会绑定在document这个 DOM 上，
  而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
2. React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation() 无效的原因。
3. React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
4. React 有一套自己的合成事件 SyntheticEvent，不是原生的，这个可以自己去看官网
5. React 通过对象池的形式管理合成事件对象的创建和销毁，减少了垃圾的生成和新对象内存的分配，提高了性能

### vue和react差异和相同点(优缺点)
1. 都是解决UI和状态同步问题 组件化  生命周期，Vue是模板 react是jsx

### react问题聚合
1. 高阶组件、react hook和高阶组件的区别
2. 介绍一下react router
3. setState如何更新的
4. setState什么时候是异步的
5. React hooks 原理是什么？
6. React Fiber 的理解和原理
7. React setState具体做了哪些事情
8. React 具体是如何更新的
9. Context 旨在共享一个组件树内可被视为 “全局” 的数据
10. redux的reducer为什么是纯函数
11. hook模拟生命周期，shouldupdate, react常见优化手段，class和hook函数组件的区别
12. react为什么删除那三个生命周期
    - 被废弃的三个函数都是在render之前，在异步渲染中,因为fiber的出现，很可能因为高优先级任务的出现打断现有任务导致它们被执行多次
13. componentDidMount 会在组件挂载后（插入 DOM 树中）立即调用。
14. getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。
15. getSnapshotBeforeUpdate 在最近一次渲染输出（提交到 DOM 节点）之前调用。
16. setState 是同步还是异步的
    - setState 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同。
    - 在源码中，通过 isBatchingUpdates 来判断setState 是先存进 state 队列还是直接更新，
    - 如果值为 true 则执行异步操作，为 false 则直接更新。
    - **异步：** 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。
    - **同步：** 在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。

其次是 VDOM 和真实 DOM 的区别和优化：
1. 虚拟 DOM 不会立马进行排版与重绘操作
2. 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多DOM节点排版与重绘损耗
3. 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部


react原理
1. 函数式编程
   1. 纯函数
   2. 不可变值
2. vdom和diff
   1. diff只比较同级，不跨级比较
   2. tag不相同，则直接删掉重建，不在深度比较
   3. tag和key，两者都相同，则认为是相同节点
3. 合成事件
   1. 所有事件挂在document上
   2. event不是原生的，是SyntheticEvent合成事件对象
  优点：
     1. 更好的兼容性和跨平台
     2. 挂载到document上，减少内存消耗，避免频繁解绑
     3. 方便事件的统一管理（如事务机制）
4. setState和batchUpdate
  setState
     1. 有时异步（普通使用），有时同步（setTimeout,DOM事件中）
     2. 有时合并（对象形式），有时不合并（函数形式）
  setState是异步还是同步
     1. setState无所谓异步还是同步
     2. 看是否能命中batchUpdate机制
     3. 判断isBatchUpdates（true、false）来判断是否命中batchUpdate机制
5. 组件渲染过程
   1. setState(newState)-->dirtyComponents（可能有子组件）
   2. render()生成newVnode
   3. diff比较算法
   4. commit更新
6. 前端路由

hashHistory：通常应用于老版本浏览器，主要通过hash来实现
browserHistory：通常应用于高版本浏览器，通过html5中的history来实现, history.pushState



### http1.0 2.0区别
**Http1.x**

  - **缺陷：** 线程阻塞，在同一时间，同一域名的请求有一定数量限制，超过限制数目的请求会被阻塞

**http1.0**

  - **缺陷：** 浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接（TCP连接的新建成本很高，因为需要客户端和服务器三次握手），服务器完成请求处理后立即断开TCP连接，服务器不跟踪每个客户也不记录过去的请求；

  - **解决方案：** 添加头信息——非标准的Connection字段Connection: keep-alive
 
**http1.1**

**改进点：**
- HTTP/1.1 中增加了持久连接的方法，它的特点是在一个 TCP 连接上可以传输多个 HTTP 请求，
- 只要浏览器或者服务器没有明确断开连接，那么该 TCP 连接会一直保持。
- Connection: keep-alive(对于同一个域名，大多数浏览器允许同时建立6个持久连接)
- 浏览器为每个域名最多同时维护 6 个 TCP 持久连接；
  
- **管道机制**
  - 即在同一个TCP连接里面，客户端可以同时发送多个请求。
  
- **分块传输编码**

  - 即服务端没产生一块数据，就发送一块，采用”流模式”而取代”缓存模式”。
  
- **新增请求方式**
  - PUT:请求服务器存储一个资源;
  - DELETE：请求服务器删除标识的资源；
  - OPTIONS：请求查询服务器的性能，或者查询与资源相关的选项和需求；
  - TRACE：请求服务器回送收到的请求信息，主要用于测试或诊断；
  - CONNECT：保留将来使用

**缺点：**
  
虽然允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个请求，才会接着处理下一个请求。如果前面的处理特别慢，后面就会有许多请求排队等着。这将导致“队头堵塞”

**避免方式：** 
  
一是减少请求数，二是同时多开持久连接

**HTTP/2.0**
- 采用二进制格式而非文本格式；
- 完全多路复用，而非有序并阻塞的、只需一个连接即可实现并行；
- 使用报头压缩，降低开销

**1. 二进制协议** 

  HTTP/1.1 版的头信息肯定是文本（ASCII编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为”帧”：头信息帧和数据帧。
  二进制协议解析起来更高效、“线上”更紧凑，更重要的是错误更少。

**2. 完全多路复用** 

  HTTP/2 的思路就是一个域名只使用一个 TCP 长连接来传输数据，这样整个页面资源的下载过程只需要一次慢启动，同时也避免了多个 TCP 连接竞争带宽所带来的问题。
  HTTP/2 复用TCP连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了”队头堵塞”。

**3. 报头压缩** 

  HTTP 协议是没有状态，导致每次请求都必须附上所有信息。所以，请求的很多头字段都是重复的，比如Cookie，一样的内容每次请求都必须附带，这会浪费很多带宽，也影响速度。
  对于相同的头部，不必再通过请求发送，只需发送一次；
  HTTP/2 对这一点做了优化，引入了头信息压缩机制；
  一方面，头信息使用gzip或compress压缩后再发送；
  另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，产生一个索引号，之后就不发送同样字段了，只需发送索引号



### 杂项聚合
1. 0.1 + 0.2 精度的处理
2. 错误监控
3. 数字金额切割
4. CORS options预检请求
5. postMessage跨域处理
6. button吸底效果
7. Promise then返回是一个新的Promise。Promise优缺点 深入点的
8. 垂直居中有哪些方案
9. 一个iframe禁止嵌入 如何解决
10. 原型链：先查找自己有没有这个属性，没有找__proto__上有没有
11. 为什么 es module 能够更好的tree-shaking 而require不行？es module是编译时决定引用， commonjs是运行时决定引用。
12. one(add(two())); two(add(one()));



设置transform会有哪些变化
<div style='background-color: red'>
  <div style='display: inline-block;'></div>
</div>

```js
function Fcon() {
  const [count, setCount] = React.useState(0);

  const _onclick = () => {
    setTimeout(() => {
      console.log(count)
    }, 3000)
  }
  return (
    <div>
      <div>{count}</div>
      <div onClick={_onclick}>触发</div>
      <div onClick={() => {
        setCount(count + 1);
        setCount(count + 1);
      }}>+1</div>
    </div>
  )
}
```



typeof null 结果是 object ，JavaScript 诞生以来便如此，由于 null 代表的是空指针（大多数平台下值为 0x00）。

typeof [1, 2] 结果是 object ，结果中没有array 这一项，引用类型除了function其他的全部都是 object。

typeof Symbol() 用 typeof 获取 symbol 类型的值得到的是 symbol ，Symbol实例是唯一且不可改变的这是 ES6 新增的知识点.






1. 做了什么事情, 解决了什么问题
2. 做这个事情思考了哪些事情
3. 达到了什么目标，得到了什么结果（技术问题 怎么解决 怎么思考，业务问题）
4. 体验优势，反馈，给别人得到效率提升


动态表单渲染、利用import和React.lazy页面全部按需加载、通过研究npm Doc文档测试包采用发布方案
指导组内同学机器迁移，发现由于基础设施完善组内同学在平常只专注于业务开发 对上线部署原理不清楚，我画了部署和用户访问原理架构图
路由页面全部按需加载


面试：基础、框架、项目、工具
自我介绍一下
1. css: 
    说一下盒子模型，border-box和content-box的区别
    水平垂直居中有哪些方法，说说flex布局（左右两栏布局）
2. JavaScript：
    - 基本数据类型有哪些
    - 有哪些作用域，函数作用域、块作用域（let，const）
    - 请简述一下js的闭包、原型链
    - 同步和异步的执行顺序（说说事件循环）
    - == 和 === 的区别
    - 数组常用的方法有哪些
    - JS如何实现倒计时，为什么不准，校正方式
    - 数组去重方法
3. git（merge cherry-pick, stash） Linux 常用命令
4. HTTP get post 请求头，响应头里面有哪些，讲讲同源策略，什么情况算是跨域（有哪些、nginx、后端CORS），
5. cookie（子域名会把主域名的cookie带到后端吗）,sessionStorage和localStorage的区别
6. 排序算法有哪些，每个排序的大致过程 了解TCP协议吗 说说三次握手和四次挥手
7. 了解webpack吗 说说你的理解，有没有抓过包Charles用过吗 说一下原理
9. 框架（Vue）
    - 说一下有哪些生命周期，created、mounted这两个生命周期分别做了哪些东西
    - 如何让css只在当前组件起作用，v-if和v-show的区别
    - vue2.0实现数据双向绑定的原理，Vue是如何监听数组的变化的




考察实习生/社招/校招知识点
1. typescript
  1. 泛型
2. ES5的继承和ES6的继承有什么区别？
3. 大致讲下diff算法和key扮演的作用；了解过hoc和render props吗，如何设计更通用的组件；
   - memo和purecomponent干嘛用的&原理；如何在更新阶段修改组件内部state；
   - 深层嵌套的组件如何共享数据；错误处理怎么做的；react组件怎么绑定ref；
   - 如何在root元素外渲染组件；合成事件机制描述下过程；jsx写法以及为什么顶部引入react对象；
   - redux/mobx概念，不同之处，怎么处理异步；router几种类型，实现一个类似vue里keep-alive的功能；
   - 怎么SSR；常用ui库哪些，出了问题怎么排查；
4. react 生命周期是哪些？什么是高阶组件？高阶组建有哪些应用场景？和vue有什么区别和联系？
   - 什么情况用redux？redux数据类型怎么设计？react state有哪些设计原则？
   - react 用的时候怎么减少不必要的渲染、怎么提高性能？
5. 说一下 fiber 的节点遍历顺序

第二个要命的问题，就是我发现自己在每一次事变里都不是核心成员。
大家可以想象，一个想要从原来的单位出走自立的团队，其核心成员一定事先密谋了很久，等一切准备就绪了才会行动。
举例来说，在上一个单位，我的同桌，就是和我坐相邻工位的同事，我们关系一直很好，我也以为我们和领导的亲密关系也是完全一样的，但事实是，离职创业这件事他从头到尾都在参与，领导最早就跟他通了气，而我是到了最后，事情几乎就已经发生了才知道内情的。
我的业务能力是明显在这个小伙伴之上的，这只能说明，在领导眼中，他是更嫡系、更可靠的，是一定会跟他走的，而对我，其实没那么放心。
但平时我们可是永远都一起喝酒一起称兄道弟的。因为确实都是好兄弟，我时候也问他们这个问题了，领导说其实也很简单，没什么复杂的，就是喝酒时我这个小伙伴说过，领导要是创业什么的他随时都会跟着走。
而我，虽然心里是这么想的，但没说出口过。
这里敲黑板了哈，有年轻同学们看到，可以吸取点教训，有些话要说出来，有些感情要表达，有些真心，你不说出来别人是真的get不到的。




