let legacyModule = module,
  legacyExports = exports;
require("./71393748.js");
var r = require("./redefine.js"),
  i = require("./56504f45.js"),
  o = require("./tryCatchTest.js"),
  a = require("./5a44722f.js"),
  s = require("./wellKnownSymbol.js"),
  l = require("./33333070.js"),
  c = s("species"),
  u = !o(function () {
    var e = /./;
    return e.exec = function () {
      var e = [];
      return e.groups = {
        a: "7"
      }, e;
    }, "7" !== "".replace(e, "$<a>");
  }),
  h = function () {
    var e = /(?:)/,
      t = e.exec;
    e.exec = function () {
      return t.apply(this, arguments);
    };
    var n = "ab".split(e);
    return 2 === n.length && "a" === n[0] && "b" === n[1];
  }();
legacyModule.exports = function (e, t, n) {
  var f = s(e),
    d = !o(function () {
      var t = {};
      return t[f] = function () {
        return 7;
      }, 7 != ""[e](t);
    }),
    p = d ? !o(function () {
      var t = !1,
        n = /a/;
      return n.exec = function () {
        return t = !0, null;
      }, "split" === e && (n.constructor = {}, n.constructor[c] = function () {
        return n;
      }), n[f](""), !t;
    }) : void 0;
  if (!d || !p || "replace" === e && !u || "split" === e && !h) {
    var m = /./[f],
      g = n(a, f, ""[e], function (e, t, n, r, i) {
        return t.exec === l ? d && !i ? {
          done: !0,
          value: m.call(t, n, r)
        } : {
          done: !0,
          value: e.call(n, t, r)
        } : {
          done: !1
        };
      }),
      v = g[0],
      y = g[1];
    r(String.prototype, e, v), i(RegExp.prototype, f, 2 == t ? function (e, t) {
      return y.call(e, this, t);
    } : function (e) {
      return y.call(e, this);
    });
  }
};
