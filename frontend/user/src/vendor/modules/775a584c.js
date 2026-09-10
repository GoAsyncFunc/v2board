let legacyModule = module,
  legacyExports = exports;
var r = require("./7650642f.js"),
  o = require("./49583356.js"),
  i = o.each,
  a = o.isFunction,
  s = o.isArray;
function c() {
  if (!window.matchMedia) throw new Error("matchMedia not present, legacy browsers require a polyfill");
  this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches;
}
c.prototype = {
  constructor: c,
  register: function (e, t, n) {
    var o = this.queries,
      c = n && this.browserIsIncapable;
    return o[e] || (o[e] = new r(e, c)), a(t) && (t = {
      match: t
    }), s(t) || (t = [t]), i(t, function (t) {
      a(t) && (t = {
        match: t
      }), o[e].addHandler(t);
    }), this;
  },
  unregister: function (e, t) {
    var n = this.queries[e];
    return n && (t ? n.removeHandler(t) : (n.clear(), delete this.queries[e])), this;
  }
}, legacyModule.exports = c;
