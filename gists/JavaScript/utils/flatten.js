function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    // some返回true/false
    arr = [].concat(...arr);
  }
  return arr;
}

function flatten(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = [...result, ...flatten(arr[i])]
    } else {
      result.push(arr[i])
    }
  }
  return result;
}

let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
console.log(flatten(arr));

