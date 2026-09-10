let legacyModule = module,
  legacyExports = exports;
var r = require("./5745706b.js"),
  i = require("./35543259.js"),
  o = "__core-js_shared__",
  a = i[o] || (i[o] = {});
(legacyModule.exports = function (e, t) {
  return a[e] || (a[e] = void 0 !== t ? t : {});
})("versions", []).push({
  version: r.version,
  mode: require("./754f5053.js") ? "pure" : "global",
  copyright: "\xa9 2020 Denis Pushkarev (zloirock.ru)"
});
