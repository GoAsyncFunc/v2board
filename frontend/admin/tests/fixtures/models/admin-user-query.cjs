const a = api,
    o = () => Object.assign;
function f() {
    f = function () {
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
        i = 'function' == typeof Symbol ? Symbol : {},
        o = i.iterator || '@@iterator',
        a = i.asyncIterator || '@@asyncIterator',
        s = i.toStringTag || '@@toStringTag';
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
        l({}, '');
    } catch (e) {
        l = function (e, t, n) {
            return (e[t] = n);
        };
    }
    function c(e, t, n, i) {
        var o = t && t.prototype instanceof d ? t : d,
            a = Object.create(o.prototype),
            s = new C(i || []);
        return (
            r(a, '_invoke', {
                value: _(e, n, s),
            }),
            a
        );
    }
    function u(e, t, n) {
        try {
            return {
                type: 'normal',
                arg: e.call(t, n),
            };
        } catch (e) {
            return {
                type: 'throw',
                arg: e,
            };
        }
    }
    e.wrap = c;
    var h = {};
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
    var b = (m.prototype = d.prototype = Object.create(g));
    function w(e) {
        ['next', 'throw', 'return'].forEach(function (t) {
            l(e, t, function (e) {
                return this._invoke(t, e);
            });
        });
    }
    function x(e, t) {
        function i(r, o, a, s) {
            var l = u(e[r], e, o);
            if ('throw' !== l.type) {
                var c = l.arg,
                    h = c.value;
                return h && 'object' == typeof h && n.call(h, '__await')
                    ? t.resolve(h.__await).then(
                          function (e) {
                              i('next', e, a, s);
                          },
                          function (e) {
                              i('throw', e, a, s);
                          },
                      )
                    : t.resolve(h).then(
                          function (e) {
                              ((c.value = e), a(c));
                          },
                          function (e) {
                              return i('throw', e, a, s);
                          },
                      );
            }
            s(l.arg);
        }
        var o;
        r(this, '_invoke', {
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
        var r = 'suspendedStart';
        return function (i, o) {
            if ('executing' === r) throw new Error('Generator is already running');
            if ('completed' === r) {
                if ('throw' === i) throw o;
                return T();
            }
            for (n.method = i, n.arg = o; ;) {
                var a = n.delegate;
                if (a) {
                    var s = E(a, n);
                    if (s) {
                        if (s === h) continue;
                        return s;
                    }
                }
                if ('next' === n.method) n.sent = n._sent = n.arg;
                else if ('throw' === n.method) {
                    if ('suspendedStart' === r) throw ((r = 'completed'), n.arg);
                    n.dispatchException(n.arg);
                } else 'return' === n.method && n.abrupt('return', n.arg);
                r = 'executing';
                var l = u(e, t, n);
                if ('normal' === l.type) {
                    if (((r = n.done ? 'completed' : 'suspendedYield'), l.arg === h)) continue;
                    return {
                        value: l.arg,
                        done: n.done,
                    };
                }
                'throw' === l.type && ((r = 'completed'), (n.method = 'throw'), (n.arg = l.arg));
            }
        };
    }
    function E(e, t) {
        var n = t.method,
            r = e.iterator[n];
        if (void 0 === r)
            return (
                (t.delegate = null),
                ('throw' === n &&
                    e.iterator.return &&
                    ((t.method = 'return'), (t.arg = void 0), E(e, t), 'throw' === t.method)) ||
                    ('return' !== n &&
                        ((t.method = 'throw'),
                        (t.arg = new TypeError(
                            "The iterator does not provide a '" + n + "' method",
                        )))),
                h
            );
        var i = u(r, e.iterator, t.arg);
        if ('throw' === i.type)
            return ((t.method = 'throw'), (t.arg = i.arg), (t.delegate = null), h);
        var o = i.arg;
        return o
            ? o.done
                ? ((t[e.resultName] = o.value),
                  (t.next = e.nextLoc),
                  'return' !== t.method && ((t.method = 'next'), (t.arg = void 0)),
                  (t.delegate = null),
                  h)
                : o
            : ((t.method = 'throw'),
              (t.arg = new TypeError('iterator result is not an object')),
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
        ((t.type = 'normal'), delete t.arg, (e.completion = t));
    }
    function C(e) {
        ((this.tryEntries = [
            {
                tryLoc: 'root',
            },
        ]),
            e.forEach(S, this),
            this.reset(!0));
    }
    function O(e) {
        if (e) {
            var t = e[o];
            if (t) return t.call(e);
            if ('function' == typeof e.next) return e;
            if (!isNaN(e.length)) {
                var r = -1,
                    i = function t() {
                        for (; ++r < e.length;)
                            if (n.call(e, r)) return ((t.value = e[r]), (t.done = !1), t);
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
        r(b, 'constructor', {
            value: m,
            configurable: !0,
        }),
        r(m, 'constructor', {
            value: p,
            configurable: !0,
        }),
        (p.displayName = l(m, s, 'GeneratorFunction')),
        (e.isGeneratorFunction = function (e) {
            var t = 'function' == typeof e && e.constructor;
            return !!t && (t === p || 'GeneratorFunction' === (t.displayName || t.name));
        }),
        (e.mark = function (e) {
            return (
                Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, m)
                    : ((e.__proto__ = m), l(e, s, 'GeneratorFunction')),
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
        l(b, s, 'Generator'),
        l(b, o, function () {
            return this;
        }),
        l(b, 'toString', function () {
            return '[object Generator]';
        }),
        (e.keys = function (e) {
            var t = Object(e),
                n = [];
            for (var r in t) n.push(r);
            return (
                n.reverse(),
                function e() {
                    for (; n.length;) {
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
                    (this.method = 'next'),
                    (this.arg = void 0),
                    this.tryEntries.forEach(k),
                    !e)
                )
                    for (var t in this)
                        't' === t.charAt(0) &&
                            n.call(this, t) &&
                            !isNaN(+t.slice(1)) &&
                            (this[t] = void 0);
            },
            stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ('throw' === e.type) throw e.arg;
                return this.rval;
            },
            dispatchException: function (e) {
                if (this.done) throw e;
                var t = this;
                function r(n, r) {
                    return (
                        (a.type = 'throw'),
                        (a.arg = e),
                        (t.next = n),
                        r && ((t.method = 'next'), (t.arg = void 0)),
                        !!r
                    );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var o = this.tryEntries[i],
                        a = o.completion;
                    if ('root' === o.tryLoc) return r('end');
                    if (o.tryLoc <= this.prev) {
                        var s = n.call(o, 'catchLoc'),
                            l = n.call(o, 'finallyLoc');
                        if (s && l) {
                            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                        } else if (s) {
                            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                        } else {
                            if (!l) throw new Error('try statement without catch or finally');
                            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function (e, t) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var i = this.tryEntries[r];
                    if (
                        i.tryLoc <= this.prev &&
                        n.call(i, 'finallyLoc') &&
                        this.prev < i.finallyLoc
                    ) {
                        var o = i;
                        break;
                    }
                }
                o &&
                    ('break' === e || 'continue' === e) &&
                    o.tryLoc <= t &&
                    t <= o.finallyLoc &&
                    (o = null);
                var a = o ? o.completion : {};
                return (
                    (a.type = e),
                    (a.arg = t),
                    o ? ((this.method = 'next'), (this.next = o.finallyLoc), h) : this.complete(a)
                );
            },
            complete: function (e, t) {
                if ('throw' === e.type) throw e.arg;
                return (
                    'break' === e.type || 'continue' === e.type
                        ? (this.next = e.arg)
                        : 'return' === e.type
                          ? ((this.rval = this.arg = e.arg),
                            (this.method = 'return'),
                            (this.next = 'end'))
                          : 'normal' === e.type && t && (this.next = t),
                    h
                );
            },
            finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e)
                        return (this.complete(n.completion, n.afterLoc), k(n), h);
                }
            },
            catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                        var r = n.completion;
                        if ('throw' === r.type) {
                            var i = r.arg;
                            k(n);
                        }
                        return i;
                    }
                }
                throw new Error('illegal catch attempt');
            },
            delegateYield: function (e, t, n) {
                return (
                    (this.delegate = {
                        iterator: O(e),
                        resultName: t,
                        nextLoc: n,
                    }),
                    'next' === this.method && (this.arg = void 0),
                    h
                );
            },
        }),
        e
    );
}
module.exports = {
    getUserInfoById(e, t) {
        var n = e.id,
            r = t.put;
        return f().mark(function e() {
            var t;
            return f().wrap(function (e) {
                while (1)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return (
                                (e.next = 2),
                                Object(a['a'])(
                                    '/' + window.settings.secure_path + '/user/getUserInfoById',
                                    {
                                        id: n,
                                    },
                                )
                            );
                        case 2:
                            if (((t = e.sent), 200 === t.code)) {
                                e.next = 5;
                                break;
                            }
                            return e.abrupt('return');
                        case 5:
                            return (
                                (t.data.password = ''),
                                (t.data.transfer_enable = (
                                    t.data.transfer_enable / 1073741824
                                ).toFixed(2)),
                                (t.data.u = (t.data.u / 1073741824).toFixed(2)),
                                (t.data.d = (t.data.d / 1073741824).toFixed(2)),
                                (t.data.commission_balance = (
                                    t.data.commission_balance / 100
                                ).toFixed(2)),
                                (t.data.balance = (t.data.balance / 100).toFixed(2)),
                                t.data.invite_user &&
                                    (t.data.invite_user_email = t.data.invite_user.email),
                                (e.next = 14),
                                r({
                                    type: 'setState',
                                    payload: {
                                        user: t.data,
                                    },
                                })
                            );
                        case 14:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })();
    },
    fetch(e, t) {
        var n = t.put,
            r = t.select;
        return f().mark(function e() {
            var t, i;
            return f().wrap(function (e) {
                while (1)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return ((e.next = 2), r((e) => e.user));
                        case 2:
                            return (
                                (t = e.sent),
                                (e.next = 5),
                                n({
                                    type: 'setState',
                                    payload: {
                                        fetchLoading: !0,
                                    },
                                })
                            );
                        case 5:
                            return (
                                (e.next = 7),
                                Object(a['a'])(
                                    '/' + window.settings.secure_path + '/user/fetch',
                                    o()(
                                        {
                                            filter: t.filter,
                                        },
                                        t.pagination,
                                        t.sort,
                                    ),
                                )
                            );
                        case 7:
                            return (
                                (i = e.sent),
                                (e.next = 10),
                                n({
                                    type: 'setState',
                                    payload: {
                                        fetchLoading: !1,
                                    },
                                })
                            );
                        case 10:
                            if (200 === i.code) {
                                e.next = 12;
                                break;
                            }
                            return e.abrupt('return');
                        case 12:
                            return (
                                i.data.forEach((e) => {
                                    ((e.password = ''),
                                        (e.transfer_enable = (
                                            e.transfer_enable / 1073741824
                                        ).toFixed(2)),
                                        (e.u = (e.u / 1073741824).toFixed(2)),
                                        (e.d = (e.d / 1073741824).toFixed(2)),
                                        (e.total_used = (e.total_used / 1073741824).toFixed(2)),
                                        (e.commission_balance = (
                                            e.commission_balance / 100
                                        ).toFixed(2)),
                                        (e.balance = (e.balance / 100).toFixed(2)));
                                }),
                                (e.next = 15),
                                n({
                                    type: 'setState',
                                    payload: {
                                        users: i.data,
                                        pagination: o()({}, t.pagination, {
                                            total: i.total,
                                        }),
                                    },
                                })
                            );
                        case 15:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })();
    },
    filter(e, t) {
        var n = e.filter,
            r = t.put,
            i = t.select;
        return f().mark(function e() {
            var t, o;
            return f().wrap(function (e) {
                while (1)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return ((e.next = 2), i((e) => e.user));
                        case 2:
                            return (
                                (t = e.sent),
                                (o = t.pagination),
                                (o['current'] = 1),
                                (e.next = 7),
                                r({
                                    type: 'setState',
                                    payload: {
                                        filter: n,
                                    },
                                })
                            );
                        case 7:
                            return (
                                (e.next = 9),
                                r({
                                    type: 'fetch',
                                })
                            );
                        case 9:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })();
    },
    changeTable(e, t) {
        var n = e.pagination,
            r = e.sort,
            i = t.select,
            a = t.put;
        return f().mark(function e() {
            var t;
            return f().wrap(function (e) {
                while (1)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return ((e.next = 2), i((e) => e.user));
                        case 2:
                            return (
                                (t = e.sent),
                                (e.next = 5),
                                a({
                                    type: 'setState',
                                    payload: {
                                        pagination: o()({}, t.pagination, n),
                                        sort: r,
                                    },
                                })
                            );
                        case 5:
                            return (
                                (e.next = 7),
                                a({
                                    type: 'fetch',
                                })
                            );
                        case 7:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })();
    },
    addFilter(e, t) {
        var n = e.key,
            r = e.condition,
            i = e.value,
            o = e.clear,
            a = t.put,
            s = t.select;
        return f().mark(function e() {
            var t, l, c;
            return f().wrap(function (e) {
                while (1)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return ((e.next = 2), s((e) => e.user));
                        case 2:
                            return (
                                (t = e.sent),
                                (l = t.filter),
                                (c = t.pagination),
                                o && (l = []),
                                l.push({
                                    key: n,
                                    condition: r,
                                    value: i,
                                }),
                                (c['current'] = 1),
                                (e.next = 10),
                                a({
                                    type: 'setState',
                                    payload: {
                                        filter: l,
                                        pagination: c,
                                    },
                                })
                            );
                        case 10:
                            return (
                                (e.next = 12),
                                a({
                                    type: 'fetch',
                                })
                            );
                        case 12:
                        case 'end':
                            return e.stop();
                    }
            }, e);
        })();
    },
};
