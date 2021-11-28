#### 它们有两个重大差异。

> 1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
> 2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

第二个差异导致的原因是：
> 因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

重点解释第一个差异。
> CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

举个例子：
```js
// 输出模块 counter.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};
```
```js
// 引入模块 main.js
var mod = require('./counter');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```
counter.js 模块加载以后，它的内部变化就影响不到输出的 mod.counter 了。这是因为 mod.counter 是一个原始类型的值，会被缓存。

但是如果修改 counter 为一个引用类型的话：

```js
// 输出模块 counter.js
var counter = {
    value: 3
};

function incCounter() {
    counter.value++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};
```
```js
// 引入模块 main.js
var mod = require('./counter.js');

console.log(mod.counter.value); // 3
mod.incCounter();
console.log(mod.counter.value); // 4
```
value 是会发生改变的。不过也可以说这是 "值的拷贝"，只是对于引用类型而言，值指的其实是引用。

而如果我们将这个例子改成 ES6:
```js
// counter.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './counter';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```
这是因为
> ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。



