let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), function (e) {
  var n = function () {
      if ("undefined" !== typeof Map) return Map;
      function e(e, t) {
        var n = -1;
        return e.some(function (e, r) {
          return e[0] === t && (n = r, !0);
        }), n;
      }
      return function () {
        function t() {
          this.__entries__ = [];
        }
        return Object.defineProperty(t.prototype, "size", {
          get: function () {
            return this.__entries__.length;
          },
          enumerable: !0,
          configurable: !0
        }), t.prototype.get = function (t) {
          var n = e(this.__entries__, t),
            r = this.__entries__[n];
          return r && r[1];
        }, t.prototype.set = function (t, n) {
          var r = e(this.__entries__, t);
          ~r ? this.__entries__[r][1] = n : this.__entries__.push([t, n]);
        }, t.prototype.delete = function (t) {
          var n = this.__entries__,
            r = e(n, t);
          ~r && n.splice(r, 1);
        }, t.prototype.has = function (t) {
          return !!~e(this.__entries__, t);
        }, t.prototype.clear = function () {
          this.__entries__.splice(0);
        }, t.prototype.forEach = function (e, t) {
          void 0 === t && (t = null);
          for (var n = 0, r = this.__entries__; n < r.length; n++) {
            var i = r[n];
            e.call(t, i[1], i[0]);
          }
        }, t;
      }();
    }(),
    r = "undefined" !== typeof window && "undefined" !== typeof document && window.document === document,
    i = function () {
      return "undefined" !== typeof e && e.Math === Math ? e : "undefined" !== typeof self && self.Math === Math ? self : "undefined" !== typeof window && window.Math === Math ? window : Function("return this")();
    }(),
    o = function () {
      return "function" === typeof requestAnimationFrame ? requestAnimationFrame.bind(i) : function (e) {
        return setTimeout(function () {
          return e(Date.now());
        }, 1e3 / 60);
      };
    }(),
    a = 2;
  function s(e, t) {
    var n = !1,
      r = !1,
      i = 0;
    function s() {
      n && (n = !1, e()), r && c();
    }
    function l() {
      o(s);
    }
    function c() {
      var e = Date.now();
      if (n) {
        if (e - i < a) return;
        r = !0;
      } else n = !0, r = !1, setTimeout(l, t);
      i = e;
    }
    return c;
  }
  var l = 20,
    c = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
    u = "undefined" !== typeof MutationObserver,
    h = function () {
      function e() {
        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = s(this.refresh.bind(this), l);
      }
      return e.prototype.addObserver = function (e) {
        ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_();
      }, e.prototype.removeObserver = function (e) {
        var t = this.observers_,
          n = t.indexOf(e);
        ~n && t.splice(n, 1), !t.length && this.connected_ && this.disconnect_();
      }, e.prototype.refresh = function () {
        var e = this.updateObservers_();
        e && this.refresh();
      }, e.prototype.updateObservers_ = function () {
        var e = this.observers_.filter(function (e) {
          return e.gatherActive(), e.hasActive();
        });
        return e.forEach(function (e) {
          return e.broadcastActive();
        }), e.length > 0;
      }, e.prototype.connect_ = function () {
        r && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), u ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
          attributes: !0,
          childList: !0,
          characterData: !0,
          subtree: !0
        })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
      }, e.prototype.disconnect_ = function () {
        r && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
      }, e.prototype.onTransitionEnd_ = function (e) {
        var t = e.propertyName,
          n = void 0 === t ? "" : t,
          r = c.some(function (e) {
            return !!~n.indexOf(e);
          });
        r && this.refresh();
      }, e.getInstance = function () {
        return this.instance_ || (this.instance_ = new e()), this.instance_;
      }, e.instance_ = null, e;
    }(),
    f = function (e, t) {
      for (var n = 0, r = Object.keys(t); n < r.length; n++) {
        var i = r[n];
        Object.defineProperty(e, i, {
          value: t[i],
          enumerable: !1,
          writable: !1,
          configurable: !0
        });
      }
      return e;
    },
    d = function (e) {
      var t = e && e.ownerDocument && e.ownerDocument.defaultView;
      return t || i;
    },
    p = S(0, 0, 0, 0);
  function m(e) {
    return parseFloat(e) || 0;
  }
  function g(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return t.reduce(function (t, n) {
      var r = e["border-" + n + "-width"];
      return t + m(r);
    }, 0);
  }
  function v(e) {
    for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
      var o = i[r],
        a = e["padding-" + o];
      n[o] = m(a);
    }
    return n;
  }
  function y(e) {
    var t = e.getBBox();
    return S(0, 0, t.width, t.height);
  }
  function b(e) {
    var t = e.clientWidth,
      n = e.clientHeight;
    if (!t && !n) return p;
    var r = d(e).getComputedStyle(e),
      i = v(r),
      o = i.left + i.right,
      a = i.top + i.bottom,
      s = m(r.width),
      l = m(r.height);
    if ("border-box" === r.boxSizing && (Math.round(s + o) !== t && (s -= g(r, "left", "right") + o), Math.round(l + a) !== n && (l -= g(r, "top", "bottom") + a)), !x(e)) {
      var c = Math.round(s + o) - t,
        u = Math.round(l + a) - n;
      1 !== Math.abs(c) && (s -= c), 1 !== Math.abs(u) && (l -= u);
    }
    return S(i.left, i.top, s, l);
  }
  var w = function () {
    return "undefined" !== typeof SVGGraphicsElement ? function (e) {
      return e instanceof d(e).SVGGraphicsElement;
    } : function (e) {
      return e instanceof d(e).SVGElement && "function" === typeof e.getBBox;
    };
  }();
  function x(e) {
    return e === d(e).document.documentElement;
  }
  function _(e) {
    return r ? w(e) ? y(e) : b(e) : p;
  }
  function E(e) {
    var t = e.x,
      n = e.y,
      r = e.width,
      i = e.height,
      o = "undefined" !== typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
      a = Object.create(o.prototype);
    return f(a, {
      x: t,
      y: n,
      width: r,
      height: i,
      top: n,
      right: t + r,
      bottom: i + n,
      left: t
    }), a;
  }
  function S(e, t, n, r) {
    return {
      x: e,
      y: t,
      width: n,
      height: r
    };
  }
  var k = function () {
      function e(e) {
        this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = S(0, 0, 0, 0), this.target = e;
      }
      return e.prototype.isActive = function () {
        var e = _(this.target);
        return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
      }, e.prototype.broadcastRect = function () {
        var e = this.contentRect_;
        return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
      }, e;
    }(),
    C = function () {
      function e(e, t) {
        var n = E(t);
        f(this, {
          target: e,
          contentRect: n
        });
      }
      return e;
    }(),
    O = function () {
      function e(e, t, r) {
        if (this.activeObservations_ = [], this.observations_ = new n(), "function" !== typeof e) throw new TypeError("The callback provided as parameter 1 is not a function.");
        this.callback_ = e, this.controller_ = t, this.callbackCtx_ = r;
      }
      return e.prototype.observe = function (e) {
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        if ("undefined" !== typeof Element && Element instanceof Object) {
          if (!(e instanceof d(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
          var t = this.observations_;
          t.has(e) || (t.set(e, new k(e)), this.controller_.addObserver(this), this.controller_.refresh());
        }
      }, e.prototype.unobserve = function (e) {
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        if ("undefined" !== typeof Element && Element instanceof Object) {
          if (!(e instanceof d(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
          var t = this.observations_;
          t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this));
        }
      }, e.prototype.disconnect = function () {
        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
      }, e.prototype.gatherActive = function () {
        var e = this;
        this.clearActive(), this.observations_.forEach(function (t) {
          t.isActive() && e.activeObservations_.push(t);
        });
      }, e.prototype.broadcastActive = function () {
        if (this.hasActive()) {
          var e = this.callbackCtx_,
            t = this.activeObservations_.map(function (e) {
              return new C(e.target, e.broadcastRect());
            });
          this.callback_.call(e, t, e), this.clearActive();
        }
      }, e.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
      }, e.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
      }, e;
    }(),
    T = "undefined" !== typeof WeakMap ? new WeakMap() : new n(),
    L = function () {
      function e(t) {
        if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        var n = h.getInstance(),
          r = new O(t, n, this);
        T.set(this, r);
      }
      return e;
    }();
  ["observe", "unobserve", "disconnect"].forEach(function (e) {
    L.prototype[e] = function () {
      var t;
      return (t = T.get(this))[e].apply(t, arguments);
    };
  });
  var A = function () {
    return "undefined" !== typeof i.ResizeObserver ? i.ResizeObserver : L;
  }();
  legacyExports["default"] = A;
}.call(this, require("./794c706a.js"));
