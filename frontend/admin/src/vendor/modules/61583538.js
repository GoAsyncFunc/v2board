let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./49744746.js"),
  i = require("./62597459.js"),
  o = require("./6d725347.js"),
  a = require("./5142737a.js"),
  s = function () {
    function e(e, t) {
      this.target = e, this.topTarget = t && t.topTarget;
    }
    return e;
  }(),
  l = function () {
    function e(e) {
      this.handler = e, e.on("mousedown", this._dragStart, this), e.on("mousemove", this._drag, this), e.on("mouseup", this._dragEnd, this);
    }
    return e.prototype._dragStart = function (e) {
      var t = e.target;
      while (t && !t.draggable) t = t.parent || t.__hostTarget;
      t && (this._draggingTarget = t, t.dragging = !0, this._x = e.offsetX, this._y = e.offsetY, this.handler.dispatchToElement(new s(t, e), "dragstart", e.event));
    }, e.prototype._drag = function (e) {
      var t = this._draggingTarget;
      if (t) {
        var n = e.offsetX,
          r = e.offsetY,
          i = n - this._x,
          o = r - this._y;
        this._x = n, this._y = r, t.drift(i, o, e), this.handler.dispatchToElement(new s(t, e), "drag", e.event);
        var a = this.handler.findHover(n, r, t).target,
          l = this._dropTarget;
        this._dropTarget = a, t !== a && (l && a !== l && this.handler.dispatchToElement(new s(l, e), "dragleave", e.event), a && a !== l && this.handler.dispatchToElement(new s(a, e), "dragenter", e.event));
      }
    }, e.prototype._dragEnd = function (e) {
      var t = this._draggingTarget;
      t && (t.dragging = !1), this.handler.dispatchToElement(new s(t, e), "dragend", e.event), this._dropTarget && this.handler.dispatchToElement(new s(this._dropTarget, e), "drop", e.event), this._draggingTarget = null, this._dropTarget = null;
    }, e;
  }(),
  c = l,
  u = require("./62394f74.js"),
  h = require("./59483231.js"),
  f = function () {
    function e() {
      this._track = [];
    }
    return e.prototype.recognize = function (e, t, n) {
      return this._doTrack(e, t, n), this._recognize(e);
    }, e.prototype.clear = function () {
      return this._track.length = 0, this;
    }, e.prototype._doTrack = function (e, t, n) {
      var r = e.touches;
      if (r) {
        for (var i = {
            points: [],
            touches: [],
            target: t,
            event: e
          }, o = 0, a = r.length; o < a; o++) {
          var s = r[o],
            l = h["b"](n, s, {});
          i.points.push([l.zrX, l.zrY]), i.touches.push(s);
        }
        this._track.push(i);
      }
    }, e.prototype._recognize = function (e) {
      for (var t in m) if (m.hasOwnProperty(t)) {
        var n = m[t](this._track, e);
        if (n) return n;
      }
    }, e;
  }();
