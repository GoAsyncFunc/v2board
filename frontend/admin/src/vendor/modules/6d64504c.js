let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./globalObjectFromLegacy.js"),
    i = legacyExports && !legacyExports.nodeType && legacyExports,
    o = i && "object" == typeof e && e && !e.nodeType && e,
    a = o && o.exports === i,
    s = a && r.process,
    l = function () {
      try {
        var e = o && o.require && o.require("util").types;
        return e || s && s.binding && s.binding("util");
      } catch (e) {}
    }();
  e.exports = l;
}).call(this, require("./moduleObjectPolyfill.js")(legacyModule));
