let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./rootObject.js"),
    i = require("./falseValue.js"),
    o = legacyExports && !legacyExports.nodeType && legacyExports,
    a = o && "object" == typeof e && e && !e.nodeType && e,
    s = a && a.exports === o,
    l = s ? r.Buffer : void 0,
    u = l ? l.isBuffer : void 0,
    c = u || i;
  e.exports = c;
}).call(this, require("./59755469.js")(legacyModule));
