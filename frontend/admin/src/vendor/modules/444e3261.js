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
  function i(e, t) {
    var n = c(e, t);
    return function (i) {
      var o = i.length;
      if (t.a && 3 === e.nodeType && e.nodeValue !== n.a && i.push(new r({
        type: "characterData",
        target: e,
        oldValue: n.a
      })), t.b && n.b && s(i, e, n.b, t.f), t.c || t.g) var a = l(i, e, n, t);
      (a || i.length !== o) && (n = c(e, t));
    };
  }
  function o(e, t) {
    return t.value;
  }
  function a(e, t) {
    return "style" !== t.name ? t.value : e.style.cssText;
  }
  function s(t, n, i, o) {
    for (var a, s, l = {}, c = n.attributes, u = c.length; u--;) a = c[u], s = a.name, o && o[s] === e || (m(n, a) !== i[s] && t.push(r({
      type: "attributes",
      target: n,
      attributeName: s,
      oldValue: i[s],
      attributeNamespace: a.namespaceURI
    })), l[s] = !0);
    for (s in i) l[s] || t.push(r({
      target: n,
      type: "attributes",
      attributeName: s,
      oldValue: i[s]
    }));
  }
  function l(t, n, i, o) {
    function a(e, n, i, a, c) {
      var u,
        h,
        f,
        d = e.length - 1;
      for (c = -~((d - c) / 2); f = e.pop();) u = i[f.j], h = a[f.l], o.c && c && Math.abs(f.j - f.l) >= d && (t.push(r({
        type: "childList",
        target: n,
        addedNodes: [u],
        removedNodes: [u],
        nextSibling: u.nextSibling,
        previousSibling: u.previousSibling
      })), c--), o.b && h.b && s(t, u, h.b, o.f), o.a && 3 === u.nodeType && u.nodeValue !== h.a && t.push(r({
        type: "characterData",
        target: u,
        oldValue: h.a
      })), o.g && l(u, h);
    }
    function l(n, i) {
      for (var h, f, p, m, g, v = n.childNodes, y = i.c, b = v.length, w = y ? y.length : 0, x = 0, _ = 0, E = 0; _ < b || E < w;) m = v[_], g = (p = y[E]) && p.node, m === g ? (o.b && p.b && s(t, m, p.b, o.f), o.a && p.a !== e && m.nodeValue !== p.a && t.push(r({
        type: "characterData",
        target: m,
        oldValue: p.a
      })), f && a(f, n, v, y, x), o.g && (m.childNodes.length || p.c && p.c.length) && l(m, p), _++, E++) : (c = !0, h || (h = {}, f = []), m && (h[p = u(m)] || (h[p] = !0, -1 === (p = d(y, m, E, "node")) ? o.c && (t.push(r({
        type: "childList",
        target: n,
        addedNodes: [m],
        nextSibling: m.nextSibling,
        previousSibling: m.previousSibling
      })), x++) : f.push({
        j: _,
        l: p
      })), _++), g && g !== v[_] && (h[p = u(g)] || (h[p] = !0, -1 === (p = d(v, g, _)) ? o.c && (t.push(r({
        type: "childList",
        target: i.node,
        removedNodes: [g],
        nextSibling: y[E + 1],
        previousSibling: y[E - 1]
      })), x--) : f.push({
        j: p,
        l: E
      })), E++));
      f && a(f, n, v, y, x);
    }
    var c;
    return l(n, i), c;
  }
  function c(e, t) {
    var n = !0;
    return function e(r) {
      var i = {
        node: r
      };
      return !t.a || 3 !== r.nodeType && 8 !== r.nodeType ? (t.b && n && 1 === r.nodeType && (i.b = f(r.attributes, function (e, n) {
        return t.f && !t.f[n.name] || (e[n.name] = m(r, n)), e;
      }, {})), n && (t.c || t.a || t.b && t.g) && (i.c = h(r.childNodes, e)), n = t.g) : i.a = r.nodeValue, i;
    }(e);
  }
  function u(e) {
    try {
      return e.id || (e.mo_id = e.mo_id || g++);
    } catch (t) {
      try {
        return e.nodeValue;
      } catch (e) {
        return g++;
      }
    }
  }
  function h(e, t) {
    for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r, e);
    return n;
  }
  function f(e, t, n) {
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
        }, o = this.i, a = 0; a < o.length; a++) o[a].s === e && o.splice(a, 1);
      t.attributeFilter && (r.f = f(t.attributeFilter, function (e, t) {
        return e[t] = !0, e;
      }, {})), o.push({
        s: e,
        o: i(e, r)
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
  var p = document.createElement("i");
  p.style.top = 0;
  var m = (p = "null" != p.attributes.style.value) ? o : a,
    g = 1;
  return t;
}(void 0));
