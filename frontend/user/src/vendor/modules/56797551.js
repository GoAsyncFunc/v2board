let legacyModule = module,
  legacyExports = exports;
var r = require("./62563566.js"),
  o = require("./63304f79.js"),
  i = "__core-js_shared__",
  a = o[i] || (o[i] = {});
(legacyModule.exports = function (e, t) {
  return a[e] || (a[e] = void 0 !== t ? t : {});
})("versions", []).push({
  version: r.version,
  mode: require("./46715048.js") ? "pure" : "global",
  copyright: "\xa9 2019 Denis Pushkarev (zloirock.ru)"
});
