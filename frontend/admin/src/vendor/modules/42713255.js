let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = {
    linear: function (e) {
      return e;
    },
    quadraticIn: function (e) {
      return e * e;
    },
    quadraticOut: function (e) {
      return e * (2 - e);
    },
    quadraticInOut: function (e) {
      return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1);
    },
    cubicIn: function (e) {
      return e * e * e;
    },
    cubicOut: function (e) {
      return --e * e * e + 1;
    },
    cubicInOut: function (e) {
      return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2);
    },
    quarticIn: function (e) {
      return e * e * e * e;
    },
    quarticOut: function (e) {
      return 1 - --e * e * e * e;
    },
    quarticInOut: function (e) {
      return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2);
    },
    quinticIn: function (e) {
      return e * e * e * e * e;
    },
    quinticOut: function (e) {
      return --e * e * e * e * e + 1;
    },
    quinticInOut: function (e) {
      return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2);
    },
    sinusoidalIn: function (e) {
      return 1 - Math.cos(e * Math.PI / 2);
    },
    sinusoidalOut: function (e) {
      return Math.sin(e * Math.PI / 2);
    },
    sinusoidalInOut: function (e) {
      return .5 * (1 - Math.cos(Math.PI * e));
    },
    exponentialIn: function (e) {
      return 0 === e ? 0 : Math.pow(1024, e - 1);
    },
    exponentialOut: function (e) {
      return 1 === e ? 1 : 1 - Math.pow(2, -10 * e);
    },
    exponentialInOut: function (e) {
      return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (2 - Math.pow(2, -10 * (e - 1)));
    },
    circularIn: function (e) {
      return 1 - Math.sqrt(1 - e * e);
    },
    circularOut: function (e) {
      return Math.sqrt(1 - --e * e);
    },
    circularInOut: function (e) {
      return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    },
    elasticIn: function (e) {
      var t,
        n = .1,
        r = .4;
      return 0 === e ? 0 : 1 === e ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), -n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r));
    },
    elasticOut: function (e) {
      var t,
        n = .1,
        r = .4;
      return 0 === e ? 0 : 1 === e ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / r) + 1);
    },
    elasticInOut: function (e) {
      var t,
        n = .1,
        r = .4;
      return 0 === e ? 0 : 1 === e ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), (e *= 2) < 1 ? n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r) * -.5 : n * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r) * .5 + 1);
    },
    backIn: function (e) {
      var t = 1.70158;
      return e * e * ((t + 1) * e - t);
    },
    backOut: function (e) {
      var t = 1.70158;
      return --e * e * ((t + 1) * e + t) + 1;
    },
    backInOut: function (e) {
      var t = 2.5949095;
      return (e *= 2) < 1 ? e * e * ((t + 1) * e - t) * .5 : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
    },
    bounceIn: function (e) {
      return 1 - r.bounceOut(1 - e);
    },
    bounceOut: function (e) {
      return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
    },
    bounceInOut: function (e) {
      return e < .5 ? .5 * r.bounceIn(2 * e) : .5 * r.bounceOut(2 * e - 1) + .5;
    }
  },
  i = r,
  o = require("./62597459.js"),
  a = require("./7332497a.js"),
  s = function () {
    function e(e) {
      this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = e.life || 1e3, this._delay = e.delay || 0, this.loop = e.loop || !1, this.onframe = e.onframe || o["G"], this.ondestroy = e.ondestroy || o["G"], this.onrestart = e.onrestart || o["G"], e.easing && this.setEasing(e.easing);
    }
    return e.prototype.step = function (e, t) {
      if (this._inited || (this._startTime = e + this._delay, this._inited = !0), !this._paused) {
        var n = this._life,
          r = e - this._startTime - this._pausedTime,
          i = r / n;
        i < 0 && (i = 0), i = Math.min(i, 1);
        var o = this.easingFunc,
          a = o ? o(i) : i;
        if (this.onframe(a), 1 === i) {
          if (!this.loop) return !0;
          var s = r % n;
          this._startTime = e - s, this._pausedTime = 0, this.onrestart();
        }
        return !1;
      }
      this._pausedTime += t;
    }, e.prototype.pause = function () {
      this._paused = !0;
    }, e.prototype.resume = function () {
      this._paused = !1;
    }, e.prototype.setEasing = function (e) {
      this.easing = e, this.easingFunc = Object(o["u"])(e) ? e : i[e] || Object(a["a"])(e);
    }, e;
  }(),
  l = s,
  c = require("./51653970.js"),
  u = require("./65696e52.js");
