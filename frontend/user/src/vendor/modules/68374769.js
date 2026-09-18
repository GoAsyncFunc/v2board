let legacyModule = module,
  legacyExports = exports;
require("./71393748.js");
var r = require("./redefine.js"),
  o = require("./56504f45.js"),
  i = require("./tryCatchTest.js"),
  a = require("./requireObjectCoercible.js"),
  s = require("./wellKnownSymbol.js"),
  c = require("./33333070.js"),
  u = s("species"),
  l = !i(function () {
    var e = /./;
    return e.exec = function () {
      var e = [];
      return e.groups = {
        a: "7"
      }, e;
    }, "7" !== "".replace(e, "$<a>");
  }),
  f = function () {
    var e = /(?:)/,
      t = e.exec;
    e.exec = function () {
      return t.apply(this, arguments);
    };
    var n = "ab".split(e);
    return 2 === n.length && "a" === n[0] && "b" === n[1];
  }();
legacyModule.exports = function (e, t, n) {
  var p = s(e),
    d = !i(function () {
      var t = {};
      return t[p] = function () {
        return 7;
      }, 7 != ""[e](t);
    }),
    h = d ? !i(function () {
      var t = !1,
        n = /a/;
      return n.exec = function () {
        return t = !0, null;
      }, "split" === e && (n.constructor = {}, n.constructor[u] = function () {
        return n;
      }), n[p](""), !t;
    }) : void 0;
  if (!d || !h || "replace" === e && !l || "split" === e && !f) {
    var m = /./[p],
      v = n(a, p, ""[e], function (e, t, n, r, o) {
        return t.exec === c ? d && !o ? {
          done: !0,
          value: m.call(t, n, r)
        } : {
          done: !0,
          value: e.call(n, t, r)
        } : {
          done: !1
        };
      }),
      y = v[0],
      g = v[1];
    r(String.prototype, e, y), o(RegExp.prototype, p, 2 == t ? function (e, t) {
      return g.call(e, this, t);
    } : function (e) {
      return g.call(e, this);
    });
  }
};
