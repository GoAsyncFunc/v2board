let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "f", function () {
  return l;
}), defineExport(legacyExports, "d", function () {
  return c;
}), defineExport(legacyExports, "b", function () {
  return f;
}), defineExport(legacyExports, "e", function () {
  return h;
}), defineExport(legacyExports, "a", function () {
  return g;
}), defineExport(legacyExports, "c", function () {
  return y;
});
var r = require("./6d725347.js"),
  i = require("./62597459.js"),
  o = ".",
  a = "___EC__COMPONENT__CONTAINER___",
  s = "___EC__EXTENDED_CLASS___";
function l(e) {
  var t = {
    main: "",
    sub: ""
  };
  if (e) {
    var n = e.split(o);
    t.main = n[0] || "", t.sub = n[1] || "";
  }
  return t;
}
function u(e) {
  i["b"](/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), 'componentType "' + e + '" illegal');
}
function c(e) {
  return !(!e || !e[s]);
}
function f(e, t) {
  e.$constructor = e, e.extend = function (e) {
    var t,
      n = this;
    return d(n) ? t = function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      return Object(r["a"])(t, e), t;
    }(n) : (t = function () {
      (e.$constructor || n).apply(this, arguments);
    }, i["q"](t, this)), i["l"](t.prototype, e), t[s] = !0, t.extend = this.extend, t.superCall = m, t.superApply = v, t.superClass = n, t;
  };
}
function d(e) {
  return i["u"](e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function h(e, t) {
  e.extend = t.extend;
}
var p = Math.round(10 * Math.random());
function g(e) {
  var t = ["__\0is_clz", p++].join("_");
  e.prototype[t] = !0, e.isInstance = function (e) {
    return !(!e || !e[t]);
  };
}
function m(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
  return this.superClass.prototype[t].apply(e, n);
}
function v(e, t, n) {
  return this.superClass.prototype[t].apply(e, n);
}
function y(e) {
  var t = {};
  function n(e) {
    var n = t[e.main];
    return n && n[a] || (n = t[e.main] = {}, n[a] = !0), n;
  }
  e.registerClass = function (e) {
    var r = e.type || e.prototype.type;
    if (r) {
      u(r), e.prototype.type = r;
      var i = l(r);
      if (i.sub) {
        if (i.sub !== a) {
          var o = n(i);
          o[i.sub] = e;
        }
      } else t[i.main] = e;
    }
    return e;
  }, e.getClass = function (e, n, r) {
    var i = t[e];
    if (i && i[a] && (i = n ? i[n] : null), r && !i) throw new Error(n ? "Component " + e + "." + (n || "") + " is used but not imported." : e + ".type should be specified.");
    return i;
  }, e.getClassesByMainType = function (e) {
    var n = l(e),
      r = [],
      o = t[n.main];
    return o && o[a] ? i["j"](o, function (e, t) {
      t !== a && r.push(e);
    }) : r.push(o), r;
  }, e.hasClass = function (e) {
    var n = l(e);
    return !!t[n.main];
  }, e.getAllClassMainTypes = function () {
    var e = [];
    return i["j"](t, function (t, n) {
      e.push(n);
    }), e;
  }, e.hasSubTypes = function (e) {
    var n = l(e),
      r = t[n.main];
    return r && r[a];
  };
}
