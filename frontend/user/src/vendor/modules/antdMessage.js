let legacyModule = module,
  legacyExports = exports;
var n = require("./reactRuntime.js"),
  r = require("./3874782b.js"),
  o = require("../Icon.js");
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
  u,
  s,
  h = 3,
  f = 1,
  v = "ant-message",
  p = "move-up";
function m(e) {
  i ? e(i) : r["a"].newInstance({
    prefixCls: v,
    transitionName: p,
    style: {
      top: a
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
    l = new Promise(function (l) {
      var a = function () {
        return "function" === typeof e.onClose && e.onClose(), l(!0);
      };
      m(function (l) {
        var i = n["createElement"](o["a"], {
            type: c,
            theme: "loading" === c ? "outlined" : "filled"
          }),
          u = c ? i : "";
        l.notice({
          key: r,
          duration: t,
          style: {},
          content: n["createElement"]("div", {
            className: "".concat(v, "-custom-content").concat(e.type ? " ".concat(v, "-").concat(e.type) : "")
          }, e.icon ? e.icon : u, n["createElement"]("span", null, e.content)),
          onClose: a
        });
      });
    }),
    a = function () {
      i && i.removeNotice(r);
    };
  return a.then = function (e, t) {
    return l.then(e, t);
  }, a.promise = l, a;
}
function z(e) {
  return "[object Object]" === Object.prototype.toString.call(e) && !!e.content;
}
var y = {
  open: d,
  config: function (e) {
    void 0 !== e.top && (a = e.top, i = null), void 0 !== e.duration && (h = e.duration), void 0 !== e.prefixCls && (v = e.prefixCls), void 0 !== e.getContainer && (u = e.getContainer), void 0 !== e.transitionName && (p = e.transitionName, i = null), void 0 !== e.maxCount && (s = e.maxCount, i = null);
  },
  destroy: function () {
    i && (i.destroy(), i = null);
  }
};
["success", "info", "warning", "error", "loading"].forEach(function (e) {
  y[e] = function (t, c, n) {
    return z(t) ? y.open(l(l({}, t), {
      type: e
    })) : ("function" === typeof c && (n = c, c = void 0), y.open({
      content: t,
      duration: c,
      type: e,
      onClose: n
    }));
  };
}), y.warn = y.warning, legacyExports["a"] = y;
