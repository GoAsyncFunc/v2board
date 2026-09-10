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
            var o = r[n];
            e.call(t, o[1], o[0]);
          }
        }, t;
      }();
    }(),
    r = "undefined" !== typeof window && "undefined" !== typeof document && window.document === document,
    o = function () {
      return "undefined" !== typeof e && e.Math === Math ? e : "undefined" !== typeof self && self.Math === Math ? self : "undefined" !== typeof window && window.Math === Math ? window : Function("return this")();
    }(),
    i = function () {
      return "function" === typeof requestAnimationFrame ? requestAnimationFrame.bind(o) : function (e) {
        return setTimeout(function () {
          return e(Date.now());
        }, 1e3 / 60);
      };
    }(),
    a = 2;
  function s(e, t) {
    var n = !1,
      r = !1,
      o = 0;
    function s() {
      n && (n = !1, e()), r && u();
    }
    function c() {
      i(s);
    }
    function u() {
      var e = Date.now();
      if (n) {
        if (e - o < a) return;
        r = !0;
      } else n = !0, r = !1, setTimeout(c, t);
      o = e;
    }
    return u;
  }
  var c = 20,
    u = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
    l = "undefined" !== typeof MutationObserver,
    f = function () {
      function e() {
        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = s(this.refresh.bind(this), c);
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
        r && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), l ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
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
          r = u.some(function (e) {
            return !!~n.indexOf(e);
          });
        r && this.refresh();
      }, e.getInstance = function () {
        return this.instance_ || (this.instance_ = new e()), this.instance_;
      }, e.instance_ = null, e;
    }(),
    p = function (e, t) {
      for (var n = 0, r = Object.keys(t); n < r.length; n++) {
        var o = r[n];
        Object.defineProperty(e, o, {
          value: t[o],
          enumerable: !1,
          writable: !1,
          configurable: !0
        });
      }
      return e;
    },
    d = function (e) {
      var t = e && e.ownerDocument && e.ownerDocument.defaultView;
      return t || o;
    },
    h = _(0, 0, 0, 0);
  function m(e) {
    return parseFloat(e) || 0;
  }
  function v(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return t.reduce(function (t, n) {
      var r = e["border-" + n + "-width"];
      return t + m(r);
    }, 0);
  }
  function y(e) {
    for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, o = t; r < o.length; r++) {
      var i = o[r],
        a = e["padding-" + i];
      n[i] = m(a);
    }
    return n;
  }
  function g(e) {
    var t = e.getBBox();
    return _(0, 0, t.width, t.height);
  }
  function b(e) {
    var t = e.clientWidth,
      n = e.clientHeight;
    if (!t && !n) return h;
    var r = d(e).getComputedStyle(e),
      o = y(r),
      i = o.left + o.right,
      a = o.top + o.bottom,
      s = m(r.width),
      c = m(r.height);
    if ("border-box" === r.boxSizing && (Math.round(s + i) !== t && (s -= v(r, "left", "right") + i), Math.round(c + a) !== n && (c -= v(r, "top", "bottom") + a)), !x(e)) {
      var u = Math.round(s + i) - t,
        l = Math.round(c + a) - n;
      1 !== Math.abs(u) && (s -= u), 1 !== Math.abs(l) && (c -= l);
    }
    return _(o.left, o.top, s, c);
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
  function O(e) {
    return r ? w(e) ? g(e) : b(e) : h;
  }
  function E(e) {
    var t = e.x,
      n = e.y,
      r = e.width,
      o = e.height,
      i = "undefined" !== typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
      a = Object.create(i.prototype);
    return p(a, {
      x: t,
      y: n,
      width: r,
      height: o,
      top: n,
      right: t + r,
      bottom: o + n,
      left: t
    }), a;
  }
  function _(e, t, n, r) {
    return {
      x: e,
      y: t,
      width: n,
      height: r
    };
  }
  var k = function () {
      function e(e) {
        this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = _(0, 0, 0, 0), this.target = e;
      }
      return e.prototype.isActive = function () {
        var e = O(this.target);
        return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
      }, e.prototype.broadcastRect = function () {
        var e = this.contentRect_;
        return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
      }, e;
    }(),
    S = function () {
      function e(e, t) {
        var n = E(t);
        p(this, {
          target: e,
          contentRect: n
        });
      }
      return e;
    }(),
    C = function () {
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
              return new S(e.target, e.broadcastRect());
            });
          this.callback_.call(e, t, e), this.clearActive();
        }
      }, e.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
      }, e.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
      }, e;
    }(),
    j = "undefined" !== typeof WeakMap ? new WeakMap() : new n(),
    P = function () {
      function e(t) {
        if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        var n = f.getInstance(),
          r = new C(t, n, this);
        j.set(this, r);
      }
      return e;
    }();
  ["observe", "unobserve", "disconnect"].forEach(function (e) {
    P.prototype[e] = function () {
      var t;
      return (t = j.get(this))[e].apply(t, arguments);
    };
  });
  var T = function () {
    return "undefined" !== typeof o.ResizeObserver ? o.ResizeObserver : P;
  }();
  legacyExports["default"] = T;
}.call(this, require("./794c706a.js"));
