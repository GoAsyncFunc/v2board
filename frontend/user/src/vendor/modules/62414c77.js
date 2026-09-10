let legacyModule = module,
  legacyExports = exports;
var r = require("./3439736d.js");
legacyModule.exports = g, legacyModule.exports.parse = i, legacyModule.exports.compile = a, legacyModule.exports.tokensToFunction = u, legacyModule.exports.tokensToRegExp = y;
var o = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");
function i(e, t) {
  var n,
    r = [],
    i = 0,
    a = 0,
    s = "",
    c = t && t.delimiter || "/";
  while (null != (n = o.exec(e))) {
    var u = n[0],
      p = n[1],
      d = n.index;
    if (s += e.slice(a, d), a = d + u.length, p) s += p[1];else {
      var h = e[a],
        m = n[2],
        v = n[3],
        y = n[4],
        g = n[5],
        b = n[6],
        w = n[7];
      s && (r.push(s), s = "");
      var x = null != m && null != h && h !== m,
        O = "+" === b || "*" === b,
        E = "?" === b || "*" === b,
        _ = n[2] || c,
        k = y || g;
      r.push({
        name: v || i++,
        prefix: m || "",
        delimiter: _,
        optional: E,
        repeat: O,
        partial: x,
        asterisk: !!w,
        pattern: k ? f(k) : w ? ".*" : "[^" + l(_) + "]+?"
      });
    }
  }
  return a < e.length && (s += e.substr(a)), s && r.push(s), r;
}
function a(e, t) {
  return u(i(e, t));
}
function s(e) {
  return encodeURI(e).replace(/[\/?#]/g, function (e) {
    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  });
}
function c(e) {
  return encodeURI(e).replace(/[?#]/g, function (e) {
    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  });
}
function u(e) {
  for (var t = new Array(e.length), n = 0; n < e.length; n++) "object" === typeof e[n] && (t[n] = new RegExp("^(?:" + e[n].pattern + ")$"));
  return function (n, o) {
    for (var i = "", a = n || {}, u = o || {}, l = u.pretty ? s : encodeURIComponent, f = 0; f < e.length; f++) {
      var p = e[f];
      if ("string" !== typeof p) {
        var d,
          h = a[p.name];
        if (null == h) {
          if (p.optional) {
            p.partial && (i += p.prefix);
            continue;
          }
          throw new TypeError('Expected "' + p.name + '" to be defined');
        }
        if (r(h)) {
          if (!p.repeat) throw new TypeError('Expected "' + p.name + '" to not repeat, but received `' + JSON.stringify(h) + "`");
          if (0 === h.length) {
            if (p.optional) continue;
            throw new TypeError('Expected "' + p.name + '" to not be empty');
          }
          for (var m = 0; m < h.length; m++) {
            if (d = l(h[m]), !t[f].test(d)) throw new TypeError('Expected all "' + p.name + '" to match "' + p.pattern + '", but received `' + JSON.stringify(d) + "`");
            i += (0 === m ? p.prefix : p.delimiter) + d;
          }
        } else {
          if (d = p.asterisk ? c(h) : l(h), !t[f].test(d)) throw new TypeError('Expected "' + p.name + '" to match "' + p.pattern + '", but received "' + d + '"');
          i += p.prefix + d;
        }
      } else i += p;
    }
    return i;
  };
}
function l(e) {
  return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
}
function f(e) {
  return e.replace(/([=!:$\/()])/g, "\\$1");
}
function p(e, t) {
  return e.keys = t, e;
}
function d(e) {
  return e.sensitive ? "" : "i";
}
function h(e, t) {
  var n = e.source.match(/\((?!\?)/g);
  if (n) for (var r = 0; r < n.length; r++) t.push({
    name: r,
    prefix: null,
    delimiter: null,
    optional: !1,
    repeat: !1,
    partial: !1,
    asterisk: !1,
    pattern: null
  });
  return p(e, t);
}
function m(e, t, n) {
  for (var r = [], o = 0; o < e.length; o++) r.push(g(e[o], t, n).source);
  var i = new RegExp("(?:" + r.join("|") + ")", d(n));
  return p(i, t);
}
function v(e, t, n) {
  return y(i(e, n), t, n);
}
function y(e, t, n) {
  r(t) || (n = t || n, t = []), n = n || {};
  for (var o = n.strict, i = !1 !== n.end, a = "", s = 0; s < e.length; s++) {
    var c = e[s];
    if ("string" === typeof c) a += l(c);else {
      var u = l(c.prefix),
        f = "(?:" + c.pattern + ")";
      t.push(c), c.repeat && (f += "(?:" + u + f + ")*"), f = c.optional ? c.partial ? u + "(" + f + ")?" : "(?:" + u + "(" + f + "))?" : u + "(" + f + ")", a += f;
    }
  }
  var h = l(n.delimiter || "/"),
    m = a.slice(-h.length) === h;
  return o || (a = (m ? a.slice(0, -h.length) : a) + "(?:" + h + "(?=$))?"), a += i ? "$" : o && m ? "" : "(?=" + h + "|$)", p(new RegExp("^" + a, d(n)), t);
}
function g(e, t, n) {
  return r(t) || (n = t || n, t = []), n = n || {}, e instanceof RegExp ? h(e, t) : r(e) ? m(e, t, n) : v(e, t, n);
}
