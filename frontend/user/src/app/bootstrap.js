let legacyModule = module,
    legacyExports = exports;
const {
    markEsModule,
    interopDefault,
    defineExport,
} = require("./moduleInterop.js");
markEsModule(legacyExports);
(require("../vendor/modules/objectWithoutPropertiesLoose.js"),
    require("../vendor/modules/iterableToArray.js"));
var r = require("../vendor/modules/70307045.js"),
    o = interopDefault(r),
    i = require("../vendor/modules/316c2f56.js"),
    a = interopDefault(i),
    s =
        (require("../vendor/modules/30776c71.js"),
        require("../vendor/modules/6463464a.js"),
        require("../vendor/modules/56784b75.js"),
        require("../vendor/modules/51734d68.js"),
        require("../vendor/modules/6b675748.js"),
        require("../vendor/modules/2f67596e.js"),
        require("../vendor/modules/51366351.js"),
        require("../vendor/modules/6e774b2f.js"),
        require("../vendor/modules/mapRuntime.js"),
        require("../vendor/modules/58725256.js"),
        require("../vendor/modules/6a4e2f47.js"),
        require("../vendor/modules/506b5171.js"),
        require("../vendor/modules/65723159.js"),
        require("../vendor/modules/2f6d5762.js"),
        require("../vendor/modules/6a6a4d57.js"),
        require("../vendor/modules/4f486770.js"),
        require("../vendor/modules/4545516c.js"),
        require("../vendor/modules/48585852.js"),
        require("../vendor/modules/6b575235.js"),
        require("../vendor/modules/427a3773.js"),
        require("../vendor/modules/6c5a584d.js"),
        require("../vendor/modules/44427430.js"),
        require("../vendor/modules/6849556d.js"),
        require("../vendor/modules/47374868.js"),
        require("../vendor/modules/4446416f.js"),
        require("../vendor/modules/30737841.js"),
        require("../vendor/modules/72556376.js"),
        require("../vendor/modules/336d2b2f.js"),
        require("../vendor/modules/396e537a.js"),
        require("../vendor/modules/49523752.js"),
        require("../vendor/modules/55517431.js"),
        require("../vendor/modules/75327735.js"),
        require("../vendor/modules/7a787274.js"),
        require("../vendor/modules/42757333.js"),
        require("../vendor/modules/4f523358.js"),
        require("../vendor/modules/6f313735.js"),
        require("../vendor/modules/5850312f.js"),
        require("../vendor/modules/77387568.js"),
        require("../vendor/modules/48434d65.js"),
        require("../vendor/modules/51457a63.js"),
        require("../vendor/modules/5165486c.js"),
        require("../vendor/modules/53504659.js"),
        require("../vendor/modules/weakMapRuntime.js"),
        require("../vendor/modules/664b6d2b.js"),
        require("../vendor/modules/4e347550.js"),
        require("../vendor/modules/7a723878.js"),
        require("../vendor/modules/7a517a41.js"),
        require("../vendor/modules/774f6c30.js"),
        require("./history.js"),
        require("../vendor/modules/reactRuntime.js")),
    c = interopDefault(s),
    u = require("../vendor/modules/reactDomRuntime.js"),
    l = interopDefault(u),
    f = require("../vendor/modules/73613761.js"),
    p = interopDefault(f);
