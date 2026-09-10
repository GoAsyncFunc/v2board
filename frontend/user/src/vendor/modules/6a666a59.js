let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = i, legacyModule.exports.isMobile = i, legacyModule.exports.default = i;
var r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i,
  o = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i;
function i(e) {
  e || (e = {});
  var t = e.ua;
  if (t || "undefined" === typeof navigator || (t = navigator.userAgent), t && t.headers && "string" === typeof t.headers["user-agent"] && (t = t.headers["user-agent"]), "string" !== typeof t) return !1;
  var n = e.tablet ? o.test(t) : r.test(t);
  return !n && e.tablet && e.featureDetect && navigator && navigator.maxTouchPoints > 1 && -1 !== t.indexOf("Macintosh") && -1 !== t.indexOf("Safari") && (n = !0), n;
}
