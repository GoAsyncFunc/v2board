let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "p", function () {
  return u;
}), defineExport(legacyExports, "e", function () {
  return c;
}), defineExport(legacyExports, "c", function () {
  return f;
}), defineExport(legacyExports, "g", function () {
  return d;
}), defineExport(legacyExports, "k", function () {
  return h;
}), defineExport(legacyExports, "o", function () {
  return p;
}), defineExport(legacyExports, "d", function () {
  return O;
}), defineExport(legacyExports, "l", function () {
  return S;
}), defineExport(legacyExports, "j", function () {
  return k;
}), defineExport(legacyExports, "n", function () {
  return j;
}), defineExport(legacyExports, "v", function () {
  return M;
}), defineExport(legacyExports, "s", function () {
  return T;
}), defineExport(legacyExports, "m", function () {
  return I;
}), defineExport(legacyExports, "q", function () {
  return A;
}), defineExport(legacyExports, "r", function () {
  return E;
}), defineExport(legacyExports, "b", function () {
  return P;
}), defineExport(legacyExports, "a", function () {
  return L;
}), defineExport(legacyExports, "t", function () {
  return N;
}), defineExport(legacyExports, "u", function () {
  return R;
}), defineExport(legacyExports, "f", function () {
  return z;
}), defineExport(legacyExports, "h", function () {
  return F;
}), defineExport(legacyExports, "i", function () {
  return B;
});
var r = require("./62597459.js"),
  i = require("./49744746.js"),
  o = require("./4f454c42.js");
function a(e, t, n) {
  return (t - e) * n + e;
}
var s = "series\0",
  l = "\0_ec_\0";
