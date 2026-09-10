let legacyModule = module,
  legacyExports = exports;
function r(e) {
  "@babel/helpers - typeof";

  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
}
function i(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? i(Object(n), !0).forEach(function (t) {
      a(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function a(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function l(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function c(e, t, n) {
  return t && l(e.prototype, t), n && l(e, n), e;
}
function u(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && h(e, t);
}
function h(e, t) {
  return h = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, h(e, t);
}
function f(e) {
  return function () {
    var t,
      n = g(e);
    if (m()) {
      var r = g(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return d(this, t);
  };
}
function d(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? p(e) : t;
}
function p(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function m() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function g(e) {
  return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, g(e);
}
var v = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  y = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var b = v(require("./71317449.js")),
  w = y(require("./54535951.js")),
  x = y(require("./6d77495a.js"));
function _(e) {
  return e && !b.isValidElement(e) && "[object Object]" === Object.prototype.toString.call(e);
}
var E = function (e) {
  u(n, e);
  var t = f(n);
  function n() {
    var e;
    return s(this, n), e = t.apply(this, arguments), e.handleClick = function (t) {
      var n = e.props,
        r = n.record,
        i = n.column.onCellClick;
      i && i(r, t);
    }, e;
  }
  return c(n, [{
    key: "render",
    value: function () {
      var e,
        t,
        n = this.props,
        r = n.record,
        i = n.indentSize,
        s = n.prefixCls,
        l = n.indent,
        c = n.index,
        u = n.expandIcon,
        h = n.column,
        f = n.component,
        d = h.dataIndex,
        p = h.render,
        m = h.className,
        g = void 0 === m ? "" : m;
      t = "number" === typeof d ? x.default(r, d) : d && 0 !== d.length ? x.default(r, d) : r;
      var v,
        y,
        E = {};
      if (p && (t = p(t, r, c), _(t))) {
        E = t.props || E;
        var S = E;
        v = S.colSpan, y = S.rowSpan, t = t.children;
      }
      h.onCell && (E = o({}, E, {}, h.onCell(r, c))), _(t) && (t = null);
      var k = u ? b.createElement("span", {
        style: {
          paddingLeft: "".concat(i * l, "px")
        },
        className: "".concat(s, "-indent indent-level-").concat(l)
      }) : null;
      if (0 === y || 0 === v) return null;
      h.align && (E.style = o({
        textAlign: h.align
      }, E.style));
      var C = w.default(g, (e = {}, a(e, "".concat(s, "-cell-ellipsis"), !!h.ellipsis), a(e, "".concat(s, "-cell-break-word"), !!h.width), e));
      if (h.ellipsis) if ("string" === typeof t) E.title = t;else if (t) {
        var O = t,
          T = O.props;
        T && T.children && "string" === typeof T.children && (E.title = T.children);
      }
      return b.createElement(f, Object.assign({
        className: C,
        onClick: this.handleClick
      }, E), k, u, t);
    }
  }]), n;
}(b.Component);
legacyExports.default = E;
