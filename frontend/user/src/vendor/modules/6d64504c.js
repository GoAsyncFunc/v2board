let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./globalObjectFromLegacy.js"),
    i = legacyExports && !legacyExports.nodeType && legacyExports,
    a = i && "object" == typeof e && e && !e.nodeType && e,
    o = a && a.exports === i,
    u = o && r.process,
    l = function () {
      try {
        var e = a && a.require && a.require("util").types;
        return e || u && u.binding && u.binding("util");
      } catch (e) {}
    }();
  e.exports = l;
}).call(this, require("./moduleObjectPolyfill.js")(legacyModule));
