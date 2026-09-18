let legacyModule = module,
  legacyExports = exports;
var r = require("./4f6a6764.js"),
  i = require("./requireObject.js");
legacyModule.exports = function (e) {
  return function (t, n) {
    var o,
      a,
      s = String(i(t)),
      l = r(n),
      c = s.length;
    return l < 0 || l >= c ? e ? "" : void 0 : (o = s.charCodeAt(l), o < 55296 || o > 56319 || l + 1 === c || (a = s.charCodeAt(l + 1)) < 56320 || a > 57343 ? e ? s.charAt(l) : o : e ? s.slice(l, l + 2) : a - 56320 + (o - 55296 << 10) + 65536);
  };
};
