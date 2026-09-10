let legacyModule = module,
  legacyExports = exports;
function r() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var o = /^([a-z0-9.+-]+:)/i,
  i = /:[0-9]*$/,
  a = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
  s = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
  c = ["{", "}", "|", "\\", "^", "`"].concat(s),
  u = ["'"].concat(c),
  l = ["%", "/", "?", ";", "#"].concat(u),
  f = ["/", "?", "#"],
  p = 255,
  d = /^[+a-z0-9A-Z_-]{0,63}$/,
  h = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  m = {
    javascript: !0,
    "javascript:": !0
  },
  v = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  };
function y(e, t) {
  if (e && e instanceof r) return e;
  var n = new r();
  return n.parse(e, t), n;
}
r.prototype.parse = function (e, t) {
  var n,
    r,
    i,
    s,
    c,
    u = e;
  if (u = u.trim(), !t && 1 === e.split("#").length) {
    var y = a.exec(u);
    if (y) return this.pathname = y[1], y[2] && (this.search = y[2]), this;
  }
  var g = o.exec(u);
  if (g && (g = g[0], i = g.toLowerCase(), this.protocol = g, u = u.substr(g.length)), (t || g || u.match(/^\/\/[^@\/]+@[^@\/]+/)) && (c = "//" === u.substr(0, 2), !c || g && m[g] || (u = u.substr(2), this.slashes = !0)), !m[g] && (c || g && !v[g])) {
    var b,
      w,
      x = -1;
    for (n = 0; n < f.length; n++) s = u.indexOf(f[n]), -1 !== s && (-1 === x || s < x) && (x = s);
    for (w = -1 === x ? u.lastIndexOf("@") : u.lastIndexOf("@", x), -1 !== w && (b = u.slice(0, w), u = u.slice(w + 1), this.auth = b), x = -1, n = 0; n < l.length; n++) s = u.indexOf(l[n]), -1 !== s && (-1 === x || s < x) && (x = s);
    -1 === x && (x = u.length), ":" === u[x - 1] && x--;
    var O = u.slice(0, x);
    u = u.slice(x), this.parseHost(O), this.hostname = this.hostname || "";
    var E = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
    if (!E) {
      var _ = this.hostname.split(/\./);
      for (n = 0, r = _.length; n < r; n++) {
        var k = _[n];
        if (k && !k.match(d)) {
          for (var S = "", C = 0, j = k.length; C < j; C++) k.charCodeAt(C) > 127 ? S += "x" : S += k[C];
          if (!S.match(d)) {
            var P = _.slice(0, n),
              T = _.slice(n + 1),
              L = k.match(h);
            L && (P.push(L[1]), T.unshift(L[2])), T.length && (u = T.join(".") + u), this.hostname = P.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > p && (this.hostname = ""), E && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var N = u.indexOf("#");
  -1 !== N && (this.hash = u.substr(N), u = u.slice(0, N));
  var M = u.indexOf("?");
  return -1 !== M && (this.search = u.substr(M), u = u.slice(0, M)), u && (this.pathname = u), v[i] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, r.prototype.parseHost = function (e) {
  var t = i.exec(e);
  t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
}, legacyModule.exports = y;
