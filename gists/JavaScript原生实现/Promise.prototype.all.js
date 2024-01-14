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
