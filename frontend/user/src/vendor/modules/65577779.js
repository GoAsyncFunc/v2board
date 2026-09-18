let legacyModule = module,
  legacyExports = exports;
(function (e, r) {
  r(legacyExports, require("./reactRuntime.js"));
})(0, function (e, t) {
  "use strict";

  function n(e, t) {
    return t = {
      exports: {}
    }, e(t, t.exports), t.exports;
  }
  t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t["default"] : t;
  var r = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
    o = r;
  function i() {}
  function a() {}
  a.resetWarningCache = i;
  var s = function () {
      function e(e, t, n, r, i, a) {
        if (a !== o) {
          var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          throw s.name = "Invariant Violation", s;
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var n = {
        array: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        elementType: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
        checkPropTypes: a,
        resetWarningCache: i
      };
      return n.PropTypes = n, n;
    },
    c = n(function (e) {
      e.exports = s();
    });
  function u(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }
    return n;
  }
  function l(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? u(Object(n), !0).forEach(function (t) {
        p(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  function f(e) {
    "@babel/helpers - typeof";

    return f = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, f(e);
  }
  function p(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }
  function d(e, t) {
    return h(e) || m(e, t) || v(e, t) || g();
  }
  function h(e) {
    if (Array.isArray(e)) return e;
  }
  function m(e, t) {
    var n = e && ("undefined" !== typeof Symbol && e[Symbol.iterator] || e["@@iterator"]);
    if (null != n) {
      var r,
        o,
        i = [],
        a = !0,
        s = !1;
      try {
        for (n = n.call(e); !(a = (r = n.next()).done); a = !0) if (i.push(r.value), t && i.length === t) break;
      } catch (e) {
        s = !0, o = e;
      } finally {
        try {
          a || null == n["return"] || n["return"]();
        } finally {
          if (s) throw o;
        }
      }
      return i;
    }
  }
  function v(e, t) {
    if (e) {
      if ("string" === typeof e) return y(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? y(e, t) : void 0;
    }
  }
  function y(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function g() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var b = function (e) {
      var n = t.useRef(e);
      return t.useEffect(function () {
        n.current = e;
      }, [e]), n.current;
    },
    w = function (e) {
      return null !== e && "object" === f(e);
    },
    x = function (e) {
      return w(e) && "function" === typeof e.then;
    },
    O = function (e) {
      return w(e) && "function" === typeof e.elements && "function" === typeof e.createToken && "function" === typeof e.createPaymentMethod && "function" === typeof e.confirmCardPayment;
    },
    E = "[object Object]",
    _ = function e(t, n) {
      if (!w(t) || !w(n)) return t === n;
      var r = Array.isArray(t),
        o = Array.isArray(n);
      if (r !== o) return !1;
      var i = Object.prototype.toString.call(t) === E,
        a = Object.prototype.toString.call(n) === E;
      if (i !== a) return !1;
      if (!i && !r) return t === n;
      var s = Object.keys(t),
        c = Object.keys(n);
      if (s.length !== c.length) return !1;
      for (var u = {}, l = 0; l < s.length; l += 1) u[s[l]] = !0;
      for (var f = 0; f < c.length; f += 1) u[c[f]] = !0;
      var p = Object.keys(u);
      if (p.length !== s.length) return !1;
      var d = t,
        h = n,
        m = function (t) {
          return e(d[t], h[t]);
        };
      return p.every(m);
    },
    k = function (e, t, n) {
      return w(e) ? Object.keys(e).reduce(function (r, o) {
        var i = !w(t) || !_(e[o], t[o]);
        return n.includes(o) ? (i && console.warn("Unsupported prop change: options.".concat(o, " is not a mutable property.")), r) : i ? l(l({}, r || {}), {}, p({}, o, e[o])) : r;
      }, null) : null;
    },
    S = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",
    C = function (e) {
      if (null === e || O(e)) return e;
      throw new Error(S);
    },
    j = function (e) {
      if (x(e)) return {
        tag: "async",
        stripePromise: Promise.resolve(e).then(C)
      };
      var t = C(e);
      return null === t ? {
        tag: "empty"
      } : {
        tag: "sync",
        stripe: t
      };
    },
    P = t.createContext(null);
  P.displayName = "ElementsContext";
  var T = function (e, t) {
      if (!e) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t, " in an <Elements> provider."));
      return e;
    },
    L = function (e) {
      var n = e.stripe,
        r = e.options,
        o = e.children,
        i = t.useMemo(function () {
          return j(n);
        }, [n]),
        a = t.useState(function () {
          return {
            stripe: "sync" === i.tag ? i.stripe : null,
            elements: "sync" === i.tag ? i.stripe.elements(r) : null
          };
        }),
        s = d(a, 2),
        c = s[0],
        u = s[1];
      t.useEffect(function () {
        var e = !0,
          t = function (e) {
            u(function (t) {
              return t.stripe ? t : {
                stripe: e,
                elements: e.elements(r)
              };
            });
          };
        return "async" !== i.tag || c.stripe ? "sync" !== i.tag || c.stripe || t(i.stripe) : i.stripePromise.then(function (n) {
          n && e && t(n);
        }), function () {
          e = !1;
        };
      }, [i, c, r]);
      var l = b(n);
      t.useEffect(function () {
        null !== l && l !== n && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
      }, [l, n]);
      var f = b(r);
      return t.useEffect(function () {
        if (c.elements) {
          var e = k(r, f, ["clientSecret", "fonts"]);
          e && c.elements.update(e);
        }
      }, [r, f, c.elements]), t.useEffect(function () {
        var e = c.stripe;
        e && e._registerWrapper && e.registerAppInfo && (e._registerWrapper({
          name: "react-stripe-js",
          version: "1.12.0"
        }), e.registerAppInfo({
          name: "react-stripe-js",
          version: "1.12.0",
          url: "https://stripe.com/docs/stripe-js/react"
        }));
      }, [c.stripe]), t.createElement(P.Provider, {
        value: c
      }, o);
    };
  L.propTypes = {
    stripe: c.any,
    options: c.object
  };
  var N = function (e) {
      var n = t.useContext(P);
      return T(n, e);
    },
    M = function () {
      var e = N("calls useElements()"),
        t = e.elements;
      return t;
    },
    A = function () {
      var e = N("calls useStripe()"),
        t = e.stripe;
      return t;
    },
    D = function (e) {
      var t = e.children,
        n = N("mounts <ElementsConsumer>");
      return t(n);
    };
  D.propTypes = {
    children: c.func.isRequired
  };
  var I = function (e) {
      var n = t.useRef(e);
      return t.useEffect(function () {
        n.current = e;
      }, [e]), function () {
        n.current && n.current.apply(n, arguments);
      };
    },
    R = function () {},
    F = function (e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
    V = function (e, n) {
      var r = "".concat(F(e), "Element"),
        o = function (n) {
          var o = n.id,
            i = n.className,
            a = n.options,
            s = void 0 === a ? {} : a,
            c = n.onBlur,
            u = void 0 === c ? R : c,
            l = n.onFocus,
            f = void 0 === l ? R : l,
            p = n.onReady,
            d = void 0 === p ? R : p,
            h = n.onChange,
            m = void 0 === h ? R : h,
            v = n.onEscape,
            y = void 0 === v ? R : v,
            g = n.onClick,
            w = void 0 === g ? R : g,
            x = n.onLoadError,
            O = void 0 === x ? R : x,
            E = n.onLoaderStart,
            _ = void 0 === E ? R : E,
            S = n.onNetworksChange,
            C = void 0 === S ? R : S,
            j = N("mounts <".concat(r, ">")),
            P = j.elements,
            T = t.useRef(null),
            L = t.useRef(null),
            M = I(d),
            A = I(u),
            D = I(f),
            F = I(w),
            V = I(m),
            z = I(y),
            B = I(O),
            W = I(_),
            U = I(C);
          t.useLayoutEffect(function () {
            if (null == T.current && P && null != L.current) {
              var t = P.create(e, s);
              T.current = t, t.mount(L.current), t.on("ready", function () {
                return M(t);
              }), t.on("change", V), t.on("blur", A), t.on("focus", D), t.on("escape", z), t.on("loaderror", B), t.on("loaderstart", W), t.on("networkschange", U), t.on("click", F);
            }
          });
          var q = b(s);
          return t.useEffect(function () {
            if (T.current) {
              var e = k(s, q, ["paymentRequest"]);
              e && T.current.update(e);
            }
          }, [s, q]), t.useLayoutEffect(function () {
            return function () {
              T.current && (T.current.destroy(), T.current = null);
            };
          }, []), t.createElement("div", {
            id: o,
            className: i,
            ref: L
          });
        },
        i = function (e) {
          N("mounts <".concat(r, ">"));
          var n = e.id,
            o = e.className;
          return t.createElement("div", {
            id: n,
            className: o
          });
        },
        a = n ? i : o;
      return a.propTypes = {
        id: c.string,
        className: c.string,
        onChange: c.func,
        onBlur: c.func,
        onFocus: c.func,
        onReady: c.func,
        onClick: c.func,
        onLoadError: c.func,
        onLoaderStart: c.func,
        onNetworksChange: c.func,
        options: c.object
      }, a.displayName = r, a.__elementType = e, a;
    },
    z = "undefined" === typeof window,
    B = V("auBankAccount", z),
    W = V("card", z),
    U = V("cardNumber", z),
    q = V("cardExpiry", z),
    H = V("cardCvc", z),
    Y = V("fpxBank", z),
    G = V("iban", z),
    K = V("idealBank", z),
    Z = V("p24Bank", z),
    Q = V("epsBank", z),
    X = V("payment", z),
    J = V("paymentRequestButton", z),
    $ = V("linkAuthentication", z),
    ee = V("address", z),
    te = V("shippingAddress", z),
    ne = V("paymentMethodMessaging", z),
    re = V("affirmMessage", z),
    oe = V("afterpayClearpayMessage", z);
  e.AddressElement = ee, e.AffirmMessageElement = re, e.AfterpayClearpayMessageElement = oe, e.AuBankAccountElement = B, e.CardCvcElement = H, e.CardElement = W, e.CardExpiryElement = q, e.CardNumberElement = U, e.Elements = L, e.ElementsConsumer = D, e.EpsBankElement = Q, e.FpxBankElement = Y, e.IbanElement = G, e.IdealBankElement = K, e.LinkAuthenticationElement = $, e.P24BankElement = Z, e.PaymentElement = X, e.PaymentMethodMessagingElement = ne, e.PaymentRequestButtonElement = J, e.ShippingAddressElement = te, e.useElements = M, e.useStripe = A, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});
