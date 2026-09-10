let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "c", function () {
  return d;
}), defineExport(legacyExports, "b", function () {
  return y;
}), defineExport(legacyExports, "e", function () {
  return k;
}), defineExport(legacyExports, "d", function () {
  return j;
}), defineExport(legacyExports, "a", function () {
  return M;
});
var r = require("./5a653132.js"),
  i = require("./37614b42.js"),
  o = require("./62597459.js"),
  a = require("./74396d68.js"),
  s = require("./4f454c42.js"),
  l = "line-height:1";
function u(e, t) {
  var n = e.color || "#6e7079",
    i = e.fontSize || 12,
    o = e.fontWeight || "400",
    a = e.color || "#464646",
    s = e.fontSize || 14,
    l = e.fontWeight || "900";
  return "html" === t ? {
    nameStyle: "font-size:" + Object(r["a"])(i + "") + "px;color:" + Object(r["a"])(n) + ";font-weight:" + Object(r["a"])(o + ""),
    valueStyle: "font-size:" + Object(r["a"])(s + "") + "px;color:" + Object(r["a"])(a) + ";font-weight:" + Object(r["a"])(l + "")
  } : {
    nameStyle: {
      fontSize: i,
      fill: n,
      fontWeight: o
    },
    valueStyle: {
      fontSize: s,
      fill: a,
      fontWeight: l
    }
  };
}
var c = [0, 10, 20, 30],
  f = ["", "\n", "\n\n", "\n\n\n"];
function d(e, t) {
  return t.type = e, t;
}
function h(e) {
  return "section" === e.type;
}
function p(e) {
  return h(e) ? m : v;
}
function g(e) {
  if (h(e)) {
    var t = 0,
      n = e.blocks.length,
      r = n > 1 || n > 0 && !e.noHeader;
    return Object(o["j"])(e.blocks, function (e) {
      var n = g(e);
      n >= t && (t = n + +(r && (!n || h(e) && !e.noHeader)));
    }), t;
  }
  return 0;
}
function m(e, t, n, s) {
  var c = t.noHeader,
    f = b(g(t)),
    d = [],
    h = t.blocks || [];
  Object(o["b"])(!h || Object(o["r"])(h)), h = h || [];
  var m = e.orderMode;
  if (t.sortBlocks && m) {
    h = h.slice();
    var v = {
      valueAsc: "asc",
      valueDesc: "desc"
    };
    if (Object(o["o"])(v, m)) {
      var y = new a["a"](v[m], null);
      h.sort(function (e, t) {
        return y.evaluate(e.sortParam, t.sortParam);
      });
    } else "seriesDesc" === m && h.reverse();
  }
  Object(o["j"])(h, function (n, r) {
    var i = t.valueFormatter,
      a = p(n)(i ? Object(o["l"])(Object(o["l"])({}, e), {
        valueFormatter: i
      }) : e, n, r > 0 ? f.html : 0, s);
    null != a && d.push(a);
  });
  var _ = "richText" === e.renderMode ? d.join(f.richText) : x(d.join(""), c ? n : f.html);
  if (c) return _;
  var w = Object(i["e"])(t.header, "ordinal", e.useUTC),
    S = u(s, e.renderMode).nameStyle;
  return "richText" === e.renderMode ? O(e, w, S) + f.richText + _ : x('<div style="' + S + ";" + l + ';">' + Object(r["a"])(w) + "</div>" + _, n);
}
function v(e, t, n, r) {
  var a = e.renderMode,
    s = t.noName,
    l = t.noValue,
    c = !t.markerType,
    f = t.name,
    d = e.useUTC,
    h = t.valueFormatter || e.valueFormatter || function (e) {
      return e = Object(o["r"])(e) ? e : [e], Object(o["D"])(e, function (e, t) {
        return Object(i["e"])(e, Object(o["r"])(m) ? m[t] : m, d);
      });
    };
  if (!s || !l) {
    var p = c ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || "#333", a),
      g = s ? "" : Object(i["e"])(f, "ordinal", d),
      m = t.valueType,
      v = l ? [] : h(t.value),
      y = !c || !s,
      b = !c && s,
      k = u(r, a),
      j = k.nameStyle,
      M = k.valueStyle;
    return "richText" === a ? (c ? "" : p) + (s ? "" : O(e, g, j)) + (l ? "" : S(e, v, y, b, M)) : x((c ? "" : p) + (s ? "" : _(g, !c, j)) + (l ? "" : w(v, y, b, M)), n);
  }
}
function y(e, t, n, r, i, o) {
  if (e) {
    var a = p(e),
      s = {
        useUTC: i,
        renderMode: n,
        orderMode: r,
        markupStyleCreator: t,
        valueFormatter: e.valueFormatter
      };
    return a(s, e, 0, o);
  }
}
function b(e) {
  return {
    html: c[e],
    richText: f[e]
  };
}
function x(e, t) {
  var n = '<div style="clear:both"></div>',
    r = "margin: " + t + "px 0 0";
  return '<div style="' + r + ";" + l + ';">' + e + n + "</div>";
}
function _(e, t, n) {
  var i = t ? "margin-left:2px" : "";
  return '<span style="' + n + ";" + i + '">' + Object(r["a"])(e) + "</span>";
}
function w(e, t, n, i) {
  var a = n ? "10px" : "20px",
    s = t ? "float:right;margin-left:" + a : "";
  return e = Object(o["r"])(e) ? e : [e], '<span style="' + s + ";" + i + '">' + Object(o["D"])(e, function (e) {
    return Object(r["a"])(e);
  }).join("&nbsp;&nbsp;") + "</span>";
}
function O(e, t, n) {
  return e.markupStyleCreator.wrapRichTextStyle(t, n);
}
function S(e, t, n, r, i) {
  var a = [i],
    s = r ? 10 : 20;
  return n && a.push({
    padding: [0, 0, 0, s],
    align: "right"
  }), e.markupStyleCreator.wrapRichTextStyle(Object(o["r"])(t) ? t.join("  ") : t, a);
}
function k(e, t) {
  var n = e.getData().getItemVisual(t, "style"),
    r = n[e.visualDrawType];
  return Object(i["b"])(r);
}
function j(e, t) {
  var n = e.get("padding");
  return null != n ? n : "richText" === t ? [8, 10] : 10;
}
var M = function () {
  function e() {
    this.richTextStyles = {}, this._nextStyleNameId = Object(s["f"])();
  }
  return e.prototype._generateStyleName = function () {
    return "__EC_aUTo_" + this._nextStyleNameId++;
  }, e.prototype.makeTooltipMarker = function (e, t, n) {
    var r = "richText" === n ? this._generateStyleName() : null,
      a = Object(i["d"])({
        color: t,
        type: e,
        renderMode: n,
        markerId: r
      });
    return Object(o["y"])(a) ? a : (this.richTextStyles[r] = a.style, a.content);
  }, e.prototype.wrapRichTextStyle = function (e, t) {
    var n = {};
    Object(o["r"])(t) ? Object(o["j"])(t, function (e) {
      return Object(o["l"])(n, e);
    }) : Object(o["l"])(n, t);
    var r = this._generateStyleName();
    return this.richTextStyles[r] = n, "{" + r + "|" + e + "}";
  }, e;
}();
