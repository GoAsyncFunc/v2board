let legacyModule = module,
  legacyExports = exports;
var r = require("./354b375a.js"),
  i = require("./66704335.js"),
  o = require("./46704861.js"),
  a = require("./56566c78.js")("IE_PROTO"),
  s = function () {},
  l = "prototype",
  c = function () {
    var e,
      t = require("./48736e73.js")("iframe"),
      r = o.length,
      i = "<",
      a = ">";
    t.style.display = "none", require("./4d767743.js").appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(i + "script" + a + "document.F=Object" + i + "/script" + a), e.close(), c = e.F;
    while (r--) delete c[l][o[r]];
    return c();
  };
legacyModule.exports = Object.create || function (e, t) {
  var n;
  return null !== e ? (s[l] = r(e), n = new s(), s[l] = null, n[a] = e) : n = c(), void 0 === t ? n : i(n, t);
};
