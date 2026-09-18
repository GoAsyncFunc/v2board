let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
require("../vendor/modules/32717463.js");
var r = require("../vendor/Modal.js"),
  i = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/antdMessage.js")),
  o = require("../vendor/modules/70307045.js"),
  a = interopDefault(o),
  s = require("../vendor/modules/71317449.js"),
  l = interopDefault(s),
  c = require("../services/request.js");
function u() {
  u = function () {
    return e;
  };
  var e = {},
    t = Object.prototype,
    n = t.hasOwnProperty,
    r = Object.defineProperty || function (e, t, n) {
      e[t] = n.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    o = i.iterator || "@@iterator",
    a = i.asyncIterator || "@@asyncIterator",
    s = i.toStringTag || "@@toStringTag";
  function l(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), e[t];
  }
  try {
    l({}, "");
  } catch (e) {
    l = function (e, t, n) {
      return e[t] = n;
    };
  }
  function c(e, t, n, i) {
    var o = t && t.prototype instanceof d ? t : d,
      a = Object.create(o.prototype),
      s = new C(i || []);
    return r(a, "_invoke", {
      value: _(e, n, s)
    }), a;
  }
  function h(e, t, n) {
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
  var f = {};
  function d() {}
  function p() {}
  function m() {}
  var g = {};
  l(g, o, function () {
    return this;
  });
  var v = Object.getPrototypeOf,
    y = v && v(v(O([])));
  y && y !== t && n.call(y, o) && (g = y);
  var b = m.prototype = d.prototype = Object.create(g);
  function w(e) {
    ["next", "throw", "return"].forEach(function (t) {
      l(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function x(e, t) {
    function i(r, o, a, s) {
      var l = h(e[r], e, o);
      if ("throw" !== l.type) {
        var c = l.arg,
          u = c.value;
        return u && "object" == typeof u && n.call(u, "__await") ? t.resolve(u.__await).then(function (e) {
          i("next", e, a, s);
        }, function (e) {
          i("throw", e, a, s);
        }) : t.resolve(u).then(function (e) {
          c.value = e, a(c);
        }, function (e) {
          return i("throw", e, a, s);
        });
      }
      s(l.arg);
    }
    var o;
    r(this, "_invoke", {
      value: function (e, n) {
        function r() {
          return new t(function (t, r) {
            i(e, n, t, r);
          });
        }
        return o = o ? o.then(r, r) : r();
      }
    });
  }
  function _(e, t, n) {
    var r = "suspendedStart";
    return function (i, o) {
      if ("executing" === r) throw new Error("Generator is already running");
      if ("completed" === r) {
        if ("throw" === i) throw o;
        return T();
      }
      for (n.method = i, n.arg = o;;) {
        var a = n.delegate;
        if (a) {
          var s = E(a, n);
          if (s) {
            if (s === f) continue;
            return s;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if ("suspendedStart" === r) throw r = "completed", n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        r = "executing";
        var l = h(e, t, n);
        if ("normal" === l.type) {
          if (r = n.done ? "completed" : "suspendedYield", l.arg === f) continue;
          return {
            value: l.arg,
            done: n.done
          };
        }
        "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg);
      }
    };
  }
  function E(e, t) {
    var n = t.method,
      r = e.iterator[n];
    if (void 0 === r) return t.delegate = null, "throw" === n && e.iterator.return && (t.method = "return", t.arg = void 0, E(e, t), "throw" === t.method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
    var i = h(r, e.iterator, t.arg);
    if ("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, f;
    var o = i.arg;
    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, f) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, f);
  }
  function S(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function k(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function C(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(S, this), this.reset(!0);
  }
  function O(e) {
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
      next: T
    };
  }
  function T() {
    return {
      value: void 0,
      done: !0
    };
  }
  return p.prototype = m, r(b, "constructor", {
    value: m,
    configurable: !0
  }), r(m, "constructor", {
    value: p,
    configurable: !0
  }), p.displayName = l(m, s, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
    var t = "function" == typeof e && e.constructor;
    return !!t && (t === p || "GeneratorFunction" === (t.displayName || t.name));
  }, e.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, m) : (e.__proto__ = m, l(e, s, "GeneratorFunction")), e.prototype = Object.create(b), e;
  }, e.awrap = function (e) {
    return {
      __await: e
    };
  }, w(x.prototype), l(x.prototype, a, function () {
    return this;
  }), e.AsyncIterator = x, e.async = function (t, n, r, i, o) {
    void 0 === o && (o = Promise);
    var a = new x(c(t, n, r, i), o);
    return e.isGeneratorFunction(n) ? a : a.next().then(function (e) {
      return e.done ? e.value : a.next();
    });
  }, w(b), l(b, s, "Generator"), l(b, o, function () {
    return this;
  }), l(b, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (e) {
    var t = Object(e),
      n = [];
    for (var r in t) n.push(r);
    return n.reverse(), function e() {
      for (; n.length;) {
        var r = n.pop();
        if (r in t) return e.value = r, e.done = !1, e;
      }
      return e.done = !0, e;
    };
  }, e.values = O, C.prototype = {
    constructor: C,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(k), !e) for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
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
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var o = this.tryEntries[i],
          a = o.completion;
        if ("root" === o.tryLoc) return r("end");
        if (o.tryLoc <= this.prev) {
          var s = n.call(o, "catchLoc"),
            l = n.call(o, "finallyLoc");
          if (s && l) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          } else if (s) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
          } else {
            if (!l) throw new Error("try statement without catch or finally");
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var i = this.tryEntries[r];
        if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
          var o = i;
          break;
        }
      }
      o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
      var a = o ? o.completion : {};
      return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, f) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), f;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), f;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var i = r.arg;
            k(n);
          }
          return i;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, t, n) {
      return this.delegate = {
        iterator: O(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), f;
    }
  }, e;
}
var h = {
  ticket: {},
  deposit: {},
  invite: {},
  site: {},
  subscribe: {},
  frontend: {},
  server: {},
  email: {},
  telegram: {},
  app: {},
  safe: {},
  tabs: "site",
  fetchLoading: !1,
  emailTemplate: [],
  themeTemplate: [],
  setTelegramWebhookLoading: !1
};
legacyExports["default"] = {
  name: "config",
  state: a()({}, h),
  reducers: {
    setState(e, t) {
      var n = t.payload;
      return a()({}, e, n);
    }
  },
  effects: {
    fetch(e, t) {
      var n = e.key,
        r = t.put;
      return u().mark(function e() {
        var t, i, j, o;
        return u().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, r({
                type: "setState",
                payload: {
                  fetchLoading: !0
                }
              });
            case 2:
              return e.next = 4, Object(c["a"])("/" + window.settings.secure_path + "/config/fetch", {
                key: n
              });
            case 4:
              return o = e.sent, e.next = 7, r({
                type: "setState",
                payload: {
                  fetchLoading: !1
                }
              });
            case 7:
              if (200 === o.code) {
                e.next = 9;
                break;
              }
              return e.abrupt("return");
            case 9:
              return "string" === typeof (null === (t = o.data.invite) || void 0 === t ? void 0 : t.commission_withdraw_method) && (o.data.invite.commission_withdraw_method = o.data.invite.commission_withdraw_method.split(",")), "string" === typeof (null === (i = o.data.site) || void 0 === i ? void 0 : i.email_whitelist_suffix) && (o.data.site.email_whitelist_suffix = o.data.site.email_whitelist_suffix.split(",")), "string" === typeof (null === (j = o.data.deposit) || void 0 === j ? void 0 : j.deposit_bounus) && (o.data.deposit.deposit_bounus = o.data.deposit.deposit_bounus.split(",")), e.next = 13, r({
                type: "setState",
                payload: a()({}, o.data)
              });
            case 13:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    save(e, t) {
      var n = e.parentKey,
        r = t.put,
        o = t.select;
      return u().mark(function e() {
        var t, s;
        return u().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, o(e => e.config);
            case 2:
              return t = e.sent, e.next = 5, Object(c["b"])("/" + window.settings.secure_path + "/config/save", a()({}, t[n]));
            case 5:
              if (s = e.sent, 200 === s.code) {
                e.next = 8;
                break;
              }
              return e.abrupt("return");
            case 8:
              return i["a"].success("保存成功"), e.next = 11, r({
                type: "fetch"
              });
            case 11:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    getEmailTemplate(e, t) {
      var n = t.put;
      return u().mark(function e() {
        var t;
        return u().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, Object(c["a"])("/" + window.settings.secure_path + "/config/getEmailTemplate");
            case 2:
              if (t = e.sent, 200 === t.code) {
                e.next = 5;
                break;
              }
              return e.abrupt("return");
            case 5:
              return e.next = 7, n({
                type: "setState",
                payload: {
                  emailTemplate: t.data
                }
              });
            case 7:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    getThemeTemplate(e, t) {
      var n = t.put;
      return u().mark(function e() {
        var t;
        return u().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, Object(c["a"])("/" + window.settings.secure_path + "/config/getThemeTemplate");
            case 2:
              if (t = e.sent, 200 === t.code) {
                e.next = 5;
                break;
              }
              return e.abrupt("return");
            case 5:
              return e.next = 7, n({
                type: "setState",
                payload: {
                  themeTemplate: t.data
                }
              });
            case 7:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    setTelegramWebhook(e, t) {
      var n = e.token,
        r = t.put;
      t.select;
      return u().mark(function e() {
        var t;
        return u().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, r({
                type: "setState",
                payload: {
                  setTelegramWebhookLoading: !0
                }
              });
            case 2:
              return e.next = 4, Object(c["b"])("/" + window.settings.secure_path + "/config/setTelegramWebhook", {
                telegram_bot_token: n
              });
            case 4:
              return t = e.sent, e.next = 7, r({
                type: "setState",
                payload: {
                  setTelegramWebhookLoading: !1
                }
              });
            case 7:
              if (200 === t.code) {
                e.next = 9;
                break;
              }
              return e.abrupt("return");
            case 9:
              i["a"].success("webhook 设置成功");
            case 10:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    },
    testSendMail(e, t) {
      var n = t.put;
      return u().mark(function e() {
        var t, i, o, a, s, h, f, d, p, m;
        return u().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, n({
                type: "setState",
                payload: {
                  testSendMailLoading: !0
                }
              });
            case 2:
              return e.next = 4, Object(c["b"])("/" + window.settings.secure_path + "/config/testSendMail");
            case 4:
              return m = e.sent, e.next = 7, n({
                type: "setState",
                payload: {
                  testSendMailLoading: !1
                }
              });
            case 7:
              if (200 === m.code) {
                e.next = 9;
                break;
              }
              return e.abrupt("return");
            case 9:
              r["a"][(null === m || void 0 === m ? void 0 : null === (t = m.log) || void 0 === t ? void 0 : t.error) ? "error" : "success"]({
                title: (null === m || void 0 === m ? void 0 : null === (i = m.log) || void 0 === i ? void 0 : i.error) ? "发送失败" : "发送成功",
                content: <div>
                                            {(null === m || void 0 === m ? void 0 : null === (o = m.log) || void 0 === o ? void 0 : o.error) && <div>
                                                    <span>{"失败原因:"}</span>
                                                    <span>
                                                        {null === m || void 0 === m ? void 0 : null === (a = m.log) || void 0 === a ? void 0 : a.error}
                                                    </span>
                                                </div>}
                                            <div>
                                                <span>{"收信地址:"}</span>
                                                <span>
                                                    {null === m || void 0 === m ? void 0 : null === (s = m.log) || void 0 === s ? void 0 : s.email}
                                                </span>
                                            </div>
                                            <div>
                                                <span>{"发信服务器:"}</span>
                                                <span>
                                                    {null === m || void 0 === m ? void 0 : null === (h = m.log) || void 0 === h ? void 0 : h.config.host}
                                                </span>
                                            </div>
                                            <div>
                                                <span>{"发信端口:"}</span>
                                                <span>
                                                    {null === m || void 0 === m ? void 0 : null === (f = m.log) || void 0 === f ? void 0 : f.config.port}
                                                </span>
                                            </div>
                                            <div>
                                                <span>{"发信加密方式:"}</span>
                                                <span>
                                                    {null === m || void 0 === m ? void 0 : null === (d = m.log) || void 0 === d ? void 0 : d.config.encryption}
                                                </span>
                                            </div>
                                            <div>
                                                <span>{"发信用户名:"}</span>
                                                <span>
                                                    {null === m || void 0 === m ? void 0 : null === (p = m.log) || void 0 === p ? void 0 : p.config.username}
                                                </span>
                                            </div>
                                        </div>
              }), console.log(m);
            case 11:
            case "end":
              return e.stop();
          }
        }, e);
      })();
    }
  }
};
