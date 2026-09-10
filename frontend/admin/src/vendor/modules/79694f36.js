let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./54535951.js"),
  o = interopDefault(r),
  a = require("./48383455.js");
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
      var c = t.getPrefixCls,
        r = e.prefixCls,
        a = e.size,
        s = e.className,
        h = u(e, ["prefixCls", "size", "className"]),
        f = c("btn-group", r),
        p = "";
      switch (a) {
        case "large":
          p = "lg";
          break;
        case "small":
          p = "sm";
          break;
        default:
          break;
      }
      var v = o()(f, i({}, "".concat(f, "-").concat(p), p), s);
      return n["createElement"]("div", l({}, h, {
        className: v
      }));
    });
  };
legacyExports["a"] = s;
