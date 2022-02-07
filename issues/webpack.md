## 模块化导出原理
> ./src/a.js
```js
let b = require("./src/base/b.js")
module.exports = 'a'+ b;
```

> ./src/base/b.js
```js
module.exports = 'b';
```

> ./src/index.js
```js
let str = require("./src/a.js")
console.log(str);
```

> webpack打包结果
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

----

## Webpack `Tree Shaking`

1. 保证代码是es module, @babel/preset-env的modules设置为false（防止webpack把代码编译成CommonJS规范）
2. 将webpack的optimization.usedExports设置为true, production环境默认设置为true（webpack编译时在代码里打上“unused harmony export ***”标记）
3. webpack将代码压缩的时候（mode为"production"自动压缩）会把标记为“unused harmony export ***”的代码删除

----

## import moduleName from 'xxModule'和import('xxModule')经过webpack编译打包后最终变成了什么？在浏览器中是怎么运行的？

- import经过webpack打包以后变成一些Map对象，key为模块路径，value为模块的可执行函数；
- 代码加载到浏览器以后从入口模块开始执行，其中执行的过程中，最重要的就是webpack定义的__webpack_require__函数，负责实际的模块加载并执行这些模块内容，返回执行结果，其实就是读取Map对象，然后执行相应的函数；
- 当然其中的异步方法（import('xxModule')）比较特殊一些，它会单独打成一个包，采用动态加载的方式，具体过程：当用户触发其加载的动作时，会动态的在head标签中创建一个script标签，然后发送一个http请求，加载模块，模块加载完成以后自动执行其中的代码，主要的工作有两个，更改缓存中模块的状态，另一个就是执行模块代码。

[https://mp.weixin.qq.com/s/yGjk4WeumU560d_IJYL92A](https://mp.weixin.qq.com/s/yGjk4WeumU560d_IJYL92A)


----

