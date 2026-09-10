let legacyModule = module,
  legacyExports = exports;
var r = require("./4f6a6764.js"),
  o = require("./4a657330.js");
legacyModule.exports = function (e) {
  return function (t, n) {
    var i,
      a,
      s = String(o(t)),
      c = r(n),
      u = s.length;
    return c < 0 || c >= u ? e ? "" : void 0 : (i = s.charCodeAt(c), i < 55296 || i > 56319 || c + 1 === u || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : i : e ? s.slice(c, c + 2) : a - 56320 + (i - 55296 << 10) + 65536);
  };
};
