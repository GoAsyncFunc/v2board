let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownToken.js");
function i(e, t, n) {
  this.src = e, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = t;
}
i.prototype.Token = r, legacyModule.exports = i;
