## 描述

一个 Promise 对象代表一个在这个 promise 被创建出来时不一定已知的值。它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。

一个` Promise` 必然处于以下几种状态之一：

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）: 意味着操作成功完成。
- 已拒绝（rejected）: 意味着操作失败。

```js
new Promise((resolve, reject) => {
  // ?做一些异步操作，最终会调用下面两者之一:
  //
  //   resolve(someValue); // fulfilled
  // ?或
  //   reject("failure reason"); // rejected
});
```


## [Promise.all() ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

Promise.all() 方法接收一个promise的iterable类型（**注：Array，Map，Set都属于ES6的iterable类型**）的输入，并且只返回一个Promise实例， 那个输入的所有promise的resolve回调的结果是一个数组。这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// output: [3, 42, "foo"]
```

## [Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

**Promise.race(iterable)** 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected: "two"
```

## [Promise.any()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

Promise.any() 接收一个Promise可迭代对象，只要**其中的一个 promise 成功**，就**返回那个已经成功的 promise** 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和Promise.all()是相反的。

```js
const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast fulfils first
})
// expected: "很快完成"
```


##  [Promise.resolve()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

```js
Promise.resolve(123).then((value) => {
  console.log(value);
  // output: 123
});

Promise.resolve(new Promise((resolve) => {
  resolve(44444);
})).then((value) => {
  console.log(value);
   // output: 44444
});
```

### [Promise.reject() ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

```js
Promise.reject(('fail')).then(() => {
  console.log('Resolved');
}, (result) => {
  console.error(result);
});
// output: fail
```

## Catch 的后续链式操作

```js
new Promise((resolve, reject) => {
  console.log('初始化');
  resolve();
}).then(() => {
  throw new Error('有哪里不对了');
  console.log('执行「这个」”');
}).catch(() => {
  console.log('执行「那个」');
}).then(() => {
  console.log('执行「这个」，无论前面发生了什么');
});
```
> 输出结果如下：

```
初始化
执行“那个”
执行“这个”，无论前面发生了什么
```
调换Catch顺序
```js
new Promise((resolve, reject) => {
  console.log('初始化');
  resolve();
}).then(() => {
  throw new Error('有哪里不对了');
  console.log('执行「这个」”');
}).then(() => {
  console.log('执行「这个」，无论前面发生了什么');
}).catch(() => {
  console.log('执行「那个」');
});
```

> 输出结果如下：

```
初始化
执行「那个」
```


## 实现[Promise.all](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

```js
function all(promises) {
  let index = 0
  const res = []

  return new Promise((resolve, reject) => {
    const n = promises.length
    if (!n) {
      return [];
    } else {
      for (let i = 0; i < n; i++) {
        Promise.resolve(promises[i]).then(
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

## 实现[Promise.finally](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

```js
function finally(onDone) {
  if (typeof onDone !== 'function') return this.then();
  let Promise = this.constructor;
  return this.then(
    value => Promise.resolve(onDone()).then(() => value),
    reason => Promise.resolve(onDone()).then(() => { throw reason })
  );
}
```

## Promise实现源码

```js
class Promise {
  callbacks = [];
  state = 'pending';  // 增加状态
  value = null;       // 保存结果
  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this));
  }
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      });
    });
  }
  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback);
      return;
    }
    let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
    if (!cb) {  // 如果then中没有传递任何东西
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
      cb(this.value);
      return;
    }
    let ret;
    try {
      ret = cb(this.value);
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
    } catch (error) {
      ret = error;
      cb = callback.reject
    } finally {
      cb(ret);
    }
  }
  _resolve(value) {
    if(this.state !== 'pending') return
    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }
    this.state = 'fulfilled';  //改变状态
    this.value = value;        // 保存结果
    this.callbacks.forEach(callback => this._handle(callback));
  }
  _reject(error) {
    if(this.state !== 'pending') return
    this.state = 'rejected';
    this.value = error;
    this.callbacks.forEach(callback => this._handle(callback));
  }
  static resolve(value) {
    if (value && value instanceof Promise) {
      return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise(resolve => {
        then(resolve);
      });
    } else if (value) {
      return new Promise(resolve => resolve(value));
    } else {
      return new Promise(resolve => resolve());
    }
  }
  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then;
      return new Promise((resolve, reject) => {
        then(reject);
      });
    } else {
      return new Promise((resolve, reject) => reject(value));
    }
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let fulfilledCount = 0
      const itemNum = promises.length
      const rets = Array.from({ length: itemNum })
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(result => {
          fulfilledCount++;
          rets[index] = result;
          if (fulfilledCount === itemNum) {
            resolve(rets);
          }
        }, reason => reject(reason));
      })

    })
  }
  static race(promises) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(function (value) {
          return resolve(value)
        }, function (reason) {
          return reject(reason)
        })
      }
    })
  }
  finally(onDone) {
    if (typeof onDone !== 'function') return this.then();
    let Promise = this.constructor;
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => { throw reason })
    );
  }
  catch(onError) {
    return this.then(null, onError);
  }
}
```
