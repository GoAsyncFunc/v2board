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
function o(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? o(Object(n), !0).forEach(function (t) {
      a(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
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
function c(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function u(e, t, n) {
  return t && c(e.prototype, t), n && c(e, n), e;
}
function l(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && f(e, t);
}
function f(e, t) {
  return f = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, f(e, t);
}
function p(e) {
  return function () {
    var t,
      n = v(e);
    if (m()) {
      var r = v(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return d(this, t);
  };
}
function d(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? h(e) : t;
}
function h(e) {
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
function v(e) {
  return v = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, v(e);
}
var y = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  g = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var b = y(require("./reactRuntime.js")),
  w = g(require("./classNames.js")),
  x = g(require("./6d77495a.js"));
function O(e) {
  return e && !b.isValidElement(e) && "[object Object]" === Object.prototype.toString.call(e);
}
var E = function (e) {
  l(n, e);
  var t = p(n);
  function n() {
    var e;
    return s(this, n), e = t.apply(this, arguments), e.handleClick = function (t) {
      var n = e.props,
        r = n.record,
        o = n.column.onCellClick;
      o && o(r, t);
    }, e;
  }
  return u(n, [{
    key: "render",
    value: function () {
      var e,
        t,
        n = this.props,
        r = n.record,
        o = n.indentSize,
        s = n.prefixCls,
        c = n.indent,
        u = n.index,
        l = n.expandIcon,
        f = n.column,
        p = n.component,
        d = f.dataIndex,
        h = f.render,
        m = f.className,
        v = void 0 === m ? "" : m;
      t = "number" === typeof d ? x.default(r, d) : d && 0 !== d.length ? x.default(r, d) : r;
      var y,
        g,
        E = {};
      if (h && (t = h(t, r, u), O(t))) {
        E = t.props || E;
        var _ = E;
        y = _.colSpan, g = _.rowSpan, t = t.children;
      }
      f.onCell && (E = i({}, E, {}, f.onCell(r, u))), O(t) && (t = null);
      var k = l ? b.createElement("span", {
        style: {
          paddingLeft: "".concat(o * c, "px")
        },
        className: "".concat(s, "-indent indent-level-").concat(c)
      }) : null;
      if (0 === g || 0 === y) return null;
      f.align && (E.style = i({
        textAlign: f.align
      }, E.style));
      var S = w.default(v, (e = {}, a(e, "".concat(s, "-cell-ellipsis"), !!f.ellipsis), a(e, "".concat(s, "-cell-break-word"), !!f.width), e));
      if (f.ellipsis) if ("string" === typeof t) E.title = t;else if (t) {
        var C = t,
          j = C.props;
        j && j.children && "string" === typeof j.children && (E.title = j.children);
      }
      return b.createElement(p, Object.assign({
        className: S,
        onClick: this.handleClick
      }, E), k, l, t);
    }
  }]), n;
}(b.Component);
legacyExports.default = E;
