let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return a;
}), defineExport(legacyExports, "a", function () {
  return s;
}), defineExport(legacyExports, "c", function () {
  return c;
});
var r = require("./3152764e.js"),
  i = require("./636d3672.js"),
  o = new r["a"](50);
function a(e) {
  if ("string" === typeof e) {
    var t = o.get(e);
    return t && t.image;
  }
  return e;
}
function s(e, t, n, r, a) {
  if (e) {
    if ("string" === typeof e) {
      if (t && t.__zrImageSrc === e || !n) return t;
      var s = o.get(e),
        u = {
          hostEl: n,
          cb: r,
          cbPayload: a
        };
      return s ? (t = s.image, !c(t) && s.pending.push(u)) : (t = i["d"].loadImage(e, l, l), t.__zrImageSrc = e, o.put(e, t.__cachedImgObj = {
        image: t,
        pending: [u]
      })), t;
    }
    return e;
  }
  return t;
}
function l() {
  var e = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < e.pending.length; t++) {
    var n = e.pending[t],
      r = n.cb;
    r && r(this, n.cbPayload), n.hostEl.dirty();
  }
  e.pending.length = 0;
}
function c(e) {
  return e && e.width && e.height;
}
