let legacyModule = module,
  legacyExports = exports;
var n = require("./reactRuntime.js"),
  r = require("./3874782b.js"),
  o = require("../Icon.js");
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
  u,
  s,
  h = 3,
  f = 1,
  p = "ant-message",
  v = "move-up";
function m(e) {
  i ? e(i) : r["a"].newInstance({
    prefixCls: p,
    transitionName: v,
    style: {
      top: l
    },
    getContainer: u,
    maxCount: s
  }, function (t) {
    i ? e(i) : (i = t, e(t));
  });
}
function d(e) {
  var t = void 0 !== e.duration ? e.duration : h,
    c = {
      info: "info-circle",
      success: "check-circle",
      error: "close-circle",
      warning: "exclamation-circle",
      loading: "loading"
    }[e.type],
    r = e.key || f++,
    a = new Promise(function (a) {
      var l = function () {
        return "function" === typeof e.onClose && e.onClose(), a(!0);
      };
      m(function (a) {
        var i = n["createElement"](o["a"], {
            type: c,
            theme: "loading" === c ? "outlined" : "filled"
          }),
          u = c ? i : "";
        a.notice({
          key: r,
          duration: t,
          style: {},
          content: n["createElement"]("div", {
            className: "".concat(p, "-custom-content").concat(e.type ? " ".concat(p, "-").concat(e.type) : "")
          }, e.icon ? e.icon : u, n["createElement"]("span", null, e.content)),
          onClose: l
        });
      });
    }),
    l = function () {
      i && i.removeNotice(r);
    };
  return l.then = function (e, t) {
    return a.then(e, t);
  }, l.promise = a, l;
}
function y(e) {
  return "[object Object]" === Object.prototype.toString.call(e) && !!e.content;
}
var b = {
  open: d,
  config: function (e) {
    void 0 !== e.top && (l = e.top, i = null), void 0 !== e.duration && (h = e.duration), void 0 !== e.prefixCls && (p = e.prefixCls), void 0 !== e.getContainer && (u = e.getContainer), void 0 !== e.transitionName && (v = e.transitionName, i = null), void 0 !== e.maxCount && (s = e.maxCount, i = null);
  },
  destroy: function () {
    i && (i.destroy(), i = null);
  }
};
["success", "info", "warning", "error", "loading"].forEach(function (e) {
  b[e] = function (t, c, n) {
    return y(t) ? b.open(a(a({}, t), {
      type: e
    })) : ("function" === typeof c && (n = c, c = void 0), b.open({
      content: t,
      duration: c,
      type: e,
      onClose: n
    }));
  };
}), b.warn = b.warning, legacyExports["a"] = b;
