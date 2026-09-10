let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return h;
});
var r = require("./52315836.js"),
  i = require("./3152764e.js"),
  o = require("./62597459.js"),
  a = require("./4f454c42.js"),
  s = require("./6f567045.js"),
  l = require("./55684230.js"),
  u = require("./636d3672.js"),
  c = new r["a"](),
  f = new i["a"](100),
  d = ["symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight"];
function h(e, t) {
  if ("none" === e) return null;
  var n = t.getDevicePixelRatio(),
    r = t.getZr(),
    i = "svg" === r.painter.type;
  e.dirty && c["delete"](e);
  var h = c.get(e);
  if (h) return h;
  var b = Object(o["i"])(e, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  "none" === b.backgroundColor && (b.backgroundColor = null);
  var x = {
    repeat: "repeat"
  };
  return _(x), x.rotation = b.rotation, x.scaleX = x.scaleY = i ? 1 : 1 / n, c.set(e, x), e.dirty = !1, x;
  function _(e) {
    for (var t, c = [n], h = !0, x = 0; x < d.length; ++x) {
      var _ = b[d[x]];
      if (null != _ && !Object(o["r"])(_) && !Object(o["y"])(_) && !Object(o["w"])(_) && "boolean" !== typeof _) {
        h = !1;
        break;
      }
      c.push(_);
    }
    if (h) {
      t = c.join(",") + (i ? "-svg" : "");
      var w = f.get(t);
      w && (i ? e.svgElement = w : e.image = w);
    }
    var O,
      S = g(b.dashArrayX),
      k = m(b.dashArrayY),
      j = p(b.symbol),
      M = v(S),
      C = y(k),
      T = !i && u["d"].createCanvas(),
      I = i && {
        tag: "g",
        attrs: {},
        key: "dcl",
        children: []
      },
      D = A();
    function A() {
      for (var e = 1, t = 0, n = M.length; t < n; ++t) e = Object(a["c"])(e, M[t]);
      var r = 1;
      for (t = 0, n = j.length; t < n; ++t) r = Object(a["c"])(r, j[t].length);
      e *= r;
      var i = C * M.length * j.length;
      return {
        width: Math.max(1, Math.min(e, b.maxTileWidth)),
        height: Math.max(1, Math.min(i, b.maxTileHeight))
      };
    }
    function E() {
      O && (O.clearRect(0, 0, T.width, T.height), b.backgroundColor && (O.fillStyle = b.backgroundColor, O.fillRect(0, 0, T.width, T.height)));
      for (var e = 0, t = 0; t < k.length; ++t) e += k[t];
      if (!(e <= 0)) {
        var o = -C,
          a = 0,
          u = 0,
          c = 0;
        while (o < D.height) {
          if (a % 2 === 0) {
            var f = u / 2 % j.length,
              d = 0,
              h = 0,
              p = 0;
            while (d < 2 * D.width) {
              var g = 0;
              for (t = 0; t < S[c].length; ++t) g += S[c][t];
              if (g <= 0) break;
              if (h % 2 === 0) {
                var m = .5 * (1 - b.symbolSize),
                  v = d + S[c][h] * m,
                  y = o + k[a] * m,
                  x = S[c][h] * b.symbolSize,
                  _ = k[a] * b.symbolSize,
                  w = p / 2 % j[f].length;
                M(v, y, x, _, j[f][w]);
              }
              d += S[c][h], ++p, ++h, h === S[c].length && (h = 0);
            }
            ++c, c === S.length && (c = 0);
          }
          o += k[a], ++u, ++a, a === k.length && (a = 0);
        }
      }
      function M(e, t, o, a, u) {
        var c = i ? 1 : n,
          f = Object(s["a"])(u, e * c, t * c, o * c, a * c, b.color, b.symbolKeepAspect);
        if (i) {
          var d = r.painter.renderOneToVNode(f);
          d && I.children.push(d);
        } else Object(l["a"])(O, f);
      }
    }
    T && (T.width = D.width * n, T.height = D.height * n, O = T.getContext("2d")), E(), h && f.put(t, T || I), e.image = T, e.svgElement = I, e.svgWidth = D.width, e.svgHeight = D.height;
  }
}
function p(e) {
  if (!e || 0 === e.length) return [["rect"]];
  if (Object(o["y"])(e)) return [[e]];
  for (var t = !0, n = 0; n < e.length; ++n) if (!Object(o["y"])(e[n])) {
    t = !1;
    break;
  }
  if (t) return p([e]);
  var r = [];
  for (n = 0; n < e.length; ++n) Object(o["y"])(e[n]) ? r.push([e[n]]) : r.push(e[n]);
  return r;
}
function g(e) {
  if (!e || 0 === e.length) return [[0, 0]];
  if (Object(o["w"])(e)) {
    var t = Math.ceil(e);
    return [[t, t]];
  }
  for (var n = !0, r = 0; r < e.length; ++r) if (!Object(o["w"])(e[r])) {
    n = !1;
    break;
  }
  if (n) return g([e]);
  var i = [];
  for (r = 0; r < e.length; ++r) if (Object(o["w"])(e[r])) {
    t = Math.ceil(e[r]);
    i.push([t, t]);
  } else {
    t = Object(o["D"])(e[r], function (e) {
      return Math.ceil(e);
    });
    t.length % 2 === 1 ? i.push(t.concat(t)) : i.push(t);
  }
  return i;
}
function m(e) {
  if (!e || "object" === typeof e && 0 === e.length) return [0, 0];
  if (Object(o["w"])(e)) {
    var t = Math.ceil(e);
    return [t, t];
  }
  var n = Object(o["D"])(e, function (e) {
    return Math.ceil(e);
  });
  return e.length % 2 ? n.concat(n) : n;
}
function v(e) {
  return Object(o["D"])(e, function (e) {
    return y(e);
  });
}
function y(e) {
  for (var t = 0, n = 0; n < e.length; ++n) t += e[n];
  return e.length % 2 === 1 ? 2 * t : t;
}
