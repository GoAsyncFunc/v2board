let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return s;
}), defineExport(legacyExports, "g", function () {
  return l;
}), defineExport(legacyExports, "f", function () {
  return u;
}), defineExport(legacyExports, "e", function () {
  return c;
}), defineExport(legacyExports, "c", function () {
  return h;
}), defineExport(legacyExports, "d", function () {
  return p;
}), defineExport(legacyExports, "b", function () {
  return g;
}), defineExport(legacyExports, "h", function () {
  return m;
});
var r = require("./62597459.js"),
  i = require("./5a653132.js"),
  o = require("./4f454c42.js"),
  a = require("./2b486175.js");
function s(e) {
  if (!Object(o["g"])(e)) return r["y"](e) ? e : "-";
  var t = (e + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function l(e, t) {
  return e = (e || "").toLowerCase().replace(/-(.)/g, function (e, t) {
    return t.toUpperCase();
  }), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var u = r["H"];
function c(e, t, n) {
  var i = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
  function l(e) {
    return e && r["O"](e) ? e : "-";
  }
  function u(e) {
    return !(null == e || isNaN(e) || !isFinite(e));
  }
  var c = "time" === t,
    f = e instanceof Date;
  if (c || f) {
    var d = c ? Object(o["l"])(e) : e;
    if (!isNaN(+d)) return Object(a["h"])(d, i, n);
    if (f) return "-";
  }
  if ("ordinal" === t) return r["z"](e) ? l(e) : r["w"](e) && u(e) ? e + "" : "-";
  var h = Object(o["k"])(e);
  return u(h) ? s(h) : r["z"](e) ? l(e) : "boolean" === typeof e ? e + "" : "-";
}
var f = ["a", "b", "c", "d", "e", "f", "g"],
  d = function (e, t) {
    return "{" + e + (null == t ? "" : t) + "}";
  };
function h(e, t, n) {
  r["r"](t) || (t = [t]);
  var o = t.length;
  if (!o) return "";
  for (var a = t[0].$vars || [], s = 0; s < a.length; s++) {
    var l = f[s];
    e = e.replace(d(l), d(l, 0));
  }
  for (var u = 0; u < o; u++) for (var c = 0; c < a.length; c++) {
    var h = t[u][a[c]];
    e = e.replace(d(f[c], u), n ? Object(i["a"])(h) : h);
  }
  return e;
}
function p(e, t) {
  var n = r["y"](e) ? {
      color: e,
      extraCssText: t
    } : e || {},
    o = n.color,
    a = n.type;
  t = n.extraCssText;
  var s = n.renderMode || "html";
  if (!o) return "";
  if ("html" === s) return "subItem" === a ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + Object(i["a"])(o) + ";" + (t || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + Object(i["a"])(o) + ";" + (t || "") + '"></span>';
  var l = n.markerId || "markerX";
  return {
    renderMode: s,
    content: "{" + l + "|}  ",
    style: "subItem" === a ? {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: o
    } : {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: o
    }
  };
}
function g(e, t) {
  return t = t || "transparent", r["y"](e) ? e : r["x"](e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
function m(e, t) {
  if ("_blank" === t || "blank" === t) {
    var n = window.open();
    n.opener = null, n.location.href = e;
  } else window.open(e, t);
}