function d() {
    d = function () {
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
        return (
            Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
            }),
            e[t]
        );
    }
    try {
        s({}, "");
    } catch (e) {
        s = function (e, t, n) {
            return (e[t] = n);
        };
    }
    function c(e, t, n, r) {
        var o = t && t.prototype instanceof f ? t : f,
            i = Object.create(o.prototype),
            a = new _(r || []);
        return (
            (i._invoke = (function (e, t, n) {
                var r = "suspendedStart";
                return function (o, i) {
                    if ("executing" === r)
                        throw new Error("Generator is already running");
                    if ("completed" === r) {
                        if ("throw" === o) throw i;
                        return S();
                    }
                    for (n.method = o, n.arg = i; ; ) {
                        var a = n.delegate;
                        if (a) {
                            var s = x(a, n);
                            if (s) {
                                if (s === l) continue;
                                return s;
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if ("suspendedStart" === r)
                                throw ((r = "completed"), n.arg);
                            n.dispatchException(n.arg);
                        } else
                            "return" === n.method && n.abrupt("return", n.arg);
                        r = "executing";
                        var c = u(e, t, n);
                        if ("normal" === c.type) {
                            if (
                                ((r = n.done ? "completed" : "suspendedYield"),
                                c.arg === l)
                            )
                                continue;
                            return {
                                value: c.arg,
                                done: n.done,
                            };
                        }
                        "throw" === c.type &&
                            ((r = "completed"),
                            (n.method = "throw"),
                            (n.arg = c.arg));
                    }
                };
            })(e, n, a)),
            i
        );
    }
    function u(e, t, n) {
        try {
            return {
                type: "normal",
                arg: e.call(t, n),
            };
        } catch (e) {
            return {
                type: "throw",
                arg: e,
            };
        }
    }
    e.wrap = c;
    var l = {};
    function f() {}
    function p() {}
    function h() {}
    var m = {};
    s(m, o, function () {
        return this;
    });
    var v = Object.getPrototypeOf,
        y = v && v(v(k([])));
    y && y !== t && n.call(y, o) && (m = y);
    var g = (h.prototype = f.prototype = Object.create(m));
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
                return f && "object" == typeof f && n.call(f, "__await")
                    ? t.resolve(f.__await).then(
                          function (e) {
                              r("next", e, a, s);
                          },
                          function (e) {
                              r("throw", e, a, s);
                          },
                      )
                    : t.resolve(f).then(
                          function (e) {
                              ((l.value = e), a(l));
                          },
                          function (e) {
                              return r("throw", e, a, s);
                          },
                      );
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
            return (o = o ? o.then(i, i) : i());
        };
    }
    function x(e, t) {
        var n = e.iterator[t.method];
        if (void 0 === n) {
            if (((t.delegate = null), "throw" === t.method)) {
                if (
                    e.iterator.return &&
                    ((t.method = "return"),
                    (t.arg = void 0),
                    x(e, t),
                    "throw" === t.method)
                )
                    return l;
                ((t.method = "throw"),
                    (t.arg = new TypeError(
                        "The iterator does not provide a 'throw' method",
                    )));
            }
            return l;
        }
        var r = u(n, e.iterator, t.arg);
        if ("throw" === r.type)
            return (
                (t.method = "throw"),
                (t.arg = r.arg),
                (t.delegate = null),
                l
            );
        var o = r.arg;
        return o
            ? o.done
                ? ((t[e.resultName] = o.value),
                  (t.next = e.nextLoc),
                  "return" !== t.method &&
                      ((t.method = "next"), (t.arg = void 0)),
                  (t.delegate = null),
                  l)
                : o
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              l);
    }
    function O(e) {
        var t = {
            tryLoc: e[0],
        };
        (1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t));
    }
    function E(e) {
        var t = e.completion || {};
        ((t.type = "normal"), delete t.arg, (e.completion = t));
    }
    function _(e) {
        ((this.tryEntries = [
            {
                tryLoc: "root",
            },
        ]),
            e.forEach(O, this),
            this.reset(!0));
    }
    function k(e) {
        if (e) {
            var t = e[o];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
                var r = -1,
                    i = function t() {
                        for (; ++r < e.length; )
                            if (n.call(e, r))
                                return ((t.value = e[r]), (t.done = !1), t);
                        return ((t.value = void 0), (t.done = !0), t);
                    };
                return (i.next = i);
            }
        }
        return {
            next: S,
        };
    }
    function S() {
        return {
            value: void 0,
            done: !0,
        };
    }
    return (
        (p.prototype = h),
        s(g, "constructor", h),
        s(h, "constructor", p),
        (p.displayName = s(h, a, "GeneratorFunction")),
        (e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
                !!t &&
                (t === p || "GeneratorFunction" === (t.displayName || t.name))
            );
        }),
        (e.mark = function (e) {
            return (
                Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, h)
                    : ((e.__proto__ = h), s(e, a, "GeneratorFunction")),
                (e.prototype = Object.create(g)),
                e
            );
        }),
        (e.awrap = function (e) {
            return {
                __await: e,
            };
        }),
        b(w.prototype),
        s(w.prototype, i, function () {
            return this;
        }),
        (e.AsyncIterator = w),
        (e.async = function (t, n, r, o, i) {
            void 0 === i && (i = Promise);
            var a = new w(c(t, n, r, o), i);
            return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (e) {
                      return e.done ? e.value : a.next();
                  });
        }),
        b(g),
        s(g, a, "Generator"),
        s(g, o, function () {
            return this;
        }),
        s(g, "toString", function () {
            return "[object Generator]";
        }),
        (e.keys = function (e) {
            var t = [];
            for (var n in e) t.push(n);
            return (
                t.reverse(),
                function n() {
                    for (; t.length; ) {
                        var r = t.pop();
                        if (r in e) return ((n.value = r), (n.done = !1), n);
                    }
                    return ((n.done = !0), n);
                }
            );
        }),
        (e.values = k),
        (_.prototype = {
            constructor: _,
            reset: function (e) {
                if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = void 0),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = "next"),
                    (this.arg = void 0),
                    this.tryEntries.forEach(E),
                    !e)
                )
                    for (var t in this)
                        "t" === t.charAt(0) &&
                            n.call(this, t) &&
                            !isNaN(+t.slice(1)) &&
                            (this[t] = void 0);
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
                    return (
                        (a.type = "throw"),
                        (a.arg = e),
                        (t.next = n),
                        r && ((t.method = "next"), (t.arg = void 0)),
                        !!r
                    );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var i = this.tryEntries[o],
                        a = i.completion;
                    if ("root" === i.tryLoc) return r("end");
                    if (i.tryLoc <= this.prev) {
                        var s = n.call(i, "catchLoc"),
                            c = n.call(i, "finallyLoc");
                        if (s && c) {
                            if (this.prev < i.catchLoc)
                                return r(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc)
                                return r(i.finallyLoc);
                        } else if (s) {
                            if (this.prev < i.catchLoc)
                                return r(i.catchLoc, !0);
                        } else {
                            if (!c)
                                throw new Error(
                                    "try statement without catch or finally",
                                );
                            if (this.prev < i.finallyLoc)
                                return r(i.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function (e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var o = this.tryEntries[r];
                    if (
                        o.tryLoc <= this.prev &&
                        n.call(o, "finallyLoc") &&
                        this.prev < o.finallyLoc
                    ) {
                        var i = o;
                        break;
                    }
                }
                i &&
                    ("break" === e || "continue" === e) &&
                    i.tryLoc <= t &&
                    t <= i.finallyLoc &&
                    (i = null);
                var a = i ? i.completion : {};
                return (
                    (a.type = e),
                    (a.arg = t),
                    i
                        ? ((this.method = "next"),
                          (this.next = i.finallyLoc),
                          l)
                        : this.complete(a)
                );
            },
            complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return (
                    "break" === e.type || "continue" === e.type
                        ? (this.next = e.arg)
                        : "return" === e.type
                          ? ((this.rval = this.arg = e.arg),
                            (this.method = "return"),
                            (this.next = "end"))
                          : "normal" === e.type && t && (this.next = t),
                    l
                );
            },
            finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e)
                        return (
                            this.complete(n.completion, n.afterLoc),
                            E(n),
                            l
                        );
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
                return (
                    (this.delegate = {
                        iterator: k(e),
                        resultName: t,
                        nextLoc: n,
                    }),
                    "next" === this.method && (this.arg = void 0),
                    l
                );
            },
        }),
        e
    );
}
defineExport(legacyExports, "ReactDOMServer", function () {
    return v;
});
var h = require("../vendor/modules/50737a47.js");
((window.g_plugins = h),
    h.init({
        validKeys: [
            "patchRoutes",
            "render",
            "rootContainer",
            "modifyRouteProps",
            "onRouteChange",
            "modifyInitialProps",
            "initialProps",
            "dva",
            "locale",
        ],
    }),
    h.use(require("../vendor/modules/334a724f.js")),
    h.use(require("../vendor/modules/45524968.js")));
