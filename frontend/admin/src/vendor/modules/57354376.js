let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n = window.Element.prototype,
    r = n.matches || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector;
  if (!e || 1 !== e.nodeType) return !1;
  var i = e.parentNode;
  if (r) return r.call(e, t);
  for (var o = i.querySelectorAll(t), a = o.length, s = 0; s < a; s++) if (o[s] === e) return !0;
  return !1;
}
legacyModule.exports = r;
