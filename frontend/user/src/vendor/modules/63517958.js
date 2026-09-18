let legacyModule = module,
  legacyExports = exports;
var r = require("./wellKnownSymbol.js")("iterator"),
  o = !1;
try {
  var i = [7][r]();
  i["return"] = function () {
    o = !0;
  }, Array.from(i, function () {
    throw 2;
  });
} catch (e) {}
legacyModule.exports = function (e, t) {
  if (!t && !o) return !1;
  var n = !1;
  try {
    var i = [7],
      a = i[r]();
    a.next = function () {
      return {
        done: n = !0
      };
    }, i[r] = function () {
      return a;
    }, e(i);
  } catch (e) {}
  return n;
};
