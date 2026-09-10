let legacyModule = module,
  legacyExports = exports;
var r, i;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var o = {
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
  if (!s && i) return i;
  var l = document.createElement("div");
  Object.keys(o).forEach(function (e) {
    l.style[e] = o[e];
  }), l.className = "".concat(a, "-hide-scrollbar scroll-div-append-to-body"), s ? l.style.overflowY = "scroll" : l.style.overflowX = "scroll", document.body.appendChild(l);
  var c = 0;
  return s ? (c = l.offsetWidth - l.clientWidth, r = c) : (c = l.offsetHeight - l.clientHeight, i = c), document.body.removeChild(l), c;
}
function s(e, t, n) {
  var r;
  function i() {
    for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
    var s = this;
    o[0] && o[0].persist && o[0].persist();
    var l = function () {
        r = null, n || e.apply(s, o);
      },
      c = n && !r;
    clearTimeout(r), r = setTimeout(l, t), c && e.apply(s, o);
  }
  return i.cancel = function () {
    r && (clearTimeout(r), r = null);
  }, i;
}
function l(e, t) {
  var n = e.indexOf(t),
    r = e.slice(0, n),
    i = e.slice(n + 1, e.length);
  return r.concat(i);
}
function c(e) {
  return Object.keys(e).reduce(function (t, n) {
    return "data-" !== n.substr(0, 5) && "aria-" !== n.substr(0, 5) || (t[n] = e[n]), t;
  }, {});
}
legacyExports.INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE", legacyExports.measureScrollbar = a, legacyExports.debounce = s, legacyExports.remove = l, legacyExports.getDataAndAriaProps = c;
