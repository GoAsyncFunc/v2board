let legacyModule = module,
  legacyExports = exports;
var r, i;
(function () {
  "use strict";

  var n = {}.hasOwnProperty;
  function o() {
    for (var e = [], t = 0; t < arguments.length; t++) {
      var r = arguments[t];
      if (r) {
        var i = typeof r;
        if ("string" === i || "number" === i) e.push(r);else if (Array.isArray(r) && r.length) {
          var a = o.apply(null, r);
          a && e.push(a);
        } else if ("object" === i) for (var s in r) n.call(r, s) && r[s] && e.push(s);
      }
    }
    return e.join(" ");
  }
  legacyModule.exports ? (o.default = o, legacyModule.exports = o) : (r = [], i = function () {
    return o;
  }.apply(legacyExports, r), void 0 === i || (legacyModule.exports = i));
})();
