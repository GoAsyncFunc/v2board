let legacyModule = module,
  legacyExports = exports;
var r = require("./7650642f.js"),
  i = require("./49583356.js"),
  o = i.each,
  a = i.isFunction,
  s = i.isArray;
function l() {
  if (!window.matchMedia) throw new Error("matchMedia not present, legacy browsers require a polyfill");
  this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches;
}
l.prototype = {
  constructor: l,
  register: function (e, t, n) {
    var i = this.queries,
      l = n && this.browserIsIncapable;
    return i[e] || (i[e] = new r(e, l)), a(t) && (t = {
      match: t
    }), s(t) || (t = [t]), o(t, function (t) {
      a(t) && (t = {
        match: t
      }), i[e].addHandler(t);
    }), this;
  },
  unregister: function (e, t) {
    var n = this.queries[e];
    return n && (t ? n.removeHandler(t) : (n.clear(), delete this.queries[e])), this;
  }
}, legacyModule.exports = l;
