let legacyModule = module,
  legacyExports = exports;
window.MutationObserver || (window.MutationObserver = function (e) {
  function t(e) {
    this.i = [], this.m = e;
  }
  function n(e) {
    (function n() {
      var r = e.takeRecords();
      r.length && e.m(r, e), e.h = setTimeout(n, t._period);
    })();
  }
  function r(t) {
    var n,
      r = {
        type: null,
        target: null,
        addedNodes: [],
        removedNodes: [],
        previousSibling: null,
        nextSibling: null,
        attributeName: null,
        attributeNamespace: null,
        oldValue: null
      };
    for (n in t) r[n] !== e && t[n] !== e && (r[n] = t[n]);
    return r;
  }
  function o(e, t) {
    var n = u(e, t);
    return function (o) {
      var i = o.length;
      if (t.a && 3 === e.nodeType && e.nodeValue !== n.a && o.push(new r({
        type: "characterData",
        target: e,
        oldValue: n.a
      })), t.b && n.b && s(o, e, n.b, t.f), t.c || t.g) var a = c(o, e, n, t);
      (a || o.length !== i) && (n = u(e, t));
    };
  }
  function i(e, t) {
    return t.value;
  }
  function a(e, t) {
    return "style" !== t.name ? t.value : e.style.cssText;
  }
  function s(t, n, o, i) {
    for (var a, s, c = {}, u = n.attributes, l = u.length; l--;) a = u[l], s = a.name, i && i[s] === e || (m(n, a) !== o[s] && t.push(r({
      type: "attributes",
      target: n,
      attributeName: s,
      oldValue: o[s],
      attributeNamespace: a.namespaceURI
    })), c[s] = !0);
    for (s in o) c[s] || t.push(r({
      target: n,
      type: "attributes",
      attributeName: s,
      oldValue: o[s]
    }));
  }
  function c(t, n, o, i) {
    function a(e, n, o, a, u) {
      var l,
        f,
        p,
        d = e.length - 1;
      for (u = -~((d - u) / 2); p = e.pop();) l = o[p.j], f = a[p.l], i.c && u && Math.abs(p.j - p.l) >= d && (t.push(r({
        type: "childList",
        target: n,
        addedNodes: [l],
        removedNodes: [l],
        nextSibling: l.nextSibling,
        previousSibling: l.previousSibling
      })), u--), i.b && f.b && s(t, l, f.b, i.f), i.a && 3 === l.nodeType && l.nodeValue !== f.a && t.push(r({
        type: "characterData",
        target: l,
        oldValue: f.a
      })), i.g && c(l, f);
    }
    function c(n, o) {
      for (var f, p, h, m, v, y = n.childNodes, g = o.c, b = y.length, w = g ? g.length : 0, x = 0, O = 0, E = 0; O < b || E < w;) m = y[O], v = (h = g[E]) && h.node, m === v ? (i.b && h.b && s(t, m, h.b, i.f), i.a && h.a !== e && m.nodeValue !== h.a && t.push(r({
        type: "characterData",
        target: m,
        oldValue: h.a
      })), p && a(p, n, y, g, x), i.g && (m.childNodes.length || h.c && h.c.length) && c(m, h), O++, E++) : (u = !0, f || (f = {}, p = []), m && (f[h = l(m)] || (f[h] = !0, -1 === (h = d(g, m, E, "node")) ? i.c && (t.push(r({
        type: "childList",
        target: n,
        addedNodes: [m],
        nextSibling: m.nextSibling,
        previousSibling: m.previousSibling
      })), x++) : p.push({
        j: O,
        l: h
      })), O++), v && v !== y[O] && (f[h = l(v)] || (f[h] = !0, -1 === (h = d(y, v, O)) ? i.c && (t.push(r({
        type: "childList",
        target: o.node,
        removedNodes: [v],
        nextSibling: g[E + 1],
        previousSibling: g[E - 1]
      })), x--) : p.push({
        j: h,
        l: E
      })), E++));
      p && a(p, n, y, g, x);
    }
    var u;
    return c(n, o), u;
  }
  function u(e, t) {
    var n = !0;
    return function e(r) {
      var o = {
        node: r
      };
      return !t.a || 3 !== r.nodeType && 8 !== r.nodeType ? (t.b && n && 1 === r.nodeType && (o.b = p(r.attributes, function (e, n) {
        return t.f && !t.f[n.name] || (e[n.name] = m(r, n)), e;
      }, {})), n && (t.c || t.a || t.b && t.g) && (o.c = f(r.childNodes, e)), n = t.g) : o.a = r.nodeValue, o;
    }(e);
  }
  function l(e) {
    try {
      return e.id || (e.mo_id = e.mo_id || v++);
    } catch (t) {
      try {
        return e.nodeValue;
      } catch (e) {
        return v++;
      }
    }
  }
  function f(e, t) {
    for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r, e);
    return n;
  }
  function p(e, t, n) {
    for (var r = 0; r < e.length; r++) n = t(n, e[r], r, e);
    return n;
  }
  function d(e, t, n, r) {
    for (; n < e.length; n++) if ((r ? e[n][r] : e[n]) === t) return n;
    return -1;
  }
  t._period = 30, t.prototype = {
    observe: function (e, t) {
      for (var r = {
          b: !!(t.attributes || t.attributeFilter || t.attributeOldValue),
          c: !!t.childList,
          g: !!t.subtree,
          a: !(!t.characterData && !t.characterDataOldValue)
        }, i = this.i, a = 0; a < i.length; a++) i[a].s === e && i.splice(a, 1);
      t.attributeFilter && (r.f = p(t.attributeFilter, function (e, t) {
        return e[t] = !0, e;
      }, {})), i.push({
        s: e,
        o: o(e, r)
      }), this.h || n(this);
    },
    takeRecords: function () {
      for (var e = [], t = this.i, n = 0; n < t.length; n++) t[n].o(e);
      return e;
    },
    disconnect: function () {
      this.i = [], clearTimeout(this.h), this.h = null;
    }
  };
  var h = document.createElement("i");
  h.style.top = 0;
  var m = (h = "null" != h.attributes.style.value) ? i : a,
    v = 1;
  return t;
}(void 0));
