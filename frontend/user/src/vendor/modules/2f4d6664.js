let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  o = require("./objectDefineProperties.js"),
  i = require("./57464a79.js"),
  a = require("./4a35372f.js")("IE_PROTO"),
  s = function () {},
  c = "prototype",
  u = function () {
    var e,
      t = require("./53664447.js")("iframe"),
      r = i.length,
      o = "<",
      a = ">";
    t.style.display = "none", require("./58493664.js").appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(o + "script" + a + "document.F=Object" + o + "/script" + a), e.close(), u = e.F;
    while (r--) delete u[c][i[r]];
    return u();
  };
legacyModule.exports = Object.create || function (e, t) {
  var n;
  return null !== e ? (s[c] = r(e), n = new s(), s[c] = null, n[a] = e) : n = u(), void 0 === t ? n : o(n, t);
};
