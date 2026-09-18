let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./rootObject.js"),
    i = legacyExports && !legacyExports.nodeType && legacyExports,
    o = i && "object" == typeof e && e && !e.nodeType && e,
    a = o && o.exports === i,
    s = a ? r.Buffer : void 0,
    l = s ? s.allocUnsafe : void 0;
  function u(e, t) {
    if (t) return e.slice();
    var n = e.length,
      r = l ? l(n) : new e.constructor(n);
    return e.copy(r), r;
  }
  e.exports = u;
}).call(this, require("./moduleObjectPolyfill.js")(legacyModule));
