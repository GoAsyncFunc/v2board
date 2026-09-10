let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./4b7a3579.js"),
    i = legacyExports && !legacyExports.nodeType && legacyExports,
    a = i && "object" == typeof e && e && !e.nodeType && e,
    o = a && a.exports === i,
    u = o ? r.Buffer : void 0,
    l = u ? u.allocUnsafe : void 0;
  function s(e, t) {
    if (t) return e.slice();
    var n = e.length,
      r = l ? l(n) : new e.constructor(n);
    return e.copy(r), r;
  }
  e.exports = s;
}).call(this, require("./59755469.js")(legacyModule));
