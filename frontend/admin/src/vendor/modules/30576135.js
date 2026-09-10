let legacyModule = module,
  legacyExports = exports;
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {},
      i = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), i.forEach(function (t) {
      r(e, t, n[t]);
    });
  }
  return e;
}
var o = "@@DVA_LOADING/SHOW",
  a = "@@DVA_LOADING/HIDE",
  s = "loading";
function l() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.namespace || s,
    n = e.only,
    l = void 0 === n ? [] : n,
    c = e.except,
    u = void 0 === c ? [] : c;
  if (l.length > 0 && u.length > 0) throw Error("It is ambiguous to configurate `only` and `except` items at the same time.");
  var h = {
      global: !1,
      models: {},
      effects: {}
    },
    f = r({}, t, function () {
      var e,
        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : h,
        n = arguments.length > 1 ? arguments[1] : void 0,
        s = n.type,
        l = n.payload,
        c = l || {},
        u = c.namespace,
        f = c.actionType;
      switch (s) {
        case o:
          e = i({}, t, {
            global: !0,
            models: i({}, t.models, r({}, u, !0)),
            effects: i({}, t.effects, r({}, f, !0))
          });
          break;
        case a:
          var d = i({}, t.effects, r({}, f, !1)),
            p = i({}, t.models, r({}, u, Object.keys(d).some(function (e) {
              var t = e.split("/")[0];
              return t === u && d[e];
            }))),
            m = Object.keys(p).some(function (e) {
              return p[e];
            });
          e = i({}, t, {
            global: m,
            models: p,
            effects: d
          });
          break;
        default:
          e = t;
          break;
      }
      return e;
    });
  function d(e, t, n, r) {
    var i = t.put,
      s = n.namespace;
    return 0 === l.length && 0 === u.length || l.length > 0 && -1 !== l.indexOf(r) || u.length > 0 && -1 === u.indexOf(r) ? regeneratorRuntime.mark(function t() {
      var n = arguments;
      return regeneratorRuntime.wrap(function (t) {
        while (1) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, i({
              type: o,
              payload: {
                namespace: s,
                actionType: r
              }
            });
          case 2:
            return t.next = 4, e.apply(void 0, n);
          case 4:
            return t.next = 6, i({
              type: a,
              payload: {
                namespace: s,
                actionType: r
              }
            });
          case 6:
          case "end":
            return t.stop();
        }
      }, t);
    }) : e;
  }
  return {
    extraReducers: f,
    onEffect: d
  };
}
legacyModule.exports = l;
