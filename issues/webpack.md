### 模块化导出原理
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
---

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

### webpack打包优化
- happypack多线程打包
- splitChunks.cacheGroups将功能库打成一个包（antd...）
- loader配置对应的include、exclude
- cache-loader缓存打包的结果

### Tree Shaking 哪些情况下不会生效
1. 只有在ES Module中才会生效
2. CommonJS时不生效

---

### webpack [hash策略](https://juejin.cn/post/6844903942384517127)

1. **hash**

    只要某一个文件被修改，所有输出文件的hash都会跟着变化；因此它有一个弊端，一旦修改了某一个文件，整个项目的文件缓存都会失效。

    ```js
    output: {
      path: path.resolve(__dirname, OUTPUT_PATH),
      filename: '[name].[hash].js', // 使用hash
    }
    ```
2. **chunkhash**

    不同组件的hash不同。相同组件内部js和css的hash相同。

    ```js
    output: {
      path: path.resolve(__dirname, OUTPUT_PATH),
      filename: '[name].[chunkhash].js', // 使用chunkhash
    }
    ```
3. **contenthash**

    每一个代码块（chunk）中的js和css输出文件都会独立生成一个hash，当某一个代码块（chunk）中的js源文件被修改时，只有该代码块（chunk）输出的js文件的hash会发生变化

    ```js
    output: {
      path: path.resolve(__dirname, OUTPUT_PATH),
      filename: '[name].[contenthash].js', // 使用contenthash
    }
    ```

webpack打包成es modal的时候 最后是怎么执行的
1. 最后都是CommonJS

webpack循环引用配置

webpack有哪些事件

---

### Webpack `Tree Shaking`

1. 保证代码是es module, @babel/preset-env的modules设置为false（防止webpack把代码编译成CommonJS规范）
2. 将webpack的optimization.usedExports设置为true, production环境默认设置为true（webpack编译时在代码里打上“unused harmony export ***”标记）
3. webpack将代码压缩的时候（mode为"production"自动压缩）会把标记为“unused harmony export ***”的代码删除

---

### import moduleName from 'xxModule'和import('xxModule')经过webpack编译打包后最终变成了什么？在浏览器中是怎么运行的？

- import经过webpack打包以后变成一些Map对象，key为模块路径，value为模块的可执行函数；
- 代码加载到浏览器以后从入口模块开始执行，其中执行的过程中，最重要的就是webpack定义的__webpack_require__函数，负责实际的模块加载并执行这些模块内容，返回执行结果，其实就是读取Map对象，然后执行相应的函数；
- 当然其中的异步方法（import('xxModule')）比较特殊一些，它会单独打成一个包，采用动态加载的方式，具体过程：当用户触发其加载的动作时，会动态的在head标签中创建一个script标签，然后发送一个http请求，加载模块，模块加载完成以后自动执行其中的代码，主要的工作有两个，更改缓存中模块的状态，另一个就是执行模块代码。

[https://mp.weixin.qq.com/s/yGjk4WeumU560d_IJYL92A](https://mp.weixin.qq.com/s/yGjk4WeumU560d_IJYL92A)


---

