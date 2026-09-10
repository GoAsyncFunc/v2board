let legacyModule = module,
  legacyExports = exports;
(function (e, n) {
  n(legacyExports);
})(0, function (e) {
  "use strict";

  var t = function () {
    return t = Object.assign || function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      return e;
    }, t.apply(this, arguments);
  };
  function n(e, t, n, r) {
    function i(e) {
      return e instanceof n ? e : new n(function (t) {
        t(e);
      });
    }
    return new (n || (n = Promise))(function (n, o) {
      function a(e) {
        try {
          l(r.next(e));
        } catch (e) {
          o(e);
        }
      }
      function s(e) {
        try {
          l(r["throw"](e));
        } catch (e) {
          o(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : i(e.value).then(a, s);
      }
      l((r = r.apply(e, t || [])).next());
    });
  }
  function r(e, t) {
    var n,
      r,
      i,
      o,
      a = {
        label: 0,
        sent: function () {
          if (1 & i[0]) throw i[1];
          return i[1];
        },
        trys: [],
        ops: []
      };
    return o = {
      next: s(0),
      throw: s(1),
      return: s(2)
    }, "function" === typeof Symbol && (o[Symbol.iterator] = function () {
      return this;
    }), o;
    function s(e) {
      return function (t) {
        return l([e, t]);
      };
    }
    function l(o) {
      if (n) throw new TypeError("Generator is already executing.");
      while (a) try {
        if (n = 1, r && (i = 2 & o[0] ? r["return"] : o[0] ? r["throw"] || ((i = r["return"]) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
        switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
          case 0:
          case 1:
            i = o;
            break;
          case 4:
            return a.label++, {
              value: o[1],
              done: !1
            };
          case 5:
            a.label++, r = o[1], o = [0];
            continue;
          case 7:
            o = a.ops.pop(), a.trys.pop();
            continue;
          default:
            if (i = a.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
              a = 0;
              continue;
            }
            if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
              a.label = o[1];
              break;
            }
            if (6 === o[0] && a.label < i[1]) {
              a.label = i[1], i = o;
              break;
            }
            if (i && a.label < i[2]) {
              a.label = i[2], a.ops.push(o);
              break;
            }
            i[2] && a.ops.pop(), a.trys.pop();
            continue;
        }
        o = t.call(e, a);
      } catch (e) {
        o = [6, e], r = 0;
      } finally {
        n = i = 0;
      }
      if (5 & o[0]) throw o[1];
      return {
        value: o[0] ? o[1] : void 0,
        done: !0
      };
    }
  }
  function i(e) {
    var t = "function" === typeof Symbol && Symbol.iterator,
      n = t && e[t],
      r = 0;
    if (n) return n.call(e);
    if (e && "number" === typeof e.length) return {
      next: function () {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function o(e, t) {
    var n = "function" === typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var r,
      i,
      o = n.call(e),
      a = [];
    try {
      while ((void 0 === t || t-- > 0) && !(r = o.next()).done) a.push(r.value);
    } catch (e) {
      i = {
        error: e
      };
    } finally {
      try {
        r && !r.done && (n = o["return"]) && n.call(o);
      } finally {
        if (i) throw i.error;
      }
    }
    return a;
  }
  function a(e, t, n) {
    if (n || 2 === arguments.length) for (var r, i = 0, o = t.length; i < o; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
    return e.concat(r || t);
  }
  var s = {
      UI_GET_DATA: "ui-get-data",
      UI_GET_ACTIVE_TAB_INFO: "ui-get-active-tab-info",
      UI_SUBSCRIBE_TO_CHANGES: "ui-subscribe-to-changes",
      UI_UNSUBSCRIBE_FROM_CHANGES: "ui-unsubscribe-from-changes",
      UI_CHANGE_SETTINGS: "ui-change-settings",
      UI_SET_THEME: "ui-set-theme",
      UI_SET_SHORTCUT: "ui-set-shortcut",
      UI_TOGGLE_URL: "ui-toggle-url",
      UI_MARK_NEWS_AS_READ: "ui-mark-news-as-read",
      UI_LOAD_CONFIG: "ui-load-config",
      UI_APPLY_DEV_DYNAMIC_THEME_FIXES: "ui-apply-dev-dynamic-theme-fixes",
      UI_RESET_DEV_DYNAMIC_THEME_FIXES: "ui-reset-dev-dynamic-theme-fixes",
      UI_APPLY_DEV_INVERSION_FIXES: "ui-apply-dev-inversion-fixes",
      UI_RESET_DEV_INVERSION_FIXES: "ui-reset-dev-inversion-fixes",
      UI_APPLY_DEV_STATIC_THEMES: "ui-apply-dev-static-themes",
      UI_RESET_DEV_STATIC_THEMES: "ui-reset-dev-static-themes",
      UI_SAVE_FILE: "ui-save-file",
      UI_REQUEST_EXPORT_CSS: "ui-request-export-css",
      BG_CHANGES: "bg-changes",
      BG_ADD_CSS_FILTER: "bg-add-css-filter",
      BG_ADD_STATIC_THEME: "bg-add-static-theme",
      BG_ADD_SVG_FILTER: "bg-add-svg-filter",
      BG_ADD_DYNAMIC_THEME: "bg-add-dynamic-theme",
      BG_EXPORT_CSS: "bg-export-css",
      BG_UNSUPPORTED_SENDER: "bg-unsupported-sender",
      BG_CLEAN_UP: "bg-clean-up",
      BG_RELOAD: "bg-reload",
      BG_FETCH_RESPONSE: "bg-fetch-response",
      BG_UI_UPDATE: "bg-ui-update",
      BG_CSS_UPDATE: "bg-css-update",
      CS_COLOR_SCHEME_CHANGE: "cs-color-scheme-change",
      CS_FRAME_CONNECT: "cs-frame-connect",
      CS_FRAME_FORGET: "cs-frame-forget",
      CS_FRAME_FREEZE: "cs-frame-freeze",
      CS_FRAME_RESUME: "cs-frame-resume",
      CS_EXPORT_CSS_RESPONSE: "cs-export-css-response",
      CS_FETCH: "cs-fetch"
    },
    l = "undefined" === typeof navigator ? "some useragent" : navigator.userAgent.toLowerCase(),
    c = "undefined" === typeof navigator ? "some platform" : navigator.platform.toLowerCase(),
    u = l.includes("chrome") || l.includes("chromium"),
    h = l.includes("thunderbird"),
    f = l.includes("firefox") || h;
  l.includes("vivaldi"), l.includes("yabrowser"), l.includes("opr") || l.includes("opera"), l.includes("edg");
  var d = l.includes("safari") && !u,
    p = c.startsWith("win"),
    m = c.startsWith("mac");
  l.includes("mobile");
  var g = "function" === typeof ShadowRoot,
    v = "function" === typeof MediaQueryList && "function" === typeof MediaQueryList.prototype.addEventListener;
  (function () {
    var e = l.match(/chrom[e|ium]\/([^ ]+)/);
    e && e[1] && e[1];
  })();
  var y = function () {
    try {
      return document.querySelector(":defined"), !0;
    } catch (e) {
      return !1;
    }
  }();
  function b(e, t, i) {
    return n(this, void 0, void 0, function () {
      var n;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return [4, fetch(e, {
              cache: "force-cache",
              credentials: "omit",
              referrer: i
            })];
          case 1:
            if (n = r.sent(), f && "text/css" === t && e.startsWith("moz-extension://") && e.endsWith(".css")) return [2, n];
            if (t && !n.headers.get("Content-Type").startsWith(t)) throw new Error("Mime type mismatch when loading " + e);
            if (!n.ok) throw new Error("Unable to load " + e + " " + n.status + " " + n.statusText);
            return [2, n];
        }
      });
    });
  }
  function w(e, t) {
    return n(this, void 0, void 0, function () {
      var n;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return [4, b(e, t)];
          case 1:
            return n = r.sent(), [4, x(n)];
          case 2:
            return [2, r.sent()];
        }
      });
    });
  }
  function x(e) {
    return n(this, void 0, void 0, function () {
      var t, n;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return [4, e.blob()];
          case 1:
            return t = r.sent(), [4, new Promise(function (e) {
              var n = new FileReader();
              n.onloadend = function () {
                return e(n.result);
              }, n.readAsDataURL(t);
            })];
          case 2:
            return n = r.sent(), [2, n];
        }
      });
    });
  }
  globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.getManifest && globalThis.chrome.runtime.getManifest().manifest_version;
  var _ = function (e) {
      return n(void 0, void 0, void 0, function () {
        return r(this, function (t) {
          return [2, Promise.reject(new Error(["Embedded Dark Reader cannot access a cross-origin resource", e, "Overview your URLs and CORS policies or use", "`DarkReader.setFetchMethod(fetch: (url) => Promise<Response>))`.", "See if using `DarkReader.setFetchMethod(window.fetch)`", "before `DarkReader.enable()` works."].join(" ")))];
        });
      });
    },
    E = _;
  function S(e) {
    E = e || _;
  }
  function k(e) {
    return n(this, void 0, void 0, function () {
      return r(this, function (t) {
        switch (t.label) {
          case 0:
            return [4, E(e)];
          case 1:
            return [2, t.sent()];
        }
      });
    });
  }
  window.chrome || (window.chrome = {}), chrome.runtime || (chrome.runtime = {});
  var C = new Set();
  function O() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return n(this, void 0, void 0, function () {
      var t, n, i, o, a, l, c;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            if (!e[0] || e[0].type !== s.CS_FETCH) return [3, 8];
            t = e[0].id, r.label = 1;
          case 1:
            return r.trys.push([1, 7,, 8]), n = e[0].data, i = n.url, o = n.responseType, [4, k(i)];
          case 2:
            return a = r.sent(), "data-url" !== o ? [3, 4] : [4, x(a)];
          case 3:
            return l = r.sent(), [3, 6];
          case 4:
            return [4, a.text()];
          case 5:
            l = r.sent(), r.label = 6;
          case 6:
            return C.forEach(function (e) {
              return e({
                type: s.BG_FETCH_RESPONSE,
                data: l,
                error: null,
                id: t
              });
            }), [3, 8];
          case 7:
            return c = r.sent(), console.error(c), C.forEach(function (e) {
              return e({
                type: s.BG_FETCH_RESPONSE,
                data: null,
                error: c,
                id: t
              });
            }), [3, 8];
          case 8:
            return [2];
        }
      });
    });
  }
  function T(e) {
    C.add(e);
  }
  if ("function" === typeof chrome.runtime.sendMessage) {
    var L = chrome.runtime.sendMessage;
    chrome.runtime.sendMessage = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      O.apply(void 0, a([], o(e))), L.apply(chrome.runtime, e);
    };
  } else chrome.runtime.sendMessage = O;
  if (chrome.runtime.onMessage || (chrome.runtime.onMessage = {}), "function" === typeof chrome.runtime.onMessage.addListener) {
    var A = chrome.runtime.onMessage.addListener;
    chrome.runtime.onMessage.addListener = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      T.apply(void 0, a([], o(e))), A.apply(chrome.runtime.onMessage, e);
    };
  } else chrome.runtime.onMessage.addListener = T;
  var P = {
      cssFilter: "cssFilter",
      svgFilter: "svgFilter",
      staticTheme: "staticTheme",
      dynamicTheme: "dynamicTheme"
    },
    j = {
      darkScheme: {
        background: "#181a1b",
        text: "#e8e6e3"
      },
      lightScheme: {
        background: "#dcdad7",
        text: "#181a1b"
      }
    },
    M = {
      mode: 1,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      sepia: 0,
      useFont: !1,
      fontFamily: m ? "Helvetica Neue" : p ? "Segoe UI" : "Open Sans",
      textStroke: 0,
      engine: P.dynamicTheme,
      stylesheet: "",
      darkSchemeBackgroundColor: j.darkScheme.background,
      darkSchemeTextColor: j.darkScheme.text,
      lightSchemeBackgroundColor: j.lightScheme.background,
      lightSchemeTextColor: j.lightScheme.text,
      scrollbarColor: m ? "" : "auto",
      selectionColor: "auto",
      styleSystemControls: !0
    };
  function R(e) {
    return null != e.length;
  }
  function N(e, t) {
    var n, r;
    if (R(e)) for (var o = 0, a = e.length; o < a; o++) t(e[o]);else try {
      for (var s = i(e), l = s.next(); !l.done; l = s.next()) {
        var c = l.value;
        t(c);
      }
    } catch (e) {
      n = {
        error: e
      };
    } finally {
      try {
        l && !l.done && (r = s.return) && r.call(s);
      } finally {
        if (n) throw n.error;
      }
    }
  }
  function D(e, t) {
    N(t, function (t) {
      return e.push(t);
    });
  }
  function I(e) {
    for (var t = [], n = 0, r = e.length; n < r; n++) t.push(e[n]);
    return t;
  }
  function $() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  }
  function F() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  }
  function B(e) {
    var t,
      n = !1,
      r = null,
      i = function () {
        for (var i = [], s = 0; s < arguments.length; s++) i[s] = arguments[s];
        t = i, r ? n = !0 : (e.apply(void 0, a([], o(t))), r = requestAnimationFrame(function () {
          r = null, n && (e.apply(void 0, a([], o(t))), n = !1);
        }));
      },
      s = function () {
        cancelAnimationFrame(r), n = !1, r = null;
      };
    return Object.assign(i, {
      cancel: s
    });
  }
  function V() {
    var e = [],
      t = null;
    function n() {
      var n;
      while (n = e.shift()) n();
      t = null;
    }
    function r(r) {
      e.push(r), t || (t = requestAnimationFrame(n));
    }
    function i() {
      e.splice(0), cancelAnimationFrame(t), t = null;
    }
    return {
      add: r,
      cancel: i
    };
  }
  function W(e) {
    var t = 0;
    return e.seconds && (t += 1e3 * e.seconds), e.minutes && (t += 60 * e.minutes * 1e3), e.hours && (t += 60 * e.hours * 60 * 1e3), e.days && (t += 24 * e.days * 60 * 60 * 1e3), t;
  }
  function H(e) {
    e && e.parentNode && e.parentNode.removeChild(e);
  }
  function U(e, t, n) {
    void 0 === n && (n = Function.prototype);
    var r = 10,
      i = W({
        seconds: 2
      }),
      o = W({
        seconds: 10
      }),
      a = e.previousSibling,
      s = e.parentNode;
    if (!s) throw new Error("Unable to watch for node position: parent element not found");
    if ("prev-sibling" === t && !a) throw new Error("Unable to watch for node position: there is no previous sibling");
    var l = 0,
      c = null,
      u = null,
      h = B(function () {
        if (!u) {
          l++;
          var d = Date.now();
          if (null == c) c = d;else if (l >= r) {
            if (d - c < o) return F("Node position watcher paused: retry in " + i + "ms", e, a), void (u = setTimeout(function () {
              c = null, l = 0, u = null, h();
            }, i));
            c = d, l = 1;
          }
          if ("parent" === t && a && a.parentNode !== s) return F("Unable to restore node position: sibling parent changed", e, a, s), void p();
          if ("prev-sibling" === t) {
            if (null == a.parentNode) return F("Unable to restore node position: sibling was removed", e, a, s), void p();
            a.parentNode !== s && (F("Style was moved to another parent", e, a, s), g(a.parentNode));
          }
          F("Restoring node position", e, a, s), s.insertBefore(e, a ? a.nextSibling : s.firstChild), f.takeRecords(), n && n();
        }
      }),
      f = new MutationObserver(function () {
        ("parent" === t && e.parentNode !== s || "prev-sibling" === t && e.previousSibling !== a) && h();
      }),
      d = function () {
        f.observe(s, {
          childList: !0
        });
      },
      p = function () {
        clearTimeout(u), f.disconnect(), h.cancel();
      },
      m = function () {
        f.takeRecords();
      },
      g = function (e) {
        s = e, p(), d();
      };
    return d(), {
      run: d,
      stop: p,
      skip: m
    };
  }
  function z(e, t) {
    if (null != e) for (var n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
        acceptNode: function (e) {
          return null == e.shadowRoot ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
        }
      }), r = e.shadowRoot ? n.currentNode : n.nextNode(); null != r; r = n.nextNode()) t(r), z(r.shadowRoot, t);
  }
  function G() {
    return "complete" === document.readyState || "interactive" === document.readyState;
  }
  var q = new Set();
  function K(e) {
    q.add(e);
  }
  function Y(e) {
    q.delete(e);
  }
  function X() {
    return "complete" === document.readyState;
  }
  var Q = new Set();
  function Z(e) {
    Q.add(e);
  }
  function J() {
    Q.clear();
  }
  if (!G()) {
    var ee = function () {
      G() && (q.forEach(function (e) {
        return e();
      }), q.clear(), X() && (document.removeEventListener("readystatechange", ee), Q.forEach(function (e) {
        return e();
      }), Q.clear()));
    };
    document.addEventListener("readystatechange", ee);
  }
  var te = 1e3;
  function ne(e) {
    if (e.length > te) return !0;
    for (var t = 0, n = 0; n < e.length; n++) if (t += e[n].addedNodes.length, t > te) return !0;
    return !1;
  }
  function re(e) {
    var t = new Set(),
      n = new Set(),
      r = new Set();
    e.forEach(function (e) {
      N(e.addedNodes, function (e) {
        e instanceof Element && e.isConnected && t.add(e);
      }), N(e.removedNodes, function (e) {
        e instanceof Element && (e.isConnected ? r.add(e) : n.add(e));
      });
    }), r.forEach(function (e) {
      return t.delete(e);
    });
    var i = [],
      o = [];
    return t.forEach(function (e) {
      t.has(e.parentElement) && i.push(e);
    }), n.forEach(function (e) {
      n.has(e.parentElement) && o.push(e);
    }), i.forEach(function (e) {
      return t.delete(e);
    }), o.forEach(function (e) {
      return n.delete(e);
    }), {
      additions: t,
      moves: r,
      deletions: n
    };
  }
  var ie,
    oe = new Map(),
    ae = new WeakMap();
  function se(e, t) {
    var n, r, i;
    if (oe.has(e)) n = oe.get(e), r = ae.get(n);else {
      var o = !1,
        a = !1;
      n = new MutationObserver(function (t) {
        if (ne(t)) !o || G() ? r.forEach(function (t) {
          var n = t.onHugeMutations;
          return n(e);
        }) : a || (i = function () {
          return r.forEach(function (t) {
            var n = t.onHugeMutations;
            return n(e);
          });
        }, K(i), a = !0), o = !0;else {
          var n = re(t);
          r.forEach(function (e) {
            var t = e.onMinorMutations;
            return t(n);
          });
        }
      }), n.observe(e, {
        childList: !0,
        subtree: !0
      }), oe.set(e, n), r = new Set(), ae.set(n, r);
    }
    return r.add(t), {
      disconnect: function () {
        r.delete(t), i && Y(i), 0 === r.size && (n.disconnect(), ae.delete(n), oe.delete(e));
      }
    };
  }
  var le = new Map();
  function ce(e) {
    return ie || (ie = document.createElement("a")), ie.href = e, ie.href;
  }
  function ue(e, t) {
    void 0 === t && (t = null);
    var n = e + (t ? ";" + t : "");
    if (le.has(n)) return le.get(n);
    if (t) {
      var r = new URL(e, ce(t));
      return le.set(n, r), r;
    }
    var i = new URL(ce(e));
    return le.set(e, i), i;
  }
  function he(e, t) {
    if (t.match(/^data\\?\:/)) return t;
    var n = ue(e),
      r = ue(t, n.href);
    return r.href;
  }
  function fe(e, t, n) {
    N(e, function (e) {
      if (e.selectorText) t(e);else if (e.href) try {
        fe(e.styleSheet.cssRules, t, n);
      } catch (e) {
        $("Found a non-loaded link."), n && n();
      } else if (e.media) {
        var r = Array.from(e.media),
          i = r.some(function (e) {
            return e.startsWith("screen") || e.startsWith("all");
          }),
          o = r.some(function (e) {
            return e.startsWith("print") || e.startsWith("speech");
          });
        !i && o || fe(e.cssRules, t, n);
      } else e.conditionText ? CSS.supports(e.conditionText) && fe(e.cssRules, t, n) : F("CSSRule type not supported", e);
    });
  }
  var de = ["background", "border", "border-color", "border-bottom", "border-left", "border-right", "border-top", "outline", "outline-color"],
    pe = d ? de.map(function (e) {
      var t = new RegExp(e + ":\\s*(.*?)\\s*;");
      return [e, t];
    }) : null;
  function me(e, t) {
    N(e, function (n) {
      var r = e.getPropertyValue(n).trim();
      r && t(n, r);
    });
    var n = e.cssText;
    n.includes("var(") && (d ? pe.forEach(function (e) {
      var r = o(e, 2),
        i = r[0],
        a = r[1],
        s = n.match(a);
      if (s && s[1]) {
        var l = s[1].trim();
        t(i, l);
      }
    }) : de.forEach(function (n) {
      var r = e.getPropertyValue(n);
      r && r.includes("var(") && t(n, r);
    }));
  }
  var ge = /url\((('.+?')|(".+?")|([^\)]*?))\)/g,
    ve = /@import\s*(url\()?(('.+?')|(".+?")|([^\)]*?))\)?;?/g;
  function ye(e) {
    return e.replace(/^url\((.*)\)$/, "$1").replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
  }
  function be(e) {
    var t = ue(e);
    return "" + t.origin + t.pathname.replace(/\?.*$/, "").replace(/(\/)([^\/]+)$/i, "$1");
  }
  function we(e, t) {
    return e.replace(ge, function (e) {
      var n = ye(e);
      return 'url("' + he(t, n) + '")';
    });
  }
  var xe = /\/\*[\s\S]*?\*\//g;
  function _e(e) {
    return e.replace(xe, "");
  }
  var Ee = /@font-face\s*{[^}]*}/g;
  function Se(e) {
    return e.replace(Ee, "");
  }
  function ke(e) {
    var t = e.h,
      n = e.s,
      r = e.l,
      i = e.a,
      a = void 0 === i ? 1 : i;
    if (0 === n) {
      var s = o([r, r, r].map(function (e) {
          return Math.round(255 * e);
        }), 3),
        l = s[0],
        c = s[1],
        u = s[2];
      return {
        r: l,
        g: u,
        b: c,
        a: a
      };
    }
    var h = (1 - Math.abs(2 * r - 1)) * n,
      f = h * (1 - Math.abs(t / 60 % 2 - 1)),
      d = r - h / 2,
      p = o((t < 60 ? [h, f, 0] : t < 120 ? [f, h, 0] : t < 180 ? [0, h, f] : t < 240 ? [0, f, h] : t < 300 ? [f, 0, h] : [h, 0, f]).map(function (e) {
        return Math.round(255 * (e + d));
      }), 3),
      m = p[0],
      g = p[1],
      v = p[2];
    return {
      r: m,
      g: g,
      b: v,
      a: a
    };
  }
  function Ce(e) {
    var t = e.r,
      n = e.g,
      r = e.b,
      i = e.a,
      o = void 0 === i ? 1 : i,
      a = t / 255,
      s = n / 255,
      l = r / 255,
      c = Math.max(a, s, l),
      u = Math.min(a, s, l),
      h = c - u,
      f = (c + u) / 2;
    if (0 === h) return {
      h: 0,
      s: 0,
      l: f,
      a: o
    };
    var d = 60 * (c === a ? (s - l) / h % 6 : c === s ? (l - a) / h + 2 : (a - s) / h + 4);
    d < 0 && (d += 360);
    var p = h / (1 - Math.abs(2 * f - 1));
    return {
      h: d,
      s: p,
      l: f,
      a: o
    };
  }
  function Oe(e, t) {
    void 0 === t && (t = 0);
    var n = e.toFixed(t);
    if (0 === t) return n;
    var r = n.indexOf(".");
    if (r >= 0) {
      var i = n.match(/0+$/);
      if (i) return i.index === r + 1 ? n.substring(0, r) : n.substring(0, i.index);
    }
    return n;
  }
  function Te(e) {
    var t = e.r,
      n = e.g,
      r = e.b,
      i = e.a;
    return null != i && i < 1 ? "rgba(" + Oe(t) + ", " + Oe(n) + ", " + Oe(r) + ", " + Oe(i, 2) + ")" : "rgb(" + Oe(t) + ", " + Oe(n) + ", " + Oe(r) + ")";
  }
  function Le(e) {
    var t = e.r,
      n = e.g,
      r = e.b,
      i = e.a;
    return "#" + (null != i && i < 1 ? [t, n, r, Math.round(255 * i)] : [t, n, r]).map(function (e) {
      return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");
  }
  function Ae(e) {
    var t = e.h,
      n = e.s,
      r = e.l,
      i = e.a;
    return null != i && i < 1 ? "hsla(" + Oe(t) + ", " + Oe(100 * n) + "%, " + Oe(100 * r) + "%, " + Oe(i, 2) + ")" : "hsl(" + Oe(t) + ", " + Oe(100 * n) + "%, " + Oe(100 * r) + "%)";
  }
  var Pe = /^rgba?\([^\(\)]+\)$/,
    je = /^hsla?\([^\(\)]+\)$/,
    Me = /^#[0-9a-f]+$/i;
  function Re(e) {
    var t = e.trim().toLowerCase();
    if (t.match(Pe)) return Fe(t);
    if (t.match(je)) return He(t);
    if (t.match(Me)) return Ue(t);
    if (qe.has(t)) return ze(t);
    if (Ke.has(t)) return Ge(t);
    if ("transparent" === e) return {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
    throw new Error("Unable to parse " + e);
  }
  function Ne(e, t, n, r) {
    var i = e.split(t).filter(function (e) {
        return e;
      }),
      a = Object.entries(r),
      s = i.map(function (e) {
        return e.trim();
      }).map(function (e, t) {
        var r,
          i = a.find(function (t) {
            var n = o(t, 1),
              r = n[0];
            return e.endsWith(r);
          });
        return r = i ? parseFloat(e.substring(0, e.length - i[0].length)) / i[1] * n[t] : parseFloat(e), n[t] > 1 ? Math.round(r) : r;
      });
    return s;
  }
  var De = /rgba?|\(|\)|\/|,|\s/gi,
    Ie = [255, 255, 255, 1],
    $e = {
      "%": 100
    };
  function Fe(e) {
    var t = o(Ne(e, De, Ie, $e), 4),
      n = t[0],
      r = t[1],
      i = t[2],
      a = t[3],
      s = void 0 === a ? 1 : a;
    return {
      r: n,
      g: r,
      b: i,
      a: s
    };
  }
  var Be = /hsla?|\(|\)|\/|,|\s/gi,
    Ve = [360, 1, 1, 1],
    We = {
      "%": 100,
      deg: 360,
      rad: 2 * Math.PI,
      turn: 1
    };
  function He(e) {
    var t = o(Ne(e, Be, Ve, We), 4),
      n = t[0],
      r = t[1],
      i = t[2],
      a = t[3],
      s = void 0 === a ? 1 : a;
    return ke({
      h: n,
      s: r,
      l: i,
      a: s
    });
  }
  function Ue(e) {
    var t = e.substring(1);
    switch (t.length) {
      case 3:
      case 4:
        var n = o([0, 1, 2].map(function (e) {
            return parseInt("" + t[e] + t[e], 16);
          }), 3),
          r = n[0],
          i = n[1],
          a = n[2],
          s = 3 === t.length ? 1 : parseInt("" + t[3] + t[3], 16) / 255;
        return {
          r: r,
          g: i,
          b: a,
          a: s
        };
      case 6:
      case 8:
        var l = o([0, 2, 4].map(function (e) {
          return parseInt(t.substring(e, e + 2), 16);
        }), 3);
        r = l[0], i = l[1], a = l[2], s = 6 === t.length ? 1 : parseInt(t.substring(6, 8), 16) / 255;
        return {
          r: r,
          g: i,
          b: a,
          a: s
        };
    }
    throw new Error("Unable to parse " + e);
  }
  function ze(e) {
    var t = qe.get(e);
    return {
      r: t >> 16 & 255,
      g: t >> 8 & 255,
      b: t >> 0 & 255,
      a: 1
    };
  }
  function Ge(e) {
    var t = Ke.get(e);
    return {
      r: t >> 16 & 255,
      g: t >> 8 & 255,
      b: t >> 0 & 255,
      a: 1
    };
  }
  var qe = new Map(Object.entries({
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgrey: 11119017,
      darkgreen: 25600,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      grey: 8421504,
      green: 32768,
      greenyellow: 11403055,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgrey: 13882323,
      lightgreen: 9498256,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    })),
    Ke = new Map(Object.entries({
      ActiveBorder: 3906044,
      ActiveCaption: 0,
      AppWorkspace: 11184810,
      Background: 6513614,
      ButtonFace: 16777215,
      ButtonHighlight: 15329769,
      ButtonShadow: 10461343,
      ButtonText: 0,
      CaptionText: 0,
      GrayText: 8355711,
      Highlight: 11720703,
      HighlightText: 0,
      InactiveBorder: 16777215,
      InactiveCaption: 16777215,
      InactiveCaptionText: 0,
      InfoBackground: 16514245,
      InfoText: 0,
      Menu: 16185078,
      MenuText: 16777215,
      Scrollbar: 11184810,
      ThreeDDarkShadow: 0,
      ThreeDFace: 12632256,
      ThreeDHighlight: 16777215,
      ThreeDLightShadow: 16777215,
      ThreeDShadow: 0,
      Window: 15527148,
      WindowFrame: 11184810,
      WindowText: 0,
      "-webkit-focus-ring-color": 15046400
    }).map(function (e) {
      var t = o(e, 2),
        n = t[0],
        r = t[1];
      return [n.toLowerCase(), r];
    }));
  function Ye(e, t, n, r, i) {
    return (e - t) * (i - r) / (n - t) + r;
  }
  function Xe(e, t, n) {
    return Math.min(n, Math.max(t, e));
  }
  function Qe(e, t) {
    for (var n = [], r = 0, i = e.length; r < i; r++) {
      n[r] = [];
      for (var o = 0, a = t[0].length; o < a; o++) {
        for (var s = 0, l = 0, c = e[0].length; l < c; l++) s += e[r][l] * t[l][o];
        n[r][o] = s;
      }
    }
    return n;
  }
  function Ze(e, t, n) {
    void 0 === n && (n = 0);
    var r,
      i = [];
    while (r = e.exec(t)) i.push(r[n]);
    return i;
  }
  function Je(e) {
    function t(e) {
      return e.replace(/^\s+/, "");
    }
    function n(e) {
      return 0 === e ? "" : " ".repeat(4 * e);
    }
    if (e.length < 5e4) {
      var r = /[^{}]+{\s*}/;
      while (r.test(e)) e = e.replace(r, "");
    }
    for (var i = e.replace(/\s{2,}/g, " ").replace(/\{/g, "{\n").replace(/\}/g, "\n}\n").replace(/\;(?![^\(|\"]*(\)|\"))/g, ";\n").replace(/\,(?![^\(|\"]*(\)|\"))/g, ",\n").replace(/\n\s*\n/g, "\n").split("\n"), o = 0, a = [], s = 0, l = i.length; s < l; s++) {
      var c = i[s] + "\n";
      c.includes("{") ? a.push(n(o++) + t(c)) : c.includes("}") ? a.push(n(--o) + t(c)) : a.push(n(o) + t(c));
    }
    return a.join("").trim();
  }
  function et(e, t) {
    void 0 === t && (t = 0);
    for (var n = e.length, r = 0, i = -1, o = t; o < n; o++) if (0 === r) {
      var a = e.indexOf("(", o);
      if (a < 0) break;
      i = a, r++, o = a;
    } else {
      var s = e.indexOf(")", o);
      if (s < 0) break;
      a = e.indexOf("(", o);
      if (a < 0 || s < a) {
        if (r--, 0 === r) return {
          start: i,
          end: s + 1
        };
        o = s;
      } else r++, o = a;
    }
    return null;
  }
  function tt(e) {
    var t = rt.identity();
    return 0 !== e.sepia && (t = Qe(t, rt.sepia(e.sepia / 100))), 0 !== e.grayscale && (t = Qe(t, rt.grayscale(e.grayscale / 100))), 100 !== e.contrast && (t = Qe(t, rt.contrast(e.contrast / 100))), 100 !== e.brightness && (t = Qe(t, rt.brightness(e.brightness / 100))), 1 === e.mode && (t = Qe(t, rt.invertNHue())), t;
  }
  function nt(e, t) {
    var n = o(e, 3),
      r = n[0],
      i = n[1],
      a = n[2],
      s = [[r / 255], [i / 255], [a / 255], [1], [1]],
      l = Qe(t, s);
    return [0, 1, 2].map(function (e) {
      return Xe(Math.round(255 * l[e][0]), 0, 255);
    });
  }
  var rt = {
    identity: function () {
      return [[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
    },
    invertNHue: function () {
      return [[.333, -.667, -.667, 0, 1], [-.667, .333, -.667, 0, 1], [-.667, -.667, .333, 0, 1], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
    },
    brightness: function (e) {
      return [[e, 0, 0, 0, 0], [0, e, 0, 0, 0], [0, 0, e, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
    },
    contrast: function (e) {
      var t = (1 - e) / 2;
      return [[e, 0, 0, 0, t], [0, e, 0, 0, t], [0, 0, e, 0, t], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
    },
    sepia: function (e) {
      return [[.393 + .607 * (1 - e), .769 - .769 * (1 - e), .189 - .189 * (1 - e), 0, 0], [.349 - .349 * (1 - e), .686 + .314 * (1 - e), .168 - .168 * (1 - e), 0, 0], [.272 - .272 * (1 - e), .534 - .534 * (1 - e), .131 + .869 * (1 - e), 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
    },
    grayscale: function (e) {
      return [[.2126 + .7874 * (1 - e), .7152 - .7152 * (1 - e), .0722 - .0722 * (1 - e), 0, 0], [.2126 - .2126 * (1 - e), .7152 + .2848 * (1 - e), .0722 - .0722 * (1 - e), 0, 0], [.2126 - .2126 * (1 - e), .7152 - .7152 * (1 - e), .0722 + .9278 * (1 - e), 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];
    }
  };
  function it(e) {
    var t = 1 === e.mode,
      n = t ? "darkSchemeBackgroundColor" : "lightSchemeBackgroundColor";
    return e[n];
  }
  function ot(e) {
    var t = 1 === e.mode,
      n = t ? "darkSchemeTextColor" : "lightSchemeTextColor";
    return e[n];
  }
  var at = new Map(),
    st = new Map();
  function lt(e) {
    if (st.has(e)) return st.get(e);
    var t = Re(e),
      n = Ce(t);
    return st.set(e, n), n;
  }
  function ct() {
    at.clear(), st.clear();
  }
  var ut = ["r", "g", "b", "a"],
    ht = ["mode", "brightness", "contrast", "grayscale", "sepia", "darkSchemeBackgroundColor", "darkSchemeTextColor", "lightSchemeBackgroundColor", "lightSchemeTextColor"];
  function ft(e, t) {
    return ut.map(function (t) {
      return e[t];
    }).concat(ht.map(function (e) {
      return t[e];
    })).join(";");
  }
  function dt(e, t, n, r, i) {
    var a;
    at.has(n) ? a = at.get(n) : (a = new Map(), at.set(n, a));
    var s = ft(e, t);
    if (a.has(s)) return a.get(s);
    var l = Ce(e),
      c = null == r ? null : lt(r),
      u = null == i ? null : lt(i),
      h = n(l, c, u),
      f = ke(h),
      d = f.r,
      p = f.g,
      m = f.b,
      g = f.a,
      v = tt(t),
      y = o(nt([d, p, m], v), 3),
      b = y[0],
      w = y[1],
      x = y[2],
      _ = 1 === g ? Le({
        r: b,
        g: w,
        b: x
      }) : Te({
        r: b,
        g: w,
        b: x,
        a: g
      });
    return a.set(s, _), _;
  }
  function pt(e) {
    return e;
  }
  function mt(e, t) {
    return dt(e, t, pt);
  }
  function gt(e, t) {
    var n = it(t),
      r = ot(t);
    return dt(e, t, vt, r, n);
  }
  function vt(e, t, n) {
    var r,
      i = e.h,
      o = e.s,
      a = e.l,
      s = e.a,
      l = a < .5;
    if (l) r = a < .2 || o < .12;else {
      var c = i > 200 && i < 280;
      r = o < .24 || a > .8 && c;
    }
    var u = i,
      h = a;
    r && (l ? (u = t.h, h = t.s) : (u = n.h, h = n.s));
    var f = Ye(a, 0, 1, t.l, n.l);
    return {
      h: u,
      s: h,
      l: f,
      a: s
    };
  }
  var yt = .4;
  function bt(e, t) {
    var n = e.h,
      r = e.s,
      i = e.l,
      o = e.a,
      a = i < .5,
      s = n > 200 && n < 280,
      l = r < .12 || i > .8 && s;
    if (a) {
      var c = Ye(i, 0, .5, 0, yt);
      if (l) {
        var u = t.h,
          h = t.s;
        return {
          h: u,
          s: h,
          l: c,
          a: o
        };
      }
      return {
        h: n,
        s: r,
        l: c,
        a: o
      };
    }
    var f = Ye(i, .5, 1, yt, t.l);
    if (l) {
      var d = t.h;
      h = t.s;
      return {
        h: d,
        s: h,
        l: f,
        a: o
      };
    }
    var p = n,
      m = n > 60 && n < 180;
    if (m) {
      var g = n > 120;
      p = g ? Ye(n, 120, 180, 135, 180) : Ye(n, 60, 120, 60, 105);
    }
    return {
      h: p,
      s: r,
      l: f,
      a: o
    };
  }
  function wt(e, n) {
    if (0 === n.mode) return gt(e, n);
    var r = it(n);
    return dt(e, t(t({}, n), {
      mode: 0
    }), bt, r);
  }
  var xt,
    _t = .55;
  function Et(e) {
    return Ye(e, 205, 245, 205, 220);
  }
  function St(e, t) {
    var n = e.h,
      r = e.s,
      i = e.l,
      o = e.a,
      a = i > .5,
      s = i < .2 || r < .24,
      l = !s && n > 205 && n < 245;
    if (a) {
      var c = Ye(i, .5, 1, _t, t.l);
      if (s) {
        var u = t.h,
          h = t.s;
        return {
          h: u,
          s: h,
          l: c,
          a: o
        };
      }
      var f = n;
      return l && (f = Et(n)), {
        h: f,
        s: r,
        l: c,
        a: o
      };
    }
    if (s) {
      var d = t.h,
        p = (h = t.s, Ye(i, 0, .5, t.l, _t));
      return {
        h: d,
        s: h,
        l: p,
        a: o
      };
    }
    var m,
      g = n;
    return l ? (g = Et(n), m = Ye(i, 0, .5, t.l, Math.min(1, _t + .05))) : m = Ye(i, 0, .5, t.l, _t), {
      h: g,
      s: r,
      l: m,
      a: o
    };
  }
  function kt(e, n) {
    if (0 === n.mode) return gt(e, n);
    var r = ot(n);
    return dt(e, t(t({}, n), {
      mode: 0
    }), St, r);
  }
  function Ct(e, t, n) {
    var r = e.h,
      i = e.s,
      o = e.l,
      a = e.a,
      s = o < .5,
      l = o < .2 || i < .24,
      c = r,
      u = i;
    l && (s ? (c = t.h, u = t.s) : (c = n.h, u = n.s));
    var h = Ye(o, 0, 1, .5, .2);
    return {
      h: c,
      s: u,
      l: h,
      a: a
    };
  }
  function Ot(e, n) {
    if (0 === n.mode) return gt(e, n);
    var r = ot(n),
      i = it(n);
    return dt(e, t(t({}, n), {
      mode: 0
    }), Ct, r, i);
  }
  function Tt(e, t) {
    return wt(e, t);
  }
  function Lt(e, t) {
    return wt(e, t);
  }
  function At(e) {
    var t = [];
    return t.push('*:not(pre, pre *, code, .far, .fa, .glyphicon, [class*="vjs-"], .fab, .fa-github, .fas, .material-icons, .icofont, .typcn, mu, [class*="mu-"], .glyphicon, .icon) {'), e.useFont && e.fontFamily && t.push("  font-family: " + e.fontFamily + " !important;"), e.textStroke > 0 && (t.push("  -webkit-text-stroke: " + e.textStroke + "px !important;"), t.push("  text-stroke: " + e.textStroke + "px !important;")), t.push("}"), t.join("\n");
  }
  function Pt(e) {
    var t = [];
    return e.mode === xt.dark && t.push("invert(100%) hue-rotate(180deg)"), 100 !== e.brightness && t.push("brightness(" + e.brightness + "%)"), 100 !== e.contrast && t.push("contrast(" + e.contrast + "%)"), 0 !== e.grayscale && t.push("grayscale(" + e.grayscale + "%)"), 0 !== e.sepia && t.push("sepia(" + e.sepia + "%)"), 0 === t.length ? null : t.join(" ");
  }
  function jt(e) {
    return e.slice(0, 4).map(function (e) {
      return e.map(function (e) {
        return e.toFixed(3);
      }).join(" ");
    }).join(" ");
  }
  function Mt(e) {
    return jt(tt(e));
  }
  (function (e) {
    e[e["light"] = 0] = "light", e[e["dark"] = 1] = "dark";
  })(xt || (xt = {}));
  var Rt = 0,
    Nt = new Map(),
    Dt = new Map();
  function It(e) {
    return n(this, void 0, void 0, function () {
      return r(this, function (t) {
        return [2, new Promise(function (t, n) {
          var r = ++Rt;
          Nt.set(r, t), Dt.set(r, n), chrome.runtime.sendMessage({
            type: s.CS_FETCH,
            data: e,
            id: r
          });
        })];
      });
    });
  }
  chrome.runtime.onMessage.addListener(function (e) {
    var t = e.type,
      n = e.data,
      r = e.error,
      i = e.id;
    if (t === s.BG_FETCH_RESPONSE) {
      var o = Nt.get(i),
        a = Dt.get(i);
      Nt.delete(i), Dt.delete(i), r ? a && a(r) : o && o(n);
    }
  });
  var $t = function () {
      function e() {
        this.queue = [], this.timerId = null, this.frameDuration = 1e3 / 60;
      }
      return e.prototype.addToQueue = function (e) {
        this.queue.push(e), this.startQueue();
      }, e.prototype.stopQueue = function () {
        null !== this.timerId && (cancelAnimationFrame(this.timerId), this.timerId = null), this.queue = [];
      }, e.prototype.startQueue = function () {
        var e = this;
        this.timerId || (this.timerId = requestAnimationFrame(function () {
          e.timerId = null;
          var t,
            n = Date.now();
          while (t = e.queue.shift()) if (t(), Date.now() - n >= e.frameDuration) {
            e.startQueue();
            break;
          }
        }));
      }, e;
    }(),
    Ft = new $t();
  function Bt(e) {
    return n(this, void 0, void 0, function () {
      var i = this;
      return r(this, function (o) {
        return [2, new Promise(function (o, a) {
          return n(i, void 0, void 0, function () {
            var n, i, s, l;
            return r(this, function (r) {
              switch (r.label) {
                case 0:
                  return e.startsWith("data:") ? (n = e, [3, 4]) : [3, 1];
                case 1:
                  return r.trys.push([1, 3,, 4]), [4, Vt(e)];
                case 2:
                  return n = r.sent(), [3, 4];
                case 3:
                  return i = r.sent(), a(i), [3, 4];
                case 4:
                  return r.trys.push([4, 6,, 7]), [4, Wt(n)];
                case 5:
                  return s = r.sent(), Ft.addToQueue(function () {
                    o(t({
                      src: e,
                      dataURL: n,
                      width: s.naturalWidth,
                      height: s.naturalHeight
                    }, Yt(s)));
                  }), [3, 7];
                case 6:
                  return l = r.sent(), a(l), [3, 7];
                case 7:
                  return [2];
              }
            });
          });
        })];
      });
    });
  }
  function Vt(e) {
    return n(this, void 0, void 0, function () {
      var t;
      return r(this, function (n) {
        switch (n.label) {
          case 0:
            return t = new URL(e), t.origin !== location.origin ? [3, 2] : [4, w(e)];
          case 1:
            return [2, n.sent()];
          case 2:
            return [4, It({
              url: e,
              responseType: "data-url"
            })];
          case 3:
            return [2, n.sent()];
        }
      });
    });
  }
  function Wt(e) {
    return n(this, void 0, void 0, function () {
      return r(this, function (t) {
        return [2, new Promise(function (t, n) {
          var r = new Image();
          r.onload = function () {
            return t(r);
          }, r.onerror = function () {
            return n("Unable to load image " + e);
          }, r.src = e;
        })];
      });
    });
  }
  var Ht,
    Ut,
    zt = 1024;
  function Gt() {
    var e = zt,
      t = zt;
    Ht = document.createElement("canvas"), Ht.width = e, Ht.height = t, Ut = Ht.getContext("2d"), Ut.imageSmoothingEnabled = !1;
  }
  function qt() {
    Ht = null, Ut = null;
  }
  var Kt = 5242880;
  function Yt(e) {
    Ht || Gt();
    var t = e.naturalWidth,
      n = e.naturalHeight;
    if (0 === n || 0 === t) return F("logWarn(Image is empty " + e.currentSrc + ")"), null;
    var r = t * n * 4;
    if (r > Kt) return $("Skipped large image analyzing(Larger than 5mb in memory)"), {
      isDark: !1,
      isLight: !1,
      isTransparent: !1,
      isLarge: !1,
      isTooLarge: !0
    };
    var i = t * n,
      o = Math.min(1, Math.sqrt(zt / i)),
      a = Math.ceil(t * o),
      s = Math.ceil(n * o);
    Ut.clearRect(0, 0, a, s), Ut.drawImage(e, 0, 0, t, n, 0, 0, a, s);
    var l,
      c,
      u,
      h,
      f,
      d,
      p,
      m,
      g = Ut.getImageData(0, 0, a, s),
      v = g.data,
      y = .05,
      b = .4,
      w = .7,
      x = 0,
      _ = 0,
      E = 0;
    for (u = 0; u < s; u++) for (c = 0; c < a; c++) l = 4 * (u * a + c), h = v[l + 0] / 255, f = v[l + 1] / 255, d = v[l + 2] / 255, p = v[l + 3] / 255, p < y ? x++ : (m = .2126 * h + .7152 * f + .0722 * d, m < b && _++, m > w && E++);
    var S = a * s,
      k = S - x,
      C = .7,
      O = .7,
      T = .1,
      L = 48e4;
    return {
      isDark: _ / k >= C,
      isLight: E / k >= O,
      isTransparent: x / S >= T,
      isLarge: i >= L,
      isTooLarge: !1
    };
  }
  function Xt(e, t) {
    var n = e.dataURL,
      r = e.width,
      i = e.height,
      o = Mt(t),
      a = ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + r + '" height="' + i + '">', "<defs>", '<filter id="darkreader-image-filter">', '<feColorMatrix type="matrix" values="' + o + '" />', "</filter>", "</defs>", '<image width="' + r + '" height="' + i + '" filter="url(#darkreader-image-filter)" xlink:href="' + n + '" />', "</svg>"].join("");
    return "data:image/svg+xml;base64," + btoa(a);
  }
  function Qt() {
    Ft && Ft.stopQueue(), qt();
  }
  function Zt(e, t) {
    return Boolean(e && e.getPropertyPriority(t));
  }
  function Jt(e, t, n, r, i, o) {
    if (e.startsWith("--")) {
      var a = vn(r, e, t, n, i, o);
      if (a) return {
        property: e,
        value: a,
        important: Zt(n.style, e),
        sourceValue: t
      };
    } else if (t.includes("var(")) {
      a = yn(r, e, t);
      if (a) return {
        property: e,
        value: a,
        important: Zt(n.style, e),
        sourceValue: t
      };
    } else if (e.includes("color") && "-webkit-print-color-adjust" !== e || "fill" === e || "stroke" === e || "stop-color" === e) {
      a = un(e, t);
      if (a) return {
        property: e,
        value: a,
        important: Zt(n.style, e),
        sourceValue: t
      };
    } else if ("background-image" === e || "list-style-image" === e) {
      a = mn(t, n, i, o);
      if (a) return {
        property: e,
        value: a,
        important: Zt(n.style, e),
        sourceValue: t
      };
    } else if (e.includes("shadow")) {
      a = gn(t);
      if (a) return {
        property: e,
        value: a,
        important: Zt(n.style, e),
        sourceValue: t
      };
    }
    return null;
  }
  function en(e, t, n) {
    var r = [];
    return t || (r.push("html {"), r.push("    background-color: " + wt({
      r: 255,
      g: 255,
      b: 255
    }, e) + " !important;"), r.push("}")), r.push((t ? "" : "html, body, ") + (n ? "input, textarea, select, button" : "") + " {"), r.push("    background-color: " + wt({
      r: 255,
      g: 255,
      b: 255
    }, e) + ";"), r.push("}"), r.push("html, body, " + (n ? "input, textarea, select, button" : "") + " {"), r.push("    border-color: " + Ot({
      r: 76,
      g: 76,
      b: 76
    }, e) + ";"), r.push("    color: " + kt({
      r: 0,
      g: 0,
      b: 0
    }, e) + ";"), r.push("}"), r.push("a {"), r.push("    color: " + kt({
      r: 0,
      g: 64,
      b: 255
    }, e) + ";"), r.push("}"), r.push("table {"), r.push("    border-color: " + Ot({
      r: 128,
      g: 128,
      b: 128
    }, e) + ";"), r.push("}"), r.push("::placeholder {"), r.push("    color: " + kt({
      r: 169,
      g: 169,
      b: 169
    }, e) + ";"), r.push("}"), r.push("input:-webkit-autofill,"), r.push("textarea:-webkit-autofill,"), r.push("select:-webkit-autofill {"), r.push("    background-color: " + wt({
      r: 250,
      g: 255,
      b: 189
    }, e) + " !important;"), r.push("    color: " + kt({
      r: 0,
      g: 0,
      b: 0
    }, e) + " !important;"), r.push("}"), e.scrollbarColor && r.push(rn(e)), e.selectionColor && r.push(nn(e)), r.join("\n");
  }
  function tn(e) {
    var n, r;
    if ("auto" === e.selectionColor) n = wt({
      r: 0,
      g: 96,
      b: 212
    }, t(t({}, e), {
      grayscale: 0
    })), r = kt({
      r: 255,
      g: 255,
      b: 255
    }, t(t({}, e), {
      grayscale: 0
    }));else {
      var i = Re(e.selectionColor),
        o = Ce(i);
      n = e.selectionColor, r = o.l < .5 ? "#FFF" : "#000";
    }
    return {
      backgroundColorSelection: n,
      foregroundColorSelection: r
    };
  }
  function nn(e) {
    var t = [],
      n = tn(e),
      r = n.backgroundColorSelection,
      i = n.foregroundColorSelection;
    return ["::selection", "::-moz-selection"].forEach(function (e) {
      t.push(e + " {"), t.push("    background-color: " + r + " !important;"), t.push("    color: " + i + " !important;"), t.push("}");
    }), t.join("\n");
  }
  function rn(e) {
    var n,
      r,
      i,
      o,
      a,
      s,
      l = [];
    if ("auto" === e.scrollbarColor) n = wt({
      r: 241,
      g: 241,
      b: 241
    }, e), r = kt({
      r: 96,
      g: 96,
      b: 96
    }, e), i = wt({
      r: 176,
      g: 176,
      b: 176
    }, e), o = wt({
      r: 144,
      g: 144,
      b: 144
    }, e), a = wt({
      r: 96,
      g: 96,
      b: 96
    }, e), s = wt({
      r: 255,
      g: 255,
      b: 255
    }, e);else {
      var c = Re(e.scrollbarColor),
        u = Ce(c),
        h = u.l > .5,
        d = function (e) {
          return t(t({}, u), {
            l: Xe(u.l + e, 0, 1)
          });
        },
        p = function (e) {
          return t(t({}, u), {
            l: Xe(u.l - e, 0, 1)
          });
        };
      n = Ae(p(.4)), r = Ae(h ? p(.4) : d(.4)), i = Ae(u), o = Ae(d(.1)), a = Ae(d(.2));
    }
    return l.push("::-webkit-scrollbar {"), l.push("    background-color: " + n + ";"), l.push("    color: " + r + ";"), l.push("}"), l.push("::-webkit-scrollbar-thumb {"), l.push("    background-color: " + i + ";"), l.push("}"), l.push("::-webkit-scrollbar-thumb:hover {"), l.push("    background-color: " + o + ";"), l.push("}"), l.push("::-webkit-scrollbar-thumb:active {"), l.push("    background-color: " + a + ";"), l.push("}"), l.push("::-webkit-scrollbar-corner {"), l.push("    background-color: " + s + ";"), l.push("}"), f && (l.push("* {"), l.push("    scrollbar-color: " + i + " " + n + ";"), l.push("}")), l.join("\n");
  }
  function on(e, t) {
    var n = t.strict,
      r = [];
    return r.push("html, body, " + (n ? "body :not(iframe)" : "body > :not(iframe)") + " {"), r.push("    background-color: " + wt({
      r: 255,
      g: 255,
      b: 255
    }, e) + " !important;"), r.push("    border-color: " + Ot({
      r: 64,
      g: 64,
      b: 64
    }, e) + " !important;"), r.push("    color: " + kt({
      r: 0,
      g: 0,
      b: 0
    }, e) + " !important;"), r.push("}"), r.join("\n");
  }
  var an = new Set(["inherit", "transparent", "initial", "currentcolor", "none", "unset"]),
    sn = new Map();
  function ln(e) {
    if (e = e.trim(), sn.has(e)) return sn.get(e);
    var t = Re(e);
    return sn.set(e, t), t;
  }
  function cn(e) {
    try {
      return ln(e);
    } catch (e) {
      return null;
    }
  }
  function un(e, t) {
    if (an.has(t.toLowerCase())) return t;
    try {
      var n = ln(t);
      return e.includes("background") ? function (e) {
        return wt(n, e);
      } : e.includes("border") || e.includes("outline") ? function (e) {
        return Ot(n, e);
      } : function (e) {
        return kt(n, e);
      };
    } catch (e) {
      return F("Color parse error", e), null;
    }
  }
  var hn = /[\-a-z]+gradient\(([^\(\)]*(\(([^\(\)]*(\(.*?\)))*[^\(\)]*\))){0,15}[^\(\)]*\)/g,
    fn = new Map(),
    dn = new Map();
  function pn(e, t) {
    if (!e || 0 === t.length) return !1;
    if (t.some(function (e) {
      return "*" === e;
    })) return !0;
    for (var n = e.split(/,\s*/g), r = function (e) {
        var r = t[e];
        if (n.some(function (e) {
          return e === r;
        })) return {
          value: !0
        };
      }, i = 0; i < t.length; i++) {
      var o = r(i);
      if ("object" === typeof o) return o.value;
    }
    return !1;
  }
  function mn(e, i, o, a) {
    var s = this;
    try {
      var l = Ze(hn, e),
        c = Ze(ge, e);
      if (0 === c.length && 0 === l.length) return e;
      var u = function (t) {
          var n = 0;
          return t.map(function (t) {
            var r = e.indexOf(t, n);
            return n = r + t.length, {
              match: t,
              index: r
            };
          });
        },
        h = u(c).map(function (e) {
          return t({
            type: "url"
          }, e);
        }).concat(u(l).map(function (e) {
          return t({
            type: "gradient"
          }, e);
        })).sort(function (e, t) {
          return e.index - t.index;
        }),
        f = function (e) {
          var t = e.match(/^(.*-gradient)\((.*)\)$/),
            n = t[1],
            r = t[2],
            i = /([^\(\),]+(\([^\(\)]*(\([^\(\)]*\)*[^\(\)]*)?\))?[^\(\),]*),?/g,
            o = /^(from|color-stop|to)\(([^\(\)]*?,\s*)?(.*?)\)$/,
            a = Ze(i, r, 1).map(function (e) {
              e = e.trim();
              var t = cn(e);
              if (t) return function (e) {
                return Lt(t, e);
              };
              var n = e.lastIndexOf(" ");
              if (t = cn(e.substring(0, n)), t) return function (r) {
                return Lt(t, r) + " " + e.substring(n + 1);
              };
              var r = e.match(o);
              return r && (t = cn(r[3]), t) ? function (e) {
                return r[1] + "(" + (r[2] ? r[2] + ", " : "") + Lt(t, e) + ")";
              } : function () {
                return e;
              };
            });
          return function (e) {
            return n + "(" + a.map(function (t) {
              return t(e);
            }).join(", ") + ")";
          };
        },
        d = function (e) {
          var t;
          if (pn(i.selectorText, o)) return null;
          var l = ye(e),
            c = i.parentStyleSheet,
            u = c && c.href ? be(c.href) : (null === (t = c.ownerNode) || void 0 === t ? void 0 : t.baseURI) || location.origin;
          l = he(u, l);
          var h = 'url("' + l + '")';
          return function (e) {
            return n(s, void 0, void 0, function () {
              var t, n, i, o;
              return r(this, function (r) {
                switch (r.label) {
                  case 0:
                    return fn.has(l) ? (t = fn.get(l), [3, 7]) : [3, 1];
                  case 1:
                    return r.trys.push([1, 6,, 7]), dn.has(l) ? (n = dn.get(l), [4, new Promise(function (e) {
                      return n.push(e);
                    })]) : [3, 3];
                  case 2:
                    return t = r.sent(), t ? [3, 5] : [2, null];
                  case 3:
                    return dn.set(l, []), [4, Bt(l)];
                  case 4:
                    t = r.sent(), fn.set(l, t), dn.get(l).forEach(function (e) {
                      return e(t);
                    }), dn.delete(l), r.label = 5;
                  case 5:
                    return a() ? [2, null] : [3, 7];
                  case 6:
                    return i = r.sent(), F(i), dn.has(l) && (dn.get(l).forEach(function (e) {
                      return e(null);
                    }), dn.delete(l)), [2, h];
                  case 7:
                    return o = p(t, e) || h, [2, o];
                }
              });
            });
          };
        },
        p = function (e, n) {
          var r,
            i = e.isDark,
            o = e.isLight,
            a = e.isTransparent,
            s = e.isLarge,
            l = e.isTooLarge,
            c = e.width;
          if (l) r = 'url("' + e.src + '")';else if (i && a && 1 === n.mode && !s && c > 2) {
            $("Inverting dark image " + e.src);
            var u = Xt(e, t(t({}, n), {
              sepia: Xe(n.sepia + 10, 0, 100)
            }));
            r = 'url("' + u + '")';
          } else if (o && !a && 1 === n.mode) {
            if (s) r = "none";else {
              $("Dimming light image " + e.src);
              var h = Xt(e, n);
              r = 'url("' + h + '")';
            }
          } else if (0 === n.mode && o && !s) {
            $("Applying filter to image " + e.src);
            var f = Xt(e, t(t({}, n), {
              brightness: Xe(n.brightness - 10, 5, 200),
              sepia: Xe(n.sepia + 10, 0, 100)
            }));
            r = 'url("' + f + '")';
          } else r = null;
          return r;
        },
        m = [],
        g = 0;
      return h.forEach(function (t, n) {
        var r = t.match,
          i = t.type,
          o = t.index,
          a = g,
          s = o + r.length;
        g = s, m.push(function () {
          return e.substring(a, o);
        }), m.push("url" === i ? d(r) : f(r)), n === h.length - 1 && m.push(function () {
          return e.substring(s);
        });
      }), function (e) {
        var t = m.filter(Boolean).map(function (t) {
          return t(e);
        });
        return t.some(function (e) {
          return e instanceof Promise;
        }) ? Promise.all(t).then(function (e) {
          return e.join("");
        }) : t.join("");
      };
    } catch (t) {
      return F("Unable to parse gradient " + e, t), null;
    }
  }
  function gn(e) {
    try {
      var t = 0,
        n = Ze(/(^|\s)([a-z]+\(.+?\)|#[0-9a-f]+|[a-z]+)(.*?(inset|outset)?($|,))/gi, e, 2),
        r = n.map(function (r, i) {
          var o = t,
            a = e.indexOf(r, t),
            s = a + r.length;
          t = s;
          var l = cn(r);
          return l ? function (t) {
            return "" + e.substring(o, a) + Tt(l, t) + (i === n.length - 1 ? e.substring(s) : "");
          } : function () {
            return e.substring(o, s);
          };
        });
      return function (e) {
        return r.map(function (t) {
          return t(e);
        }).join("");
      };
    } catch (t) {
      return F("Unable to parse shadow " + e, t), null;
    }
  }
  function vn(e, t, n, r, i, o) {
    return e.getModifierForVariable({
      varName: t,
      sourceValue: n,
      rule: r,
      ignoredImgSelectors: i,
      isCancelled: o
    });
  }
  function yn(e, t, n) {
    return e.getModifierForVarDependant(t, n);
  }
  function bn() {
    sn.clear(), ct(), fn.clear(), Qt(), dn.clear();
  }
  var wn = 1,
    xn = 2,
    _n = 4,
    En = 8,
    Sn = function () {
      function e() {
        this.varTypes = new Map(), this.rulesQueue = [], this.definedVars = new Set(), this.varRefs = new Map(), this.unknownColorVars = new Set(), this.unknownBgVars = new Set(), this.undefinedVars = new Set(), this.initialVarTypes = new Map(), this.changedTypeVars = new Set(), this.typeChangeSubscriptions = new Map(), this.unstableVarValues = new Map();
      }
      return e.prototype.clear = function () {
        this.varTypes.clear(), this.rulesQueue.splice(0), this.definedVars.clear(), this.varRefs.clear(), this.unknownColorVars.clear(), this.unknownBgVars.clear(), this.undefinedVars.clear(), this.initialVarTypes.clear(), this.changedTypeVars.clear(), this.typeChangeSubscriptions.clear(), this.unstableVarValues.clear();
      }, e.prototype.isVarType = function (e, t) {
        return this.varTypes.has(e) && (this.varTypes.get(e) & t) > 0;
      }, e.prototype.addRulesForMatching = function (e) {
        this.rulesQueue.push(e);
      }, e.prototype.matchVariablesAndDependants = function () {
        var e = this;
        this.changedTypeVars.clear(), this.initialVarTypes = new Map(this.varTypes), this.collectRootVariables(), this.rulesQueue.forEach(function (t) {
          return e.collectVariables(t);
        }), this.rulesQueue.forEach(function (t) {
          return e.collectVarDependants(t);
        }), this.rulesQueue.splice(0), this.collectRootVarDependants(), this.varRefs.forEach(function (t, n) {
          t.forEach(function (t) {
            e.varTypes.has(n) && e.resolveVariableType(t, e.varTypes.get(n));
          });
        }), this.unknownColorVars.forEach(function (t) {
          e.unknownBgVars.has(t) ? (e.unknownColorVars.delete(t), e.unknownBgVars.delete(t), e.resolveVariableType(t, wn)) : e.isVarType(t, wn | xn | _n) ? e.unknownColorVars.delete(t) : e.undefinedVars.add(t);
        }), this.unknownBgVars.forEach(function (t) {
          var n = null != e.findVarRef(t, function (t) {
            return e.unknownColorVars.has(t) || e.isVarType(t, xn | _n);
          });
          n ? e.itarateVarRefs(t, function (t) {
            e.resolveVariableType(t, wn);
          }) : e.isVarType(t, wn | En) ? e.unknownBgVars.delete(t) : e.undefinedVars.add(t);
        }), this.changedTypeVars.forEach(function (t) {
          e.typeChangeSubscriptions.has(t) && e.typeChangeSubscriptions.get(t).forEach(function (e) {
            e();
          });
        }), this.changedTypeVars.clear();
      }, e.prototype.getModifierForVariable = function (e) {
        var t = this;
        return function (n) {
          var r = e.varName,
            i = e.sourceValue,
            o = e.rule,
            a = e.ignoredImgSelectors,
            s = e.isCancelled,
            l = function () {
              var e = [],
                l = function (o, a, s) {
                  if (t.isVarType(r, o)) {
                    var l,
                      c = a(r);
                    if (Fn(i)) {
                      if (Bn(i)) {
                        var u = Un(i, t.unstableVarValues);
                        u || (u = o === wn ? "#ffffff" : "#000000"), l = s(u, n);
                      } else l = An(i, function (e) {
                        return a(e);
                      }, function (e) {
                        return s(e, n);
                      });
                    } else l = s(i, n);
                    e.push({
                      property: c,
                      value: l
                    });
                  }
                };
              if (l(wn, Rn, Vn), l(xn, Nn, Wn), l(_n, Dn, Hn), t.isVarType(r, En)) {
                var c = In(r),
                  u = i;
                Fn(i) && (u = An(i, function (e) {
                  return Rn(e);
                }, function (e) {
                  return Vn(e, n);
                }));
                var h = mn(u, o, a, s);
                u = "function" === typeof h ? h(n) : h, e.push({
                  property: c,
                  value: u
                });
              }
              return e;
            },
            c = new Set(),
            u = function (e) {
              var n = function () {
                var t = l();
                e(t);
              };
              c.add(n), t.subscribeForVarTypeChange(r, n);
            },
            h = function () {
              c.forEach(function (e) {
                t.unsubscribeFromVariableTypeChanges(r, e);
              });
            };
          return {
            declarations: l(),
            onTypeChange: {
              addListener: u,
              removeListeners: h
            }
          };
        };
      }, e.prototype.getModifierForVarDependant = function (e, t) {
        var n = this;
        if (t.match(/^\s*(rgb|hsl)a?\(/)) {
          var r = e.startsWith("background"),
            i = "color" === e;
          return function (e) {
            var o = Un(t, n.unstableVarValues);
            o || (o = r ? "#ffffff" : "#000000");
            var a = r ? Vn : i ? Wn : Hn;
            return a(o, e);
          };
        }
        if ("background-color" === e) return function (e) {
          return An(t, function (e) {
            return Rn(e);
          }, function (t) {
            return Vn(t, e);
          });
        };
        if ("color" === e) return function (e) {
          return An(t, function (e) {
            return Nn(e);
          }, function (t) {
            return Wn(t, e);
          });
        };
        if ("background" === e || "background-image" === e || "box-shadow" === e) return function (e) {
          var r = new Set(),
            i = function () {
              return An(t, function (e) {
                return n.isVarType(e, wn) ? Rn(e) : n.isVarType(e, En) ? In(e) : (r.add(e), e);
              }, function (t) {
                return Vn(t, e);
              });
            },
            o = i();
          return r.size > 0 ? new Promise(function (e) {
            var t = r.values().next().value,
              o = function () {
                n.unsubscribeFromVariableTypeChanges(t, o);
                var r = i();
                e(r);
              };
            n.subscribeForVarTypeChange(t, o);
          }) : o;
        };
        if (e.startsWith("border") || e.startsWith("outline")) {
          if (t.endsWith(")")) {
            var o = t.match(/((rgb|hsl)a?)\(/);
            if (o) {
              var a = o.index;
              return function (e) {
                var r = Un(t, n.unstableVarValues);
                if (!r) return t;
                var i = t.substring(0, a),
                  o = t.substring(a, t.length),
                  s = Un(o, n.unstableVarValues),
                  l = Hn(s, e);
                return "" + i + l;
              };
            }
          }
          return function (e) {
            return An(t, function (e) {
              return Dn(e);
            }, function (t) {
              return Wn(t, e);
            });
          };
        }
        return null;
      }, e.prototype.subscribeForVarTypeChange = function (e, t) {
        this.typeChangeSubscriptions.has(e) || this.typeChangeSubscriptions.set(e, new Set());
        var n = this.typeChangeSubscriptions.get(e);
        n.has(t) || n.add(t);
      }, e.prototype.unsubscribeFromVariableTypeChanges = function (e, t) {
        this.typeChangeSubscriptions.has(e) && this.typeChangeSubscriptions.get(e).delete(t);
      }, e.prototype.collectVariables = function (e) {
        var t = this;
        Pn(e, function (e, n) {
          t.inspectVariable(e, n);
        });
      }, e.prototype.collectRootVariables = function () {
        var e = this;
        me(document.documentElement.style, function (t, n) {
          $n(t) && e.inspectVariable(t, n);
        });
      }, e.prototype.inspectVariable = function (e, t) {
        if (this.unstableVarValues.set(e, t), Fn(t) && Bn(t) && (this.unknownColorVars.add(e), this.definedVars.add(e)), !this.definedVars.has(e)) {
          this.definedVars.add(e);
          var n = cn(t);
          n ? this.unknownColorVars.add(e) : (t.includes("url(") || t.includes("linear-gradient(") || t.includes("radial-gradient(")) && this.resolveVariableType(e, En);
        }
      }, e.prototype.resolveVariableType = function (e, t) {
        var n = this.initialVarTypes.get(e) || 0,
          r = this.varTypes.get(e) || 0,
          i = r | t;
        this.varTypes.set(e, i), (i !== n || this.undefinedVars.has(e)) && (this.changedTypeVars.add(e), this.undefinedVars.delete(e)), this.unknownColorVars.delete(e), this.unknownBgVars.delete(e);
      }, e.prototype.collectVarDependants = function (e) {
        var t = this;
        jn(e, function (e, n) {
          t.inspectVerDependant(e, n);
        });
      }, e.prototype.collectRootVarDependants = function () {
        var e = this;
        me(document.documentElement.style, function (t, n) {
          Fn(n) && e.inspectVerDependant(t, n);
        });
      }, e.prototype.inspectVerDependant = function (e, t) {
        var n = this;
        $n(e) ? this.iterateVarDeps(t, function (t) {
          n.varRefs.has(e) || n.varRefs.set(e, new Set()), n.varRefs.get(e).add(t);
        }) : "background-color" === e || "box-shadow" === e ? this.iterateVarDeps(t, function (e) {
          return n.resolveVariableType(e, wn);
        }) : "color" === e ? this.iterateVarDeps(t, function (e) {
          return n.resolveVariableType(e, xn);
        }) : e.startsWith("border") || e.startsWith("outline") ? this.iterateVarDeps(t, function (e) {
          return n.resolveVariableType(e, _n);
        }) : "background" !== e && "background-image" !== e || this.iterateVarDeps(t, function (e) {
          if (!n.isVarType(e, wn | En)) {
            var t = null != n.findVarRef(e, function (e) {
              return n.unknownColorVars.has(e) || n.isVarType(e, xn | _n);
            });
            n.itarateVarRefs(e, function (e) {
              t ? n.resolveVariableType(e, wn) : n.unknownBgVars.add(e);
            });
          }
        });
      }, e.prototype.iterateVarDeps = function (e, t) {
        var n = new Set();
        Mn(e, function (e) {
          return n.add(e);
        }), n.forEach(function (e) {
          return t(e);
        });
      }, e.prototype.findVarRef = function (e, t, n) {
        var r, o;
        if (void 0 === n && (n = new Set()), n.has(e)) return null;
        n.add(e);
        var a = t(e);
        if (a) return e;
        var s = this.varRefs.get(e);
        if (!s || 0 === s.size) return null;
        try {
          for (var l = i(s), c = l.next(); !c.done; c = l.next()) {
            var u = c.value,
              h = this.findVarRef(u, t, n);
            if (h) return h;
          }
        } catch (e) {
          r = {
            error: e
          };
        } finally {
          try {
            c && !c.done && (o = l.return) && o.call(l);
          } finally {
            if (r) throw r.error;
          }
        }
        return null;
      }, e.prototype.itarateVarRefs = function (e, t) {
        this.findVarRef(e, function (e) {
          return t(e), !1;
        });
      }, e.prototype.setOnRootVariableChange = function (e) {
        this.onRootVariableDefined = e;
      }, e.prototype.putRootVars = function (e, t) {
        var n,
          r,
          a = this,
          s = e.sheet;
        s.cssRules.length > 0 && s.deleteRule(0);
        var l = new Map();
        me(document.documentElement.style, function (e, n) {
          $n(e) && (a.isVarType(e, wn) && l.set(Rn(e), Vn(n, t)), a.isVarType(e, xn) && l.set(Nn(e), Wn(n, t)), a.isVarType(e, _n) && l.set(Dn(e), Hn(n, t)), a.subscribeForVarTypeChange(e, a.onRootVariableDefined));
        });
        var c = [];
        c.push(":root {");
        try {
          for (var u = i(l), h = u.next(); !h.done; h = u.next()) {
            var f = o(h.value, 2),
              d = f[0],
              p = f[1];
            c.push("    " + d + ": " + p + ";");
          }
        } catch (e) {
          n = {
            error: e
          };
        } finally {
          try {
            h && !h.done && (r = u.return) && r.call(u);
          } finally {
            if (n) throw n.error;
          }
        }
        c.push("}");
        var m = c.join("\n");
        s.insertRule(m);
      }, e;
    }(),
    kn = new Sn();
  function Cn(e, t) {
    void 0 === t && (t = 0);
    var n = e.indexOf("var(", t);
    if (n >= 0) {
      var r = et(e, n + 3);
      return r ? {
        start: n,
        end: r.end
      } : null;
    }
  }
  function On(e) {
    var t,
      n = [],
      r = 0;
    while (t = Cn(e, r)) {
      var i = t.start,
        o = t.end;
      n.push({
        start: i,
        end: o,
        value: e.substring(i, o)
      }), r = t.end + 1;
    }
    return n;
  }
  function Tn(e, t) {
    var n = On(e),
      r = n.length;
    if (0 === r) return e;
    var i = e.length,
      o = n.map(function (e) {
        return t(e.value);
      }),
      a = [];
    a.push(e.substring(0, n[0].start));
    for (var s = 0; s < r; s++) {
      a.push(o[s]);
      var l = n[s].end,
        c = s < r - 1 ? n[s + 1].start : i;
      a.push(e.substring(l, c));
    }
    return a.join("");
  }
  function Ln(e) {
    var t,
      n,
      r = e.indexOf(",");
    return r >= 0 ? (t = e.substring(4, r).trim(), n = e.substring(r + 1, e.length - 1).trim()) : (t = e.substring(4, e.length - 1).trim(), n = ""), {
      name: t,
      fallback: n
    };
  }
  function An(e, t, n) {
    var r = function (e) {
      var r,
        i = Ln(e),
        o = i.name,
        a = i.fallback,
        s = t(o);
      return a ? (r = Fn(a) ? An(a, t, n) : n ? n(a) : a, "var(" + s + ", " + r + ")") : "var(" + s + ")";
    };
    return Tn(e, r);
  }
  function Pn(e, t) {
    fe(e, function (e) {
      e.style && me(e.style, function (e, n) {
        e.startsWith("--") && t(e, n);
      });
    });
  }
  function jn(e, t) {
    fe(e, function (e) {
      e.style && me(e.style, function (e, n) {
        Fn(n) && t(e, n);
      });
    });
  }
  function Mn(e, t) {
    An(e, function (e) {
      return t(e), e;
    });
  }
  function Rn(e) {
    return "--darkreader-bg" + e;
  }
  function Nn(e) {
    return "--darkreader-text" + e;
  }
  function Dn(e) {
    return "--darkreader-border" + e;
  }
  function In(e) {
    return "--darkreader-bgimg" + e;
  }
  function $n(e) {
    return e.startsWith("--");
  }
  function Fn(e) {
    return e.includes("var(");
  }
  function Bn(e) {
    return e.match(/^\s*(rgb|hsl)a?\(/);
  }
  function Vn(e, t) {
    var n = cn(e);
    return n ? wt(n, t) : e;
  }
  function Wn(e, t) {
    var n = cn(e);
    return n ? kt(n, t) : e;
  }
  function Hn(e, t) {
    var n = cn(e);
    return n ? Ot(n, t) : e;
  }
  function Un(e, t, n) {
    void 0 === n && (n = new Set());
    var r = !1,
      i = function (e) {
        var i = Ln(e),
          o = i.name,
          a = i.fallback;
        if (n.has(o)) return r = !0, null;
        n.add(o);
        var s = t.get(o) || a,
          l = null;
        return s && (l = Fn(s) ? Un(s, t, n) : s), l || (r = !0, null);
      },
      o = Tn(e, i);
    return r ? null : o;
  }
  var zn = {
      "background-color": {
        customProp: "--darkreader-inline-bgcolor",
        cssProp: "background-color",
        dataAttr: "data-darkreader-inline-bgcolor"
      },
      "background-image": {
        customProp: "--darkreader-inline-bgimage",
        cssProp: "background-image",
        dataAttr: "data-darkreader-inline-bgimage"
      },
      "border-color": {
        customProp: "--darkreader-inline-border",
        cssProp: "border-color",
        dataAttr: "data-darkreader-inline-border"
      },
      "border-bottom-color": {
        customProp: "--darkreader-inline-border-bottom",
        cssProp: "border-bottom-color",
        dataAttr: "data-darkreader-inline-border-bottom"
      },
      "border-left-color": {
        customProp: "--darkreader-inline-border-left",
        cssProp: "border-left-color",
        dataAttr: "data-darkreader-inline-border-left"
      },
      "border-right-color": {
        customProp: "--darkreader-inline-border-right",
        cssProp: "border-right-color",
        dataAttr: "data-darkreader-inline-border-right"
      },
      "border-top-color": {
        customProp: "--darkreader-inline-border-top",
        cssProp: "border-top-color",
        dataAttr: "data-darkreader-inline-border-top"
      },
      "box-shadow": {
        customProp: "--darkreader-inline-boxshadow",
        cssProp: "box-shadow",
        dataAttr: "data-darkreader-inline-boxshadow"
      },
      color: {
        customProp: "--darkreader-inline-color",
        cssProp: "color",
        dataAttr: "data-darkreader-inline-color"
      },
      fill: {
        customProp: "--darkreader-inline-fill",
        cssProp: "fill",
        dataAttr: "data-darkreader-inline-fill"
      },
      stroke: {
        customProp: "--darkreader-inline-stroke",
        cssProp: "stroke",
        dataAttr: "data-darkreader-inline-stroke"
      },
      "outline-color": {
        customProp: "--darkreader-inline-outline",
        cssProp: "outline-color",
        dataAttr: "data-darkreader-inline-outline"
      },
      "stop-color": {
        customProp: "--darkreader-inline-stopcolor",
        cssProp: "stop-color",
        dataAttr: "data-darkreader-inline-stopcolor"
      }
    },
    Gn = Object.values(zn),
    qn = {};
  Gn.forEach(function (e) {
    var t = e.cssProp,
      n = e.customProp;
    return qn[n] = t;
  });
  var Kn = ["style", "fill", "stop-color", "stroke", "bgcolor", "color"],
    Yn = Kn.map(function (e) {
      return "[" + e + "]";
    }).join(", ");
  function Xn() {
    return Gn.map(function (e) {
      var t = e.dataAttr,
        n = e.customProp,
        r = e.cssProp;
      return ["[" + t + "] {", "  " + r + ": var(" + n + ") !important;", "}"].join("\n");
    }).join("\n");
  }
  function Qn(e) {
    var t = [];
    return e instanceof Element && e.matches(Yn) && t.push(e), (e instanceof Element || g && e instanceof ShadowRoot || e instanceof Document) && D(t, e.querySelectorAll(Yn)), t;
  }
  var Zn = new Map(),
    Jn = new Map();
  function er(e, t) {
    tr(document, e, t), z(document.documentElement, function (n) {
      tr(n.shadowRoot, e, t);
    });
  }
  function tr(e, t, n) {
    Zn.has(e) && (Zn.get(e).disconnect(), Jn.get(e).disconnect());
    var r = new WeakSet();
    function i(e) {
      Qn(e).forEach(function (e) {
        r.has(e) || (r.add(e), t(e));
      }), z(e, function (i) {
        r.has(e) || (r.add(e), n(i.shadowRoot), tr(i.shadowRoot, t, n));
      });
    }
    var s = se(e, {
      onMinorMutations: function (e) {
        var t = e.additions;
        t.forEach(function (e) {
          return i(e);
        });
      },
      onHugeMutations: function () {
        i(e);
      }
    });
    Zn.set(e, s);
    var l = 0,
      c = null,
      u = W({
        seconds: 10
      }),
      h = W({
        seconds: 2
      }),
      f = 50,
      d = [],
      p = null,
      m = B(function (e) {
        e.forEach(function (e) {
          Kn.includes(e.attributeName) && t(e.target);
        });
      }),
      g = new MutationObserver(function (e) {
        if (p) d.push.apply(d, a([], o(e)));else {
          l++;
          var t = Date.now();
          if (null == c) c = t;else if (l >= f) {
            if (t - c < u) return p = setTimeout(function () {
              c = null, l = 0, p = null;
              var e = d;
              d = [], m(e);
            }, h), void d.push.apply(d, a([], o(e)));
            c = t, l = 1;
          }
          m(e);
        }
      });
    g.observe(e, {
      attributes: !0,
      attributeFilter: Kn.concat(Gn.map(function (e) {
        var t = e.dataAttr;
        return t;
      })),
      subtree: !0
    }), Jn.set(e, g);
  }
  function nr() {
    Zn.forEach(function (e) {
      return e.disconnect();
    }), Jn.forEach(function (e) {
      return e.disconnect();
    }), Zn.clear(), Jn.clear();
  }
  var rr = new WeakMap(),
    ir = ["brightness", "contrast", "grayscale", "sepia", "mode"];
  function or(e, t) {
    return Kn.map(function (t) {
      return t + '="' + e.getAttribute(t) + '"';
    }).concat(ir.map(function (e) {
      return e + '="' + t[e] + '"';
    })).join(" ");
  }
  function ar(e, t) {
    for (var n = 0, r = t.length; n < r; n++) {
      var i = t[n];
      if (e.matches(i)) return !0;
    }
    return !1;
  }
  function sr(e, t, n, r) {
    var i = or(e, t);
    if (i !== rr.get(e)) {
      var o = new Set(Object.keys(zn));
      if (n.length > 0 && ar(e, n)) o.forEach(function (t) {
        e.removeAttribute(zn[t].dataAttr);
      });else {
        if (e.hasAttribute("bgcolor")) {
          var a = e.getAttribute("bgcolor");
          (a.match(/^[0-9a-f]{3}$/i) || a.match(/^[0-9a-f]{6}$/i)) && (a = "#" + a), u("background-color", "background-color", a);
        }
        if (e.hasAttribute("color") && "mask-icon" !== e.rel) {
          a = e.getAttribute("color");
          (a.match(/^[0-9a-f]{3}$/i) || a.match(/^[0-9a-f]{6}$/i)) && (a = "#" + a), u("color", "color", a);
        }
        if (e instanceof SVGElement) {
          if (e.hasAttribute("fill")) {
            var s = 32,
              l = e.getAttribute("fill");
            if ("none" !== l) if (e instanceof SVGTextElement) u("fill", "color", l);else {
              var c = function () {
                var t = e.getBoundingClientRect(),
                  n = t.width,
                  r = t.height,
                  i = n > s || r > s;
                u("fill", i ? "background-color" : "color", l);
              };
              X() ? c() : Z(c);
            }
          }
          e.hasAttribute("stop-color") && u("stop-color", "background-color", e.getAttribute("stop-color"));
        }
        if (e.hasAttribute("stroke")) {
          a = e.getAttribute("stroke");
          u("stroke", e instanceof SVGLineElement || e instanceof SVGTextElement ? "border-color" : "color", a);
        }
        e.style && me(e.style, function (t, n) {
          if ("background-image" !== t || !n.includes("url")) if (zn.hasOwnProperty(t)) u(t, t, n);else {
            var r = qn[t];
            !r || e.style.getPropertyValue(r) || e.hasAttribute(r) || e.style.setProperty(t, "");
          }
        }), e.style && e instanceof SVGTextElement && e.style.fill && u("fill", "color", e.style.getPropertyValue("fill")), N(o, function (t) {
          e.removeAttribute(zn[t].dataAttr);
        }), rr.set(e, or(e, t));
      }
    }
    function u(n, i, a) {
      var s = zn[n],
        l = s.customProp,
        c = s.dataAttr,
        u = Jt(i, a, {}, kn, r, null);
      if (u) {
        var h = u.value;
        "function" === typeof h && (h = h(t)), e.style.setProperty(l, h), e.hasAttribute(c) || e.setAttribute(c, ""), o.delete(n);
      }
    }
  }
  var lr = "theme-color",
    cr = 'meta[name="' + lr + '"]',
    ur = null,
    hr = null;
  function fr(e, t) {
    ur = ur || e.content;
    try {
      var n = Re(ur);
      e.content = wt(n, t);
    } catch (e) {
      F(e);
    }
  }
  function dr(e) {
    var t = document.querySelector(cr);
    t ? fr(t, e) : (hr && hr.disconnect(), hr = new MutationObserver(function (t) {
      e: for (var n = 0; n < t.length; n++) for (var r = t[n].addedNodes, i = 0; i < r.length; i++) {
        var o = r[i];
        if (o instanceof HTMLMetaElement && o.name === lr) {
          hr.disconnect(), hr = null, fr(o, e);
          break e;
        }
      }
    }), hr.observe(document.head, {
      childList: !0
    }));
  }
  function pr() {
    hr && (hr.disconnect(), hr = null);
    var e = document.querySelector(cr);
    e && ur && (e.content = ur);
  }
  var mr = ["mode", "brightness", "contrast", "grayscale", "sepia", "darkSchemeBackgroundColor", "darkSchemeTextColor", "lightSchemeBackgroundColor", "lightSchemeTextColor"];
  function gr(e) {
    return mr.map(function (t) {
      return t + ":" + e[t];
    }).join(";");
  }
  var vr = V();
  function yr() {
    var e = 0,
      t = new Set(),
      n = new Map(),
      r = new Set(),
      i = null,
      s = !1,
      l = !1;
    function c() {
      return s && !l;
    }
    function u(c) {
      var u = c.sourceCSSRules,
        h = c.theme,
        f = c.ignoreImageAnalysis,
        d = c.force,
        p = c.prepareSheet,
        m = c.isAsyncCancelled,
        g = 0 === n.size,
        v = new Set(n.keys()),
        y = gr(h),
        b = y !== i;
      s && (l = !0);
      var w = [];
      if (fe(u, function (e) {
        var r = e.cssText,
          i = !1;
        if (v.delete(r), e.parentRule instanceof CSSMediaRule && (r += ";" + e.parentRule.media.mediaText), t.has(r) || (t.add(r), i = !0), i) {
          g = !0;
          var o = [];
          e.style && me(e.style, function (t, n) {
            var r = Jt(t, n, e, kn, f, m);
            r && o.push(r);
          });
          var a = null;
          if (o.length > 0) {
            var s = e.parentRule;
            a = {
              selector: e.selectorText,
              declarations: o,
              parentRule: s
            }, w.push(a);
          }
          n.set(r, a);
        } else w.push(n.get(r));
      }, function () {
        s = !0;
      }), v.forEach(function (e) {
        t.delete(e), n.delete(e);
      }), i = y, d || g || b) {
        e++;
        var x = new Map(),
          _ = new Map(),
          E = 0,
          S = 0,
          k = {
            rule: null,
            rules: [],
            isGroup: !0
          },
          C = new WeakMap();
        r.forEach(function (e) {
          return e();
        }), r.clear(), w.filter(function (e) {
          return e;
        }).forEach(function (t) {
          var n = t.selector,
            i = t.declarations,
            s = t.parentRule,
            l = L(s),
            c = {
              selector: n,
              declarations: [],
              isGroup: !1
            },
            u = c.declarations;
          function f(t, n, r, i) {
            var o = ++E,
              a = {
                property: t,
                value: null,
                important: r,
                asyncKey: o,
                sourceValue: i
              };
            u.push(a);
            var s = e;
            n.then(function (t) {
              t && !m() && s === e && (a.value = t, vr.add(function () {
                m() || s !== e || P(o);
              }));
            });
          }
          function d(t, n, i, s) {
            var l = n,
              c = l.declarations,
              h = l.onTypeChange,
              d = ++S,
              p = e,
              g = u.length,
              v = [];
            if (0 === c.length) {
              var y = {
                property: t,
                value: s,
                important: i,
                sourceValue: s,
                varKey: d
              };
              u.push(y), v = [y];
            }
            c.forEach(function (e) {
              if (e.value instanceof Promise) f(e.property, e.value, i, s);else {
                var t = {
                  property: e.property,
                  value: e.value,
                  important: i,
                  sourceValue: s,
                  varKey: d
                };
                u.push(t), v.push(t);
              }
            }), h.addListener(function (t) {
              if (!m() && p === e) {
                var n = t.map(function (e) {
                    return {
                      property: e.property,
                      value: e.value,
                      important: i,
                      sourceValue: s,
                      varKey: d
                    };
                  }),
                  r = u.indexOf(v[0], g);
                u.splice.apply(u, a([r, v.length], o(n))), v = n, j(d);
              }
            }), r.add(function () {
              return h.removeListeners();
            });
          }
          l.rules.push(c), i.forEach(function (e) {
            var t = e.property,
              n = e.value,
              r = e.important,
              i = e.sourceValue;
            if ("function" === typeof n) {
              var o = n(h);
              o instanceof Promise ? f(t, o, r, i) : t.startsWith("--") ? d(t, o, r, i) : u.push({
                property: t,
                value: o,
                important: r,
                sourceValue: i
              });
            } else u.push({
              property: t,
              value: n,
              important: r,
              sourceValue: i
            });
          });
        });
        var O = p();
        A();
      }
      function T(e, t, n) {
        var r = n.selector,
          i = n.declarations,
          o = function (e) {
            var t = e.property,
              n = e.value,
              r = e.important,
              i = e.sourceValue;
            return t + ": " + (null == n ? i : n) + (r ? " !important" : "") + ";";
          },
          a = r + " { " + i.map(o).join(" ") + " }";
        e.insertRule(a, t);
      }
      function L(e) {
        if (null == e) return k;
        if (C.has(e)) return C.get(e);
        var t = {
          rule: e,
          rules: [],
          isGroup: !0
        };
        C.set(e, t);
        var n = L(e.parentRule);
        return n.rules.push(t), t;
      }
      function A() {
        function e(e, t) {
          var n = e.rule;
          if (n instanceof CSSMediaRule) {
            var r = n.media,
              i = t.cssRules.length;
            return t.insertRule("@media " + r.mediaText + " {}", i), t.cssRules[i];
          }
          return t;
        }
        function t(n, r, i) {
          n.rules.forEach(function (n) {
            if (n.isGroup) {
              var o = e(n, r);
              t(n, o, i);
            } else i(n, r);
          });
        }
        t(k, O, function (e, t) {
          var n = t.cssRules.length;
          e.declarations.forEach(function (r) {
            var i = r.asyncKey,
              o = r.varKey;
            null != i && x.set(i, {
              rule: e,
              target: t,
              index: n
            }), null != o && _.set(o, {
              rule: e,
              target: t,
              index: n
            });
          }), T(t, n, e);
        });
      }
      function P(e) {
        var t = x.get(e),
          n = t.rule,
          r = t.target,
          i = t.index;
        r.deleteRule(i), T(r, i, n), x.delete(e);
      }
      function j(e) {
        var t = _.get(e),
          n = t.rule,
          r = t.target,
          i = t.index;
        r.deleteRule(i), T(r, i, n);
      }
    }
    return {
      modifySheet: u,
      shouldRebuildStyle: c
    };
  }
  var br = 'style, link[rel*="stylesheet" i]:not([disabled])';
  function wr(e) {
    return (e instanceof HTMLStyleElement || e instanceof SVGStyleElement || e instanceof HTMLLinkElement && e.rel && e.rel.toLowerCase().includes("stylesheet") && !e.disabled) && !e.classList.contains("darkreader") && "print" !== e.media.toLowerCase() && !e.classList.contains("stylus");
  }
  function xr(e, t, n) {
    return void 0 === t && (t = []), void 0 === n && (n = !0), wr(e) ? t.push(e) : (e instanceof Element || g && e instanceof ShadowRoot || e === document) && (N(e.querySelectorAll(br), function (e) {
      return xr(e, t, !1);
    }), n && z(e, function (e) {
      return xr(e.shadowRoot, t, !1);
    })), t;
  }
  var _r = new WeakSet(),
    Er = new WeakSet(),
    Sr = !1;
  document.addEventListener("__darkreader__inlineScriptsAllowed", function () {
    Sr = !0;
  });
  var kr = 0,
    Cr = new Map();
  function Or() {
    Cr.clear();
  }
  function Tr(e, t) {
    var i = t.update,
      a = t.loadingStart,
      s = t.loadingEnd,
      l = [],
      c = e;
    while ((c = c.nextElementSibling) && c.matches(".darkreader")) l.push(c);
    var f = l.find(function (e) {
        return e.matches(".darkreader--cors") && !Er.has(e);
      }) || null,
      p = l.find(function (e) {
        return e.matches(".darkreader--sync") && !_r.has(e);
      }) || null,
      m = null,
      g = null,
      v = !1,
      y = !0,
      b = yr(),
      w = new MutationObserver(function () {
        i();
      }),
      x = {
        attributes: !0,
        childList: !0,
        subtree: !0,
        characterData: !0
      };
    function _() {
      return e instanceof HTMLStyleElement && e.textContent.trim().match(ve);
    }
    function E(e) {
      var t = !1;
      if (e) {
        var n = void 0;
        e: for (var r = 0, i = e.length; r < i; r++) if (n = e[r], n.href && n.href.startsWith("http") && !n.href.startsWith(location.origin)) {
          t = !0;
          break e;
        }
      }
      return t;
    }
    function S() {
      if (f) return f.sheet.cssRules;
      if (_()) return null;
      var e = D();
      return E(e) ? null : e;
    }
    function k() {
      f ? (e.nextSibling !== f && e.parentNode.insertBefore(f, e.nextSibling), f.nextSibling !== p && e.parentNode.insertBefore(p, f.nextSibling)) : e.nextSibling !== p && e.parentNode.insertBefore(p, e.nextSibling);
    }
    function C() {
      p = e instanceof SVGStyleElement ? document.createElementNS("http://www.w3.org/2000/svg", "style") : document.createElement("style"), p.classList.add("darkreader"), p.classList.add("darkreader--sync"), p.media = "screen", !u && e.title && (p.title = e.title), _r.add(p);
    }
    var O = !1,
      T = !1,
      L = ++kr;
    function A() {
      return n(this, void 0, void 0, function () {
        var t, n, i, a, s, l, c, u, h, p;
        return r(this, function (r) {
          switch (r.label) {
            case 0:
              if (!(e instanceof HTMLLinkElement)) return [3, 7];
              if (i = o(R(), 2), a = i[0], s = i[1], s && F(s), (a || s || d) && (!d || e.sheet) && !N(s)) return [3, 5];
              r.label = 1;
            case 1:
              return r.trys.push([1, 3,, 4]), $("Linkelement " + L + " is not loaded yet and thus will be await for", e), [4, Lr(e, L)];
            case 2:
              return r.sent(), [3, 4];
            case 3:
              return l = r.sent(), F(l), T = !0, [3, 4];
            case 4:
              if (v) return [2, null];
              p = o(R(), 2), a = p[0], s = p[1], s && F(s), r.label = 5;
            case 5:
              return c = E(a), null == a || c ? [4, Pr(e.href)] : [2, a];
            case 6:
              return t = r.sent(), n = be(e.href), v ? [2, null] : [3, 8];
            case 7:
              if (!_()) return [2, null];
              t = e.textContent.trim(), n = be(location.href), r.label = 8;
            case 8:
              if (!t) return [3, 13];
              r.label = 9;
            case 9:
              return r.trys.push([9, 11,, 12]), [4, jr(t, n)];
            case 10:
              return u = r.sent(), f = Mr(e, u), [3, 12];
            case 11:
              return h = r.sent(), F(h), [3, 12];
            case 12:
              if (f) return m = U(f, "prev-sibling"), [2, f.sheet.cssRules];
              r.label = 13;
            case 13:
              return [2, null];
          }
        });
      });
    }
    function P() {
      var e = S();
      return e ? {
        rules: e
      } : O || T ? null : (O = !0, a(), A().then(function (e) {
        O = !1, s(), e && i();
      }).catch(function (e) {
        F(e), O = !1, s();
      }), null);
    }
    var j = !1;
    function M(e, t) {
      var n = S();
      function r() {
        p || C(), g && g.stop(), k(), null == p.sheet && (p.textContent = "");
        for (var e = p.sheet, t = e.cssRules.length - 1; t >= 0; t--) e.deleteRule(t);
        return g ? g.run() : g = U(p, "prev-sibling", function () {
          j = !0, o();
        }), p.sheet;
      }
      function o() {
        var o = j;
        j = !1, b.modifySheet({
          prepareSheet: r,
          sourceCSSRules: n,
          theme: e,
          ignoreImageAnalysis: t,
          force: o,
          isAsyncCancelled: function () {
            return v;
          }
        }), y = 0 === p.sheet.cssRules.length, b.shouldRebuildStyle() && Z(function () {
          return i();
        });
      }
      n && (v = !1, o());
    }
    function R() {
      try {
        return null == e.sheet ? [null, null] : [e.sheet.cssRules, null];
      } catch (e) {
        return [null, e];
      }
    }
    function N(e) {
      return e && e.message && e.message.includes("loading");
    }
    function D() {
      var e = o(R(), 2),
        t = e[0],
        n = e[1];
      return n ? (F(n), null) : t;
    }
    function I() {
      X(), h || Sr && e.sheet || G();
    }
    var B = null,
      V = null;
    function W() {
      var e = D();
      return e ? e.length : null;
    }
    function z() {
      return W() !== B;
    }
    function G() {
      B = W(), q();
      var t = function () {
        z() && (B = W(), i()), Sr && e.sheet ? q() : V = requestAnimationFrame(t);
      };
      t();
    }
    function q() {
      cancelAnimationFrame(V);
    }
    var K = !1;
    function Y() {
      function e() {
        K = !1, v || i();
      }
      Sr = !0, q(), K || (K = !0, "function" === typeof queueMicrotask ? queueMicrotask(e) : requestAnimationFrame(e));
    }
    function X() {
      e.addEventListener("__darkreader__updateSheet", Y);
    }
    function Q() {
      e.removeEventListener("__darkreader__updateSheet", Y);
    }
    function J() {
      Q(), q();
    }
    function ee() {
      w.disconnect(), v = !0, m && m.stop(), g && g.stop(), J();
    }
    function te() {
      if (ee(), H(f), H(p), s(), Cr.has(L)) {
        var e = Cr.get(L);
        Cr.delete(L), e && e();
      }
    }
    function ne() {
      w.observe(e, x), e instanceof HTMLStyleElement && I();
    }
    var re = 10,
      ie = 0;
    function oe() {
      p && (ie++, ie > re ? F("Style sheet was moved multiple times", e) : (F("Restore style", p, e), k(), m && m.skip(), g && g.skip(), y || (j = !0, i())));
    }
    return {
      details: P,
      render: M,
      pause: ee,
      destroy: te,
      watch: ne,
      restore: oe
    };
  }
  function Lr(e, t) {
    return n(this, void 0, void 0, function () {
      return r(this, function (n) {
        return [2, new Promise(function (n, r) {
          var i = function () {
              e.removeEventListener("load", o), e.removeEventListener("error", a), Cr.delete(t);
            },
            o = function () {
              i(), $("Linkelement " + t + " has been loaded"), n();
            },
            a = function () {
              i(), r("Linkelement " + t + " couldn't be loaded. " + e.href);
            };
          Cr.set(t, function () {
            i(), r();
          }), e.addEventListener("load", o), e.addEventListener("error", a), e.href || a();
        })];
      });
    });
  }
  function Ar(e) {
    return ye(e.substring(7).trim().replace(/;$/, ""));
  }
  function Pr(e) {
    return n(this, void 0, void 0, function () {
      return r(this, function (t) {
        switch (t.label) {
          case 0:
            return e.startsWith("data:") ? [4, fetch(e)] : [3, 3];
          case 1:
            return [4, t.sent().text()];
          case 2:
            return [2, t.sent()];
          case 3:
            return [4, It({
              url: e,
              responseType: "text",
              mimeType: "text/css",
              origin: window.location.origin
            })];
          case 4:
            return [2, t.sent()];
        }
      });
    });
  }
  function jr(e, t, o) {
    return void 0 === o && (o = new Map()), n(this, void 0, void 0, function () {
      var n, a, s, l, c, u, h, f, d, p, m;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            e = _e(e), e = Se(e), e = we(e, t), n = Ze(ve, e), r.label = 1;
          case 1:
            r.trys.push([1, 10, 11, 12]), a = i(n), s = a.next(), r.label = 2;
          case 2:
            return s.done ? [3, 9] : (l = s.value, c = Ar(l), u = he(t, c), h = void 0, o.has(u) ? (h = o.get(u), [3, 7]) : [3, 3]);
          case 3:
            return r.trys.push([3, 6,, 7]), [4, Pr(u)];
          case 4:
            return h = r.sent(), o.set(u, h), [4, jr(h, be(u), o)];
          case 5:
            return h = r.sent(), [3, 7];
          case 6:
            return f = r.sent(), F(f), h = "", [3, 7];
          case 7:
            e = e.split(l).join(h), r.label = 8;
          case 8:
            return s = a.next(), [3, 2];
          case 9:
            return [3, 12];
          case 10:
            return d = r.sent(), p = {
              error: d
            }, [3, 12];
          case 11:
            try {
              s && !s.done && (m = a.return) && m.call(a);
            } finally {
              if (p) throw p.error;
            }
            return [7];
          case 12:
            return e = e.trim(), [2, e];
        }
      });
    });
  }
  function Mr(e, t) {
    if (!t) return null;
    var n = document.createElement("style");
    return n.classList.add("darkreader"), n.classList.add("darkreader--cors"), n.media = "screen", n.textContent = t, e.parentNode.insertBefore(n, e.nextSibling), n.sheet.disabled = !0, Er.add(n), n;
  }
  var Rr,
    Nr,
    Dr = [],
    Ir = new Map();
  function $r(e) {
    y && N(e.querySelectorAll(":not(:defined)"), function (e) {
      var t = e.tagName.toLowerCase();
      if (!t.includes("-")) {
        var n = e.getAttribute("is");
        if (!n) return;
        t = n;
      }
      Ir.has(t) || (Ir.set(t, new Set()), Wr(t).then(function () {
        if (Nr) {
          var e = Ir.get(t);
          Ir.delete(t), Nr(Array.from(e));
        }
      })), Ir.get(t).add(e);
    });
  }
  var Fr = !1;
  document.addEventListener("__darkreader__inlineScriptsAllowed", function () {
    Fr = !0;
  });
  var Br = new Map();
  function Vr(e) {
    if (Fr = !0, Br.has(e.detail.tag)) {
      var t = Br.get(e.detail.tag);
      t();
    }
  }
  function Wr(e) {
    return n(this, void 0, void 0, function () {
      return r(this, function (t) {
        return [2, new Promise(function (t) {
          if (window.customElements && "function" === typeof customElements.whenDefined) customElements.whenDefined(e).then(t);else if (Fr) Br.set(e, t), document.dispatchEvent(new CustomEvent("__darkreader__addUndefinedResolver", {
            detail: {
              tag: e
            }
          }));else {
            var n = function () {
              var r = Ir.get(e);
              r && r.size > 0 && (r.values().next().value.matches(":defined") ? t() : requestAnimationFrame(n));
            };
            requestAnimationFrame(n);
          }
        })];
      });
    });
  }
  function Hr(e) {
    Nr = e;
  }
  function Ur() {
    Nr = null, Ir.clear(), document.removeEventListener("__darkreader__isDefined", Vr);
  }
  function zr(e, t, n) {
    qr();
    var r = new Set(e),
      i = new WeakMap(),
      o = new WeakMap();
    function a(e) {
      i.set(e, e.previousElementSibling), o.set(e, e.nextElementSibling);
    }
    function s(e) {
      i.delete(e), o.delete(e);
    }
    function l(e) {
      return e.previousElementSibling !== i.get(e) || e.nextElementSibling !== o.get(e);
    }
    function c(e) {
      var n = e.createdStyles,
        i = e.removedStyles,
        o = e.movedStyles;
      n.forEach(function (e) {
        return a(e);
      }), o.forEach(function (e) {
        return a(e);
      }), i.forEach(function (e) {
        return s(e);
      }), n.forEach(function (e) {
        return r.add(e);
      }), i.forEach(function (e) {
        return r.delete(e);
      }), n.size + i.size + o.size > 0 && t({
        created: Array.from(n),
        removed: Array.from(i),
        moved: Array.from(o),
        updated: []
      });
    }
    function u(e) {
      var t = e.additions,
        n = e.moves,
        r = e.deletions,
        i = new Set(),
        o = new Set(),
        a = new Set();
      t.forEach(function (e) {
        return xr(e).forEach(function (e) {
          return i.add(e);
        });
      }), r.forEach(function (e) {
        return xr(e).forEach(function (e) {
          return o.add(e);
        });
      }), n.forEach(function (e) {
        return xr(e).forEach(function (e) {
          return a.add(e);
        });
      }), c({
        createdStyles: i,
        removedStyles: o,
        movedStyles: a
      }), t.forEach(function (e) {
        z(e, p), $r(e);
      });
    }
    function h(e) {
      var t = new Set(xr(e)),
        n = new Set(),
        i = new Set(),
        o = new Set();
      t.forEach(function (e) {
        r.has(e) || n.add(e);
      }), r.forEach(function (e) {
        t.has(e) || i.add(e);
      }), t.forEach(function (e) {
        n.has(e) || i.has(e) || !l(e) || o.add(e);
      }), c({
        createdStyles: n,
        removedStyles: i,
        movedStyles: o
      }), z(e, p), $r(e);
    }
    function f(e) {
      var n = new Set(),
        r = new Set();
      e.forEach(function (e) {
        var t = e.target;
        t.isConnected && (wr(t) ? n.add(t) : t instanceof HTMLLinkElement && t.disabled && r.add(t));
      }), n.size + r.size > 0 && t({
        updated: Array.from(n),
        created: [],
        removed: Array.from(r),
        moved: []
      });
    }
    function d(e) {
      var t = se(e, {
          onMinorMutations: u,
          onHugeMutations: h
        }),
        n = new MutationObserver(f);
      n.observe(e, {
        attributes: !0,
        attributeFilter: ["rel", "disabled", "media"],
        subtree: !0
      }), Dr.push(t, n), Rr.add(e);
    }
    function p(e) {
      var t = e.shadowRoot;
      null == t || Rr.has(t) || (d(t), n(t));
    }
    e.forEach(a), d(document), z(document.documentElement, p), Hr(function (e) {
      var n = [];
      e.forEach(function (e) {
        return D(n, xr(e.shadowRoot));
      }), t({
        created: n,
        updated: [],
        removed: [],
        moved: []
      }), e.forEach(function (e) {
        var t = e.shadowRoot;
        null != t && (p(e), z(t, p), $r(t));
      });
    }), document.addEventListener("__darkreader__isDefined", Vr), $r(document);
  }
  function Gr() {
    Dr.forEach(function (e) {
      return e.disconnect();
    }), Dr.splice(0, Dr.length), Rr = new WeakSet();
  }
  function qr() {
    Gr(), Ur();
  }
  function Kr(e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }
  function Yr() {
    if ("randomUUID" in crypto) {
      var e = crypto.randomUUID();
      return e.substring(0, 8) + e.substring(9, 13) + e.substring(14, 18) + e.substring(19, 23) + e.substring(24);
    }
    return Array.from(crypto.getRandomValues(new Uint8Array(16))).map(function (e) {
      return Kr(e);
    }).join("");
  }
  var Xr = new WeakMap(),
    Qr = new WeakSet();
  function Zr(e) {
    var t = !1;
    function n(t, n) {
      var r = a([], o(e.adoptedStyleSheets)),
        i = r.indexOf(t),
        s = r.indexOf(n);
      i !== s - 1 && (s >= 0 && r.splice(s, 1), r.splice(i + 1, 0, n), e.adoptedStyleSheets = r);
    }
    function r() {
      t = !0;
      var n = a([], o(e.adoptedStyleSheets));
      e.adoptedStyleSheets.forEach(function (e) {
        if (Qr.has(e)) {
          var t = n.indexOf(e);
          t >= 0 && n.splice(t, 1), Xr.delete(e), Qr.delete(e);
        }
      }), e.adoptedStyleSheets = n;
    }
    function i(r, i) {
      e.adoptedStyleSheets.forEach(function (e) {
        if (!Qr.has(e)) {
          var o = e.rules,
            a = new CSSStyleSheet(),
            s = yr();
          s.modifySheet({
            prepareSheet: l,
            sourceCSSRules: o,
            theme: r,
            ignoreImageAnalysis: i,
            force: !1,
            isAsyncCancelled: function () {
              return t;
            }
          });
        }
        function l() {
          for (var t = a.cssRules.length - 1; t >= 0; t--) a.deleteRule(t);
          return n(e, a), Xr.set(e, a), Qr.add(a), a;
        }
      });
    }
    return {
      render: i,
      destroy: r
    };
  }
  function Jr() {
    document.dispatchEvent(new CustomEvent("__darkreader__inlineScriptsAllowed"));
    var e = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "addRule"),
      t = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "insertRule"),
      n = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "deleteRule"),
      r = Object.getOwnPropertyDescriptor(CSSStyleSheet.prototype, "removeRule"),
      i = location.hostname.endsWith("pushbullet.com") || location.hostname.endsWith("ilsole24ore.com") || location.hostname.endsWith("allegro.pl"),
      s = i ? Object.getOwnPropertyDescriptor(Document.prototype, "styleSheets") : null,
      l = location.hostname.endsWith("baidu.com"),
      c = l ? Object.getOwnPropertyDescriptor(Element.prototype, "getElementsByTagName") : null,
      u = function () {
        Object.defineProperty(CSSStyleSheet.prototype, "addRule", e), Object.defineProperty(CSSStyleSheet.prototype, "insertRule", t), Object.defineProperty(CSSStyleSheet.prototype, "deleteRule", n), Object.defineProperty(CSSStyleSheet.prototype, "removeRule", r), document.removeEventListener("__darkreader__cleanUp", u), document.removeEventListener("__darkreader__addUndefinedResolver", h), i && Object.defineProperty(Document.prototype, "styleSheets", s), l && Object.defineProperty(Element.prototype, "getElementsByTagName", c);
      },
      h = function (e) {
        customElements.whenDefined(e.detail.tag).then(function () {
          document.dispatchEvent(new CustomEvent("__darkreader__isDefined", {
            detail: {
              tag: e.detail.tag
            }
          }));
        });
      };
    document.addEventListener("__darkreader__cleanUp", u), document.addEventListener("__darkreader__addUndefinedResolver", h);
    var f = new Event("__darkreader__updateSheet");
    function d(t, n, r) {
      return e.value.call(this, t, n, r), this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f), -1;
    }
    function p(e, n) {
      var r = t.value.call(this, e, n);
      return this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f), r;
    }
    function m(e) {
      n.value.call(this, e), this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f);
    }
    function g(e) {
      r.value.call(this, e), this.ownerNode && !this.ownerNode.classList.contains("darkreader") && this.ownerNode.dispatchEvent(f);
    }
    function v() {
      var e = s.get.call(this),
        t = a([], o(e)).filter(function (e) {
          return !e.ownerNode.classList.contains("darkreader");
        });
      return Object.setPrototypeOf(t, StyleSheetList.prototype);
    }
    function y(e) {
      var t = this,
        n = function () {
          var n = c.value.call(t, e);
          return "style" === e && (n = Object.setPrototypeOf(a([], o(n)).filter(function (e) {
            return !e.classList.contains("darkreader");
          }), NodeList.prototype)), n;
        },
        r = n(),
        i = {
          get: function (e, t) {
            return n()[t];
          }
        };
      return r = new Proxy(r, i), r;
    }
    Object.defineProperty(CSSStyleSheet.prototype, "addRule", Object.assign({}, e, {
      value: d
    })), Object.defineProperty(CSSStyleSheet.prototype, "insertRule", Object.assign({}, t, {
      value: p
    })), Object.defineProperty(CSSStyleSheet.prototype, "deleteRule", Object.assign({}, n, {
      value: m
    })), Object.defineProperty(CSSStyleSheet.prototype, "removeRule", Object.assign({}, r, {
      value: g
    })), i && Object.defineProperty(Document.prototype, "styleSheets", Object.assign({}, s, {
      get: v
    })), l && Object.defineProperty(Element.prototype, "getElementsByTagName", Object.assign({}, c, {
      value: y
    }));
  }
  var ei = Yr(),
    ti = new Map(),
    ni = [],
    ri = null,
    ii = null,
    oi = null,
    ai = null,
    si = null;
  function li(e, t) {
    void 0 === t && (t = document.head || document);
    var n = t.querySelector("." + e);
    return n || (n = document.createElement("style"), n.classList.add("darkreader"), n.classList.add(e), n.media = "screen", n.textContent = ""), n;
  }
  function ci(e, t) {
    void 0 === t && (t = document.head || document);
    var n = t.querySelector("." + e);
    return n || (n = document.createElement("script"), n.classList.add("darkreader"), n.classList.add(e)), n;
  }
  var ui = new Map();
  function hi(e, t) {
    ui.has(t) && ui.get(t).stop(), ui.set(t, U(e, "parent"));
  }
  function fi() {
    N(ui.values(), function (e) {
      return e.stop();
    }), ui.clear();
  }
  function di() {
    var e = li("darkreader--fallback", document);
    e.textContent = on(ri, {
      strict: !0
    }), document.head.insertBefore(e, document.head.firstChild), hi(e, "fallback");
    var n = li("darkreader--user-agent");
    n.textContent = en(ri, oi, ri.styleSystemControls), document.head.insertBefore(n, e.nextSibling), hi(n, "user-agent");
    var r = li("darkreader--text");
    ri.useFont || ri.textStroke > 0 ? r.textContent = At(ri) : r.textContent = "", document.head.insertBefore(r, e.nextSibling), hi(r, "text");
    var i = li("darkreader--invert");
    ii && Array.isArray(ii.invert) && ii.invert.length > 0 ? i.textContent = [ii.invert.join(", ") + " {", "    filter: " + Pt(t(t({}, ri), {
      contrast: 0 === ri.mode ? ri.contrast : Xe(ri.contrast - 10, 0, 100)
    })) + " !important;", "}"].join("\n") : i.textContent = "", document.head.insertBefore(i, r.nextSibling), hi(i, "invert");
    var o = li("darkreader--inline");
    o.textContent = Xn(), document.head.insertBefore(o, i.nextSibling), hi(o, "inline");
    var a = li("darkreader--override");
    a.textContent = ii && ii.css ? gi(ii.css) : "", document.head.appendChild(a), hi(a, "override");
    var s = li("darkreader--variables"),
      l = tn(ri),
      c = ri.darkSchemeBackgroundColor,
      u = ri.darkSchemeTextColor,
      h = ri.lightSchemeBackgroundColor,
      f = ri.lightSchemeTextColor,
      d = ri.mode,
      p = 0 === d ? h : c,
      m = 0 === d ? f : u;
    p = wt(Re(p), ri), m = kt(Re(m), ri), s.textContent = [":root {", "   --darkreader-neutral-background: " + p + ";", "   --darkreader-neutral-text: " + m + ";", "   --darkreader-selection-background: " + l.backgroundColorSelection + ";", "   --darkreader-selection-text: " + l.foregroundColorSelection + ";", "}"].join("\n"), document.head.insertBefore(s, o.nextSibling), hi(s, "variables");
    var g = li("darkreader--root-vars");
    document.head.insertBefore(g, s.nextSibling);
    var v = ci("darkreader--proxy"),
      y = new Blob(["(" + Jr + ")()"], {
        type: "text/javascript"
      }),
      b = URL.createObjectURL(y);
    v.src = b, v.textContent = "", document.head.insertBefore(v, g.nextSibling), URL.revokeObjectURL(b), v.remove();
  }
  var pi = new Set();
  function mi(e) {
    var n = li("darkreader--inline", e);
    n.textContent = Xn(), e.insertBefore(n, e.firstChild);
    var r = li("darkreader--override", e);
    r.textContent = ii && ii.css ? gi(ii.css) : "", e.insertBefore(r, n.nextSibling);
    var i = li("darkreader--invert", e);
    ii && Array.isArray(ii.invert) && ii.invert.length > 0 ? i.textContent = [ii.invert.join(", ") + " {", "    filter: " + Pt(t(t({}, ri), {
      contrast: 0 === ri.mode ? ri.contrast : Xe(ri.contrast - 10, 0, 100)
    })) + " !important;", "}"].join("\n") : i.textContent = "", e.insertBefore(i, r.nextSibling), pi.add(e);
  }
  function gi(e) {
    return e.replace(/\${(.+?)}/g, function (e, t) {
      try {
        var n = ln(t);
        return mt(n, ri);
      } catch (e) {
        return F(e), t;
      }
    });
  }
  function vi() {
    var e = document.querySelector(".darkreader--fallback");
    e && (e.textContent = "");
  }
  function yi() {
    Si();
    var e = xr(document),
      t = e.filter(function (e) {
        return !ti.has(e);
      }).map(function (e) {
        return xi(e);
      });
    t.map(function (e) {
      return e.details();
    }).filter(function (e) {
      return e && e.rules.length > 0;
    }).forEach(function (e) {
      kn.addRulesForMatching(e.rules);
    }), kn.matchVariablesAndDependants(), kn.setOnRootVariableChange(function () {
      kn.putRootVars(document.head.querySelector(".darkreader--root-vars"), ri);
    }), kn.putRootVars(document.head.querySelector(".darkreader--root-vars"), ri), ti.forEach(function (e) {
      return e.render(ri, ai);
    }), 0 === wi.size && vi(), t.forEach(function (e) {
      return e.watch();
    });
    var n = I(document.querySelectorAll(Yn));
    z(document.documentElement, function (e) {
      mi(e.shadowRoot);
      var t = e.shadowRoot.querySelectorAll(Yn);
      t.length > 0 && D(n, t);
    }), n.forEach(function (e) {
      return sr(e, ri, si, ai);
    }), Pi(document);
  }
  var bi = 0,
    wi = new Set();
  function xi(e) {
    var t = ++bi;
    function n() {
      if (!G() || !Oi) {
        wi.add(t), $("Current amount of styles loading: " + wi.size);
        var e = document.querySelector(".darkreader--fallback");
        e.textContent || (e.textContent = on(ri, {
          strict: !1
        }));
      }
    }
    function r() {
      wi.delete(t), $("Removed loadingStyle " + t + ", now awaiting: " + wi.size), $("To-do to be loaded", wi), 0 === wi.size && G() && vi();
    }
    function i() {
      var e = o.details();
      e && (kn.addRulesForMatching(e.rules), kn.matchVariablesAndDependants(), o.render(ri, ai));
    }
    $("New manager for element, with loadingStyleID " + t, e);
    var o = Tr(e, {
      update: i,
      loadingStart: n,
      loadingEnd: r
    });
    return ti.set(e, o), o;
  }
  function _i(e) {
    var t = ti.get(e);
    t && (t.destroy(), ti.delete(e));
  }
  var Ei = B(function (e) {
      ti.forEach(function (e) {
        return e.render(ri, ai);
      }), ni.forEach(function (e) {
        return e.render(ri, ai);
      }), e && e();
    }),
    Si = function () {
      Ei.cancel();
    };
  function ki() {
    0 !== wi.size ? F("DOM is ready, but still have styles being loaded.", wi) : vi();
  }
  var Ci = null,
    Oi = !document.hidden;
  function Ti(e) {
    var t = Boolean(Ci);
    Ci = function () {
      document.hidden || (Li(), e(), Oi = !0);
    }, t || document.addEventListener("visibilitychange", Ci);
  }
  function Li() {
    document.removeEventListener("visibilitychange", Ci), Ci = null;
  }
  function Ai() {
    function e() {
      yi(), ji();
    }
    di(), document.hidden ? Ti(e) : e(), dr(ri);
  }
  function Pi(e) {
    if (Array.isArray(e.adoptedStyleSheets) && e.adoptedStyleSheets.length > 0) {
      var t = Zr(e);
      ni.push(t), t.render(ri, ai);
    }
  }
  function ji() {
    var e = Array.from(ti.keys());
    zr(e, function (e) {
      var t = e.created,
        n = e.updated,
        r = e.removed,
        i = e.moved,
        o = r,
        a = t.concat(n).concat(i).filter(function (e) {
          return !ti.has(e);
        }),
        s = i.filter(function (e) {
          return ti.has(e);
        });
      $("Styles to be removed:", o), o.forEach(function (e) {
        return _i(e);
      });
      var l = a.map(function (e) {
        return xi(e);
      });
      l.map(function (e) {
        return e.details();
      }).filter(function (e) {
        return e && e.rules.length > 0;
      }).forEach(function (e) {
        kn.addRulesForMatching(e.rules);
      }), kn.matchVariablesAndDependants(), l.forEach(function (e) {
        return e.render(ri, ai);
      }), l.forEach(function (e) {
        return e.watch();
      }), s.forEach(function (e) {
        return ti.get(e).restore();
      });
    }, function (e) {
      mi(e), Pi(e);
    }), er(function (e) {
      if (sr(e, ri, si, ai), e === document.documentElement) {
        var t = e.getAttribute("style");
        t.includes("--") && (kn.matchVariablesAndDependants(), kn.putRootVars(document.head.querySelector(".darkreader--root-vars"), ri));
      }
    }, function (e) {
      mi(e);
      var t = e.querySelectorAll(Yn);
      t.length > 0 && N(t, function (e) {
        return sr(e, ri, si, ai);
      });
    }), K(ki);
  }
  function Mi() {
    ti.forEach(function (e) {
      return e.pause();
    }), fi(), qr(), nr(), Y(ki), J();
  }
  function Ri() {
    var e = document.createElement("meta");
    e.name = "darkreader", e.content = ei, document.head.appendChild(e);
  }
  function Ni() {
    var e = document.querySelector('meta[name="darkreader"]');
    return e ? e.content !== ei : (Ri(), !1);
  }
  function Di(e, t, n) {
    if (ri = e, ii = t, ii ? (ai = Array.isArray(ii.ignoreImageAnalysis) ? ii.ignoreImageAnalysis : [], si = Array.isArray(ii.ignoreInlineStyle) ? ii.ignoreInlineStyle : []) : (ai = [], si = []), oi = n, document.head) {
      if (Ni()) return;
      document.documentElement.setAttribute("data-darkreader-mode", "dynamic"), document.documentElement.setAttribute("data-darkreader-scheme", ri.mode ? "dark" : "dimmed"), Ai();
    } else {
      if (!f) {
        var r = li("darkreader--fallback");
        document.documentElement.appendChild(r), r.textContent = on(ri, {
          strict: !0
        });
      }
      var i = new MutationObserver(function () {
        if (document.head) {
          if (i.disconnect(), Ni()) return void $i();
          Ai();
        }
      });
      i.observe(document, {
        childList: !0,
        subtree: !0
      });
    }
  }
  function Ii() {
    document.dispatchEvent(new CustomEvent("__darkreader__cleanUp")), H(document.head.querySelector(".darkreader--proxy"));
  }
  function $i() {
    document.documentElement.removeAttribute("data-darkreader-mode"), document.documentElement.removeAttribute("data-darkreader-scheme"), Fi(), H(document.querySelector(".darkreader--fallback")), document.head && (pr(), H(document.head.querySelector(".darkreader--user-agent")), H(document.head.querySelector(".darkreader--text")), H(document.head.querySelector(".darkreader--invert")), H(document.head.querySelector(".darkreader--inline")), H(document.head.querySelector(".darkreader--override")), H(document.head.querySelector(".darkreader--variables")), H(document.head.querySelector(".darkreader--root-vars")), H(document.head.querySelector('meta[name="darkreader"]')), Ii()), pi.forEach(function (e) {
      H(e.querySelector(".darkreader--inline")), H(e.querySelector(".darkreader--override"));
    }), pi.clear(), N(ti.keys(), function (e) {
      return _i(e);
    }), wi.clear(), Or(), N(document.querySelectorAll(".darkreader"), H), ni.forEach(function (e) {
      e.destroy();
    }), ni.splice(0);
  }
  function Fi() {
    kn.clear(), le.clear(), Li(), Si(), Mi(), bn();
  }
  var Bi = /url\(\"(blob\:.*?)\"\)/g;
  function Vi(e) {
    return n(this, void 0, void 0, function () {
      var t, n;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return t = [], Ze(Bi, e, 1).forEach(function (e) {
              var n = w(e);
              t.push(n);
            }), [4, Promise.all(t)];
          case 1:
            return n = r.sent(), [2, e.replace(Bi, function () {
              return 'url("' + n.shift() + '")';
            })];
        }
      });
    });
  }
  var Wi = '/*\n                        _______\n                       /       \\\n                      .==.    .==.\n                     ((  ))==((  ))\n                    / "=="    "=="\\\n                   /____|| || ||___\\\n       ________     ____    ________  ___    ___\n       |  ___  \\   /    \\   |  ___  \\ |  |  /  /\n       |  |  \\  \\ /  /\\  \\  |  |  \\  \\|  |_/  /\n       |  |   )  /  /__\\  \\ |  |__/  /|  ___  \\\n       |  |__/  /  ______  \\|  ____  \\|  |  \\  \\\n_______|_______/__/ ____ \\__\\__|___\\__\\__|___\\__\\____\n|  ___  \\ |  ____/ /    \\   |  ___  \\ |  ____|  ___  \\\n|  |  \\  \\|  |___ /  /\\  \\  |  |  \\  \\|  |___|  |  \\  \\\n|  |__/  /|  ____/  /__\\  \\ |  |   )  |  ____|  |__/  /\n|  ____  \\|  |__/  ______  \\|  |__/  /|  |___|  ____  \\\n|__|   \\__\\____/__/      \\__\\_______/ |______|__|   \\__\\\n                https://darkreader.org\n*/\n\n/*! Dark reader generated CSS | Licensed under MIT https://github.com/darkreader/darkreader/blob/master/LICENSE */\n';
  function Hi() {
    return n(this, void 0, void 0, function () {
      function e(e, n) {
        var r = document.querySelector(e);
        r && r.textContent && (t.push("/* " + n + " */"), t.push(r.textContent), t.push(""));
      }
      var t, n, i, o, a;
      return r(this, function (r) {
        switch (r.label) {
          case 0:
            return t = [Wi], e(".darkreader--fallback", "Fallback Style"), e(".darkreader--user-agent", "User-Agent Style"), e(".darkreader--text", "Text Style"), e(".darkreader--invert", "Invert Style"), e(".darkreader--variables", "Variables Style"), n = [], document.querySelectorAll(".darkreader--sync").forEach(function (e) {
              N(e.sheet.cssRules, function (e) {
                e && e.cssText && n.push(e.cssText);
              });
            }), n.length ? (i = Je(n.join("\n")), t.push("/* Modified CSS */"), a = (o = t).push, [4, Vi(i)]) : [3, 2];
          case 1:
            a.apply(o, [r.sent()]), t.push(""), r.label = 2;
          case 2:
            return e(".darkreader--override", "Override Style"), [2, t.join("\n")];
        }
      });
    });
  }
  var Ui = !1,
    zi = function () {
      try {
        return window.self !== window.top;
      } catch (e) {
        return console.warn(e), !0;
      }
    }();
  function Gi(e, n) {
    void 0 === e && (e = {}), void 0 === n && (n = null);
    var r = t(t({}, M), e);
    if (r.engine !== P.dynamicTheme) throw new Error("Theme engine is not supported.");
    Di(r, n, zi), Ui = !0;
  }
  function qi() {
    return Ui;
  }
  function Ki() {
    $i(), Ui = !1;
  }
  var Yi = matchMedia("(prefers-color-scheme: dark)"),
    Xi = {
      themeOptions: null,
      fixes: null
    };
  function Qi() {
    Yi.matches ? Gi(Xi.themeOptions, Xi.fixes) : Ki();
  }
  function Zi(e, t) {
    void 0 === e && (e = {}), void 0 === t && (t = null), e ? (Xi = {
      themeOptions: e,
      fixes: t
    }, Qi(), v ? Yi.addEventListener("change", Qi) : Yi.addListener(Qi)) : (v ? Yi.removeEventListener("change", Qi) : Yi.removeListener(Qi), Ki());
  }
  function Ji() {
    return n(this, void 0, void 0, function () {
      return r(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, Hi()];
          case 1:
            return [2, e.sent()];
        }
      });
    });
  }
  var eo = S;
  e.auto = Zi, e.disable = Ki, e.enable = Gi, e.exportGeneratedCSS = Ji, e.isEnabled = qi, e.setFetchMethod = eo, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});
