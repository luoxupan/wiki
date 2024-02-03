
Promise.prototype.finally = function(onDone) {
  if (typeof onDone !== 'function') return this.then();
  let Promise = this.constructor;
  return this.then(
    value => Promise.resolve(onDone()).then(() => value),
    reason => Promise.resolve(onDone()).then(() => { throw reason })
  );
}

Promise.prototype.resolve(4).finally(() => {
  console.log('finally')
}).then((v) => {
  console.log(v); // 4
});
