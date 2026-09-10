let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return l;
}), defineExport(legacyExports, "b", function () {
  return p;
});
var r = require("./62597459.js"),
  i = require("./49744746.js"),
  o = require("./344e4f34.js"),
  a = Object(o["m"])(),
  s = r["j"];
function l(e, t, n) {
  if (!i["a"].node) {
    var r = t.getZr();
    a(r).records || (a(r).records = {}), u(r, t);
    var o = a(r).records[e] || (a(r).records[e] = {});
    o.handler = n;
  }
}
function u(e, t) {
  function n(n, r) {
    e.on(n, function (n) {
      var i = h(t);
      s(a(e).records, function (e) {
        e && r(e, n, i.dispatchAction);
      }), c(i.pendings, t);
    });
  }
  a(e).initialized || (a(e).initialized = !0, n("click", r["h"](d, "click")), n("mousemove", r["h"](d, "mousemove")), n("globalout", f));
}
function c(e, t) {
  var n,
    r = e.showTip.length,
    i = e.hideTip.length;
  r ? n = e.showTip[r - 1] : i && (n = e.hideTip[i - 1]), n && (n.dispatchAction = null, t.dispatchAction(n));
}
function f(e, t, n) {
  e.handler("leave", null, n);
}
function d(e, t, n, r) {
  t.handler(e, n, r);
}
function h(e) {
  var t = {
      showTip: [],
      hideTip: []
    },
    n = function (r) {
      var i = t[r.type];
      i ? i.push(r) : (r.dispatchAction = n, e.dispatchAction(r));
    };
  return {
    dispatchAction: n,
    pendings: t
  };
}
function p(e, t) {
  if (!i["a"].node) {
    var n = t.getZr(),
      r = (a(n).records || {})[e];
    r && (a(n).records[e] = null);
  }
}