defineExport(legacyExports, "a", function () {
  return b;
});
var h = Array.prototype.slice;
function f(e, t, n) {
  return (t - e) * n + e;
}
function d(e, t, n, r) {
  for (var i = t.length, o = 0; o < i; o++) e[o] = f(t[o], n[o], r);
  return e;
}
function p(e, t, n, r) {
  for (var i = t.length, o = i && t[0].length, a = 0; a < i; a++) {
    e[a] || (e[a] = []);
    for (var s = 0; s < o; s++) e[a][s] = f(t[a][s], n[a][s], r);
  }
  return e;
}
function m(e, t, n, r) {
  for (var i = t.length, o = 0; o < i; o++) e[o] = t[o] + n[o] * r;
  return e;
}
function g(e, t, n, r) {
  for (var i = t.length, o = i && t[0].length, a = 0; a < i; a++) {
    e[a] || (e[a] = []);
    for (var s = 0; s < o; s++) e[a][s] = t[a][s] + n[a][s] * r;
  }
  return e;
}
function v(e, t) {
  for (var n = e.length, r = t.length, i = n > r ? t : e, o = Math.min(n, r), a = i[o - 1] || {
      color: [0, 0, 0, 0],
      offset: 0
    }, s = o; s < Math.max(n, r); s++) i.push({
    offset: a.offset,
    color: a.color.slice()
  });
}
function y(e, t, n) {
  var r = e,
    i = t;
  if (r.push && i.push) {
    var o = r.length,
      a = i.length;
    if (o !== a) {
      var s = o > a;
      if (s) r.length = a;else for (var l = o; l < a; l++) r.push(1 === n ? i[l] : h.call(i[l]));
    }
    var c = r[0] && r[0].length;
    for (l = 0; l < r.length; l++) if (1 === n) isNaN(r[l]) && (r[l] = i[l]);else for (var u = 0; u < c; u++) isNaN(r[l][u]) && (r[l][u] = i[l][u]);
  }
}
function b(e) {
  if (Object(o["s"])(e)) {
    var t = e.length;
    if (Object(o["s"])(e[0])) {
      for (var n = [], r = 0; r < t; r++) n.push(h.call(e[r]));
      return n;
    }
    return h.call(e);
  }
  return e;
}
function w(e) {
  return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = null == e[3] ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function x(e) {
  return Object(o["s"])(e && e[0]) ? 2 : 1;
}
var _ = 0,
  E = 1,
  S = 2,
  k = 3,
  C = 4,
  O = 5,
  T = 6;
function L(e) {
  return e === C || e === O;
}
function A(e) {
  return e === E || e === S;
}
var P = [0, 0, 0, 0],
  j = function () {
    function e(e) {
      this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = e;
    }
    return e.prototype.isFinished = function () {
      return this._finished;
    }, e.prototype.setFinished = function () {
      this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
    }, e.prototype.needsAnimate = function () {
      return this.keyframes.length >= 1;
    }, e.prototype.getAdditiveTrack = function () {
      return this._additiveTrack;
    }, e.prototype.addKeyframe = function (e, t, n) {
      this._needsSort = !0;
      var r = this.keyframes,
        s = r.length,
        l = !1,
        h = T,
        f = t;
      if (Object(o["s"])(t)) {
        var d = x(t);
        h = d, (1 === d && !Object(o["w"])(t[0]) || 2 === d && !Object(o["w"])(t[0][0])) && (l = !0);
      } else if (Object(o["w"])(t) && !Object(o["k"])(t)) h = _;else if (Object(o["y"])(t)) {
        if (isNaN(+t)) {
          var p = c["d"](t);
          p && (f = p, h = k);
        } else h = _;
      } else if (Object(o["v"])(t)) {
        var m = Object(o["l"])({}, f);
        m.colorStops = Object(o["D"])(t.colorStops, function (e) {
          return {
            offset: e.offset,
            color: c["d"](e.color)
          };
        }), Object(u["m"])(t) ? h = C : Object(u["o"])(t) && (h = O), f = m;
      }
      0 === s ? this.valType = h : h === this.valType && h !== T || (l = !0), this.discrete = this.discrete || l;
      var g = {
        time: e,
        value: f,
        rawValue: t,
        percent: 0
      };
      return n && (g.easing = n, g.easingFunc = Object(o["u"])(n) ? n : i[n] || Object(a["a"])(n)), r.push(g), g;
    }, e.prototype.prepare = function (e, t) {
      var n = this.keyframes;
      this._needsSort && n.sort(function (e, t) {
        return e.time - t.time;
      });
      for (var r = this.valType, i = n.length, o = n[i - 1], a = this.discrete, s = A(r), l = L(r), c = 0; c < i; c++) {
        var u = n[c],
          h = u.value,
          f = o.value;
        u.percent = u.time / e, a || (s && c !== i - 1 ? y(h, f, r) : l && v(h.colorStops, f.colorStops));
      }
      if (!a && r !== O && t && this.needsAnimate() && t.needsAnimate() && r === t.valType && !t._finished) {
        this._additiveTrack = t;
        var d = n[0].value;
        for (c = 0; c < i; c++) r === _ ? n[c].additiveValue = n[c].value - d : r === k ? n[c].additiveValue = m([], n[c].value, d, -1) : A(r) && (n[c].additiveValue = r === E ? m([], n[c].value, d, -1) : g([], n[c].value, d, -1));
      }
    }, e.prototype.step = function (e, t) {
      if (!this._finished) {
        this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
        var n,
          r,
          i,
          a = null != this._additiveTrack,
          s = a ? "additiveValue" : "value",
          l = this.valType,
          c = this.keyframes,
          u = c.length,
          h = this.propName,
          m = l === k,
          g = this._lastFr,
          v = Math.min;
        if (1 === u) r = i = c[0];else {
          if (t < 0) n = 0;else if (t < this._lastFrP) {
            var y = v(g + 1, u - 1);
            for (n = y; n >= 0; n--) if (c[n].percent <= t) break;
            n = v(n, u - 2);
          } else {
            for (n = g; n < u; n++) if (c[n].percent > t) break;
            n = v(n - 1, u - 2);
          }
          i = c[n + 1], r = c[n];
        }
        if (r && i) {
          this._lastFr = n, this._lastFrP = t;
          var b = i.percent - r.percent,
            x = 0 === b ? 1 : v((t - r.percent) / b, 1);
          i.easingFunc && (x = i.easingFunc(x));
          var _ = a ? this._additiveValue : m ? P : e[h];
          if (!A(l) && !m || _ || (_ = this._additiveValue = []), this.discrete) e[h] = x < 1 ? r.rawValue : i.rawValue;else if (A(l)) l === E ? d(_, r[s], i[s], x) : p(_, r[s], i[s], x);else if (L(l)) {
            var S = r[s],
              O = i[s],
              T = l === C;
            e[h] = {
              type: T ? "linear" : "radial",
              x: f(S.x, O.x, x),
              y: f(S.y, O.y, x),
              colorStops: Object(o["D"])(S.colorStops, function (e, t) {
                var n = O.colorStops[t];
                return {
                  offset: f(e.offset, n.offset, x),
                  color: w(d([], e.color, n.color, x))
                };
              }),
              global: O.global
            }, T ? (e[h].x2 = f(S.x2, O.x2, x), e[h].y2 = f(S.y2, O.y2, x)) : e[h].r = f(S.r, O.r, x);
          } else if (m) d(_, r[s], i[s], x), a || (e[h] = w(_));else {
            var j = f(r[s], i[s], x);
            a ? this._additiveValue = j : e[h] = j;
          }
          a && this._addToTarget(e);
        }
      }
    }, e.prototype._addToTarget = function (e) {
      var t = this.valType,
        n = this.propName,
        r = this._additiveValue;
      t === _ ? e[n] = e[n] + r : t === k ? (c["d"](e[n], P), m(P, P, r, 1), e[n] = w(P)) : t === E ? m(e[n], e[n], r, 1) : t === S && g(e[n], e[n], r, 1);
    }, e;
  }(),
  M = function () {
    function e(e, t, n, r) {
      this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = e, this._loop = t, t && r ? Object(o["C"])("Can' use additive animation on looped animation.") : (this._additiveAnimators = r, this._allowDiscrete = n);
    }
    return e.prototype.getMaxTime = function () {
      return this._maxTime;
    }, e.prototype.getDelay = function () {
      return this._delay;
    }, e.prototype.getLoop = function () {
      return this._loop;
    }, e.prototype.getTarget = function () {
      return this._target;
    }, e.prototype.changeTarget = function (e) {
      this._target = e;
    }, e.prototype.when = function (e, t, n) {
      return this.whenWithKeys(e, t, Object(o["B"])(t), n);
    }, e.prototype.whenWithKeys = function (e, t, n, r) {
      for (var i = this._tracks, o = 0; o < n.length; o++) {
        var a = n[o],
          s = i[a];
        if (!s) {
          s = i[a] = new j(a);
          var l = void 0,
            c = this._getAdditiveTrack(a);
          if (c) {
            var u = c.keyframes,
              h = u[u.length - 1];
            l = h && h.value, c.valType === k && l && (l = w(l));
          } else l = this._target[a];
          if (null == l) continue;
          e > 0 && s.addKeyframe(0, b(l), r), this._trackKeys.push(a);
        }
        s.addKeyframe(e, b(t[a]), r);
      }
      return this._maxTime = Math.max(this._maxTime, e), this;
    }, e.prototype.pause = function () {
      this._clip.pause(), this._paused = !0;
    }, e.prototype.resume = function () {
      this._clip.resume(), this._paused = !1;
    }, e.prototype.isPaused = function () {
      return !!this._paused;
    }, e.prototype.duration = function (e) {
      return this._maxTime = e, this._force = !0, this;
    }, e.prototype._doneCallback = function () {
      this._setTracksFinished(), this._clip = null;
      var e = this._doneCbs;
      if (e) for (var t = e.length, n = 0; n < t; n++) e[n].call(this);
    }, e.prototype._abortedCallback = function () {
      this._setTracksFinished();
      var e = this.animation,
        t = this._abortedCbs;
      if (e && e.removeClip(this._clip), this._clip = null, t) for (var n = 0; n < t.length; n++) t[n].call(this);
    }, e.prototype._setTracksFinished = function () {
      for (var e = this._tracks, t = this._trackKeys, n = 0; n < t.length; n++) e[t[n]].setFinished();
    }, e.prototype._getAdditiveTrack = function (e) {
      var t,
        n = this._additiveAnimators;
      if (n) for (var r = 0; r < n.length; r++) {
        var i = n[r].getTrack(e);
        i && (t = i);
      }
      return t;
    }, e.prototype.start = function (e) {
      if (!(this._started > 0)) {
        this._started = 1;
        for (var t = this, n = [], r = this._maxTime || 0, i = 0; i < this._trackKeys.length; i++) {
          var o = this._trackKeys[i],
            a = this._tracks[o],
            s = this._getAdditiveTrack(o),
            c = a.keyframes,
            u = c.length;
          if (a.prepare(r, s), a.needsAnimate()) if (!this._allowDiscrete && a.discrete) {
            var h = c[u - 1];
            h && (t._target[a.propName] = h.rawValue), a.setFinished();
          } else n.push(a);
        }
        if (n.length || this._force) {
          var f = new l({
            life: r,
            loop: this._loop,
            delay: this._delay || 0,
            onframe: function (e) {
              t._started = 2;
              var r = t._additiveAnimators;
              if (r) {
                for (var i = !1, o = 0; o < r.length; o++) if (r[o]._clip) {
                  i = !0;
                  break;
                }
                i || (t._additiveAnimators = null);
              }
              for (o = 0; o < n.length; o++) n[o].step(t._target, e);
              var a = t._onframeCbs;
              if (a) for (o = 0; o < a.length; o++) a[o](t._target, e);
            },
            ondestroy: function () {
              t._doneCallback();
            }
          });
          this._clip = f, this.animation && this.animation.addClip(f), e && f.setEasing(e);
        } else this._doneCallback();
        return this;
      }
    }, e.prototype.stop = function (e) {
      if (this._clip) {
        var t = this._clip;
        e && t.onframe(1), this._abortedCallback();
      }
    }, e.prototype.delay = function (e) {
      return this._delay = e, this;
    }, e.prototype.during = function (e) {
      return e && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(e)), this;
    }, e.prototype.done = function (e) {
      return e && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(e)), this;
    }, e.prototype.aborted = function (e) {
      return e && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(e)), this;
    }, e.prototype.getClip = function () {
      return this._clip;
    }, e.prototype.getTrack = function (e) {
      return this._tracks[e];
    }, e.prototype.getTracks = function () {
      var e = this;
      return Object(o["D"])(this._trackKeys, function (t) {
        return e._tracks[t];
      });
    }, e.prototype.stopTracks = function (e, t) {
      if (!e.length || !this._clip) return !0;
      for (var n = this._tracks, r = this._trackKeys, i = 0; i < e.length; i++) {
        var o = n[e[i]];
        o && !o.isFinished() && (t ? o.step(this._target, 1) : 1 === this._started && o.step(this._target, 0), o.setFinished());
      }
      var a = !0;
      for (i = 0; i < r.length; i++) if (!n[r[i]].isFinished()) {
        a = !1;
        break;
      }
      return a && this._abortedCallback(), a;
    }, e.prototype.saveTo = function (e, t, n) {
      if (e) {
        t = t || this._trackKeys;
        for (var r = 0; r < t.length; r++) {
          var i = t[r],
            o = this._tracks[i];
          if (o && !o.isFinished()) {
            var a = o.keyframes,
              s = a[n ? 0 : a.length - 1];
            s && (e[i] = b(s.rawValue));
          }
        }
      }
    }, e.prototype.__changeFinalValue = function (e, t) {
      t = t || Object(o["B"])(e);
      for (var n = 0; n < t.length; n++) {
        var r = t[n],
          i = this._tracks[r];
        if (i) {
          var a = i.keyframes;
          if (a.length > 1) {
            var s = a.pop();
            i.addKeyframe(s.time, e[r]), i.prepare(this._maxTime, i.getAdditiveTrack());
          }
        }
      }
    }, e;
  }();
legacyExports["b"] = M;