function d(e) {
  var t = e[1][0] - e[0][0],
    n = e[1][1] - e[0][1];
  return Math.sqrt(t * t + n * n);
}
function p(e) {
  return [(e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2];
}
var m = {
    pinch: function (e, t) {
      var n = e.length;
      if (n) {
        var r = (e[n - 1] || {}).points,
          i = (e[n - 2] || {}).points || r;
        if (i && i.length > 1 && r && r.length > 1) {
          var o = d(r) / d(i);
          !isFinite(o) && (o = 1), t.pinchScale = o;
          var a = p(r);
          return t.pinchX = a[0], t.pinchY = a[1], {
            type: "pinch",
            target: e[0].target,
            event: t
          };
        }
      }
    }
  },
  g = require("./6d464469.js"),
  v = "silent";
function y(e, t, n) {
  return {
    type: e,
    event: n,
    target: t.target,
    topTarget: t.topTarget,
    cancelBubble: !1,
    offsetX: n.zrX,
    offsetY: n.zrY,
    gestureEvent: n.gestureEvent,
    pinchX: n.pinchX,
    pinchY: n.pinchY,
    pinchScale: n.pinchScale,
    wheelDelta: n.zrDelta,
    zrByTouch: n.zrByTouch,
    which: n.which,
    stop: b
  };
}
function b() {
  h["f"](this.event);
}
var w = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.handler = null, t;
    }
    return Object(o["a"])(t, e), t.prototype.dispose = function () {}, t.prototype.setCursor = function () {}, t;
  }(u["a"]),
  x = function () {
    function e(e, t) {
      this.x = e, this.y = t;
    }
    return e;
  }(),
  _ = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
  E = new g["a"](0, 0, 0, 0),
  S = function (e) {
    function t(t, n, r, i, o) {
      var a = e.call(this) || this;
      return a._hovered = new x(0, 0), a.storage = t, a.painter = n, a.painterRoot = i, a._pointerSize = o, r = r || new w(), a.proxy = null, a.setHandlerProxy(r), a._draggingMgr = new c(a), a;
    }
    return Object(o["a"])(t, e), t.prototype.setHandlerProxy = function (e) {
      this.proxy && this.proxy.dispose(), e && (i["j"](_, function (t) {
        e.on && e.on(t, this[t], this);
      }, this), e.handler = this), this.proxy = e;
    }, t.prototype.mousemove = function (e) {
      var t = e.zrX,
        n = e.zrY,
        r = O(this, t, n),
        i = this._hovered,
        o = i.target;
      o && !o.__zr && (i = this.findHover(i.x, i.y), o = i.target);
      var a = this._hovered = r ? new x(t, n) : this.findHover(t, n),
        s = a.target,
        l = this.proxy;
      l.setCursor && l.setCursor(s ? s.cursor : "default"), o && s !== o && this.dispatchToElement(i, "mouseout", e), this.dispatchToElement(a, "mousemove", e), s && s !== o && this.dispatchToElement(a, "mouseover", e);
    }, t.prototype.mouseout = function (e) {
      var t = e.zrEventControl;
      "only_globalout" !== t && this.dispatchToElement(this._hovered, "mouseout", e), "no_globalout" !== t && this.trigger("globalout", {
        type: "globalout",
        event: e
      });
    }, t.prototype.resize = function () {
      this._hovered = new x(0, 0);
    }, t.prototype.dispatch = function (e, t) {
      var n = this[e];
      n && n.call(this, t);
    }, t.prototype.dispose = function () {
      this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
    }, t.prototype.setCursorStyle = function (e) {
      var t = this.proxy;
      t.setCursor && t.setCursor(e);
    }, t.prototype.dispatchToElement = function (e, t, n) {
      e = e || {};
      var r = e.target;
      if (!r || !r.silent) {
        var i = "on" + t,
          o = y(t, e, n);
        while (r) if (r[i] && (o.cancelBubble = !!r[i].call(r, o)), r.trigger(t, o), r = r.__hostTarget ? r.__hostTarget : r.parent, o.cancelBubble) break;
        o.cancelBubble || (this.trigger(t, o), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function (e) {
          "function" === typeof e[i] && e[i].call(e, o), e.trigger && e.trigger(t, o);
        }));
      }
    }, t.prototype.findHover = function (e, t, n) {
      var r = this.storage.getDisplayList(),
        i = new x(e, t);
      if (C(r, i, e, t, n), this._pointerSize && !i.target) {
        for (var o = [], a = this._pointerSize, s = a / 2, l = new g["a"](e - s, t - s, a, a), c = r.length - 1; c >= 0; c--) {
          var u = r[c];
          u === n || u.ignore || u.ignoreCoarsePointer || u.parent && u.parent.ignoreCoarsePointer || (E.copy(u.getBoundingRect()), u.transform && E.applyTransform(u.transform), E.intersect(l) && o.push(u));
        }
        if (o.length) for (var h = 4, f = Math.PI / 12, d = 2 * Math.PI, p = 0; p < s; p += h) for (var m = 0; m < d; m += f) {
          var v = e + p * Math.cos(m),
            y = t + p * Math.sin(m);
          if (C(o, i, v, y, n), i.target) return i;
        }
      }
      return i;
    }, t.prototype.processGesture = function (e, t) {
      this._gestureMgr || (this._gestureMgr = new f());
      var n = this._gestureMgr;
      "start" === t && n.clear();
      var r = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
      if ("end" === t && n.clear(), r) {
        var i = r.type;
        e.gestureEvent = i;
        var o = new x();
        o.target = r.target, this.dispatchToElement(o, i, r.event);
      }
    }, t;
  }(u["a"]);
