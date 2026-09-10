let legacyModule = module,
  legacyExports = exports;
var r = require("./45396e77.js"),
  i = {
    "text/plain": "Text",
    "text/html": "Url",
    default: "Text"
  },
  o = "Copy to clipboard: #{key}, Enter";
function a(e) {
  var t = (/mac os x/i.test(navigator.userAgent) ? "\u2318" : "Ctrl") + "+C";
  return e.replace(/#{\s*key\s*}/g, t);
}
function s(e, t) {
  var n,
    s,
    l,
    c,
    u,
    h,
    f = !1;
  t || (t = {}), n = t.debug || !1;
  try {
    l = r(), c = document.createRange(), u = document.getSelection(), h = document.createElement("span"), h.textContent = e, h.ariaHidden = "true", h.style.all = "unset", h.style.position = "fixed", h.style.top = 0, h.style.clip = "rect(0, 0, 0, 0)", h.style.whiteSpace = "pre", h.style.webkitUserSelect = "text", h.style.MozUserSelect = "text", h.style.msUserSelect = "text", h.style.userSelect = "text", h.addEventListener("copy", function (r) {
      if (r.stopPropagation(), t.format) if (r.preventDefault(), "undefined" === typeof r.clipboardData) {
        n && console.warn("unable to use e.clipboardData"), n && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
        var o = i[t.format] || i["default"];
        window.clipboardData.setData(o, e);
      } else r.clipboardData.clearData(), r.clipboardData.setData(t.format, e);
      t.onCopy && (r.preventDefault(), t.onCopy(r.clipboardData));
    }), document.body.appendChild(h), c.selectNodeContents(h), u.addRange(c);
    var d = document.execCommand("copy");
    if (!d) throw new Error("copy command was unsuccessful");
    f = !0;
  } catch (r) {
    n && console.error("unable to copy using execCommand: ", r), n && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), f = !0;
    } catch (r) {
      n && console.error("unable to copy using clipboardData: ", r), n && console.error("falling back to prompt"), s = a("message" in t ? t.message : o), window.prompt(s, e);
    }
  } finally {
    u && ("function" == typeof u.removeRange ? u.removeRange(c) : u.removeAllRanges()), h && document.body.removeChild(h), l();
  }
  return f;
}
legacyModule.exports = s;
