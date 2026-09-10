let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
var n = require("./modules/71317449.js"),
  r = require("./modules/54535951.js"),
  o = interopDefault(r),
  a = require("./modules/48383455.js");
function l() {
  return l = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, l.apply(this, arguments);
}
function i(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
var u = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  s = function (e) {
    return n["createElement"](a["a"], null, function (t) {
      var c,
        r = t.getPrefixCls,
        a = e.prefixCls,
        s = e.type,
        h = void 0 === s ? "horizontal" : s,
        f = e.orientation,
        p = void 0 === f ? "center" : f,
        v = e.className,
        m = e.children,
        d = e.dashed,
        y = u(e, ["prefixCls", "type", "orientation", "className", "children", "dashed"]),
        b = r("divider", a),
        z = p.length > 0 ? "-".concat(p) : p,
        g = o()(v, b, "".concat(b, "-").concat(h), (c = {}, i(c, "".concat(b, "-with-text").concat(z), m), i(c, "".concat(b, "-dashed"), !!d), c));
      return n["createElement"]("div", l({
        className: g
      }, y, {
        role: "separator"
      }), m && n["createElement"]("span", {
        className: "".concat(b, "-inner-text")
      }, m));
    });
  };
legacyExports["a"] = s;
