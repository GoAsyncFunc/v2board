const sessionEffects = require("./sessionEffects.js");
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
require("../vendor/modules/6d69595a.js");
var r = require("../vendor/modules/antdMessage.js"),
  o = require("../vendor/modules/70307045.js"),
  i = interopDefault(o),
  a = require("../services/request.js"),
  s = require("../vendor/routerHistory.js"),
  c = interopDefault(s),
  u = require("../vendor/siteHelpers.js"),
  l = require("../vendor/modules/77642f52.js"),
  f = interopDefault(l);
function p() {
  p = function () {
    return e;
  };
  var e = {},
    t = Object.prototype,
    n = t.hasOwnProperty,
    r = "function" == typeof Symbol ? Symbol : {},
    o = r.iterator || "@@iterator",
    i = r.asyncIterator || "@@asyncIterator",
    a = r.toStringTag || "@@toStringTag";
  function s(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), e[t];
  }
  try {
    s({}, "");
  } catch (e) {
    s = function (e, t, n) {
      return e[t] = n;
    };
  }
  function c(e, t, n, r) {
    var o = t && t.prototype instanceof f ? t : f,
      i = Object.create(o.prototype),
      a = new _(r || []);
    return i._invoke = function (e, t, n) {
      var r = "suspendedStart";
      return function (o, i) {
        if ("executing" === r) throw new Error("Generator is already running");
        if ("completed" === r) {
          if ("throw" === o) throw i;
          return S();
        }
        for (n.method = o, n.arg = i;;) {
          var a = n.delegate;
          if (a) {
            var s = x(a, n);
            if (s) {
              if (s === l) continue;
              return s;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if ("suspendedStart" === r) throw r = "completed", n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          r = "executing";
          var c = u(e, t, n);
          if ("normal" === c.type) {
            if (r = n.done ? "completed" : "suspendedYield", c.arg === l) continue;
            return {
              value: c.arg,
              done: n.done
            };
          }
          "throw" === c.type && (r = "completed", n.method = "throw", n.arg = c.arg);
        }
      };
    }(e, n, a), i;
  }
  function u(e, t, n) {
    try {
      return {
        type: "normal",
        arg: e.call(t, n)
      };
    } catch (e) {
      return {
        type: "throw",
        arg: e
      };
    }
  }
  e.wrap = c;
  var l = {};
  function f() {}
  function d() {}
  function h() {}
  var m = {};
  s(m, o, function () {
    return this;
  });
  var v = Object.getPrototypeOf,
    y = v && v(v(k([])));
  y && y !== t && n.call(y, o) && (m = y);
  var g = h.prototype = f.prototype = Object.create(m);
  function b(e) {
    ["next", "throw", "return"].forEach(function (t) {
      s(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function w(e, t) {
    function r(o, i, a, s) {
      var c = u(e[o], e, i);
      if ("throw" !== c.type) {
        var l = c.arg,
          f = l.value;
        return f && "object" == typeof f && n.call(f, "__await") ? t.resolve(f.__await).then(function (e) {
          r("next", e, a, s);
        }, function (e) {
          r("throw", e, a, s);
        }) : t.resolve(f).then(function (e) {
          l.value = e, a(l);
        }, function (e) {
          return r("throw", e, a, s);
        });
      }
      s(c.arg);
    }
    var o;
    this._invoke = function (e, n) {
      function i() {
        return new t(function (t, o) {
          r(e, n, t, o);
        });
      }
      return o = o ? o.then(i, i) : i();
    };
  }
  function x(e, t) {
    var n = e.iterator[t.method];
    if (void 0 === n) {
      if (t.delegate = null, "throw" === t.method) {
        if (e.iterator.return && (t.method = "return", t.arg = void 0, x(e, t), "throw" === t.method)) return l;
        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return l;
    }
    var r = u(n, e.iterator, t.arg);
    if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, l;
    var o = r.arg;
    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, l) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, l);
  }
  function O(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function E(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function _(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(O, this), this.reset(!0);
  }
  function k(e) {
    if (e) {
      var t = e[o];
      if (t) return t.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var r = -1,
          i = function t() {
            for (; ++r < e.length;) if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
            return t.value = void 0, t.done = !0, t;
          };
        return i.next = i;
      }
    }
    return {
      next: S
    };
  }
  function S() {
    return {
      value: void 0,
      done: !0
    };
  }
  return d.prototype = h, s(g, "constructor", h), s(h, "constructor", d), d.displayName = s(h, a, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
    var t = "function" == typeof e && e.constructor;
    return !!t && (t === d || "GeneratorFunction" === (t.displayName || t.name));
  }, e.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, h) : (e.__proto__ = h, s(e, a, "GeneratorFunction")), e.prototype = Object.create(g), e;
  }, e.awrap = function (e) {
    return {
      __await: e
    };
  }, b(w.prototype), s(w.prototype, i, function () {
    return this;
  }), e.AsyncIterator = w, e.async = function (t, n, r, o, i) {
    void 0 === i && (i = Promise);
    var a = new w(c(t, n, r, o), i);
    return e.isGeneratorFunction(n) ? a : a.next().then(function (e) {
      return e.done ? e.value : a.next();
    });
  }, b(g), s(g, a, "Generator"), s(g, o, function () {
    return this;
  }), s(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (e) {
    var t = [];
    for (var n in e) t.push(n);
    return t.reverse(), function n() {
      for (; t.length;) {
        var r = t.pop();
        if (r in e) return n.value = r, n.done = !1, n;
      }
      return n.done = !0, n;
    };
  }, e.values = k, _.prototype = {
    constructor: _,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(E), !e) for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
    },
    stop: function () {
      this.done = !0;
      var e = this.tryEntries[0].completion;
      if ("throw" === e.type) throw e.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var t = this;
      function r(n, r) {
        return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return r("end");
        if (i.tryLoc <= this.prev) {
          var s = n.call(i, "catchLoc"),
            c = n.call(i, "finallyLoc");
          if (s && c) {
            if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return r(i.finallyLoc);
          } else if (s) {
            if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
          } else {
            if (!c) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return r(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, l) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), l;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), E(n), l;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var o = r.arg;
            E(n);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, t, n) {
      return this.delegate = {
        iterator: k(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), l;
    }
  }, e;
}
legacyExports["default"] = {
  name: "user",
  state: {
    subscribe: {},
    stat: [],
    userInfo: {},
    getUserInfoLoading: !1,
    changePasswordLoading: !1,
    resetSecurityLoading: !1,
    newPeriodLoading: !1,
    unbindTelegramLoading: !1,
    events: []
  },
  reducers: {
    setState(e, t) {
      var n = t.payload;
      return i()({}, e, n);
    }
  },
  effects: {
    getSubscribe(e, t) {
      return p().mark(function e() {
        var n, r, o;
        return p().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return n = t.put, e.next = 3, Object(a["a"])("/user/getSubscribe");
            case 3:
              if (r = e.sent, 200 === r.code) {
                e.next = 6;
                break;
              }
              return e.abrupt("return");
            case 6:
              return e.next = 8, n({
                type: "setState",
                payload: {
                  subscribe: r.data
                }
              });
            case 8:
              window.$crisp && window.$crisp.push(["set", "session:data", [[["Plan", (null === (o = r.data.plan) || void 0 === o ? void 0 : o.name) || "-"], ["ExpireTime", f()(1e3 * r.data.expired_at).format("YYYY-MM-DD")], ["UsedTraffic", Object(u["b"])(r.data.u + r.data.d)], ["AllTraffic", Object(u["b"])(r.data.transfer_enable)]]]]);
            case 9:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    getStat(e, t) {
      return p().mark(function e() {
        var n, r;
        return p().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return n = t.put, e.next = 3, Object(a["a"])("/user/getStat");
            case 3:
              if (r = e.sent, 200 === r.code) {
                e.next = 6;
                break;
              }
              return e.abrupt("return");
            case 6:
              return e.next = 8, n({
                type: "setState",
                payload: {
                  stat: r.data
                }
              });
            case 8:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    getUserInfo: sessionEffects.getUserInfo,
    update(e, t) {
      return p().mark(function n() {
        var r, o, i, s;
        return p().wrap(function (n) {
          while (1) switch (n.prev = n.next) {
            case 0:
              return r = e.key, o = e.value, i = t.put, n.next = 4, i({
                type: "setState",
                payload: {
                  [r + "_loading"]: !0
                }
              });
            case 4:
              return n.next = 6, Object(a["b"])("/user/update", {
                [r]: o
              });
            case 6:
              return s = n.sent, n.next = 9, i({
                type: "setState",
                payload: {
                  [r + "_loading"]: !1
                }
              });
            case 9:
              if (200 === s.code) {
                n.next = 11;
                break;
              }
              return n.abrupt("return");
            case 11:
              return n.next = 13, i({
                type: "getUserInfo"
              });
            case 13:
            case "end":
              return n.stop();
          }
        }, n);
      })();
    },
    changePassword(e, t) {
      return p().mark(function n() {
        var o, i, s, u;
        return p().wrap(function (n) {
          while (1) switch (n.prev = n.next) {
            case 0:
              return o = e.oldPassword, i = e.newPassword, s = t.put, n.next = 4, s({
                type: "setState",
                payload: {
                  changePasswordLoading: !0
                }
              });
            case 4:
              return n.next = 6, Object(a["b"])("/user/changePassword", {
                old_password: o,
                new_password: i
              });
            case 6:
              return u = n.sent, n.next = 9, s({
                type: "setState",
                payload: {
                  changePasswordLoading: !1
                }
              });
            case 9:
              if (200 === u.code) {
                n.next = 11;
                break;
              }
              return n.abrupt("return");
            case 11:
              r["a"].success("修改成功，请重新登陆"), c.a.push("/login");
            case 13:
            case "end":
              return n.stop();
          }
        }, n);
      })();
    },
    newPeriod(e, t) {
      return p().mark(function e() {
        var n, o;
        return p().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return n = t.put, e.next = 3, n({
                type: "setState",
                payload: {
                  newPeriodLoading: !0
                }
              });
            case 3:
              return e.next = 5, Object(a["b"])("/user/newPeriod");
            case 5:
              return o = e.sent, e.next = 8, n({
                type: "setState",
                payload: {
                  newPeriodLoading: !1
                }
              });
            case 8:
              if (200 === o.code) {
                e.next = 9;
                break;
              }
              return e.abrupt("return");
            case 9:
              return e.next = 10, n({
                type: "user/getSubscribe"
              });
            case 10:
              r["a"].success("提前开启流量周期成功"), c.a.push("/dashboard");
            case 11:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    redeemgiftcard(e, t) {
      return p().mark(function n() {
        var o, s, u;
        return p().wrap(function (n) {
          while (1) switch (n.prev = n.next) {
            case 0:
              return o = e.giftcard, s = t.put, n.next = 4, s({
                type: "setState",
                payload: {
                  redeemgiftcardLoading: !0
                }
              });
            case 4:
              return n.next = 6, Object(a["b"])("/user/redeemgiftcard", {
                giftcard: o
              });
            case 6:
              return u = n.sent, n.next = 9, s({
                type: "setState",
                payload: {
                  redeemgiftcardLoading: !1
                }
              });
            case 9:
              if (200 === u.code) {
                n.next = 11;
                break;
              }
              return n.abrupt("return");
            case 11:
              return n.next = 13, s({
                type: "user/getUserInfo"
              });
            case 13:
              r["a"].success("兑换成功: " + (() => {
                switch (u.type) {
                  case 1:
                    return "账户余额 " + (u.value / 100).toFixed(2);
                  case 2:
                    return "订阅时长 " + u.value + " 天";
                  case 3:
                    return "套餐流量 " + u.value + " GB";
                  case 4:
                    return "流量已重置";
                  case 5:
                    return "订阅套餐 " + u.value + " 天";
                  default:
                    return "未知类型";
                }
              })());
            case "end":
              return n.stop();
          }
        }, n);
      })();
    },
    resetSecurity(e, t) {
      return p().mark(function e() {
        var n, o;
        return p().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return n = t.put, e.next = 3, n({
                type: "setState",
                payload: {
                  resetSecurityLoading: !0
                }
              });
            case 3:
              return e.next = 5, Object(a["a"])("/user/resetSecurity");
            case 5:
              return o = e.sent, e.next = 8, n({
                type: "setState",
                payload: {
                  resetSecurityLoading: !1
                }
              });
            case 8:
              if (200 === o.code) {
                e.next = 10;
                break;
              }
              return e.abrupt("return");
            case 10:
              r["a"].success("重置成功");
            case 11:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    checkLogin: sessionEffects.checkLogin,
    logout: sessionEffects.logout,
    transfer(e, t) {
      return p().mark(function n() {
        var r, o, i, s;
        return p().wrap(function (n) {
          while (1) switch (n.prev = n.next) {
            case 0:
              return r = e.transferAmount, o = e.callback, i = t.put, n.next = 4, Object(a["b"])("/user/transfer", {
                transfer_amount: 100 * r
              });
            case 4:
              if (s = n.sent, 200 === s.code) {
                n.next = 7;
                break;
              }
              return n.abrupt("return");
            case 7:
              return "function" === typeof o && o(), n.next = 10, i({
                type: "user/getUserInfo"
              });
            case 10:
            case "end":
              return n.stop();
          }
        }, n);
      })();
    }
  }
};