function k(e, t, n) {
  if (e[e.rectHover ? "rectContain" : "contain"](t, n)) {
    var r = e,
      i = void 0,
      o = !1;
    while (r) {
      if (r.ignoreClip && (o = !0), !o) {
        var a = r.getClipPath();
        if (a && !a.contain(t, n)) return !1;
        r.silent && (i = !0);
      }
      var s = r.__hostTarget;
      r = s || r.parent;
    }
    return !i || v;
  }
  return !1;
}
function C(e, t, n, r, i) {
  for (var o = e.length - 1; o >= 0; o--) {
    var a = e[o],
      s = void 0;
    if (a !== i && !a.ignore && (s = k(a, n, r)) && (!t.topTarget && (t.topTarget = a), s !== v)) {
      t.target = a;
      break;
    }
  }
}
function O(e, t, n) {
  var r = e.painter;
  return t < 0 || t > r.getWidth() || n < 0 || n > r.getHeight();
}
i["j"](["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (e) {
  S.prototype[e] = function (t) {
    var n,
      r,
      i = t.zrX,
      o = t.zrY,
      s = O(this, i, o);
    if ("mouseup" === e && s || (n = this.findHover(i, o), r = n.target), "mousedown" === e) this._downEl = r, this._downPoint = [t.zrX, t.zrY], this._upEl = r;else if ("mouseup" === e) this._upEl = r;else if ("click" === e) {
      if (this._downEl !== this._upEl || !this._downPoint || a["e"](this._downPoint, [t.zrX, t.zrY]) > 4) return;
      this._downPoint = null;
    }
    this.dispatchToElement(n, e, t);
  };
});
var T = S,
  L = require("./42505a55.js"),
  A = require("./53385358.js"),
  P = !1;
