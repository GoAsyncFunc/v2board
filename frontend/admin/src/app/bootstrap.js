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
    i = interopDefault(r),
    o = require("../vendor/modules/316c2f56.js"),
    a = interopDefault(o),
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
    l = interopDefault(s),
    c = require("../vendor/modules/reactDomRuntime.js"),
    u = interopDefault(c),
    h = require("../vendor/modules/73613761.js"),
    f = interopDefault(h);
function d() {
    d = function () {
        return e;
    };
    var e = {},
        t = Object.prototype,
        n = t.hasOwnProperty,
        r =
            Object.defineProperty ||
            function (e, t, n) {
                e[t] = n.value;
            },
        i = "function" == typeof Symbol ? Symbol : {},
        o = i.iterator || "@@iterator",
        a = i.asyncIterator || "@@asyncIterator",
        s = i.toStringTag || "@@toStringTag";
    function l(e, t, n) {
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
        l({}, "");
    } catch (e) {
        l = function (e, t, n) {
            return (e[t] = n);
        };
    }
    function c(e, t, n, i) {
        var o = t && t.prototype instanceof f ? t : f,
            a = Object.create(o.prototype),
            s = new C(i || []);
        return (
            r(a, "_invoke", {
                value: _(e, n, s),
            }),
            a
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
    var h = {};
    function f() {}
    function p() {}
    function m() {}
    var g = {};
    l(g, o, function () {
        return this;
    });
    var v = Object.getPrototypeOf,
        y = v && v(v(O([])));
    y && y !== t && n.call(y, o) && (g = y);
    var b = (m.prototype = f.prototype = Object.create(g));
    function w(e) {
        ["next", "throw", "return"].forEach(function (t) {
            l(e, t, function (e) {
                return this._invoke(t, e);
            });
        });
    }
    function x(e, t) {
        function i(r, o, a, s) {
            var l = u(e[r], e, o);
            if ("throw" !== l.type) {
                var c = l.arg,
                    h = c.value;
                return h && "object" == typeof h && n.call(h, "__await")
                    ? t.resolve(h.__await).then(
                          function (e) {
                              i("next", e, a, s);
                          },
                          function (e) {
                              i("throw", e, a, s);
                          },
                      )
                    : t.resolve(h).then(
                          function (e) {
                              ((c.value = e), a(c));
                          },
                          function (e) {
                              return i("throw", e, a, s);
                          },
                      );
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
                return (o = o ? o.then(r, r) : r());
            },
        });
    }
    function _(e, t, n) {
        var r = "suspendedStart";
        return function (i, o) {
            if ("executing" === r)
                throw new Error("Generator is already running");
            if ("completed" === r) {
                if ("throw" === i) throw o;
                return T();
            }
            for (n.method = i, n.arg = o; ; ) {
                var a = n.delegate;
                if (a) {
                    var s = E(a, n);
                    if (s) {
                        if (s === h) continue;
                        return s;
                    }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;
                else if ("throw" === n.method) {
                    if ("suspendedStart" === r)
                        throw ((r = "completed"), n.arg);
                    n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                r = "executing";
                var l = u(e, t, n);
                if ("normal" === l.type) {
                    if (
                        ((r = n.done ? "completed" : "suspendedYield"),
                        l.arg === h)
                    )
                        continue;
                    return {
                        value: l.arg,
                        done: n.done,
                    };
                }
                "throw" === l.type &&
                    ((r = "completed"), (n.method = "throw"), (n.arg = l.arg));
            }
        };
    }
    function E(e, t) {
        var n = t.method,
            r = e.iterator[n];
        if (void 0 === r)
            return (
                (t.delegate = null),
                ("throw" === n &&
                    e.iterator.return &&
                    ((t.method = "return"),
                    (t.arg = void 0),
                    E(e, t),
                    "throw" === t.method)) ||
                    ("return" !== n &&
                        ((t.method = "throw"),
                        (t.arg = new TypeError(
                            "The iterator does not provide a '" +
                                n +
                                "' method",
                        )))),
                h
            );
        var i = u(r, e.iterator, t.arg);
        if ("throw" === i.type)
            return (
                (t.method = "throw"),
                (t.arg = i.arg),
                (t.delegate = null),
                h
            );
        var o = i.arg;
        return o
            ? o.done
                ? ((t[e.resultName] = o.value),
                  (t.next = e.nextLoc),
                  "return" !== t.method &&
                      ((t.method = "next"), (t.arg = void 0)),
                  (t.delegate = null),
                  h)
                : o
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              h);
    }
    function S(e) {
        var t = {
            tryLoc: e[0],
        };
        (1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t));
    }
    function k(e) {
        var t = e.completion || {};
        ((t.type = "normal"), delete t.arg, (e.completion = t));
    }
    function C(e) {
        ((this.tryEntries = [
            {
                tryLoc: "root",
            },
        ]),
            e.forEach(S, this),
            this.reset(!0));
    }
    function O(e) {
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
            next: T,
        };
    }
    function T() {
        return {
            value: void 0,
            done: !0,
        };
    }
    return (
        (p.prototype = m),
        r(b, "constructor", {
            value: m,
            configurable: !0,
        }),
        r(m, "constructor", {
            value: p,
            configurable: !0,
        }),
        (p.displayName = l(m, s, "GeneratorFunction")),
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
                    ? Object.setPrototypeOf(e, m)
                    : ((e.__proto__ = m), l(e, s, "GeneratorFunction")),
                (e.prototype = Object.create(b)),
                e
            );
        }),
        (e.awrap = function (e) {
            return {
                __await: e,
            };
        }),
        w(x.prototype),
        l(x.prototype, a, function () {
            return this;
        }),
        (e.AsyncIterator = x),
        (e.async = function (t, n, r, i, o) {
            void 0 === o && (o = Promise);
            var a = new x(c(t, n, r, i), o);
            return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (e) {
                      return e.done ? e.value : a.next();
                  });
        }),
        w(b),
        l(b, s, "Generator"),
        l(b, o, function () {
            return this;
        }),
        l(b, "toString", function () {
            return "[object Generator]";
        }),
        (e.keys = function (e) {
            var t = Object(e),
                n = [];
            for (var r in t) n.push(r);
            return (
                n.reverse(),
                function e() {
                    for (; n.length; ) {
                        var r = n.pop();
                        if (r in t) return ((e.value = r), (e.done = !1), e);
                    }
                    return ((e.done = !0), e);
                }
            );
        }),
        (e.values = O),
        (C.prototype = {
            constructor: C,
            reset: function (e) {
                if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = void 0),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = "next"),
                    (this.arg = void 0),
                    this.tryEntries.forEach(k),
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
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var o = this.tryEntries[i],
                        a = o.completion;
                    if ("root" === o.tryLoc) return r("end");
                    if (o.tryLoc <= this.prev) {
                        var s = n.call(o, "catchLoc"),
                            l = n.call(o, "finallyLoc");
                        if (s && l) {
                            if (this.prev < o.catchLoc)
                                return r(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc)
                                return r(o.finallyLoc);
                        } else if (s) {
                            if (this.prev < o.catchLoc)
                                return r(o.catchLoc, !0);
                        } else {
                            if (!l)
                                throw new Error(
                                    "try statement without catch or finally",
                                );
                            if (this.prev < o.finallyLoc)
                                return r(o.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function (e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var i = this.tryEntries[r];
                    if (
                        i.tryLoc <= this.prev &&
                        n.call(i, "finallyLoc") &&
                        this.prev < i.finallyLoc
                    ) {
                        var o = i;
                        break;
                    }
                }
                o &&
                    ("break" === e || "continue" === e) &&
                    o.tryLoc <= t &&
                    t <= o.finallyLoc &&
                    (o = null);
                var a = o ? o.completion : {};
                return (
                    (a.type = e),
                    (a.arg = t),
                    o
                        ? ((this.method = "next"),
                          (this.next = o.finallyLoc),
                          h)
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
                    h
                );
            },
            finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e)
                        return (
                            this.complete(n.completion, n.afterLoc),
                            k(n),
                            h
                        );
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
                return (
                    (this.delegate = {
                        iterator: O(e),
                        resultName: t,
                        nextLoc: n,
                    }),
                    "next" === this.method && (this.arg = void 0),
                    h
                );
            },
        }),
        e
    );
}
defineExport(legacyExports, "ReactDOMServer", function () {
    return g;
});
var p = require("../vendor/modules/50737a47.js");
((window.g_plugins = p),
    p.init({
        validKeys: [
            "patchRoutes",
            "render",
            "rootContainer",
            "modifyRouteProps",
            "onRouteChange",
            "modifyInitialProps",
            "initialProps",
            "dva",
        ],
    }),
    p.use(require("../vendor/modules/334a724f.js")),
    p.use(require("../vendor/modules/45524968.js")));
