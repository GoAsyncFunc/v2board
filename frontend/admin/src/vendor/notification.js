let legacyModule = module,
  legacyExports = exports;
var n = require("./modules/71317449.js"),
  r = require("./modules/3874782b.js"),
  o = require("./Icon.js");
function a() {
  return a = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, a.apply(this, arguments);
}
var l,
  i,
  u = {},
  s = 4.5,
  h = 24,
  f = 24,
  p = "topRight";
function v(e) {
  var t = e.duration,
    c = e.placement,
    n = e.bottom,
    r = e.top,
    o = e.getContainer,
    a = e.closeIcon;
  void 0 !== t && (s = t), void 0 !== c && (p = c), void 0 !== n && (f = n), void 0 !== r && (h = r), void 0 !== o && (l = o), void 0 !== a && (i = a);
}
function m(e) {
  var t,
    c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : h,
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : f;
  switch (e) {
    case "topLeft":
      t = {
        left: 0,
        top: c,
        bottom: "auto"
      };
      break;
    case "topRight":
      t = {
        right: 0,
        top: c,
        bottom: "auto"
      };
      break;
    case "bottomLeft":
      t = {
        left: 0,
        top: "auto",
        bottom: n
      };
      break;
    default:
      t = {
        right: 0,
        top: "auto",
        bottom: n
      };
      break;
  }
  return t;
}
function d(e, t) {
  var c = e.prefixCls,
    a = e.placement,
    s = void 0 === a ? p : a,
    h = e.getContainer,
    f = void 0 === h ? l : h,
    v = e.top,
    d = e.bottom,
    y = e.closeIcon,
    b = void 0 === y ? i : y,
    z = "".concat(c, "-").concat(s);
  if (u[z]) t(u[z]);else {
    var g = n["createElement"]("span", {
      className: "".concat(c, "-close-x")
    }, b || n["createElement"](o["a"], {
      className: "".concat(c, "-close-icon"),
      type: "close"
    }));
    r["a"].newInstance({
      prefixCls: c,
      className: "".concat(c, "-").concat(s),
      style: m(s, v, d),
      getContainer: f,
      closeIcon: g
    }, function (e) {
      u[z] = e, t(e);
    });
  }
}
var y = {
  success: "check-circle-o",
  info: "info-circle-o",
  error: "close-circle-o",
  warning: "exclamation-circle-o"
};
function b(e) {
  var t = e.prefixCls || "ant-notification",
    c = "".concat(t, "-notice"),
    r = void 0 === e.duration ? s : e.duration,
    a = null;
  if (e.icon) a = n["createElement"]("span", {
    className: "".concat(c, "-icon")
  }, e.icon);else if (e.type) {
    var l = y[e.type];
    a = n["createElement"](o["a"], {
      className: "".concat(c, "-icon ").concat(c, "-icon-").concat(e.type),
      type: l
    });
  }
  var i = !e.description && a ? n["createElement"]("span", {
      className: "".concat(c, "-message-single-line-auto-margin")
    }) : null,
    u = e.placement,
    h = e.top,
    f = e.bottom,
    p = e.getContainer,
    v = e.closeIcon;
  d({
    prefixCls: t,
    placement: u,
    top: h,
    bottom: f,
    getContainer: p,
    closeIcon: v
  }, function (t) {
    t.notice({
      content: n["createElement"]("div", {
        className: a ? "".concat(c, "-with-icon") : ""
      }, a, n["createElement"]("div", {
        className: "".concat(c, "-message")
      }, i, e.message), n["createElement"]("div", {
        className: "".concat(c, "-description")
      }, e.description), e.btn ? n["createElement"]("span", {
        className: "".concat(c, "-btn")
      }, e.btn) : null),
      duration: r,
      closable: !0,
      onClose: e.onClose,
      onClick: e.onClick,
      key: e.key,
      style: e.style || {},
      className: e.className
    });
  });
}
var z = {
  open: b,
  close: function (e) {
    Object.keys(u).forEach(function (t) {
      return u[t].removeNotice(e);
    });
  },
  config: v,
  destroy: function () {
    Object.keys(u).forEach(function (e) {
      u[e].destroy(), delete u[e];
    });
  }
};
["success", "info", "warning", "error"].forEach(function (e) {
  z[e] = function (t) {
    return z.open(a(a({}, t), {
      type: e
    }));
  };
}), z.warn = z.warning, legacyExports["a"] = z;
