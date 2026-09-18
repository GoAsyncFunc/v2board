let legacyModule = module,
  legacyExports = exports;
var r = require("./6a423543.js");
function o(e, t, n) {
  n = n || {}, 9 === t.nodeType && (t = r.getWindow(t));
  var o = n.allowHorizontalScroll,
    i = n.onlyScrollIfNeeded,
    a = n.alignWithTop,
    s = n.alignWithLeft,
    c = n.offsetTop || 0,
    u = n.offsetLeft || 0,
    l = n.offsetBottom || 0,
    f = n.offsetRight || 0;
  o = void 0 === o || o;
  var p = r.isWindow(t),
    d = r.offset(e),
    h = r.outerHeight(e),
    m = r.outerWidth(e),
    v = void 0,
    y = void 0,
    g = void 0,
    b = void 0,
    w = void 0,
    x = void 0,
    O = void 0,
    E = void 0,
    _ = void 0,
    k = void 0;
  p ? (O = t, k = r.height(O), _ = r.width(O), E = {
    left: r.scrollLeft(O),
    top: r.scrollTop(O)
  }, w = {
    left: d.left - E.left - u,
    top: d.top - E.top - c
  }, x = {
    left: d.left + m - (E.left + _) + f,
    top: d.top + h - (E.top + k) + l
  }, b = E) : (v = r.offset(t), y = t.clientHeight, g = t.clientWidth, b = {
    left: t.scrollLeft,
    top: t.scrollTop
  }, w = {
    left: d.left - (v.left + (parseFloat(r.css(t, "borderLeftWidth")) || 0)) - u,
    top: d.top - (v.top + (parseFloat(r.css(t, "borderTopWidth")) || 0)) - c
  }, x = {
    left: d.left + m - (v.left + g + (parseFloat(r.css(t, "borderRightWidth")) || 0)) + f,
    top: d.top + h - (v.top + y + (parseFloat(r.css(t, "borderBottomWidth")) || 0)) + l
  }), w.top < 0 || x.top > 0 ? !0 === a ? r.scrollTop(t, b.top + w.top) : !1 === a ? r.scrollTop(t, b.top + x.top) : w.top < 0 ? r.scrollTop(t, b.top + w.top) : r.scrollTop(t, b.top + x.top) : i || (a = void 0 === a || !!a, a ? r.scrollTop(t, b.top + w.top) : r.scrollTop(t, b.top + x.top)), o && (w.left < 0 || x.left > 0 ? !0 === s ? r.scrollLeft(t, b.left + w.left) : !1 === s ? r.scrollLeft(t, b.left + x.left) : w.left < 0 ? r.scrollLeft(t, b.left + w.left) : r.scrollLeft(t, b.left + x.left) : i || (s = void 0 === s || !!s, s ? r.scrollLeft(t, b.left + w.left) : r.scrollLeft(t, b.left + x.left)));
}
legacyModule.exports = o;
