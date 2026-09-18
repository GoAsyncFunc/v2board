let legacyModule = module,
  legacyExports = exports;
var r, o;
(function () {
  "use strict";

  var n = {}.hasOwnProperty;
  function i() {
    for (var e = [], t = 0; t < arguments.length; t++) {
      var r = arguments[t];
      if (r) {
        var o = typeof r;
        if ("string" === o || "number" === o) e.push(r);else if (Array.isArray(r) && r.length) {
          var a = i.apply(null, r);
          a && e.push(a);
        } else if ("object" === o) for (var s in r) n.call(r, s) && r[s] && e.push(s);
      }
    }
    return e.join(" ");
  }
  legacyModule.exports ? (i.default = i, legacyModule.exports = i) : (r = [], o = function () {
    return i;
  }.apply(legacyExports, r), void 0 === o || (legacyModule.exports = o));
})();
