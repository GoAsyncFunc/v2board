let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = a;
var r = i(require("./71317449.js")),
  o = require("./544f7756.js");
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e) {
  var t = [];
  return r.default.Children.forEach(e, function (e) {
    void 0 !== e && null !== e && (Array.isArray(e) ? t = t.concat(a(e)) : (0, o.isFragment)(e) && e.props ? t = t.concat(a(e.props.children)) : t.push(e));
  }), t;
}
