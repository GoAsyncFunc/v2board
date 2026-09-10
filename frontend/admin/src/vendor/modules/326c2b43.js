let legacyModule = module,
  legacyExports = exports;
function r() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
var i = /^([a-z0-9.+-]+:)/i,
  o = /:[0-9]*$/,
  a = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
  s = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
  l = ["{", "}", "|", "\\", "^", "`"].concat(s),
  c = ["'"].concat(l),
  u = ["%", "/", "?", ";", "#"].concat(c),
  h = ["/", "?", "#"],
  f = 255,
  d = /^[+a-z0-9A-Z_-]{0,63}$/,
  p = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  m = {
    javascript: !0,
    "javascript:": !0
  },
  g = {
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
function v(e, t) {
  if (e && e instanceof r) return e;
  var n = new r();
  return n.parse(e, t), n;
}
r.prototype.parse = function (e, t) {
  var n,
    r,
    o,
    s,
    l,
    c = e;
  if (c = c.trim(), !t && 1 === e.split("#").length) {
    var v = a.exec(c);
    if (v) return this.pathname = v[1], v[2] && (this.search = v[2]), this;
  }
  var y = i.exec(c);
  if (y && (y = y[0], o = y.toLowerCase(), this.protocol = y, c = c.substr(y.length)), (t || y || c.match(/^\/\/[^@\/]+@[^@\/]+/)) && (l = "//" === c.substr(0, 2), !l || y && m[y] || (c = c.substr(2), this.slashes = !0)), !m[y] && (l || y && !g[y])) {
    var b,
      w,
      x = -1;
    for (n = 0; n < h.length; n++) s = c.indexOf(h[n]), -1 !== s && (-1 === x || s < x) && (x = s);
    for (w = -1 === x ? c.lastIndexOf("@") : c.lastIndexOf("@", x), -1 !== w && (b = c.slice(0, w), c = c.slice(w + 1), this.auth = b), x = -1, n = 0; n < u.length; n++) s = c.indexOf(u[n]), -1 !== s && (-1 === x || s < x) && (x = s);
    -1 === x && (x = c.length), ":" === c[x - 1] && x--;
    var _ = c.slice(0, x);
    c = c.slice(x), this.parseHost(_), this.hostname = this.hostname || "";
    var E = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
    if (!E) {
      var S = this.hostname.split(/\./);
      for (n = 0, r = S.length; n < r; n++) {
        var k = S[n];
        if (k && !k.match(d)) {
          for (var C = "", O = 0, T = k.length; O < T; O++) k.charCodeAt(O) > 127 ? C += "x" : C += k[O];
          if (!C.match(d)) {
            var L = S.slice(0, n),
              A = S.slice(n + 1),
              P = k.match(p);
            P && (L.push(P[1]), A.unshift(P[2])), A.length && (c = A.join(".") + c), this.hostname = L.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > f && (this.hostname = ""), E && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var j = c.indexOf("#");
  -1 !== j && (this.hash = c.substr(j), c = c.slice(0, j));
  var M = c.indexOf("?");
  return -1 !== M && (this.search = c.substr(M), c = c.slice(0, M)), c && (this.pathname = c), g[o] && this.hostname && !this.pathname && (this.pathname = ""), this;
}, r.prototype.parseHost = function (e) {
  var t = o.exec(e);
  t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
}, legacyModule.exports = v;
