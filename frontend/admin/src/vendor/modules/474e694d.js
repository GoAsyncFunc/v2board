let legacyModule = module,
  legacyExports = exports;
var r = require("./memoizeCapped.js"),
  i = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  o = /\\(\\)?/g,
  a = r(function (e) {
    var t = [];
    return 46 === e.charCodeAt(0) && t.push(""), e.replace(i, function (e, n, r, i) {
      t.push(r ? i.replace(o, "$1") : n || e);
    }), t;
  });
legacyModule.exports = a;
