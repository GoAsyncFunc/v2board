let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n, r) {
  var i = n ? n.call(r, e, t) : void 0;
  if (void 0 !== i) return !!i;
  if (e === t) return !0;
  if ("object" !== typeof e || !e || "object" !== typeof t || !t) return !1;
  var o = Object.keys(e),
    a = Object.keys(t);
  if (o.length !== a.length) return !1;
  for (var s = Object.prototype.hasOwnProperty.bind(t), l = 0; l < o.length; l++) {
    var c = o[l];
    if (!s(c)) return !1;
    var u = e[c],
      h = t[c];
    if (i = n ? n.call(r, u, h, c) : void 0, !1 === i || void 0 === i && u !== h) return !1;
  }
  return !0;
};
