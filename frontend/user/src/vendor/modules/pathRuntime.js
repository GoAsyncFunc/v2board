let legacyModule = module,
  legacyExports = exports;
(function (e) {
  function n(e, t) {
    for (var n = 0, r = e.length - 1; r >= 0; r--) {
      var o = e[r];
      "." === o ? e.splice(r, 1) : ".." === o ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--);
    }
    if (t) for (; n--; n) e.unshift("..");
    return e;
  }
  function r(e) {
    "string" !== typeof e && (e += "");
    var t,
      n = 0,
      r = -1,
      o = !0;
    for (t = e.length - 1; t >= 0; --t) if (47 === e.charCodeAt(t)) {
      if (!o) {
        n = t + 1;
        break;
      }
    } else -1 === r && (o = !1, r = t + 1);
    return -1 === r ? "" : e.slice(n, r);
  }
  function o(e, t) {
    if (e.filter) return e.filter(t);
    for (var n = [], r = 0; r < e.length; r++) t(e[r], r, e) && n.push(e[r]);
    return n;
  }
  legacyExports.resolve = function () {
    for (var t = "", r = !1, i = arguments.length - 1; i >= -1 && !r; i--) {
      var a = i >= 0 ? arguments[i] : e.cwd();
      if ("string" !== typeof a) throw new TypeError("Arguments to path.resolve must be strings");
      a && (t = a + "/" + t, r = "/" === a.charAt(0));
    }
    return t = n(o(t.split("/"), function (e) {
      return !!e;
    }), !r).join("/"), (r ? "/" : "") + t || ".";
  }, legacyExports.normalize = function (e) {
    var r = legacyExports.isAbsolute(e),
      a = "/" === i(e, -1);
    return e = n(o(e.split("/"), function (e) {
      return !!e;
    }), !r).join("/"), e || r || (e = "."), e && a && (e += "/"), (r ? "/" : "") + e;
  }, legacyExports.isAbsolute = function (e) {
    return "/" === e.charAt(0);
  }, legacyExports.join = function () {
    var e = Array.prototype.slice.call(arguments, 0);
    return legacyExports.normalize(o(e, function (e, t) {
      if ("string" !== typeof e) throw new TypeError("Arguments to path.join must be strings");
      return e;
    }).join("/"));
  }, legacyExports.relative = function (e, n) {
    function r(e) {
      for (var t = 0; t < e.length; t++) if ("" !== e[t]) break;
      for (var n = e.length - 1; n >= 0; n--) if ("" !== e[n]) break;
      return t > n ? [] : e.slice(t, n - t + 1);
    }
    e = legacyExports.resolve(e).substr(1), n = legacyExports.resolve(n).substr(1);
    for (var o = r(e.split("/")), i = r(n.split("/")), a = Math.min(o.length, i.length), s = a, c = 0; c < a; c++) if (o[c] !== i[c]) {
      s = c;
      break;
    }
    var u = [];
    for (c = s; c < o.length; c++) u.push("..");
    return u = u.concat(i.slice(s)), u.join("/");
  }, legacyExports.sep = "/", legacyExports.delimiter = ":", legacyExports.dirname = function (e) {
    if ("string" !== typeof e && (e += ""), 0 === e.length) return ".";
    for (var t = e.charCodeAt(0), n = 47 === t, r = -1, o = !0, i = e.length - 1; i >= 1; --i) if (t = e.charCodeAt(i), 47 === t) {
      if (!o) {
        r = i;
        break;
      }
    } else o = !1;
    return -1 === r ? n ? "/" : "." : n && 1 === r ? "/" : e.slice(0, r);
  }, legacyExports.basename = function (e, t) {
    var n = r(e);
    return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n;
  }, legacyExports.extname = function (e) {
    "string" !== typeof e && (e += "");
    for (var t = -1, n = 0, r = -1, o = !0, i = 0, a = e.length - 1; a >= 0; --a) {
      var s = e.charCodeAt(a);
      if (47 !== s) -1 === r && (o = !1, r = a + 1), 46 === s ? -1 === t ? t = a : 1 !== i && (i = 1) : -1 !== t && (i = -1);else if (!o) {
        n = a + 1;
        break;
      }
    }
    return -1 === t || -1 === r || 0 === i || 1 === i && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
  };
  var i = "b" === "ab".substr(-1) ? function (e, t, n) {
    return e.substr(t, n);
  } : function (e, t, n) {
    return t < 0 && (t = e.length + t), e.substr(t, n);
  };
}).call(this, require("./processRuntime.js"));
