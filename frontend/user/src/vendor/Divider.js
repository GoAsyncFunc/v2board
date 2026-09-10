let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
var n = require("./modules/71317449.js"),
  r = require("./modules/54535951.js"),
  o = interopDefault(r),
  l = require("./modules/48383455.js");
function a() {
  return a = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, a.apply(this, arguments);
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
    return n["createElement"](l["a"], null, function (t) {
      var c,
        r = t.getPrefixCls,
        l = e.prefixCls,
        s = e.type,
        h = void 0 === s ? "horizontal" : s,
        f = e.orientation,
        v = void 0 === f ? "center" : f,
        p = e.className,
        m = e.children,
        d = e.dashed,
        z = u(e, ["prefixCls", "type", "orientation", "className", "children", "dashed"]),
        y = r("divider", l),
        b = v.length > 0 ? "-".concat(v) : v,
        M = o()(p, y, "".concat(y, "-").concat(h), (c = {}, i(c, "".concat(y, "-with-text").concat(b), m), i(c, "".concat(y, "-dashed"), !!d), c));
      return n["createElement"]("div", a({
        className: M
      }, z, {
        role: "separator"
      }), m && n["createElement"]("span", {
        className: "".concat(y, "-inner-text")
      }, m));
    });
  };
legacyExports["a"] = s;
