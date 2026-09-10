let legacyModule = module,
  legacyExports = exports;
var r = require("./674c374e.js")("iterator"),
  i = !1;
try {
  var o = [7][r]();
  o["return"] = function () {
    i = !0;
  }, Array.from(o, function () {
    throw 2;
  });
} catch (e) {}
legacyModule.exports = function (e, t) {
  if (!t && !i) return !1;
  var n = !1;
  try {
    var o = [7],
      a = o[r]();
    a.next = function () {
      return {
        done: n = !0
      };
    }, o[r] = function () {
      return a;
    }, e(o);
  } catch (e) {}
  return n;
};
