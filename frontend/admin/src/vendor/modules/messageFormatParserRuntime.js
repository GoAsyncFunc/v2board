let legacyModule = module,
  legacyExports = exports;
legacyExports["default"] = function () {
  function e(e, t) {
    function n() {
      this.constructor = e;
    }
    n.prototype = t.prototype, e.prototype = new n();
  }
  function t(e, n, r, i) {
    this.message = e, this.expected = n, this.found = r, this.location = i, this.name = "SyntaxError", "function" === typeof Error.captureStackTrace && Error.captureStackTrace(this, t);
  }
  function n(e) {
    var n,
      r = arguments.length > 1 ? arguments[1] : {},
      i = {},
      o = {
        start: Ae
      },
      a = Ae,
      s = function (e) {
        return {
          type: "messageFormatPattern",
          elements: e,
          location: ke()
        };
      },
      l = function (e) {
        var t,
          n,
          r,
          i,
          o,
          a = "";
        for (t = 0, r = e.length; t < r; t += 1) for (i = e[t], n = 0, o = i.length; n < o; n += 1) a += i[n];
        return a;
      },
      c = function (e) {
        return {
          type: "messageTextElement",
          value: e,
          location: ke()
        };
      },
      u = /^[^ \t\n\r,.+={}#]/,
      h = {
        type: "class",
        value: "[^ \\t\\n\\r,.+={}#]",
        description: "[^ \\t\\n\\r,.+={}#]"
      },
      f = "{",
      d = {
        type: "literal",
        value: "{",
        description: '"{"'
      },
      p = ",",
      m = {
        type: "literal",
        value: ",",
        description: '","'
      },
      g = "}",
      v = {
        type: "literal",
        value: "}",
        description: '"}"'
      },
      y = function (e, t) {
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
      _ = {
        type: "literal",
        value: "date",
        description: '"date"'
      },
      E = "time",
      S = {
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
      C = "plural",
      O = {
        type: "literal",
        value: "plural",
        description: '"plural"'
      },
      T = function (e) {
        return {
          type: e.type,
          ordinal: !1,
          offset: e.offset || 0,
          options: e.options,
          location: ke()
        };
      },
      L = "selectordinal",
      A = {
        type: "literal",
        value: "selectordinal",
        description: '"selectordinal"'
      },
      P = function (e) {
        return {
          type: e.type,
          ordinal: !0,
          offset: e.offset || 0,
          options: e.options,
          location: ke()
        };
      },
      j = "select",
      M = {
        type: "literal",
        value: "select",
        description: '"select"'
      },
      R = function (e) {
        return {
          type: "selectFormat",
          options: e,
          location: ke()
        };
      },
      N = "=",
      D = {
        type: "literal",
        value: "=",
        description: '"="'
      },
      I = function (e, t) {
        return {
          type: "optionalFormatPattern",
          selector: e,
          value: t,
          location: ke()
        };
      },
      $ = "offset:",
      F = {
        type: "literal",
        value: "offset:",
        description: '"offset:"'
      },
      B = function (e) {
        return e;
      },
      V = function (e, t) {
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
      H = /^[ \t\n\r]/,
      U = {
        type: "class",
        value: "[ \\t\\n\\r]",
        description: "[ \\t\\n\\r]"
      },
      z = {
        type: "other",
        description: "optionalWhitespace"
      },
      G = /^[0-9]/,
      q = {
        type: "class",
        value: "[0-9]",
        description: "[0-9]"
      },
      K = /^[0-9a-f]/i,
      Y = {
        type: "class",
        value: "[0-9a-f]i",
        description: "[0-9a-f]i"
      },
      X = "0",
      Q = {
        type: "literal",
        value: "0",
        description: '"0"'
      },
      Z = /^[1-9]/,
      J = {
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
      ie = {
        type: "literal",
        value: "\\\\",
        description: '"\\\\\\\\"'
      },
      oe = function () {
        return "\\";
      },
      ae = "\\#",
      se = {
        type: "literal",
        value: "\\#",
        description: '"\\\\#"'
      },
      le = function () {
        return "\\#";
      },
      ce = "\\{",
      ue = {
        type: "literal",
        value: "\\{",
        description: '"\\\\{"'
      },
      he = function () {
        return "{";
      },
      fe = "\\}",
      de = {
        type: "literal",
        value: "\\}",
        description: '"\\\\}"'
      },
      pe = function () {
        return "}";
      },
      me = "\\u",
      ge = {
        type: "literal",
        value: "\\u",
        description: '"\\\\u"'
      },
      ve = function (e) {
        return String.fromCharCode(parseInt(e, 16));
      },
      ye = function (e) {
        return e.join("");
      },
      be = 0,
      we = 0,
      xe = [{
        line: 1,
        column: 1,
        seenCR: !1
      }],
      _e = 0,
      Ee = [],
      Se = 0;
    if ("startRule" in r) {
      if (!(r.startRule in o)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
      a = o[r.startRule];
    }
    function ke() {
      return Oe(we, be);
    }
    function Ce(t) {
      var n,
        r,
        i = xe[t];
      if (i) return i;
      n = t - 1;
      while (!xe[n]) n--;
      i = xe[n], i = {
        line: i.line,
        column: i.column,
        seenCR: i.seenCR
      };
      while (n < t) r = e.charAt(n), "\n" === r ? (i.seenCR || i.line++, i.column = 1, i.seenCR = !1) : "\r" === r || "\u2028" === r || "\u2029" === r ? (i.line++, i.column = 1, i.seenCR = !0) : (i.column++, i.seenCR = !1), n++;
      return xe[t] = i, i;
    }
    function Oe(e, t) {
      var n = Ce(e),
        r = Ce(t);
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
    function Te(e) {
      be < _e || (be > _e && (_e = be, Ee = []), Ee.push(e));
    }
    function Le(e, n, r, i) {
      function o(e) {
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
          i,
          o,
          a = new Array(e.length);
        for (o = 0; o < e.length; o++) a[o] = e[o].description;
        return r = e.length > 1 ? a.slice(0, -1).join(", ") + " or " + a[e.length - 1] : a[0], i = t ? '"' + n(t) + '"' : "end of input", "Expected " + r + " but " + i + " found.";
      }
      return null !== n && o(n), new t(null !== e ? e : a(n, r), n, r, i);
    }
    function Ae() {
      var e;
      return e = Pe(), e;
    }
    function Pe() {
      var e, t, n;
      e = be, t = [], n = je();
      while (n !== i) t.push(n), n = je();
      return t !== i && (we = e, t = s(t)), e = t, e;
    }
    function je() {
      var e;
      return e = Re(), e === i && (e = De()), e;
    }
    function Me() {
      var t, n, r, o, a, s;
      if (t = be, n = [], r = be, o = qe(), o !== i ? (a = Ze(), a !== i ? (s = qe(), s !== i ? (o = [o, a, s], r = o) : (be = r, r = i)) : (be = r, r = i)) : (be = r, r = i), r !== i) while (r !== i) n.push(r), r = be, o = qe(), o !== i ? (a = Ze(), a !== i ? (s = qe(), s !== i ? (o = [o, a, s], r = o) : (be = r, r = i)) : (be = r, r = i)) : (be = r, r = i);else n = i;
      return n !== i && (we = t, n = l(n)), t = n, t === i && (t = be, n = Ge(), t = n !== i ? e.substring(t, be) : n), t;
    }
    function Re() {
      var e, t;
      return e = be, t = Me(), t !== i && (we = e, t = c(t)), e = t, e;
    }
    function Ne() {
      var t, n, r;
      if (t = Xe(), t === i) {
        if (t = be, n = [], u.test(e.charAt(be)) ? (r = e.charAt(be), be++) : (r = i, 0 === Se && Te(h)), r !== i) while (r !== i) n.push(r), u.test(e.charAt(be)) ? (r = e.charAt(be), be++) : (r = i, 0 === Se && Te(h));else n = i;
        t = n !== i ? e.substring(t, be) : n;
      }
      return t;
    }
    function De() {
      var t, n, r, o, a, s, l, c, u;
      return t = be, 123 === e.charCodeAt(be) ? (n = f, be++) : (n = i, 0 === Se && Te(d)), n !== i ? (r = qe(), r !== i ? (o = Ne(), o !== i ? (a = qe(), a !== i ? (s = be, 44 === e.charCodeAt(be) ? (l = p, be++) : (l = i, 0 === Se && Te(m)), l !== i ? (c = qe(), c !== i ? (u = Ie(), u !== i ? (l = [l, c, u], s = l) : (be = s, s = i)) : (be = s, s = i)) : (be = s, s = i), s === i && (s = null), s !== i ? (l = qe(), l !== i ? (125 === e.charCodeAt(be) ? (c = g, be++) : (c = i, 0 === Se && Te(v)), c !== i ? (we = t, n = y(o, s), t = n) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i), t;
    }
    function Ie() {
      var e;
      return e = $e(), e === i && (e = Fe(), e === i && (e = Be(), e === i && (e = Ve()))), e;
    }
    function $e() {
      var t, n, r, o, a, s, l;
      return t = be, e.substr(be, 6) === b ? (n = b, be += 6) : (n = i, 0 === Se && Te(w)), n === i && (e.substr(be, 4) === x ? (n = x, be += 4) : (n = i, 0 === Se && Te(_)), n === i && (e.substr(be, 4) === E ? (n = E, be += 4) : (n = i, 0 === Se && Te(S)))), n !== i ? (r = qe(), r !== i ? (o = be, 44 === e.charCodeAt(be) ? (a = p, be++) : (a = i, 0 === Se && Te(m)), a !== i ? (s = qe(), s !== i ? (l = Ze(), l !== i ? (a = [a, s, l], o = a) : (be = o, o = i)) : (be = o, o = i)) : (be = o, o = i), o === i && (o = null), o !== i ? (we = t, n = k(n, o), t = n) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i), t;
    }
    function Fe() {
      var t, n, r, o, a, s;
      return t = be, e.substr(be, 6) === C ? (n = C, be += 6) : (n = i, 0 === Se && Te(O)), n !== i ? (r = qe(), r !== i ? (44 === e.charCodeAt(be) ? (o = p, be++) : (o = i, 0 === Se && Te(m)), o !== i ? (a = qe(), a !== i ? (s = ze(), s !== i ? (we = t, n = T(s), t = n) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i), t;
    }
    function Be() {
      var t, n, r, o, a, s;
      return t = be, e.substr(be, 13) === L ? (n = L, be += 13) : (n = i, 0 === Se && Te(A)), n !== i ? (r = qe(), r !== i ? (44 === e.charCodeAt(be) ? (o = p, be++) : (o = i, 0 === Se && Te(m)), o !== i ? (a = qe(), a !== i ? (s = ze(), s !== i ? (we = t, n = P(s), t = n) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i), t;
    }
    function Ve() {
      var t, n, r, o, a, s, l;
      if (t = be, e.substr(be, 6) === j ? (n = j, be += 6) : (n = i, 0 === Se && Te(M)), n !== i) {
        if (r = qe(), r !== i) {
          if (44 === e.charCodeAt(be) ? (o = p, be++) : (o = i, 0 === Se && Te(m)), o !== i) {
            if (a = qe(), a !== i) {
              if (s = [], l = He(), l !== i) while (l !== i) s.push(l), l = He();else s = i;
              s !== i ? (we = t, n = R(s), t = n) : (be = t, t = i);
            } else be = t, t = i;
          } else be = t, t = i;
        } else be = t, t = i;
      } else be = t, t = i;
      return t;
    }
    function We() {
      var t, n, r, o;
      return t = be, n = be, 61 === e.charCodeAt(be) ? (r = N, be++) : (r = i, 0 === Se && Te(D)), r !== i ? (o = Xe(), o !== i ? (r = [r, o], n = r) : (be = n, n = i)) : (be = n, n = i), t = n !== i ? e.substring(t, be) : n, t === i && (t = Ze()), t;
    }
    function He() {
      var t, n, r, o, a, s, l, c, u;
      return t = be, n = qe(), n !== i ? (r = We(), r !== i ? (o = qe(), o !== i ? (123 === e.charCodeAt(be) ? (a = f, be++) : (a = i, 0 === Se && Te(d)), a !== i ? (s = qe(), s !== i ? (l = Pe(), l !== i ? (c = qe(), c !== i ? (125 === e.charCodeAt(be) ? (u = g, be++) : (u = i, 0 === Se && Te(v)), u !== i ? (we = t, n = I(r, l), t = n) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i), t;
    }
    function Ue() {
      var t, n, r, o;
      return t = be, e.substr(be, 7) === $ ? (n = $, be += 7) : (n = i, 0 === Se && Te(F)), n !== i ? (r = qe(), r !== i ? (o = Xe(), o !== i ? (we = t, n = B(o), t = n) : (be = t, t = i)) : (be = t, t = i)) : (be = t, t = i), t;
    }
    function ze() {
      var e, t, n, r, o;
      if (e = be, t = Ue(), t === i && (t = null), t !== i) {
        if (n = qe(), n !== i) {
          if (r = [], o = He(), o !== i) while (o !== i) r.push(o), o = He();else r = i;
          r !== i ? (we = e, t = V(t, r), e = t) : (be = e, e = i);
        } else be = e, e = i;
      } else be = e, e = i;
      return e;
    }
    function Ge() {
      var t, n;
      if (Se++, t = [], H.test(e.charAt(be)) ? (n = e.charAt(be), be++) : (n = i, 0 === Se && Te(U)), n !== i) while (n !== i) t.push(n), H.test(e.charAt(be)) ? (n = e.charAt(be), be++) : (n = i, 0 === Se && Te(U));else t = i;
      return Se--, t === i && (n = i, 0 === Se && Te(W)), t;
    }
    function qe() {
      var t, n, r;
      Se++, t = be, n = [], r = Ge();
      while (r !== i) n.push(r), r = Ge();
      return t = n !== i ? e.substring(t, be) : n, Se--, t === i && (n = i, 0 === Se && Te(z)), t;
    }
    function Ke() {
      var t;
      return G.test(e.charAt(be)) ? (t = e.charAt(be), be++) : (t = i, 0 === Se && Te(q)), t;
    }
    function Ye() {
      var t;
      return K.test(e.charAt(be)) ? (t = e.charAt(be), be++) : (t = i, 0 === Se && Te(Y)), t;
    }
    function Xe() {
      var t, n, r, o, a, s;
      if (t = be, 48 === e.charCodeAt(be) ? (n = X, be++) : (n = i, 0 === Se && Te(Q)), n === i) {
        if (n = be, r = be, Z.test(e.charAt(be)) ? (o = e.charAt(be), be++) : (o = i, 0 === Se && Te(J)), o !== i) {
          a = [], s = Ke();
          while (s !== i) a.push(s), s = Ke();
          a !== i ? (o = [o, a], r = o) : (be = r, r = i);
        } else be = r, r = i;
        n = r !== i ? e.substring(n, be) : r;
      }
      return n !== i && (we = t, n = ee(n)), t = n, t;
    }
    function Qe() {
      var t, n, r, o, a, s, l, c;
      return te.test(e.charAt(be)) ? (t = e.charAt(be), be++) : (t = i, 0 === Se && Te(ne)), t === i && (t = be, e.substr(be, 2) === re ? (n = re, be += 2) : (n = i, 0 === Se && Te(ie)), n !== i && (we = t, n = oe()), t = n, t === i && (t = be, e.substr(be, 2) === ae ? (n = ae, be += 2) : (n = i, 0 === Se && Te(se)), n !== i && (we = t, n = le()), t = n, t === i && (t = be, e.substr(be, 2) === ce ? (n = ce, be += 2) : (n = i, 0 === Se && Te(ue)), n !== i && (we = t, n = he()), t = n, t === i && (t = be, e.substr(be, 2) === fe ? (n = fe, be += 2) : (n = i, 0 === Se && Te(de)), n !== i && (we = t, n = pe()), t = n, t === i && (t = be, e.substr(be, 2) === me ? (n = me, be += 2) : (n = i, 0 === Se && Te(ge)), n !== i ? (r = be, o = be, a = Ye(), a !== i ? (s = Ye(), s !== i ? (l = Ye(), l !== i ? (c = Ye(), c !== i ? (a = [a, s, l, c], o = a) : (be = o, o = i)) : (be = o, o = i)) : (be = o, o = i)) : (be = o, o = i), r = o !== i ? e.substring(r, be) : o, r !== i ? (we = t, n = ve(r), t = n) : (be = t, t = i)) : (be = t, t = i)))))), t;
    }
    function Ze() {
      var e, t, n;
      if (e = be, t = [], n = Qe(), n !== i) while (n !== i) t.push(n), n = Qe();else t = i;
      return t !== i && (we = e, t = ye(t)), e = t, e;
    }
    if (n = a(), n !== i && be === e.length) return n;
    throw n !== i && be < e.length && Te({
      type: "end",
      description: "end of input"
    }), Le(null, Ee, _e < e.length ? e.charAt(_e) : null, _e < e.length ? Oe(_e, _e + 1) : Oe(_e, _e));
  }
  return e(t, Error), {
    SyntaxError: t,
    parse: n
  };
}();
