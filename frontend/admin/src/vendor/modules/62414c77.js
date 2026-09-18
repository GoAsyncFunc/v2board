let legacyModule = module,
  legacyExports = exports;
var r = require("./arrayIsArrayLegacy.js");
legacyModule.exports = y, legacyModule.exports.parse = o, legacyModule.exports.compile = a, legacyModule.exports.tokensToFunction = c, legacyModule.exports.tokensToRegExp = v;
var i = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");
function o(e, t) {
  var n,
    r = [],
    o = 0,
    a = 0,
    s = "",
    l = t && t.delimiter || "/";
  while (null != (n = i.exec(e))) {
    var c = n[0],
      f = n[1],
      d = n.index;
    if (s += e.slice(a, d), a = d + c.length, f) s += f[1];else {
      var p = e[a],
        m = n[2],
        g = n[3],
        v = n[4],
        y = n[5],
        b = n[6],
        w = n[7];
      s && (r.push(s), s = "");
      var x = null != m && null != p && p !== m,
        _ = "+" === b || "*" === b,
        E = "?" === b || "*" === b,
        S = n[2] || l,
        k = v || y;
      r.push({
        name: g || o++,
        prefix: m || "",
        delimiter: S,
        optional: E,
        repeat: _,
        partial: x,
        asterisk: !!w,
        pattern: k ? h(k) : w ? ".*" : "[^" + u(S) + "]+?"
      });
    }
  }
  return a < e.length && (s += e.substr(a)), s && r.push(s), r;
}
function a(e, t) {
  return c(o(e, t));
}
function s(e) {
  return encodeURI(e).replace(/[\/?#]/g, function (e) {
    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  });
}
function l(e) {
  return encodeURI(e).replace(/[?#]/g, function (e) {
    return "%" + e.charCodeAt(0).toString(16).toUpperCase();
  });
}
function c(e) {
  for (var t = new Array(e.length), n = 0; n < e.length; n++) "object" === typeof e[n] && (t[n] = new RegExp("^(?:" + e[n].pattern + ")$"));
  return function (n, i) {
    for (var o = "", a = n || {}, c = i || {}, u = c.pretty ? s : encodeURIComponent, h = 0; h < e.length; h++) {
      var f = e[h];
      if ("string" !== typeof f) {
        var d,
          p = a[f.name];
        if (null == p) {
          if (f.optional) {
            f.partial && (o += f.prefix);
            continue;
          }
          throw new TypeError('Expected "' + f.name + '" to be defined');
        }
        if (r(p)) {
          if (!f.repeat) throw new TypeError('Expected "' + f.name + '" to not repeat, but received `' + JSON.stringify(p) + "`");
          if (0 === p.length) {
            if (f.optional) continue;
            throw new TypeError('Expected "' + f.name + '" to not be empty');
          }
          for (var m = 0; m < p.length; m++) {
            if (d = u(p[m]), !t[h].test(d)) throw new TypeError('Expected all "' + f.name + '" to match "' + f.pattern + '", but received `' + JSON.stringify(d) + "`");
            o += (0 === m ? f.prefix : f.delimiter) + d;
          }
        } else {
          if (d = f.asterisk ? l(p) : u(p), !t[h].test(d)) throw new TypeError('Expected "' + f.name + '" to match "' + f.pattern + '", but received "' + d + '"');
          o += f.prefix + d;
        }
      } else o += f;
    }
    return o;
  };
}
function u(e) {
  return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
}
function h(e) {
  return e.replace(/([=!:$\/()])/g, "\\$1");
}
function f(e, t) {
  return e.keys = t, e;
}
function d(e) {
  return e.sensitive ? "" : "i";
}
function p(e, t) {
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
  return f(e, t);
}
function m(e, t, n) {
  for (var r = [], i = 0; i < e.length; i++) r.push(y(e[i], t, n).source);
  var o = new RegExp("(?:" + r.join("|") + ")", d(n));
  return f(o, t);
}
function g(e, t, n) {
  return v(o(e, n), t, n);
}
function v(e, t, n) {
  r(t) || (n = t || n, t = []), n = n || {};
  for (var i = n.strict, o = !1 !== n.end, a = "", s = 0; s < e.length; s++) {
    var l = e[s];
    if ("string" === typeof l) a += u(l);else {
      var c = u(l.prefix),
        h = "(?:" + l.pattern + ")";
      t.push(l), l.repeat && (h += "(?:" + c + h + ")*"), h = l.optional ? l.partial ? c + "(" + h + ")?" : "(?:" + c + "(" + h + "))?" : c + "(" + h + ")", a += h;
    }
  }
  var p = u(n.delimiter || "/"),
    m = a.slice(-p.length) === p;
  return i || (a = (m ? a.slice(0, -p.length) : a) + "(?:" + p + "(?=$))?"), a += o ? "$" : i && m ? "" : "(?=" + p + "|$)", f(new RegExp("^" + a, d(n)), t);
}
function y(e, t, n) {
  return r(t) || (n = t || n, t = []), n = n || {}, e instanceof RegExp ? p(e, t) : r(e) ? m(e, t, n) : g(e, t, n);
}
