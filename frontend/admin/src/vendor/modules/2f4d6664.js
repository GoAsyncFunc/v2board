let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  i = require("./objectDefineProperties.js"),
  o = require("./objectKeysIn.js"),
  a = require("./4a35372f.js")("IE_PROTO"),
  s = function () {},
  l = "prototype",
  c = function () {
    var e,
      t = require("./createElement.js")("iframe"),
      r = o.length,
      i = "<",
      a = ">";
    t.style.display = "none", require("./documentElement.js").appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(i + "script" + a + "document.F=Object" + i + "/script" + a), e.close(), c = e.F;
    while (r--) delete c[l][o[r]];
    return c();
  };
legacyModule.exports = Object.create || function (e, t) {
  var n;
  return null !== e ? (s[l] = r(e), n = new s(), s[l] = null, n[a] = e) : n = c(), void 0 === t ? n : i(n, t);
};
