let legacyModule = module,
  legacyExports = exports;
legacyExports["default"] = function () {
  function e(e, t) {
    function n() {
      this.constructor = e;
    }
    n.prototype = t.prototype, e.prototype = new n();
  }
  function t(e, n, r, o) {
    this.message = e, this.expected = n, this.found = r, this.location = o, this.name = "SyntaxError", "function" === typeof Error.captureStackTrace && Error.captureStackTrace(this, t);
  }
  function n(e) {
    var n,
      r = arguments.length > 1 ? arguments[1] : {},
      o = {},
      i = {
        start: Te
      },
      a = Te,
      s = function (e) {
        return {
          type: "messageFormatPattern",
          elements: e,
          location: ke()
        };
      },
      c = function (e) {
        var t,
          n,
          r,
          o,
          i,
          a = "";
        for (t = 0, r = e.length; t < r; t += 1) for (o = e[t], n = 0, i = o.length; n < i; n += 1) a += o[n];
        return a;
      },
      u = function (e) {
        return {
          type: "messageTextElement",
          value: e,
          location: ke()
        };
      },
      l = /^[^ \t\n\r,.+={}#]/,
      f = {
        type: "class",
        value: "[^ \\t\\n\\r,.+={}#]",
        description: "[^ \\t\\n\\r,.+={}#]"
      },
      p = "{",
      d = {
        type: "literal",
        value: "{",
        description: '"{"'
      },
      h = ",",
      m = {
        type: "literal",
        value: ",",
        description: '","'
      },
      v = "}",
      y = {
        type: "literal",
        value: "}",
        description: '"}"'
      },
      g = function (e, t) {
        return {
          type: "argumentElement",
          id: e,
          format: t && t[2],
          location: ke()
        };
      },
      b = "number",
      w = {
        type: "literal",
        value: "number",
        description: '"number"'
      },
      x = "date",
      O = {
        type: "literal",
        value: "date",
        description: '"date"'
      },
      E = "time",
      _ = {
        type: "literal",
        value: "time",
        description: '"time"'
      },
      k = function (e, t) {
        return {
          type: e + "Format",
          style: t && t[2],
          location: ke()
        };
      },
      S = "plural",
      C = {
        type: "literal",
        value: "plural",
        description: '"plural"'
      },
      j = function (e) {
        return {
          type: e.type,
          ordinal: !1,
          offset: e.offset || 0,
          options: e.options,
          location: ke()
        };
      },
      P = "selectordinal",
      T = {
        type: "literal",
        value: "selectordinal",
        description: '"selectordinal"'
      },
      L = function (e) {
        return {
          type: e.type,
          ordinal: !0,
          offset: e.offset || 0,
          options: e.options,
          location: ke()
        };
      },
      N = "select",
      M = {
        type: "literal",
        value: "select",
        description: '"select"'
      },
      A = function (e) {
        return {
          type: "selectFormat",
          options: e,
          location: ke()
        };
      },
      D = "=",
      I = {
        type: "literal",
        value: "=",
        description: '"="'
      },
      R = function (e, t) {
        return {
          type: "optionalFormatPattern",
          selector: e,
          value: t,
          location: ke()
        };
      },
      F = "offset:",
      V = {
        type: "literal",
        value: "offset:",
        description: '"offset:"'
      },
      z = function (e) {
        return e;
      },
      B = function (e, t) {
        return {
          type: "pluralFormat",
          offset: e,
          options: t,
          location: ke()
        };
      },
      W = {
        type: "other",
        description: "whitespace"
      },
      U = /^[ \t\n\r]/,
      q = {
        type: "class",
        value: "[ \\t\\n\\r]",
        description: "[ \\t\\n\\r]"
      },
      H = {
        type: "other",
        description: "optionalWhitespace"
      },
      Y = /^[0-9]/,
      G = {
        type: "class",
        value: "[0-9]",
        description: "[0-9]"
      },
      K = /^[0-9a-f]/i,
      Z = {
        type: "class",
        value: "[0-9a-f]i",
        description: "[0-9a-f]i"
      },
      Q = "0",
      X = {
        type: "literal",
        value: "0",
        description: '"0"'
      },
      J = /^[1-9]/,
      $ = {
        type: "class",
        value: "[1-9]",
        description: "[1-9]"
      },
      ee = function (e) {
        return parseInt(e, 10);
      },
      te = /^[^{}\\\0-\x1F\x7f \t\n\r]/,
      ne = {
        type: "class",
        value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
        description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
      },
      re = "\\\\",
      oe = {
        type: "literal",
        value: "\\\\",
        description: '"\\\\\\\\"'
      },
      ie = function () {
        return "\\";
      },
      ae = "\\#",
      se = {
        type: "literal",
        value: "\\#",
        description: '"\\\\#"'
      },
      ce = function () {
        return "\\#";
      },
      ue = "\\{",
      le = {
        type: "literal",
        value: "\\{",
        description: '"\\\\{"'
      },
      fe = function () {
        return "{";
      },
      pe = "\\}",
      de = {
        type: "literal",
        value: "\\}",
        description: '"\\\\}"'
      },
      he = function () {
        return "}";
      },
      me = "\\u",
      ve = {
        type: "literal",
        value: "\\u",
        description: '"\\\\u"'
      },
      ye = function (e) {
        return String.fromCharCode(parseInt(e, 16));
      },
      ge = function (e) {
        return e.join("");
      },
      be = 0,
      we = 0,
      xe = [{
        line: 1,
        column: 1,
        seenCR: !1
      }],
      Oe = 0,
      Ee = [],
      _e = 0;
    if ("startRule" in r) {
      if (!(r.startRule in i)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
      a = i[r.startRule];
    }
    function ke() {
      return Ce(we, be);
    }
    function Se(t) {
      var n,
        r,
        o = xe[t];
      if (o) return o;
      n = t - 1;
      while (!xe[n]) n--;
      o = xe[n], o = {
        line: o.line,
        column: o.column,
        seenCR: o.seenCR
      };
      while (n < t) r = e.charAt(n), "\n" === r ? (o.seenCR || o.line++, o.column = 1, o.seenCR = !1) : "\r" === r || "\u2028" === r || "\u2029" === r ? (o.line++, o.column = 1, o.seenCR = !0) : (o.column++, o.seenCR = !1), n++;
      return xe[t] = o, o;
    }
    function Ce(e, t) {
      var n = Se(e),
        r = Se(t);
      return {
        start: {
          offset: e,
          line: n.line,
          column: n.column
        },
        end: {
          offset: t,
          line: r.line,
          column: r.column
        }
      };
    }
    function je(e) {
      be < Oe || (be > Oe && (Oe = be, Ee = []), Ee.push(e));
    }
    function Pe(e, n, r, o) {
      function i(e) {
        var t = 1;
        e.sort(function (e, t) {
          return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
        });
        while (t < e.length) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
      }
      function a(e, t) {
        function n(e) {
          function t(e) {
            return e.charCodeAt(0).toString(16).toUpperCase();
          }
          return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (e) {
            return "\\x0" + t(e);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (e) {
            return "\\x" + t(e);
          }).replace(/[\u0100-\u0FFF]/g, function (e) {
            return "\\u0" + t(e);
          }).replace(/[\u1000-\uFFFF]/g, function (e) {
            return "\\u" + t(e);
          });
        }
        var r,
          o,
          i,
          a = new Array(e.length);
        for (i = 0; i < e.length; i++) a[i] = e[i].description;
        return r = e.length > 1 ? a.slice(0, -1).join(", ") + " or " + a[e.length - 1] : a[0], o = t ? '"' + n(t) + '"' : "end of input", "Expected " + r + " but " + o + " found.";
      }
      return null !== n && i(n), new t(null !== e ? e : a(n, r), n, r, o);
    }
    function Te() {
      var e;
      return e = Le(), e;
    }
    function Le() {
      var e, t, n;
      e = be, t = [], n = Ne();
      while (n !== o) t.push(n), n = Ne();
      return t !== o && (we = e, t = s(t)), e = t, e;
    }
    function Ne() {
      var e;
      return e = Ae(), e === o && (e = Ie()), e;
    }
    function Me() {
      var t, n, r, i, a, s;
      if (t = be, n = [], r = be, i = Ge(), i !== o ? (a = Je(), a !== o ? (s = Ge(), s !== o ? (i = [i, a, s], r = i) : (be = r, r = o)) : (be = r, r = o)) : (be = r, r = o), r !== o) while (r !== o) n.push(r), r = be, i = Ge(), i !== o ? (a = Je(), a !== o ? (s = Ge(), s !== o ? (i = [i, a, s], r = i) : (be = r, r = o)) : (be = r, r = o)) : (be = r, r = o);else n = o;
      return n !== o && (we = t, n = c(n)), t = n, t === o && (t = be, n = Ye(), t = n !== o ? e.substring(t, be) : n), t;
    }
    function Ae() {
      var e, t;
      return e = be, t = Me(), t !== o && (we = e, t = u(t)), e = t, e;
    }
    function De() {
      var t, n, r;
      if (t = Qe(), t === o) {
        if (t = be, n = [], l.test(e.charAt(be)) ? (r = e.charAt(be), be++) : (r = o, 0 === _e && je(f)), r !== o) while (r !== o) n.push(r), l.test(e.charAt(be)) ? (r = e.charAt(be), be++) : (r = o, 0 === _e && je(f));else n = o;
        t = n !== o ? e.substring(t, be) : n;
      }
      return t;
    }
    function Ie() {
      var t, n, r, i, a, s, c, u, l;
      return t = be, 123 === e.charCodeAt(be) ? (n = p, be++) : (n = o, 0 === _e && je(d)), n !== o ? (r = Ge(), r !== o ? (i = De(), i !== o ? (a = Ge(), a !== o ? (s = be, 44 === e.charCodeAt(be) ? (c = h, be++) : (c = o, 0 === _e && je(m)), c !== o ? (u = Ge(), u !== o ? (l = Re(), l !== o ? (c = [c, u, l], s = c) : (be = s, s = o)) : (be = s, s = o)) : (be = s, s = o), s === o && (s = null), s !== o ? (c = Ge(), c !== o ? (125 === e.charCodeAt(be) ? (u = v, be++) : (u = o, 0 === _e && je(y)), u !== o ? (we = t, n = g(i, s), t = n) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o), t;
    }
    function Re() {
      var e;
      return e = Fe(), e === o && (e = Ve(), e === o && (e = ze(), e === o && (e = Be()))), e;
    }
    function Fe() {
      var t, n, r, i, a, s, c;
      return t = be, e.substr(be, 6) === b ? (n = b, be += 6) : (n = o, 0 === _e && je(w)), n === o && (e.substr(be, 4) === x ? (n = x, be += 4) : (n = o, 0 === _e && je(O)), n === o && (e.substr(be, 4) === E ? (n = E, be += 4) : (n = o, 0 === _e && je(_)))), n !== o ? (r = Ge(), r !== o ? (i = be, 44 === e.charCodeAt(be) ? (a = h, be++) : (a = o, 0 === _e && je(m)), a !== o ? (s = Ge(), s !== o ? (c = Je(), c !== o ? (a = [a, s, c], i = a) : (be = i, i = o)) : (be = i, i = o)) : (be = i, i = o), i === o && (i = null), i !== o ? (we = t, n = k(n, i), t = n) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o), t;
    }
    function Ve() {
      var t, n, r, i, a, s;
      return t = be, e.substr(be, 6) === S ? (n = S, be += 6) : (n = o, 0 === _e && je(C)), n !== o ? (r = Ge(), r !== o ? (44 === e.charCodeAt(be) ? (i = h, be++) : (i = o, 0 === _e && je(m)), i !== o ? (a = Ge(), a !== o ? (s = He(), s !== o ? (we = t, n = j(s), t = n) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o), t;
    }
    function ze() {
      var t, n, r, i, a, s;
      return t = be, e.substr(be, 13) === P ? (n = P, be += 13) : (n = o, 0 === _e && je(T)), n !== o ? (r = Ge(), r !== o ? (44 === e.charCodeAt(be) ? (i = h, be++) : (i = o, 0 === _e && je(m)), i !== o ? (a = Ge(), a !== o ? (s = He(), s !== o ? (we = t, n = L(s), t = n) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o), t;
    }
    function Be() {
      var t, n, r, i, a, s, c;
      if (t = be, e.substr(be, 6) === N ? (n = N, be += 6) : (n = o, 0 === _e && je(M)), n !== o) {
        if (r = Ge(), r !== o) {
          if (44 === e.charCodeAt(be) ? (i = h, be++) : (i = o, 0 === _e && je(m)), i !== o) {
            if (a = Ge(), a !== o) {
              if (s = [], c = Ue(), c !== o) while (c !== o) s.push(c), c = Ue();else s = o;
              s !== o ? (we = t, n = A(s), t = n) : (be = t, t = o);
            } else be = t, t = o;
          } else be = t, t = o;
        } else be = t, t = o;
      } else be = t, t = o;
      return t;
    }
    function We() {
      var t, n, r, i;
      return t = be, n = be, 61 === e.charCodeAt(be) ? (r = D, be++) : (r = o, 0 === _e && je(I)), r !== o ? (i = Qe(), i !== o ? (r = [r, i], n = r) : (be = n, n = o)) : (be = n, n = o), t = n !== o ? e.substring(t, be) : n, t === o && (t = Je()), t;
    }
    function Ue() {
      var t, n, r, i, a, s, c, u, l;
      return t = be, n = Ge(), n !== o ? (r = We(), r !== o ? (i = Ge(), i !== o ? (123 === e.charCodeAt(be) ? (a = p, be++) : (a = o, 0 === _e && je(d)), a !== o ? (s = Ge(), s !== o ? (c = Le(), c !== o ? (u = Ge(), u !== o ? (125 === e.charCodeAt(be) ? (l = v, be++) : (l = o, 0 === _e && je(y)), l !== o ? (we = t, n = R(r, c), t = n) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o), t;
    }
    function qe() {
      var t, n, r, i;
      return t = be, e.substr(be, 7) === F ? (n = F, be += 7) : (n = o, 0 === _e && je(V)), n !== o ? (r = Ge(), r !== o ? (i = Qe(), i !== o ? (we = t, n = z(i), t = n) : (be = t, t = o)) : (be = t, t = o)) : (be = t, t = o), t;
    }
    function He() {
      var e, t, n, r, i;
      if (e = be, t = qe(), t === o && (t = null), t !== o) {
        if (n = Ge(), n !== o) {
          if (r = [], i = Ue(), i !== o) while (i !== o) r.push(i), i = Ue();else r = o;
          r !== o ? (we = e, t = B(t, r), e = t) : (be = e, e = o);
        } else be = e, e = o;
      } else be = e, e = o;
      return e;
    }
    function Ye() {
      var t, n;
      if (_e++, t = [], U.test(e.charAt(be)) ? (n = e.charAt(be), be++) : (n = o, 0 === _e && je(q)), n !== o) while (n !== o) t.push(n), U.test(e.charAt(be)) ? (n = e.charAt(be), be++) : (n = o, 0 === _e && je(q));else t = o;
      return _e--, t === o && (n = o, 0 === _e && je(W)), t;
    }
    function Ge() {
      var t, n, r;
      _e++, t = be, n = [], r = Ye();
      while (r !== o) n.push(r), r = Ye();
      return t = n !== o ? e.substring(t, be) : n, _e--, t === o && (n = o, 0 === _e && je(H)), t;
    }
    function Ke() {
      var t;
      return Y.test(e.charAt(be)) ? (t = e.charAt(be), be++) : (t = o, 0 === _e && je(G)), t;
    }
    function Ze() {
      var t;
      return K.test(e.charAt(be)) ? (t = e.charAt(be), be++) : (t = o, 0 === _e && je(Z)), t;
    }
    function Qe() {
      var t, n, r, i, a, s;
      if (t = be, 48 === e.charCodeAt(be) ? (n = Q, be++) : (n = o, 0 === _e && je(X)), n === o) {
        if (n = be, r = be, J.test(e.charAt(be)) ? (i = e.charAt(be), be++) : (i = o, 0 === _e && je($)), i !== o) {
          a = [], s = Ke();
          while (s !== o) a.push(s), s = Ke();
          a !== o ? (i = [i, a], r = i) : (be = r, r = o);
        } else be = r, r = o;
        n = r !== o ? e.substring(n, be) : r;
      }
      return n !== o && (we = t, n = ee(n)), t = n, t;
    }
    function Xe() {
      var t, n, r, i, a, s, c, u;
      return te.test(e.charAt(be)) ? (t = e.charAt(be), be++) : (t = o, 0 === _e && je(ne)), t === o && (t = be, e.substr(be, 2) === re ? (n = re, be += 2) : (n = o, 0 === _e && je(oe)), n !== o && (we = t, n = ie()), t = n, t === o && (t = be, e.substr(be, 2) === ae ? (n = ae, be += 2) : (n = o, 0 === _e && je(se)), n !== o && (we = t, n = ce()), t = n, t === o && (t = be, e.substr(be, 2) === ue ? (n = ue, be += 2) : (n = o, 0 === _e && je(le)), n !== o && (we = t, n = fe()), t = n, t === o && (t = be, e.substr(be, 2) === pe ? (n = pe, be += 2) : (n = o, 0 === _e && je(de)), n !== o && (we = t, n = he()), t = n, t === o && (t = be, e.substr(be, 2) === me ? (n = me, be += 2) : (n = o, 0 === _e && je(ve)), n !== o ? (r = be, i = be, a = Ze(), a !== o ? (s = Ze(), s !== o ? (c = Ze(), c !== o ? (u = Ze(), u !== o ? (a = [a, s, c, u], i = a) : (be = i, i = o)) : (be = i, i = o)) : (be = i, i = o)) : (be = i, i = o), r = i !== o ? e.substring(r, be) : i, r !== o ? (we = t, n = ye(r), t = n) : (be = t, t = o)) : (be = t, t = o)))))), t;
    }
    function Je() {
      var e, t, n;
      if (e = be, t = [], n = Xe(), n !== o) while (n !== o) t.push(n), n = Xe();else t = o;
      return t !== o && (we = e, t = ge(t)), e = t, e;
    }
    if (n = a(), n !== o && be === e.length) return n;
    throw n !== o && be < e.length && je({
      type: "end",
      description: "end of input"
    }), Pe(null, Ee, Oe < e.length ? e.charAt(Oe) : null, Oe < e.length ? Ce(Oe, Oe + 1) : Ce(Oe, Oe));
  }
  return e(t, Error), {
    SyntaxError: t,
    parse: n
  };
}();