var m = require("./store.js")._onCreate();
window.g_app = m;
var v,
    y = (function () {
        var e = a()(
            d().mark(function e() {
                var t, r, i, a, s;
                return d().wrap(function (e) {
                    while (1)
                        switch ((e.prev = e.next)) {
                            case 0:
                                if (
                                    ((window.g_isBrowser = !0),
                                    (t = {}),
                                    !window.g_useSSR)
                                ) {
                                    e.next = 6;
                                    break;
                                }
                                ((t = window.g_initialData), (e.next = 18));
                                break;
                            case 6:
                                if (
                                    ((r = location.pathname),
                                    (i = p()(
                                        require("./Router.jsx").routes,
                                        r,
                                    )),
                                    !(
                                        i &&
                                        i.component &&
                                        i.component.getInitialProps
                                    ))
                                ) {
                                    e.next = 18;
                                    break;
                                }
                                if (
                                    ((a = h.apply("modifyInitialProps", {
                                        initialValue: {},
                                    })),
                                    !i.component.getInitialProps)
                                ) {
                                    e.next = 16;
                                    break;
                                }
                                return (
                                    (e.next = 13),
                                    i.component.getInitialProps(
                                        o()(
                                            {
                                                route: i,
                                                isServer: !1,
                                                location: location,
                                            },
                                            a,
                                        ),
                                    )
                                );
                            case 13:
                                ((e.t0 = e.sent), (e.next = 17));
                                break;
                            case 16:
                                e.t0 = {};
                            case 17:
                                t = e.t0;
                            case 18:
                                ((s = h.apply("rootContainer", {
                                    initialValue: c.a.createElement(
                                        require("./Router.jsx").default,
                                        t,
                                    ),
                                })),
                                    l.a[window.g_useSSR ? "hydrate" : "render"](
                                        s,
                                        document.getElementById("root"),
                                    ));
                            case 20:
                            case "end":
                                return e.stop();
                        }
                }, e);
            }),
        );
        return function () {
            return e.apply(this, arguments);
        };
    })(),
    g = h.compose("render", {
        initialValue: y,
    }),
    b = [];
Promise.all(b)
    .then(() => {
        g();
    })
    .catch((e) => {
        window.console && window.console.error(e);
    });
legacyExports["default"] = null;
require("../vendor/modules/68683863.js");
