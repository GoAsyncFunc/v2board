let legacyModule = module,
  legacyExports = exports;
var r = require("./45396e77.js"),
  o = {
    "text/plain": "Text",
    "text/html": "Url",
    default: "Text"
  },
  i = "Copy to clipboard: #{key}, Enter";
function a(e) {
  var t = (/mac os x/i.test(navigator.userAgent) ? "\u2318" : "Ctrl") + "+C";
  return e.replace(/#{\s*key\s*}/g, t);
}
function s(e, t) {
  var n,
    s,
    c,
    u,
    l,
    f,
    p = !1;
  t || (t = {}), n = t.debug || !1;
  try {
    c = r(), u = document.createRange(), l = document.getSelection(), f = document.createElement("span"), f.textContent = e, f.ariaHidden = "true", f.style.all = "unset", f.style.position = "fixed", f.style.top = 0, f.style.clip = "rect(0, 0, 0, 0)", f.style.whiteSpace = "pre", f.style.webkitUserSelect = "text", f.style.MozUserSelect = "text", f.style.msUserSelect = "text", f.style.userSelect = "text", f.addEventListener("copy", function (r) {
      if (r.stopPropagation(), t.format) if (r.preventDefault(), "undefined" === typeof r.clipboardData) {
        n && console.warn("unable to use e.clipboardData"), n && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
        var i = o[t.format] || o["default"];
        window.clipboardData.setData(i, e);
      } else r.clipboardData.clearData(), r.clipboardData.setData(t.format, e);
      t.onCopy && (r.preventDefault(), t.onCopy(r.clipboardData));
    }), document.body.appendChild(f), u.selectNodeContents(f), l.addRange(u);
    var d = document.execCommand("copy");
    if (!d) throw new Error("copy command was unsuccessful");
    p = !0;
  } catch (r) {
    n && console.error("unable to copy using execCommand: ", r), n && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), p = !0;
    } catch (r) {
      n && console.error("unable to copy using clipboardData: ", r), n && console.error("falling back to prompt"), s = a("message" in t ? t.message : i), window.prompt(s, e);
    }
  } finally {
    l && ("function" == typeof l.removeRange ? l.removeRange(u) : l.removeAllRanges()), f && document.body.removeChild(f), c();
  }
  return p;
}
legacyModule.exports = s;
