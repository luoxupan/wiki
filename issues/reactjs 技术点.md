### [react-api](https://zh-hans.reactjs.org/docs/react-api.html)

### 文档

- [inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)
- [a-complete-guide-to-useeffect](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [reactjs 中文文档: fiber-reconciler](https://zh-hans.reactjs.org/docs/codebase-overview.html#fiber-reconciler)
- [React技术揭秘](https://react.iamkasong.com/)
- [图解react源码](https://github.com/7kms/react-illustration-series)
- [React 源码解析](https://react.jokcy.me/)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
- [Dan: react state updates](https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates/48610973#48610973)
- [why is `setState` asynchronous?](https://github.com/facebook/react/issues/11527)

----

### 前置知识

主流浏览器刷新频率为60Hz（帧），即每（1000ms / 60Hz）**16.6ms浏览器刷新一次**

我们知道，JS可以操作DOM，`GUI渲染线程`与`JS线程`是互斥的。所以**JS脚本执行**和**浏览器布局**、**绘制**不能同时执行。

在每16.6ms时间内，需要完成如下工作：

> **JS脚本执行 -----  样式布局 ----- 样式绘制**

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行`样式布局`和`样式绘制`了。JS脚本执行时间过长，页面掉帧，造成卡顿。

如何解决这个问题呢？

答案是：**在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件**（可以看到，在[源码](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)中，预留的初始时间是5ms）

----

## [生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![image](https://luoxupan.github.io/img/lifecycle.png)

## 生命周期调用时机

- componentDidMount 会在组件挂载后（插入 DOM 树中）立即调用。

### 删除的生命周期

- componentWillReceiveProps
- componentWillMount
- componentWillUpdate

### 新增加的生命周期

- getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。
  -   它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
- getSnapshotBeforeUpdate 在最近一次渲染输出（提交到 DOM 节点）之前调用。
  -   它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。

----

### React15架构的缺点：

- 递归更新子组件：由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

----

### React16架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler。相当于[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

- Reconciler（协调器）—— 负责找出变化的组件`（Diffing 算法）`。`Reconciler`内部采用了`Fiber`的架构。

- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

**`React`的架构遵循`schedule` - `render` - `commit`的运行流程**

![image](https://user-images.githubusercontent.com/7278711/125153322-77199f80-e185-11eb-89d0-4b0f713071a5.png)

#### 其中红框中的步骤随时可能由于以下原因被中断：

- 有其他更高优任务需要先更新

- 当前帧没有剩余时间

由于红框中的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM（即上一节演示的情况）。

----

## Diff算法 [详情](https://github.com/luoxupan/wiki/blob/master/issues/Diff%E7%AE%97%E6%B3%95.md)

由于`Diff`操作本身也会带来性能损耗，`React`文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 `O(n 3 )`，其中n是树中元素的数量。

#### 为了降低算法复杂度，`React`的`diff`会预设三个限制：

1. 只对同级元素进行`Diff`。如果一个`DOM`节点在前后两次更新中跨越了层级，那么`React`不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，`React`会销毁`div`及其子孙节点，并新建`p`及其子孙节点。
3. 开发者可以通过` key prop`来暗示哪些子元素在不同的渲染下能保持稳定。

----


## this.setState

可以看到，`this.setState`内会调用`this.updater.enqueueSetState`方法。
```js
Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    {
      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
    }
  }
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```
> 你可以在[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react/src/ReactBaseClasses.js#L57)看到这段代码

在`enqueueSetState`方法中就是我们熟悉的从创建`update`到调度`update`的流程了。
```js
enqueueSetState(inst, payload, callback) {
  // 通过组件实例获取对应fiber
  const fiber = getInstance(inst);

  const eventTime = requestEventTime();
  const suspenseConfig = requestCurrentSuspenseConfig();

  // 获取优先级
  const lane = requestUpdateLane(fiber, suspenseConfig);

  // 创建update
  const update = createUpdate(eventTime, lane, suspenseConfig);

  update.payload = payload;

  // 赋值回调函数
  if (callback !== undefined && callback !== null) {
    update.callback = callback;
  }

  // 将update插入updateQueue
  enqueueUpdate(fiber, update);
  // 调度update
  scheduleUpdateOnFiber(fiber, lane, eventTime);
}
```
> 你可以在[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberClassComponent.old.js#L196)看到enqueueSetState代码

这里值得注意的是对于`ClassComponent`，`update.payload`为`this.setState`的第一个传参（即要改变的`state`）。


----

## batchedUpdates
如果我们在一次事件回调中触发多次`更新`，他们会被合并为一次`更新`进行处理。

如下代码执行只会触发一次`更新`：
```js
onClick() {
  this.setState({stateA: 1});
  this.setState({stateB: false});
  this.setState({stateA: 2});
}
```
这种合并多个更新的优化方式被称为`batchedUpdates`。

`batchedUpdates`在很早的版本就存在了，不过之前的实现局限很多（脱离当前上下文环境的更新不会被合并）。
```js
onClick() {
  setTimeout(() => {
    this.setState({stateA: 1});
    this.setState({stateB: false});
    this.setState({stateA: 2});
  });
}
// 此时不会批量更新,因为执行onClick上下文的isBatchingUpdates设置为true，执行完onClick后就被设置为false。当执行setTimeout里面的函数的时候isBatchingUpdates就为false 就不是批量更新了
```

在`Concurrent Mode`中，是以优先级为依据对更新进行合并的，使用范围更广。

----
## General algorithm

React内部运作主要分为两个阶段：**render** 和 **commit**。

在`render`阶段，React 组件会应用通过`setState`或者 `React.render` 安排的更新，找出UI上需要更新的内容。如果是首次渲染，React 会为每个 render 函数返回的元素创建一个新的 Fiber。在后续更新中，现有的 React元素对应的 Fiber 会被重复利用和更新。

**render阶段完成后， 会得到一条带有副作用Fiber节点的effect链表。** 副作用Fiber节点描述了在`commit`阶段需要完成的work。在`commit`阶段，React遍历effect链表 ，执行DOM更新，和其它更改。并使之对用户可见。

**需要明白，render阶段是可能会是异步执行的。** React 根据可用的时间，可能会处理一个或者多个 Fiber ，然后就会暂存当前已完成的work，让浏览器去处理某些事件，当有空余时间后，它又会从上次停下的地方继续处理。但有些时候，它可能放弃已经完成的 work，然后从头开始。

因为 **render** 阶段的工作不会导致任何用户可见的更改（如DOM更新），才使得暂停 work 的行为变得可以接受。

**作为对比，接下来的commit阶段，总是同步的。** 这是因为这个阶段的工作始终会导致用户可见的更改（如DOM更新）。所以React要一次性完成这个阶段。

### Render phase

reconciliation 算法使用[renderRoot](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L1132) 方法，从顶层的`HostRoot`开始遍历。然而，React会跳过已处理过的 Fiber，直到找到未完成 work 的 Fiber。举个例子，假如你在组件树深处某个组件内部调用了`setState` ，React会从树顶部开始遍历，但是迅速跳过父级组件，直到找到调用了`setState` 方法的组件。

----

## React Fiber可以理解为：

`React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

其中每个任务更新单元为`React Element`对应的`Fiber节点`。

----

### Hooks 

- [Hooks的设计动机](https://zh-hans.reactjs.org/docs/hooks-intro.html#motivation)
  - 在组件之间复用状态逻辑很难
    - React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）
    - 你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑**。 这使得在组件间或社区内共享 Hook 变得更便捷
  - 复杂组件变得难以理解
    - **Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。
  - 难以理解的 class
    - **Hook 使你在非 class 的情况下可以使用更多的 React 特性**。 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。


----

- fiber
- hooks （解决了什么问题）
- 协调算法


----

# 事件系统

Virtual DOM 在内存中是以对象的形式存在的，如果想要在这些对象上添加事 件，就会非常简单。React 基于 Virtual DOM 实现了一个 SyntheticEvent (合成事件)层，我们所定义的事件处理器会接收到一个 SyntheticEvent 对象的实例，它完全符合 W3C 标准，不会存在任何 IE 标准的兼容性问题。并 且与原生的浏览器事件一样拥有同样的接又，同样支持事件的冒泡机制，我们 可以使用 stopPropagation() 和 preventDefault() 来中断它。

**所有事件都自动绑定到最外层的document上。如果需要访问原生事件对象，可以使用 nativeEvent 属性。**

## 合成事件的实现机制

> 在React底层，主要对合成事件做了两件事:事件委派和自动绑定。

- 事件委派

  在使用React事件前，一定要熟悉它的事件代理机制。它并不会把事件处理函数 直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象;当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。

- 自动绑定

  在React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。而且React还会对这种引用进行缓存，以达到CPU和内存的最优化。在使用ES6 classes或者纯函数时，这种自动绑定就不复存在了，我们需要手动实现this的绑定。



# QA知识点

### 为什么自定义组件首字母要大写？

因为jsx是`React.createElement(component, props, ...children)`的语法糖。小写就会被识别为html标签`React.createElement('div', null)`,当做字符串传递，大写会被当做自定义组件 变量传递`React.createElement(Demo, null)`。

### hooks快照原理？[web示例](https://luoxupan.github.io/wiki/pages/page05/index.html)

> useState倒计时
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

每次setState都会导致函数执行一次。就好比函数执行的时候传递的参数，函数只记得执行的时候变量的值。

```js
// 原理：相当于函数传参
var count = 1;
function log() {
  var num = count; // 相当于hook的useState
  setTimeout(() => {
    console.log(num);
  }, 3000);
}

log(); // 1
count = 10;
log(); // 10
```

### 自定义暴露给父组件的实例
```js
const FancyInput = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getData: () => {
      console.log('数据');
    }
  }));
  return (
    <input />
  );
});

// 调用方法
const eleRef = React.useRef();
<FancyInput ref={eleRef} />
inputRef.current.getData();
```

### hooks获取上一次的state
```js
function usePreState(state) {
  const ref = React.useRef(null as any);
  React.useEffect(() => {
    ref.current = state
  }, [state]);
  return ref.current;
}
```

### 防抖(useDebounce): 在n秒内执行最后一次func

```js
function useDebounce(fn, delay) {
  const ref = React.useRef({ fn, timer: null } as any);

  React.useEffect(function() {
    ref.current.fn = fn;
  }, [fn]);

  return React.useCallback(function(...args) {
    // @ts-ignore
    const self = this;
    if (ref.current.timer) {
      clearTimeout(ref.current.timer);
    }
    ref.current.timer = setTimeout(function() {
      ref.current.fn.apply(self, args);
    }, delay);
  }, []);
}
```

### hooks模拟setState(stateChange[, callback])的callback

`setState()` 的第二个参数为可选的回调函数，它将在 `setState` 完成合并并重新渲染组件后执行。通常，我们建议使用 `componentDidUpdate() `来代替此方式。
```js
function useState(init) {
  const [state, setState] = React.useState(init);
  const eleRef = React.useRef(null as any);
  function _setState(value, callback) {
    eleRef.current = callback;
    setState(value);
  }
  React.useEffect(() => {
    eleRef.current && eleRef.current();
  }, [state]);
  return [state, _setState];
}

function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => {
        setCount(count + 2, () => {
          console.log(count + 2)
        });
      }}>+1</button>
    </div>
  );
}
```
### 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。

### useLayoutEffect

其函数签名与 `useEffect` 相同，但它会在**所有的 DOM 变更之后**同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。**在浏览器执行绘制之前**，`useLayoutEffect` 内部的更新计划将被同步刷新。

### 我该如何实现 shouldComponentUpdate?

你可以用 React.memo 包裹一个组件来对它的 props 进行浅比较：
```js
const Button = React.memo((props) => {
  // 你的组件
});
```

这不是一个 Hook 因为它的写法和 Hook 不同。`React.memo` 等效于 `PureComponent`，但它只比较 props。（你也可以通过第二个参数指定一个自定义的比较函数来比较新旧 props。如果函数返回 true，就会跳过更新。）

### [react 高阶组件](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/12.%E7%B2%BE%E8%AF%BB%E3%80%8AReact%20%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6%E3%80%8B.md)

高阶组件（ higher-order component ，HOC ）是react中复用组件逻辑的一种进阶技巧。是一种 React 组件的设计理念。
我们可以通过类比高阶函数来理解高阶组件的概念。高阶函数是把函数作为参数传入到函数中并返回一个新的函数。这里我们把函数替换为组件，就是高阶组件了。
```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```















