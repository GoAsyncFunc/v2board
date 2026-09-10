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
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {},
      o = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), o.forEach(function (t) {
      r(e, t, n[t]);
    });
  }
  return e;
}
var i = "@@DVA_LOADING/SHOW",
  a = "@@DVA_LOADING/HIDE",
  s = "loading";
function c() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.namespace || s,
    n = e.only,
    c = void 0 === n ? [] : n,
    u = e.except,
    l = void 0 === u ? [] : u;
  if (c.length > 0 && l.length > 0) throw Error("It is ambiguous to configurate `only` and `except` items at the same time.");
  var f = {
      global: !1,
      models: {},
      effects: {}
    },
    p = r({}, t, function () {
      var e,
        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : f,
        n = arguments.length > 1 ? arguments[1] : void 0,
        s = n.type,
        c = n.payload,
        u = c || {},
        l = u.namespace,
        p = u.actionType;
      switch (s) {
        case i:
          e = o({}, t, {
            global: !0,
            models: o({}, t.models, r({}, l, !0)),
            effects: o({}, t.effects, r({}, p, !0))
          });
          break;
        case a:
          var d = o({}, t.effects, r({}, p, !1)),
            h = o({}, t.models, r({}, l, Object.keys(d).some(function (e) {
              var t = e.split("/")[0];
              return t === l && d[e];
            }))),
            m = Object.keys(h).some(function (e) {
              return h[e];
            });
          e = o({}, t, {
            global: m,
            models: h,
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
    var o = t.put,
      s = n.namespace;
    return 0 === c.length && 0 === l.length || c.length > 0 && -1 !== c.indexOf(r) || l.length > 0 && -1 === l.indexOf(r) ? regeneratorRuntime.mark(function t() {
      var n = arguments;
      return regeneratorRuntime.wrap(function (t) {
        while (1) switch (t.prev = t.next) {
          case 0:
            return t.next = 2, o({
              type: i,
              payload: {
                namespace: s,
                actionType: r
              }
            });
          case 2:
            return t.next = 4, e.apply(void 0, n);
          case 4:
            return t.next = 6, o({
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
    extraReducers: p,
    onEffect: d
  };
}
legacyModule.exports = c;