var m = require("./store.js")._onCreate();
window.g_app = m;
var g,
    v = (function () {
        var e = a()(
            d().mark(function e() {
                var t, r, o, a, s;
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
                                    (o = f()(
                                        require("./Router.jsx").routes,
                                        r,
                                    )),
                                    !(
                                        o &&
                                        o.component &&
                                        o.component.getInitialProps
                                    ))
                                ) {
                                    e.next = 18;
                                    break;
                                }
                                if (
                                    ((a = p.apply("modifyInitialProps", {
                                        initialValue: {},
                                    })),
                                    !o.component.getInitialProps)
                                ) {
                                    e.next = 16;
                                    break;
                                }
                                return (
                                    (e.next = 13),
                                    o.component.getInitialProps(
                                        i()(
                                            {
                                                route: o,
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
                                ((s = p.apply("rootContainer", {
                                    initialValue: l.a.createElement(
                                        require("./Router.jsx").default,
                                        t,
                                    ),
                                })),
                                    u.a[window.g_useSSR ? "hydrate" : "render"](
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
    y = p.compose("render", {
        initialValue: v,
    }),
    b = [];
Promise.all(b)
    .then(() => {
        y();
    })
    .catch((e) => {
        window.console && window.console.error(e);
    });
legacyExports["default"] = null;
require("../vendor/modules/68683863.js");