function j() {
  P || (P = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function M(e, t) {
  return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var R,
  N = function () {
    function e() {
      this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = M;
    }
    return e.prototype.traverse = function (e, t) {
      for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(e, t);
    }, e.prototype.getDisplayList = function (e, t) {
      t = t || !1;
      var n = this._displayList;
      return !e && n.length || this.updateDisplayList(t), n;
    }, e.prototype.updateDisplayList = function (e) {
      this._displayListLen = 0;
      for (var t = this._roots, n = this._displayList, r = 0, i = t.length; r < i; r++) this._updateAndAddDisplayable(t[r], null, e);
      n.length = this._displayListLen, Object(L["a"])(n, M);
    }, e.prototype._updateAndAddDisplayable = function (e, t, n) {
      if (!e.ignore || n) {
        e.beforeUpdate(), e.update(), e.afterUpdate();
        var r = e.getClipPath();
        if (e.ignoreClip) t = null;else if (r) {
          t = t ? t.slice() : [];
          var i = r,
            o = e;
          while (i) i.parent = o, i.updateTransform(), t.push(i), o = i, i = i.getClipPath();
        }
        if (e.childrenRef) {
          for (var a = e.childrenRef(), s = 0; s < a.length; s++) {
            var l = a[s];
            e.__dirty && (l.__dirty |= A["a"]), this._updateAndAddDisplayable(l, t, n);
          }
          e.__dirty = 0;
        } else {
          var c = e;
          t && t.length ? c.__clipPaths = t : c.__clipPaths && c.__clipPaths.length > 0 && (c.__clipPaths = []), isNaN(c.z) && (j(), c.z = 0), isNaN(c.z2) && (j(), c.z2 = 0), isNaN(c.zlevel) && (j(), c.zlevel = 0), this._displayList[this._displayListLen++] = c;
        }
        var u = e.getDecalElement && e.getDecalElement();
        u && this._updateAndAddDisplayable(u, t, n);
        var h = e.getTextGuideLine();
        h && this._updateAndAddDisplayable(h, t, n);
        var f = e.getTextContent();
        f && this._updateAndAddDisplayable(f, t, n);
      }
    }, e.prototype.addRoot = function (e) {
      e.__zr && e.__zr.storage === this || this._roots.push(e);
    }, e.prototype.delRoot = function (e) {
      if (e instanceof Array) for (var t = 0, n = e.length; t < n; t++) this.delRoot(e[t]);else {
        var r = i["p"](this._roots, e);
        r >= 0 && this._roots.splice(r, 1);
      }
    }, e.prototype.delAllRoots = function () {
      this._roots = [], this._displayList = [], this._displayListLen = 0;
    }, e.prototype.getRoots = function () {
      return this._roots;
    }, e.prototype.dispose = function () {
      this._displayList = null, this._roots = null;
    }, e;
  }(),
  D = N;
R = r["a"].hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (e) {
  return setTimeout(e, 16);
};
var I = R,
  $ = require("./42713255.js");
function F() {
  return new Date().getTime();
}
var B = function (e) {
    function t(t) {
      var n = e.call(this) || this;
      return n._running = !1, n._time = 0, n._pausedTime = 0, n._pauseStart = 0, n._paused = !1, t = t || {}, n.stage = t.stage || {}, n;
    }
    return Object(o["a"])(t, e), t.prototype.addClip = function (e) {
      e.animation && this.removeClip(e), this._head ? (this._tail.next = e, e.prev = this._tail, e.next = null, this._tail = e) : this._head = this._tail = e, e.animation = this;
    }, t.prototype.addAnimator = function (e) {
      e.animation = this;
      var t = e.getClip();
      t && this.addClip(t);
    }, t.prototype.removeClip = function (e) {
      if (e.animation) {
        var t = e.prev,
          n = e.next;
        t ? t.next = n : this._head = n, n ? n.prev = t : this._tail = t, e.next = e.prev = e.animation = null;
      }
    }, t.prototype.removeAnimator = function (e) {
      var t = e.getClip();
      t && this.removeClip(t), e.animation = null;
    }, t.prototype.update = function (e) {
      var t = F() - this._pausedTime,
        n = t - this._time,
        r = this._head;
      while (r) {
        var i = r.next,
          o = r.step(t, n);
        o ? (r.ondestroy(), this.removeClip(r), r = i) : r = i;
      }
      this._time = t, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
    }, t.prototype._startLoop = function () {
      var e = this;
      function t() {
        e._running && (I(t), !e._paused && e.update());
      }
      this._running = !0, I(t);
    }, t.prototype.start = function () {
      this._running || (this._time = F(), this._pausedTime = 0, this._startLoop());
    }, t.prototype.stop = function () {
      this._running = !1;
    }, t.prototype.pause = function () {
      this._paused || (this._pauseStart = F(), this._paused = !0);
    }, t.prototype.resume = function () {
      this._paused && (this._pausedTime += F() - this._pauseStart, this._paused = !1);
    }, t.prototype.clear = function () {
      var e = this._head;
      while (e) {
        var t = e.next;
        e.prev = e.next = e.animation = null, e = t;
      }
      this._head = this._tail = null;
    }, t.prototype.isFinished = function () {
      return null == this._head;
    }, t.prototype.animate = function (e, t) {
      t = t || {}, this.start();
      var n = new $["b"](e, t.loop);
      return this.addAnimator(n), n;
    }, t;
  }(u["a"]),
  V = B,
  W = 300,
  H = r["a"].domSupported,
  U = function () {
    var e = ["click", "dblclick", "mousewheel", "wheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
      t = ["touchstart", "touchend", "touchmove"],
      n = {
        pointerdown: 1,
        pointerup: 1,
        pointermove: 1,
        pointerout: 1
      },
      r = i["D"](e, function (e) {
        var t = e.replace("mouse", "pointer");
        return n.hasOwnProperty(t) ? t : e;
      });
    return {
      mouse: e,
      touch: t,
      pointer: r
    };
  }(),
  z = {
    mouse: ["mousemove", "mouseup"],
    pointer: ["pointermove", "pointerup"]
  },
  G = !1;
function q(e) {
  var t = e.pointerType;
  return "pen" === t || "touch" === t;
}
function K(e) {
  e.touching = !0, null != e.touchTimer && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function () {
    e.touching = !1, e.touchTimer = null;
  }, 700);
}
function Y(e) {
  e && (e.zrByTouch = !0);
}
function X(e, t) {
  return Object(h["d"])(e.dom, new Z(e, t), !0);
}
function Q(e, t) {
  var n = t,
    r = !1;
  while (n && 9 !== n.nodeType && !(r = n.domBelongToZr || n !== t && n === e.painterRoot)) n = n.parentNode;
  return r;
}
var Z = function () {
    function e(e, t) {
      this.stopPropagation = i["G"], this.stopImmediatePropagation = i["G"], this.preventDefault = i["G"], this.type = t.type, this.target = this.currentTarget = e.dom, this.pointerType = t.pointerType, this.clientX = t.clientX, this.clientY = t.clientY;
    }
    return e;
  }(),
  J = {
    mousedown: function (e) {
      e = Object(h["d"])(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
    },
    mousemove: function (e) {
      e = Object(h["d"])(this.dom, e);
      var t = this.__mayPointerCapture;
      !t || e.zrX === t[0] && e.zrY === t[1] || this.__togglePointerCapture(!0), this.trigger("mousemove", e);
    },
    mouseup: function (e) {
      e = Object(h["d"])(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
    },
    mouseout: function (e) {
      e = Object(h["d"])(this.dom, e);
      var t = e.toElement || e.relatedTarget;
      Q(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
    },
    wheel: function (e) {
      G = !0, e = Object(h["d"])(this.dom, e), this.trigger("mousewheel", e);
    },
    mousewheel: function (e) {
      G || (e = Object(h["d"])(this.dom, e), this.trigger("mousewheel", e));
    },
    touchstart: function (e) {
      e = Object(h["d"])(this.dom, e), Y(e), this.__lastTouchMoment = new Date(), this.handler.processGesture(e, "start"), J.mousemove.call(this, e), J.mousedown.call(this, e);
    },
    touchmove: function (e) {
      e = Object(h["d"])(this.dom, e), Y(e), this.handler.processGesture(e, "change"), J.mousemove.call(this, e);
    },
    touchend: function (e) {
      e = Object(h["d"])(this.dom, e), Y(e), this.handler.processGesture(e, "end"), J.mouseup.call(this, e), +new Date() - +this.__lastTouchMoment < W && J.click.call(this, e);
    },
    pointerdown: function (e) {
      J.mousedown.call(this, e);
    },
    pointermove: function (e) {
      q(e) || J.mousemove.call(this, e);
    },
    pointerup: function (e) {
      J.mouseup.call(this, e);
    },
    pointerout: function (e) {
      q(e) || J.mouseout.call(this, e);
    }
  };
i["j"](["click", "dblclick", "contextmenu"], function (e) {
  J[e] = function (t) {
    t = Object(h["d"])(this.dom, t), this.trigger(e, t);
  };
});
var ee = {
  pointermove: function (e) {
    q(e) || ee.mousemove.call(this, e);
  },
  pointerup: function (e) {
    ee.mouseup.call(this, e);
  },
  mousemove: function (e) {
    this.trigger("mousemove", e);
  },
  mouseup: function (e) {
    var t = this.__pointerCapturing;
    this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
  }
};
function te(e, t) {
  var n = t.domHandlers;
  r["a"].pointerEventsSupported ? i["j"](U.pointer, function (r) {
    re(t, r, function (t) {
      n[r].call(e, t);
    });
  }) : (r["a"].touchEventsSupported && i["j"](U.touch, function (r) {
    re(t, r, function (i) {
      n[r].call(e, i), K(t);
    });
  }), i["j"](U.mouse, function (r) {
    re(t, r, function (i) {
      i = Object(h["c"])(i), t.touching || n[r].call(e, i);
    });
  }));
}
function ne(e, t) {
  function n(n) {
    function r(r) {
      r = Object(h["c"])(r), Q(e, r.target) || (r = X(e, r), t.domHandlers[n].call(e, r));
    }
    re(t, n, r, {
      capture: !0
    });
  }
  r["a"].pointerEventsSupported ? i["j"](z.pointer, n) : r["a"].touchEventsSupported || i["j"](z.mouse, n);
}
function re(e, t, n, r) {
  e.mounted[t] = n, e.listenerOpts[t] = r, Object(h["a"])(e.domTarget, t, n, r);
}
function ie(e) {
  var t = e.mounted;
  for (var n in t) t.hasOwnProperty(n) && Object(h["e"])(e.domTarget, n, t[n], e.listenerOpts[n]);
  e.mounted = {};
}
var oe = function () {
    function e(e, t) {
      this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = e, this.domHandlers = t;
    }
    return e;
  }(),
  ae = function (e) {
    function t(t, n) {
      var r = e.call(this) || this;
      return r.__pointerCapturing = !1, r.dom = t, r.painterRoot = n, r._localHandlerScope = new oe(t, J), H && (r._globalHandlerScope = new oe(document, ee)), te(r, r._localHandlerScope), r;
    }
    return Object(o["a"])(t, e), t.prototype.dispose = function () {
      ie(this._localHandlerScope), H && ie(this._globalHandlerScope);
    }, t.prototype.setCursor = function (e) {
      this.dom.style && (this.dom.style.cursor = e || "default");
    }, t.prototype.__togglePointerCapture = function (e) {
      if (this.__mayPointerCapture = null, H && +this.__pointerCapturing ^ +e) {
        this.__pointerCapturing = e;
        var t = this._globalHandlerScope;
        e ? ne(this, t) : ie(t);
      }
    }, t;
  }(u["a"]),
  se = ae,
  le = require("./51653970.js"),
  ce = require("./4c505441.js"),
  ue = require("./4c63584c.js");
defineExport(legacyExports, "a", function () {
  return ge;
}), defineExport(legacyExports, "b", function () {
  return ve;
});
var he = {},
  fe = {};
function de(e) {
  delete fe[e];
}
function pe(e) {
  if (!e) return !1;
  if ("string" === typeof e) return Object(le["c"])(e, 1) < ce["b"];
  if (e.colorStops) {
    for (var t = e.colorStops, n = 0, r = t.length, i = 0; i < r; i++) n += Object(le["c"])(t[i].color, 1);
    return n /= r, n < ce["b"];
  }
  return !1;
}
var me = function () {
  function e(e, t, n) {
    var o = this;
    this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !0, this._darkMode = !1, n = n || {}, this.dom = t, this.id = e;
    var a = new D(),
      s = n.renderer || "canvas";
    he[s] || (s = i["B"](he)[0]), n.useDirtyRect = null != n.useDirtyRect && n.useDirtyRect;
    var l = new he[s](t, a, n, e),
      c = n.ssr || l.ssrOnly;
    this.storage = a, this.painter = l;
    var u,
      h = r["a"].node || r["a"].worker || c ? null : new se(l.getViewportRoot(), l.root),
      f = n.useCoarsePointer,
      d = null == f || "auto" === f ? r["a"].touchEventsSupported : !!f,
      p = 44;
    d && (u = i["K"](n.pointerSize, p)), this.handler = new T(a, l, h, l.root, u), this.animation = new V({
      stage: {
        update: c ? null : function () {
          return o._flush(!0);
        }
      }
    }), c || this.animation.start();
  }
  return e.prototype.add = function (e) {
    e && (this.storage.addRoot(e), e.addSelfToZr(this), this.refresh());
  }, e.prototype.remove = function (e) {
    e && (this.storage.delRoot(e), e.removeSelfFromZr(this), this.refresh());
  }, e.prototype.configLayer = function (e, t) {
    this.painter.configLayer && this.painter.configLayer(e, t), this.refresh();
  }, e.prototype.setBackgroundColor = function (e) {
    this.painter.setBackgroundColor && this.painter.setBackgroundColor(e), this.refresh(), this._backgroundColor = e, this._darkMode = pe(e);
  }, e.prototype.getBackgroundColor = function () {
    return this._backgroundColor;
  }, e.prototype.setDarkMode = function (e) {
    this._darkMode = e;
  }, e.prototype.isDarkMode = function () {
    return this._darkMode;
  }, e.prototype.refreshImmediately = function (e) {
    e || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1;
  }, e.prototype.refresh = function () {
    this._needsRefresh = !0, this.animation.start();
  }, e.prototype.flush = function () {
    this._flush(!1);
  }, e.prototype._flush = function (e) {
    var t,
      n = F();
    this._needsRefresh && (t = !0, this.refreshImmediately(e)), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately());
    var r = F();
    t ? (this._stillFrameAccum = 0, this.trigger("rendered", {
      elapsedTime: r - n
    })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
  }, e.prototype.setSleepAfterStill = function (e) {
    this._sleepAfterStill = e;
  }, e.prototype.wakeUp = function () {
    this.animation.start(), this._stillFrameAccum = 0;
  }, e.prototype.refreshHover = function () {
    this._needsRefreshHover = !0;
  }, e.prototype.refreshHoverImmediately = function () {
    this._needsRefreshHover = !1, this.painter.refreshHover && "canvas" === this.painter.getType() && this.painter.refreshHover();
  }, e.prototype.resize = function (e) {
    e = e || {}, this.painter.resize(e.width, e.height), this.handler.resize();
  }, e.prototype.clearAnimation = function () {
    this.animation.clear();
  }, e.prototype.getWidth = function () {
    return this.painter.getWidth();
  }, e.prototype.getHeight = function () {
    return this.painter.getHeight();
  }, e.prototype.setCursorStyle = function (e) {
    this.handler.setCursorStyle(e);
  }, e.prototype.findHover = function (e, t) {
    return this.handler.findHover(e, t);
  }, e.prototype.on = function (e, t, n) {
    return this.handler.on(e, t, n), this;
  }, e.prototype.off = function (e, t) {
    this.handler.off(e, t);
  }, e.prototype.trigger = function (e, t) {
    this.handler.trigger(e, t);
  }, e.prototype.clear = function () {
    for (var e = this.storage.getRoots(), t = 0; t < e.length; t++) e[t] instanceof ue["a"] && e[t].removeSelfFromZr(this);
    this.storage.delAllRoots(), this.painter.clear();
  }, e.prototype.dispose = function () {
    this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, de(this.id);
  }, e;
}();
function ge(e, t) {
  var n = new me(i["n"](), e, t);
  return fe[n.id] = n, n;
}
function ve(e, t) {
  he[e] = t;
}
