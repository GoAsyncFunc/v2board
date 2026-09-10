let legacyModule = module,
  legacyExports = exports;
var r = require("./68594c6a.js"),
  i = require("./42713255.js"),
  o = require("./6d464469.js"),
  a = require("./62394f74.js"),
  s = require("./36477258.js"),
  l = require("./62597459.js"),
  c = require("./4c505441.js"),
  u = require("./51653970.js"),
  h = require("./53385358.js"),
  f = "__zr_normal__",
  d = r["a"].concat(["ignore"]),
  p = Object(l["I"])(r["a"], function (e, t) {
    return e[t] = !0, e;
  }, {
    ignore: !1
  }),
  m = {},
  g = new o["a"](0, 0, 0, 0),
  v = function () {
    function e(e) {
      this.id = Object(l["n"])(), this.animators = [], this.currentStates = [], this.states = {}, this._init(e);
    }
    return e.prototype._init = function (e) {
      this.attr(e);
    }, e.prototype.drift = function (e, t, n) {
      switch (this.draggable) {
        case "horizontal":
          t = 0;
          break;
        case "vertical":
          e = 0;
          break;
      }
      var r = this.transform;
      r || (r = this.transform = [1, 0, 0, 1, 0, 0]), r[4] += e, r[5] += t, this.decomposeTransform(), this.markRedraw();
    }, e.prototype.beforeUpdate = function () {}, e.prototype.afterUpdate = function () {}, e.prototype.update = function () {
      this.updateTransform(), this.__dirty && this.updateInnerText();
    }, e.prototype.updateInnerText = function (e) {
      var t = this._textContent;
      if (t && (!t.ignore || e)) {
        this.textConfig || (this.textConfig = {});
        var n = this.textConfig,
          r = n.local,
          i = t.innerTransformable,
          o = void 0,
          a = void 0,
          l = !1;
        i.parent = r ? this : null;
        var c = !1;
        if (i.copyTransform(t), null != n.position) {
          var u = g;
          n.layoutRect ? u.copy(n.layoutRect) : u.copy(this.getBoundingRect()), r || u.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(m, n, u) : Object(s["c"])(m, n, u), i.x = m.x, i.y = m.y, o = m.align, a = m.verticalAlign;
          var f = n.origin;
          if (f && null != n.rotation) {
            var d = void 0,
              p = void 0;
            "center" === f ? (d = .5 * u.width, p = .5 * u.height) : (d = Object(s["g"])(f[0], u.width), p = Object(s["g"])(f[1], u.height)), c = !0, i.originX = -i.x + d + (r ? 0 : u.x), i.originY = -i.y + p + (r ? 0 : u.y);
          }
        }
        null != n.rotation && (i.rotation = n.rotation);
        var v = n.offset;
        v && (i.x += v[0], i.y += v[1], c || (i.originX = -v[0], i.originY = -v[1]));
        var y = null == n.inside ? "string" === typeof n.position && n.position.indexOf("inside") >= 0 : n.inside,
          b = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}),
          w = void 0,
          x = void 0,
          _ = void 0;
        y && this.canBeInsideText() ? (w = n.insideFill, x = n.insideStroke, null != w && "auto" !== w || (w = this.getInsideTextFill()), null != x && "auto" !== x || (x = this.getInsideTextStroke(w), _ = !0)) : (w = n.outsideFill, x = n.outsideStroke, null != w && "auto" !== w || (w = this.getOutsideFill()), null != x && "auto" !== x || (x = this.getOutsideStroke(w), _ = !0)), w = w || "#000", w === b.fill && x === b.stroke && _ === b.autoStroke && o === b.align && a === b.verticalAlign || (l = !0, b.fill = w, b.stroke = x, b.autoStroke = _, b.align = o, b.verticalAlign = a, t.setDefaultTextStyle(b)), t.__dirty |= h["a"], l && t.dirtyStyle(!0);
      }
    }, e.prototype.canBeInsideText = function () {
      return !0;
    }, e.prototype.getInsideTextFill = function () {
      return "#fff";
    }, e.prototype.getInsideTextStroke = function (e) {
      return "#000";
    }, e.prototype.getOutsideFill = function () {
      return this.__zr && this.__zr.isDarkMode() ? c["d"] : c["a"];
    }, e.prototype.getOutsideStroke = function (e) {
      var t = this.__zr && this.__zr.getBackgroundColor(),
        n = "string" === typeof t && Object(u["d"])(t);
      n || (n = [255, 255, 255, 1]);
      for (var r = n[3], i = this.__zr.isDarkMode(), o = 0; o < 3; o++) n[o] = n[o] * r + (i ? 0 : 255) * (1 - r);
      return n[3] = 1, Object(u["e"])(n, "rgba");
    }, e.prototype.traverse = function (e, t) {}, e.prototype.attrKV = function (e, t) {
      "textConfig" === e ? this.setTextConfig(t) : "textContent" === e ? this.setTextContent(t) : "clipPath" === e ? this.setClipPath(t) : "extra" === e ? (this.extra = this.extra || {}, Object(l["l"])(this.extra, t)) : this[e] = t;
    }, e.prototype.hide = function () {
      this.ignore = !0, this.markRedraw();
    }, e.prototype.show = function () {
      this.ignore = !1, this.markRedraw();
    }, e.prototype.attr = function (e, t) {
      if ("string" === typeof e) this.attrKV(e, t);else if (Object(l["x"])(e)) for (var n = e, r = Object(l["B"])(n), i = 0; i < r.length; i++) {
        var o = r[i];
        this.attrKV(o, e[o]);
      }
      return this.markRedraw(), this;
    }, e.prototype.saveCurrentToNormalState = function (e) {
      this._innerSaveToNormal(e);
      for (var t = this._normalState, n = 0; n < this.animators.length; n++) {
        var r = this.animators[n],
          i = r.__fromStateTransition;
        if (!(r.getLoop() || i && i !== f)) {
          var o = r.targetName,
            a = o ? t[o] : t;
          r.saveTo(a);
        }
      }
    }, e.prototype._innerSaveToNormal = function (e) {
      var t = this._normalState;
      t || (t = this._normalState = {}), e.textConfig && !t.textConfig && (t.textConfig = this.textConfig), this._savePrimaryToNormal(e, t, d);
    }, e.prototype._savePrimaryToNormal = function (e, t, n) {
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        null == e[i] || i in t || (t[i] = this[i]);
      }
    }, e.prototype.hasState = function () {
      return this.currentStates.length > 0;
    }, e.prototype.getState = function (e) {
      return this.states[e];
    }, e.prototype.ensureState = function (e) {
      var t = this.states;
      return t[e] || (t[e] = {}), t[e];
    }, e.prototype.clearStates = function (e) {
      this.useState(f, !1, e);
    }, e.prototype.useState = function (e, t, n, r) {
      var i = e === f,
        o = this.hasState();
      if (o || !i) {
        var a = this.currentStates,
          s = this.stateTransition;
        if (!(Object(l["p"])(a, e) >= 0) || !t && 1 !== a.length) {
          var c;
          if (this.stateProxy && !i && (c = this.stateProxy(e)), c || (c = this.states && this.states[e]), c || i) {
            i || this.saveCurrentToNormalState(c);
            var u = !!(c && c.hoverLayer || r);
            u && this._toggleHoverLayerFlag(!0), this._applyStateObj(e, c, this._normalState, t, !n && !this.__inHover && s && s.duration > 0, s);
            var d = this._textContent,
              p = this._textGuide;
            return d && d.useState(e, t, n, u), p && p.useState(e, t, n, u), i ? (this.currentStates = [], this._normalState = {}) : t ? this.currentStates.push(e) : this.currentStates = [e], this._updateAnimationTargets(), this.markRedraw(), !u && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~h["a"]), c;
          }
          Object(l["C"])("State " + e + " not exists.");
        }
      }
    }, e.prototype.useStates = function (e, t, n) {
      if (e.length) {
        var r = [],
          i = this.currentStates,
          o = e.length,
          a = o === i.length;
        if (a) for (var s = 0; s < o; s++) if (e[s] !== i[s]) {
          a = !1;
          break;
        }
        if (a) return;
        for (s = 0; s < o; s++) {
          var l = e[s],
            c = void 0;
          this.stateProxy && (c = this.stateProxy(l, e)), c || (c = this.states[l]), c && r.push(c);
        }
        var u = r[o - 1],
          f = !!(u && u.hoverLayer || n);
        f && this._toggleHoverLayerFlag(!0);
        var d = this._mergeStates(r),
          p = this.stateTransition;
        this.saveCurrentToNormalState(d), this._applyStateObj(e.join(","), d, this._normalState, !1, !t && !this.__inHover && p && p.duration > 0, p);
        var m = this._textContent,
          g = this._textGuide;
        m && m.useStates(e, t, f), g && g.useStates(e, t, f), this._updateAnimationTargets(), this.currentStates = e.slice(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~h["a"]);
      } else this.clearStates();
    }, e.prototype._updateAnimationTargets = function () {
      for (var e = 0; e < this.animators.length; e++) {
        var t = this.animators[e];
        t.targetName && t.changeTarget(this[t.targetName]);
      }
    }, e.prototype.removeState = function (e) {
      var t = Object(l["p"])(this.currentStates, e);
      if (t >= 0) {
        var n = this.currentStates.slice();
        n.splice(t, 1), this.useStates(n);
      }
    }, e.prototype.replaceState = function (e, t, n) {
      var r = this.currentStates.slice(),
        i = Object(l["p"])(r, e),
        o = Object(l["p"])(r, t) >= 0;
      i >= 0 ? o ? r.splice(i, 1) : r[i] = t : n && !o && r.push(t), this.useStates(r);
    }, e.prototype.toggleState = function (e, t) {
      t ? this.useState(e, !0) : this.removeState(e);
    }, e.prototype._mergeStates = function (e) {
      for (var t, n = {}, r = 0; r < e.length; r++) {
        var i = e[r];
        Object(l["l"])(n, i), i.textConfig && (t = t || {}, Object(l["l"])(t, i.textConfig));
      }
      return t && (n.textConfig = t), n;
    }, e.prototype._applyStateObj = function (e, t, n, r, i, o) {
      var a = !(t && r);
      t && t.textConfig ? (this.textConfig = Object(l["l"])({}, r ? this.textConfig : n.textConfig), Object(l["l"])(this.textConfig, t.textConfig)) : a && n.textConfig && (this.textConfig = n.textConfig);
      for (var s = {}, c = !1, u = 0; u < d.length; u++) {
        var h = d[u],
          f = i && p[h];
        t && null != t[h] ? f ? (c = !0, s[h] = t[h]) : this[h] = t[h] : a && null != n[h] && (f ? (c = !0, s[h] = n[h]) : this[h] = n[h]);
      }
      if (!i) for (u = 0; u < this.animators.length; u++) {
        var m = this.animators[u],
          g = m.targetName;
        m.getLoop() || m.__changeFinalValue(g ? (t || n)[g] : t || n);
      }
      c && this._transitionState(e, s, o);
    }, e.prototype._attachComponent = function (e) {
      if ((!e.__zr || e.__hostTarget) && e !== this) {
        var t = this.__zr;
        t && e.addSelfToZr(t), e.__zr = t, e.__hostTarget = this;
      }
    }, e.prototype._detachComponent = function (e) {
      e.__zr && e.removeSelfFromZr(e.__zr), e.__zr = null, e.__hostTarget = null;
    }, e.prototype.getClipPath = function () {
      return this._clipPath;
    }, e.prototype.setClipPath = function (e) {
      this._clipPath && this._clipPath !== e && this.removeClipPath(), this._attachComponent(e), this._clipPath = e, this.markRedraw();
    }, e.prototype.removeClipPath = function () {
      var e = this._clipPath;
      e && (this._detachComponent(e), this._clipPath = null, this.markRedraw());
    }, e.prototype.getTextContent = function () {
      return this._textContent;
    }, e.prototype.setTextContent = function (e) {
      var t = this._textContent;
      t !== e && (t && t !== e && this.removeTextContent(), e.innerTransformable = new r["c"](), this._attachComponent(e), this._textContent = e, this.markRedraw());
    }, e.prototype.setTextConfig = function (e) {
      this.textConfig || (this.textConfig = {}), Object(l["l"])(this.textConfig, e), this.markRedraw();
    }, e.prototype.removeTextConfig = function () {
      this.textConfig = null, this.markRedraw();
    }, e.prototype.removeTextContent = function () {
      var e = this._textContent;
      e && (e.innerTransformable = null, this._detachComponent(e), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
    }, e.prototype.getTextGuideLine = function () {
      return this._textGuide;
    }, e.prototype.setTextGuideLine = function (e) {
      this._textGuide && this._textGuide !== e && this.removeTextGuideLine(), this._attachComponent(e), this._textGuide = e, this.markRedraw();
    }, e.prototype.removeTextGuideLine = function () {
      var e = this._textGuide;
      e && (this._detachComponent(e), this._textGuide = null, this.markRedraw());
    }, e.prototype.markRedraw = function () {
      this.__dirty |= h["a"];
      var e = this.__zr;
      e && (this.__inHover ? e.refreshHover() : e.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
    }, e.prototype.dirty = function () {
      this.markRedraw();
    }, e.prototype._toggleHoverLayerFlag = function (e) {
      this.__inHover = e;
      var t = this._textContent,
        n = this._textGuide;
      t && (t.__inHover = e), n && (n.__inHover = e);
    }, e.prototype.addSelfToZr = function (e) {
      if (this.__zr !== e) {
        this.__zr = e;
        var t = this.animators;
        if (t) for (var n = 0; n < t.length; n++) e.animation.addAnimator(t[n]);
        this._clipPath && this._clipPath.addSelfToZr(e), this._textContent && this._textContent.addSelfToZr(e), this._textGuide && this._textGuide.addSelfToZr(e);
      }
    }, e.prototype.removeSelfFromZr = function (e) {
      if (this.__zr) {
        this.__zr = null;
        var t = this.animators;
        if (t) for (var n = 0; n < t.length; n++) e.animation.removeAnimator(t[n]);
        this._clipPath && this._clipPath.removeSelfFromZr(e), this._textContent && this._textContent.removeSelfFromZr(e), this._textGuide && this._textGuide.removeSelfFromZr(e);
      }
    }, e.prototype.animate = function (e, t, n) {
      var r = e ? this[e] : this;
      var o = new i["b"](r, t, n);
      return e && (o.targetName = e), this.addAnimator(o, e), o;
    }, e.prototype.addAnimator = function (e, t) {
      var n = this.__zr,
        r = this;
      e.during(function () {
        r.updateDuringAnimation(t);
      }).done(function () {
        var t = r.animators,
          n = Object(l["p"])(t, e);
        n >= 0 && t.splice(n, 1);
      }), this.animators.push(e), n && n.animation.addAnimator(e), n && n.wakeUp();
    }, e.prototype.updateDuringAnimation = function (e) {
      this.markRedraw();
    }, e.prototype.stopAnimation = function (e, t) {
      for (var n = this.animators, r = n.length, i = [], o = 0; o < r; o++) {
        var a = n[o];
        e && e !== a.scope ? i.push(a) : a.stop(t);
      }
      return this.animators = i, this;
    }, e.prototype.animateTo = function (e, t, n) {
      y(this, e, t, n);
    }, e.prototype.animateFrom = function (e, t, n) {
      y(this, e, t, n, !0);
    }, e.prototype._transitionState = function (e, t, n, r) {
      for (var i = y(this, t, n, r), o = 0; o < i.length; o++) i[o].__fromStateTransition = e;
    }, e.prototype.getBoundingRect = function () {
      return null;
    }, e.prototype.getPaintRect = function () {
      return null;
    }, e.initDefaultProps = function () {
      var t = e.prototype;
      t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = h["a"];
      function n(e, n, r, i) {
        function o(e, t) {
          Object.defineProperty(t, 0, {
            get: function () {
              return e[r];
            },
            set: function (t) {
              e[r] = t;
            }
          }), Object.defineProperty(t, 1, {
            get: function () {
              return e[i];
            },
            set: function (t) {
              e[i] = t;
            }
          });
        }
        Object.defineProperty(t, e, {
          get: function () {
            if (!this[n]) {
              var e = this[n] = [];
              o(this, e);
            }
            return this[n];
          },
          set: function (e) {
            this[r] = e[0], this[i] = e[1], this[n] = e, o(this, e);
          }
        });
      }
      Object.defineProperty && (n("position", "_legacyPos", "x", "y"), n("scale", "_legacyScale", "scaleX", "scaleY"), n("origin", "_legacyOrigin", "originX", "originY"));
    }(), e;
  }();
function y(e, t, n, r, i) {
  n = n || {};
  var o = [];
  S(e, "", e, t, n, r, o, i);
  var a = o.length,
    s = !1,
    l = n.done,
    c = n.aborted,
    u = function () {
      s = !0, a--, a <= 0 && (s ? l && l() : c && c());
    },
    h = function () {
      a--, a <= 0 && (s ? l && l() : c && c());
    };
  a || l && l(), o.length > 0 && n.during && o[0].during(function (e, t) {
    n.during(t);
  });
  for (var f = 0; f < o.length; f++) {
    var d = o[f];
    u && d.done(u), h && d.aborted(h), n.force && d.duration(n.duration), d.start(n.easing);
  }
  return o;
}
function b(e, t, n) {
  for (var r = 0; r < n; r++) e[r] = t[r];
}
function w(e) {
  return Object(l["s"])(e[0]);
}
function x(e, t, n) {
  if (Object(l["s"])(t[n])) {
    if (Object(l["s"])(e[n]) || (e[n] = []), Object(l["A"])(t[n])) {
      var r = t[n].length;
      e[n].length !== r && (e[n] = new t[n].constructor(r), b(e[n], t[n], r));
    } else {
      var i = t[n],
        o = e[n],
        a = i.length;
      if (w(i)) for (var s = i[0].length, c = 0; c < a; c++) o[c] ? b(o[c], i[c], s) : o[c] = Array.prototype.slice.call(i[c]);else b(o, i, a);
      o.length = i.length;
    }
  } else e[n] = t[n];
}
function _(e, t) {
  return e === t || Object(l["s"])(e) && Object(l["s"])(t) && E(e, t);
}
function E(e, t) {
  var n = e.length;
  if (n !== t.length) return !1;
  for (var r = 0; r < n; r++) if (e[r] !== t[r]) return !1;
  return !0;
}
function S(e, t, n, r, o, a, s, c) {
  for (var u = Object(l["B"])(r), h = o.duration, f = o.delay, d = o.additive, p = o.setToFinal, m = !Object(l["x"])(a), g = e.animators, v = [], y = 0; y < u.length; y++) {
    var b = u[y],
      w = r[b];
    if (null != w && null != n[b] && (m || a[b])) {
      if (!Object(l["x"])(w) || Object(l["s"])(w) || Object(l["v"])(w)) v.push(b);else {
        if (t) {
          c || (n[b] = w, e.updateDuringAnimation(t));
          continue;
        }
        S(e, b, n[b], w, o, a && a[b], s, c);
      }
    } else c || (n[b] = w, e.updateDuringAnimation(t), v.push(b));
  }
  var E = v.length;
  if (!d && E) for (var k = 0; k < g.length; k++) {
    var C = g[k];
    if (C.targetName === t) {
      var O = C.stopTracks(v);
      if (O) {
        var T = Object(l["p"])(g, C);
        g.splice(T, 1);
      }
    }
  }
  if (o.force || (v = Object(l["m"])(v, function (e) {
    return !_(r[e], n[e]);
  }), E = v.length), E > 0 || o.force && !s.length) {
    var L = void 0,
      A = void 0,
      P = void 0;
    if (c) {
      A = {}, p && (L = {});
      for (k = 0; k < E; k++) {
        b = v[k];
        A[b] = n[b], p ? L[b] = r[b] : n[b] = r[b];
      }
    } else if (p) {
      P = {};
      for (k = 0; k < E; k++) {
        b = v[k];
        P[b] = Object(i["a"])(n[b]), x(n, r, b);
      }
    }
    C = new i["b"](n, !1, !1, d ? Object(l["m"])(g, function (e) {
      return e.targetName === t;
    }) : null);
    C.targetName = t, o.scope && (C.scope = o.scope), p && L && C.whenWithKeys(0, L, v), P && C.whenWithKeys(0, P, v), C.whenWithKeys(null == h ? 500 : h, c ? A : r, v).delay(f || 0), e.addAnimator(C, t), s.push(C);
  }
}
Object(l["F"])(v, a["a"]), Object(l["F"])(v, r["c"]), legacyExports["a"] = v;
