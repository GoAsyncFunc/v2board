let legacyModule = module,
  legacyExports = exports;
var r = require("./53494e64.js"),
  o = [["normalize", require("./5443594e.js")], ["block", require("./4e416744.js")], ["inline", require("./6f535352.js")], ["linkify", require("./6d534630.js")], ["replacements", require("./7530714b.js")], ["smartquotes", require("./727a4447.js")]];
function i() {
  this.ruler = new r();
  for (var e = 0; e < o.length; e++) this.ruler.push(o[e][0], o[e][1]);
}
i.prototype.process = function (e) {
  var t, n, r;
  for (r = this.ruler.getRules(""), t = 0, n = r.length; t < n; t++) r[t](e);
}, i.prototype.State = require("./63544d4d.js"), legacyModule.exports = i;
