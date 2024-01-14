function tranformMsg(string, keyword) {
  var reg = new RegExp('https://luoxupan.github.io/wiki/pages/webapp/*', 'g');
  var regReplaceFunc = function (match) {
    return keyword;
  };
  return string.replace(reg, regReplaceFunc);
}
tranformMsg('https://luoxupan.github.io/wiki/pages/webapp/main_04b9bf45.js', 'https://www.baidu.com/');
// 'https://www.baidu.com/main_04b9bf45.js'





// 正则匹配替换
function tranformMsg(string, keyword) {
  // var reg = /@\w+/g;
  var reg = new RegExp(`(@\\w+_${keyword}|@\\w+)`, 'g');
  var regReplaceFunc = function (match) {
    return `<a href='https://ddp.com/profile/${match}'>${match}</a>`
  };
  return string.replaceAll(reg, regReplaceFunc);
}
tranformMsg('@sds_4353ff_把九点半@nihao 第三方不仅是对', '把');
