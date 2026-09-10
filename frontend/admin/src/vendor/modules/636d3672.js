let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "c", function () {
  return r;
}), defineExport(legacyExports, "b", function () {
  return i;
}), defineExport(legacyExports, "a", function () {
  return o;
}), defineExport(legacyExports, "d", function () {
  return h;
}), defineExport(legacyExports, "e", function () {
  return f;
});
var r = 12,
  i = "sans-serif",
  o = r + "px " + i,
  a = 20,
  s = 100,
  l = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function c(e) {
  var t = {};
  if ("undefined" === typeof JSON) return t;
  for (var n = 0; n < e.length; n++) {
    var r = String.fromCharCode(n + 32),
      i = (e.charCodeAt(n) - a) / s;
    t[r] = i;
  }
  return t;
}
var u = c(l),
  h = {
    createCanvas: function () {
      return "undefined" !== typeof document && document.createElement("canvas");
    },
    measureText: function () {
      var e, t;
      return function (n, i) {
        if (!e) {
          var a = h.createCanvas();
          e = a && a.getContext("2d");
        }
        if (e) return t !== i && (t = e.font = i || o), e.measureText(n);
        n = n || "", i = i || o;
        var s = /^([0-9]*?)px$/.exec(i),
          l = +(s && s[1]) || r,
          c = 0;
        if (i.indexOf("mono") >= 0) c = l * n.length;else for (var f = 0; f < n.length; f++) {
          var d = u[n[f]];
          c += null == d ? l : d * l;
        }
        return {
          width: c
        };
      };
    }(),
    loadImage: function (e, t, n) {
      var r = new Image();
      return r.onload = t, r.onerror = n, r.src = e, r;
    }
  };
function f(e) {
  for (var t in h) e[t] && (h[t] = e[t]);
}
