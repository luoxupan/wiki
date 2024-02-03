function trimRight(str, substr, newSubStr) {
  var reg = new RegExp(`(${substr})*$`, 'g');
  return str.replace(reg, newSubStr);
}
