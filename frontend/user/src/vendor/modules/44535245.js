let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./4b7a3579.js"),
    i = require("./42386475.js"),
    a = legacyExports && !legacyExports.nodeType && legacyExports,
    o = a && "object" == typeof e && e && !e.nodeType && e,
    u = o && o.exports === a,
    l = u ? r.Buffer : void 0,
    s = l ? l.isBuffer : void 0,
    c = s || i;
  e.exports = c;
}).call(this, require("./59755469.js")(legacyModule));
