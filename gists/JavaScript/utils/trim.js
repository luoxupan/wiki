function trim(str, substr, newSubStr) {
  var reg = new RegExp(`^((${substr})*)|((${substr})*)$`, 'g');
  return str.replace(reg, newSubStr);
}
