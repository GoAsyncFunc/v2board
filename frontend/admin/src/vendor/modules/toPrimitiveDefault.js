let legacyModule = module,
  legacyExports = exports;
var r = require("./typeofHelper.js")["default"];
function i(e, t) {
  if ("object" !== r(e) || null === e) return e;
  var n = e[Symbol.toPrimitive];
  if (void 0 !== n) {
    var i = n.call(e, t || "default");
    if ("object" !== r(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === t ? String : Number)(e);
}
legacyModule.exports = i, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
