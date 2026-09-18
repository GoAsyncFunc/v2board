let legacyModule = module,
  legacyExports = exports;
var r = require("./6a423543.js");
function i(e, t, n) {
  n = n || {}, 9 === t.nodeType && (t = r.getWindow(t));
  var i = n.allowHorizontalScroll,
    o = n.onlyScrollIfNeeded,
    a = n.alignWithTop,
    s = n.alignWithLeft,
    l = n.offsetTop || 0,
    c = n.offsetLeft || 0,
    u = n.offsetBottom || 0,
    h = n.offsetRight || 0;
  i = void 0 === i || i;
  var f = r.isWindow(t),
    d = r.offset(e),
    p = r.outerHeight(e),
    m = r.outerWidth(e),
    g = void 0,
    v = void 0,
    y = void 0,
    b = void 0,
    w = void 0,
    x = void 0,
    _ = void 0,
    E = void 0,
    S = void 0,
    k = void 0;
  f ? (_ = t, k = r.height(_), S = r.width(_), E = {
    left: r.scrollLeft(_),
    top: r.scrollTop(_)
  }, w = {
    left: d.left - E.left - c,
    top: d.top - E.top - l
  }, x = {
    left: d.left + m - (E.left + S) + h,
    top: d.top + p - (E.top + k) + u
  }, b = E) : (g = r.offset(t), v = t.clientHeight, y = t.clientWidth, b = {
    left: t.scrollLeft,
    top: t.scrollTop
  }, w = {
    left: d.left - (g.left + (parseFloat(r.css(t, "borderLeftWidth")) || 0)) - c,
    top: d.top - (g.top + (parseFloat(r.css(t, "borderTopWidth")) || 0)) - l
  }, x = {
    left: d.left + m - (g.left + y + (parseFloat(r.css(t, "borderRightWidth")) || 0)) + h,
    top: d.top + p - (g.top + v + (parseFloat(r.css(t, "borderBottomWidth")) || 0)) + u
  }), w.top < 0 || x.top > 0 ? !0 === a ? r.scrollTop(t, b.top + w.top) : !1 === a ? r.scrollTop(t, b.top + x.top) : w.top < 0 ? r.scrollTop(t, b.top + w.top) : r.scrollTop(t, b.top + x.top) : o || (a = void 0 === a || !!a, a ? r.scrollTop(t, b.top + w.top) : r.scrollTop(t, b.top + x.top)), i && (w.left < 0 || x.left > 0 ? !0 === s ? r.scrollLeft(t, b.left + w.left) : !1 === s ? r.scrollLeft(t, b.left + x.left) : w.left < 0 ? r.scrollLeft(t, b.left + w.left) : r.scrollLeft(t, b.left + x.left) : o || (s = void 0 === s || !!s, s ? r.scrollLeft(t, b.left + w.left) : r.scrollLeft(t, b.left + x.left)));
}
legacyModule.exports = i;
