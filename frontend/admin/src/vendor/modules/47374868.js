let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  i = require("./41323268.js"),
  o = require("./62734472.js");
require("./68374769.js")("search", 1, function (e, t, n, a) {
  return [function (n) {
    var r = e(this),
      i = void 0 == n ? void 0 : n[t];
    return void 0 !== i ? i.call(n, r) : new RegExp(n)[t](String(r));
  }, function (e) {
    var t = a(n, e, this);
    if (t.done) return t.value;
    var s = r(e),
      l = String(this),
      c = s.lastIndex;
    i(c, 0) || (s.lastIndex = 0);
    var u = o(s, l);
    return i(s.lastIndex, c) || (s.lastIndex = c), null === u ? -1 : u.index;
  }];
});
