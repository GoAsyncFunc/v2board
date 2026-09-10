let legacyModule = module,
  legacyExports = exports;
var r, o;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var i = {
  position: "absolute",
  top: "-9999px",
  width: "50px",
  height: "50px"
};
function a(e) {
  var t = e.direction,
    n = void 0 === t ? "vertical" : t,
    a = e.prefixCls;
  if ("undefined" === typeof document || "undefined" === typeof window) return 0;
  var s = "vertical" === n;
  if (s && r) return r;
  if (!s && o) return o;
  var c = document.createElement("div");
  Object.keys(i).forEach(function (e) {
    c.style[e] = i[e];
  }), c.className = "".concat(a, "-hide-scrollbar scroll-div-append-to-body"), s ? c.style.overflowY = "scroll" : c.style.overflowX = "scroll", document.body.appendChild(c);
  var u = 0;
  return s ? (u = c.offsetWidth - c.clientWidth, r = u) : (u = c.offsetHeight - c.clientHeight, o = u), document.body.removeChild(c), u;
}
function s(e, t, n) {
  var r;
  function o() {
    for (var o = arguments.length, i = new Array(o), a = 0; a < o; a++) i[a] = arguments[a];
    var s = this;
    i[0] && i[0].persist && i[0].persist();
    var c = function () {
        r = null, n || e.apply(s, i);
      },
      u = n && !r;
    clearTimeout(r), r = setTimeout(c, t), u && e.apply(s, i);
  }
  return o.cancel = function () {
    r && (clearTimeout(r), r = null);
  }, o;
}
function c(e, t) {
  var n = e.indexOf(t),
    r = e.slice(0, n),
    o = e.slice(n + 1, e.length);
  return r.concat(o);
}
function u(e) {
  return Object.keys(e).reduce(function (t, n) {
    return "data-" !== n.substr(0, 5) && "aria-" !== n.substr(0, 5) || (t[n] = e[n]), t;
  }, {});
}
legacyExports.INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE", legacyExports.measureScrollbar = a, legacyExports.debounce = s, legacyExports.remove = c, legacyExports.getDataAndAriaProps = u;
