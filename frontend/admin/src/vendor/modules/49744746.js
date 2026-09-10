let legacyModule = module,
  legacyExports = exports;
var r = function () {
    function e() {
      this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
    }
    return e;
  }(),
  i = function () {
    function e() {
      this.browser = new r(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = "undefined" !== typeof window;
    }
    return e;
  }(),
  o = new i();
function a(e, t) {
  var n = t.browser,
    r = e.match(/Firefox\/([\d.]+)/),
    i = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/),
    o = e.match(/Edge?\/([\d.]+)/),
    a = /micromessenger/i.test(e);
  r && (n.firefox = !0, n.version = r[1]), i && (n.ie = !0, n.version = i[1]), o && (n.edge = !0, n.version = o[1], n.newEdge = +o[1].split(".")[0] > 18), a && (n.weChat = !0), t.svgSupported = "undefined" !== typeof SVGRect, t.touchEventsSupported = "ontouchstart" in window && !n.ie && !n.edge, t.pointerEventsSupported = "onpointerdown" in window && (n.edge || n.ie && +n.version >= 11), t.domSupported = "undefined" !== typeof document;
  var s = document.documentElement.style;
  t.transform3dSupported = (n.ie && "transition" in s || n.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || n.ie && +n.version >= 9;
}
"object" === typeof wx && "function" === typeof wx.getSystemInfoSync ? (o.wxa = !0, o.touchEventsSupported = !0) : "undefined" === typeof document && "undefined" !== typeof self ? o.worker = !0 : "undefined" === typeof navigator ? (o.node = !0, o.svgSupported = !0) : a(navigator.userAgent, o), legacyExports["a"] = o;
