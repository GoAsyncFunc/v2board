let legacyModule = module,
  legacyExports = exports;
var n = require("./modules/71317449.js"),
  r = require("./modules/3874782b.js"),
  o = require("./Icon.js");
function l() {
  return l = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, l.apply(this, arguments);
}
var a,
  i,
  u = {},
  s = 4.5,
  h = 24,
  f = 24,
  v = "topRight";
function p(e) {
  var t = e.duration,
    c = e.placement,
    n = e.bottom,
    r = e.top,
    o = e.getContainer,
    l = e.closeIcon;
  void 0 !== t && (s = t), void 0 !== c && (v = c), void 0 !== n && (f = n), void 0 !== r && (h = r), void 0 !== o && (a = o), void 0 !== l && (i = l);
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
    l = e.placement,
    s = void 0 === l ? v : l,
    h = e.getContainer,
    f = void 0 === h ? a : h,
    p = e.top,
    d = e.bottom,
    z = e.closeIcon,
    y = void 0 === z ? i : z,
    b = "".concat(c, "-").concat(s);
  if (u[b]) t(u[b]);else {
    var M = n["createElement"]("span", {
      className: "".concat(c, "-close-x")
    }, y || n["createElement"](o["a"], {
      className: "".concat(c, "-close-icon"),
      type: "close"
    }));
    r["a"].newInstance({
      prefixCls: c,
      className: "".concat(c, "-").concat(s),
      style: m(s, p, d),
      getContainer: f,
      closeIcon: M
    }, function (e) {
      u[b] = e, t(e);
    });
  }
}
var z = {
  success: "check-circle-o",
  info: "info-circle-o",
  error: "close-circle-o",
  warning: "exclamation-circle-o"
};
function y(e) {
  var t = e.prefixCls || "ant-notification",
    c = "".concat(t, "-notice"),
    r = void 0 === e.duration ? s : e.duration,
    l = null;
  if (e.icon) l = n["createElement"]("span", {
    className: "".concat(c, "-icon")
  }, e.icon);else if (e.type) {
    var a = z[e.type];
    l = n["createElement"](o["a"], {
      className: "".concat(c, "-icon ").concat(c, "-icon-").concat(e.type),
      type: a
    });
  }
  var i = !e.description && l ? n["createElement"]("span", {
      className: "".concat(c, "-message-single-line-auto-margin")
    }) : null,
    u = e.placement,
    h = e.top,
    f = e.bottom,
    v = e.getContainer,
    p = e.closeIcon;
  d({
    prefixCls: t,
    placement: u,
    top: h,
    bottom: f,
    getContainer: v,
    closeIcon: p
  }, function (t) {
    t.notice({
      content: n["createElement"]("div", {
        className: l ? "".concat(c, "-with-icon") : ""
      }, l, n["createElement"]("div", {
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
var b = {
  open: y,
  close: function (e) {
    Object.keys(u).forEach(function (t) {
      return u[t].removeNotice(e);
    });
  },
  config: p,
  destroy: function () {
    Object.keys(u).forEach(function (e) {
      u[e].destroy(), delete u[e];
    });
  }
};
["success", "info", "warning", "error"].forEach(function (e) {
  b[e] = function (t) {
    return b.open(l(l({}, t), {
      type: e
    }));
  };
}), b.warn = b.warning, legacyExports["a"] = b;
