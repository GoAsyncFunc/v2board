let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "c", function () {
  return a;
}), defineExport(legacyExports, "a", function () {
  return s;
}), defineExport(legacyExports, "b", function () {
  return l;
}), defineExport(legacyExports, "d", function () {
  return u;
});
var r = require("./62597459.js"),
  i = require("./596c3763.js"),
  o = Math.round(10 * Math.random());
function a(e) {
  return [e || "", o++].join("_");
}
function s(e) {
  var t = {};
  e.registerSubTypeDefaulter = function (e, n) {
    var r = Object(i["f"])(e);
    t[r.main] = n;
  }, e.determineSubType = function (n, r) {
    var o = r.type;
    if (!o) {
      var a = Object(i["f"])(n).main;
      e.hasSubTypes(n) && t[a] && (o = t[a](r));
    }
    return o;
  };
}
function l(e, t) {
  function n(e) {
    var n = {},
      a = [];
    return r["j"](e, function (s) {
      var l = i(n, s),
        u = l.originalDeps = t(s),
        c = o(u, e);
      l.entryCount = c.length, 0 === l.entryCount && a.push(s), r["j"](c, function (e) {
        r["p"](l.predecessor, e) < 0 && l.predecessor.push(e);
        var t = i(n, e);
        r["p"](t.successor, e) < 0 && t.successor.push(s);
      });
    }), {
      graph: n,
      noEntryList: a
    };
  }
  function i(e, t) {
    return e[t] || (e[t] = {
      predecessor: [],
      successor: []
    }), e[t];
  }
  function o(e, t) {
    var n = [];
    return r["j"](e, function (e) {
      r["p"](t, e) >= 0 && n.push(e);
    }), n;
  }
  e.topologicalTravel = function (e, t, i, o) {
    if (e.length) {
      var a = n(t),
        s = a.graph,
        l = a.noEntryList,
        u = {};
      r["j"](e, function (e) {
        u[e] = !0;
      });
      while (l.length) {
        var c = l.pop(),
          f = s[c],
          d = !!u[c];
        d && (i.call(o, c, f.originalDeps.slice()), delete u[c]), r["j"](f.successor, d ? p : h);
      }
      r["j"](u, function () {
        var e = "";
        throw new Error(e);
      });
    }
    function h(e) {
      s[e].entryCount--, 0 === s[e].entryCount && l.push(e);
    }
    function p(e) {
      u[e] = !0, h(e);
    }
  };
}
function u(e, t) {
  return r["E"](r["E"]({}, e, !0), t, !0);
}
