let legacyModule = module,
  legacyExports = exports;
var r = require("./coreJsNamespace.js"),
  i = require("./globalObject.js"),
  o = "__core-js_shared__",
  a = i[o] || (i[o] = {});
(legacyModule.exports = function (e, t) {
  return a[e] || (a[e] = void 0 !== t ? t : {});
})("versions", []).push({
  version: r.version,
  mode: require("./trueValue.js") ? "pure" : "global",
  copyright: "\xa9 2020 Denis Pushkarev (zloirock.ru)"
});
