let legacyModule = module,
  legacyExports = exports;
var r = require("./47595779.js"),
  i = require("./typePredicates.js");
function o() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
legacyExports.parse = x, legacyExports.resolve = E, legacyExports.resolveObject = S, legacyExports.format = _, legacyExports.Url = o;
var a = /^([a-z0-9.+-]+:)/i,
  s = /:[0-9]*$/,
  l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
  c = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
  u = ["{", "}", "|", "\\", "^", "`"].concat(c),
  h = ["'"].concat(u),
  f = ["%", "/", "?", ";", "#"].concat(h),
  d = ["/", "?", "#"],
  p = 255,
  m = /^[+a-z0-9A-Z_-]{0,63}$/,
  g = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  v = {
    javascript: !0,
    "javascript:": !0
  },
  y = {
    javascript: !0,
    "javascript:": !0
  },
  b = {
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
  },
  w = require("./base64Runtime.js");
function x(e, t, n) {
  if (e && i.isObject(e) && e instanceof o) return e;
  var r = new o();
  return r.parse(e, t, n), r;
}
function _(e) {
  return i.isString(e) && (e = x(e)), e instanceof o ? e.format() : o.prototype.format.call(e);
}
function E(e, t) {
  return x(e, !1, !0).resolve(t);
}
function S(e, t) {
  return e ? x(e, !1, !0).resolveObject(t) : t;
}
o.prototype.parse = function (e, t, n) {
  if (!i.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
  var o = e.indexOf("?"),
    s = -1 !== o && o < e.indexOf("#") ? "?" : "#",
    c = e.split(s),
    u = /\\/g;
  c[0] = c[0].replace(u, "/"), e = c.join(s);
  var x = e;
  if (x = x.trim(), !n && 1 === e.split("#").length) {
    var _ = l.exec(x);
    if (_) return this.path = x, this.href = x, this.pathname = _[1], _[2] ? (this.search = _[2], this.query = t ? w.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
  }
  var E = a.exec(x);
  if (E) {
    E = E[0];
    var S = E.toLowerCase();
    this.protocol = S, x = x.substr(E.length);
  }
  if (n || E || x.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var k = "//" === x.substr(0, 2);
    !k || E && y[E] || (x = x.substr(2), this.slashes = !0);
  }
  if (!y[E] && (k || E && !b[E])) {
    for (var C, O, T = -1, L = 0; L < d.length; L++) {
      var A = x.indexOf(d[L]);
      -1 !== A && (-1 === T || A < T) && (T = A);
    }
    O = -1 === T ? x.lastIndexOf("@") : x.lastIndexOf("@", T), -1 !== O && (C = x.slice(0, O), x = x.slice(O + 1), this.auth = decodeURIComponent(C)), T = -1;
    for (L = 0; L < f.length; L++) {
      A = x.indexOf(f[L]);
      -1 !== A && (-1 === T || A < T) && (T = A);
    }
    -1 === T && (T = x.length), this.host = x.slice(0, T), x = x.slice(T), this.parseHost(), this.hostname = this.hostname || "";
    var P = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
    if (!P) for (var j = this.hostname.split(/\./), M = (L = 0, j.length); L < M; L++) {
      var R = j[L];
      if (R && !R.match(m)) {
        for (var N = "", D = 0, I = R.length; D < I; D++) R.charCodeAt(D) > 127 ? N += "x" : N += R[D];
        if (!N.match(m)) {
          var $ = j.slice(0, L),
            F = j.slice(L + 1),
            B = R.match(g);
          B && ($.push(B[1]), F.unshift(B[2])), F.length && (x = "/" + F.join(".") + x), this.hostname = $.join(".");
          break;
        }
      }
    }
    this.hostname.length > p ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), P || (this.hostname = r.toASCII(this.hostname));
    var V = this.port ? ":" + this.port : "",
      W = this.hostname || "";
    this.host = W + V, this.href += this.host, P && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== x[0] && (x = "/" + x));
  }
  if (!v[S]) for (L = 0, M = h.length; L < M; L++) {
    var H = h[L];
    if (-1 !== x.indexOf(H)) {
      var U = encodeURIComponent(H);
      U === H && (U = escape(H)), x = x.split(H).join(U);
    }
  }
  var z = x.indexOf("#");
  -1 !== z && (this.hash = x.substr(z), x = x.slice(0, z));
  var G = x.indexOf("?");
  if (-1 !== G ? (this.search = x.substr(G), this.query = x.substr(G + 1), t && (this.query = w.parse(this.query)), x = x.slice(0, G)) : t && (this.search = "", this.query = {}), x && (this.pathname = x), b[S] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    V = this.pathname || "";
    var q = this.search || "";
    this.path = V + q;
  }
  return this.href = this.format(), this;
}, o.prototype.format = function () {
  var e = this.auth || "";
  e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");
  var t = this.protocol || "",
    n = this.pathname || "",
    r = this.hash || "",
    o = !1,
    a = "";
  this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && i.isObject(this.query) && Object.keys(this.query).length && (a = w.stringify(this.query));
  var s = this.search || a && "?" + a || "";
  return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || b[t]) && !1 !== o ? (o = "//" + (o || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : o || (o = ""), r && "#" !== r.charAt(0) && (r = "#" + r), s && "?" !== s.charAt(0) && (s = "?" + s), n = n.replace(/[?#]/g, function (e) {
    return encodeURIComponent(e);
  }), s = s.replace("#", "%23"), t + o + n + s + r;
}, o.prototype.resolve = function (e) {
  return this.resolveObject(x(e, !1, !0)).format();
}, o.prototype.resolveObject = function (e) {
  if (i.isString(e)) {
    var t = new o();
    t.parse(e, !1, !0), e = t;
  }
  for (var n = new o(), r = Object.keys(this), a = 0; a < r.length; a++) {
    var s = r[a];
    n[s] = this[s];
  }
  if (n.hash = e.hash, "" === e.href) return n.href = n.format(), n;
  if (e.slashes && !e.protocol) {
    for (var l = Object.keys(e), c = 0; c < l.length; c++) {
      var u = l[c];
      "protocol" !== u && (n[u] = e[u]);
    }
    return b[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), n.href = n.format(), n;
  }
  if (e.protocol && e.protocol !== n.protocol) {
    if (!b[e.protocol]) {
      for (var h = Object.keys(e), f = 0; f < h.length; f++) {
        var d = h[f];
        n[d] = e[d];
      }
      return n.href = n.format(), n;
    }
    if (n.protocol = e.protocol, e.host || y[e.protocol]) n.pathname = e.pathname;else {
      var p = (e.pathname || "").split("/");
      while (p.length && !(e.host = p.shift()));
      e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== p[0] && p.unshift(""), p.length < 2 && p.unshift(""), n.pathname = p.join("/");
    }
    if (n.search = e.search, n.query = e.query, n.host = e.host || "", n.auth = e.auth, n.hostname = e.hostname || e.host, n.port = e.port, n.pathname || n.search) {
      var m = n.pathname || "",
        g = n.search || "";
      n.path = m + g;
    }
    return n.slashes = n.slashes || e.slashes, n.href = n.format(), n;
  }
  var v = n.pathname && "/" === n.pathname.charAt(0),
    w = e.host || e.pathname && "/" === e.pathname.charAt(0),
    x = w || v || n.host && e.pathname,
    _ = x,
    E = n.pathname && n.pathname.split("/") || [],
    S = (p = e.pathname && e.pathname.split("/") || [], n.protocol && !b[n.protocol]);
  if (S && (n.hostname = "", n.port = null, n.host && ("" === E[0] ? E[0] = n.host : E.unshift(n.host)), n.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === p[0] ? p[0] = e.host : p.unshift(e.host)), e.host = null), x = x && ("" === p[0] || "" === E[0])), w) n.host = e.host || "" === e.host ? e.host : n.host, n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname, n.search = e.search, n.query = e.query, E = p;else if (p.length) E || (E = []), E.pop(), E = E.concat(p), n.search = e.search, n.query = e.query;else if (!i.isNullOrUndefined(e.search)) {
    if (S) {
      n.hostname = n.host = E.shift();
      var k = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@");
      k && (n.auth = k.shift(), n.host = n.hostname = k.shift());
    }
    return n.search = e.search, n.query = e.query, i.isNull(n.pathname) && i.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = n.format(), n;
  }
  if (!E.length) return n.pathname = null, n.search ? n.path = "/" + n.search : n.path = null, n.href = n.format(), n;
  for (var C = E.slice(-1)[0], O = (n.host || e.host || E.length > 1) && ("." === C || ".." === C) || "" === C, T = 0, L = E.length; L >= 0; L--) C = E[L], "." === C ? E.splice(L, 1) : ".." === C ? (E.splice(L, 1), T++) : T && (E.splice(L, 1), T--);
  if (!x && !_) for (; T--; T) E.unshift("..");
  !x || "" === E[0] || E[0] && "/" === E[0].charAt(0) || E.unshift(""), O && "/" !== E.join("/").substr(-1) && E.push("");
  var A = "" === E[0] || E[0] && "/" === E[0].charAt(0);
  if (S) {
    n.hostname = n.host = A ? "" : E.length ? E.shift() : "";
    k = !!(n.host && n.host.indexOf("@") > 0) && n.host.split("@");
    k && (n.auth = k.shift(), n.host = n.hostname = k.shift());
  }
  return x = x || n.host && E.length, x && !A && E.unshift(""), E.length ? n.pathname = E.join("/") : (n.pathname = null, n.path = null), i.isNull(n.pathname) && i.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.auth = e.auth || n.auth, n.slashes = n.slashes || e.slashes, n.href = n.format(), n;
}, o.prototype.parseHost = function () {
  var e = this.host,
    t = s.exec(e);
  t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
