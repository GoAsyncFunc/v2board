let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js"),
  i = require("./566c762f.js"),
  o = require("./664d492b.js"),
  a = require("./71525556.js"),
  s = require("./6470616d.js"),
  l = require("./544c5235.js"),
  u = require("./2b383050.js"),
  c = require("./324b5954.js"),
  f = require("./47595779.js"),
  d = {
    default: require("./markdownEmptyConfig.js"),
    zero: require("./markdownDefaultConfig.js"),
    commonmark: require("./516f302b.js")
  },
  h = /^(vbscript|javascript|file|data):/,
  p = /^data:image\/(gif|png|jpeg|webp);/;
function g(e) {
  var t = e.trim().toLowerCase();
  return !h.test(t) || !!p.test(t);
}
var m = ["http:", "https:", "mailto:"];
function v(e) {
  var t = c.parse(e, !0);
  if (t.hostname && (!t.protocol || m.indexOf(t.protocol) >= 0)) try {
    t.hostname = f.toASCII(t.hostname);
  } catch (e) {}
  return c.encode(c.format(t));
}
function y(e) {
  var t = c.parse(e, !0);
  if (t.hostname && (!t.protocol || m.indexOf(t.protocol) >= 0)) try {
    t.hostname = f.toUnicode(t.hostname);
  } catch (e) {}
  return c.decode(c.format(t), c.decode.defaultChars + "%");
}
function b(e, t) {
  if (!(this instanceof b)) return new b(e, t);
  t || r.isString(e) || (t = e || {}, e = "default"), this.inline = new l(), this.block = new s(), this.core = new a(), this.renderer = new o(), this.linkify = new u(), this.validateLink = g, this.normalizeLink = v, this.normalizeLinkText = y, this.utils = r, this.helpers = r.assign({}, i), this.options = {}, this.configure(e), t && this.set(t);
}
b.prototype.set = function (e) {
  return r.assign(this.options, e), this;
}, b.prototype.configure = function (e) {
  var t,
    n = this;
  if (r.isString(e) && (t = e, e = d[t], !e)) throw new Error('Wrong `markdown-it` preset "' + t + '", check name');
  if (!e) throw new Error("Wrong `markdown-it` preset, can't be empty");
  return e.options && n.set(e.options), e.components && Object.keys(e.components).forEach(function (t) {
    e.components[t].rules && n[t].ruler.enableOnly(e.components[t].rules), e.components[t].rules2 && n[t].ruler2.enableOnly(e.components[t].rules2);
  }), this;
}, b.prototype.enable = function (e, t) {
  var n = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function (t) {
    n = n.concat(this[t].ruler.enable(e, !0));
  }, this), n = n.concat(this.inline.ruler2.enable(e, !0));
  var r = e.filter(function (e) {
    return n.indexOf(e) < 0;
  });
  if (r.length && !t) throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
}, b.prototype.disable = function (e, t) {
  var n = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function (t) {
    n = n.concat(this[t].ruler.disable(e, !0));
  }, this), n = n.concat(this.inline.ruler2.disable(e, !0));
  var r = e.filter(function (e) {
    return n.indexOf(e) < 0;
  });
  if (r.length && !t) throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
}, b.prototype.use = function (e) {
  var t = [this].concat(Array.prototype.slice.call(arguments, 1));
  return e.apply(e, t), this;
}, b.prototype.parse = function (e, t) {
  if ("string" !== typeof e) throw new Error("Input data should be a String");
  var n = new this.core.State(e, this, t);
  return this.core.process(n), n.tokens;
}, b.prototype.render = function (e, t) {
  return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
}, b.prototype.parseInline = function (e, t) {
  var n = new this.core.State(e, this, t);
  return n.inlineMode = !0, this.core.process(n), n.tokens;
}, b.prototype.renderInline = function (e, t) {
  return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
}, legacyModule.exports = b;
