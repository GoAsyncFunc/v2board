let legacyModule = module,
  legacyExports = exports;
var r = require("./coreJsVersion.js"),
  i = require("./globalObject.js"),
  o = "__core-js_shared__",
  a = i[o] || (i[o] = {});
(legacyModule.exports = function (e, t) {
  return a[e] || (a[e] = void 0 !== t ? t : {});
})("versions", []).push({
  version: r.version,
  mode: require("./pureMode.js") ? "pure" : "global",
  copyright: "\xa9 2019 Denis Pushkarev (zloirock.ru)"
});
