let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
}
function o() {
  return o = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, o.apply(this, arguments);
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
function a(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? i(n, !0).forEach(function (t) {
      y(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(n).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function s(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = c(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function c(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
function u(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function l(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function f(e, t, n) {
  return t && l(e.prototype, t), n && l(e, n), e;
}
function p(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? h(e) : t;
}
function d(e) {
  return d = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, d(e);
}
function h(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function m(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && v(e, t);
}
function v(e, t) {
  return v = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, v(e, t);
}
function y(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var g = require("./reactRuntime.js"),
  b = (require("./propTypesRuntime.js"), require("./48333855.js")),
  w = require("./61525445.js");
function x(e) {
  for (var t = "", n = 0; n < e.length; n++) {
    var r = e.charCodeAt(n);
    r < 128 ? t += String.fromCharCode(r) : r < 2048 ? (t += String.fromCharCode(192 | r >> 6), t += String.fromCharCode(128 | 63 & r)) : r < 55296 || r >= 57344 ? (t += String.fromCharCode(224 | r >> 12), t += String.fromCharCode(128 | r >> 6 & 63), t += String.fromCharCode(128 | 63 & r)) : (n++, r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(n)), t += String.fromCharCode(240 | r >> 18), t += String.fromCharCode(128 | r >> 12 & 63), t += String.fromCharCode(128 | r >> 6 & 63), t += String.fromCharCode(128 | 63 & r));
  }
  return t;
}
var O = {
    size: 128,
    level: "L",
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    includeMargin: !1
  },
  E = 4,
  _ = .1;
function k(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = [];
  return e.forEach(function (e, r) {
    var o = null;
    e.forEach(function (i, a) {
      if (!i && null !== o) return n.push("M".concat(o + t, " ").concat(r + t, "h").concat(a - o, "v1H").concat(o + t, "z")), void (o = null);
      if (a !== e.length - 1) i && null === o && (o = a);else {
        if (!i) return;
        null === o ? n.push("M".concat(a + t, ",").concat(r + t, " h1v1H").concat(a + t, "z")) : n.push("M".concat(o + t, ",").concat(r + t, " h").concat(a + 1 - o, "v1H").concat(o + t, "z"));
      }
    });
  }), n.join("");
}
function S(e, t) {
  return e.slice().map(function (e, n) {
    return n < t.y || n >= t.y + t.h ? e : e.map(function (e, n) {
      return (n < t.x || n >= t.x + t.w) && e;
    });
  });
}
function C(e, t) {
  var n = e.imageSettings,
    r = e.size,
    o = e.includeMargin;
  if (null == n) return null;
  var i = o ? E : 0,
    a = t.length + 2 * i,
    s = Math.floor(r * _),
    c = a / r,
    u = (n.width || s) * c,
    l = (n.height || s) * c,
    f = null == n.x ? t.length / 2 - u / 2 : n.x * c,
    p = null == n.y ? t.length / 2 - l / 2 : n.y * c,
    d = null;
  if (n.excavate) {
    var h = Math.floor(f),
      m = Math.floor(p),
      v = Math.ceil(u + f - h),
      y = Math.ceil(l + p - m);
    d = {
      x: h,
      y: m,
      w: v,
      h: y
    };
  }
  return {
    x: f,
    y: p,
    h: l,
    w: u,
    excavation: d
  };
}
var j = function () {
    try {
      new Path2D().addPath(new Path2D());
    } catch (e) {
      return !1;
    }
    return !0;
  }(),
  P = function (e) {
    function t() {
      var e, n;
      u(this, t);
      for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
      return n = p(this, (e = d(t)).call.apply(e, [this].concat(o))), y(h(n), "_canvas", void 0), y(h(n), "_image", void 0), y(h(n), "state", {
        imgLoaded: !1
      }), y(h(n), "handleImageLoad", function () {
        n.setState({
          imgLoaded: !0
        });
      }), n;
    }
    return m(t, e), f(t, [{
      key: "componentDidMount",
      value: function () {
        this._image && this._image.complete && this.handleImageLoad(), this.update();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function (e) {
        var t,
          n,
          r = null === (t = this.props.imageSettings) || void 0 === t ? void 0 : t.src,
          o = null === (n = e.imageSettings) || void 0 === n ? void 0 : n.src;
        r !== o && this.setState({
          imgLoaded: !1
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        this.update();
      }
    }, {
      key: "update",
      value: function () {
        var e = this.props,
          t = e.value,
          n = e.size,
          r = e.level,
          o = e.bgColor,
          i = e.fgColor,
          a = e.includeMargin,
          s = e.imageSettings,
          c = new b(-1, w[r]);
        if (c.addData(x(t)), c.make(), null != this._canvas) {
          var u = this._canvas,
            l = u.getContext("2d");
          if (!l) return;
          var f = c.modules;
          if (null === f) return;
          var p = a ? E : 0,
            d = f.length + 2 * p,
            h = C(this.props, f);
          null != s && null != h && null != h.excavation && (f = S(f, h.excavation));
          var m = window.devicePixelRatio || 1;
          u.height = u.width = n * m;
          var v = n / d * m;
          l.scale(v, v), l.fillStyle = o, l.fillRect(0, 0, d, d), l.fillStyle = i, j ? l.fill(new Path2D(k(f, p))) : f.forEach(function (e, t) {
            e.forEach(function (e, n) {
              e && l.fillRect(n + p, t + p, 1, 1);
            });
          }), this.state.imgLoaded && this._image && null != h && l.drawImage(this._image, h.x + p, h.y + p, h.w, h.h);
        }
      }
    }, {
      key: "render",
      value: function () {
        var e = this,
          t = this.props,
          n = (t.value, t.size),
          r = (t.level, t.bgColor, t.fgColor, t.style),
          i = (t.includeMargin, t.imageSettings),
          c = s(t, ["value", "size", "level", "bgColor", "fgColor", "style", "includeMargin", "imageSettings"]),
          u = a({
            height: n,
            width: n
          }, r),
          l = null,
          f = i && i.src;
        return null != i && null != f && (l = g.createElement("img", {
          src: f,
          style: {
            display: "none"
          },
          onLoad: this.handleImageLoad,
          ref: function (t) {
            return e._image = t;
          }
        })), g.createElement(g.Fragment, null, g.createElement("canvas", o({
          style: u,
          height: n,
          width: n,
          ref: function (t) {
            return e._canvas = t;
          }
        }, c)), l);
      }
    }]), t;
  }(g.PureComponent);
y(P, "defaultProps", O);
var T = function (e) {
  function t() {
    return u(this, t), p(this, d(t).apply(this, arguments));
  }
  return m(t, e), f(t, [{
    key: "render",
    value: function () {
      var e = this.props,
        t = e.value,
        n = e.size,
        r = e.level,
        i = e.bgColor,
        a = e.fgColor,
        c = e.includeMargin,
        u = e.imageSettings,
        l = s(e, ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "imageSettings"]),
        f = new b(-1, w[r]);
      f.addData(x(t)), f.make();
      var p = f.modules;
      if (null === p) return null;
      var d = c ? E : 0,
        h = p.length + 2 * d,
        m = C(this.props, p),
        v = null;
      null != u && null != m && (null != m.excavation && (p = S(p, m.excavation)), v = g.createElement("image", {
        xlinkHref: u.src,
        height: m.h,
        width: m.w,
        x: m.x + d,
        y: m.y + d,
        preserveAspectRatio: "none"
      }));
      var y = k(p, d);
      return g.createElement("svg", o({
        shapeRendering: "crispEdges",
        height: n,
        width: n,
        viewBox: "0 0 ".concat(h, " ").concat(h)
      }, l), g.createElement("path", {
        fill: i,
        d: "M0,0 h".concat(h, "v").concat(h, "H0z")
      }), g.createElement("path", {
        fill: a,
        d: y
      }), v);
    }
  }]), t;
}(g.PureComponent);
y(T, "defaultProps", O);
var L = function (e) {
  var t = e.renderAs,
    n = s(e, ["renderAs"]),
    r = "svg" === t ? T : P;
  return g.createElement(r, n);
};
L.defaultProps = a({
  renderAs: "canvas"
}, O), legacyModule.exports = L;
