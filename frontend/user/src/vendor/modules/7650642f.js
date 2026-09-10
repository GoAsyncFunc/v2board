let legacyModule = module,
  legacyExports = exports;
var r = require("./6b434356.js"),
  o = require("./49583356.js").each;
function i(e, t) {
  this.query = e, this.isUnconditional = t, this.handlers = [], this.mql = window.matchMedia(e);
  var n = this;
  this.listener = function (e) {
    n.mql = e.currentTarget || e, n.assess();
  }, this.mql.addListener(this.listener);
}
i.prototype = {
  constuctor: i,
  addHandler: function (e) {
    var t = new r(e);
    this.handlers.push(t), this.matches() && t.on();
  },
  removeHandler: function (e) {
    var t = this.handlers;
    o(t, function (n, r) {
      if (n.equals(e)) return n.destroy(), !t.splice(r, 1);
    });
  },
  matches: function () {
    return this.mql.matches || this.isUnconditional;
  },
  clear: function () {
    o(this.handlers, function (e) {
      e.destroy();
    }), this.mql.removeListener(this.listener), this.handlers.length = 0;
  },
  assess: function () {
    var e = this.matches() ? "on" : "off";
    o(this.handlers, function (t) {
      t[e]();
    });
  }
}, legacyModule.exports = i;
