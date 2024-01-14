(function (modules) {
  var installedModules = {};
  function require(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, require);
    module.l = true;
    return module.exports;
  }
  return require("./src/index.js");
})({
  "./src/a.js": function (module, require) {
    let b = require("./src/base/b.js")
    module.exports = 'a'+ b;
  },
  "./src/base/b.js": function (module) {
    module.exports = 'b';
  },
  "./src/index.js": function (module, require) {
    let str = require("./src/a.js")
    console.log(str);
  }
})