function u(e) {
  return e instanceof Array ? e : null == e ? [] : [e];
}
function c(e, t, n) {
  if (e) {
    e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
    for (var r = 0, i = n.length; r < i; r++) {
      var o = n[r];
      !e.emphasis[t].hasOwnProperty(o) && e[t].hasOwnProperty(o) && (e.emphasis[t][o] = e[t][o]);
    }
  }
}
var f = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"];
function d(e) {
  return !Object(r["x"])(e) || Object(r["r"])(e) || e instanceof Date ? e : e.value;
}
function h(e) {
  return Object(r["x"])(e) && !(e instanceof Array);
}
function p(e, t, n) {
  var i = "normalMerge" === n,
    o = "replaceMerge" === n,
    a = "replaceAll" === n;
  e = e || [], t = (t || []).slice();
  var s = Object(r["f"])();
  Object(r["j"])(t, function (e, n) {
    Object(r["x"])(e) || (t[n] = null);
  });
  var l = g(e, s, n);
  return (i || o) && m(l, e, s, t), i && v(l, t), i || o ? y(l, t, o) : a && b(l, t), x(l), l;
}
function g(e, t, n) {
  var r = [];
  if ("replaceAll" === n) return r;
  for (var i = 0; i < e.length; i++) {
    var o = e[i];
    o && null != o.id && t.set(o.id, i), r.push({
      existing: "replaceMerge" === n || k(o) ? null : o,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return r;
}
function m(e, t, n, i) {
  Object(r["j"])(i, function (o, a) {
    if (o && null != o.id) {
      var s = w(o.id),
        l = n.get(s);
      if (null != l) {
        var u = e[l];
        Object(r["b"])(!u.newOption, 'Duplicated option on id "' + s + '".'), u.newOption = o, u.existing = t[l], i[a] = null;
      }
    }
  });
}
function v(e, t) {
  Object(r["j"])(t, function (n, r) {
    if (n && null != n.name) for (var i = 0; i < e.length; i++) {
      var o = e[i].existing;
      if (!e[i].newOption && o && (null == o.id || null == n.id) && !k(n) && !k(o) && _("name", o, n)) return e[i].newOption = n, void (t[r] = null);
    }
  });
}
function y(e, t, n) {
  Object(r["j"])(t, function (t) {
    if (t) {
      var r,
        i = 0;
      while ((r = e[i]) && (r.newOption || k(r.existing) || r.existing && null != t.id && !_("id", t, r.existing))) i++;
      r ? (r.newOption = t, r.brandNew = n) : e.push({
        newOption: t,
        brandNew: n,
        existing: null,
        keyInfo: null
      }), i++;
    }
  });
}
function b(e, t) {
  Object(r["j"])(t, function (t) {
    e.push({
      newOption: t,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function x(e) {
  var t = Object(r["f"])();
  Object(r["j"])(e, function (e) {
    var n = e.existing;
    n && t.set(n.id, e);
  }), Object(r["j"])(e, function (e) {
    var n = e.newOption;
    Object(r["b"])(!n || null == n.id || !t.get(n.id) || t.get(n.id) === e, "id duplicates: " + (n && n.id)), n && null != n.id && t.set(n.id, e), !e.keyInfo && (e.keyInfo = {});
  }), Object(r["j"])(e, function (e, n) {
    var i = e.existing,
      o = e.newOption,
      a = e.keyInfo;
    if (Object(r["x"])(o)) {
      if (a.name = null != o.name ? w(o.name) : i ? i.name : s + n, i) a.id = w(i.id);else if (null != o.id) a.id = w(o.id);else {
        var l = 0;
        do {
          a.id = "\0" + a.name + "\0" + l++;
        } while (t.get(a.id));
      }
      t.set(a.id, e);
    }
  });
}
function _(e, t, n) {
  var r = O(t[e], null),
    i = O(n[e], null);
  return null != r && null != i && r === i;
}
function w(e) {
  return O(e, "");
}
function O(e, t) {
  return null == e ? t : Object(r["y"])(e) ? e : Object(r["w"])(e) || Object(r["z"])(e) ? e + "" : t;
}
function S(e) {
  var t = e.name;
  return !(!t || !t.indexOf(s));
}
function k(e) {
  return e && null != e.id && 0 === w(e.id).indexOf(l);
}
function j(e) {
  return l + e;
}
function M(e, t, n) {
  Object(r["j"])(e, function (e) {
    var i = e.newOption;
    Object(r["x"])(i) && (e.keyInfo.mainType = t, e.keyInfo.subType = C(t, i, e.existing, n));
  });
}
function C(e, t, n, r) {
  var i = t.type ? t.type : n ? n.subType : r.determineSubType(e, t);
  return i;
}
function T(e, t) {
  return null != t.dataIndexInside ? t.dataIndexInside : null != t.dataIndex ? Object(r["r"])(t.dataIndex) ? Object(r["D"])(t.dataIndex, function (t) {
    return e.indexOfRawIndex(t);
  }) : e.indexOfRawIndex(t.dataIndex) : null != t.name ? Object(r["r"])(t.name) ? Object(r["D"])(t.name, function (t) {
    return e.indexOfName(t);
  }) : e.indexOfName(t.name) : void 0;
}
function I() {
  var e = "__ec_inner_" + D++;
  return function (t) {
    return t[e] || (t[e] = {});
  };
}
var D = Object(o["f"])();
function A(e, t, n) {
  var r = E(t, n),
    i = r.mainTypeSpecified,
    o = r.queryOptionMap,
    a = r.others,
    s = a,
    l = n ? n.defaultMainType : null;
  return !i && l && o.set(l, {}), o.each(function (t, r) {
    var i = N(e, r, t, {
      useDefault: l === r,
      enableAll: !n || null == n.enableAll || n.enableAll,
      enableNone: !n || null == n.enableNone || n.enableNone
    });
    s[r + "Models"] = i.models, s[r + "Model"] = i.models[0];
  }), s;
}
function E(e, t) {
  var n;
  if (Object(r["y"])(e)) {
    var i = {};
    i[e + "Index"] = 0, n = i;
  } else n = e;
  var o = Object(r["f"])(),
    a = {},
    s = !1;
  return Object(r["j"])(n, function (e, n) {
    if ("dataIndex" !== n && "dataIndexInside" !== n) {
      var i = n.match(/^(\w+)(Index|Id|Name)$/) || [],
        l = i[1],
        u = (i[2] || "").toLowerCase();
      if (l && u && !(t && t.includeMainTypes && Object(r["p"])(t.includeMainTypes, l) < 0)) {
        s = s || !!l;
        var c = o.get(l) || o.set(l, {});
        c[u] = e;
      }
    } else a[n] = e;
  }), {
    mainTypeSpecified: s,
    queryOptionMap: o,
    others: a
  };
}
var P = {
    useDefault: !0,
    enableAll: !1,
    enableNone: !1
  },
  L = {
    useDefault: !1,
    enableAll: !0,
    enableNone: !0
  };
function N(e, t, n, i) {
  i = i || P;
  var o = n.index,
    a = n.id,
    s = n.name,
    l = {
      models: null,
      specified: null != o || null != a || null != s
    };
  if (!l.specified) {
    var u = void 0;
    return l.models = i.useDefault && (u = e.getComponent(t)) ? [u] : [], l;
  }
  return "none" === o || !1 === o ? (Object(r["b"])(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), l.models = [], l) : ("all" === o && (Object(r["b"])(i.enableAll, '`"all"` is not a valid value on index option.'), o = a = s = null), l.models = e.queryComponents({
    mainType: t,
    index: o,
    id: a,
    name: s
  }), l);
}
function R(e, t, n) {
  e.setAttribute ? e.setAttribute(t, n) : e[t] = n;
}
function z(e, t) {
  return e.getAttribute ? e.getAttribute(t) : e[t];
}
function F(e) {
  return "auto" === e ? i["a"].domSupported ? "html" : "richText" : e || "html";
}
function B(e, t, n, i, s) {
  var l = null == t || "auto" === t;
  if (null == i) return i;
  if (Object(r["w"])(i)) {
    var u = a(n || 0, i, s);
    return Object(o["q"])(u, l ? Math.max(Object(o["e"])(n || 0), Object(o["e"])(i)) : t);
  }
  if (Object(r["y"])(i)) return s < 1 ? n : i;
  for (var c = [], f = n, d = i, h = Math.max(f ? f.length : 0, d.length), p = 0; p < h; ++p) {
    var g = e.getDimensionInfo(p);
    if (g && "ordinal" === g.type) c[p] = (s < 1 && f ? f : d)[p];else {
      var m = f && f[p] ? f[p] : 0,
        v = d[p];
      u = a(m, v, s);
      c[p] = Object(o["q"])(u, l ? Math.max(Object(o["e"])(m), Object(o["e"])(v)) : t);
    }
  }
  return c;
}
