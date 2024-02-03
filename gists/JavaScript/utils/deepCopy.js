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
