let legacyModule = module,
  legacyExports = exports;
(function (e) {
  (function () {
    var e = "ace",
      t = function () {
        return this;
      }();
    if (t || "undefined" == typeof window || (t = window), e || "undefined" === typeof requirejs) {
      var n = function (e, t, r) {
        "string" === typeof e ? (2 == arguments.length && (r = t), n.modules[e] || (n.payloads[e] = r, n.modules[e] = null)) : n.original ? n.original.apply(this, arguments) : (console.error("dropping module because define wasn't a string."), console.trace());
      };
      n.modules = {}, n.payloads = {};
      var r = function (e, t, n) {
          if ("string" === typeof t) {
            var r = a(e, t);
            if (void 0 != r) return n && n(), r;
          } else if ("[object Array]" === Object.prototype.toString.call(t)) {
            for (var o = [], s = 0, l = t.length; s < l; ++s) {
              var c = a(e, t[s]);
              if (void 0 == c && i.original) return;
              o.push(c);
            }
            return n && n.apply(null, o) || !0;
          }
        },
        i = function (e, t) {
          var n = r("", e, t);
          return void 0 == n && i.original ? i.original.apply(this, arguments) : n;
        },
        o = function (e, t) {
          if (-1 !== t.indexOf("!")) {
            var n = t.split("!");
            return o(e, n[0]) + "!" + o(e, n[1]);
          }
          if ("." == t.charAt(0)) {
            var r = e.split("/").slice(0, -1).join("/");
            t = r + "/" + t;
            while (-1 !== t.indexOf(".") && i != t) {
              var i = t;
              t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "");
            }
          }
          return t;
        },
        a = function (e, t) {
          t = o(e, t);
          var i = n.modules[t];
          if (!i) {
            if (i = n.payloads[t], "function" === typeof i) {
              var a = {},
                s = {
                  id: t,
                  uri: "",
                  exports: a,
                  packaged: !0
                },
                l = function (e, n) {
                  return r(t, e, n);
                },
                c = i(l, a, s);
              a = c || s.exports, n.modules[t] = a, delete n.payloads[t];
            }
            i = n.modules[t] = a || i;
          }
          return i;
        };
      s(e);
    }
    function s(e) {
      var r = t;
      e && (t[e] || (t[e] = {}), r = t[e]), r.define && r.define.packaged || (n.original = r.define, r.define = n, r.define.packaged = !0), r.require && r.require.packaged || (i.original = r.require, r.require = i, r.require.packaged = !0);
    }
  })(), ace.define("ace/lib/es6-shim", ["require", "exports", "module"], function (e, t, n) {
    function r(e, t, n) {
      Object.defineProperty(e, t, {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0
      });
    }
    String.prototype.startsWith || r(String.prototype, "startsWith", function (e, t) {
      return t = t || 0, this.lastIndexOf(e, t) === t;
    }), String.prototype.endsWith || r(String.prototype, "endsWith", function (e, t) {
      var n = this;
      (void 0 === t || t > n.length) && (t = n.length), t -= e.length;
      var r = n.indexOf(e, t);
      return -1 !== r && r === t;
    }), String.prototype.repeat || r(String.prototype, "repeat", function (e) {
      var t = "",
        n = this;
      while (e > 0) 1 & e && (t += n), (e >>= 1) && (n += n);
      return t;
    }), String.prototype.includes || r(String.prototype, "includes", function (e, t) {
      return -1 != this.indexOf(e, t);
    }), Object.assign || (Object.assign = function (e) {
      if (void 0 === e || null === e) throw new TypeError("Cannot convert undefined or null to object");
      for (var t = Object(e), n = 1; n < arguments.length; n++) {
        var r = arguments[n];
        void 0 !== r && null !== r && Object.keys(r).forEach(function (e) {
          t[e] = r[e];
        });
      }
      return t;
    }), Object.values || (Object.values = function (e) {
      return Object.keys(e).map(function (t) {
        return e[t];
      });
    }), Array.prototype.find || r(Array.prototype, "find", function (e) {
      for (var t = this.length, n = arguments[1], r = 0; r < t; r++) {
        var i = this[r];
        if (e.call(n, i, r, this)) return i;
      }
    }), Array.prototype.findIndex || r(Array.prototype, "findIndex", function (e) {
      for (var t = this.length, n = arguments[1], r = 0; r < t; r++) {
        var i = this[r];
        if (e.call(n, i, r, this)) return r;
      }
    }), Array.prototype.includes || r(Array.prototype, "includes", function (e, t) {
      return -1 != this.indexOf(e, t);
    }), Array.prototype.fill || r(Array.prototype, "fill", function (e) {
      var t = this,
        n = t.length >>> 0,
        r = arguments[1],
        i = r >> 0,
        o = i < 0 ? Math.max(n + i, 0) : Math.min(i, n),
        a = arguments[2],
        s = void 0 === a ? n : a >> 0,
        l = s < 0 ? Math.max(n + s, 0) : Math.min(s, n);
      while (o < l) t[o] = e, o++;
      return t;
    }), Array.of || r(Array, "of", function () {
      return Array.prototype.slice.call(arguments);
    });
  }), ace.define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/es6-shim"], function (e, t, n) {
    "use strict";

    e("./es6-shim");
  }), ace.define("ace/lib/lang", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    t.last = function (e) {
      return e[e.length - 1];
    }, t.stringReverse = function (e) {
      return e.split("").reverse().join("");
    }, t.stringRepeat = function (e, t) {
      var n = "";
      while (t > 0) 1 & t && (n += e), (t >>= 1) && (e += e);
      return n;
    };
    var r = /^\s\s*/,
      i = /\s\s*$/;
    t.stringTrimLeft = function (e) {
      return e.replace(r, "");
    }, t.stringTrimRight = function (e) {
      return e.replace(i, "");
    }, t.copyObject = function (e) {
      var t = {};
      for (var n in e) t[n] = e[n];
      return t;
    }, t.copyArray = function (e) {
      for (var t = [], n = 0, r = e.length; n < r; n++) e[n] && "object" == typeof e[n] ? t[n] = this.copyObject(e[n]) : t[n] = e[n];
      return t;
    }, t.deepCopy = function e(t) {
      if ("object" !== typeof t || !t) return t;
      var n;
      if (Array.isArray(t)) {
        n = [];
        for (var r = 0; r < t.length; r++) n[r] = e(t[r]);
        return n;
      }
      if ("[object Object]" !== Object.prototype.toString.call(t)) return t;
      for (var r in n = {}, t) n[r] = e(t[r]);
      return n;
    }, t.arrayToMap = function (e) {
      for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = 1;
      return t;
    }, t.createMap = function (e) {
      var t = Object.create(null);
      for (var n in e) t[n] = e[n];
      return t;
    }, t.arrayRemove = function (e, t) {
      for (var n = 0; n <= e.length; n++) t === e[n] && e.splice(n, 1);
    }, t.escapeRegExp = function (e) {
      return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
    }, t.escapeHTML = function (e) {
      return ("" + e).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
    }, t.getMatchOffsets = function (e, t) {
      var n = [];
      return e.replace(t, function (e) {
        n.push({
          offset: arguments[arguments.length - 2],
          length: e.length
        });
      }), n;
    }, t.deferredCall = function (e) {
      var t = null,
        n = function () {
          t = null, e();
        },
        r = function (e) {
          return r.cancel(), t = setTimeout(n, e || 0), r;
        };
      return r.schedule = r, r.call = function () {
        return this.cancel(), e(), r;
      }, r.cancel = function () {
        return clearTimeout(t), t = null, r;
      }, r.isPending = function () {
        return t;
      }, r;
    }, t.delayedCall = function (e, t) {
      var n = null,
        r = function () {
          n = null, e();
        },
        i = function (e) {
          null == n && (n = setTimeout(r, e || t));
        };
      return i.delay = function (e) {
        n && clearTimeout(n), n = setTimeout(r, e || t);
      }, i.schedule = i, i.call = function () {
        this.cancel(), e();
      }, i.cancel = function () {
        n && clearTimeout(n), n = null;
      }, i.isPending = function () {
        return n;
      }, i;
    };
  }), ace.define("ace/lib/oop", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    t.inherits = function (e, t) {
      e.super_ = t, e.prototype = Object.create(t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
    }, t.mixin = function (e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }, t.implement = function (e, n) {
      t.mixin(e, n);
    };
  }), ace.define("ace/lib/useragent", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    t.OS = {
      LINUX: "LINUX",
      MAC: "MAC",
      WINDOWS: "WINDOWS"
    }, t.getOS = function () {
      return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS;
    };
    var r = "object" == typeof navigator ? navigator : {},
      i = (/mac|win|linux/i.exec(r.platform) || ["other"])[0].toLowerCase(),
      o = r.userAgent || "",
      a = r.appName || "";
    t.isWin = "win" == i, t.isMac = "mac" == i, t.isLinux = "linux" == i, t.isIE = "Microsoft Internet Explorer" == a || a.indexOf("MSAppHost") >= 0 ? parseFloat((o.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((o.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = o.match(/ Gecko\/\d+/), t.isOpera = "object" == typeof opera && "[object Opera]" == Object.prototype.toString.call(window.opera), t.isWebKit = parseFloat(o.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(o.split(" Chrome/")[1]) || void 0, t.isEdge = parseFloat(o.split(" Edge/")[1]) || void 0, t.isAIR = o.indexOf("AdobeAIR") >= 0, t.isAndroid = o.indexOf("Android") >= 0, t.isChromeOS = o.indexOf(" CrOS ") >= 0, t.isIOS = /iPad|iPhone|iPod/.test(o) && !window.MSStream, t.isIOS && (t.isMac = !0), t.isMobile = t.isIOS || t.isAndroid;
  }), ace.define("ace/lib/dom", ["require", "exports", "module", "ace/lib/useragent"], function (e, t, n) {
    "use strict";

    var r,
      i = e("./useragent"),
      o = "http://www.w3.org/1999/xhtml";
    t.buildDom = function e(t, n, r) {
      if ("string" == typeof t && t) {
        var i = document.createTextNode(t);
        return n && n.appendChild(i), i;
      }
      if (!Array.isArray(t)) return t && t.appendChild && n && n.appendChild(t), t;
      if ("string" != typeof t[0] || !t[0]) {
        for (var o = [], a = 0; a < t.length; a++) {
          var s = e(t[a], n, r);
          s && o.push(s);
        }
        return o;
      }
      var l = document.createElement(t[0]),
        c = t[1],
        u = 1;
      c && "object" == typeof c && !Array.isArray(c) && (u = 2);
      for (a = u; a < t.length; a++) e(t[a], l, r);
      return 2 == u && Object.keys(c).forEach(function (e) {
        var t = c[e];
        "class" === e ? l.className = Array.isArray(t) ? t.join(" ") : t : "function" == typeof t || "value" == e || "$" == e[0] ? l[e] = t : "ref" === e ? r && (r[t] = l) : "style" === e ? "string" == typeof t && (l.style.cssText = t) : null != t && l.setAttribute(e, t);
      }), n && n.appendChild(l), l;
    }, t.getDocumentHead = function (e) {
      return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement;
    }, t.createElement = function (e, t) {
      return document.createElementNS ? document.createElementNS(t || o, e) : document.createElement(e);
    }, t.removeChildren = function (e) {
      e.innerHTML = "";
    }, t.createTextNode = function (e, t) {
      var n = t ? t.ownerDocument : document;
      return n.createTextNode(e);
    }, t.createFragment = function (e) {
      var t = e ? e.ownerDocument : document;
      return t.createDocumentFragment();
    }, t.hasCssClass = function (e, t) {
      var n = (e.className + "").split(/\s+/g);
      return -1 !== n.indexOf(t);
    }, t.addCssClass = function (e, n) {
      t.hasCssClass(e, n) || (e.className += " " + n);
    }, t.removeCssClass = function (e, t) {
      var n = e.className.split(/\s+/g);
      while (1) {
        var r = n.indexOf(t);
        if (-1 == r) break;
        n.splice(r, 1);
      }
      e.className = n.join(" ");
    }, t.toggleCssClass = function (e, t) {
      var n = e.className.split(/\s+/g),
        r = !0;
      while (1) {
        var i = n.indexOf(t);
        if (-1 == i) break;
        r = !1, n.splice(i, 1);
      }
      return r && n.push(t), e.className = n.join(" "), r;
    }, t.setCssClass = function (e, n, r) {
      r ? t.addCssClass(e, n) : t.removeCssClass(e, n);
    }, t.hasCssString = function (e, t) {
      var n,
        r = 0;
      if (t = t || document, n = t.querySelectorAll("style")) while (r < n.length) if (n[r++].id === e) return !0;
    }, t.removeElementById = function (e, t) {
      t = t || document, t.getElementById(e) && t.getElementById(e).remove();
    };
    var a = [];
    function s() {
      var e = a;
      a = null, e && e.forEach(function (e) {
        l(e[0], e[1]);
      });
    }
    function l(e, n, i) {
      if ("undefined" != typeof document) {
        if (a) if (i) s();else if (!1 === i) return a.push([e, n]);
        if (!r) {
          var o = i;
          i && i.getRootNode ? (o = i.getRootNode(), o && o != i || (o = document)) : o = document;
          var l = o.ownerDocument || o;
          if (n && t.hasCssString(n, o)) return null;
          n && (e += "\n/*# sourceURL=ace/css/" + n + " */");
          var c = t.createElement("style");
          c.appendChild(l.createTextNode(e)), n && (c.id = n), o == l && (o = t.getDocumentHead(l)), o.insertBefore(c, o.firstChild);
        }
      }
    }
    if (t.useStrictCSP = function (e) {
      r = e, 0 == e ? s() : a || (a = []);
    }, t.importCssString = l, t.importCssStylsheet = function (e, n) {
      t.buildDom(["link", {
        rel: "stylesheet",
        href: e
      }], t.getDocumentHead(n));
    }, t.scrollbarWidth = function (e) {
      var n = t.createElement("ace_inner");
      n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
      var r = t.createElement("ace_outer"),
        i = r.style;
      i.position = "absolute", i.left = "-10000px", i.overflow = "hidden", i.width = "200px", i.minWidth = "0px", i.height = "150px", i.display = "block", r.appendChild(n);
      var o = e && e.documentElement || document && document.documentElement;
      if (!o) return 0;
      o.appendChild(r);
      var a = n.offsetWidth;
      i.overflow = "scroll";
      var s = n.offsetWidth;
      return a === s && (s = r.clientWidth), o.removeChild(r), a - s;
    }, t.computedStyle = function (e, t) {
      return window.getComputedStyle(e, "") || {};
    }, t.setStyle = function (e, t, n) {
      e[t] !== n && (e[t] = n);
    }, t.HAS_CSS_ANIMATION = !1, t.HAS_CSS_TRANSFORMS = !1, t.HI_DPI = !i.isWin || "undefined" !== typeof window && window.devicePixelRatio >= 1.5, i.isChromeOS && (t.HI_DPI = !1), "undefined" !== typeof document) {
      var c = document.createElement("div");
      t.HI_DPI && void 0 !== c.style.transform && (t.HAS_CSS_TRANSFORMS = !0), i.isEdge || "undefined" === typeof c.style.animationName || (t.HAS_CSS_ANIMATION = !0), c = null;
    }
    t.HAS_CSS_TRANSFORMS ? t.translate = function (e, t, n) {
      e.style.transform = "translate(" + Math.round(t) + "px, " + Math.round(n) + "px)";
    } : t.translate = function (e, t, n) {
      e.style.top = Math.round(n) + "px", e.style.left = Math.round(t) + "px";
    };
  }), ace.define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    var r = e("./dom");
    t.get = function (e, t) {
      var n = new XMLHttpRequest();
      n.open("GET", e, !0), n.onreadystatechange = function () {
        4 === n.readyState && t(n.responseText);
      }, n.send(null);
    }, t.loadScript = function (e, t) {
      var n = r.getDocumentHead(),
        i = document.createElement("script");
      i.src = e, n.appendChild(i), i.onload = i.onreadystatechange = function (e, n) {
        !n && i.readyState && "loaded" != i.readyState && "complete" != i.readyState || (i = i.onload = i.onreadystatechange = null, n || t());
      };
    }, t.qualifyURL = function (e) {
      var t = document.createElement("a");
      return t.href = e, t.href;
    };
  }), ace.define("ace/lib/event_emitter", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    var r = {},
      i = function () {
        this.propagationStopped = !0;
      },
      o = function () {
        this.defaultPrevented = !0;
      };
    r._emit = r._dispatchEvent = function (e, t) {
      this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
      var n = this._eventRegistry[e] || [],
        r = this._defaultHandlers[e];
      if (n.length || r) {
        "object" == typeof t && t || (t = {}), t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = i), t.preventDefault || (t.preventDefault = o), n = n.slice();
        for (var a = 0; a < n.length; a++) if (n[a](t, this), t.propagationStopped) break;
        return r && !t.defaultPrevented ? r(t, this) : void 0;
      }
    }, r._signal = function (e, t) {
      var n = (this._eventRegistry || {})[e];
      if (n) {
        n = n.slice();
        for (var r = 0; r < n.length; r++) n[r](t, this);
      }
    }, r.once = function (e, t) {
      var n = this;
      if (this.on(e, function r() {
        n.off(e, r), t.apply(null, arguments);
      }), !t) return new Promise(function (e) {
        t = e;
      });
    }, r.setDefaultHandler = function (e, t) {
      var n = this._defaultHandlers;
      if (n || (n = this._defaultHandlers = {
        _disabled_: {}
      }), n[e]) {
        var r = n[e],
          i = n._disabled_[e];
        i || (n._disabled_[e] = i = []), i.push(r);
        var o = i.indexOf(t);
        -1 != o && i.splice(o, 1);
      }
      n[e] = t;
    }, r.removeDefaultHandler = function (e, t) {
      var n = this._defaultHandlers;
      if (n) {
        var r = n._disabled_[e];
        if (n[e] == t) r && this.setDefaultHandler(e, r.pop());else if (r) {
          var i = r.indexOf(t);
          -1 != i && r.splice(i, 1);
        }
      }
    }, r.on = r.addEventListener = function (e, t, n) {
      this._eventRegistry = this._eventRegistry || {};
      var r = this._eventRegistry[e];
      return r || (r = this._eventRegistry[e] = []), -1 == r.indexOf(t) && r[n ? "unshift" : "push"](t), t;
    }, r.off = r.removeListener = r.removeEventListener = function (e, t) {
      this._eventRegistry = this._eventRegistry || {};
      var n = this._eventRegistry[e];
      if (n) {
        var r = n.indexOf(t);
        -1 !== r && n.splice(r, 1);
      }
    }, r.removeAllListeners = function (e) {
      e || (this._eventRegistry = this._defaultHandlers = void 0), this._eventRegistry && (this._eventRegistry[e] = void 0), this._defaultHandlers && (this._defaultHandlers[e] = void 0);
    }, t.EventEmitter = r;
  }), ace.define("ace/lib/app_config", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, n) {
    "no use strict";

    var r = e("./oop"),
      i = e("./event_emitter").EventEmitter,
      o = {
        setOptions: function (e) {
          Object.keys(e).forEach(function (t) {
            this.setOption(t, e[t]);
          }, this);
        },
        getOptions: function (e) {
          var t = {};
          if (e) Array.isArray(e) || (t = e, e = Object.keys(t));else {
            var n = this.$options;
            e = Object.keys(n).filter(function (e) {
              return !n[e].hidden;
            });
          }
          return e.forEach(function (e) {
            t[e] = this.getOption(e);
          }, this), t;
        },
        setOption: function (e, t) {
          if (this["$" + e] !== t) {
            var n = this.$options[e];
            if (!n) return a('misspelled option "' + e + '"');
            if (n.forwardTo) return this[n.forwardTo] && this[n.forwardTo].setOption(e, t);
            n.handlesSet || (this["$" + e] = t), n && n.set && n.set.call(this, t);
          }
        },
        getOption: function (e) {
          var t = this.$options[e];
          return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : a('misspelled option "' + e + '"');
        }
      };
    function a(e) {
      "undefined" != typeof console && console.warn && console.warn.apply(console, arguments);
    }
    function s(e, t) {
      var n = new Error(e);
      n.data = t, "object" == typeof console && console.error && console.error(n), setTimeout(function () {
        throw n;
      });
    }
    var l = function () {
      this.$defaultOptions = {};
    };
    (function () {
      r.implement(this, i), this.defineOptions = function (e, t, n) {
        return e.$options || (this.$defaultOptions[t] = e.$options = {}), Object.keys(n).forEach(function (t) {
          var r = n[t];
          "string" == typeof r && (r = {
            forwardTo: r
          }), r.name || (r.name = t), e.$options[r.name] = r, "initialValue" in r && (e["$" + r.name] = r.initialValue);
        }), r.implement(e, o), this;
      }, this.resetOptions = function (e) {
        Object.keys(e.$options).forEach(function (t) {
          var n = e.$options[t];
          "value" in n && e.setOption(t, n.value);
        });
      }, this.setDefaultValue = function (e, t, n) {
        if (!e) {
          for (e in this.$defaultOptions) if (this.$defaultOptions[e][t]) break;
          if (!this.$defaultOptions[e][t]) return !1;
        }
        var r = this.$defaultOptions[e] || (this.$defaultOptions[e] = {});
        r[t] && (r.forwardTo ? this.setDefaultValue(r.forwardTo, t, n) : r[t].value = n);
      }, this.setDefaultValues = function (e, t) {
        Object.keys(t).forEach(function (n) {
          this.setDefaultValue(e, n, t[n]);
        }, this);
      }, this.warn = a, this.reportError = s;
    }).call(l.prototype), t.AppConfig = l;
  }), ace.define("ace/theme/textmate.css", ["require", "exports", "module"], function (e, t, n) {
    n.exports = '.ace-tm .ace_gutter {\n  background: #f0f0f0;\n  color: #333;\n}\n\n.ace-tm .ace_print-margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tm .ace_fold {\n    background-color: #6B72E6;\n}\n\n.ace-tm {\n  background-color: #FFFFFF;\n  color: black;\n}\n\n.ace-tm .ace_cursor {\n  color: black;\n}\n        \n.ace-tm .ace_invisible {\n  color: rgb(191, 191, 191);\n}\n\n.ace-tm .ace_storage,\n.ace-tm .ace_keyword {\n  color: blue;\n}\n\n.ace-tm .ace_constant {\n  color: rgb(197, 6, 11);\n}\n\n.ace-tm .ace_constant.ace_buildin {\n  color: rgb(88, 72, 246);\n}\n\n.ace-tm .ace_constant.ace_language {\n  color: rgb(88, 92, 246);\n}\n\n.ace-tm .ace_constant.ace_library {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_invalid {\n  background-color: rgba(255, 0, 0, 0.1);\n  color: red;\n}\n\n.ace-tm .ace_support.ace_function {\n  color: rgb(60, 76, 114);\n}\n\n.ace-tm .ace_support.ace_constant {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_support.ace_type,\n.ace-tm .ace_support.ace_class {\n  color: rgb(109, 121, 222);\n}\n\n.ace-tm .ace_keyword.ace_operator {\n  color: rgb(104, 118, 135);\n}\n\n.ace-tm .ace_string {\n  color: rgb(3, 106, 7);\n}\n\n.ace-tm .ace_comment {\n  color: rgb(76, 136, 107);\n}\n\n.ace-tm .ace_comment.ace_doc {\n  color: rgb(0, 102, 255);\n}\n\n.ace-tm .ace_comment.ace_doc.ace_tag {\n  color: rgb(128, 159, 191);\n}\n\n.ace-tm .ace_constant.ace_numeric {\n  color: rgb(0, 0, 205);\n}\n\n.ace-tm .ace_variable {\n  color: rgb(49, 132, 149);\n}\n\n.ace-tm .ace_xml-pe {\n  color: rgb(104, 104, 91);\n}\n\n.ace-tm .ace_entity.ace_name.ace_function {\n  color: #0000A2;\n}\n\n\n.ace-tm .ace_heading {\n  color: rgb(12, 7, 255);\n}\n\n.ace-tm .ace_list {\n  color:rgb(185, 6, 144);\n}\n\n.ace-tm .ace_meta.ace_tag {\n  color:rgb(0, 22, 142);\n}\n\n.ace-tm .ace_string.ace_regex {\n  color: rgb(255, 0, 0)\n}\n\n.ace-tm .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n.ace-tm.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px white;\n}\n.ace-tm .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-tm .ace_marker-layer .ace_stack {\n  background: rgb(164, 229, 101);\n}\n\n.ace-tm .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-tm .ace_marker-layer .ace_active-line {\n  background: rgba(0, 0, 0, 0.07);\n}\n\n.ace-tm .ace_gutter-active-line {\n    background-color : #dcdcdc;\n}\n\n.ace-tm .ace_marker-layer .ace_selected-word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-tm .ace_indent-guide {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;\n}\n\n.ace-tm .ace_indent-guide-active {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;\n}\n';
  }), ace.define("ace/theme/textmate", ["require", "exports", "module", "ace/theme/textmate.css", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    t.isDark = !1, t.cssClass = "ace-tm", t.cssText = e("./textmate.css"), t.$id = "ace/theme/textmate";
    var r = e("../lib/dom");
    r.importCssString(t.cssText, t.cssClass, !1);
  }), ace.define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/dom", "ace/lib/app_config", "ace/theme/textmate"], function (e, t, n) {
    "no use strict";

    var r = e("./lib/lang"),
      i = (e("./lib/oop"), e("./lib/net")),
      o = e("./lib/dom"),
      a = e("./lib/app_config").AppConfig;
    n.exports = t = new a();
    var s = {
      packaged: !1,
      workerPath: null,
      modePath: null,
      themePath: null,
      basePath: "",
      suffix: ".js",
      $moduleUrls: {},
      loadWorkerFromBlob: !0,
      sharedPopups: !1,
      useStrictCSP: null
    };
    t.get = function (e) {
      if (!s.hasOwnProperty(e)) throw new Error("Unknown config key: " + e);
      return s[e];
    }, t.set = function (e, t) {
      if (s.hasOwnProperty(e)) s[e] = t;else if (0 == this.setDefaultValue("", e, t)) throw new Error("Unknown config key: " + e);
      "useStrictCSP" == e && o.useStrictCSP(t);
    }, t.all = function () {
      return r.copyObject(s);
    }, t.$modes = {}, t.moduleUrl = function (e, t) {
      if (s.$moduleUrls[e]) return s.$moduleUrls[e];
      var n = e.split("/");
      t = t || n[n.length - 2] || "";
      var r = "snippets" == t ? "/" : "-",
        i = n[n.length - 1];
      if ("worker" == t && "-" == r) {
        var o = new RegExp("^" + t + "[\\-_]|[\\-_]" + t + "$", "g");
        i = i.replace(o, "");
      }
      (!i || i == t) && n.length > 1 && (i = n[n.length - 2]);
      var a = s[t + "Path"];
      return null == a ? a = s.basePath : "/" == r && (t = r = ""), a && "/" != a.slice(-1) && (a += "/"), a + t + r + i + this.get("suffix");
    }, t.setModuleUrl = function (e, t) {
      return s.$moduleUrls[e] = t;
    };
    var l = function (t, n) {
      return "ace/theme/textmate" == t ? n(null, e("./theme/textmate")) : console.error("loader is not configured");
    };
    t.setLoader = function (e) {
      l = e;
    }, t.$loading = {}, t.loadModule = function (n, r) {
      var o, a;
      Array.isArray(n) && (a = n[0], n = n[1]);
      try {
        o = e(n);
      } catch (e) {}
      if (o && !t.$loading[n]) return r && r(o);
      if (t.$loading[n] || (t.$loading[n] = []), t.$loading[n].push(r), !(t.$loading[n].length > 1)) {
        var s = function () {
          l(n, function (e, r) {
            t._emit("load.module", {
              name: n,
              module: r
            });
            var i = t.$loading[n];
            t.$loading[n] = null, i.forEach(function (e) {
              e && e(r);
            });
          });
        };
        if (!t.get("packaged")) return s();
        i.loadScript(t.moduleUrl(n, a), s), c();
      }
    };
    var c = function () {
      s.basePath || s.workerPath || s.modePath || s.themePath || Object.keys(s.$moduleUrls).length || (console.error("Unable to infer path to ace from script src,", "use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes", "or with webpack use ace/webpack-resolver"), c = function () {});
    };
    t.version = "1.13.1";
  }), ace.define("ace/loader_build", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/config"], function (e, t, r) {
    "use strict";

    e("./lib/fixoldbrowsers");
    var i = e("./config");
    i.setLoader(function (t, n) {
      e([t], function (e) {
        n(null, e);
      });
    });
    var o = function () {
      return this || "undefined" != typeof window && window;
    }();
    function a(t) {
      if (o && o.document) {
        i.set("packaged", t || e.packaged || r.packaged || o.define && require("./42395971.js").packaged);
        for (var a = {}, l = "", c = document.currentScript || document._currentScript, u = c && c.ownerDocument || document, h = u.getElementsByTagName("script"), f = 0; f < h.length; f++) {
          var d = h[f],
            p = d.src || d.getAttribute("src");
          if (p) {
            for (var m = d.attributes, g = 0, v = m.length; g < v; g++) {
              var y = m[g];
              0 === y.name.indexOf("data-ace-") && (a[s(y.name.replace(/^data-ace-/, ""))] = y.value);
            }
            var b = p.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
            b && (l = b[1]);
          }
        }
        for (var w in l && (a.base = a.base || l, a.packaged = !0), a.basePath = a.base, a.workerPath = a.workerPath || a.base, a.modePath = a.modePath || a.base, a.themePath = a.themePath || a.base, delete a.base, a) "undefined" !== typeof a[w] && i.set(w, a[w]);
      }
    }
    function s(e) {
      return e.replace(/-(.)/g, function (e, t) {
        return t.toUpperCase();
      });
    }
    r.exports = function (t) {
      i.init = a, t.require = e, t.define = require("./42395971.js");
    }, a(!0);
  }), ace.define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], function (e, t, n) {
    "use strict";

    var r = e("./oop"),
      i = function () {
        var e,
          t,
          n = {
            MODIFIER_KEYS: {
              16: "Shift",
              17: "Ctrl",
              18: "Alt",
              224: "Meta",
              91: "MetaLeft",
              92: "MetaRight",
              93: "ContextMenu"
            },
            KEY_MODS: {
              ctrl: 1,
              alt: 2,
              option: 2,
              shift: 4,
              super: 8,
              meta: 8,
              command: 8,
              cmd: 8,
              control: 1
            },
            FUNCTION_KEYS: {
              8: "Backspace",
              9: "Tab",
              13: "Return",
              19: "Pause",
              27: "Esc",
              32: "Space",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "Left",
              38: "Up",
              39: "Right",
              40: "Down",
              44: "Print",
              45: "Insert",
              46: "Delete",
              96: "Numpad0",
              97: "Numpad1",
              98: "Numpad2",
              99: "Numpad3",
              100: "Numpad4",
              101: "Numpad5",
              102: "Numpad6",
              103: "Numpad7",
              104: "Numpad8",
              105: "Numpad9",
              "-13": "NumpadEnter",
              112: "F1",
              113: "F2",
              114: "F3",
              115: "F4",
              116: "F5",
              117: "F6",
              118: "F7",
              119: "F8",
              120: "F9",
              121: "F10",
              122: "F11",
              123: "F12",
              144: "Numlock",
              145: "Scrolllock"
            },
            PRINTABLE_KEYS: {
              32: " ",
              48: "0",
              49: "1",
              50: "2",
              51: "3",
              52: "4",
              53: "5",
              54: "6",
              55: "7",
              56: "8",
              57: "9",
              59: ";",
              61: "=",
              65: "a",
              66: "b",
              67: "c",
              68: "d",
              69: "e",
              70: "f",
              71: "g",
              72: "h",
              73: "i",
              74: "j",
              75: "k",
              76: "l",
              77: "m",
              78: "n",
              79: "o",
              80: "p",
              81: "q",
              82: "r",
              83: "s",
              84: "t",
              85: "u",
              86: "v",
              87: "w",
              88: "x",
              89: "y",
              90: "z",
              107: "+",
              109: "-",
              110: ".",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
              111: "/",
              106: "*"
            }
          };
        for (t in n.PRINTABLE_KEYS[173] = "-", n.FUNCTION_KEYS) e = n.FUNCTION_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
        for (t in n.PRINTABLE_KEYS) e = n.PRINTABLE_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
        return r.mixin(n, n.MODIFIER_KEYS), r.mixin(n, n.PRINTABLE_KEYS), r.mixin(n, n.FUNCTION_KEYS), n.enter = n["return"], n.escape = n.esc, n.del = n["delete"], function () {
          for (var e = ["cmd", "ctrl", "alt", "shift"], t = Math.pow(2, e.length); t--;) n.KEY_MODS[t] = e.filter(function (e) {
            return t & n.KEY_MODS[e];
          }).join("-") + "-";
        }(), n.KEY_MODS[0] = "", n.KEY_MODS[-1] = "input-", n;
      }();
    r.mixin(t, i), t.keyCodeToString = function (e) {
      var t = i[e];
      return "string" != typeof t && (t = String.fromCharCode(e)), t.toLowerCase();
    };
  }), ace.define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function (e, t, n) {
    "use strict";

    var r,
      i = e("./keys"),
      o = e("./useragent"),
      a = null,
      s = 0;
    function l() {
      r = !1;
      try {
        document.createComment("").addEventListener("test", function () {}, {
          get passive() {
            r = {
              passive: !1
            };
          }
        });
      } catch (e) {}
    }
    function c() {
      return void 0 == r && l(), r;
    }
    function u(e, t, n) {
      this.elem = e, this.type = t, this.callback = n;
    }
    u.prototype.destroy = function () {
      f(this.elem, this.type, this.callback), this.elem = this.type = this.callback = void 0;
    };
    var h = t.addListener = function (e, t, n, r) {
        e.addEventListener(t, n, c()), r && r.$toDestroy.push(new u(e, t, n));
      },
      f = t.removeListener = function (e, t, n) {
        e.removeEventListener(t, n, c());
      };
    t.stopEvent = function (e) {
      return t.stopPropagation(e), t.preventDefault(e), !1;
    }, t.stopPropagation = function (e) {
      e.stopPropagation && e.stopPropagation();
    }, t.preventDefault = function (e) {
      e.preventDefault && e.preventDefault();
    }, t.getButton = function (e) {
      return "dblclick" == e.type ? 0 : "contextmenu" == e.type || o.isMac && e.ctrlKey && !e.altKey && !e.shiftKey ? 2 : e.button;
    }, t.capture = function (e, t, n) {
      var r = e && e.ownerDocument || document;
      function i(e) {
        t && t(e), n && n(e), f(r, "mousemove", t), f(r, "mouseup", i), f(r, "dragstart", i);
      }
      return h(r, "mousemove", t), h(r, "mouseup", i), h(r, "dragstart", i), i;
    }, t.addMouseWheelListener = function (e, t, n) {
      h(e, "wheel", function (e) {
        var n = .15,
          r = e.deltaX || 0,
          i = e.deltaY || 0;
        switch (e.deltaMode) {
          case e.DOM_DELTA_PIXEL:
            e.wheelX = r * n, e.wheelY = i * n;
            break;
          case e.DOM_DELTA_LINE:
            var o = 15;
            e.wheelX = r * o, e.wheelY = i * o;
            break;
          case e.DOM_DELTA_PAGE:
            var a = 150;
            e.wheelX = r * a, e.wheelY = i * a;
            break;
        }
        t(e);
      }, n);
    }, t.addMultiMouseDownListener = function (e, n, r, i, a) {
      var s,
        l,
        c,
        u = 0,
        f = {
          2: "dblclick",
          3: "tripleclick",
          4: "quadclick"
        };
      function d(e) {
        if (0 !== t.getButton(e) ? u = 0 : e.detail > 1 ? (u++, u > 4 && (u = 1)) : u = 1, o.isIE) {
          var a = Math.abs(e.clientX - s) > 5 || Math.abs(e.clientY - l) > 5;
          c && !a || (u = 1), c && clearTimeout(c), c = setTimeout(function () {
            c = null;
          }, n[u - 1] || 600), 1 == u && (s = e.clientX, l = e.clientY);
        }
        if (e._clicks = u, r[i]("mousedown", e), u > 4) u = 0;else if (u > 1) return r[i](f[u], e);
      }
      Array.isArray(e) || (e = [e]), e.forEach(function (e) {
        h(e, "mousedown", d, a);
      });
    };
    var d = function (e) {
      return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0);
    };
    function p(e, t, n) {
      var r = d(t);
      if (!o.isMac && a) {
        if (t.getModifierState && (t.getModifierState("OS") || t.getModifierState("Win")) && (r |= 8), a.altGr) {
          if (3 == (3 & r)) return;
          a.altGr = 0;
        }
        if (18 === n || 17 === n) {
          var l = "location" in t ? t.location : t.keyLocation;
          if (17 === n && 1 === l) 1 == a[n] && (s = t.timeStamp);else if (18 === n && 3 === r && 2 === l) {
            var c = t.timeStamp - s;
            c < 50 && (a.altGr = !0);
          }
        }
      }
      if (n in i.MODIFIER_KEYS && (n = -1), !r && 13 === n) {
        l = "location" in t ? t.location : t.keyLocation;
        if (3 === l && (e(t, r, -n), t.defaultPrevented)) return;
      }
      if (o.isChromeOS && 8 & r) {
        if (e(t, r, n), t.defaultPrevented) return;
        r &= -9;
      }
      return !!(r || n in i.FUNCTION_KEYS || n in i.PRINTABLE_KEYS) && e(t, r, n);
    }
    function m() {
      a = Object.create(null);
    }
    if (t.getModifierString = function (e) {
      return i.KEY_MODS[d(e)];
    }, t.addCommandKeyListener = function (e, n, r) {
      if (o.isOldGecko || o.isOpera && !("KeyboardEvent" in window)) {
        var i = null;
        h(e, "keydown", function (e) {
          i = e.keyCode;
        }, r), h(e, "keypress", function (e) {
          return p(n, e, i);
        }, r);
      } else {
        var s = null;
        h(e, "keydown", function (e) {
          a[e.keyCode] = (a[e.keyCode] || 0) + 1;
          var t = p(n, e, e.keyCode);
          return s = e.defaultPrevented, t;
        }, r), h(e, "keypress", function (e) {
          s && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && (t.stopEvent(e), s = null);
        }, r), h(e, "keyup", function (e) {
          a[e.keyCode] = null;
        }, r), a || (m(), h(window, "focus", m));
      }
    }, "object" == typeof window && window.postMessage && !o.isOldIE) {
      var g = 1;
      t.nextTick = function (e, n) {
        n = n || window;
        var r = "zero-timeout-message-" + g++,
          i = function (o) {
            o.data == r && (t.stopPropagation(o), f(n, "message", i), e());
          };
        h(n, "message", i), n.postMessage(r, "*");
      };
    }
    t.$idleBlocked = !1, t.onIdle = function (e, n) {
      return setTimeout(function n() {
        t.$idleBlocked ? setTimeout(n, 100) : e();
      }, n);
    }, t.$idleBlockId = null, t.blockIdle = function (e) {
      t.$idleBlockId && clearTimeout(t.$idleBlockId), t.$idleBlocked = !0, t.$idleBlockId = setTimeout(function () {
        t.$idleBlocked = !1;
      }, e || 100);
    }, t.nextFrame = "object" == typeof window && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame), t.nextFrame ? t.nextFrame = t.nextFrame.bind(window) : t.nextFrame = function (e) {
      setTimeout(e, 17);
    };
  }), ace.define("ace/range", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    var r = function (e, t) {
        return e.row - t.row || e.column - t.column;
      },
      i = function (e, t, n, r) {
        this.start = {
          row: e,
          column: t
        }, this.end = {
          row: n,
          column: r
        };
      };
    (function () {
      this.isEqual = function (e) {
        return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column;
      }, this.toString = function () {
        return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]";
      }, this.contains = function (e, t) {
        return 0 == this.compare(e, t);
      }, this.compareRange = function (e) {
        var t,
          n = e.end,
          r = e.start;
        return t = this.compare(n.row, n.column), 1 == t ? (t = this.compare(r.row, r.column), 1 == t ? 2 : 0 == t ? 1 : 0) : -1 == t ? -2 : (t = this.compare(r.row, r.column), -1 == t ? -1 : 1 == t ? 42 : 0);
      }, this.comparePoint = function (e) {
        return this.compare(e.row, e.column);
      }, this.containsRange = function (e) {
        return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end);
      }, this.intersects = function (e) {
        var t = this.compareRange(e);
        return -1 == t || 0 == t || 1 == t;
      }, this.isEnd = function (e, t) {
        return this.end.row == e && this.end.column == t;
      }, this.isStart = function (e, t) {
        return this.start.row == e && this.start.column == t;
      }, this.setStart = function (e, t) {
        "object" == typeof e ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t);
      }, this.setEnd = function (e, t) {
        "object" == typeof e ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t);
      }, this.inside = function (e, t) {
        return 0 == this.compare(e, t) && !this.isEnd(e, t) && !this.isStart(e, t);
      }, this.insideStart = function (e, t) {
        return 0 == this.compare(e, t) && !this.isEnd(e, t);
      }, this.insideEnd = function (e, t) {
        return 0 == this.compare(e, t) && !this.isStart(e, t);
      }, this.compare = function (e, t) {
        return this.isMultiLine() || e !== this.start.row ? e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0 : t < this.start.column ? -1 : t > this.end.column ? 1 : 0;
      }, this.compareStart = function (e, t) {
        return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t);
      }, this.compareEnd = function (e, t) {
        return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t);
      }, this.compareInside = function (e, t) {
        return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t);
      }, this.clipRows = function (e, t) {
        if (this.end.row > t) var n = {
          row: t + 1,
          column: 0
        };else if (this.end.row < e) n = {
          row: e,
          column: 0
        };
        if (this.start.row > t) var r = {
          row: t + 1,
          column: 0
        };else if (this.start.row < e) r = {
          row: e,
          column: 0
        };
        return i.fromPoints(r || this.start, n || this.end);
      }, this.extend = function (e, t) {
        var n = this.compare(e, t);
        if (0 == n) return this;
        if (-1 == n) var r = {
          row: e,
          column: t
        };else var o = {
          row: e,
          column: t
        };
        return i.fromPoints(r || this.start, o || this.end);
      }, this.isEmpty = function () {
        return this.start.row === this.end.row && this.start.column === this.end.column;
      }, this.isMultiLine = function () {
        return this.start.row !== this.end.row;
      }, this.clone = function () {
        return i.fromPoints(this.start, this.end);
      }, this.collapseRows = function () {
        return 0 == this.end.column ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0);
      }, this.toScreenRange = function (e) {
        var t = e.documentToScreenPosition(this.start),
          n = e.documentToScreenPosition(this.end);
        return new i(t.row, t.column, n.row, n.column);
      }, this.moveBy = function (e, t) {
        this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t;
      };
    }).call(i.prototype), i.fromPoints = function (e, t) {
      return new i(e.row, e.column, t.row, t.column);
    }, i.comparePoints = r, i.comparePoints = function (e, t) {
      return e.row - t.row || e.column - t.column;
    }, t.Range = i;
  }), ace.define("ace/clipboard", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    var r;
    n.exports = {
      lineMode: !1,
      pasteCancelled: function () {
        return !!(r && r > Date.now() - 50) || (r = !1);
      },
      cancel: function () {
        r = Date.now();
      }
    };
  }), ace.define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang", "ace/clipboard", "ace/lib/keys"], function (e, t, n) {
    "use strict";

    var r = e("../lib/event"),
      i = e("../lib/useragent"),
      o = e("../lib/dom"),
      a = e("../lib/lang"),
      s = e("../clipboard"),
      l = i.isChrome < 18,
      c = i.isIE,
      u = i.isChrome > 63,
      h = 400,
      f = e("../lib/keys"),
      d = f.KEY_MODS,
      p = i.isIOS,
      m = p ? /\s/ : /\n/,
      g = i.isMobile,
      v = function (e, t) {
        var n = o.createElement("textarea");
        n.className = "ace_text-input", n.setAttribute("wrap", "off"), n.setAttribute("autocorrect", "off"), n.setAttribute("autocapitalize", "off"), n.setAttribute("spellcheck", !1), n.style.opacity = "0", e.insertBefore(n, e.firstChild);
        var v = !1,
          y = !1,
          b = !1,
          w = !1,
          x = "";
        g || (n.style.fontSize = "1px");
        var _ = !1,
          E = !1,
          S = "",
          k = 0,
          C = 0,
          O = 0;
        try {
          var T = document.activeElement === n;
        } catch (e) {}
        r.addListener(n, "blur", function (e) {
          E || (t.onBlur(e), T = !1);
        }, t), r.addListener(n, "focus", function (e) {
          if (!E) {
            if (T = !0, i.isEdge) try {
              if (!document.hasFocus()) return;
            } catch (e) {}
            t.onFocus(e), i.isEdge ? setTimeout(L) : L();
          }
        }, t), this.$focusScroll = !1, this.focus = function () {
          if (x || u || "browser" == this.$focusScroll) return n.focus({
            preventScroll: !0
          });
          var e = n.style.top;
          n.style.position = "fixed", n.style.top = "0px";
          try {
            var t = 0 != n.getBoundingClientRect().top;
          } catch (e) {
            return;
          }
          var r = [];
          if (t) {
            var i = n.parentElement;
            while (i && 1 == i.nodeType) r.push(i), i.setAttribute("ace_nocontext", !0), i = !i.parentElement && i.getRootNode ? i.getRootNode().host : i.parentElement;
          }
          n.focus({
            preventScroll: !0
          }), t && r.forEach(function (e) {
            e.removeAttribute("ace_nocontext");
          }), setTimeout(function () {
            n.style.position = "", "0px" == n.style.top && (n.style.top = e);
          }, 0);
        }, this.blur = function () {
          n.blur();
        }, this.isFocused = function () {
          return T;
        }, t.on("beforeEndOperation", function () {
          var e = t.curOp,
            r = e && e.command && e.command.name;
          if ("insertstring" != r) {
            var i = r && (e.docChanged || e.selectionChanged);
            b && i && (S = n.value = "", H()), L();
          }
        });
        var L = p ? function (e) {
          if (T && (!v || e) && !w) {
            e || (e = "");
            var r = "\n ab" + e + "cde fg\n";
            r != n.value && (n.value = S = r);
            var i = 4,
              o = 4 + (e.length || (t.selection.isEmpty() ? 0 : 1));
            k == i && C == o || n.setSelectionRange(i, o), k = i, C = o;
          }
        } : function () {
          if (!b && !w && (T || M)) {
            b = !0;
            var e = 0,
              r = 0,
              i = "";
            if (t.session) {
              var o = t.selection,
                a = o.getRange(),
                s = o.cursor.row;
              if (e = a.start.column, r = a.end.column, i = t.session.getLine(s), a.start.row != s) {
                var l = t.session.getLine(s - 1);
                e = a.start.row < s - 1 ? 0 : e, r += l.length + 1, i = l + "\n" + i;
              } else if (a.end.row != s) {
                var c = t.session.getLine(s + 1);
                r = a.end.row > s + 1 ? c.length : r, r += i.length + 1, i = i + "\n" + c;
              } else g && s > 0 && (i = "\n" + i, r += 1, e += 1);
              i.length > h && (e < h && r < h ? i = i.slice(0, h) : (i = "\n", e == r ? e = r = 0 : (e = 0, r = 1)));
            }
            var u = i + "\n\n";
            if (u != S && (n.value = S = u, k = C = u.length), M && (k = n.selectionStart, C = n.selectionEnd), C != r || k != e || n.selectionEnd != C) try {
              n.setSelectionRange(e, r), k = e, C = r;
            } catch (e) {}
            b = !1;
          }
        };
        this.resetSelection = L, T && t.onFocus();
        var A = function (e) {
            return 0 === e.selectionStart && e.selectionEnd >= S.length && e.value === S && S && e.selectionEnd !== C;
          },
          P = function (e) {
            b || (v ? v = !1 : A(n) ? (t.selectAll(), L()) : g && n.selectionStart != k && L());
          },
          j = null;
        this.setInputHandler = function (e) {
          j = e;
        }, this.getInputHandler = function () {
          return j;
        };
        var M = !1,
          R = function (e, r) {
            if (M && (M = !1), y) return L(), e && t.onPaste(e), y = !1, "";
            var o = n.selectionStart,
              a = n.selectionEnd,
              s = k,
              l = S.length - C,
              c = e,
              u = e.length - o,
              h = e.length - a,
              f = 0;
            while (s > 0 && S[f] == e[f]) f++, s--;
            c = c.slice(f), f = 1;
            while (l > 0 && S.length - f > k - 1 && S[S.length - f] == e[e.length - f]) f++, l--;
            u -= f - 1, h -= f - 1;
            var d = c.length - f + 1;
            if (d < 0 && (s = -d, d = 0), c = c.slice(0, d), !r && !c && !u && !s && !l && !h) return "";
            w = !0;
            var p = !1;
            return i.isAndroid && ". " == c && (c = "  ", p = !0), c && !s && !l && !u && !h || _ ? t.onTextInput(c) : t.onTextInput(c, {
              extendLeft: s,
              extendRight: l,
              restoreStart: u,
              restoreEnd: h
            }), w = !1, S = e, k = o, C = a, O = h, p ? "\n" : c;
          },
          N = function (e) {
            if (b) return W();
            if (e && e.inputType) {
              if ("historyUndo" == e.inputType) return t.execCommand("undo");
              if ("historyRedo" == e.inputType) return t.execCommand("redo");
            }
            var r = n.value,
              i = R(r, !0);
            (r.length > h + 100 || m.test(i) || g && k < 1 && k == C) && L();
          },
          D = function (e, t, n) {
            var r = e.clipboardData || window.clipboardData;
            if (r && !l) {
              var i = c || n ? "Text" : "text/plain";
              try {
                return t ? !1 !== r.setData(i, t) : r.getData(i);
              } catch (e) {
                if (!n) return D(e, t, !0);
              }
            }
          },
          I = function (e, i) {
            var o = t.getCopyText();
            if (!o) return r.preventDefault(e);
            D(e, o) ? (p && (L(o), v = o, setTimeout(function () {
              v = !1;
            }, 10)), i ? t.onCut() : t.onCopy(), r.preventDefault(e)) : (v = !0, n.value = o, n.select(), setTimeout(function () {
              v = !1, L(), i ? t.onCut() : t.onCopy();
            }));
          },
          $ = function (e) {
            I(e, !0);
          },
          F = function (e) {
            I(e, !1);
          },
          B = function (e) {
            var o = D(e);
            s.pasteCancelled() || ("string" == typeof o ? (o && t.onPaste(o, e), i.isIE && setTimeout(L), r.preventDefault(e)) : (n.value = "", y = !0));
          };
        r.addCommandKeyListener(n, t.onCommandKey.bind(t), t), r.addListener(n, "select", P, t), r.addListener(n, "input", N, t), r.addListener(n, "cut", $, t), r.addListener(n, "copy", F, t), r.addListener(n, "paste", B, t), "oncut" in n && "oncopy" in n && "onpaste" in n || r.addListener(e, "keydown", function (e) {
          if ((!i.isMac || e.metaKey) && e.ctrlKey) switch (e.keyCode) {
            case 67:
              F(e);
              break;
            case 86:
              B(e);
              break;
            case 88:
              $(e);
              break;
          }
        }, t);
        var V = function (e) {
            if (!b && t.onCompositionStart && !t.$readOnly && (b = {}, !_)) {
              e.data && (b.useTextareaForIME = !1), setTimeout(W, 0), t._signal("compositionStart"), t.on("mousedown", U);
              var r = t.getSelectionRange();
              r.end.row = r.start.row, r.end.column = r.start.column, b.markerRange = r, b.selectionStart = k, t.onCompositionStart(b), b.useTextareaForIME ? (S = n.value = "", k = 0, C = 0) : (n.msGetInputContext && (b.context = n.msGetInputContext()), n.getInputContext && (b.context = n.getInputContext()));
            }
          },
          W = function () {
            if (b && t.onCompositionUpdate && !t.$readOnly) {
              if (_) return U();
              if (b.useTextareaForIME) t.onCompositionUpdate(n.value);else {
                var e = n.value;
                R(e), b.markerRange && (b.context && (b.markerRange.start.column = b.selectionStart = b.context.compositionStartOffset), b.markerRange.end.column = b.markerRange.start.column + C - b.selectionStart + O);
              }
            }
          },
          H = function (e) {
            t.onCompositionEnd && !t.$readOnly && (b = !1, t.onCompositionEnd(), t.off("mousedown", U), e && N());
          };
        function U() {
          E = !0, n.blur(), n.focus(), E = !1;
        }
        var z,
          G = a.delayedCall(W, 50).schedule.bind(null, null);
        function q(e) {
          27 == e.keyCode && n.value.length < n.selectionStart && (b || (S = n.value), k = C = -1, L()), G();
        }
        function K() {
          clearTimeout(z), z = setTimeout(function () {
            x && (n.style.cssText = x, x = ""), t.renderer.$isMousePressed = !1, t.renderer.$keepTextAreaAtCursor && t.renderer.$moveTextAreaToCursor();
          }, 0);
        }
        r.addListener(n, "compositionstart", V, t), r.addListener(n, "compositionupdate", W, t), r.addListener(n, "keyup", q, t), r.addListener(n, "keydown", G, t), r.addListener(n, "compositionend", H, t), this.getElement = function () {
          return n;
        }, this.setCommandMode = function (e) {
          _ = e, n.readOnly = !1;
        }, this.setReadOnly = function (e) {
          _ || (n.readOnly = e);
        }, this.setCopyWithEmptySelection = function (e) {}, this.onContextMenu = function (e) {
          M = !0, L(), t._emit("nativecontextmenu", {
            target: t,
            domEvent: e
          }), this.moveToMouse(e, !0);
        }, this.moveToMouse = function (e, a) {
          x || (x = n.style.cssText), n.style.cssText = (a ? "z-index:100000;" : "") + (i.isIE ? "opacity:0.1;" : "") + "text-indent: -" + (k + C) * t.renderer.characterWidth * .5 + "px;";
          var s = t.container.getBoundingClientRect(),
            l = o.computedStyle(t.container),
            c = s.top + (parseInt(l.borderTopWidth) || 0),
            u = s.left + (parseInt(s.borderLeftWidth) || 0),
            h = s.bottom - c - n.clientHeight - 2,
            f = function (e) {
              o.translate(n, e.clientX - u - 2, Math.min(e.clientY - c - 2, h));
            };
          f(e), "mousedown" == e.type && (t.renderer.$isMousePressed = !0, clearTimeout(z), i.isWin && r.capture(t.container, f, K));
        }, this.onContextMenuClose = K;
        var Y = function (e) {
          t.textInput.onContextMenu(e), K();
        };
        function X(e, t, n) {
          var r = null,
            i = !1;
          n.addEventListener("keydown", function (e) {
            r && clearTimeout(r), i = !0;
          }, !0), n.addEventListener("keyup", function (e) {
            r = setTimeout(function () {
              i = !1;
            }, 100);
          }, !0);
          var o = function (e) {
            if (document.activeElement === n && !(i || b || t.$mouseHandler.isMousePressed) && !v) {
              var r = n.selectionStart,
                o = n.selectionEnd,
                a = null,
                s = 0;
              if (0 == r ? a = f.up : 1 == r ? a = f.home : o > C && "\n" == S[o] ? a = f.end : r < k && " " == S[r - 1] ? (a = f.left, s = d.option) : r < k || r == k && C != k && r == o ? a = f.left : o > C && S.slice(0, o).split("\n").length > 2 ? a = f.down : o > C && " " == S[o - 1] ? (a = f.right, s = d.option) : (o > C || o == C && C != k && r == o) && (a = f.right), r !== o && (s |= d.shift), a) {
                var l = t.onCommandKey({}, s, a);
                if (!l && t.commands) {
                  a = f.keyCodeToString(a);
                  var c = t.commands.findKeyCommand(s, a);
                  c && t.execCommand(c);
                }
                k = r, C = o, L("");
              }
            }
          };
          document.addEventListener("selectionchange", o), t.on("destroy", function () {
            document.removeEventListener("selectionchange", o);
          });
        }
        r.addListener(n, "mouseup", Y, t), r.addListener(n, "mousedown", function (e) {
          e.preventDefault(), K();
        }, t), r.addListener(t.renderer.scroller, "contextmenu", Y, t), r.addListener(n, "contextmenu", Y, t), p && X(e, t, n), this.destroy = function () {
          n.parentElement && n.parentElement.removeChild(n);
        };
      };
    t.TextInput = v, t.$setUserAgentForTests = function (e, t) {
      g = e, p = t;
    };
  }), ace.define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/useragent"], function (e, t, n) {
    "use strict";

    var r = e("../lib/useragent"),
      i = 0,
      o = 550;
    function a(e) {
      e.$clickSelection = null;
      var t = e.editor;
      t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e));
      var n = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];
      n.forEach(function (t) {
        e[t] = this[t];
      }, this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange");
    }
    function s(e, t, n, r) {
      return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2));
    }
    function l(e, t) {
      if (e.start.row == e.end.row) var n = 2 * t.column - e.start.column - e.end.column;else if (e.start.row != e.end.row - 1 || e.start.column || e.end.column) n = 2 * t.row - e.start.row - e.end.row;else var n = t.column - 4;
      return n < 0 ? {
        cursor: e.start,
        anchor: e.end
      } : {
        cursor: e.end,
        anchor: e.start
      };
    }
    (function () {
      this.onMouseDown = function (e) {
        var t = e.inSelection(),
          n = e.getDocumentPosition();
        this.mousedownEvent = e;
        var i = this.editor,
          o = e.getButton();
        if (0 !== o) {
          var a = i.getSelectionRange(),
            s = a.isEmpty();
          return (s || 1 == o) && i.selection.moveToPosition(n), void (2 == o && (i.textInput.onContextMenu(e.domEvent), r.isMozilla || e.preventDefault()));
        }
        return this.mousedownEvent.time = Date.now(), !t || i.isFocused() || (i.focus(), !this.$focusTimeout || this.$clickSelection || i.inMultiSelectMode) ? (this.captureMouse(e), this.startSelect(n, e.domEvent._clicks > 1), e.preventDefault()) : (this.setState("focusWait"), void this.captureMouse(e));
      }, this.startSelect = function (e, t) {
        e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
        var n = this.editor;
        this.mousedownEvent && (this.mousedownEvent.getShiftKey() ? n.selection.selectToPosition(e) : t || n.selection.moveToPosition(e), t || this.select(), n.renderer.scroller.setCapture && n.renderer.scroller.setCapture(), n.setStyle("ace_selecting"), this.setState("select"));
      }, this.select = function () {
        var e,
          t = this.editor,
          n = t.renderer.screenToTextCoordinates(this.x, this.y);
        if (this.$clickSelection) {
          var r = this.$clickSelection.comparePoint(n);
          if (-1 == r) e = this.$clickSelection.end;else if (1 == r) e = this.$clickSelection.start;else {
            var i = l(this.$clickSelection, n);
            n = i.cursor, e = i.anchor;
          }
          t.selection.setSelectionAnchor(e.row, e.column);
        }
        t.selection.selectToPosition(n), t.renderer.scrollCursorIntoView();
      }, this.extendSelectionBy = function (e) {
        var t,
          n = this.editor,
          r = n.renderer.screenToTextCoordinates(this.x, this.y),
          i = n.selection[e](r.row, r.column);
        if (this.$clickSelection) {
          var o = this.$clickSelection.comparePoint(i.start),
            a = this.$clickSelection.comparePoint(i.end);
          if (-1 == o && a <= 0) t = this.$clickSelection.end, i.end.row == r.row && i.end.column == r.column || (r = i.start);else if (1 == a && o >= 0) t = this.$clickSelection.start, i.start.row == r.row && i.start.column == r.column || (r = i.end);else if (-1 == o && 1 == a) r = i.end, t = i.start;else {
            var s = l(this.$clickSelection, r);
            r = s.cursor, t = s.anchor;
          }
          n.selection.setSelectionAnchor(t.row, t.column);
        }
        n.selection.selectToPosition(r), n.renderer.scrollCursorIntoView();
      }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function () {
        this.$clickSelection = null, this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture();
      }, this.focusWait = function () {
        var e = s(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y),
          t = Date.now();
        (e > i || t - this.mousedownEvent.time > this.$focusTimeout) && this.startSelect(this.mousedownEvent.getDocumentPosition());
      }, this.onDoubleClick = function (e) {
        var t = e.getDocumentPosition(),
          n = this.editor,
          r = n.session,
          i = r.getBracketRange(t);
        i ? (i.isEmpty() && (i.start.column--, i.end.column++), this.setState("select")) : (i = n.selection.getWordRange(t.row, t.column), this.setState("selectByWords")), this.$clickSelection = i, this.select();
      }, this.onTripleClick = function (e) {
        var t = e.getDocumentPosition(),
          n = this.editor;
        this.setState("selectByLines");
        var r = n.getSelectionRange();
        r.isMultiLine() && r.contains(t.row, t.column) ? (this.$clickSelection = n.selection.getLineRange(r.start.row), this.$clickSelection.end = n.selection.getLineRange(r.end.row).end) : this.$clickSelection = n.selection.getLineRange(t.row), this.select();
      }, this.onQuadClick = function (e) {
        var t = this.editor;
        t.selectAll(), this.$clickSelection = t.getSelectionRange(), this.setState("selectAll");
      }, this.onMouseWheel = function (e) {
        if (!e.getAccelKey()) {
          e.getShiftKey() && e.wheelY && !e.wheelX && (e.wheelX = e.wheelY, e.wheelY = 0);
          var t = this.editor;
          this.$lastScroll || (this.$lastScroll = {
            t: 0,
            vx: 0,
            vy: 0,
            allowed: 0
          });
          var n = this.$lastScroll,
            r = e.domEvent.timeStamp,
            i = r - n.t,
            a = i ? e.wheelX / i : n.vx,
            s = i ? e.wheelY / i : n.vy;
          i < o && (a = (a + n.vx) / 2, s = (s + n.vy) / 2);
          var l = Math.abs(a / s),
            c = !1;
          if (l >= 1 && t.renderer.isScrollableBy(e.wheelX * e.speed, 0) && (c = !0), l <= 1 && t.renderer.isScrollableBy(0, e.wheelY * e.speed) && (c = !0), c) n.allowed = r;else if (r - n.allowed < o) {
            var u = Math.abs(a) <= 1.5 * Math.abs(n.vx) && Math.abs(s) <= 1.5 * Math.abs(n.vy);
            u ? (c = !0, n.allowed = r) : n.allowed = 0;
          }
          return n.t = r, n.vx = a, n.vy = s, c ? (t.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0;
        }
      };
    }).call(a.prototype), t.DefaultHandlers = a;
  }), ace.define("ace/tooltip", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    e("./lib/oop");
    var r = e("./lib/dom"),
      i = "ace_tooltip";
    function o(e) {
      this.isOpen = !1, this.$element = null, this.$parentNode = e;
    }
    (function () {
      this.$init = function () {
        return this.$element = r.createElement("div"), this.$element.className = i, this.$element.style.display = "none", this.$parentNode.appendChild(this.$element), this.$element;
      }, this.getElement = function () {
        return this.$element || this.$init();
      }, this.setText = function (e) {
        this.getElement().textContent = e;
      }, this.setHtml = function (e) {
        this.getElement().innerHTML = e;
      }, this.setPosition = function (e, t) {
        this.getElement().style.left = e + "px", this.getElement().style.top = t + "px";
      }, this.setClassName = function (e) {
        r.addCssClass(this.getElement(), e);
      }, this.show = function (e, t, n) {
        null != e && this.setText(e), null != t && null != n && this.setPosition(t, n), this.isOpen || (this.getElement().style.display = "block", this.isOpen = !0);
      }, this.hide = function () {
        this.isOpen && (this.getElement().style.display = "none", this.getElement().className = i, this.isOpen = !1);
      }, this.getHeight = function () {
        return this.getElement().offsetHeight;
      }, this.getWidth = function () {
        return this.getElement().offsetWidth;
      }, this.destroy = function () {
        this.isOpen = !1, this.$element && this.$element.parentNode && this.$element.parentNode.removeChild(this.$element);
      };
    }).call(o.prototype), t.Tooltip = o;
  }), ace.define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event", "ace/tooltip"], function (e, t, n) {
    "use strict";

    var r = e("../lib/dom"),
      i = e("../lib/oop"),
      o = e("../lib/event"),
      a = e("../tooltip").Tooltip;
    function s(e) {
      var t,
        n,
        i,
        a = e.editor,
        s = a.renderer.$gutterLayer,
        c = new l(a.container);
      function u() {
        var t = n.getDocumentPosition().row,
          r = s.$annotations[t];
        if (!r) return h();
        var o = a.session.getLength();
        if (t == o) {
          var l = a.renderer.pixelToScreenCoordinates(0, n.y).row,
            u = n.$pos;
          if (l > a.session.documentToScreenRow(u.row, u.column)) return h();
        }
        if (i != r) {
          i = r.text.join("<br/>"), c.setHtml(i);
          var d = r.className;
          if (d && c.setClassName(d.trim()), c.show(), a._signal("showGutterTooltip", c), a.on("mousewheel", h), e.$tooltipFollowsMouse) f(n);else {
            var p = n.domEvent.target,
              m = p.getBoundingClientRect(),
              g = c.getElement().style;
            g.left = m.right + "px", g.top = m.bottom + "px";
          }
        }
      }
      function h() {
        t && (t = clearTimeout(t)), i && (c.hide(), i = null, a._signal("hideGutterTooltip", c), a.off("mousewheel", h));
      }
      function f(e) {
        c.setPosition(e.x, e.y);
      }
      e.editor.setDefaultHandler("guttermousedown", function (t) {
        if (a.isFocused() && 0 == t.getButton()) {
          var n = s.getRegion(t);
          if ("foldWidgets" != n) {
            var r = t.getDocumentPosition().row,
              i = a.session.selection;
            if (t.getShiftKey()) i.selectTo(r, 0);else {
              if (2 == t.domEvent.detail) return a.selectAll(), t.preventDefault();
              e.$clickSelection = a.selection.getLineRange(r);
            }
            return e.setState("selectByLines"), e.captureMouse(t), t.preventDefault();
          }
        }
      }), e.editor.setDefaultHandler("guttermousemove", function (o) {
        var a = o.domEvent.target || o.domEvent.srcElement;
        if (r.hasCssClass(a, "ace_fold-widget")) return h();
        i && e.$tooltipFollowsMouse && f(o), n = o, t || (t = setTimeout(function () {
          t = null, n && !e.isMousePressed ? u() : h();
        }, 50));
      }), o.addListener(a.renderer.$gutter, "mouseout", function (e) {
        n = null, i && !t && (t = setTimeout(function () {
          t = null, h();
        }, 50));
      }, a), a.on("changeSession", h);
    }
    function l(e) {
      a.call(this, e);
    }
    i.inherits(l, a), function () {
      this.setPosition = function (e, t) {
        var n = window.innerWidth || document.documentElement.clientWidth,
          r = window.innerHeight || document.documentElement.clientHeight,
          i = this.getWidth(),
          o = this.getHeight();
        e += 15, t += 15, e + i > n && (e -= e + i - n), t + o > r && (t -= 20 + o), a.prototype.setPosition.call(this, e, t);
      };
    }.call(l.prototype), t.GutterHandler = s;
  }), ace.define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (e, t, n) {
    "use strict";

    var r = e("../lib/event"),
      i = e("../lib/useragent"),
      o = t.MouseEvent = function (e, t) {
        this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1;
      };
    (function () {
      this.stopPropagation = function () {
        r.stopPropagation(this.domEvent), this.propagationStopped = !0;
      }, this.preventDefault = function () {
        r.preventDefault(this.domEvent), this.defaultPrevented = !0;
      }, this.stop = function () {
        this.stopPropagation(), this.preventDefault();
      }, this.getDocumentPosition = function () {
        return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos);
      }, this.inSelection = function () {
        if (null !== this.$inSelection) return this.$inSelection;
        var e = this.editor,
          t = e.getSelectionRange();
        if (t.isEmpty()) this.$inSelection = !1;else {
          var n = this.getDocumentPosition();
          this.$inSelection = t.contains(n.row, n.column);
        }
        return this.$inSelection;
      }, this.getButton = function () {
        return r.getButton(this.domEvent);
      }, this.getShiftKey = function () {
        return this.domEvent.shiftKey;
      }, this.getAccelKey = i.isMac ? function () {
        return this.domEvent.metaKey;
      } : function () {
        return this.domEvent.ctrlKey;
      };
    }).call(o.prototype);
  }), ace.define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function (e, t, n) {
    "use strict";

    var r = e("../lib/dom"),
      i = e("../lib/event"),
      o = e("../lib/useragent"),
      a = 200,
      s = 200,
      l = 5;
    function c(e) {
      var t = e.editor,
        n = r.createElement("div");
      n.style.cssText = "top:-100px;position:absolute;z-index:2147483647;opacity:0.5", n.textContent = "\xa0";
      var c = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];
      c.forEach(function (t) {
        e[t] = this[t];
      }, this), t.on("mousedown", this.onMouseDown.bind(e));
      var h,
        f,
        d,
        p,
        m,
        g,
        v,
        y,
        b,
        w,
        x,
        _ = t.container,
        E = 0;
      function S(e, n) {
        var r = Date.now(),
          i = !n || e.row != n.row,
          o = !n || e.column != n.column;
        if (!w || i || o) t.moveCursorToPosition(e), w = r, x = {
          x: f,
          y: d
        };else {
          var a = u(x.x, x.y, f, d);
          a > l ? w = null : r - w >= s && (t.renderer.scrollCursorIntoView(), w = null);
        }
      }
      function k(e, n) {
        var r = Date.now(),
          i = t.renderer.layerConfig.lineHeight,
          o = t.renderer.layerConfig.characterWidth,
          s = t.renderer.scroller.getBoundingClientRect(),
          l = {
            x: {
              left: f - s.left,
              right: s.right - f
            },
            y: {
              top: d - s.top,
              bottom: s.bottom - d
            }
          },
          c = Math.min(l.x.left, l.x.right),
          u = Math.min(l.y.top, l.y.bottom),
          h = {
            row: e.row,
            column: e.column
          };
        c / o <= 2 && (h.column += l.x.left < l.x.right ? -3 : 2), u / i <= 1 && (h.row += l.y.top < l.y.bottom ? -1 : 1);
        var p = e.row != h.row,
          m = e.column != h.column,
          g = !n || e.row != n.row;
        p || m && !g ? b ? r - b >= a && t.renderer.scrollCursorIntoView(h) : b = r : b = null;
      }
      function C() {
        var e = g;
        g = t.renderer.screenToTextCoordinates(f, d), S(g, e), k(g, e);
      }
      function O() {
        m = t.selection.toOrientedRange(), h = t.session.addMarker(m, "ace_selection", t.getSelectionStyle()), t.clearSelection(), t.isFocused() && t.renderer.$cursorLayer.setBlinking(!1), clearInterval(p), C(), p = setInterval(C, 20), E = 0, i.addListener(document, "mousemove", A);
      }
      function T() {
        clearInterval(p), t.session.removeMarker(h), h = null, t.selection.fromOrientedRange(m), t.isFocused() && !y && t.$resetCursorStyle(), m = null, g = null, E = 0, b = null, w = null, i.removeListener(document, "mousemove", A);
      }
      this.onDragStart = function (e) {
        if (this.cancelDrag || !_.draggable) {
          var r = this;
          return setTimeout(function () {
            r.startSelect(), r.captureMouse(e);
          }, 0), e.preventDefault();
        }
        m = t.getSelectionRange();
        var i = e.dataTransfer;
        i.effectAllowed = t.getReadOnly() ? "copy" : "copyMove", t.container.appendChild(n), i.setDragImage && i.setDragImage(n, 0, 0), setTimeout(function () {
          t.container.removeChild(n);
        }), i.clearData(), i.setData("Text", t.session.getTextRange()), y = !0, this.setState("drag");
      }, this.onDragEnd = function (e) {
        if (_.draggable = !1, y = !1, this.setState(null), !t.getReadOnly()) {
          var n = e.dataTransfer.dropEffect;
          v || "move" != n || t.session.remove(t.getSelectionRange()), t.$resetCursorStyle();
        }
        this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle("");
      }, this.onDragEnter = function (e) {
        if (!t.getReadOnly() && P(e.dataTransfer)) return f = e.clientX, d = e.clientY, h || O(), E++, e.dataTransfer.dropEffect = v = j(e), i.preventDefault(e);
      }, this.onDragOver = function (e) {
        if (!t.getReadOnly() && P(e.dataTransfer)) return f = e.clientX, d = e.clientY, h || (O(), E++), null !== L && (L = null), e.dataTransfer.dropEffect = v = j(e), i.preventDefault(e);
      }, this.onDragLeave = function (e) {
        if (E--, E <= 0 && h) return T(), v = null, i.preventDefault(e);
      }, this.onDrop = function (e) {
        if (g) {
          var n = e.dataTransfer;
          if (y) switch (v) {
            case "move":
              m = m.contains(g.row, g.column) ? {
                start: g,
                end: g
              } : t.moveText(m, g);
              break;
            case "copy":
              m = t.moveText(m, g, !0);
              break;
          } else {
            var r = n.getData("Text");
            m = {
              start: g,
              end: t.session.insert(g, r)
            }, t.focus(), v = null;
          }
          return T(), i.preventDefault(e);
        }
      }, i.addListener(_, "dragstart", this.onDragStart.bind(e), t), i.addListener(_, "dragend", this.onDragEnd.bind(e), t), i.addListener(_, "dragenter", this.onDragEnter.bind(e), t), i.addListener(_, "dragover", this.onDragOver.bind(e), t), i.addListener(_, "dragleave", this.onDragLeave.bind(e), t), i.addListener(_, "drop", this.onDrop.bind(e), t);
      var L = null;
      function A() {
        null == L && (L = setTimeout(function () {
          null != L && h && T();
        }, 20));
      }
      function P(e) {
        var t = e.types;
        return !t || Array.prototype.some.call(t, function (e) {
          return "text/plain" == e || "Text" == e;
        });
      }
      function j(e) {
        var t = ["copy", "copymove", "all", "uninitialized"],
          n = ["move", "copymove", "linkmove", "all", "uninitialized"],
          r = o.isMac ? e.altKey : e.ctrlKey,
          i = "uninitialized";
        try {
          i = e.dataTransfer.effectAllowed.toLowerCase();
        } catch (e) {}
        var a = "none";
        return r && t.indexOf(i) >= 0 ? a = "copy" : n.indexOf(i) >= 0 ? a = "move" : t.indexOf(i) >= 0 && (a = "copy"), a;
      }
    }
    function u(e, t, n, r) {
      return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2));
    }
    (function () {
      this.dragWait = function () {
        var e = Date.now() - this.mousedownEvent.time;
        e > this.editor.getDragDelay() && this.startDrag();
      }, this.dragWaitEnd = function () {
        var e = this.editor.container;
        e.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd();
      }, this.dragReadyEnd = function (e) {
        this.editor.$resetCursorStyle(), this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle(""), this.dragWaitEnd();
      }, this.startDrag = function () {
        this.cancelDrag = !1;
        var e = this.editor,
          t = e.container;
        t.draggable = !0, e.renderer.$cursorLayer.setBlinking(!1), e.setStyle("ace_dragging");
        var n = o.isWin ? "default" : "move";
        e.renderer.setCursorStyle(n), this.setState("dragReady");
      }, this.onMouseDrag = function (e) {
        var t = this.editor.container;
        if (o.isIE && "dragReady" == this.state) {
          var n = u(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
          n > 3 && t.dragDrop();
        }
        if ("dragWait" === this.state) {
          n = u(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
          n > 0 && (t.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()));
        }
      }, this.onMouseDown = function (e) {
        if (this.$dragEnabled) {
          this.mousedownEvent = e;
          var t = this.editor,
            n = e.inSelection(),
            r = e.getButton(),
            i = e.domEvent.detail || 1;
          if (1 === i && 0 === r && n) {
            if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey())) return;
            this.mousedownEvent.time = Date.now();
            var a = e.domEvent.target || e.domEvent.srcElement;
            if ("unselectable" in a && (a.unselectable = "on"), t.getDragDelay()) {
              if (o.isWebKit) {
                this.cancelDrag = !0;
                var s = t.container;
                s.draggable = !0;
              }
              this.setState("dragWait");
            } else this.startDrag();
            this.captureMouse(e, this.onMouseDrag.bind(this)), e.defaultPrevented = !0;
          }
        }
      };
    }).call(c.prototype), t.DragdropHandler = c;
  }), ace.define("ace/mouse/touch_handler", ["require", "exports", "module", "ace/mouse/mouse_event", "ace/lib/event", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    var r = e("./mouse_event").MouseEvent,
      i = e("../lib/event"),
      o = e("../lib/dom");
    t.addTouchListeners = function (e, t) {
      var n,
        a,
        s,
        l,
        c,
        u,
        h,
        f,
        d,
        p = "scroll",
        m = 0,
        g = 0,
        v = 0,
        y = 0;
      function b() {
        var e = window.navigator && window.navigator.clipboard,
          n = !1,
          r = function () {
            var r = t.getCopyText(),
              i = t.session.getUndoManager().hasUndo();
            d.replaceChild(o.buildDom(n ? ["span", !r && ["span", {
              class: "ace_mobile-button",
              action: "selectall"
            }, "Select All"], r && ["span", {
              class: "ace_mobile-button",
              action: "copy"
            }, "Copy"], r && ["span", {
              class: "ace_mobile-button",
              action: "cut"
            }, "Cut"], e && ["span", {
              class: "ace_mobile-button",
              action: "paste"
            }, "Paste"], i && ["span", {
              class: "ace_mobile-button",
              action: "undo"
            }, "Undo"], ["span", {
              class: "ace_mobile-button",
              action: "find"
            }, "Find"], ["span", {
              class: "ace_mobile-button",
              action: "openCommandPallete"
            }, "Palette"]] : ["span"]), d.firstChild);
          },
          i = function (i) {
            var o = i.target.getAttribute("action");
            if ("more" == o || !n) return n = !n, r();
            "paste" == o ? e.readText().then(function (e) {
              t.execCommand(o, e);
            }) : o && ("cut" != o && "copy" != o || (e ? e.writeText(t.getCopyText()) : document.execCommand("copy")), t.execCommand(o)), d.firstChild.style.display = "none", n = !1, "openCommandPallete" != o && t.focus();
          };
        d = o.buildDom(["div", {
          class: "ace_mobile-menu",
          ontouchstart: function (e) {
            p = "menu", e.stopPropagation(), e.preventDefault(), t.textInput.focus();
          },
          ontouchend: function (e) {
            e.stopPropagation(), e.preventDefault(), i(e);
          },
          onclick: i
        }, ["span"], ["span", {
          class: "ace_mobile-button",
          action: "more"
        }, "..."]], t.container);
      }
      function w() {
        d || b();
        var e = t.selection.cursor,
          n = t.renderer.textToScreenCoordinates(e.row, e.column),
          r = t.renderer.textToScreenCoordinates(0, 0).pageX,
          i = t.renderer.scrollLeft,
          o = t.container.getBoundingClientRect();
        d.style.top = n.pageY - o.top - 3 + "px", n.pageX - o.left < o.width - 70 ? (d.style.left = "", d.style.right = "10px") : (d.style.right = "", d.style.left = r + i - o.left + "px"), d.style.display = "", d.firstChild.style.display = "none", t.on("input", x);
      }
      function x(e) {
        d && (d.style.display = "none"), t.off("input", x);
      }
      function _() {
        c = null, clearTimeout(c);
        var e = t.selection.getRange(),
          n = e.contains(h.row, h.column);
        !e.isEmpty() && n || (t.selection.moveToPosition(h), t.selection.selectWord()), p = "wait", w();
      }
      function E() {
        c = null, clearTimeout(c), t.selection.moveToPosition(h);
        var e = g >= 2 ? t.selection.getLineRange(h.row) : t.session.getBracketRange(h);
        e && !e.isEmpty() ? t.selection.setRange(e) : t.selection.selectWord(), p = "wait";
      }
      function S() {
        m += 60, u = setInterval(function () {
          m-- <= 0 && (clearInterval(u), u = null), Math.abs(v) < .01 && (v = 0), Math.abs(y) < .01 && (y = 0), m < 20 && (v *= .9), m < 20 && (y *= .9);
          var e = t.session.getScrollTop();
          t.renderer.scrollBy(10 * v, 10 * y), e == t.session.getScrollTop() && (m = 0);
        }, 10);
      }
      i.addListener(e, "contextmenu", function (e) {
        if (f) {
          var n = t.textInput.getElement();
          n.focus();
        }
      }, t), i.addListener(e, "touchstart", function (e) {
        var i = e.touches;
        if (c || i.length > 1) return clearTimeout(c), c = null, s = -1, void (p = "zoom");
        f = t.$mouseHandler.isMousePressed = !0;
        var o = t.renderer.layerConfig.lineHeight,
          u = t.renderer.layerConfig.lineHeight,
          d = e.timeStamp;
        l = d;
        var b = i[0],
          w = b.clientX,
          x = b.clientY;
        Math.abs(n - w) + Math.abs(a - x) > o && (s = -1), n = e.clientX = w, a = e.clientY = x, v = y = 0;
        var S = new r(e, t);
        if (h = S.getDocumentPosition(), d - s < 500 && 1 == i.length && !m) g++, e.preventDefault(), e.button = 0, E();else {
          g = 0;
          var k = t.selection.cursor,
            C = t.selection.isEmpty() ? k : t.selection.anchor,
            O = t.renderer.$cursorLayer.getPixelPosition(k, !0),
            T = t.renderer.$cursorLayer.getPixelPosition(C, !0),
            L = t.renderer.scroller.getBoundingClientRect(),
            A = t.renderer.layerConfig.offset,
            P = t.renderer.scrollLeft,
            j = function (e, t) {
              return e /= u, t = t / o - .75, e * e + t * t;
            };
          if (e.clientX < L.left) return void (p = "zoom");
          var M = j(e.clientX - L.left - O.left + P, e.clientY - L.top - O.top + A),
            R = j(e.clientX - L.left - T.left + P, e.clientY - L.top - T.top + A);
          M < 3.5 && R < 3.5 && (p = M > R ? "cursor" : "anchor"), p = R < 3.5 ? "anchor" : M < 3.5 ? "cursor" : "scroll", c = setTimeout(_, 450);
        }
        s = d;
      }, t), i.addListener(e, "touchend", function (e) {
        f = t.$mouseHandler.isMousePressed = !1, u && clearInterval(u), "zoom" == p ? (p = "", m = 0) : c ? (t.selection.moveToPosition(h), m = 0, w()) : "scroll" == p ? (S(), x()) : w(), clearTimeout(c), c = null;
      }, t), i.addListener(e, "touchmove", function (e) {
        c && (clearTimeout(c), c = null);
        var i = e.touches;
        if (!(i.length > 1 || "zoom" == p)) {
          var o = i[0],
            s = n - o.clientX,
            u = a - o.clientY;
          if ("wait" == p) {
            if (!(s * s + u * u > 4)) return e.preventDefault();
            p = "cursor";
          }
          n = o.clientX, a = o.clientY, e.clientX = o.clientX, e.clientY = o.clientY;
          var h = e.timeStamp,
            f = h - l;
          if (l = h, "scroll" == p) {
            var d = new r(e, t);
            d.speed = 1, d.wheelX = s, d.wheelY = u, 10 * Math.abs(s) < Math.abs(u) && (s = 0), 10 * Math.abs(u) < Math.abs(s) && (u = 0), 0 != f && (v = s / f, y = u / f), t._emit("mousewheel", d), d.propagationStopped || (v = y = 0);
          } else {
            var m = new r(e, t),
              g = m.getDocumentPosition();
            "cursor" == p ? t.selection.moveCursorToPosition(g) : "anchor" == p && t.selection.setSelectionAnchor(g.row, g.column), t.renderer.scrollCursorIntoView(g), e.preventDefault();
          }
        }
      }, t);
    };
  }), ace.define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/mouse/touch_handler", "ace/config"], function (e, t, n) {
    "use strict";

    var r = e("../lib/event"),
      i = e("../lib/useragent"),
      o = e("./default_handlers").DefaultHandlers,
      a = e("./default_gutter_handler").GutterHandler,
      s = e("./mouse_event").MouseEvent,
      l = e("./dragdrop_handler").DragdropHandler,
      c = e("./touch_handler").addTouchListeners,
      u = e("../config"),
      h = function (e) {
        var t = this;
        this.editor = e, new o(this), new a(this), new l(this);
        var n = function (t) {
            var n = !document.hasFocus || !document.hasFocus() || !e.isFocused() && document.activeElement == (e.textInput && e.textInput.getElement());
            n && window.focus(), e.focus(), setTimeout(function () {
              e.isFocused() || e.focus();
            });
          },
          s = e.renderer.getMouseEventTarget();
        r.addListener(s, "click", this.onMouseEvent.bind(this, "click"), e), r.addListener(s, "mousemove", this.onMouseMove.bind(this, "mousemove"), e), r.addMultiMouseDownListener([s, e.renderer.scrollBarV && e.renderer.scrollBarV.inner, e.renderer.scrollBarH && e.renderer.scrollBarH.inner, e.textInput && e.textInput.getElement()].filter(Boolean), [400, 300, 250], this, "onMouseEvent", e), r.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel"), e), c(e.container, e);
        var u = e.renderer.$gutter;
        r.addListener(u, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"), e), r.addListener(u, "click", this.onMouseEvent.bind(this, "gutterclick"), e), r.addListener(u, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"), e), r.addListener(u, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"), e), r.addListener(s, "mousedown", n, e), r.addListener(u, "mousedown", n, e), i.isIE && e.renderer.scrollBarV && (r.addListener(e.renderer.scrollBarV.element, "mousedown", n, e), r.addListener(e.renderer.scrollBarH.element, "mousedown", n, e)), e.on("mousemove", function (n) {
          if (!t.state && !t.$dragDelay && t.$dragEnabled) {
            var r = e.renderer.screenToTextCoordinates(n.x, n.y),
              i = e.session.selection.getRange(),
              o = e.renderer;
            !i.isEmpty() && i.insideStart(r.row, r.column) ? o.setCursorStyle("default") : o.setCursorStyle("");
          }
        }, e);
      };
    (function () {
      this.onMouseEvent = function (e, t) {
        this.editor.session && this.editor._emit(e, new s(t, this.editor));
      }, this.onMouseMove = function (e, t) {
        var n = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
        n && n.length && this.editor._emit(e, new s(t, this.editor));
      }, this.onMouseWheel = function (e, t) {
        var n = new s(t, this.editor);
        n.speed = 2 * this.$scrollSpeed, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n);
      }, this.setState = function (e) {
        this.state = e;
      }, this.captureMouse = function (e, t) {
        this.x = e.x, this.y = e.y, this.isMousePressed = !0;
        var n = this.editor,
          o = this.editor.renderer;
        o.$isMousePressed = !0;
        var a = this,
          l = function (e) {
            if (e) {
              if (i.isWebKit && !e.which && a.releaseMouse) return a.releaseMouse();
              a.x = e.clientX, a.y = e.clientY, t && t(e), a.mouseEvent = new s(e, a.editor), a.$mouseMoved = !0;
            }
          },
          c = function (e) {
            n.off("beforeEndOperation", h), clearInterval(f), n.session && u(), a[a.state + "End"] && a[a.state + "End"](e), a.state = "", a.isMousePressed = o.$isMousePressed = !1, o.$keepTextAreaAtCursor && o.$moveTextAreaToCursor(), a.$onCaptureMouseMove = a.releaseMouse = null, e && a.onMouseEvent("mouseup", e), n.endOperation();
          },
          u = function () {
            a[a.state] && a[a.state](), a.$mouseMoved = !1;
          };
        if (i.isOldIE && "dblclick" == e.domEvent.type) return setTimeout(function () {
          c(e);
        });
        var h = function (e) {
          a.releaseMouse && n.curOp.command.name && n.curOp.selectionChanged && (a[a.state + "End"] && a[a.state + "End"](), a.state = "", a.releaseMouse());
        };
        n.on("beforeEndOperation", h), n.startOperation({
          command: {
            name: "mouse"
          }
        }), a.$onCaptureMouseMove = l, a.releaseMouse = r.capture(this.editor.container, l, c);
        var f = setInterval(u, 20);
      }, this.releaseMouse = null, this.cancelContextMenu = function () {
        var e = function (t) {
          t && t.domEvent && "contextmenu" != t.domEvent.type || (this.editor.off("nativecontextmenu", e), t && t.domEvent && r.stopEvent(t.domEvent));
        }.bind(this);
        setTimeout(e, 10), this.editor.on("nativecontextmenu", e);
      }, this.destroy = function () {
        this.releaseMouse && this.releaseMouse();
      };
    }).call(h.prototype), u.defineOptions(h.prototype, "mouseHandler", {
      scrollSpeed: {
        initialValue: 2
      },
      dragDelay: {
        initialValue: i.isMac ? 150 : 0
      },
      dragEnabled: {
        initialValue: !0
      },
      focusTimeout: {
        initialValue: 0
      },
      tooltipFollowsMouse: {
        initialValue: !0
      }
    }), t.MouseHandler = h;
  }), ace.define("ace/mouse/fold_handler", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    var r = e("../lib/dom");
    function i(e) {
      e.on("click", function (t) {
        var n = t.getDocumentPosition(),
          i = e.session,
          o = i.getFoldAt(n.row, n.column, 1);
        o && (t.getAccelKey() ? i.removeFold(o) : i.expandFold(o), t.stop());
        var a = t.domEvent && t.domEvent.target;
        a && r.hasCssClass(a, "ace_inline_button") && r.hasCssClass(a, "ace_toggle_wrap") && (i.setOption("wrap", !i.getUseWrapMode()), e.renderer.scrollCursorIntoView());
      }), e.on("gutterclick", function (t) {
        var n = e.renderer.$gutterLayer.getRegion(t);
        if ("foldWidgets" == n) {
          var r = t.getDocumentPosition().row,
            i = e.session;
          i.foldWidgets && i.foldWidgets[r] && e.session.onFoldWidgetClick(r, t), e.isFocused() || e.focus(), t.stop();
        }
      }), e.on("gutterdblclick", function (t) {
        var n = e.renderer.$gutterLayer.getRegion(t);
        if ("foldWidgets" == n) {
          var r = t.getDocumentPosition().row,
            i = e.session,
            o = i.getParentFoldRangeData(r, !0),
            a = o.range || o.firstRange;
          if (a) {
            r = a.start.row;
            var s = i.getFoldAt(r, i.getLine(r).length, 1);
            s ? i.removeFold(s) : (i.addFold("...", a), e.renderer.scrollCursorIntoView({
              row: a.start.row,
              column: 0
            }));
          }
          t.stop();
        }
      });
    }
    t.FoldHandler = i;
  }), ace.define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function (e, t, n) {
    "use strict";

    var r = e("../lib/keys"),
      i = e("../lib/event"),
      o = function (e) {
        this.$editor = e, this.$data = {
          editor: e
        }, this.$handlers = [], this.setDefaultHandler(e.commands);
      };
    (function () {
      this.setDefaultHandler = function (e) {
        this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0);
      }, this.setKeyboardHandler = function (e) {
        var t = this.$handlers;
        if (t[t.length - 1] != e) {
          while (t[t.length - 1] && t[t.length - 1] != this.$defaultHandler) this.removeKeyboardHandler(t[t.length - 1]);
          this.addKeyboardHandler(e, 1);
        }
      }, this.addKeyboardHandler = function (e, t) {
        if (e) {
          "function" != typeof e || e.handleKeyboard || (e.handleKeyboard = e);
          var n = this.$handlers.indexOf(e);
          -1 != n && this.$handlers.splice(n, 1), void 0 == t ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), -1 == n && e.attach && e.attach(this.$editor);
        }
      }, this.removeKeyboardHandler = function (e) {
        var t = this.$handlers.indexOf(e);
        return -1 != t && (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0);
      }, this.getKeyboardHandler = function () {
        return this.$handlers[this.$handlers.length - 1];
      }, this.getStatusText = function () {
        var e = this.$data,
          t = e.editor;
        return this.$handlers.map(function (n) {
          return n.getStatusText && n.getStatusText(t, e) || "";
        }).filter(Boolean).join(" ");
      }, this.$callKeyboardHandlers = function (e, t, n, r) {
        for (var o, a = !1, s = this.$editor.commands, l = this.$handlers.length; l--;) if (o = this.$handlers[l].handleKeyboard(this.$data, e, t, n, r), o && o.command && (a = "null" == o.command || s.exec(o.command, this.$editor, o.args, r), a && r && -1 != e && 1 != o.passEvent && 1 != o.command.passEvent && i.stopEvent(r), a)) break;
        return a || -1 != e || (o = {
          command: "insertstring"
        }, a = s.exec("insertstring", this.$editor, t)), a && this.$editor._signal && this.$editor._signal("keyboardActivity", o), a;
      }, this.onCommandKey = function (e, t, n) {
        var i = r.keyCodeToString(n);
        return this.$callKeyboardHandlers(t, i, n, e);
      }, this.onTextInput = function (e) {
        return this.$callKeyboardHandlers(-1, e);
      };
    }).call(o.prototype), t.KeyBinding = o;
  }), ace.define("ace/lib/bidiutil", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    var r = 0,
      i = 0,
      o = !1,
      a = !1,
      s = !1,
      l = [[0, 3, 0, 1, 0, 0, 0], [0, 3, 0, 1, 2, 2, 0], [0, 3, 0, 17, 2, 0, 1], [0, 3, 5, 5, 4, 1, 0], [0, 3, 21, 21, 4, 0, 1], [0, 3, 5, 5, 4, 2, 0]],
      c = [[2, 0, 1, 1, 0, 1, 0], [2, 0, 1, 1, 0, 2, 0], [2, 0, 2, 1, 3, 2, 0], [2, 0, 2, 33, 3, 1, 1]],
      u = 0,
      h = 1,
      f = 0,
      d = 1,
      p = 2,
      m = 3,
      g = 4,
      v = 5,
      y = 6,
      b = 7,
      w = 8,
      x = 9,
      _ = 10,
      E = 11,
      S = 12,
      k = 13,
      C = 14,
      O = 15,
      T = 16,
      L = 17,
      A = 18,
      P = [A, A, A, A, A, A, A, A, A, y, v, y, w, v, A, A, A, A, A, A, A, A, A, A, A, A, A, A, v, v, v, y, w, g, g, E, E, E, g, g, g, g, g, _, x, _, x, x, p, p, p, p, p, p, p, p, p, p, x, g, g, g, g, g, g, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, g, g, g, g, g, g, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, g, g, g, g, A, A, A, A, A, A, v, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, x, g, E, E, E, E, g, g, g, g, f, g, g, A, g, g, E, E, p, p, g, f, g, g, g, p, f, g, g, g, g, g],
      j = [w, w, w, w, w, w, w, w, w, w, w, A, A, A, f, d, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w, v, k, C, O, T, L, x, E, E, E, E, E, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, x, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, g, w];
    function M(e, t, n, u) {
      var h = r ? c : l,
        f = null,
        d = null,
        p = null,
        m = 0,
        g = null,
        b = null,
        x = -1,
        _ = null,
        E = null,
        S = [];
      if (!u) for (_ = 0, u = []; _ < n; _++) u[_] = D(e[_]);
      for (i = r, o = !1, !1, a = !1, s = !1, E = 0; E < n; E++) {
        if (f = m, S[E] = d = N(e, u, S, E), m = h[f][d], g = 240 & m, m &= 15, t[E] = p = h[m][5], g > 0) if (16 == g) {
          for (_ = x; _ < E; _++) t[_] = 1;
          x = -1;
        } else x = -1;
        if (b = h[m][6], b) -1 == x && (x = E);else if (x > -1) {
          for (_ = x; _ < E; _++) t[_] = p;
          x = -1;
        }
        u[E] == v && (t[E] = 0), i |= p;
      }
      if (s) for (_ = 0; _ < n; _++) if (u[_] == y) {
        t[_] = r;
        for (var k = _ - 1; k >= 0; k--) {
          if (u[k] != w) break;
          t[k] = r;
        }
      }
    }
    function R(e, t, n) {
      if (!(i < e)) if (1 != e || r != h || a) {
        var o,
          s,
          l,
          c,
          u = n.length,
          f = 0;
        while (f < u) {
          if (t[f] >= e) {
            o = f + 1;
            while (o < u && t[o] >= e) o++;
            for (s = f, l = o - 1; s < l; s++, l--) c = n[s], n[s] = n[l], n[l] = c;
            f = o;
          }
          f++;
        }
      } else n.reverse();
    }
    function N(e, t, n, i) {
      var l,
        c,
        u,
        h,
        P = t[i];
      switch (P) {
        case f:
        case d:
          o = !1;
        case g:
        case m:
          return P;
        case p:
          return o ? m : p;
        case b:
          return o = !0, !0, d;
        case w:
          return g;
        case x:
          return i < 1 || i + 1 >= t.length || (l = n[i - 1]) != p && l != m || (c = t[i + 1]) != p && c != m ? g : (o && (c = m), c == l ? c : g);
        case _:
          return l = i > 0 ? n[i - 1] : v, l == p && i + 1 < t.length && t[i + 1] == p ? p : g;
        case E:
          if (i > 0 && n[i - 1] == p) return p;
          if (o) return g;
          h = i + 1, u = t.length;
          while (h < u && t[h] == E) h++;
          return h < u && t[h] == p ? p : g;
        case S:
          u = t.length, h = i + 1;
          while (h < u && t[h] == S) h++;
          if (h < u) {
            var j = e[i],
              M = j >= 1425 && j <= 2303 || 64286 == j;
            if (l = t[h], M && (l == d || l == b)) return d;
          }
          return i < 1 || (l = t[i - 1]) == v ? g : n[i - 1];
        case v:
          return o = !1, a = !0, r;
        case y:
          return s = !0, g;
        case k:
        case C:
        case T:
        case L:
        case O:
          o = !1;
        case A:
          return g;
      }
    }
    function D(e) {
      var t = e.charCodeAt(0),
        n = t >> 8;
      return 0 == n ? t > 191 ? f : P[t] : 5 == n ? /[\u0591-\u05f4]/.test(e) ? d : f : 6 == n ? /[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(e) ? S : /[\u0660-\u0669\u066b-\u066c]/.test(e) ? m : 1642 == t ? E : /[\u06f0-\u06f9]/.test(e) ? p : b : 32 == n && t <= 8287 ? j[255 & t] : 254 == n && t >= 65136 ? b : g;
    }
    t.L = f, t.R = d, t.EN = p, t.ON_R = 3, t.AN = 4, t.R_H = 5, t.B = 6, t.RLE = 7, t.DOT = "\xb7", t.doBidiReorder = function (e, n, i) {
      if (e.length < 2) return {};
      var o = e.split(""),
        a = new Array(o.length),
        s = new Array(o.length),
        l = [];
      r = i ? h : u, M(o, l, o.length, n);
      for (var c = 0; c < a.length; a[c] = c, c++);
      R(2, l, a), R(1, l, a);
      for (c = 0; c < a.length - 1; c++) n[c] === m ? l[c] = t.AN : l[c] === d && (n[c] > b && n[c] < k || n[c] === g || n[c] === A) ? l[c] = t.ON_R : c > 0 && "\u0644" === o[c - 1] && /\u0622|\u0623|\u0625|\u0627/.test(o[c]) && (l[c - 1] = l[c] = t.R_H, c++);
      o[o.length - 1] === t.DOT && (l[o.length - 1] = t.B), "\u202b" === o[0] && (l[0] = t.RLE);
      for (c = 0; c < a.length; c++) s[c] = l[a[c]];
      return {
        logicalFromVisual: a,
        bidiLevels: s
      };
    }, t.hasBidiCharacters = function (e, t) {
      for (var n = !1, r = 0; r < e.length; r++) t[r] = D(e.charAt(r)), n || t[r] != d && t[r] != b && t[r] != m || (n = !0);
      return n;
    }, t.getVisualFromLogicalIdx = function (e, t) {
      for (var n = 0; n < t.logicalFromVisual.length; n++) if (t.logicalFromVisual[n] == e) return n;
      return 0;
    };
  }), ace.define("ace/bidihandler", ["require", "exports", "module", "ace/lib/bidiutil", "ace/lib/lang"], function (e, t, n) {
    "use strict";

    var r = e("./lib/bidiutil"),
      i = e("./lib/lang"),
      o = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/,
      a = function (e) {
        this.session = e, this.bidiMap = {}, this.currentRow = null, this.bidiUtil = r, this.charWidths = [], this.EOL = "\xac", this.showInvisibles = !0, this.isRtlDir = !1, this.$isRtl = !1, this.line = "", this.wrapIndent = 0, this.EOF = "\xb6", this.RLE = "\u202b", this.contentWidth = 0, this.fontMetrics = null, this.rtlLineOffset = 0, this.wrapOffset = 0, this.isMoveLeftOperation = !1, this.seenBidi = o.test(e.getValue());
      };
    (function () {
      this.isBidiRow = function (e, t, n) {
        return !!this.seenBidi && (e !== this.currentRow && (this.currentRow = e, this.updateRowLine(t, n), this.updateBidiMap()), this.bidiMap.bidiLevels);
      }, this.onChange = function (e) {
        this.seenBidi ? this.currentRow = null : "insert" == e.action && o.test(e.lines.join("\n")) && (this.seenBidi = !0, this.currentRow = null);
      }, this.getDocumentRow = function () {
        var e = 0,
          t = this.session.$screenRowCache;
        if (t.length) {
          var n = this.session.$getRowCacheIndex(t, this.currentRow);
          n >= 0 && (e = this.session.$docRowCache[n]);
        }
        return e;
      }, this.getSplitIndex = function () {
        var e = 0,
          t = this.session.$screenRowCache;
        if (t.length) {
          var n,
            r = this.session.$getRowCacheIndex(t, this.currentRow);
          while (this.currentRow - e > 0) {
            if (n = this.session.$getRowCacheIndex(t, this.currentRow - e - 1), n !== r) break;
            r = n, e++;
          }
        } else e = this.currentRow;
        return e;
      }, this.updateRowLine = function (e, t) {
        void 0 === e && (e = this.getDocumentRow());
        var n = e === this.session.getLength() - 1,
          o = n ? this.EOF : this.EOL;
        if (this.wrapIndent = 0, this.line = this.session.getLine(e), this.isRtlDir = this.$isRtl || this.line.charAt(0) === this.RLE, this.session.$useWrapMode) {
          var a = this.session.$wrapData[e];
          a && (void 0 === t && (t = this.getSplitIndex()), t > 0 && a.length ? (this.wrapIndent = a.indent, this.wrapOffset = this.wrapIndent * this.charWidths[r.L], this.line = t < a.length ? this.line.substring(a[t - 1], a[t]) : this.line.substring(a[a.length - 1])) : this.line = this.line.substring(0, a[t]), t == a.length && (this.line += this.showInvisibles ? o : r.DOT));
        } else this.line += this.showInvisibles ? o : r.DOT;
        var s,
          l = this.session,
          c = 0;
        this.line = this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g, function (e, t) {
          return "\t" === e || l.isFullWidth(e.charCodeAt(0)) ? (s = "\t" === e ? l.getScreenTabSize(t + c) : 2, c += s - 1, i.stringRepeat(r.DOT, s)) : e;
        }), this.isRtlDir && (this.fontMetrics.$main.textContent = this.line.charAt(this.line.length - 1) == r.DOT ? this.line.substr(0, this.line.length - 1) : this.line, this.rtlLineOffset = this.contentWidth - this.fontMetrics.$main.getBoundingClientRect().width);
      }, this.updateBidiMap = function () {
        var e = [];
        r.hasBidiCharacters(this.line, e) || this.isRtlDir ? this.bidiMap = r.doBidiReorder(this.line, e, this.isRtlDir) : this.bidiMap = {};
      }, this.markAsDirty = function () {
        this.currentRow = null;
      }, this.updateCharacterWidths = function (e) {
        if (this.characterWidth !== e.$characterSize.width) {
          this.fontMetrics = e;
          var t = this.characterWidth = e.$characterSize.width,
            n = e.$measureCharWidth("\u05d4");
          this.charWidths[r.L] = this.charWidths[r.EN] = this.charWidths[r.ON_R] = t, this.charWidths[r.R] = this.charWidths[r.AN] = n, this.charWidths[r.R_H] = .45 * n, this.charWidths[r.B] = this.charWidths[r.RLE] = 0, this.currentRow = null;
        }
      }, this.setShowInvisibles = function (e) {
        this.showInvisibles = e, this.currentRow = null;
      }, this.setEolChar = function (e) {
        this.EOL = e;
      }, this.setContentWidth = function (e) {
        this.contentWidth = e;
      }, this.isRtlLine = function (e) {
        return !!this.$isRtl || (void 0 != e ? this.session.getLine(e).charAt(0) == this.RLE : this.isRtlDir);
      }, this.setRtlDirection = function (e, t) {
        for (var n = e.getCursorPosition(), r = e.selection.getSelectionAnchor().row; r <= n.row; r++) t || e.session.getLine(r).charAt(0) !== e.session.$bidiHandler.RLE ? t && e.session.getLine(r).charAt(0) !== e.session.$bidiHandler.RLE && e.session.doc.insert({
          column: 0,
          row: r
        }, e.session.$bidiHandler.RLE) : e.session.doc.removeInLine(r, 0, 1);
      }, this.getPosLeft = function (e) {
        e -= this.wrapIndent;
        var t = this.line.charAt(0) === this.RLE ? 1 : 0,
          n = e > t ? this.session.getOverwrite() ? e : e - 1 : t,
          i = r.getVisualFromLogicalIdx(n, this.bidiMap),
          o = this.bidiMap.bidiLevels,
          a = 0;
        !this.session.getOverwrite() && e <= t && o[i] % 2 !== 0 && i++;
        for (var s = 0; s < i; s++) a += this.charWidths[o[s]];
        return !this.session.getOverwrite() && e > t && o[i] % 2 === 0 && (a += this.charWidths[o[i]]), this.wrapIndent && (a += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset), this.isRtlDir && (a += this.rtlLineOffset), a;
      }, this.getSelections = function (e, t) {
        var n,
          r = this.bidiMap,
          i = r.bidiLevels,
          o = [],
          a = 0,
          s = Math.min(e, t) - this.wrapIndent,
          l = Math.max(e, t) - this.wrapIndent,
          c = !1,
          u = !1,
          h = 0;
        this.wrapIndent && (a += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset);
        for (var f, d = 0; d < i.length; d++) f = r.logicalFromVisual[d], n = i[d], c = f >= s && f < l, c && !u ? h = a : !c && u && o.push({
          left: h,
          width: a - h
        }), a += this.charWidths[n], u = c;
        if (c && d === i.length && o.push({
          left: h,
          width: a - h
        }), this.isRtlDir) for (var p = 0; p < o.length; p++) o[p].left += this.rtlLineOffset;
        return o;
      }, this.offsetToCol = function (e) {
        this.isRtlDir && (e -= this.rtlLineOffset);
        var t = 0,
          n = (e = Math.max(e, 0), 0),
          r = 0,
          i = this.bidiMap.bidiLevels,
          o = this.charWidths[i[r]];
        this.wrapIndent && (e -= this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset);
        while (e > n + o / 2) {
          if (n += o, r === i.length - 1) {
            o = 0;
            break;
          }
          o = this.charWidths[i[++r]];
        }
        return r > 0 && i[r - 1] % 2 !== 0 && i[r] % 2 === 0 ? (e < n && r--, t = this.bidiMap.logicalFromVisual[r]) : r > 0 && i[r - 1] % 2 === 0 && i[r] % 2 !== 0 ? t = 1 + (e > n ? this.bidiMap.logicalFromVisual[r] : this.bidiMap.logicalFromVisual[r - 1]) : this.isRtlDir && r === i.length - 1 && 0 === o && i[r - 1] % 2 === 0 || !this.isRtlDir && 0 === r && i[r] % 2 !== 0 ? t = 1 + this.bidiMap.logicalFromVisual[r] : (r > 0 && i[r - 1] % 2 !== 0 && 0 !== o && r--, t = this.bidiMap.logicalFromVisual[r]), 0 === t && this.isRtlDir && t++, t + this.wrapIndent;
      };
    }).call(a.prototype), t.BidiHandler = a;
  }), ace.define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./lib/lang"),
      o = e("./lib/event_emitter").EventEmitter,
      a = e("./range").Range,
      s = function (e) {
        this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.cursor = this.lead = this.doc.createAnchor(0, 0), this.anchor = this.doc.createAnchor(0, 0), this.$silent = !1;
        var t = this;
        this.cursor.on("change", function (e) {
          t.$cursorChanged = !0, t.$silent || t._emit("changeCursor"), t.$isEmpty || t.$silent || t._emit("changeSelection"), t.$keepDesiredColumnOnChange || e.old.column == e.value.column || (t.$desiredColumn = null);
        }), this.anchor.on("change", function () {
          t.$anchorChanged = !0, t.$isEmpty || t.$silent || t._emit("changeSelection");
        });
      };
    (function () {
      r.implement(this, o), this.isEmpty = function () {
        return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column;
      }, this.isMultiLine = function () {
        return !this.$isEmpty && this.anchor.row != this.cursor.row;
      }, this.getCursor = function () {
        return this.lead.getPosition();
      }, this.setSelectionAnchor = function (e, t) {
        this.$isEmpty = !1, this.anchor.setPosition(e, t);
      }, this.getAnchor = this.getSelectionAnchor = function () {
        return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition();
      }, this.getSelectionLead = function () {
        return this.lead.getPosition();
      }, this.isBackwards = function () {
        var e = this.anchor,
          t = this.lead;
        return e.row > t.row || e.row == t.row && e.column > t.column;
      }, this.getRange = function () {
        var e = this.anchor,
          t = this.lead;
        return this.$isEmpty ? a.fromPoints(t, t) : this.isBackwards() ? a.fromPoints(t, e) : a.fromPoints(e, t);
      }, this.clearSelection = function () {
        this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"));
      }, this.selectAll = function () {
        this.$setSelection(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
      }, this.setRange = this.setSelectionRange = function (e, t) {
        var n = t ? e.end : e.start,
          r = t ? e.start : e.end;
        this.$setSelection(n.row, n.column, r.row, r.column);
      }, this.$setSelection = function (e, t, n, r) {
        if (!this.$silent) {
          var i = this.$isEmpty,
            o = this.inMultiSelectMode;
          this.$silent = !0, this.$cursorChanged = this.$anchorChanged = !1, this.anchor.setPosition(e, t), this.cursor.setPosition(n, r), this.$isEmpty = !a.comparePoints(this.anchor, this.cursor), this.$silent = !1, this.$cursorChanged && this._emit("changeCursor"), (this.$cursorChanged || this.$anchorChanged || i != this.$isEmpty || o) && this._emit("changeSelection");
        }
      }, this.$moveSelection = function (e) {
        var t = this.lead;
        this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this);
      }, this.selectTo = function (e, t) {
        this.$moveSelection(function () {
          this.moveCursorTo(e, t);
        });
      }, this.selectToPosition = function (e) {
        this.$moveSelection(function () {
          this.moveCursorToPosition(e);
        });
      }, this.moveTo = function (e, t) {
        this.clearSelection(), this.moveCursorTo(e, t);
      }, this.moveToPosition = function (e) {
        this.clearSelection(), this.moveCursorToPosition(e);
      }, this.selectUp = function () {
        this.$moveSelection(this.moveCursorUp);
      }, this.selectDown = function () {
        this.$moveSelection(this.moveCursorDown);
      }, this.selectRight = function () {
        this.$moveSelection(this.moveCursorRight);
      }, this.selectLeft = function () {
        this.$moveSelection(this.moveCursorLeft);
      }, this.selectLineStart = function () {
        this.$moveSelection(this.moveCursorLineStart);
      }, this.selectLineEnd = function () {
        this.$moveSelection(this.moveCursorLineEnd);
      }, this.selectFileEnd = function () {
        this.$moveSelection(this.moveCursorFileEnd);
      }, this.selectFileStart = function () {
        this.$moveSelection(this.moveCursorFileStart);
      }, this.selectWordRight = function () {
        this.$moveSelection(this.moveCursorWordRight);
      }, this.selectWordLeft = function () {
        this.$moveSelection(this.moveCursorWordLeft);
      }, this.getWordRange = function (e, t) {
        if ("undefined" == typeof t) {
          var n = e || this.lead;
          e = n.row, t = n.column;
        }
        return this.session.getWordRange(e, t);
      }, this.selectWord = function () {
        this.setSelectionRange(this.getWordRange());
      }, this.selectAWord = function () {
        var e = this.getCursor(),
          t = this.session.getAWordRange(e.row, e.column);
        this.setSelectionRange(t);
      }, this.getLineRange = function (e, t) {
        var n,
          r = "number" == typeof e ? e : this.lead.row,
          i = this.session.getFoldLine(r);
        return i ? (r = i.start.row, n = i.end.row) : n = r, !0 === t ? new a(r, 0, n, this.session.getLine(n).length) : new a(r, 0, n + 1, 0);
      }, this.selectLine = function () {
        this.setSelectionRange(this.getLineRange());
      }, this.moveCursorUp = function () {
        this.moveCursorBy(-1, 0);
      }, this.moveCursorDown = function () {
        this.moveCursorBy(1, 0);
      }, this.wouldMoveIntoSoftTab = function (e, t, n) {
        var r = e.column,
          i = e.column + t;
        return n < 0 && (r = e.column - t, i = e.column), this.session.isTabStop(e) && this.doc.getLine(e.row).slice(r, i).split(" ").length - 1 == t;
      }, this.moveCursorLeft = function () {
        var e,
          t = this.lead.getPosition();
        if (e = this.session.getFoldAt(t.row, t.column, -1)) this.moveCursorTo(e.start.row, e.start.column);else if (0 === t.column) t.row > 0 && this.moveCursorTo(t.row - 1, this.doc.getLine(t.row - 1).length);else {
          var n = this.session.getTabSize();
          this.wouldMoveIntoSoftTab(t, n, -1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, -n) : this.moveCursorBy(0, -1);
        }
      }, this.moveCursorRight = function () {
        var e,
          t = this.lead.getPosition();
        if (e = this.session.getFoldAt(t.row, t.column, 1)) this.moveCursorTo(e.end.row, e.end.column);else if (this.lead.column == this.doc.getLine(this.lead.row).length) this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);else {
          var n = this.session.getTabSize();
          t = this.lead;
          this.wouldMoveIntoSoftTab(t, n, 1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, n) : this.moveCursorBy(0, 1);
        }
      }, this.moveCursorLineStart = function () {
        var e = this.lead.row,
          t = this.lead.column,
          n = this.session.documentToScreenRow(e, t),
          r = this.session.screenToDocumentPosition(n, 0),
          i = this.session.getDisplayLine(e, null, r.row, r.column),
          o = i.match(/^\s*/);
        o[0].length == t || this.session.$useEmacsStyleLineStart || (r.column += o[0].length), this.moveCursorToPosition(r);
      }, this.moveCursorLineEnd = function () {
        var e = this.lead,
          t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
        if (this.lead.column == t.column) {
          var n = this.session.getLine(t.row);
          if (t.column == n.length) {
            var r = n.search(/\s+$/);
            r > 0 && (t.column = r);
          }
        }
        this.moveCursorTo(t.row, t.column);
      }, this.moveCursorFileEnd = function () {
        var e = this.doc.getLength() - 1,
          t = this.doc.getLine(e).length;
        this.moveCursorTo(e, t);
      }, this.moveCursorFileStart = function () {
        this.moveCursorTo(0, 0);
      }, this.moveCursorLongWordRight = function () {
        var e = this.lead.row,
          t = this.lead.column,
          n = this.doc.getLine(e),
          r = n.substring(t);
        this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
        var i = this.session.getFoldAt(e, t, 1);
        if (i) this.moveCursorTo(i.end.row, i.end.column);else {
          if (this.session.nonTokenRe.exec(r) && (t += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, r = n.substring(t)), t >= n.length) return this.moveCursorTo(e, n.length), this.moveCursorRight(), void (e < this.doc.getLength() - 1 && this.moveCursorWordRight());
          this.session.tokenRe.exec(r) && (t += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(e, t);
        }
      }, this.moveCursorLongWordLeft = function () {
        var e,
          t = this.lead.row,
          n = this.lead.column;
        if (e = this.session.getFoldAt(t, n, -1)) this.moveCursorTo(e.start.row, e.start.column);else {
          var r = this.session.getFoldStringAt(t, n, -1);
          null == r && (r = this.doc.getLine(t).substring(0, n));
          var o = i.stringReverse(r);
          if (this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, this.session.nonTokenRe.exec(o) && (n -= this.session.nonTokenRe.lastIndex, o = o.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), n <= 0) return this.moveCursorTo(t, 0), this.moveCursorLeft(), void (t > 0 && this.moveCursorWordLeft());
          this.session.tokenRe.exec(o) && (n -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(t, n);
        }
      }, this.$shortWordEndIndex = function (e) {
        var t,
          n = 0,
          r = /\s/,
          i = this.session.tokenRe;
        if (i.lastIndex = 0, this.session.tokenRe.exec(e)) n = this.session.tokenRe.lastIndex;else {
          while ((t = e[n]) && r.test(t)) n++;
          if (n < 1) {
            i.lastIndex = 0;
            while ((t = e[n]) && !i.test(t)) if (i.lastIndex = 0, n++, r.test(t)) {
              if (n > 2) {
                n--;
                break;
              }
              while ((t = e[n]) && r.test(t)) n++;
              if (n > 2) break;
            }
          }
        }
        return i.lastIndex = 0, n;
      }, this.moveCursorShortWordRight = function () {
        var e = this.lead.row,
          t = this.lead.column,
          n = this.doc.getLine(e),
          r = n.substring(t),
          i = this.session.getFoldAt(e, t, 1);
        if (i) return this.moveCursorTo(i.end.row, i.end.column);
        if (t == n.length) {
          var o = this.doc.getLength();
          do {
            e++, r = this.doc.getLine(e);
          } while (e < o && /^\s*$/.test(r));
          /^\s+/.test(r) || (r = ""), t = 0;
        }
        var a = this.$shortWordEndIndex(r);
        this.moveCursorTo(e, t + a);
      }, this.moveCursorShortWordLeft = function () {
        var e,
          t = this.lead.row,
          n = this.lead.column;
        if (e = this.session.getFoldAt(t, n, -1)) return this.moveCursorTo(e.start.row, e.start.column);
        var r = this.session.getLine(t).substring(0, n);
        if (0 === n) {
          do {
            t--, r = this.doc.getLine(t);
          } while (t > 0 && /^\s*$/.test(r));
          n = r.length, /\s+$/.test(r) || (r = "");
        }
        var o = i.stringReverse(r),
          a = this.$shortWordEndIndex(o);
        return this.moveCursorTo(t, n - a);
      }, this.moveCursorWordRight = function () {
        this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight();
      }, this.moveCursorWordLeft = function () {
        this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft();
      }, this.moveCursorBy = function (e, t) {
        var n,
          r = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
        if (0 === t && (0 !== e && (this.session.$bidiHandler.isBidiRow(r.row, this.lead.row) ? (n = this.session.$bidiHandler.getPosLeft(r.column), r.column = Math.round(n / this.session.$bidiHandler.charWidths[0])) : n = r.column * this.session.$bidiHandler.charWidths[0]), this.$desiredColumn ? r.column = this.$desiredColumn : this.$desiredColumn = r.column), 0 != e && this.session.lineWidgets && this.session.lineWidgets[this.lead.row]) {
          var i = this.session.lineWidgets[this.lead.row];
          e < 0 ? e -= i.rowsAbove || 0 : e > 0 && (e += i.rowCount - (i.rowsAbove || 0));
        }
        var o = this.session.screenToDocumentPosition(r.row + e, r.column, n);
        0 !== e && 0 === t && o.row === this.lead.row && (o.column, this.lead.column), this.moveCursorTo(o.row, o.column + t, 0 === t);
      }, this.moveCursorToPosition = function (e) {
        this.moveCursorTo(e.row, e.column);
      }, this.moveCursorTo = function (e, t, n) {
        var r = this.session.getFoldAt(e, t, 1);
        r && (e = r.start.row, t = r.start.column), this.$keepDesiredColumnOnChange = !0;
        var i = this.session.getLine(e);
        /[\uDC00-\uDFFF]/.test(i.charAt(t)) && i.charAt(t - 1) && (this.lead.row == e && this.lead.column == t + 1 ? t -= 1 : t += 1), this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, n || (this.$desiredColumn = null);
      }, this.moveCursorToScreen = function (e, t, n) {
        var r = this.session.screenToDocumentPosition(e, t);
        this.moveCursorTo(r.row, r.column, n);
      }, this.detach = function () {
        this.lead.detach(), this.anchor.detach();
      }, this.fromOrientedRange = function (e) {
        this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn;
      }, this.toOrientedRange = function (e) {
        var t = this.getRange();
        return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e;
      }, this.getRangeOfMovements = function (e) {
        var t = this.getCursor();
        try {
          e(this);
          var n = this.getCursor();
          return a.fromPoints(t, n);
        } catch (e) {
          return a.fromPoints(t, t);
        } finally {
          this.moveCursorToPosition(t);
        }
      }, this.toJSON = function () {
        if (this.rangeCount) var e = this.ranges.map(function (e) {
          var t = e.clone();
          return t.isBackwards = e.cursor == e.start, t;
        });else {
          e = this.getRange();
          e.isBackwards = this.isBackwards();
        }
        return e;
      }, this.fromJSON = function (e) {
        if (void 0 == e.start) {
          if (this.rangeList && e.length > 1) {
            this.toSingleRange(e[0]);
            for (var t = e.length; t--;) {
              var n = a.fromPoints(e[t].start, e[t].end);
              e[t].isBackwards && (n.cursor = n.start), this.addRange(n, !0);
            }
            return;
          }
          e = e[0];
        }
        this.rangeList && this.toSingleRange(e), this.setSelectionRange(e, e.isBackwards);
      }, this.isEqual = function (e) {
        if ((e.length || this.rangeCount) && e.length != this.rangeCount) return !1;
        if (!e.length || !this.ranges) return this.getRange().isEqual(e);
        for (var t = this.ranges.length; t--;) if (!this.ranges[t].isEqual(e[t])) return !1;
        return !0;
      };
    }).call(s.prototype), t.Selection = s;
  }), ace.define("ace/tokenizer", ["require", "exports", "module", "ace/config"], function (e, t, n) {
    "use strict";

    var r = e("./config"),
      i = 2e3,
      o = function (e) {
        for (var t in this.states = e, this.regExps = {}, this.matchMappings = {}, this.states) {
          for (var n = this.states[t], r = [], i = 0, o = this.matchMappings[t] = {
              defaultToken: "text"
            }, a = "g", s = [], l = 0; l < n.length; l++) {
            var c = n[l];
            if (c.defaultToken && (o.defaultToken = c.defaultToken), c.caseInsensitive && -1 === a.indexOf("i") && (a += "i"), c.unicode && -1 === a.indexOf("u") && (a += "u"), null != c.regex) {
              c.regex instanceof RegExp && (c.regex = c.regex.toString().slice(1, -1));
              var u = c.regex,
                h = new RegExp("(?:(" + u + ")|(.))").exec("a").length - 2;
              Array.isArray(c.token) ? 1 == c.token.length || 1 == h ? c.token = c.token[0] : h - 1 != c.token.length ? (this.reportError("number of classes and regexp groups doesn't match", {
                rule: c,
                groupCount: h - 1
              }), c.token = c.token[0]) : (c.tokenArray = c.token, c.token = null, c.onMatch = this.$arrayTokens) : "function" != typeof c.token || c.onMatch || (c.onMatch = h > 1 ? this.$applyToken : c.token), h > 1 && (/\\\d/.test(c.regex) ? u = c.regex.replace(/\\([0-9]+)/g, function (e, t) {
                return "\\" + (parseInt(t, 10) + i + 1);
              }) : (h = 1, u = this.removeCapturingGroups(c.regex)), c.splitRegex || "string" == typeof c.token || s.push(c)), o[i] = l, i += h, r.push(u), c.onMatch || (c.onMatch = null);
            }
          }
          r.length || (o[0] = 0, r.push("$")), s.forEach(function (e) {
            e.splitRegex = this.createSplitterRegexp(e.regex, a);
          }, this), this.regExps[t] = new RegExp("(" + r.join(")|(") + ")|($)", a);
        }
      };
    (function () {
      this.$setMaxTokenCount = function (e) {
        i = 0 | e;
      }, this.$applyToken = function (e) {
        var t = this.splitRegex.exec(e).slice(1),
          n = this.token.apply(this, t);
        if ("string" === typeof n) return [{
          type: n,
          value: e
        }];
        for (var r = [], i = 0, o = n.length; i < o; i++) t[i] && (r[r.length] = {
          type: n[i],
          value: t[i]
        });
        return r;
      }, this.$arrayTokens = function (e) {
        if (!e) return [];
        var t = this.splitRegex.exec(e);
        if (!t) return "text";
        for (var n = [], r = this.tokenArray, i = 0, o = r.length; i < o; i++) t[i + 1] && (n[n.length] = {
          type: r[i],
          value: t[i + 1]
        });
        return n;
      }, this.removeCapturingGroups = function (e) {
        var t = e.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!<]|(\()/g, function (e, t) {
          return t ? "(?:" : e;
        });
        return t;
      }, this.createSplitterRegexp = function (e, t) {
        if (-1 != e.indexOf("(?=")) {
          var n = 0,
            r = !1,
            i = {};
          e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function (e, t, o, a, s, l) {
            return r ? r = "]" != s : s ? r = !0 : a ? (n == i.stack && (i.end = l + 1, i.stack = -1), n--) : o && (n++, 1 != o.length && (i.stack = n, i.start = l)), e;
          }), null != i.end && /^\)*$/.test(e.substr(i.end)) && (e = e.substring(0, i.start) + e.substr(i.end));
        }
        return "^" != e.charAt(0) && (e = "^" + e), "$" != e.charAt(e.length - 1) && (e += "$"), new RegExp(e, (t || "").replace("g", ""));
      }, this.getLineTokens = function (e, t) {
        if (t && "string" != typeof t) {
          var n = t.slice(0);
          t = n[0], "#tmp" === t && (n.shift(), t = n.shift());
        } else n = [];
        var r = t || "start",
          o = this.states[r];
        o || (r = "start", o = this.states[r]);
        var a = this.matchMappings[r],
          s = this.regExps[r];
        s.lastIndex = 0;
        var l,
          c = [],
          u = 0,
          h = 0,
          f = {
            type: null,
            value: ""
          };
        while (l = s.exec(e)) {
          var d = a.defaultToken,
            p = null,
            m = l[0],
            g = s.lastIndex;
          if (g - m.length > u) {
            var v = e.substring(u, g - m.length);
            f.type == d ? f.value += v : (f.type && c.push(f), f = {
              type: d,
              value: v
            });
          }
          for (var y = 0; y < l.length - 2; y++) if (void 0 !== l[y + 1]) {
            p = o[a[y]], d = p.onMatch ? p.onMatch(m, r, n, e) : p.token, p.next && (r = "string" == typeof p.next ? p.next : p.next(r, n), o = this.states[r], o || (this.reportError("state doesn't exist", r), r = "start", o = this.states[r]), a = this.matchMappings[r], u = g, s = this.regExps[r], s.lastIndex = g), p.consumeLineEnd && (u = g);
            break;
          }
          if (m) if ("string" === typeof d) p && !1 === p.merge || f.type !== d ? (f.type && c.push(f), f = {
            type: d,
            value: m
          }) : f.value += m;else if (d) {
            f.type && c.push(f), f = {
              type: null,
              value: ""
            };
            for (y = 0; y < d.length; y++) c.push(d[y]);
          }
          if (u == e.length) break;
          if (u = g, h++ > i) {
            h > 2 * e.length && this.reportError("infinite loop with in ace tokenizer", {
              startState: t,
              line: e
            });
            while (u < e.length) f.type && c.push(f), f = {
              value: e.substring(u, u += 500),
              type: "overflow"
            };
            r = "start", n = [];
            break;
          }
        }
        return f.type && c.push(f), n.length > 1 && n[0] !== r && n.unshift("#tmp", r), {
          tokens: c,
          state: n.length ? n : r
        };
      }, this.reportError = r.reportError;
    }).call(o.prototype), t.Tokenizer = o;
  }), ace.define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function (e, t, n) {
    "use strict";

    var r = e("../lib/lang"),
      i = function () {
        this.$rules = {
          start: [{
            token: "empty_line",
            regex: "^$"
          }, {
            defaultToken: "text"
          }]
        };
      };
    (function () {
      this.addRules = function (e, t) {
        if (t) for (var n in e) {
          for (var r = e[n], i = 0; i < r.length; i++) {
            var o = r[i];
            (o.next || o.onMatch) && ("string" == typeof o.next && 0 !== o.next.indexOf(t) && (o.next = t + o.next), o.nextState && 0 !== o.nextState.indexOf(t) && (o.nextState = t + o.nextState));
          }
          this.$rules[t + n] = r;
        } else for (var n in e) this.$rules[n] = e[n];
      }, this.getRules = function () {
        return this.$rules;
      }, this.embedRules = function (e, t, n, i, o) {
        var a = "function" == typeof e ? new e().getRules() : e;
        if (i) for (var s = 0; s < i.length; s++) i[s] = t + i[s];else for (var l in i = [], a) i.push(t + l);
        if (this.addRules(a, t), n) {
          var c = Array.prototype[o ? "push" : "unshift"];
          for (s = 0; s < i.length; s++) c.apply(this.$rules[i[s]], r.deepCopy(n));
        }
        this.$embeds || (this.$embeds = []), this.$embeds.push(t);
      }, this.getEmbeds = function () {
        return this.$embeds;
      };
      var e = function (e, t) {
          return ("start" != e || t.length) && t.unshift(this.nextState, e), this.nextState;
        },
        t = function (e, t) {
          return t.shift(), t.shift() || "start";
        };
      this.normalizeRules = function () {
        var n = 0,
          r = this.$rules;
        function i(o) {
          var a = r[o];
          a.processed = !0;
          for (var s = 0; s < a.length; s++) {
            var l = a[s],
              c = null;
            Array.isArray(l) && (c = l, l = {}), !l.regex && l.start && (l.regex = l.start, l.next || (l.next = []), l.next.push({
              defaultToken: l.token
            }, {
              token: l.token + ".end",
              regex: l.end || l.start,
              next: "pop"
            }), l.token = l.token + ".start", l.push = !0);
            var u = l.next || l.push;
            if (u && Array.isArray(u)) {
              var h = l.stateName;
              h || (h = l.token, "string" != typeof h && (h = h[0] || ""), r[h] && (h += n++)), r[h] = u, l.next = h, i(h);
            } else "pop" == u && (l.next = t);
            if (l.push && (l.nextState = l.next || l.push, l.next = e, delete l.push), l.rules) for (var f in l.rules) r[f] ? r[f].push && r[f].push.apply(r[f], l.rules[f]) : r[f] = l.rules[f];
            var d = "string" == typeof l ? l : l.include;
            if (d && (c = Array.isArray(d) ? d.map(function (e) {
              return r[e];
            }) : r[d]), c) {
              var p = [s, 1].concat(c);
              l.noEscape && (p = p.filter(function (e) {
                return !e.next;
              })), a.splice.apply(a, p), s--;
            }
            l.keywordMap && (l.token = this.createKeywordMapper(l.keywordMap, l.defaultToken || "text", l.caseInsensitive), delete l.defaultToken);
          }
        }
        Object.keys(r).forEach(i, this);
      }, this.createKeywordMapper = function (e, t, n, r) {
        var i = Object.create(null);
        return this.$keywordList = [], Object.keys(e).forEach(function (t) {
          for (var o = e[t], a = o.split(r || "|"), s = a.length; s--;) {
            var l = a[s];
            this.$keywordList.push(l), n && (l = l.toLowerCase()), i[l] = t;
          }
        }, this), e = null, n ? function (e) {
          return i[e.toLowerCase()] || t;
        } : function (e) {
          return i[e] || t;
        };
      }, this.getKeywords = function () {
        return this.$keywords;
      };
    }).call(i.prototype), t.TextHighlightRules = i;
  }), ace.define("ace/mode/behaviour", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    var r = function () {
      this.$behaviours = {};
    };
    (function () {
      this.add = function (e, t, n) {
        switch (void 0) {
          case this.$behaviours:
            this.$behaviours = {};
          case this.$behaviours[e]:
            this.$behaviours[e] = {};
        }
        this.$behaviours[e][t] = n;
      }, this.addBehaviours = function (e) {
        for (var t in e) for (var n in e[t]) this.add(t, n, e[t][n]);
      }, this.remove = function (e) {
        this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e];
      }, this.inherit = function (e, t) {
        if ("function" === typeof e) var n = new e().getBehaviours(t);else n = e.getBehaviours(t);
        this.addBehaviours(n);
      }, this.getBehaviours = function (e) {
        if (e) {
          for (var t = {}, n = 0; n < e.length; n++) this.$behaviours[e[n]] && (t[e[n]] = this.$behaviours[e[n]]);
          return t;
        }
        return this.$behaviours;
      };
    }).call(r.prototype), t.Behaviour = r;
  }), ace.define("ace/token_iterator", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("./range").Range,
      i = function (e, t, n) {
        this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
        var r = e.getTokenAt(t, n);
        this.$tokenIndex = r ? r.index : -1;
      };
    (function () {
      this.stepBackward = function () {
        this.$tokenIndex -= 1;
        while (this.$tokenIndex < 0) {
          if (this.$row -= 1, this.$row < 0) return this.$row = 0, null;
          this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1;
        }
        return this.$rowTokens[this.$tokenIndex];
      }, this.stepForward = function () {
        var e;
        this.$tokenIndex += 1;
        while (this.$tokenIndex >= this.$rowTokens.length) {
          if (this.$row += 1, e || (e = this.$session.getLength()), this.$row >= e) return this.$row = e - 1, null;
          this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0;
        }
        return this.$rowTokens[this.$tokenIndex];
      }, this.getCurrentToken = function () {
        return this.$rowTokens[this.$tokenIndex];
      }, this.getCurrentTokenRow = function () {
        return this.$row;
      }, this.getCurrentTokenColumn = function () {
        var e = this.$rowTokens,
          t = this.$tokenIndex,
          n = e[t].start;
        if (void 0 !== n) return n;
        n = 0;
        while (t > 0) t -= 1, n += e[t].value.length;
        return n;
      }, this.getCurrentTokenPosition = function () {
        return {
          row: this.$row,
          column: this.getCurrentTokenColumn()
        };
      }, this.getCurrentTokenRange = function () {
        var e = this.$rowTokens[this.$tokenIndex],
          t = this.getCurrentTokenColumn();
        return new r(this.$row, t, this.$row, t + e.value.length);
      };
    }).call(i.prototype), t.TokenIterator = i;
  }), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function (e, t, n) {
    "use strict";

    var r,
      i = e("../../lib/oop"),
      o = e("../behaviour").Behaviour,
      a = e("../../token_iterator").TokenIterator,
      s = e("../../lib/lang"),
      l = ["text", "paren.rparen", "rparen", "paren", "punctuation.operator"],
      c = ["text", "paren.rparen", "rparen", "paren", "punctuation.operator", "comment"],
      u = {},
      h = {
        '"': '"',
        "'": "'"
      },
      f = function (e) {
        var t = -1;
        if (e.multiSelect && (t = e.selection.index, u.rangeCount != e.multiSelect.rangeCount && (u = {
          rangeCount: e.multiSelect.rangeCount
        })), u[t]) return r = u[t];
        r = u[t] = {
          autoInsertedBrackets: 0,
          autoInsertedRow: -1,
          autoInsertedLineEnd: "",
          maybeInsertedBrackets: 0,
          maybeInsertedRow: -1,
          maybeInsertedLineStart: "",
          maybeInsertedLineEnd: ""
        };
      },
      d = function (e, t, n, r) {
        var i = e.end.row - e.start.row;
        return {
          text: n + t + r,
          selection: [0, e.start.column + 1, i, e.end.column + (i ? 0 : 1)]
        };
      },
      p = function (e) {
        this.add("braces", "insertion", function (t, n, i, o, a) {
          var l = i.getCursorPosition(),
            c = o.doc.getLine(l.row);
          if ("{" == a) {
            f(i);
            var u = i.getSelectionRange(),
              h = o.doc.getTextRange(u);
            if ("" !== h && "{" !== h && i.getWrapBehavioursEnabled()) return d(u, h, "{", "}");
            if (p.isSaneInsertion(i, o)) return /[\]\}\)]/.test(c[l.column]) || i.inMultiSelectMode || e && e.braces ? (p.recordAutoInsert(i, o, "}"), {
              text: "{}",
              selection: [1, 1]
            }) : (p.recordMaybeInsert(i, o, "{"), {
              text: "{",
              selection: [1, 1]
            });
          } else if ("}" == a) {
            f(i);
            var m = c.substring(l.column, l.column + 1);
            if ("}" == m) {
              var g = o.$findOpeningBracket("}", {
                column: l.column + 1,
                row: l.row
              });
              if (null !== g && p.isAutoInsertedClosing(l, c, a)) return p.popAutoInsertedClosing(), {
                text: "",
                selection: [1, 1]
              };
            }
          } else {
            if ("\n" == a || "\r\n" == a) {
              f(i);
              var v = "";
              p.isMaybeInsertedClosing(l, c) && (v = s.stringRepeat("}", r.maybeInsertedBrackets), p.clearMaybeInsertedClosing());
              m = c.substring(l.column, l.column + 1);
              if ("}" === m) {
                var y = o.findMatchingBracket({
                  row: l.row,
                  column: l.column + 1
                }, "}");
                if (!y) return null;
                var b = this.$getIndent(o.getLine(y.row));
              } else {
                if (!v) return void p.clearMaybeInsertedClosing();
                b = this.$getIndent(c);
              }
              var w = b + o.getTabString();
              return {
                text: "\n" + w + "\n" + b + v,
                selection: [1, w.length, 1, w.length]
              };
            }
            p.clearMaybeInsertedClosing();
          }
        }), this.add("braces", "deletion", function (e, t, n, i, o) {
          var a = i.doc.getTextRange(o);
          if (!o.isMultiLine() && "{" == a) {
            f(n);
            var s = i.doc.getLine(o.start.row),
              l = s.substring(o.end.column, o.end.column + 1);
            if ("}" == l) return o.end.column++, o;
            r.maybeInsertedBrackets--;
          }
        }), this.add("parens", "insertion", function (e, t, n, r, i) {
          if ("(" == i) {
            f(n);
            var o = n.getSelectionRange(),
              a = r.doc.getTextRange(o);
            if ("" !== a && n.getWrapBehavioursEnabled()) return d(o, a, "(", ")");
            if (p.isSaneInsertion(n, r)) return p.recordAutoInsert(n, r, ")"), {
              text: "()",
              selection: [1, 1]
            };
          } else if (")" == i) {
            f(n);
            var s = n.getCursorPosition(),
              l = r.doc.getLine(s.row),
              c = l.substring(s.column, s.column + 1);
            if (")" == c) {
              var u = r.$findOpeningBracket(")", {
                column: s.column + 1,
                row: s.row
              });
              if (null !== u && p.isAutoInsertedClosing(s, l, i)) return p.popAutoInsertedClosing(), {
                text: "",
                selection: [1, 1]
              };
            }
          }
        }), this.add("parens", "deletion", function (e, t, n, r, i) {
          var o = r.doc.getTextRange(i);
          if (!i.isMultiLine() && "(" == o) {
            f(n);
            var a = r.doc.getLine(i.start.row),
              s = a.substring(i.start.column + 1, i.start.column + 2);
            if (")" == s) return i.end.column++, i;
          }
        }), this.add("brackets", "insertion", function (e, t, n, r, i) {
          if ("[" == i) {
            f(n);
            var o = n.getSelectionRange(),
              a = r.doc.getTextRange(o);
            if ("" !== a && n.getWrapBehavioursEnabled()) return d(o, a, "[", "]");
            if (p.isSaneInsertion(n, r)) return p.recordAutoInsert(n, r, "]"), {
              text: "[]",
              selection: [1, 1]
            };
          } else if ("]" == i) {
            f(n);
            var s = n.getCursorPosition(),
              l = r.doc.getLine(s.row),
              c = l.substring(s.column, s.column + 1);
            if ("]" == c) {
              var u = r.$findOpeningBracket("]", {
                column: s.column + 1,
                row: s.row
              });
              if (null !== u && p.isAutoInsertedClosing(s, l, i)) return p.popAutoInsertedClosing(), {
                text: "",
                selection: [1, 1]
              };
            }
          }
        }), this.add("brackets", "deletion", function (e, t, n, r, i) {
          var o = r.doc.getTextRange(i);
          if (!i.isMultiLine() && "[" == o) {
            f(n);
            var a = r.doc.getLine(i.start.row),
              s = a.substring(i.start.column + 1, i.start.column + 2);
            if ("]" == s) return i.end.column++, i;
          }
        }), this.add("string_dquotes", "insertion", function (e, t, n, r, i) {
          var o = r.$mode.$quotes || h;
          if (1 == i.length && o[i]) {
            if (this.lineCommentStart && -1 != this.lineCommentStart.indexOf(i)) return;
            f(n);
            var a = i,
              s = n.getSelectionRange(),
              l = r.doc.getTextRange(s);
            if (!("" === l || 1 == l.length && o[l]) && n.getWrapBehavioursEnabled()) return d(s, l, a, a);
            if (!l) {
              var c = n.getCursorPosition(),
                u = r.doc.getLine(c.row),
                p = u.substring(c.column - 1, c.column),
                m = u.substring(c.column, c.column + 1),
                g = r.getTokenAt(c.row, c.column),
                v = r.getTokenAt(c.row, c.column + 1);
              if ("\\" == p && g && /escape/.test(g.type)) return null;
              var y,
                b = g && /string|escape/.test(g.type),
                w = !v || /string|escape/.test(v.type);
              if (m == a) y = b !== w, y && /string\.end/.test(v.type) && (y = !1);else {
                if (b && !w) return null;
                if (b && w) return null;
                var x = r.$mode.tokenRe;
                x.lastIndex = 0;
                var _ = x.test(p);
                x.lastIndex = 0;
                var E = x.test(p);
                if (_ || E) return null;
                if (m && !/[\s;,.})\]\\]/.test(m)) return null;
                var S = u[c.column - 2];
                if (p == a && (S == a || x.test(S))) return null;
                y = !0;
              }
              return {
                text: y ? a + a : "",
                selection: [1, 1]
              };
            }
          }
        }), this.add("string_dquotes", "deletion", function (e, t, n, r, i) {
          var o = r.$mode.$quotes || h,
            a = r.doc.getTextRange(i);
          if (!i.isMultiLine() && o.hasOwnProperty(a)) {
            f(n);
            var s = r.doc.getLine(i.start.row),
              l = s.substring(i.start.column + 1, i.start.column + 2);
            if (l == a) return i.end.column++, i;
          }
        });
      };
    p.isSaneInsertion = function (e, t) {
      var n = e.getCursorPosition(),
        r = new a(t, n.row, n.column);
      if (!this.$matchTokenType(r.getCurrentToken() || "text", l)) {
        if (/[)}\]]/.test(e.session.getLine(n.row)[n.column])) return !0;
        var i = new a(t, n.row, n.column + 1);
        if (!this.$matchTokenType(i.getCurrentToken() || "text", l)) return !1;
      }
      return r.stepForward(), r.getCurrentTokenRow() !== n.row || this.$matchTokenType(r.getCurrentToken() || "text", c);
    }, p.$matchTokenType = function (e, t) {
      return t.indexOf(e.type || e) > -1;
    }, p.recordAutoInsert = function (e, t, n) {
      var i = e.getCursorPosition(),
        o = t.doc.getLine(i.row);
      this.isAutoInsertedClosing(i, o, r.autoInsertedLineEnd[0]) || (r.autoInsertedBrackets = 0), r.autoInsertedRow = i.row, r.autoInsertedLineEnd = n + o.substr(i.column), r.autoInsertedBrackets++;
    }, p.recordMaybeInsert = function (e, t, n) {
      var i = e.getCursorPosition(),
        o = t.doc.getLine(i.row);
      this.isMaybeInsertedClosing(i, o) || (r.maybeInsertedBrackets = 0), r.maybeInsertedRow = i.row, r.maybeInsertedLineStart = o.substr(0, i.column) + n, r.maybeInsertedLineEnd = o.substr(i.column), r.maybeInsertedBrackets++;
    }, p.isAutoInsertedClosing = function (e, t, n) {
      return r.autoInsertedBrackets > 0 && e.row === r.autoInsertedRow && n === r.autoInsertedLineEnd[0] && t.substr(e.column) === r.autoInsertedLineEnd;
    }, p.isMaybeInsertedClosing = function (e, t) {
      return r.maybeInsertedBrackets > 0 && e.row === r.maybeInsertedRow && t.substr(e.column) === r.maybeInsertedLineEnd && t.substr(0, e.column) == r.maybeInsertedLineStart;
    }, p.popAutoInsertedClosing = function () {
      r.autoInsertedLineEnd = r.autoInsertedLineEnd.substr(1), r.autoInsertedBrackets--;
    }, p.clearMaybeInsertedClosing = function () {
      r && (r.maybeInsertedBrackets = 0, r.maybeInsertedRow = -1);
    }, i.inherits(p, o), t.CstyleBehaviour = p;
  }), ace.define("ace/unicode", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    for (var r = [48, 9, 8, 25, 5, 0, 2, 25, 48, 0, 11, 0, 5, 0, 6, 22, 2, 30, 2, 457, 5, 11, 15, 4, 8, 0, 2, 0, 18, 116, 2, 1, 3, 3, 9, 0, 2, 2, 2, 0, 2, 19, 2, 82, 2, 138, 2, 4, 3, 155, 12, 37, 3, 0, 8, 38, 10, 44, 2, 0, 2, 1, 2, 1, 2, 0, 9, 26, 6, 2, 30, 10, 7, 61, 2, 9, 5, 101, 2, 7, 3, 9, 2, 18, 3, 0, 17, 58, 3, 100, 15, 53, 5, 0, 6, 45, 211, 57, 3, 18, 2, 5, 3, 11, 3, 9, 2, 1, 7, 6, 2, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 0, 4, 3, 3, 8, 3, 1, 3, 3, 9, 0, 5, 1, 2, 4, 3, 11, 16, 2, 2, 5, 5, 1, 3, 21, 2, 6, 2, 1, 2, 1, 2, 1, 3, 0, 2, 4, 5, 1, 3, 2, 4, 0, 8, 3, 2, 0, 8, 15, 12, 2, 2, 8, 2, 2, 2, 21, 2, 6, 2, 1, 2, 4, 3, 9, 2, 2, 2, 2, 3, 0, 16, 3, 3, 9, 18, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 3, 8, 3, 1, 3, 2, 9, 1, 5, 1, 2, 4, 3, 9, 2, 0, 17, 1, 2, 5, 4, 2, 2, 3, 4, 1, 2, 0, 2, 1, 4, 1, 4, 2, 4, 11, 5, 4, 4, 2, 2, 3, 3, 0, 7, 0, 15, 9, 18, 2, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 4, 7, 2, 2, 2, 3, 8, 1, 2, 1, 7, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 3, 8, 2, 2, 2, 3, 8, 1, 8, 0, 2, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 15, 4, 7, 2, 2, 2, 3, 10, 0, 9, 3, 3, 9, 11, 5, 3, 1, 2, 17, 4, 23, 2, 8, 2, 0, 3, 6, 4, 0, 5, 5, 2, 0, 2, 7, 19, 1, 14, 57, 6, 14, 2, 9, 40, 1, 2, 0, 3, 1, 2, 0, 3, 0, 7, 3, 2, 6, 2, 2, 2, 0, 2, 0, 3, 1, 2, 12, 2, 2, 3, 4, 2, 0, 2, 5, 3, 9, 3, 1, 35, 0, 24, 1, 7, 9, 12, 0, 2, 0, 2, 0, 5, 9, 2, 35, 5, 19, 2, 5, 5, 7, 2, 35, 10, 0, 58, 73, 7, 77, 3, 37, 11, 42, 2, 0, 4, 328, 2, 3, 3, 6, 2, 0, 2, 3, 3, 40, 2, 3, 3, 32, 2, 3, 3, 6, 2, 0, 2, 3, 3, 14, 2, 56, 2, 3, 3, 66, 5, 0, 33, 15, 17, 84, 13, 619, 3, 16, 2, 25, 6, 74, 22, 12, 2, 6, 12, 20, 12, 19, 13, 12, 2, 2, 2, 1, 13, 51, 3, 29, 4, 0, 5, 1, 3, 9, 34, 2, 3, 9, 7, 87, 9, 42, 6, 69, 11, 28, 4, 11, 5, 11, 11, 39, 3, 4, 12, 43, 5, 25, 7, 10, 38, 27, 5, 62, 2, 28, 3, 10, 7, 9, 14, 0, 89, 75, 5, 9, 18, 8, 13, 42, 4, 11, 71, 55, 9, 9, 4, 48, 83, 2, 2, 30, 14, 230, 23, 280, 3, 5, 3, 37, 3, 5, 3, 7, 2, 0, 2, 0, 2, 0, 2, 30, 3, 52, 2, 6, 2, 0, 4, 2, 2, 6, 4, 3, 3, 5, 5, 12, 6, 2, 2, 6, 67, 1, 20, 0, 29, 0, 14, 0, 17, 4, 60, 12, 5, 0, 4, 11, 18, 0, 5, 0, 3, 9, 2, 0, 4, 4, 7, 0, 2, 0, 2, 0, 2, 3, 2, 10, 3, 3, 6, 4, 5, 0, 53, 1, 2684, 46, 2, 46, 2, 132, 7, 6, 15, 37, 11, 53, 10, 0, 17, 22, 10, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 31, 48, 0, 470, 1, 36, 5, 2, 4, 6, 1, 5, 85, 3, 1, 3, 2, 2, 89, 2, 3, 6, 40, 4, 93, 18, 23, 57, 15, 513, 6581, 75, 20939, 53, 1164, 68, 45, 3, 268, 4, 27, 21, 31, 3, 13, 13, 1, 2, 24, 9, 69, 11, 1, 38, 8, 3, 102, 3, 1, 111, 44, 25, 51, 13, 68, 12, 9, 7, 23, 4, 0, 5, 45, 3, 35, 13, 28, 4, 64, 15, 10, 39, 54, 10, 13, 3, 9, 7, 22, 4, 1, 5, 66, 25, 2, 227, 42, 2, 1, 3, 9, 7, 11171, 13, 22, 5, 48, 8453, 301, 3, 61, 3, 105, 39, 6, 13, 4, 6, 11, 2, 12, 2, 4, 2, 0, 2, 1, 2, 1, 2, 107, 34, 362, 19, 63, 3, 53, 41, 11, 5, 15, 17, 6, 13, 1, 25, 2, 33, 4, 2, 134, 20, 9, 8, 25, 5, 0, 2, 25, 12, 88, 4, 5, 3, 5, 3, 5, 3, 2], i = 0, o = [], a = 0; a < r.length; a += 2) o.push(i += r[a]), r[a + 1] && o.push(45, i += r[a + 1]);
    t.wordChars = String.fromCharCode.apply(null, o);
  }), ace.define("ace/mode/text", ["require", "exports", "module", "ace/config", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour/cstyle", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("../config"),
      i = e("../tokenizer").Tokenizer,
      o = e("./text_highlight_rules").TextHighlightRules,
      a = e("./behaviour/cstyle").CstyleBehaviour,
      s = e("../unicode"),
      l = e("../lib/lang"),
      c = e("../token_iterator").TokenIterator,
      u = e("../range").Range,
      h = function () {
        this.HighlightRules = o;
      };
    (function () {
      this.$defaultBehaviour = new a(), this.tokenRe = new RegExp("^[" + s.wordChars + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + s.wordChars + "\\$_]|\\s])+", "g"), this.getTokenizer = function () {
        return this.$tokenizer || (this.$highlightRules = this.$highlightRules || new this.HighlightRules(this.$highlightRuleConfig), this.$tokenizer = new i(this.$highlightRules.getRules())), this.$tokenizer;
      }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function (e, t, n, r) {
        var i = t.doc,
          o = !0,
          a = !0,
          s = 1 / 0,
          c = t.getTabSize(),
          u = !1;
        if (this.lineCommentStart) {
          if (Array.isArray(this.lineCommentStart)) m = this.lineCommentStart.map(l.escapeRegExp).join("|"), d = this.lineCommentStart[0];else m = l.escapeRegExp(this.lineCommentStart), d = this.lineCommentStart;
          m = new RegExp("^(\\s*)(?:" + m + ") ?"), u = t.getUseSoftTabs();
          y = function (e, t) {
            var n = e.match(m);
            if (n) {
              var r = n[1].length,
                o = n[0].length;
              f(e, r, o) || " " != n[0][o - 1] || o--, i.removeInLine(t, r, o);
            }
          };
          var h = d + " ",
            f = (v = function (e, t) {
              o && !/\S/.test(e) || (f(e, s, s) ? i.insertInLine({
                row: t,
                column: s
              }, h) : i.insertInLine({
                row: t,
                column: s
              }, d));
            }, b = function (e, t) {
              return m.test(e);
            }, function (e, t, n) {
              var r = 0;
              while (t-- && " " == e.charAt(t)) r++;
              if (r % c != 0) return !1;
              r = 0;
              while (" " == e.charAt(n++)) r++;
              return c > 2 ? r % c != c - 1 : r % c == 0;
            });
        } else {
          if (!this.blockComment) return !1;
          var d = this.blockComment.start,
            p = this.blockComment.end,
            m = new RegExp("^(\\s*)(?:" + l.escapeRegExp(d) + ")"),
            g = new RegExp("(?:" + l.escapeRegExp(p) + ")\\s*$"),
            v = function (e, t) {
              b(e, t) || o && !/\S/.test(e) || (i.insertInLine({
                row: t,
                column: e.length
              }, p), i.insertInLine({
                row: t,
                column: s
              }, d));
            },
            y = function (e, t) {
              var n;
              (n = e.match(g)) && i.removeInLine(t, e.length - n[0].length, e.length), (n = e.match(m)) && i.removeInLine(t, n[1].length, n[0].length);
            },
            b = function (e, n) {
              if (m.test(e)) return !0;
              for (var r = t.getTokens(n), i = 0; i < r.length; i++) if ("comment" === r[i].type) return !0;
            };
        }
        function w(e) {
          for (var t = n; t <= r; t++) e(i.getLine(t), t);
        }
        var x = 1 / 0;
        w(function (e, t) {
          var n = e.search(/\S/);
          -1 !== n ? (n < s && (s = n), a && !b(e, t) && (a = !1)) : x > e.length && (x = e.length);
        }), s == 1 / 0 && (s = x, o = !1, a = !1), u && s % c != 0 && (s = Math.floor(s / c) * c), w(a ? y : v);
      }, this.toggleBlockComment = function (e, t, n, r) {
        var i = this.blockComment;
        if (i) {
          !i.start && i[0] && (i = i[0]);
          var o,
            a,
            s = new c(t, r.row, r.column),
            l = s.getCurrentToken(),
            h = (t.selection, t.selection.toOrientedRange());
          if (l && /comment/.test(l.type)) {
            var f, d;
            while (l && /comment/.test(l.type)) {
              var p = l.value.indexOf(i.start);
              if (-1 != p) {
                var m = s.getCurrentTokenRow(),
                  g = s.getCurrentTokenColumn() + p;
                f = new u(m, g, m, g + i.start.length);
                break;
              }
              l = s.stepBackward();
            }
            s = new c(t, r.row, r.column), l = s.getCurrentToken();
            while (l && /comment/.test(l.type)) {
              p = l.value.indexOf(i.end);
              if (-1 != p) {
                m = s.getCurrentTokenRow(), g = s.getCurrentTokenColumn() + p;
                d = new u(m, g, m, g + i.end.length);
                break;
              }
              l = s.stepForward();
            }
            d && t.remove(d), f && (t.remove(f), o = f.start.row, a = -i.start.length);
          } else a = i.start.length, o = n.start.row, t.insert(n.end, i.end), t.insert(n.start, i.start);
          h.start.row == o && (h.start.column += a), h.end.row == o && (h.end.column += a), t.selection.fromOrientedRange(h);
        }
      }, this.getNextLineIndent = function (e, t, n) {
        return this.$getIndent(t);
      }, this.checkOutdent = function (e, t, n) {
        return !1;
      }, this.autoOutdent = function (e, t, n) {}, this.$getIndent = function (e) {
        return e.match(/^\s*/)[0];
      }, this.createWorker = function (e) {
        return null;
      }, this.createModeDelegates = function (e) {
        for (var t in this.$embeds = [], this.$modes = {}, e) if (e[t]) {
          var n = e[t],
            i = n.prototype.$id,
            o = r.$modes[i];
          o || (r.$modes[i] = o = new n()), r.$modes[t] || (r.$modes[t] = o), this.$embeds.push(t), this.$modes[t] = o;
        }
        var a = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"];
        for (t = 0; t < a.length; t++) (function (e) {
          var n = a[t],
            r = e[n];
          e[a[t]] = function () {
            return this.$delegator(n, arguments, r);
          };
        })(this);
      }, this.$delegator = function (e, t, n) {
        var r = t[0] || "start";
        if ("string" != typeof r) {
          if (Array.isArray(r[2])) {
            var i = r[2][r[2].length - 1],
              o = this.$modes[i];
            if (o) return o[e].apply(o, [r[1]].concat([].slice.call(t, 1)));
          }
          r = r[0] || "start";
        }
        for (var a = 0; a < this.$embeds.length; a++) if (this.$modes[this.$embeds[a]]) {
          var s = r.split(this.$embeds[a]);
          if (!s[0] && s[1]) {
            t[0] = s[1];
            o = this.$modes[this.$embeds[a]];
            return o[e].apply(o, t);
          }
        }
        var l = n.apply(this, t);
        return n ? l : void 0;
      }, this.transformAction = function (e, t, n, r, i) {
        if (this.$behaviour) {
          var o = this.$behaviour.getBehaviours();
          for (var a in o) if (o[a][t]) {
            var s = o[a][t].apply(this, arguments);
            if (s) return s;
          }
        }
      }, this.getKeywords = function (e) {
        if (!this.completionKeywords) {
          var t = this.$tokenizer.rules,
            n = [];
          for (var r in t) for (var i = t[r], o = 0, a = i.length; o < a; o++) if ("string" === typeof i[o].token) /keyword|support|storage/.test(i[o].token) && n.push(i[o].regex);else if ("object" === typeof i[o].token) for (var s = 0, l = i[o].token.length; s < l; s++) if (/keyword|support|storage/.test(i[o].token[s])) {
            r = i[o].regex.match(/\(.+?\)/g)[s];
            n.push(r.substr(1, r.length - 2));
          }
          this.completionKeywords = n;
        }
        return e ? n.concat(this.$keywordList || []) : this.$keywordList;
      }, this.$createKeywordList = function () {
        return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || [];
      }, this.getCompletions = function (e, t, n, r) {
        var i = this.$keywordList || this.$createKeywordList();
        return i.map(function (e) {
          return {
            name: e,
            value: e,
            score: 0,
            meta: "keyword"
          };
        });
      }, this.$id = "ace/mode/text";
    }).call(h.prototype), t.Mode = h;
  }), ace.define("ace/apply_delta", ["require", "exports", "module"], function (e, t, n) {
    "use strict";

    t.applyDelta = function (e, t, n) {
      var r = t.start.row,
        i = t.start.column,
        o = e[r] || "";
      switch (t.action) {
        case "insert":
          var a = t.lines;
          if (1 === a.length) e[r] = o.substring(0, i) + t.lines[0] + o.substring(i);else {
            var s = [r, 1].concat(t.lines);
            e.splice.apply(e, s), e[r] = o.substring(0, i) + e[r], e[r + t.lines.length - 1] += o.substring(i);
          }
          break;
        case "remove":
          var l = t.end.column,
            c = t.end.row;
          r === c ? e[r] = o.substring(0, i) + o.substring(l) : e.splice(r, c - r + 1, o.substring(0, i) + e[c].substring(l));
          break;
      }
    };
  }), ace.define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./lib/event_emitter").EventEmitter,
      o = t.Anchor = function (e, t, n) {
        this.$onChange = this.onChange.bind(this), this.attach(e), "undefined" == typeof n ? this.setPosition(t.row, t.column) : this.setPosition(t, n);
      };
    (function () {
      function e(e, t, n) {
        var r = n ? e.column <= t.column : e.column < t.column;
        return e.row < t.row || e.row == t.row && r;
      }
      function t(t, n, r) {
        var i = "insert" == t.action,
          o = (i ? 1 : -1) * (t.end.row - t.start.row),
          a = (i ? 1 : -1) * (t.end.column - t.start.column),
          s = t.start,
          l = i ? s : t.end;
        return e(n, s, r) ? {
          row: n.row,
          column: n.column
        } : e(l, n, !r) ? {
          row: n.row + o,
          column: n.column + (n.row == l.row ? a : 0)
        } : {
          row: s.row,
          column: s.column
        };
      }
      r.implement(this, i), this.getPosition = function () {
        return this.$clipPositionToDocument(this.row, this.column);
      }, this.getDocument = function () {
        return this.document;
      }, this.$insertRight = !1, this.onChange = function (e) {
        if ((e.start.row != e.end.row || e.start.row == this.row) && !(e.start.row > this.row)) {
          var n = t(e, {
            row: this.row,
            column: this.column
          }, this.$insertRight);
          this.setPosition(n.row, n.column, !0);
        }
      }, this.setPosition = function (e, t, n) {
        var r;
        if (r = n ? {
          row: e,
          column: t
        } : this.$clipPositionToDocument(e, t), this.row != r.row || this.column != r.column) {
          var i = {
            row: this.row,
            column: this.column
          };
          this.row = r.row, this.column = r.column, this._signal("change", {
            old: i,
            value: r
          });
        }
      }, this.detach = function () {
        this.document.off("change", this.$onChange);
      }, this.attach = function (e) {
        this.document = e || this.document, this.document.on("change", this.$onChange);
      }, this.$clipPositionToDocument = function (e, t) {
        var n = {};
        return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : e < 0 ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), t < 0 && (n.column = 0), n;
      };
    }).call(o.prototype);
  }), ace.define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/apply_delta", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./apply_delta").applyDelta,
      o = e("./lib/event_emitter").EventEmitter,
      a = e("./range").Range,
      s = e("./anchor").Anchor,
      l = function (e) {
        this.$lines = [""], 0 === e.length ? this.$lines = [""] : Array.isArray(e) ? this.insertMergedLines({
          row: 0,
          column: 0
        }, e) : this.insert({
          row: 0,
          column: 0
        }, e);
      };
    (function () {
      r.implement(this, o), this.setValue = function (e) {
        var t = this.getLength() - 1;
        this.remove(new a(0, 0, t, this.getLine(t).length)), this.insert({
          row: 0,
          column: 0
        }, e || "");
      }, this.getValue = function () {
        return this.getAllLines().join(this.getNewLineCharacter());
      }, this.createAnchor = function (e, t) {
        return new s(this, e, t);
      }, 0 === "aaa".split(/a/).length ? this.$split = function (e) {
        return e.replace(/\r\n|\r/g, "\n").split("\n");
      } : this.$split = function (e) {
        return e.split(/\r\n|\r|\n/);
      }, this.$detectNewLine = function (e) {
        var t = e.match(/^.*?(\r\n|\r|\n)/m);
        this.$autoNewLine = t ? t[1] : "\n", this._signal("changeNewLineMode");
      }, this.getNewLineCharacter = function () {
        switch (this.$newLineMode) {
          case "windows":
            return "\r\n";
          case "unix":
            return "\n";
          default:
            return this.$autoNewLine || "\n";
        }
      }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function (e) {
        this.$newLineMode !== e && (this.$newLineMode = e, this._signal("changeNewLineMode"));
      }, this.getNewLineMode = function () {
        return this.$newLineMode;
      }, this.isNewLine = function (e) {
        return "\r\n" == e || "\r" == e || "\n" == e;
      }, this.getLine = function (e) {
        return this.$lines[e] || "";
      }, this.getLines = function (e, t) {
        return this.$lines.slice(e, t + 1);
      }, this.getAllLines = function () {
        return this.getLines(0, this.getLength());
      }, this.getLength = function () {
        return this.$lines.length;
      }, this.getTextRange = function (e) {
        return this.getLinesForRange(e).join(this.getNewLineCharacter());
      }, this.getLinesForRange = function (e) {
        var t;
        if (e.start.row === e.end.row) t = [this.getLine(e.start.row).substring(e.start.column, e.end.column)];else {
          t = this.getLines(e.start.row, e.end.row), t[0] = (t[0] || "").substring(e.start.column);
          var n = t.length - 1;
          e.end.row - e.start.row == n && (t[n] = t[n].substring(0, e.end.column));
        }
        return t;
      }, this.insertLines = function (e, t) {
        return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e, t);
      }, this.removeLines = function (e, t) {
        return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e, t);
      }, this.insertNewLine = function (e) {
        return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e, ["", ""]);
      }, this.insert = function (e, t) {
        return this.getLength() <= 1 && this.$detectNewLine(t), this.insertMergedLines(e, this.$split(t));
      }, this.insertInLine = function (e, t) {
        var n = this.clippedPos(e.row, e.column),
          r = this.pos(e.row, e.column + t.length);
        return this.applyDelta({
          start: n,
          end: r,
          action: "insert",
          lines: [t]
        }, !0), this.clonePos(r);
      }, this.clippedPos = function (e, t) {
        var n = this.getLength();
        void 0 === e ? e = n : e < 0 ? e = 0 : e >= n && (e = n - 1, t = void 0);
        var r = this.getLine(e);
        return void 0 == t && (t = r.length), t = Math.min(Math.max(t, 0), r.length), {
          row: e,
          column: t
        };
      }, this.clonePos = function (e) {
        return {
          row: e.row,
          column: e.column
        };
      }, this.pos = function (e, t) {
        return {
          row: e,
          column: t
        };
      }, this.$clipPosition = function (e) {
        var t = this.getLength();
        return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : (e.row = Math.max(0, e.row), e.column = Math.min(Math.max(e.column, 0), this.getLine(e.row).length)), e;
      }, this.insertFullLines = function (e, t) {
        e = Math.min(Math.max(e, 0), this.getLength());
        var n = 0;
        e < this.getLength() ? (t = t.concat([""]), n = 0) : (t = [""].concat(t), e--, n = this.$lines[e].length), this.insertMergedLines({
          row: e,
          column: n
        }, t);
      }, this.insertMergedLines = function (e, t) {
        var n = this.clippedPos(e.row, e.column),
          r = {
            row: n.row + t.length - 1,
            column: (1 == t.length ? n.column : 0) + t[t.length - 1].length
          };
        return this.applyDelta({
          start: n,
          end: r,
          action: "insert",
          lines: t
        }), this.clonePos(r);
      }, this.remove = function (e) {
        var t = this.clippedPos(e.start.row, e.start.column),
          n = this.clippedPos(e.end.row, e.end.column);
        return this.applyDelta({
          start: t,
          end: n,
          action: "remove",
          lines: this.getLinesForRange({
            start: t,
            end: n
          })
        }), this.clonePos(t);
      }, this.removeInLine = function (e, t, n) {
        var r = this.clippedPos(e, t),
          i = this.clippedPos(e, n);
        return this.applyDelta({
          start: r,
          end: i,
          action: "remove",
          lines: this.getLinesForRange({
            start: r,
            end: i
          })
        }, !0), this.clonePos(r);
      }, this.removeFullLines = function (e, t) {
        e = Math.min(Math.max(0, e), this.getLength() - 1), t = Math.min(Math.max(0, t), this.getLength() - 1);
        var n = t == this.getLength() - 1 && e > 0,
          r = t < this.getLength() - 1,
          i = n ? e - 1 : e,
          o = n ? this.getLine(i).length : 0,
          s = r ? t + 1 : t,
          l = r ? 0 : this.getLine(s).length,
          c = new a(i, o, s, l),
          u = this.$lines.slice(e, t + 1);
        return this.applyDelta({
          start: c.start,
          end: c.end,
          action: "remove",
          lines: this.getLinesForRange(c)
        }), u;
      }, this.removeNewLine = function (e) {
        e < this.getLength() - 1 && e >= 0 && this.applyDelta({
          start: this.pos(e, this.getLine(e).length),
          end: this.pos(e + 1, 0),
          action: "remove",
          lines: ["", ""]
        });
      }, this.replace = function (e, t) {
        return e instanceof a || (e = a.fromPoints(e.start, e.end)), 0 === t.length && e.isEmpty() ? e.start : t == this.getTextRange(e) ? e.end : (this.remove(e), n = t ? this.insert(e.start, t) : e.start, n);
        var n;
      }, this.applyDeltas = function (e) {
        for (var t = 0; t < e.length; t++) this.applyDelta(e[t]);
      }, this.revertDeltas = function (e) {
        for (var t = e.length - 1; t >= 0; t--) this.revertDelta(e[t]);
      }, this.applyDelta = function (e, t) {
        var n = "insert" == e.action;
        (n ? e.lines.length <= 1 && !e.lines[0] : !a.comparePoints(e.start, e.end)) || (n && e.lines.length > 2e4 ? this.$splitAndapplyLargeDelta(e, 2e4) : (i(this.$lines, e, t), this._signal("change", e)));
      }, this.$safeApplyDelta = function (e) {
        var t = this.$lines.length;
        ("remove" == e.action && e.start.row < t && e.end.row < t || "insert" == e.action && e.start.row <= t) && this.applyDelta(e);
      }, this.$splitAndapplyLargeDelta = function (e, t) {
        for (var n = e.lines, r = n.length - t + 1, i = e.start.row, o = e.start.column, a = 0, s = 0; a < r; a = s) {
          s += t - 1;
          var l = n.slice(a, s);
          l.push(""), this.applyDelta({
            start: this.pos(i + a, o),
            end: this.pos(i + s, o = 0),
            action: e.action,
            lines: l
          }, !0);
        }
        e.lines = n.slice(a), e.start.row = i + a, e.start.column = o, this.applyDelta(e, !0);
      }, this.revertDelta = function (e) {
        this.$safeApplyDelta({
          start: this.clonePos(e.start),
          end: this.clonePos(e.end),
          action: "insert" == e.action ? "remove" : "insert",
          lines: e.lines.slice()
        });
      }, this.indexToPosition = function (e, t) {
        for (var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length, i = t || 0, o = n.length; i < o; i++) if (e -= n[i].length + r, e < 0) return {
          row: i,
          column: e + n[i].length + r
        };
        return {
          row: o - 1,
          column: e + n[o - 1].length + r
        };
      }, this.positionToIndex = function (e, t) {
        for (var n = this.$lines || this.getAllLines(), r = this.getNewLineCharacter().length, i = 0, o = Math.min(e.row, n.length), a = t || 0; a < o; ++a) i += n[a].length + r;
        return i + e.column;
      };
    }).call(l.prototype), t.Document = l;
  }), ace.define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./lib/event_emitter").EventEmitter,
      o = function (e, t) {
        this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
        var n = this;
        this.$worker = function () {
          if (n.running) {
            var e = new Date(),
              t = n.currentLine,
              r = -1,
              i = n.doc,
              o = t;
            while (n.lines[t]) t++;
            var a = i.getLength(),
              s = 0;
            n.running = !1;
            while (t < a) {
              n.$tokenizeRow(t), r = t;
              do {
                t++;
              } while (n.lines[t]);
              if (s++, s % 5 === 0 && new Date() - e > 20) {
                n.running = setTimeout(n.$worker, 20);
                break;
              }
            }
            n.currentLine = t, -1 == r && (r = t), o <= r && n.fireUpdateEvent(o, r);
          }
        };
      };
    (function () {
      r.implement(this, i), this.setTokenizer = function (e) {
        this.tokenizer = e, this.lines = [], this.states = [], this.start(0);
      }, this.setDocument = function (e) {
        this.doc = e, this.lines = [], this.states = [], this.stop();
      }, this.fireUpdateEvent = function (e, t) {
        var n = {
          first: e,
          last: t
        };
        this._signal("update", {
          data: n
        });
      }, this.start = function (e) {
        this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700);
      }, this.scheduleStart = function () {
        this.running || (this.running = setTimeout(this.$worker, 700));
      }, this.$updateOnChange = function (e) {
        var t = e.start.row,
          n = e.end.row - t;
        if (0 === n) this.lines[t] = null;else if ("remove" == e.action) this.lines.splice(t, n + 1, null), this.states.splice(t, n + 1, null);else {
          var r = Array(n + 1);
          r.unshift(t, 1), this.lines.splice.apply(this.lines, r), this.states.splice.apply(this.states, r);
        }
        this.currentLine = Math.min(t, this.currentLine, this.doc.getLength()), this.stop();
      }, this.stop = function () {
        this.running && clearTimeout(this.running), this.running = !1;
      }, this.getTokens = function (e) {
        return this.lines[e] || this.$tokenizeRow(e);
      }, this.getState = function (e) {
        return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start";
      }, this.$tokenizeRow = function (e) {
        var t = this.doc.getLine(e),
          n = this.states[e - 1],
          r = this.tokenizer.getLineTokens(t, n, e);
        return this.states[e] + "" !== r.state + "" ? (this.states[e] = r.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = r.tokens;
      }, this.cleanup = function () {
        this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.removeAllListeners();
      };
    }).call(o.prototype), t.BackgroundTokenizer = o;
  }), ace.define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("./lib/lang"),
      i = (e("./lib/oop"), e("./range").Range),
      o = function (e, t, n) {
        this.setRegexp(e), this.clazz = t, this.type = n || "text";
      };
    (function () {
      this.MAX_RANGES = 500, this.setRegexp = function (e) {
        this.regExp + "" != e + "" && (this.regExp = e, this.cache = []);
      }, this.update = function (e, t, n, o) {
        if (this.regExp) for (var a = o.firstRow, s = o.lastRow, l = {}, c = a; c <= s; c++) {
          var u = this.cache[c];
          null == u && (u = r.getMatchOffsets(n.getLine(c), this.regExp), u.length > this.MAX_RANGES && (u = u.slice(0, this.MAX_RANGES)), u = u.map(function (e) {
            return new i(c, e.offset, c, e.offset + e.length);
          }), this.cache[c] = u.length ? u : "");
          for (var h = u.length; h--;) {
            var f = u[h].toScreenRange(n),
              d = f.toString();
            l[d] || (l[d] = !0, t.drawSingleLineMarker(e, f, this.clazz, o));
          }
        }
      };
    }).call(o.prototype), t.SearchHighlight = o;
  }), ace.define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("../range").Range;
    function i(e, t) {
      this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
      var n = t[t.length - 1];
      this.range = new r(t[0].start.row, t[0].start.column, n.end.row, n.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function (e) {
        e.setFoldLine(this);
      }, this);
    }
    (function () {
      this.shiftRow = function (e) {
        this.start.row += e, this.end.row += e, this.folds.forEach(function (t) {
          t.start.row += e, t.end.row += e;
        });
      }, this.addFold = function (e) {
        if (e.sameRow) {
          if (e.start.row < this.startRow || e.endRow > this.endRow) throw new Error("Can't add a fold to this FoldLine as it has no connection");
          this.folds.push(e), this.folds.sort(function (e, t) {
            return -e.range.compareEnd(t.start.row, t.start.column);
          }), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column);
        } else if (e.start.row == this.end.row) this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column;else {
          if (e.end.row != this.start.row) throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
          this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column;
        }
        e.foldLine = this;
      }, this.containsRow = function (e) {
        return e >= this.start.row && e <= this.end.row;
      }, this.walk = function (e, t, n) {
        var r,
          i,
          o,
          a = 0,
          s = this.folds,
          l = !0;
        null == t && (t = this.end.row, n = this.end.column);
        for (var c = 0; c < s.length; c++) {
          if (r = s[c], i = r.range.compareStart(t, n), -1 == i) return void e(null, t, n, a, l);
          if (o = e(null, r.start.row, r.start.column, a, l), o = !o && e(r.placeholder, r.start.row, r.start.column, a), o || 0 === i) return;
          l = !r.sameRow, a = r.end.column;
        }
        e(null, t, n, a, l);
      }, this.getNextFoldTo = function (e, t) {
        for (var n, r, i = 0; i < this.folds.length; i++) {
          if (n = this.folds[i], r = n.range.compareEnd(e, t), -1 == r) return {
            fold: n,
            kind: "after"
          };
          if (0 === r) return {
            fold: n,
            kind: "inside"
          };
        }
        return null;
      }, this.addRemoveChars = function (e, t, n) {
        var r,
          i,
          o = this.getNextFoldTo(e, t);
        if (o) if (r = o.fold, "inside" == o.kind && r.start.column != t && r.start.row != e) window.console && window.console.log(e, t, r);else if (r.start.row == e) {
          i = this.folds;
          var a = i.indexOf(r);
          for (0 === a && (this.start.column += n), a; a < i.length; a++) {
            if (r = i[a], r.start.column += n, !r.sameRow) return;
            r.end.column += n;
          }
          this.end.column += n;
        }
      }, this.split = function (e, t) {
        var n = this.getNextFoldTo(e, t);
        if (!n || "inside" == n.kind) return null;
        var r = n.fold,
          o = this.folds,
          a = this.foldData,
          s = o.indexOf(r),
          l = o[s - 1];
        this.end.row = l.end.row, this.end.column = l.end.column, o = o.splice(s, o.length - s);
        var c = new i(a, o);
        return a.splice(a.indexOf(this) + 1, 0, c), c;
      }, this.merge = function (e) {
        for (var t = e.folds, n = 0; n < t.length; n++) this.addFold(t[n]);
        var r = this.foldData;
        r.splice(r.indexOf(e), 1);
      }, this.toString = function () {
        var e = [this.range.toString() + ": ["];
        return this.folds.forEach(function (t) {
          e.push("  " + t.toString());
        }), e.push("]"), e.join("\n");
      }, this.idxToPosition = function (e) {
        for (var t = 0, n = 0; n < this.folds.length; n++) {
          var r = this.folds[n];
          if (e -= r.start.column - t, e < 0) return {
            row: r.start.row,
            column: r.start.column + e
          };
          if (e -= r.placeholder.length, e < 0) return r.start;
          t = r.end.column;
        }
        return {
          row: this.end.row,
          column: this.end.column + e
        };
      };
    }).call(i.prototype), t.FoldLine = i;
  }), ace.define("ace/range_list", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("./range").Range,
      i = r.comparePoints,
      o = function () {
        this.ranges = [], this.$bias = 1;
      };
    (function () {
      this.comparePoints = i, this.pointIndex = function (e, t, n) {
        for (var r = this.ranges, o = n || 0; o < r.length; o++) {
          var a = r[o],
            s = i(e, a.end);
          if (!(s > 0)) {
            var l = i(e, a.start);
            return 0 === s ? t && 0 !== l ? -o - 2 : o : l > 0 || 0 === l && !t ? o : -o - 1;
          }
        }
        return -o - 1;
      }, this.add = function (e) {
        var t = !e.isEmpty(),
          n = this.pointIndex(e.start, t);
        n < 0 && (n = -n - 1);
        var r = this.pointIndex(e.end, t, n);
        return r < 0 ? r = -r - 1 : r++, this.ranges.splice(n, r - n, e);
      }, this.addList = function (e) {
        for (var t = [], n = e.length; n--;) t.push.apply(t, this.add(e[n]));
        return t;
      }, this.substractPoint = function (e) {
        var t = this.pointIndex(e);
        if (t >= 0) return this.ranges.splice(t, 1);
      }, this.merge = function () {
        var e = [],
          t = this.ranges;
        t = t.sort(function (e, t) {
          return i(e.start, t.start);
        });
        for (var n, r = t[0], o = 1; o < t.length; o++) {
          n = r, r = t[o];
          var a = i(n.end, r.start);
          a < 0 || (0 != a || n.isEmpty() || r.isEmpty()) && (i(n.end, r.end) < 0 && (n.end.row = r.end.row, n.end.column = r.end.column), t.splice(o, 1), e.push(r), r = n, o--);
        }
        return this.ranges = t, e;
      }, this.contains = function (e, t) {
        return this.pointIndex({
          row: e,
          column: t
        }) >= 0;
      }, this.containsPoint = function (e) {
        return this.pointIndex(e) >= 0;
      }, this.rangeAtPoint = function (e) {
        var t = this.pointIndex(e);
        if (t >= 0) return this.ranges[t];
      }, this.clipRows = function (e, t) {
        var n = this.ranges;
        if (n[0].start.row > t || n[n.length - 1].start.row < e) return [];
        var r = this.pointIndex({
          row: e,
          column: 0
        });
        r < 0 && (r = -r - 1);
        var i = this.pointIndex({
          row: t,
          column: 0
        }, r);
        i < 0 && (i = -i - 1);
        for (var o = [], a = r; a < i; a++) o.push(n[a]);
        return o;
      }, this.removeAll = function () {
        return this.ranges.splice(0, this.ranges.length);
      }, this.attach = function (e) {
        this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange);
      }, this.detach = function () {
        this.session && (this.session.removeListener("change", this.onChange), this.session = null);
      }, this.$onChange = function (e) {
        for (var t = e.start, n = e.end, r = t.row, i = n.row, o = this.ranges, a = 0, s = o.length; a < s; a++) {
          var l = o[a];
          if (l.end.row >= r) break;
        }
        if ("insert" == e.action) for (var c = i - r, u = -t.column + n.column; a < s; a++) {
          l = o[a];
          if (l.start.row > r) break;
          if (l.start.row == r && l.start.column >= t.column && (l.start.column == t.column && this.$bias <= 0 || (l.start.column += u, l.start.row += c)), l.end.row == r && l.end.column >= t.column) {
            if (l.end.column == t.column && this.$bias < 0) continue;
            l.end.column == t.column && u > 0 && a < s - 1 && l.end.column > l.start.column && l.end.column == o[a + 1].start.column && (l.end.column -= u), l.end.column += u, l.end.row += c;
          }
        } else for (c = r - i, u = t.column - n.column; a < s; a++) {
          l = o[a];
          if (l.start.row > i) break;
          l.end.row < i && (r < l.end.row || r == l.end.row && t.column < l.end.column) ? (l.end.row = r, l.end.column = t.column) : l.end.row == i ? l.end.column <= n.column ? (c || l.end.column > t.column) && (l.end.column = t.column, l.end.row = t.row) : (l.end.column += u, l.end.row += c) : l.end.row > i && (l.end.row += c), l.start.row < i && (r < l.start.row || r == l.start.row && t.column < l.start.column) ? (l.start.row = r, l.start.column = t.column) : l.start.row == i ? l.start.column <= n.column ? (c || l.start.column > t.column) && (l.start.column = t.column, l.start.row = t.row) : (l.start.column += u, l.start.row += c) : l.start.row > i && (l.start.row += c);
        }
        if (0 != c && a < s) for (; a < s; a++) {
          l = o[a];
          l.start.row += c, l.end.row += c;
        }
      };
    }).call(o.prototype), t.RangeList = o;
  }), ace.define("ace/edit_session/fold", ["require", "exports", "module", "ace/range_list", "ace/lib/oop"], function (e, t, n) {
    "use strict";

    var r = e("../range_list").RangeList,
      i = e("../lib/oop"),
      o = t.Fold = function (e, t) {
        this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = [];
      };
    function a(e, t) {
      e.row -= t.row, 0 == e.row && (e.column -= t.column);
    }
    function s(e, t) {
      a(e.start, t), a(e.end, t);
    }
    function l(e, t) {
      0 == e.row && (e.column += t.column), e.row += t.row;
    }
    function c(e, t) {
      l(e.start, t), l(e.end, t);
    }
    i.inherits(o, r), function () {
      this.toString = function () {
        return '"' + this.placeholder + '" ' + this.range.toString();
      }, this.setFoldLine = function (e) {
        this.foldLine = e, this.subFolds.forEach(function (t) {
          t.setFoldLine(e);
        });
      }, this.clone = function () {
        var e = this.range.clone(),
          t = new o(e, this.placeholder);
        return this.subFolds.forEach(function (e) {
          t.subFolds.push(e.clone());
        }), t.collapseChildren = this.collapseChildren, t;
      }, this.addSubFold = function (e) {
        if (!this.range.isEqual(e)) {
          s(e, this.start);
          for (var t = e.start.row, n = e.start.column, r = 0, i = -1; r < this.subFolds.length; r++) if (i = this.subFolds[r].range.compare(t, n), 1 != i) break;
          var o = this.subFolds[r],
            a = 0;
          if (0 == i) {
            if (o.range.containsRange(e)) return o.addSubFold(e);
            a = 1;
          }
          t = e.range.end.row, n = e.range.end.column;
          var l = r;
          for (i = -1; l < this.subFolds.length; l++) if (i = this.subFolds[l].range.compare(t, n), 1 != i) break;
          0 == i && l++;
          for (var c = this.subFolds.splice(r, l - r, e), u = 0 == i ? c.length - 1 : c.length, h = a; h < u; h++) e.addSubFold(c[h]);
          return e.setFoldLine(this.foldLine), e;
        }
      }, this.restoreRange = function (e) {
        return c(e, this.start);
      };
    }.call(o.prototype);
  }), ace.define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function (e, t, n) {
    "use strict";

    var r = e("../range").Range,
      i = e("./fold_line").FoldLine,
      o = e("./fold").Fold,
      a = e("../token_iterator").TokenIterator;
    function s() {
      this.getFoldAt = function (e, t, n) {
        var r = this.getFoldLine(e);
        if (!r) return null;
        for (var i = r.folds, o = 0; o < i.length; o++) {
          var a = i[o].range;
          if (a.contains(e, t)) {
            if (1 == n && a.isEnd(e, t) && !a.isEmpty()) continue;
            if (-1 == n && a.isStart(e, t) && !a.isEmpty()) continue;
            return i[o];
          }
        }
      }, this.getFoldsInRange = function (e) {
        var t = e.start,
          n = e.end,
          r = this.$foldData,
          i = [];
        t.column += 1, n.column -= 1;
        for (var o = 0; o < r.length; o++) {
          var a = r[o].range.compareRange(e);
          if (2 != a) {
            if (-2 == a) break;
            for (var s = r[o].folds, l = 0; l < s.length; l++) {
              var c = s[l];
              if (a = c.range.compareRange(e), -2 == a) break;
              if (2 != a) {
                if (42 == a) break;
                i.push(c);
              }
            }
          }
        }
        return t.column -= 1, n.column += 1, i;
      }, this.getFoldsInRangeList = function (e) {
        if (Array.isArray(e)) {
          var t = [];
          e.forEach(function (e) {
            t = t.concat(this.getFoldsInRange(e));
          }, this);
        } else t = this.getFoldsInRange(e);
        return t;
      }, this.getAllFolds = function () {
        for (var e = [], t = this.$foldData, n = 0; n < t.length; n++) for (var r = 0; r < t[n].folds.length; r++) e.push(t[n].folds[r]);
        return e;
      }, this.getFoldStringAt = function (e, t, n, r) {
        if (r = r || this.getFoldLine(e), !r) return null;
        for (var i, o, a = {
            end: {
              column: 0
            }
          }, s = 0; s < r.folds.length; s++) {
          o = r.folds[s];
          var l = o.range.compareEnd(e, t);
          if (-1 == l) {
            i = this.getLine(o.start.row).substring(a.end.column, o.start.column);
            break;
          }
          if (0 === l) return null;
          a = o;
        }
        return i || (i = this.getLine(o.start.row).substring(a.end.column)), -1 == n ? i.substring(0, t - a.end.column) : 1 == n ? i.substring(t - a.end.column) : i;
      }, this.getFoldLine = function (e, t) {
        var n = this.$foldData,
          r = 0;
        for (t && (r = n.indexOf(t)), -1 == r && (r = 0), r; r < n.length; r++) {
          var i = n[r];
          if (i.start.row <= e && i.end.row >= e) return i;
          if (i.end.row > e) return null;
        }
        return null;
      }, this.getNextFoldLine = function (e, t) {
        var n = this.$foldData,
          r = 0;
        for (t && (r = n.indexOf(t)), -1 == r && (r = 0), r; r < n.length; r++) {
          var i = n[r];
          if (i.end.row >= e) return i;
        }
        return null;
      }, this.getFoldedRowCount = function (e, t) {
        for (var n = this.$foldData, r = t - e + 1, i = 0; i < n.length; i++) {
          var o = n[i],
            a = o.end.row,
            s = o.start.row;
          if (a >= t) {
            s < t && (s >= e ? r -= t - s : r = 0);
            break;
          }
          a >= e && (r -= s >= e ? a - s : a - e + 1);
        }
        return r;
      }, this.$addFoldLine = function (e) {
        return this.$foldData.push(e), this.$foldData.sort(function (e, t) {
          return e.start.row - t.start.row;
        }), e;
      }, this.addFold = function (e, t) {
        var n,
          r = this.$foldData,
          a = !1;
        e instanceof o ? n = e : (n = new o(t, e), n.collapseChildren = t.collapseChildren), this.$clipRangeToDocument(n.range);
        var s = n.start.row,
          l = n.start.column,
          c = n.end.row,
          u = n.end.column,
          h = this.getFoldAt(s, l, 1),
          f = this.getFoldAt(c, u, -1);
        if (h && f == h) return h.addSubFold(n);
        h && !h.range.isStart(s, l) && this.removeFold(h), f && !f.range.isEnd(c, u) && this.removeFold(f);
        var d = this.getFoldsInRange(n.range);
        d.length > 0 && (this.removeFolds(d), n.collapseChildren || d.forEach(function (e) {
          n.addSubFold(e);
        }));
        for (var p = 0; p < r.length; p++) {
          var m = r[p];
          if (c == m.start.row) {
            m.addFold(n), a = !0;
            break;
          }
          if (s == m.end.row) {
            if (m.addFold(n), a = !0, !n.sameRow) {
              var g = r[p + 1];
              if (g && g.start.row == c) {
                m.merge(g);
                break;
              }
            }
            break;
          }
          if (c <= m.start.row) break;
        }
        return a || (m = this.$addFoldLine(new i(this.$foldData, n))), this.$useWrapMode ? this.$updateWrapData(m.start.row, m.start.row) : this.$updateRowLengthCache(m.start.row, m.start.row), this.$modified = !0, this._signal("changeFold", {
          data: n,
          action: "add"
        }), n;
      }, this.addFolds = function (e) {
        e.forEach(function (e) {
          this.addFold(e);
        }, this);
      }, this.removeFold = function (e) {
        var t = e.foldLine,
          n = t.start.row,
          r = t.end.row,
          i = this.$foldData,
          o = t.folds;
        if (1 == o.length) i.splice(i.indexOf(t), 1);else if (t.range.isEnd(e.end.row, e.end.column)) o.pop(), t.end.row = o[o.length - 1].end.row, t.end.column = o[o.length - 1].end.column;else if (t.range.isStart(e.start.row, e.start.column)) o.shift(), t.start.row = o[0].start.row, t.start.column = o[0].start.column;else if (e.sameRow) o.splice(o.indexOf(e), 1);else {
          var a = t.split(e.start.row, e.start.column);
          o = a.folds, o.shift(), a.start.row = o[0].start.row, a.start.column = o[0].start.column;
        }
        this.$updating || (this.$useWrapMode ? this.$updateWrapData(n, r) : this.$updateRowLengthCache(n, r)), this.$modified = !0, this._signal("changeFold", {
          data: e,
          action: "remove"
        });
      }, this.removeFolds = function (e) {
        for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
        t.forEach(function (e) {
          this.removeFold(e);
        }, this), this.$modified = !0;
      }, this.expandFold = function (e) {
        this.removeFold(e), e.subFolds.forEach(function (t) {
          e.restoreRange(t), this.addFold(t);
        }, this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = [];
      }, this.expandFolds = function (e) {
        e.forEach(function (e) {
          this.expandFold(e);
        }, this);
      }, this.unfold = function (e, t) {
        var n, i;
        if (null == e) n = new r(0, 0, this.getLength(), 0), null == t && (t = !0);else if ("number" == typeof e) n = new r(e, 0, e, this.getLine(e).length);else if ("row" in e) n = r.fromPoints(e, e);else {
          if (Array.isArray(e)) return i = [], e.forEach(function (e) {
            i = i.concat(this.unfold(e));
          }, this), i;
          n = e;
        }
        i = this.getFoldsInRangeList(n);
        var o = i;
        while (1 == i.length && r.comparePoints(i[0].start, n.start) < 0 && r.comparePoints(i[0].end, n.end) > 0) this.expandFolds(i), i = this.getFoldsInRangeList(n);
        if (0 != t ? this.removeFolds(i) : this.expandFolds(i), o.length) return o;
      }, this.isRowFolded = function (e, t) {
        return !!this.getFoldLine(e, t);
      }, this.getRowFoldEnd = function (e, t) {
        var n = this.getFoldLine(e, t);
        return n ? n.end.row : e;
      }, this.getRowFoldStart = function (e, t) {
        var n = this.getFoldLine(e, t);
        return n ? n.start.row : e;
      }, this.getFoldDisplayLine = function (e, t, n, r, i) {
        null == r && (r = e.start.row), null == i && (i = 0), null == t && (t = e.end.row), null == n && (n = this.getLine(t).length);
        var o = this.doc,
          a = "";
        return e.walk(function (e, t, n, s) {
          if (!(t < r)) {
            if (t == r) {
              if (n < i) return;
              s = Math.max(i, s);
            }
            a += null != e ? e : o.getLine(t).substring(s, n);
          }
        }, t, n), a;
      }, this.getDisplayLine = function (e, t, n, r) {
        var i,
          o = this.getFoldLine(e);
        return o ? this.getFoldDisplayLine(o, e, t, n, r) : (i = this.doc.getLine(e), i.substring(r || 0, t || i.length));
      }, this.$cloneFoldData = function () {
        var e = [];
        return e = this.$foldData.map(function (t) {
          var n = t.folds.map(function (e) {
            return e.clone();
          });
          return new i(e, n);
        }), e;
      }, this.toggleFold = function (e) {
        var t,
          n,
          r = this.selection,
          i = r.getRange();
        if (i.isEmpty()) {
          var o = i.start;
          if (t = this.getFoldAt(o.row, o.column), t) return void this.expandFold(t);
          (n = this.findMatchingBracket(o)) ? 1 == i.comparePoint(n) ? i.end = n : (i.start = n, i.start.column++, i.end.column--) : (n = this.findMatchingBracket({
            row: o.row,
            column: o.column + 1
          })) ? (1 == i.comparePoint(n) ? i.end = n : i.start = n, i.start.column++) : i = this.getCommentFoldRange(o.row, o.column) || i;
        } else {
          var a = this.getFoldsInRange(i);
          if (e && a.length) return void this.expandFolds(a);
          1 == a.length && (t = a[0]);
        }
        if (t || (t = this.getFoldAt(i.start.row, i.start.column)), t && t.range.toString() == i.toString()) this.expandFold(t);else {
          var s = "...";
          if (!i.isMultiLine()) {
            if (s = this.getTextRange(i), s.length < 4) return;
            s = s.trim().substring(0, 2) + "..";
          }
          this.addFold(s, i);
        }
      }, this.getCommentFoldRange = function (e, t, n) {
        var i = new a(this, e, t),
          o = i.getCurrentToken(),
          s = o && o.type;
        if (o && /^comment|string/.test(s)) {
          s = s.match(/comment|string/)[0], "comment" == s && (s += "|doc-start");
          var l = new RegExp(s),
            c = new r();
          if (1 != n) {
            do {
              o = i.stepBackward();
            } while (o && l.test(o.type) && !/^comment.end/.test(o.type));
            o = i.stepForward();
          }
          if (c.start.row = i.getCurrentTokenRow(), c.start.column = i.getCurrentTokenColumn() + (/^comment.start/.test(o.type) ? o.value.length : 2), i = new a(this, e, t), -1 != n) {
            var u = -1;
            do {
              if (o = i.stepForward(), -1 == u) {
                var h = this.getState(i.$row);
                l.test(h) || (u = i.$row);
              } else if (i.$row > u) break;
            } while (o && l.test(o.type) && !/^comment.start/.test(o.type));
            o = i.stepBackward();
          } else o = i.getCurrentToken();
          return c.end.row = i.getCurrentTokenRow(), c.end.column = i.getCurrentTokenColumn(), /^comment.end/.test(o.type) || (c.end.column += o.value.length - 2), c;
        }
      }, this.foldAll = function (e, t, n, r) {
        void 0 == n && (n = 1e5);
        var i = this.foldWidgets;
        if (i) {
          t = t || this.getLength(), e = e || 0;
          for (var o = e; o < t; o++) if (null == i[o] && (i[o] = this.getFoldWidget(o)), "start" == i[o] && (!r || r(o))) {
            var a = this.getFoldWidgetRange(o);
            a && a.isMultiLine() && a.end.row <= t && a.start.row >= e && (o = a.end.row, a.collapseChildren = n, this.addFold("...", a));
          }
        }
      }, this.foldToLevel = function (e) {
        this.foldAll();
        while (e-- > 0) this.unfold(null, !1);
      }, this.foldAllComments = function () {
        var e = this;
        this.foldAll(null, null, null, function (t) {
          for (var n = e.getTokens(t), r = 0; r < n.length; r++) {
            var i = n[r];
            if ("text" != i.type || !/^\s+$/.test(i.value)) return !!/comment/.test(i.type);
          }
        });
      }, this.$foldStyles = {
        manual: 1,
        markbegin: 1,
        markbeginend: 1
      }, this.$foldStyle = "markbegin", this.setFoldStyle = function (e) {
        if (!this.$foldStyles[e]) throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
        if (this.$foldStyle != e) {
          this.$foldStyle = e, "manual" == e && this.unfold();
          var t = this.$foldMode;
          this.$setFolding(null), this.$setFolding(t);
        }
      }, this.$setFolding = function (e) {
        this.$foldMode != e && (this.$foldMode = e, this.off("change", this.$updateFoldWidgets), this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets), this._signal("changeAnnotation"), e && "manual" != this.$foldStyle ? (this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets)) : this.foldWidgets = null);
      }, this.getParentFoldRangeData = function (e, t) {
        var n = this.foldWidgets;
        if (!n || t && n[e]) return {};
        var r,
          i = e - 1;
        while (i >= 0) {
          var o = n[i];
          if (null == o && (o = n[i] = this.getFoldWidget(i)), "start" == o) {
            var a = this.getFoldWidgetRange(i);
            if (r || (r = a), a && a.end.row >= e) break;
          }
          i--;
        }
        return {
          range: -1 !== i && a,
          firstRange: r
        };
      }, this.onFoldWidgetClick = function (e, t) {
        t = t.domEvent;
        var n = {
            children: t.shiftKey,
            all: t.ctrlKey || t.metaKey,
            siblings: t.altKey
          },
          r = this.$toggleFoldWidget(e, n);
        if (!r) {
          var i = t.target || t.srcElement;
          i && /ace_fold-widget/.test(i.className) && (i.className += " ace_invalid");
        }
      }, this.$toggleFoldWidget = function (e, t) {
        if (this.getFoldWidget) {
          var n = this.getFoldWidget(e),
            r = this.getLine(e),
            i = "end" === n ? -1 : 1,
            o = this.getFoldAt(e, -1 === i ? 0 : r.length, i);
          if (o) return t.children || t.all ? this.removeFold(o) : this.expandFold(o), o;
          var a = this.getFoldWidgetRange(e, !0);
          if (a && !a.isMultiLine() && (o = this.getFoldAt(a.start.row, a.start.column, 1), o && a.isEqual(o.range))) return this.removeFold(o), o;
          if (t.siblings) {
            var s = this.getParentFoldRangeData(e);
            if (s.range) var l = s.range.start.row + 1,
              c = s.range.end.row;
            this.foldAll(l, c, t.all ? 1e4 : 0);
          } else t.children ? (c = a ? a.end.row : this.getLength(), this.foldAll(e + 1, c, t.all ? 1e4 : 0)) : a && (t.all && (a.collapseChildren = 1e4), this.addFold("...", a));
          return a;
        }
      }, this.toggleFoldWidget = function (e) {
        var t = this.selection.getCursor().row;
        t = this.getRowFoldStart(t);
        var n = this.$toggleFoldWidget(t, {});
        if (!n) {
          var r = this.getParentFoldRangeData(t, !0);
          if (n = r.range || r.firstRange, n) {
            t = n.start.row;
            var i = this.getFoldAt(t, this.getLine(t).length, 1);
            i ? this.removeFold(i) : this.addFold("...", n);
          }
        }
      }, this.updateFoldWidgets = function (e) {
        var t = e.start.row,
          n = e.end.row - t;
        if (0 === n) this.foldWidgets[t] = null;else if ("remove" == e.action) this.foldWidgets.splice(t, n + 1, null);else {
          var r = Array(n + 1);
          r.unshift(t, 1), this.foldWidgets.splice.apply(this.foldWidgets, r);
        }
      }, this.tokenizerUpdateFoldWidgets = function (e) {
        var t = e.data;
        t.first != t.last && this.foldWidgets.length > t.first && this.foldWidgets.splice(t.first, this.foldWidgets.length);
      };
    }
    t.Folding = s;
  }), ace.define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("../token_iterator").TokenIterator,
      i = e("../range").Range;
    function o() {
      this.findMatchingBracket = function (e, t) {
        if (0 == e.column) return null;
        var n = t || this.getLine(e.row).charAt(e.column - 1);
        if ("" == n) return null;
        var r = n.match(/([\(\[\{])|([\)\]\}])/);
        return r ? r[1] ? this.$findClosingBracket(r[1], e) : this.$findOpeningBracket(r[2], e) : null;
      }, this.getBracketRange = function (e) {
        var t,
          n = this.getLine(e.row),
          r = !0,
          o = n.charAt(e.column - 1),
          a = o && o.match(/([\(\[\{])|([\)\]\}])/);
        if (a || (o = n.charAt(e.column), e = {
          row: e.row,
          column: e.column + 1
        }, a = o && o.match(/([\(\[\{])|([\)\]\}])/), r = !1), !a) return null;
        if (a[1]) {
          var s = this.$findClosingBracket(a[1], e);
          if (!s) return null;
          t = i.fromPoints(e, s), r || (t.end.column++, t.start.column--), t.cursor = t.end;
        } else {
          s = this.$findOpeningBracket(a[2], e);
          if (!s) return null;
          t = i.fromPoints(s, e), r || (t.start.column++, t.end.column--), t.cursor = t.start;
        }
        return t;
      }, this.getMatchingBracketRanges = function (e, t) {
        var n = this.getLine(e.row),
          r = /([\(\[\{])|([\)\]\}])/,
          o = !t && n.charAt(e.column - 1),
          a = o && o.match(r);
        if (a || (o = (void 0 === t || t) && n.charAt(e.column), e = {
          row: e.row,
          column: e.column + 1
        }, a = o && o.match(r)), !a) return null;
        var s = new i(e.row, e.column - 1, e.row, e.column),
          l = a[1] ? this.$findClosingBracket(a[1], e) : this.$findOpeningBracket(a[2], e);
        if (!l) return [s];
        var c = new i(l.row, l.column, l.row, l.column + 1);
        return [s, c];
      }, this.$brackets = {
        ")": "(",
        "(": ")",
        "]": "[",
        "[": "]",
        "{": "}",
        "}": "{",
        "<": ">",
        ">": "<"
      }, this.$findOpeningBracket = function (e, t, n) {
        var i = this.$brackets[e],
          o = 1,
          a = new r(this, t.row, t.column),
          s = a.getCurrentToken();
        if (s || (s = a.stepForward()), s) {
          n || (n = new RegExp("(\\.?" + s.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+"));
          var l = t.column - a.getCurrentTokenColumn() - 2,
            c = s.value;
          while (1) {
            while (l >= 0) {
              var u = c.charAt(l);
              if (u == i) {
                if (o -= 1, 0 == o) return {
                  row: a.getCurrentTokenRow(),
                  column: l + a.getCurrentTokenColumn()
                };
              } else u == e && (o += 1);
              l -= 1;
            }
            do {
              s = a.stepBackward();
            } while (s && !n.test(s.type));
            if (null == s) break;
            c = s.value, l = c.length - 1;
          }
          return null;
        }
      }, this.$findClosingBracket = function (e, t, n) {
        var i = this.$brackets[e],
          o = 1,
          a = new r(this, t.row, t.column),
          s = a.getCurrentToken();
        if (s || (s = a.stepForward()), s) {
          n || (n = new RegExp("(\\.?" + s.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+"));
          var l = t.column - a.getCurrentTokenColumn();
          while (1) {
            var c = s.value,
              u = c.length;
            while (l < u) {
              var h = c.charAt(l);
              if (h == i) {
                if (o -= 1, 0 == o) return {
                  row: a.getCurrentTokenRow(),
                  column: l + a.getCurrentTokenColumn()
                };
              } else h == e && (o += 1);
              l += 1;
            }
            do {
              s = a.stepForward();
            } while (s && !n.test(s.type));
            if (null == s) break;
            l = 0;
          }
          return null;
        }
      }, this.getMatchingTags = function (e) {
        var t = new r(this, e.row, e.column),
          n = this.$findTagName(t);
        if (n) {
          var i = t.stepBackward();
          return "<" === i.value ? this.$findClosingTag(t, n) : this.$findOpeningTag(t, n);
        }
      }, this.$findTagName = function (e) {
        var t = e.getCurrentToken(),
          n = !1,
          r = !1;
        if (t && -1 === t.type.indexOf("tag-name")) do {
          t = r ? e.stepBackward() : e.stepForward(), t && ("/>" === t.value ? r = !0 : -1 !== t.type.indexOf("tag-name") && (n = !0));
        } while (t && !n);
        return t;
      }, this.$findClosingTag = function (e, t) {
        var n,
          r = t.value,
          o = t.value,
          a = 0,
          s = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 1);
        t = e.stepForward();
        var l = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + t.value.length),
          c = !1;
        do {
          if (n = t, t = e.stepForward(), t) {
            if (">" === t.value && !c) {
              var u = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 1);
              c = !0;
            }
            if (-1 !== t.type.indexOf("tag-name")) {
              if (r = t.value, o === r) if ("<" === n.value) a++;else if ("</" === n.value && (a--, a < 0)) {
                e.stepBackward();
                var h = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 2);
                t = e.stepForward();
                var f = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + t.value.length);
                if (t = e.stepForward(), !t || ">" !== t.value) return;
                var d = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 1);
              }
            } else if (o === r && "/>" === t.value && (a--, a < 0)) h = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 2), f = h, d = f, u = new i(l.end.row, l.end.column, l.end.row, l.end.column + 1);
          }
        } while (t && a >= 0);
        if (s && u && h && d && l && f) return {
          openTag: new i(s.start.row, s.start.column, u.end.row, u.end.column),
          closeTag: new i(h.start.row, h.start.column, d.end.row, d.end.column),
          openTagName: l,
          closeTagName: f
        };
      }, this.$findOpeningTag = function (e, t) {
        var n = e.getCurrentToken(),
          r = t.value,
          o = 0,
          a = e.getCurrentTokenRow(),
          s = e.getCurrentTokenColumn(),
          l = s + 2,
          c = new i(a, s, a, l);
        e.stepForward();
        var u = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + t.value.length);
        if (t = e.stepForward(), t && ">" === t.value) {
          var h = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 1);
          e.stepBackward(), e.stepBackward();
          do {
            if (t = n, a = e.getCurrentTokenRow(), s = e.getCurrentTokenColumn(), l = s + t.value.length, n = e.stepBackward(), t) if (-1 !== t.type.indexOf("tag-name")) {
              if (r === t.value) if ("<" === n.value) {
                if (o++, o > 0) {
                  var f = new i(a, s, a, l),
                    d = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 1);
                  do {
                    t = e.stepForward();
                  } while (t && ">" !== t.value);
                  var p = new i(e.getCurrentTokenRow(), e.getCurrentTokenColumn(), e.getCurrentTokenRow(), e.getCurrentTokenColumn() + 1);
                }
              } else "</" === n.value && o--;
            } else if ("/>" === t.value) {
              var m = 0,
                g = n;
              while (g) {
                if (-1 !== g.type.indexOf("tag-name") && g.value === r) {
                  o--;
                  break;
                }
                if ("<" === g.value) break;
                g = e.stepBackward(), m++;
              }
              for (var v = 0; v < m; v++) e.stepForward();
            }
          } while (n && o <= 0);
          return d && p && c && h && f && u ? {
            openTag: new i(d.start.row, d.start.column, p.end.row, p.end.column),
            closeTag: new i(c.start.row, c.start.column, h.end.row, h.end.column),
            openTagName: f,
            closeTagName: u
          } : void 0;
        }
      };
    }
    t.BracketMatch = o;
  }), ace.define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/bidihandler", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./lib/lang"),
      o = e("./bidihandler").BidiHandler,
      a = e("./config"),
      s = e("./lib/event_emitter").EventEmitter,
      l = e("./selection").Selection,
      c = e("./mode/text").Mode,
      u = e("./range").Range,
      h = e("./document").Document,
      f = e("./background_tokenizer").BackgroundTokenizer,
      d = e("./search_highlight").SearchHighlight,
      p = function (e, t) {
        this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.id = "session" + ++p.$uid, this.$foldData.toString = function () {
          return this.join("\n");
        }, this.bgTokenizer = new f(new c().getTokenizer(), this);
        var n = this;
        this.bgTokenizer.on("update", function (e) {
          n._signal("tokenizerUpdate", e);
        }), this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == typeof e && e.getLine || (e = new h(e)), this.setDocument(e), this.selection = new l(this), this.$bidiHandler = new o(this), a.resetOptions(this), this.setMode(t), a._signal("session", this), this.destroyed = !1;
      };
    p.$uid = 0, function () {
      r.implement(this, s), this.setDocument = function (e) {
        this.doc && this.doc.off("change", this.$onChange), this.doc = e, e.on("change", this.$onChange, !0), this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches();
      }, this.getDocument = function () {
        return this.doc;
      }, this.$resetRowCache = function (e) {
        if (!e) return this.$docRowCache = [], void (this.$screenRowCache = []);
        var t = this.$docRowCache.length,
          n = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
        t > n && (this.$docRowCache.splice(n, t), this.$screenRowCache.splice(n, t));
      }, this.$getRowCacheIndex = function (e, t) {
        var n = 0,
          r = e.length - 1;
        while (n <= r) {
          var i = n + r >> 1,
            o = e[i];
          if (t > o) n = i + 1;else {
            if (!(t < o)) return i;
            r = i - 1;
          }
        }
        return n - 1;
      }, this.resetCaches = function () {
        this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.destroyed || this.bgTokenizer.start(0);
      }, this.onChangeFold = function (e) {
        var t = e.data;
        this.$resetRowCache(t.start.row);
      }, this.onChange = function (e) {
        this.$modified = !0, this.$bidiHandler.onChange(e), this.$resetRowCache(e.start.row);
        var t = this.$updateInternalDataOnChange(e);
        !this.$fromUndo && this.$undoManager && (t && t.length && (this.$undoManager.add({
          action: "removeFolds",
          folds: t
        }, this.mergeUndoDeltas), this.mergeUndoDeltas = !0), this.$undoManager.add(e, this.mergeUndoDeltas), this.mergeUndoDeltas = !0, this.$informUndoManager.schedule()), this.bgTokenizer.$updateOnChange(e), this._signal("change", e);
      }, this.setValue = function (e) {
        this.doc.setValue(e), this.selection.moveTo(0, 0), this.$resetRowCache(0), this.setUndoManager(this.$undoManager), this.getUndoManager().reset();
      }, this.getValue = this.toString = function () {
        return this.doc.getValue();
      }, this.getSelection = function () {
        return this.selection;
      }, this.getState = function (e) {
        return this.bgTokenizer.getState(e);
      }, this.getTokens = function (e) {
        return this.bgTokenizer.getTokens(e);
      }, this.getTokenAt = function (e, t) {
        var n,
          r = this.bgTokenizer.getTokens(e),
          i = 0;
        if (null == t) {
          var o = r.length - 1;
          i = this.getLine(e).length;
        } else for (o = 0; o < r.length; o++) if (i += r[o].value.length, i >= t) break;
        return n = r[o], n ? (n.index = o, n.start = i - n.value.length, n) : null;
      }, this.setUndoManager = function (e) {
        if (this.$undoManager = e, this.$informUndoManager && this.$informUndoManager.cancel(), e) {
          var t = this;
          e.addSession(this), this.$syncInformUndoManager = function () {
            t.$informUndoManager.cancel(), t.mergeUndoDeltas = !1;
          }, this.$informUndoManager = i.delayedCall(this.$syncInformUndoManager);
        } else this.$syncInformUndoManager = function () {};
      }, this.markUndoGroup = function () {
        this.$syncInformUndoManager && this.$syncInformUndoManager();
      }, this.$defaultUndoManager = {
        undo: function () {},
        redo: function () {},
        hasUndo: function () {},
        hasRedo: function () {},
        reset: function () {},
        add: function () {},
        addSelection: function () {},
        startNewGroup: function () {},
        addSession: function () {}
      }, this.getUndoManager = function () {
        return this.$undoManager || this.$defaultUndoManager;
      }, this.getTabString = function () {
        return this.getUseSoftTabs() ? i.stringRepeat(" ", this.getTabSize()) : "\t";
      }, this.setUseSoftTabs = function (e) {
        this.setOption("useSoftTabs", e);
      }, this.getUseSoftTabs = function () {
        return this.$useSoftTabs && !this.$mode.$indentWithTabs;
      }, this.setTabSize = function (e) {
        this.setOption("tabSize", e);
      }, this.getTabSize = function () {
        return this.$tabSize;
      }, this.isTabStop = function (e) {
        return this.$useSoftTabs && e.column % this.$tabSize === 0;
      }, this.setNavigateWithinSoftTabs = function (e) {
        this.setOption("navigateWithinSoftTabs", e);
      }, this.getNavigateWithinSoftTabs = function () {
        return this.$navigateWithinSoftTabs;
      }, this.$overwrite = !1, this.setOverwrite = function (e) {
        this.setOption("overwrite", e);
      }, this.getOverwrite = function () {
        return this.$overwrite;
      }, this.toggleOverwrite = function () {
        this.setOverwrite(!this.$overwrite);
      }, this.addGutterDecoration = function (e, t) {
        this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._signal("changeBreakpoint", {});
      }, this.removeGutterDecoration = function (e, t) {
        this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._signal("changeBreakpoint", {});
      }, this.getBreakpoints = function () {
        return this.$breakpoints;
      }, this.setBreakpoints = function (e) {
        this.$breakpoints = [];
        for (var t = 0; t < e.length; t++) this.$breakpoints[e[t]] = "ace_breakpoint";
        this._signal("changeBreakpoint", {});
      }, this.clearBreakpoints = function () {
        this.$breakpoints = [], this._signal("changeBreakpoint", {});
      }, this.setBreakpoint = function (e, t) {
        void 0 === t && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._signal("changeBreakpoint", {});
      }, this.clearBreakpoint = function (e) {
        delete this.$breakpoints[e], this._signal("changeBreakpoint", {});
      }, this.addMarker = function (e, t, n, r) {
        var i = this.$markerId++,
          o = {
            range: e,
            type: n || "line",
            renderer: "function" == typeof n ? n : null,
            clazz: t,
            inFront: !!r,
            id: i
          };
        return r ? (this.$frontMarkers[i] = o, this._signal("changeFrontMarker")) : (this.$backMarkers[i] = o, this._signal("changeBackMarker")), i;
      }, this.addDynamicMarker = function (e, t) {
        if (e.update) {
          var n = this.$markerId++;
          return e.id = n, e.inFront = !!t, t ? (this.$frontMarkers[n] = e, this._signal("changeFrontMarker")) : (this.$backMarkers[n] = e, this._signal("changeBackMarker")), e;
        }
      }, this.removeMarker = function (e) {
        var t = this.$frontMarkers[e] || this.$backMarkers[e];
        if (t) {
          var n = t.inFront ? this.$frontMarkers : this.$backMarkers;
          delete n[e], this._signal(t.inFront ? "changeFrontMarker" : "changeBackMarker");
        }
      }, this.getMarkers = function (e) {
        return e ? this.$frontMarkers : this.$backMarkers;
      }, this.highlight = function (e) {
        if (!this.$searchHighlight) {
          var t = new d(null, "ace_selected-word", "text");
          this.$searchHighlight = this.addDynamicMarker(t);
        }
        this.$searchHighlight.setRegexp(e);
      }, this.highlightLines = function (e, t, n, r) {
        "number" != typeof t && (n = t, t = e), n || (n = "ace_step");
        var i = new u(e, 0, t, 1 / 0);
        return i.id = this.addMarker(i, n, "fullLine", r), i;
      }, this.setAnnotations = function (e) {
        this.$annotations = e, this._signal("changeAnnotation", {});
      }, this.getAnnotations = function () {
        return this.$annotations || [];
      }, this.clearAnnotations = function () {
        this.setAnnotations([]);
      }, this.$detectNewLine = function (e) {
        var t = e.match(/^.*?(\r?\n)/m);
        this.$autoNewLine = t ? t[1] : "\n";
      }, this.getWordRange = function (e, t) {
        var n = this.getLine(e),
          r = !1;
        if (t > 0 && (r = !!n.charAt(t - 1).match(this.tokenRe)), r || (r = !!n.charAt(t).match(this.tokenRe)), r) var i = this.tokenRe;else if (/^\s+$/.test(n.slice(t - 1, t + 1))) i = /\s/;else i = this.nonTokenRe;
        var o = t;
        if (o > 0) {
          do {
            o--;
          } while (o >= 0 && n.charAt(o).match(i));
          o++;
        }
        var a = t;
        while (a < n.length && n.charAt(a).match(i)) a++;
        return new u(e, o, e, a);
      }, this.getAWordRange = function (e, t) {
        var n = this.getWordRange(e, t),
          r = this.getLine(n.end.row);
        while (r.charAt(n.end.column).match(/[ \t]/)) n.end.column += 1;
        return n;
      }, this.setNewLineMode = function (e) {
        this.doc.setNewLineMode(e);
      }, this.getNewLineMode = function () {
        return this.doc.getNewLineMode();
      }, this.setUseWorker = function (e) {
        this.setOption("useWorker", e);
      }, this.getUseWorker = function () {
        return this.$useWorker;
      }, this.onReloadTokenizer = function (e) {
        var t = e.data;
        this.bgTokenizer.start(t.first), this._signal("tokenizerUpdate", e);
      }, this.$modes = a.$modes, this.$mode = null, this.$modeId = null, this.setMode = function (e, t) {
        if (e && "object" === typeof e) {
          if (e.getTokenizer) return this.$onChangeMode(e);
          var n = e,
            r = n.path;
        } else r = e || "ace/mode/text";
        if (this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new c()), this.$modes[r] && !n) return this.$onChangeMode(this.$modes[r]), void (t && t());
        this.$modeId = r, a.loadModule(["mode", r], function (e) {
          if (this.$modeId !== r) return t && t();
          this.$modes[r] && !n ? this.$onChangeMode(this.$modes[r]) : e && e.Mode && (e = new e.Mode(n), n || (this.$modes[r] = e, e.$id = r), this.$onChangeMode(e)), t && t();
        }.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0);
      }, this.$onChangeMode = function (e, t) {
        if (t || (this.$modeId = e.$id), this.$mode !== e) {
          var n = this.$mode;
          this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
          var r = e.getTokenizer();
          if (void 0 !== r.on) {
            var i = this.onReloadTokenizer.bind(this);
            r.on("update", i);
          }
          this.bgTokenizer.setTokenizer(r), this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, t || (e.attachToSession && e.attachToSession(this), this.$options.wrapMethod.set.call(this, this.$wrapMethod), this.$setFolding(e.foldingRules), this.bgTokenizer.start(0), this._emit("changeMode", {
            oldMode: n,
            mode: e
          }));
        }
      }, this.$stopWorker = function () {
        this.$worker && (this.$worker.terminate(), this.$worker = null);
      }, this.$startWorker = function () {
        try {
          this.$worker = this.$mode.createWorker(this);
        } catch (e) {
          a.warn("Could not load worker", e), this.$worker = null;
        }
      }, this.getMode = function () {
        return this.$mode;
      }, this.$scrollTop = 0, this.setScrollTop = function (e) {
        this.$scrollTop === e || isNaN(e) || (this.$scrollTop = e, this._signal("changeScrollTop", e));
      }, this.getScrollTop = function () {
        return this.$scrollTop;
      }, this.$scrollLeft = 0, this.setScrollLeft = function (e) {
        this.$scrollLeft === e || isNaN(e) || (this.$scrollLeft = e, this._signal("changeScrollLeft", e));
      }, this.getScrollLeft = function () {
        return this.$scrollLeft;
      }, this.getScreenWidth = function () {
        return this.$computeWidth(), this.lineWidgets ? Math.max(this.getLineWidgetMaxWidth(), this.screenWidth) : this.screenWidth;
      }, this.getLineWidgetMaxWidth = function () {
        if (null != this.lineWidgetsWidth) return this.lineWidgetsWidth;
        var e = 0;
        return this.lineWidgets.forEach(function (t) {
          t && t.screenWidth > e && (e = t.screenWidth);
        }), this.lineWidgetWidth = e;
      }, this.$computeWidth = function (e) {
        if (this.$modified || e) {
          if (this.$modified = !1, this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
          for (var t = this.doc.getAllLines(), n = this.$rowLengthCache, r = 0, i = 0, o = this.$foldData[i], a = o ? o.start.row : 1 / 0, s = t.length, l = 0; l < s; l++) {
            if (l > a) {
              if (l = o.end.row + 1, l >= s) break;
              o = this.$foldData[i++], a = o ? o.start.row : 1 / 0;
            }
            null == n[l] && (n[l] = this.$getStringScreenWidth(t[l])[0]), n[l] > r && (r = n[l]);
          }
          this.screenWidth = r;
        }
      }, this.getLine = function (e) {
        return this.doc.getLine(e);
      }, this.getLines = function (e, t) {
        return this.doc.getLines(e, t);
      }, this.getLength = function () {
        return this.doc.getLength();
      }, this.getTextRange = function (e) {
        return this.doc.getTextRange(e || this.selection.getRange());
      }, this.insert = function (e, t) {
        return this.doc.insert(e, t);
      }, this.remove = function (e) {
        return this.doc.remove(e);
      }, this.removeFullLines = function (e, t) {
        return this.doc.removeFullLines(e, t);
      }, this.undoChanges = function (e, t) {
        if (e.length) {
          this.$fromUndo = !0;
          for (var n = e.length - 1; -1 != n; n--) {
            var r = e[n];
            "insert" == r.action || "remove" == r.action ? this.doc.revertDelta(r) : r.folds && this.addFolds(r.folds);
          }
          !t && this.$undoSelect && (e.selectionBefore ? this.selection.fromJSON(e.selectionBefore) : this.selection.setRange(this.$getUndoSelection(e, !0))), this.$fromUndo = !1;
        }
      }, this.redoChanges = function (e, t) {
        if (e.length) {
          this.$fromUndo = !0;
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            "insert" != r.action && "remove" != r.action || this.doc.$safeApplyDelta(r);
          }
          !t && this.$undoSelect && (e.selectionAfter ? this.selection.fromJSON(e.selectionAfter) : this.selection.setRange(this.$getUndoSelection(e, !1))), this.$fromUndo = !1;
        }
      }, this.setUndoSelect = function (e) {
        this.$undoSelect = e;
      }, this.$getUndoSelection = function (e, t) {
        function n(e) {
          return t ? "insert" !== e.action : "insert" === e.action;
        }
        for (var r, i, o = 0; o < e.length; o++) {
          var a = e[o];
          a.start && (r ? n(a) ? (i = a.start, -1 == r.compare(i.row, i.column) && r.setStart(i), i = a.end, 1 == r.compare(i.row, i.column) && r.setEnd(i)) : (i = a.start, -1 == r.compare(i.row, i.column) && (r = u.fromPoints(a.start, a.start))) : r = n(a) ? u.fromPoints(a.start, a.end) : u.fromPoints(a.start, a.start));
        }
        return r;
      }, this.replace = function (e, t) {
        return this.doc.replace(e, t);
      }, this.moveText = function (e, t, n) {
        var r = this.getTextRange(e),
          i = this.getFoldsInRange(e),
          o = u.fromPoints(t, t);
        if (!n) {
          this.remove(e);
          var a = e.start.row - e.end.row,
            s = a ? -e.end.column : e.start.column - e.end.column;
          s && (o.start.row == e.end.row && o.start.column > e.end.column && (o.start.column += s), o.end.row == e.end.row && o.end.column > e.end.column && (o.end.column += s)), a && o.start.row >= e.end.row && (o.start.row += a, o.end.row += a);
        }
        if (o.end = this.insert(o.start, r), i.length) {
          var l = e.start,
            c = o.start;
          a = c.row - l.row, s = c.column - l.column;
          this.addFolds(i.map(function (e) {
            return e = e.clone(), e.start.row == l.row && (e.start.column += s), e.end.row == l.row && (e.end.column += s), e.start.row += a, e.end.row += a, e;
          }));
        }
        return o;
      }, this.indentRows = function (e, t, n) {
        n = n.replace(/\t/g, this.getTabString());
        for (var r = e; r <= t; r++) this.doc.insertInLine({
          row: r,
          column: 0
        }, n);
      }, this.outdentRows = function (e) {
        for (var t = e.collapseRows(), n = new u(0, 0, 0, 0), r = this.getTabSize(), i = t.start.row; i <= t.end.row; ++i) {
          var o = this.getLine(i);
          n.start.row = i, n.end.row = i;
          for (var a = 0; a < r; ++a) if (" " != o.charAt(a)) break;
          a < r && "\t" == o.charAt(a) ? (n.start.column = a, n.end.column = a + 1) : (n.start.column = 0, n.end.column = a), this.remove(n);
        }
      }, this.$moveLines = function (e, t, n) {
        if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), n < 0) {
          var r = this.getRowFoldStart(e + n);
          if (r < 0) return 0;
          var i = r - e;
        } else if (n > 0) {
          r = this.getRowFoldEnd(t + n);
          if (r > this.doc.getLength() - 1) return 0;
          i = r - t;
        } else {
          e = this.$clipRowToDocument(e), t = this.$clipRowToDocument(t);
          i = t - e + 1;
        }
        var o = new u(e, 0, t, Number.MAX_VALUE),
          a = this.getFoldsInRange(o).map(function (e) {
            return e = e.clone(), e.start.row += i, e.end.row += i, e;
          }),
          s = 0 == n ? this.doc.getLines(e, t) : this.doc.removeFullLines(e, t);
        return this.doc.insertFullLines(e + i, s), a.length && this.addFolds(a), i;
      }, this.moveLinesUp = function (e, t) {
        return this.$moveLines(e, t, -1);
      }, this.moveLinesDown = function (e, t) {
        return this.$moveLines(e, t, 1);
      }, this.duplicateLines = function (e, t) {
        return this.$moveLines(e, t, 0);
      }, this.$clipRowToDocument = function (e) {
        return Math.max(0, Math.min(e, this.doc.getLength() - 1));
      }, this.$clipColumnToRow = function (e, t) {
        return t < 0 ? 0 : Math.min(this.doc.getLine(e).length, t);
      }, this.$clipPositionToDocument = function (e, t) {
        if (t = Math.max(0, t), e < 0) e = 0, t = 0;else {
          var n = this.doc.getLength();
          e >= n ? (e = n - 1, t = this.doc.getLine(n - 1).length) : t = Math.min(this.doc.getLine(e).length, t);
        }
        return {
          row: e,
          column: t
        };
      }, this.$clipRangeToDocument = function (e) {
        e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
        var t = this.doc.getLength() - 1;
        return e.end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e;
      }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
        min: null,
        max: null
      }, this.setUseWrapMode = function (e) {
        if (e != this.$useWrapMode) {
          if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
            var t = this.getLength();
            this.$wrapData = Array(t), this.$updateWrapData(0, t - 1);
          }
          this._signal("changeWrapMode");
        }
      }, this.getUseWrapMode = function () {
        return this.$useWrapMode;
      }, this.setWrapLimitRange = function (e, t) {
        this.$wrapLimitRange.min === e && this.$wrapLimitRange.max === t || (this.$wrapLimitRange = {
          min: e,
          max: t
        }, this.$modified = !0, this.$bidiHandler.markAsDirty(), this.$useWrapMode && this._signal("changeWrapMode"));
      }, this.adjustWrapLimit = function (e, t) {
        var n = this.$wrapLimitRange;
        n.max < 0 && (n = {
          min: t,
          max: t
        });
        var r = this.$constrainWrapLimit(e, n.min, n.max);
        return r != this.$wrapLimit && r > 1 && (this.$wrapLimit = r, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._signal("changeWrapLimit")), !0);
      }, this.$constrainWrapLimit = function (e, t, n) {
        return t && (e = Math.max(t, e)), n && (e = Math.min(n, e)), e;
      }, this.getWrapLimit = function () {
        return this.$wrapLimit;
      }, this.setWrapLimit = function (e) {
        this.setWrapLimitRange(e, e);
      }, this.getWrapLimitRange = function () {
        return {
          min: this.$wrapLimitRange.min,
          max: this.$wrapLimitRange.max
        };
      }, this.$updateInternalDataOnChange = function (e) {
        var t = this.$useWrapMode,
          n = e.action,
          r = e.start,
          i = e.end,
          o = r.row,
          a = i.row,
          s = a - o,
          l = null;
        if (this.$updating = !0, 0 != s) {
          if ("remove" === n) {
            this[t ? "$wrapData" : "$rowLengthCache"].splice(o, s);
            var c = this.$foldData;
            l = this.getFoldsInRange(e), this.removeFolds(l);
            var u = this.getFoldLine(i.row),
              h = 0;
            if (u) {
              u.addRemoveChars(i.row, i.column, r.column - i.column), u.shiftRow(-s);
              var f = this.getFoldLine(o);
              f && f !== u && (f.merge(u), u = f), h = c.indexOf(u) + 1;
            }
            for (h; h < c.length; h++) {
              u = c[h];
              u.start.row >= i.row && u.shiftRow(-s);
            }
            a = o;
          } else {
            var d = Array(s);
            d.unshift(o, 0);
            var p = t ? this.$wrapData : this.$rowLengthCache;
            p.splice.apply(p, d);
            c = this.$foldData, u = this.getFoldLine(o), h = 0;
            if (u) {
              var m = u.range.compareInside(r.row, r.column);
              0 == m ? (u = u.split(r.row, r.column), u && (u.shiftRow(s), u.addRemoveChars(a, 0, i.column - r.column))) : -1 == m && (u.addRemoveChars(o, 0, i.column - r.column), u.shiftRow(s)), h = c.indexOf(u) + 1;
            }
            for (h; h < c.length; h++) {
              u = c[h];
              u.start.row >= o && u.shiftRow(s);
            }
          }
        } else {
          s = Math.abs(e.start.column - e.end.column), "remove" === n && (l = this.getFoldsInRange(e), this.removeFolds(l), s = -s);
          u = this.getFoldLine(o);
          u && u.addRemoveChars(o, r.column, s);
        }
        return t && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, t ? this.$updateWrapData(o, a) : this.$updateRowLengthCache(o, a), l;
      }, this.$updateRowLengthCache = function (e, t, n) {
        this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null;
      }, this.$updateWrapData = function (e, t) {
        var r,
          i,
          a = this.doc.getAllLines(),
          s = this.getTabSize(),
          l = this.$wrapData,
          c = this.$wrapLimit,
          u = e;
        t = Math.min(t, a.length - 1);
        while (u <= t) i = this.getFoldLine(u, i), i ? (r = [], i.walk(function (e, t, i, s) {
          var l;
          if (null != e) {
            l = this.$getDisplayTokens(e, r.length), l[0] = n;
            for (var c = 1; c < l.length; c++) l[c] = o;
          } else l = this.$getDisplayTokens(a[t].substring(s, i), r.length);
          r = r.concat(l);
        }.bind(this), i.end.row, a[i.end.row].length + 1), l[i.start.row] = this.$computeWrapSplits(r, c, s), u = i.end.row + 1) : (r = this.$getDisplayTokens(a[u]), l[u] = this.$computeWrapSplits(r, c, s), u++);
      };
      var e = 1,
        t = 2,
        n = 3,
        o = 4,
        l = 9,
        h = 10,
        f = 11,
        p = 12;
      function m(e) {
        return !(e < 4352) && (e >= 4352 && e <= 4447 || e >= 4515 && e <= 4519 || e >= 4602 && e <= 4607 || e >= 9001 && e <= 9002 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12283 || e >= 12288 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12589 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12730 || e >= 12736 && e <= 12771 || e >= 12784 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 13054 || e >= 13056 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 55216 && e <= 55238 || e >= 55243 && e <= 55291 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510);
      }
      this.$computeWrapSplits = function (e, r, i) {
        if (0 == e.length) return [];
        var a = [],
          s = e.length,
          c = 0,
          u = 0,
          d = this.$wrapAsCode,
          m = this.$indentedSoftWrap,
          g = r <= Math.max(2 * i, 8) || !1 === m ? 0 : Math.floor(r / 2);
        function v() {
          var t = 0;
          if (0 === g) return t;
          if (m) for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (r == h) t += 1;else {
              if (r != f) {
                if (r == p) continue;
                break;
              }
              t += i;
            }
          }
          return d && !1 !== m && (t += i), Math.min(t, g);
        }
        function y(t) {
          for (var n = t - c, r = c; r < t; r++) {
            var i = e[r];
            12 !== i && 2 !== i || (n -= 1);
          }
          a.length || (b = v(), a.indent = b), u += n, a.push(u), c = t;
        }
        var b = 0;
        while (s - c > r - b) {
          var w = c + r - b;
          if (e[w - 1] >= h && e[w] >= h) y(w);else if (e[w] != n && e[w] != o) {
            var x = Math.max(w - (r - (r >> 2)), c - 1);
            while (w > x && e[w] < n) w--;
            if (d) {
              while (w > x && e[w] < n) w--;
              while (w > x && e[w] == l) w--;
            } else while (w > x && e[w] < h) w--;
            w > x ? y(++w) : (w = c + r, e[w] == t && w--, y(w - b));
          } else {
            for (w; w != c - 1; w--) if (e[w] == n) break;
            if (w > c) {
              y(w);
              continue;
            }
            for (w = c + r, w; w < e.length; w++) if (e[w] != o) break;
            if (w == e.length) break;
            y(w);
          }
        }
        return a;
      }, this.$getDisplayTokens = function (n, r) {
        var i,
          o = [];
        r = r || 0;
        for (var a = 0; a < n.length; a++) {
          var s = n.charCodeAt(a);
          if (9 == s) {
            i = this.getScreenTabSize(o.length + r), o.push(f);
            for (var c = 1; c < i; c++) o.push(p);
          } else 32 == s ? o.push(h) : s > 39 && s < 48 || s > 57 && s < 64 ? o.push(l) : s >= 4352 && m(s) ? o.push(e, t) : o.push(e);
        }
        return o;
      }, this.$getStringScreenWidth = function (e, t, n) {
        if (0 == t) return [0, 0];
        var r, i;
        for (null == t && (t = 1 / 0), n = n || 0, i = 0; i < e.length; i++) if (r = e.charCodeAt(i), 9 == r ? n += this.getScreenTabSize(n) : r >= 4352 && m(r) ? n += 2 : n += 1, n > t) break;
        return [n, i];
      }, this.lineWidgets = null, this.getRowLength = function (e) {
        var t = 1;
        return this.lineWidgets && (t += this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0), this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + t : t;
      }, this.getRowLineCount = function (e) {
        return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 : 1;
      }, this.getRowWrapIndent = function (e) {
        if (this.$useWrapMode) {
          var t = this.screenToDocumentPosition(e, Number.MAX_VALUE),
            n = this.$wrapData[t.row];
          return n.length && n[0] < t.column ? n.indent : 0;
        }
        return 0;
      }, this.getScreenLastRowColumn = function (e) {
        var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
        return this.documentToScreenColumn(t.row, t.column);
      }, this.getDocumentLastRowColumn = function (e, t) {
        var n = this.documentToScreenRow(e, t);
        return this.getScreenLastRowColumn(n);
      }, this.getDocumentLastRowColumnPosition = function (e, t) {
        var n = this.documentToScreenRow(e, t);
        return this.screenToDocumentPosition(n, Number.MAX_VALUE / 10);
      }, this.getRowSplitData = function (e) {
        return this.$useWrapMode ? this.$wrapData[e] : void 0;
      }, this.getScreenTabSize = function (e) {
        return this.$tabSize - (e % this.$tabSize | 0);
      }, this.screenToDocumentRow = function (e, t) {
        return this.screenToDocumentPosition(e, t).row;
      }, this.screenToDocumentColumn = function (e, t) {
        return this.screenToDocumentPosition(e, t).column;
      }, this.screenToDocumentPosition = function (e, t, n) {
        if (e < 0) return {
          row: 0,
          column: 0
        };
        var r,
          i,
          o = 0,
          a = 0,
          s = 0,
          l = 0,
          c = this.$screenRowCache,
          u = this.$getRowCacheIndex(c, e),
          h = c.length;
        if (h && u >= 0) {
          s = c[u], o = this.$docRowCache[u];
          var f = e > c[h - 1];
        } else f = !h;
        var d = this.getLength() - 1,
          p = this.getNextFoldLine(o),
          m = p ? p.start.row : 1 / 0;
        while (s <= e) {
          if (l = this.getRowLength(o), s + l > e || o >= d) break;
          s += l, o++, o > m && (o = p.end.row + 1, p = this.getNextFoldLine(o, p), m = p ? p.start.row : 1 / 0), f && (this.$docRowCache.push(o), this.$screenRowCache.push(s));
        }
        if (p && p.start.row <= o) r = this.getFoldDisplayLine(p), o = p.start.row;else {
          if (s + l <= e || o > d) return {
            row: d,
            column: this.getLine(d).length
          };
          r = this.getLine(o), p = null;
        }
        var g = 0,
          v = Math.floor(e - s);
        if (this.$useWrapMode) {
          var y = this.$wrapData[o];
          y && (i = y[v], v > 0 && y.length && (g = y.indent, a = y[v - 1] || y[y.length - 1], r = r.substring(a)));
        }
        return void 0 !== n && this.$bidiHandler.isBidiRow(s + v, o, v) && (t = this.$bidiHandler.offsetToCol(n)), a += this.$getStringScreenWidth(r, t - g)[1], this.$useWrapMode && a >= i && (a = i - 1), p ? p.idxToPosition(a) : {
          row: o,
          column: a
        };
      }, this.documentToScreenPosition = function (e, t) {
        if ("undefined" === typeof t) var n = this.$clipPositionToDocument(e.row, e.column);else n = this.$clipPositionToDocument(e, t);
        e = n.row, t = n.column;
        var r = 0,
          i = null,
          o = null;
        o = this.getFoldAt(e, t, 1), o && (e = o.start.row, t = o.start.column);
        var a,
          s = 0,
          l = this.$docRowCache,
          c = this.$getRowCacheIndex(l, e),
          u = l.length;
        if (u && c >= 0) {
          s = l[c], r = this.$screenRowCache[c];
          var h = e > l[u - 1];
        } else h = !u;
        var f = this.getNextFoldLine(s),
          d = f ? f.start.row : 1 / 0;
        while (s < e) {
          if (s >= d) {
            if (a = f.end.row + 1, a > e) break;
            f = this.getNextFoldLine(a, f), d = f ? f.start.row : 1 / 0;
          } else a = s + 1;
          r += this.getRowLength(s), s = a, h && (this.$docRowCache.push(s), this.$screenRowCache.push(r));
        }
        var p = "";
        f && s >= d ? (p = this.getFoldDisplayLine(f, e, t), i = f.start.row) : (p = this.getLine(e).substring(0, t), i = e);
        var m = 0;
        if (this.$useWrapMode) {
          var g = this.$wrapData[i];
          if (g) {
            var v = 0;
            while (p.length >= g[v]) r++, v++;
            p = p.substring(g[v - 1] || 0, p.length), m = v > 0 ? g.indent : 0;
          }
        }
        return this.lineWidgets && this.lineWidgets[s] && this.lineWidgets[s].rowsAbove && (r += this.lineWidgets[s].rowsAbove), {
          row: r,
          column: m + this.$getStringScreenWidth(p)[0]
        };
      }, this.documentToScreenColumn = function (e, t) {
        return this.documentToScreenPosition(e, t).column;
      }, this.documentToScreenRow = function (e, t) {
        return this.documentToScreenPosition(e, t).row;
      }, this.getScreenLength = function () {
        var e = 0,
          t = null;
        if (this.$useWrapMode) {
          var n = this.$wrapData.length,
            r = 0,
            i = (s = 0, t = this.$foldData[s++], t ? t.start.row : 1 / 0);
          while (r < n) {
            var o = this.$wrapData[r];
            e += o ? o.length + 1 : 1, r++, r > i && (r = t.end.row + 1, t = this.$foldData[s++], i = t ? t.start.row : 1 / 0);
          }
        } else {
          e = this.getLength();
          for (var a = this.$foldData, s = 0; s < a.length; s++) t = a[s], e -= t.end.row - t.start.row;
        }
        return this.lineWidgets && (e += this.$getWidgetScreenLength()), e;
      }, this.$setFontMetrics = function (e) {
        this.$enableVarChar && (this.$getStringScreenWidth = function (t, n, r) {
          if (0 === n) return [0, 0];
          var i, o;
          for (n || (n = 1 / 0), r = r || 0, o = 0; o < t.length; o++) if (i = t.charAt(o), r += "\t" === i ? this.getScreenTabSize(r) : e.getCharacterWidth(i), r > n) break;
          return [r, o];
        });
      }, this.destroy = function () {
        this.destroyed || (this.bgTokenizer.setDocument(null), this.bgTokenizer.cleanup(), this.destroyed = !0), this.$stopWorker(), this.removeAllListeners(), this.doc && this.doc.off("change", this.$onChange), this.selection.detach();
      }, this.isFullWidth = m;
    }.call(p.prototype), e("./edit_session/folding").Folding.call(p.prototype), e("./edit_session/bracket_match").BracketMatch.call(p.prototype), a.defineOptions(p.prototype, "session", {
      wrap: {
        set: function (e) {
          if (e && "off" != e ? "free" == e ? e = !0 : "printMargin" == e ? e = -1 : "string" == typeof e && (e = parseInt(e, 10) || !1) : e = !1, this.$wrap != e) if (this.$wrap = e, e) {
            var t = "number" == typeof e ? e : null;
            this.setWrapLimitRange(t, t), this.setUseWrapMode(!0);
          } else this.setUseWrapMode(!1);
        },
        get: function () {
          return this.getUseWrapMode() ? -1 == this.$wrap ? "printMargin" : this.getWrapLimitRange().min ? this.$wrap : "free" : "off";
        },
        handlesSet: !0
      },
      wrapMethod: {
        set: function (e) {
          e = "auto" == e ? "text" != this.$mode.type : "text" != e, e != this.$wrapAsCode && (this.$wrapAsCode = e, this.$useWrapMode && (this.$useWrapMode = !1, this.setUseWrapMode(!0)));
        },
        initialValue: "auto"
      },
      indentedSoftWrap: {
        set: function () {
          this.$useWrapMode && (this.$useWrapMode = !1, this.setUseWrapMode(!0));
        },
        initialValue: !0
      },
      firstLineNumber: {
        set: function () {
          this._signal("changeBreakpoint");
        },
        initialValue: 1
      },
      useWorker: {
        set: function (e) {
          this.$useWorker = e, this.$stopWorker(), e && this.$startWorker();
        },
        initialValue: !0
      },
      useSoftTabs: {
        initialValue: !0
      },
      tabSize: {
        set: function (e) {
          e = parseInt(e), e > 0 && this.$tabSize !== e && (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._signal("changeTabSize"));
        },
        initialValue: 4,
        handlesSet: !0
      },
      navigateWithinSoftTabs: {
        initialValue: !1
      },
      foldStyle: {
        set: function (e) {
          this.setFoldStyle(e);
        },
        handlesSet: !0
      },
      overwrite: {
        set: function (e) {
          this._signal("changeOverwrite");
        },
        initialValue: !1
      },
      newLineMode: {
        set: function (e) {
          this.doc.setNewLineMode(e);
        },
        get: function () {
          return this.doc.getNewLineMode();
        },
        handlesSet: !0
      },
      mode: {
        set: function (e) {
          this.setMode(e);
        },
        get: function () {
          return this.$modeId;
        },
        handlesSet: !0
      }
    }), t.EditSession = p;
  }), ace.define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("./lib/lang"),
      i = e("./lib/oop"),
      o = e("./range").Range,
      a = function () {
        this.$options = {};
      };
    function s(e, t) {
      function n(e) {
        return /\w/.test(e) || t.regExp ? "\\b" : "";
      }
      return n(e[0]) + e + n(e[e.length - 1]);
    }
    (function () {
      this.set = function (e) {
        return i.mixin(this.$options, e), this;
      }, this.getOptions = function () {
        return r.copyObject(this.$options);
      }, this.setOptions = function (e) {
        this.$options = e;
      }, this.find = function (e) {
        var t = this.$options,
          n = this.$matchIterator(e, t);
        if (!n) return !1;
        var r = null;
        return n.forEach(function (e, n, i, a) {
          return r = new o(e, n, i, a), !(n == a && t.start && t.start.start && 0 != t.skipCurrent && r.isEqual(t.start)) || (r = null, !1);
        }), r;
      }, this.findAll = function (e) {
        var t = this.$options;
        if (!t.needle) return [];
        this.$assembleRegExp(t);
        var n = t.range,
          i = n ? e.getLines(n.start.row, n.end.row) : e.doc.getAllLines(),
          a = [],
          s = t.re;
        if (t.$isMultiLine) {
          var l,
            c = s.length,
            u = i.length - c;
          e: for (var h = s.offset || 0; h <= u; h++) {
            for (var f = 0; f < c; f++) if (-1 == i[h + f].search(s[f])) continue e;
            var d = i[h],
              p = i[h + c - 1],
              m = d.length - d.match(s[0])[0].length,
              g = p.match(s[c - 1])[0].length;
            l && l.end.row === h && l.end.column > m || (a.push(l = new o(h, m, h + c - 1, g)), c > 2 && (h = h + c - 2));
          }
        } else for (var v = 0; v < i.length; v++) {
          var y = r.getMatchOffsets(i[v], s);
          for (f = 0; f < y.length; f++) {
            var b = y[f];
            a.push(new o(v, b.offset, v, b.offset + b.length));
          }
        }
        if (n) {
          var w = n.start.column,
            x = n.end.column;
          v = 0, f = a.length - 1;
          while (v < f && a[v].start.column < w && 0 == a[v].start.row) v++;
          var _ = n.end.row - n.start.row;
          while (v < f && a[f].end.column > x && a[f].end.row == _) f--;
          for (a = a.slice(v, f + 1), v = 0, f = a.length; v < f; v++) a[v].start.row += n.start.row, a[v].end.row += n.start.row;
        }
        return a;
      }, this.replace = function (e, t) {
        var n = this.$options,
          r = this.$assembleRegExp(n);
        if (n.$isMultiLine) return t;
        if (r) {
          var i = r.exec(e);
          if (!i || i[0].length != e.length) return null;
          if (t = e.replace(r, t), n.preserveCase) {
            t = t.split("");
            for (var o = Math.min(e.length, e.length); o--;) {
              var a = e[o];
              a && a.toLowerCase() != a ? t[o] = t[o].toUpperCase() : t[o] = t[o].toLowerCase();
            }
            t = t.join("");
          }
          return t;
        }
      }, this.$assembleRegExp = function (e, t) {
        if (e.needle instanceof RegExp) return e.re = e.needle;
        var n = e.needle;
        if (!e.needle) return e.re = !1;
        e.regExp || (n = r.escapeRegExp(n)), e.wholeWord && (n = s(n, e));
        var i = e.caseSensitive ? "gm" : "gmi";
        if (e.$isMultiLine = !t && /[\n\r]/.test(n), e.$isMultiLine) return e.re = this.$assembleMultilineRegExp(n, i);
        try {
          var o = new RegExp(n, i);
        } catch (e) {
          o = !1;
        }
        return e.re = o;
      }, this.$assembleMultilineRegExp = function (e, t) {
        for (var n = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), r = [], i = 0; i < n.length; i++) try {
          r.push(new RegExp(n[i], t));
        } catch (e) {
          return !1;
        }
        return r;
      }, this.$matchIterator = function (e, t) {
        var n = this.$assembleRegExp(t);
        if (!n) return !1;
        var r = 1 == t.backwards,
          i = 0 != t.skipCurrent,
          o = t.range,
          a = t.start;
        a || (a = o ? o[r ? "end" : "start"] : e.selection.getRange()), a.start && (a = a[i != r ? "end" : "start"]);
        var s = o ? o.start.row : 0,
          l = o ? o.end.row : e.getLength() - 1;
        if (r) var c = function (e) {
          var n = a.row;
          if (!h(n, a.column, e)) {
            for (n--; n >= s; n--) if (h(n, Number.MAX_VALUE, e)) return;
            if (0 != t.wrap) for (n = l, s = a.row; n >= s; n--) if (h(n, Number.MAX_VALUE, e)) return;
          }
        };else c = function (e) {
          var n = a.row;
          if (!h(n, a.column, e)) {
            for (n += 1; n <= l; n++) if (h(n, 0, e)) return;
            if (0 != t.wrap) for (n = s, l = a.row; n <= l; n++) if (h(n, 0, e)) return;
          }
        };
        if (t.$isMultiLine) var u = n.length,
          h = function (t, i, o) {
            var a = r ? t - u + 1 : t;
            if (!(a < 0 || a + u > e.getLength())) {
              var s = e.getLine(a),
                l = s.search(n[0]);
              if (!(!r && l < i || -1 === l)) {
                for (var c = 1; c < u; c++) if (s = e.getLine(a + c), -1 == s.search(n[c])) return;
                var h = s.match(n[u - 1])[0].length;
                if (!(r && h > i)) return !!o(a, l, a + u - 1, h) || void 0;
              }
            }
          };else if (r) h = function (t, r, i) {
          var o,
            a = e.getLine(t),
            s = [],
            l = 0;
          n.lastIndex = 0;
          while (o = n.exec(a)) {
            var c = o[0].length;
            if (l = o.index, !c) {
              if (l >= a.length) break;
              n.lastIndex = l += 1;
            }
            if (o.index + c > r) break;
            s.push(o.index, c);
          }
          for (var u = s.length - 1; u >= 0; u -= 2) {
            var h = s[u - 1];
            c = s[u];
            if (i(t, h, t, h + c)) return !0;
          }
        };else h = function (t, r, i) {
          var o,
            a,
            s = e.getLine(t);
          n.lastIndex = r;
          while (a = n.exec(s)) {
            var l = a[0].length;
            if (o = a.index, i(t, o, t, o + l)) return !0;
            if (!l && (n.lastIndex = o += 1, o >= s.length)) return !1;
          }
        };
        return {
          forEach: c
        };
      };
    }).call(a.prototype), t.Search = a;
  }), ace.define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function (e, t, n) {
    "use strict";

    var r = e("../lib/keys"),
      i = e("../lib/useragent"),
      o = r.KEY_MODS;
    function a(e, t) {
      this.platform = t || (i.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.addCommands(e), this.$singleCommand = !0;
    }
    function s(e, t) {
      a.call(this, e, t), this.$singleCommand = !1;
    }
    s.prototype = a.prototype, function () {
      function e(e) {
        return "object" == typeof e && e.bindKey && e.bindKey.position || (e.isDefault ? -100 : 0);
      }
      this.addCommand = function (e) {
        this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e);
      }, this.removeCommand = function (e, t) {
        var n = e && ("string" === typeof e ? e : e.name);
        e = this.commands[n], t || delete this.commands[n];
        var r = this.commandKeyBinding;
        for (var i in r) {
          var o = r[i];
          if (o == e) delete r[i];else if (Array.isArray(o)) {
            var a = o.indexOf(e);
            -1 != a && (o.splice(a, 1), 1 == o.length && (r[i] = o[0]));
          }
        }
      }, this.bindKey = function (e, t, n) {
        if ("object" == typeof e && e && (void 0 == n && (n = e.position), e = e[this.platform]), e) return "function" == typeof t ? this.addCommand({
          exec: t,
          bindKey: e,
          name: t.name || e
        }) : void e.split("|").forEach(function (e) {
          var r = "";
          if (-1 != e.indexOf(" ")) {
            var i = e.split(/\s+/);
            e = i.pop(), i.forEach(function (e) {
              var t = this.parseKeys(e),
                n = o[t.hashId] + t.key;
              r += (r ? " " : "") + n, this._addCommandToBinding(r, "chainKeys");
            }, this), r += " ";
          }
          var a = this.parseKeys(e),
            s = o[a.hashId] + a.key;
          this._addCommandToBinding(r + s, t, n);
        }, this);
      }, this._addCommandToBinding = function (t, n, r) {
        var i,
          o = this.commandKeyBinding;
        if (n) {
          if (!o[t] || this.$singleCommand) o[t] = n;else {
            Array.isArray(o[t]) ? -1 != (i = o[t].indexOf(n)) && o[t].splice(i, 1) : o[t] = [o[t]], "number" != typeof r && (r = e(n));
            var a = o[t];
            for (i = 0; i < a.length; i++) {
              var s = a[i],
                l = e(s);
              if (l > r) break;
            }
            a.splice(i, 0, n);
          }
        } else delete o[t];
      }, this.addCommands = function (e) {
        e && Object.keys(e).forEach(function (t) {
          var n = e[t];
          if (n) {
            if ("string" === typeof n) return this.bindKey(n, t);
            "function" === typeof n && (n = {
              exec: n
            }), "object" === typeof n && (n.name || (n.name = t), this.addCommand(n));
          }
        }, this);
      }, this.removeCommands = function (e) {
        Object.keys(e).forEach(function (t) {
          this.removeCommand(e[t]);
        }, this);
      }, this.bindKeys = function (e) {
        Object.keys(e).forEach(function (t) {
          this.bindKey(t, e[t]);
        }, this);
      }, this._buildKeyHash = function (e) {
        this.bindKey(e.bindKey, e);
      }, this.parseKeys = function (e) {
        var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function (e) {
            return e;
          }),
          n = t.pop(),
          i = r[n];
        if (r.FUNCTION_KEYS[i]) n = r.FUNCTION_KEYS[i].toLowerCase();else {
          if (!t.length) return {
            key: n,
            hashId: -1
          };
          if (1 == t.length && "shift" == t[0]) return {
            key: n.toUpperCase(),
            hashId: -1
          };
        }
        for (var o = 0, a = t.length; a--;) {
          var s = r.KEY_MODS[t[a]];
          if (null == s) return "undefined" != typeof console && console.error("invalid modifier " + t[a] + " in " + e), !1;
          o |= s;
        }
        return {
          key: n,
          hashId: o
        };
      }, this.findKeyCommand = function (e, t) {
        var n = o[e] + t;
        return this.commandKeyBinding[n];
      }, this.handleKeyboard = function (e, t, n, r) {
        if (!(r < 0)) {
          var i = o[t] + n,
            a = this.commandKeyBinding[i];
          return e.$keyChain && (e.$keyChain += " " + i, a = this.commandKeyBinding[e.$keyChain] || a), !a || "chainKeys" != a && "chainKeys" != a[a.length - 1] ? (e.$keyChain && (t && 4 != t || 1 != n.length ? (-1 == t || r > 0) && (e.$keyChain = "") : e.$keyChain = e.$keyChain.slice(0, -i.length - 1)), {
            command: a
          }) : (e.$keyChain = e.$keyChain || i, {
            command: "null"
          });
        }
      }, this.getStatusText = function (e, t) {
        return t.$keyChain || "";
      };
    }.call(a.prototype), t.HashHandler = a, t.MultiHashHandler = s;
  }), ace.define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function (e, t, n) {
    "use strict";

    var r = e("../lib/oop"),
      i = e("../keyboard/hash_handler").MultiHashHandler,
      o = e("../lib/event_emitter").EventEmitter,
      a = function (e, t) {
        i.call(this, t, e), this.byName = this.commands, this.setDefaultHandler("exec", function (e) {
          return e.args ? e.command.exec(e.editor, e.args, e.event, !1) : e.command.exec(e.editor, {}, e.event, !0);
        });
      };
    r.inherits(a, i), function () {
      r.implement(this, o), this.exec = function (e, t, n) {
        if (Array.isArray(e)) {
          for (var r = e.length; r--;) if (this.exec(e[r], t, n)) return !0;
          return !1;
        }
        if ("string" === typeof e && (e = this.commands[e]), !e) return !1;
        if (t && t.$readOnly && !e.readOnly) return !1;
        if (0 != this.$checkCommandState && e.isAvailable && !e.isAvailable(t)) return !1;
        var i = {
          editor: t,
          command: e,
          args: n
        };
        return i.returnValue = this._emit("exec", i), this._signal("afterExec", i), !1 !== i.returnValue;
      }, this.toggleRecording = function (e) {
        if (!this.$inReplay) return e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.off("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function (e) {
          this.macro.push([e.command, e.args]);
        }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0);
      }, this.replay = function (e) {
        if (!this.$inReplay && this.macro) {
          if (this.recording) return this.toggleRecording(e);
          try {
            this.$inReplay = !0, this.macro.forEach(function (t) {
              "string" == typeof t ? this.exec(t, e) : this.exec(t[0], e, t[1]);
            }, this);
          } finally {
            this.$inReplay = !1;
          }
        }
      }, this.trimMacro = function (e) {
        return e.map(function (e) {
          return "string" != typeof e[0] && (e[0] = e[0].name), e[1] || (e = e[0]), e;
        });
      };
    }.call(a.prototype), t.CommandManager = a;
  }), ace.define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("../lib/lang"),
      i = e("../config"),
      o = e("../range").Range;
    function a(e, t) {
      return {
        win: e,
        mac: t
      };
    }
    t.commands = [{
      name: "showSettingsMenu",
      description: "Show settings menu",
      bindKey: a("Ctrl-,", "Command-,"),
      exec: function (e) {
        i.loadModule("ace/ext/settings_menu", function (t) {
          t.init(e), e.showSettingsMenu();
        });
      },
      readOnly: !0
    }, {
      name: "goToNextError",
      description: "Go to next error",
      bindKey: a("Alt-E", "F4"),
      exec: function (e) {
        i.loadModule("./ext/error_marker", function (t) {
          t.showErrorMarker(e, 1);
        });
      },
      scrollIntoView: "animate",
      readOnly: !0
    }, {
      name: "goToPreviousError",
      description: "Go to previous error",
      bindKey: a("Alt-Shift-E", "Shift-F4"),
      exec: function (e) {
        i.loadModule("./ext/error_marker", function (t) {
          t.showErrorMarker(e, -1);
        });
      },
      scrollIntoView: "animate",
      readOnly: !0
    }, {
      name: "selectall",
      description: "Select all",
      bindKey: a("Ctrl-A", "Command-A"),
      exec: function (e) {
        e.selectAll();
      },
      readOnly: !0
    }, {
      name: "centerselection",
      description: "Center selection",
      bindKey: a(null, "Ctrl-L"),
      exec: function (e) {
        e.centerSelection();
      },
      readOnly: !0
    }, {
      name: "gotoline",
      description: "Go to line...",
      bindKey: a("Ctrl-L", "Command-L"),
      exec: function (e, t) {
        "number" !== typeof t || isNaN(t) || e.gotoLine(t), e.prompt({
          $type: "gotoLine"
        });
      },
      readOnly: !0
    }, {
      name: "fold",
      bindKey: a("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
      exec: function (e) {
        e.session.toggleFold(!1);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "unfold",
      bindKey: a("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
      exec: function (e) {
        e.session.toggleFold(!0);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "toggleFoldWidget",
      description: "Toggle fold widget",
      bindKey: a("F2", "F2"),
      exec: function (e) {
        e.session.toggleFoldWidget();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "toggleParentFoldWidget",
      description: "Toggle parent fold widget",
      bindKey: a("Alt-F2", "Alt-F2"),
      exec: function (e) {
        e.session.toggleFoldWidget(!0);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "foldall",
      description: "Fold all",
      bindKey: a(null, "Ctrl-Command-Option-0"),
      exec: function (e) {
        e.session.foldAll();
      },
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "foldAllComments",
      description: "Fold all comments",
      bindKey: a(null, "Ctrl-Command-Option-0"),
      exec: function (e) {
        e.session.foldAllComments();
      },
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "foldOther",
      description: "Fold other",
      bindKey: a("Alt-0", "Command-Option-0"),
      exec: function (e) {
        e.session.foldAll(), e.session.unfold(e.selection.getAllRanges());
      },
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "unfoldall",
      description: "Unfold all",
      bindKey: a("Alt-Shift-0", "Command-Option-Shift-0"),
      exec: function (e) {
        e.session.unfold();
      },
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "findnext",
      description: "Find next",
      bindKey: a("Ctrl-K", "Command-G"),
      exec: function (e) {
        e.findNext();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "findprevious",
      description: "Find previous",
      bindKey: a("Ctrl-Shift-K", "Command-Shift-G"),
      exec: function (e) {
        e.findPrevious();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "center",
      readOnly: !0
    }, {
      name: "selectOrFindNext",
      description: "Select or find next",
      bindKey: a("Alt-K", "Ctrl-G"),
      exec: function (e) {
        e.selection.isEmpty() ? e.selection.selectWord() : e.findNext();
      },
      readOnly: !0
    }, {
      name: "selectOrFindPrevious",
      description: "Select or find previous",
      bindKey: a("Alt-Shift-K", "Ctrl-Shift-G"),
      exec: function (e) {
        e.selection.isEmpty() ? e.selection.selectWord() : e.findPrevious();
      },
      readOnly: !0
    }, {
      name: "find",
      description: "Find",
      bindKey: a("Ctrl-F", "Command-F"),
      exec: function (e) {
        i.loadModule("ace/ext/searchbox", function (t) {
          t.Search(e);
        });
      },
      readOnly: !0
    }, {
      name: "overwrite",
      description: "Overwrite",
      bindKey: "Insert",
      exec: function (e) {
        e.toggleOverwrite();
      },
      readOnly: !0
    }, {
      name: "selecttostart",
      description: "Select to start",
      bindKey: a("Ctrl-Shift-Home", "Command-Shift-Home|Command-Shift-Up"),
      exec: function (e) {
        e.getSelection().selectFileStart();
      },
      multiSelectAction: "forEach",
      readOnly: !0,
      scrollIntoView: "animate",
      aceCommandGroup: "fileJump"
    }, {
      name: "gotostart",
      description: "Go to start",
      bindKey: a("Ctrl-Home", "Command-Home|Command-Up"),
      exec: function (e) {
        e.navigateFileStart();
      },
      multiSelectAction: "forEach",
      readOnly: !0,
      scrollIntoView: "animate",
      aceCommandGroup: "fileJump"
    }, {
      name: "selectup",
      description: "Select up",
      bindKey: a("Shift-Up", "Shift-Up|Ctrl-Shift-P"),
      exec: function (e) {
        e.getSelection().selectUp();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "golineup",
      description: "Go line up",
      bindKey: a("Up", "Up|Ctrl-P"),
      exec: function (e, t) {
        e.navigateUp(t.times);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selecttoend",
      description: "Select to end",
      bindKey: a("Ctrl-Shift-End", "Command-Shift-End|Command-Shift-Down"),
      exec: function (e) {
        e.getSelection().selectFileEnd();
      },
      multiSelectAction: "forEach",
      readOnly: !0,
      scrollIntoView: "animate",
      aceCommandGroup: "fileJump"
    }, {
      name: "gotoend",
      description: "Go to end",
      bindKey: a("Ctrl-End", "Command-End|Command-Down"),
      exec: function (e) {
        e.navigateFileEnd();
      },
      multiSelectAction: "forEach",
      readOnly: !0,
      scrollIntoView: "animate",
      aceCommandGroup: "fileJump"
    }, {
      name: "selectdown",
      description: "Select down",
      bindKey: a("Shift-Down", "Shift-Down|Ctrl-Shift-N"),
      exec: function (e) {
        e.getSelection().selectDown();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "golinedown",
      description: "Go line down",
      bindKey: a("Down", "Down|Ctrl-N"),
      exec: function (e, t) {
        e.navigateDown(t.times);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectwordleft",
      description: "Select word left",
      bindKey: a("Ctrl-Shift-Left", "Option-Shift-Left"),
      exec: function (e) {
        e.getSelection().selectWordLeft();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "gotowordleft",
      description: "Go to word left",
      bindKey: a("Ctrl-Left", "Option-Left"),
      exec: function (e) {
        e.navigateWordLeft();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selecttolinestart",
      description: "Select to line start",
      bindKey: a("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"),
      exec: function (e) {
        e.getSelection().selectLineStart();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "gotolinestart",
      description: "Go to line start",
      bindKey: a("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
      exec: function (e) {
        e.navigateLineStart();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectleft",
      description: "Select left",
      bindKey: a("Shift-Left", "Shift-Left|Ctrl-Shift-B"),
      exec: function (e) {
        e.getSelection().selectLeft();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "gotoleft",
      description: "Go to left",
      bindKey: a("Left", "Left|Ctrl-B"),
      exec: function (e, t) {
        e.navigateLeft(t.times);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectwordright",
      description: "Select word right",
      bindKey: a("Ctrl-Shift-Right", "Option-Shift-Right"),
      exec: function (e) {
        e.getSelection().selectWordRight();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "gotowordright",
      description: "Go to word right",
      bindKey: a("Ctrl-Right", "Option-Right"),
      exec: function (e) {
        e.navigateWordRight();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selecttolineend",
      description: "Select to line end",
      bindKey: a("Alt-Shift-Right", "Command-Shift-Right|Shift-End|Ctrl-Shift-E"),
      exec: function (e) {
        e.getSelection().selectLineEnd();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "gotolineend",
      description: "Go to line end",
      bindKey: a("Alt-Right|End", "Command-Right|End|Ctrl-E"),
      exec: function (e) {
        e.navigateLineEnd();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectright",
      description: "Select right",
      bindKey: a("Shift-Right", "Shift-Right"),
      exec: function (e) {
        e.getSelection().selectRight();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "gotoright",
      description: "Go to right",
      bindKey: a("Right", "Right|Ctrl-F"),
      exec: function (e, t) {
        e.navigateRight(t.times);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectpagedown",
      description: "Select page down",
      bindKey: "Shift-PageDown",
      exec: function (e) {
        e.selectPageDown();
      },
      readOnly: !0
    }, {
      name: "pagedown",
      description: "Page down",
      bindKey: a(null, "Option-PageDown"),
      exec: function (e) {
        e.scrollPageDown();
      },
      readOnly: !0
    }, {
      name: "gotopagedown",
      description: "Go to page down",
      bindKey: a("PageDown", "PageDown|Ctrl-V"),
      exec: function (e) {
        e.gotoPageDown();
      },
      readOnly: !0
    }, {
      name: "selectpageup",
      description: "Select page up",
      bindKey: "Shift-PageUp",
      exec: function (e) {
        e.selectPageUp();
      },
      readOnly: !0
    }, {
      name: "pageup",
      description: "Page up",
      bindKey: a(null, "Option-PageUp"),
      exec: function (e) {
        e.scrollPageUp();
      },
      readOnly: !0
    }, {
      name: "gotopageup",
      description: "Go to page up",
      bindKey: "PageUp",
      exec: function (e) {
        e.gotoPageUp();
      },
      readOnly: !0
    }, {
      name: "scrollup",
      description: "Scroll up",
      bindKey: a("Ctrl-Up", null),
      exec: function (e) {
        e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight);
      },
      readOnly: !0
    }, {
      name: "scrolldown",
      description: "Scroll down",
      bindKey: a("Ctrl-Down", null),
      exec: function (e) {
        e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight);
      },
      readOnly: !0
    }, {
      name: "selectlinestart",
      description: "Select line start",
      bindKey: "Shift-Home",
      exec: function (e) {
        e.getSelection().selectLineStart();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectlineend",
      description: "Select line end",
      bindKey: "Shift-End",
      exec: function (e) {
        e.getSelection().selectLineEnd();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "togglerecording",
      description: "Toggle recording",
      bindKey: a("Ctrl-Alt-E", "Command-Option-E"),
      exec: function (e) {
        e.commands.toggleRecording(e);
      },
      readOnly: !0
    }, {
      name: "replaymacro",
      description: "Replay macro",
      bindKey: a("Ctrl-Shift-E", "Command-Shift-E"),
      exec: function (e) {
        e.commands.replay(e);
      },
      readOnly: !0
    }, {
      name: "jumptomatching",
      description: "Jump to matching",
      bindKey: a("Ctrl-\\|Ctrl-P", "Command-\\"),
      exec: function (e) {
        e.jumpToMatching();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "animate",
      readOnly: !0
    }, {
      name: "selecttomatching",
      description: "Select to matching",
      bindKey: a("Ctrl-Shift-\\|Ctrl-Shift-P", "Command-Shift-\\"),
      exec: function (e) {
        e.jumpToMatching(!0);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "animate",
      readOnly: !0
    }, {
      name: "expandToMatching",
      description: "Expand to matching",
      bindKey: a("Ctrl-Shift-M", "Ctrl-Shift-M"),
      exec: function (e) {
        e.jumpToMatching(!0, !0);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "animate",
      readOnly: !0
    }, {
      name: "passKeysToBrowser",
      description: "Pass keys to browser",
      bindKey: a(null, null),
      exec: function () {},
      passEvent: !0,
      readOnly: !0
    }, {
      name: "copy",
      description: "Copy",
      exec: function (e) {},
      readOnly: !0
    }, {
      name: "cut",
      description: "Cut",
      exec: function (e) {
        var t = e.$copyWithEmptySelection && e.selection.isEmpty(),
          n = t ? e.selection.getLineRange() : e.selection.getRange();
        e._emit("cut", n), n.isEmpty() || e.session.remove(n), e.clearSelection();
      },
      scrollIntoView: "cursor",
      multiSelectAction: "forEach"
    }, {
      name: "paste",
      description: "Paste",
      exec: function (e, t) {
        e.$handlePaste(t);
      },
      scrollIntoView: "cursor"
    }, {
      name: "removeline",
      description: "Remove line",
      bindKey: a("Ctrl-D", "Command-D"),
      exec: function (e) {
        e.removeLines();
      },
      scrollIntoView: "cursor",
      multiSelectAction: "forEachLine"
    }, {
      name: "duplicateSelection",
      description: "Duplicate selection",
      bindKey: a("Ctrl-Shift-D", "Command-Shift-D"),
      exec: function (e) {
        e.duplicateSelection();
      },
      scrollIntoView: "cursor",
      multiSelectAction: "forEach"
    }, {
      name: "sortlines",
      description: "Sort lines",
      bindKey: a("Ctrl-Alt-S", "Command-Alt-S"),
      exec: function (e) {
        e.sortLines();
      },
      scrollIntoView: "selection",
      multiSelectAction: "forEachLine"
    }, {
      name: "togglecomment",
      description: "Toggle comment",
      bindKey: a("Ctrl-/", "Command-/"),
      exec: function (e) {
        e.toggleCommentLines();
      },
      multiSelectAction: "forEachLine",
      scrollIntoView: "selectionPart"
    }, {
      name: "toggleBlockComment",
      description: "Toggle block comment",
      bindKey: a("Ctrl-Shift-/", "Command-Shift-/"),
      exec: function (e) {
        e.toggleBlockComment();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "selectionPart"
    }, {
      name: "modifyNumberUp",
      description: "Modify number up",
      bindKey: a("Ctrl-Shift-Up", "Alt-Shift-Up"),
      exec: function (e) {
        e.modifyNumber(1);
      },
      scrollIntoView: "cursor",
      multiSelectAction: "forEach"
    }, {
      name: "modifyNumberDown",
      description: "Modify number down",
      bindKey: a("Ctrl-Shift-Down", "Alt-Shift-Down"),
      exec: function (e) {
        e.modifyNumber(-1);
      },
      scrollIntoView: "cursor",
      multiSelectAction: "forEach"
    }, {
      name: "replace",
      description: "Replace",
      bindKey: a("Ctrl-H", "Command-Option-F"),
      exec: function (e) {
        i.loadModule("ace/ext/searchbox", function (t) {
          t.Search(e, !0);
        });
      }
    }, {
      name: "undo",
      description: "Undo",
      bindKey: a("Ctrl-Z", "Command-Z"),
      exec: function (e) {
        e.undo();
      }
    }, {
      name: "redo",
      description: "Redo",
      bindKey: a("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
      exec: function (e) {
        e.redo();
      }
    }, {
      name: "copylinesup",
      description: "Copy lines up",
      bindKey: a("Alt-Shift-Up", "Command-Option-Up"),
      exec: function (e) {
        e.copyLinesUp();
      },
      scrollIntoView: "cursor"
    }, {
      name: "movelinesup",
      description: "Move lines up",
      bindKey: a("Alt-Up", "Option-Up"),
      exec: function (e) {
        e.moveLinesUp();
      },
      scrollIntoView: "cursor"
    }, {
      name: "copylinesdown",
      description: "Copy lines down",
      bindKey: a("Alt-Shift-Down", "Command-Option-Down"),
      exec: function (e) {
        e.copyLinesDown();
      },
      scrollIntoView: "cursor"
    }, {
      name: "movelinesdown",
      description: "Move lines down",
      bindKey: a("Alt-Down", "Option-Down"),
      exec: function (e) {
        e.moveLinesDown();
      },
      scrollIntoView: "cursor"
    }, {
      name: "del",
      description: "Delete",
      bindKey: a("Delete", "Delete|Ctrl-D|Shift-Delete"),
      exec: function (e) {
        e.remove("right");
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "backspace",
      description: "Backspace",
      bindKey: a("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
      exec: function (e) {
        e.remove("left");
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "cut_or_delete",
      description: "Cut or delete",
      bindKey: a("Shift-Delete", null),
      exec: function (e) {
        if (!e.selection.isEmpty()) return !1;
        e.remove("left");
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "removetolinestart",
      description: "Remove to line start",
      bindKey: a("Alt-Backspace", "Command-Backspace"),
      exec: function (e) {
        e.removeToLineStart();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "removetolineend",
      description: "Remove to line end",
      bindKey: a("Alt-Delete", "Ctrl-K|Command-Delete"),
      exec: function (e) {
        e.removeToLineEnd();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "removetolinestarthard",
      description: "Remove to line start hard",
      bindKey: a("Ctrl-Shift-Backspace", null),
      exec: function (e) {
        var t = e.selection.getRange();
        t.start.column = 0, e.session.remove(t);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "removetolineendhard",
      description: "Remove to line end hard",
      bindKey: a("Ctrl-Shift-Delete", null),
      exec: function (e) {
        var t = e.selection.getRange();
        t.end.column = Number.MAX_VALUE, e.session.remove(t);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "removewordleft",
      description: "Remove word left",
      bindKey: a("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
      exec: function (e) {
        e.removeWordLeft();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "removewordright",
      description: "Remove word right",
      bindKey: a("Ctrl-Delete", "Alt-Delete"),
      exec: function (e) {
        e.removeWordRight();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "outdent",
      description: "Outdent",
      bindKey: a("Shift-Tab", "Shift-Tab"),
      exec: function (e) {
        e.blockOutdent();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "selectionPart"
    }, {
      name: "indent",
      description: "Indent",
      bindKey: a("Tab", "Tab"),
      exec: function (e) {
        e.indent();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "selectionPart"
    }, {
      name: "blockoutdent",
      description: "Block outdent",
      bindKey: a("Ctrl-[", "Ctrl-["),
      exec: function (e) {
        e.blockOutdent();
      },
      multiSelectAction: "forEachLine",
      scrollIntoView: "selectionPart"
    }, {
      name: "blockindent",
      description: "Block indent",
      bindKey: a("Ctrl-]", "Ctrl-]"),
      exec: function (e) {
        e.blockIndent();
      },
      multiSelectAction: "forEachLine",
      scrollIntoView: "selectionPart"
    }, {
      name: "insertstring",
      description: "Insert string",
      exec: function (e, t) {
        e.insert(t);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "inserttext",
      description: "Insert text",
      exec: function (e, t) {
        e.insert(r.stringRepeat(t.text || "", t.times || 1));
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "splitline",
      description: "Split line",
      bindKey: a(null, "Ctrl-O"),
      exec: function (e) {
        e.splitLine();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "transposeletters",
      description: "Transpose letters",
      bindKey: a("Alt-Shift-X", "Ctrl-T"),
      exec: function (e) {
        e.transposeLetters();
      },
      multiSelectAction: function (e) {
        e.transposeSelections(1);
      },
      scrollIntoView: "cursor"
    }, {
      name: "touppercase",
      description: "To uppercase",
      bindKey: a("Ctrl-U", "Ctrl-U"),
      exec: function (e) {
        e.toUpperCase();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "tolowercase",
      description: "To lowercase",
      bindKey: a("Ctrl-Shift-U", "Ctrl-Shift-U"),
      exec: function (e) {
        e.toLowerCase();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "autoindent",
      description: "Auto Indent",
      bindKey: a(null, null),
      exec: function (e) {
        e.autoIndent();
      },
      multiSelectAction: "forEachLine",
      scrollIntoView: "animate"
    }, {
      name: "expandtoline",
      description: "Expand to line",
      bindKey: a("Ctrl-Shift-L", "Command-Shift-L"),
      exec: function (e) {
        var t = e.selection.getRange();
        t.start.column = t.end.column = 0, t.end.row++, e.selection.setRange(t, !1);
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "openlink",
      bindKey: a("Ctrl+F3", "F3"),
      exec: function (e) {
        e.openLink();
      }
    }, {
      name: "joinlines",
      description: "Join lines",
      bindKey: a(null, null),
      exec: function (e) {
        for (var t = e.selection.isBackwards(), n = t ? e.selection.getSelectionLead() : e.selection.getSelectionAnchor(), i = t ? e.selection.getSelectionAnchor() : e.selection.getSelectionLead(), a = e.session.doc.getLine(n.row).length, s = e.session.doc.getTextRange(e.selection.getRange()), l = s.replace(/\n\s*/, " ").length, c = e.session.doc.getLine(n.row), u = n.row + 1; u <= i.row + 1; u++) {
          var h = r.stringTrimLeft(r.stringTrimRight(e.session.doc.getLine(u)));
          0 !== h.length && (h = " " + h), c += h;
        }
        i.row + 1 < e.session.doc.getLength() - 1 && (c += e.session.doc.getNewLineCharacter()), e.clearSelection(), e.session.doc.replace(new o(n.row, 0, i.row + 2, 0), c), l > 0 ? (e.selection.moveCursorTo(n.row, n.column), e.selection.selectTo(n.row, n.column + l)) : (a = e.session.doc.getLine(n.row).length > a ? a + 1 : a, e.selection.moveCursorTo(n.row, a));
      },
      multiSelectAction: "forEach",
      readOnly: !0
    }, {
      name: "invertSelection",
      description: "Invert selection",
      bindKey: a(null, null),
      exec: function (e) {
        var t = e.session.doc.getLength() - 1,
          n = e.session.doc.getLine(t).length,
          r = e.selection.rangeList.ranges,
          i = [];
        r.length < 1 && (r = [e.selection.getRange()]);
        for (var a = 0; a < r.length; a++) a == r.length - 1 && (r[a].end.row === t && r[a].end.column === n || i.push(new o(r[a].end.row, r[a].end.column, t, n))), 0 === a ? 0 === r[a].start.row && 0 === r[a].start.column || i.push(new o(0, 0, r[a].start.row, r[a].start.column)) : i.push(new o(r[a - 1].end.row, r[a - 1].end.column, r[a].start.row, r[a].start.column));
        e.exitMultiSelectMode(), e.clearSelection();
        for (a = 0; a < i.length; a++) e.selection.addRange(i[a], !1);
      },
      readOnly: !0,
      scrollIntoView: "none"
    }, {
      name: "addLineAfter",
      description: "Add new line after the current line",
      exec: function (e) {
        e.selection.clearSelection(), e.navigateLineEnd(), e.insert("\n");
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "addLineBefore",
      description: "Add new line before the current line",
      exec: function (e) {
        e.selection.clearSelection();
        var t = e.getCursorPosition();
        e.selection.moveTo(t.row - 1, Number.MAX_VALUE), e.insert("\n"), 0 === t.row && e.navigateUp();
      },
      multiSelectAction: "forEach",
      scrollIntoView: "cursor"
    }, {
      name: "openCommandPallete",
      description: "Open command palette",
      bindKey: a("F1", "F1"),
      exec: function (e) {
        e.prompt({
          $type: "commands"
        });
      },
      readOnly: !0
    }, {
      name: "modeSelect",
      description: "Change language mode...",
      bindKey: a(null, null),
      exec: function (e) {
        e.prompt({
          $type: "modes"
        });
      },
      readOnly: !0
    }];
    for (var s = 1; s < 9; s++) t.commands.push({
      name: "foldToLevel" + s,
      description: "Fold To Level " + s,
      level: s,
      exec: function (e) {
        e.session.foldToLevel(this.level);
      },
      scrollIntoView: "center",
      readOnly: !0
    });
  }), ace.define("ace/editor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config", "ace/token_iterator", "ace/clipboard"], function (e, t, n) {
    "use strict";

    var r = this && this.__values || function (e) {
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
      },
      i = e("./lib/oop"),
      o = e("./lib/dom"),
      a = e("./lib/lang"),
      s = e("./lib/useragent"),
      l = e("./keyboard/textinput").TextInput,
      c = e("./mouse/mouse_handler").MouseHandler,
      u = e("./mouse/fold_handler").FoldHandler,
      h = e("./keyboard/keybinding").KeyBinding,
      f = e("./edit_session").EditSession,
      d = e("./search").Search,
      p = e("./range").Range,
      m = e("./lib/event_emitter").EventEmitter,
      g = e("./commands/command_manager").CommandManager,
      v = e("./commands/default_commands").commands,
      y = e("./config"),
      b = e("./token_iterator").TokenIterator,
      w = e("./clipboard"),
      x = function (e, t, n) {
        this.$toDestroy = [];
        var r = e.getContainerElement();
        this.container = r, this.renderer = e, this.id = "editor" + ++x.$uid, this.commands = new g(s.isMac ? "mac" : "win", v), "object" == typeof document && (this.textInput = new l(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.$mouseHandler = new c(this), new u(this)), this.keyBinding = new h(this), this.$search = new d().set({
          wrap: !0
        }), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = a.delayedCall(function () {
          this._signal("input", {}), this.session && !this.session.destroyed && this.session.bgTokenizer.scheduleStart();
        }.bind(this)), this.on("change", function (e, t) {
          t._$emitInputEvent.schedule(31);
        }), this.setSession(t || n && n.session || new f("")), y.resetOptions(this), n && this.setOptions(n), y._signal("editor", this);
      };
    x.$uid = 0, function () {
      i.implement(this, m), this.$initOperationListeners = function () {
        this.commands.on("exec", this.startOperation.bind(this), !0), this.commands.on("afterExec", this.endOperation.bind(this), !0), this.$opResetTimer = a.delayedCall(this.endOperation.bind(this, !0)), this.on("change", function () {
          this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.docChanged = !0;
        }.bind(this), !0), this.on("changeSelection", function () {
          this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.selectionChanged = !0;
        }.bind(this), !0);
      }, this.curOp = null, this.prevOp = {}, this.startOperation = function (e) {
        if (this.curOp) {
          if (!e || this.curOp.command) return;
          this.prevOp = this.curOp;
        }
        e || (this.previousCommand = null, e = {}), this.$opResetTimer.schedule(), this.curOp = this.session.curOp = {
          command: e.command || {},
          args: e.args,
          scrollTop: this.renderer.scrollTop
        }, this.curOp.selectionBefore = this.selection.toJSON();
      }, this.endOperation = function (e) {
        if (this.curOp && this.session) {
          if (e && !1 === e.returnValue || !this.session) return this.curOp = null;
          if (1 == e && this.curOp.command && "mouse" == this.curOp.command.name) return;
          if (this._signal("beforeEndOperation"), !this.curOp) return;
          var t = this.curOp.command,
            n = t && t.scrollIntoView;
          if (n) {
            switch (n) {
              case "center-animate":
                n = "animate";
              case "center":
                this.renderer.scrollCursorIntoView(null, .5);
                break;
              case "animate":
              case "cursor":
                this.renderer.scrollCursorIntoView();
                break;
              case "selectionPart":
                var r = this.selection.getRange(),
                  i = this.renderer.layerConfig;
                (r.start.row >= i.lastRow || r.end.row <= i.firstRow) && this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead);
                break;
              default:
                break;
            }
            "animate" == n && this.renderer.animateScrolling(this.curOp.scrollTop);
          }
          var o = this.selection.toJSON();
          this.curOp.selectionAfter = o, this.$lastSel = this.selection.toJSON(), this.session.getUndoManager().addSelection(o), this.prevOp = this.curOp, this.curOp = null;
        }
      }, this.$mergeableCommands = ["backspace", "del", "insertstring"], this.$historyTracker = function (e) {
        if (this.$mergeUndoDeltas) {
          var t = this.prevOp,
            n = this.$mergeableCommands,
            r = t.command && e.command.name == t.command.name;
          if ("insertstring" == e.command.name) {
            var i = e.args;
            void 0 === this.mergeNextCommand && (this.mergeNextCommand = !0), r = r && this.mergeNextCommand && (!/\s/.test(i) || /\s/.test(t.args)), this.mergeNextCommand = !0;
          } else r = r && -1 !== n.indexOf(e.command.name);
          "always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3 && (r = !1), r ? this.session.mergeUndoDeltas = !0 : -1 !== n.indexOf(e.command.name) && (this.sequenceStartTime = Date.now());
        }
      }, this.setKeyboardHandler = function (e, t) {
        if (e && "string" === typeof e && "ace" != e) {
          this.$keybindingId = e;
          var n = this;
          y.loadModule(["keybinding", e], function (r) {
            n.$keybindingId == e && n.keyBinding.setKeyboardHandler(r && r.handler), t && t();
          });
        } else this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e), t && t();
      }, this.getKeyboardHandler = function () {
        return this.keyBinding.getKeyboardHandler();
      }, this.setSession = function (e) {
        if (this.session != e) {
          this.curOp && this.endOperation(), this.curOp = {};
          var t = this.session;
          if (t) {
            this.session.off("change", this.$onDocumentChange), this.session.off("changeMode", this.$onChangeMode), this.session.off("tokenizerUpdate", this.$onTokenizerUpdate), this.session.off("changeTabSize", this.$onChangeTabSize), this.session.off("changeWrapLimit", this.$onChangeWrapLimit), this.session.off("changeWrapMode", this.$onChangeWrapMode), this.session.off("changeFold", this.$onChangeFold), this.session.off("changeFrontMarker", this.$onChangeFrontMarker), this.session.off("changeBackMarker", this.$onChangeBackMarker), this.session.off("changeBreakpoint", this.$onChangeBreakpoint), this.session.off("changeAnnotation", this.$onChangeAnnotation), this.session.off("changeOverwrite", this.$onCursorChange), this.session.off("changeScrollTop", this.$onScrollTopChange), this.session.off("changeScrollLeft", this.$onScrollLeftChange);
            var n = this.session.getSelection();
            n.off("changeCursor", this.$onCursorChange), n.off("changeSelection", this.$onSelectionChange);
          }
          this.session = e, e ? (this.$onDocumentChange = this.onDocumentChange.bind(this), e.on("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.on("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.on("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.on("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.on("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.on("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.on("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.on("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.on("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.on("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.on("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.on("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.on("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.on("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.on("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.on("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.onCursorChange(), this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull()) : (this.selection = null, this.renderer.setSession(e)), this._signal("changeSession", {
            session: e,
            oldSession: t
          }), this.curOp = null, t && t._signal("changeEditor", {
            oldEditor: this
          }), e && e._signal("changeEditor", {
            editor: this
          }), e && !e.destroyed && e.bgTokenizer.scheduleStart();
        }
      }, this.getSession = function () {
        return this.session;
      }, this.setValue = function (e, t) {
        return this.session.doc.setValue(e), t ? 1 == t ? this.navigateFileEnd() : -1 == t && this.navigateFileStart() : this.selectAll(), e;
      }, this.getValue = function () {
        return this.session.getValue();
      }, this.getSelection = function () {
        return this.selection;
      }, this.resize = function (e) {
        this.renderer.onResize(e);
      }, this.setTheme = function (e, t) {
        this.renderer.setTheme(e, t);
      }, this.getTheme = function () {
        return this.renderer.getTheme();
      }, this.setStyle = function (e) {
        this.renderer.setStyle(e);
      }, this.unsetStyle = function (e) {
        this.renderer.unsetStyle(e);
      }, this.getFontSize = function () {
        return this.getOption("fontSize") || o.computedStyle(this.container).fontSize;
      }, this.setFontSize = function (e) {
        this.setOption("fontSize", e);
      }, this.$highlightBrackets = function () {
        if (!this.$highlightPending) {
          var e = this;
          this.$highlightPending = !0, setTimeout(function () {
            e.$highlightPending = !1;
            var t = e.session;
            if (t && !t.destroyed) {
              t.$bracketHighlight && (t.$bracketHighlight.markerIds.forEach(function (e) {
                t.removeMarker(e);
              }), t.$bracketHighlight = null);
              var n = e.getCursorPosition(),
                r = e.getKeyboardHandler(),
                i = r && r.$getDirectionForHighlight && r.$getDirectionForHighlight(e),
                o = t.getMatchingBracketRanges(n, i);
              if (!o) {
                var a = new b(t, n.row, n.column),
                  s = a.getCurrentToken();
                if (s && /\b(?:tag-open|tag-name)/.test(s.type)) {
                  var l = t.getMatchingTags(n);
                  l && (o = [l.openTagName, l.closeTagName]);
                }
              }
              if (!o && t.$mode.getMatching && (o = t.$mode.getMatching(e.session)), o) {
                var c = "ace_bracket";
                Array.isArray(o) ? 1 == o.length && (c = "ace_error_bracket") : o = [o], 2 == o.length && (0 == p.comparePoints(o[0].end, o[1].start) ? o = [p.fromPoints(o[0].start, o[1].end)] : 0 == p.comparePoints(o[0].start, o[1].end) && (o = [p.fromPoints(o[1].start, o[0].end)])), t.$bracketHighlight = {
                  ranges: o,
                  markerIds: o.map(function (e) {
                    return t.addMarker(e, c, "text");
                  })
                }, e.getHighlightIndentGuides() && e.renderer.$textLayer.$highlightIndentGuide();
              } else e.getHighlightIndentGuides() && e.renderer.$textLayer.$highlightIndentGuide();
            }
          }, 50);
        }
      }, this.focus = function () {
        this.textInput.focus();
      }, this.isFocused = function () {
        return this.textInput.isFocused();
      }, this.blur = function () {
        this.textInput.blur();
      }, this.onFocus = function (e) {
        this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus", e));
      }, this.onBlur = function (e) {
        this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur", e));
      }, this.$cursorChange = function () {
        this.renderer.updateCursor(), this.$highlightBrackets(), this.$updateHighlightActiveLine();
      }, this.onDocumentChange = function (e) {
        var t = this.session.$useWrapMode,
          n = e.start.row == e.end.row ? e.end.row : 1 / 0;
        this.renderer.updateLines(e.start.row, n, t), this._signal("change", e), this.$cursorChange();
      }, this.onTokenizerUpdate = function (e) {
        var t = e.data;
        this.renderer.updateLines(t.first, t.last);
      }, this.onScrollTopChange = function () {
        this.renderer.scrollToY(this.session.getScrollTop());
      }, this.onScrollLeftChange = function () {
        this.renderer.scrollToX(this.session.getScrollLeft());
      }, this.onCursorChange = function () {
        this.$cursorChange(), this._signal("changeSelection");
      }, this.$updateHighlightActiveLine = function () {
        var e,
          t = this.getSession();
        if (this.$highlightActiveLine && ("line" == this.$selectionStyle && this.selection.isMultiLine() || (e = this.getCursorPosition()), this.renderer.theme && this.renderer.theme.$selectionColorConflict && !this.selection.isEmpty() && (e = !1), !this.renderer.$maxLines || 1 !== this.session.getLength() || this.renderer.$minLines > 1 || (e = !1)), t.$highlightLineMarker && !e) t.removeMarker(t.$highlightLineMarker.id), t.$highlightLineMarker = null;else if (!t.$highlightLineMarker && e) {
          var n = new p(e.row, e.column, e.row, 1 / 0);
          n.id = t.addMarker(n, "ace_active-line", "screenLine"), t.$highlightLineMarker = n;
        } else e && (t.$highlightLineMarker.start.row = e.row, t.$highlightLineMarker.end.row = e.row, t.$highlightLineMarker.start.column = e.column, t._signal("changeBackMarker"));
      }, this.onSelectionChange = function (e) {
        var t = this.session;
        if (t.$selectionMarker && t.removeMarker(t.$selectionMarker), t.$selectionMarker = null, this.selection.isEmpty()) this.$updateHighlightActiveLine();else {
          var n = this.selection.getRange(),
            r = this.getSelectionStyle();
          t.$selectionMarker = t.addMarker(n, "ace_selection", r);
        }
        var i = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
        this.session.highlight(i), this._signal("changeSelection");
      }, this.$getSelectionHighLightRegexp = function () {
        var e = this.session,
          t = this.getSelectionRange();
        if (!t.isEmpty() && !t.isMultiLine()) {
          var n = t.start.column,
            r = t.end.column,
            i = e.getLine(t.start.row),
            o = i.substring(n, r);
          if (!(o.length > 5e3) && /[\w\d]/.test(o)) {
            var a = this.$search.$assembleRegExp({
                wholeWord: !0,
                caseSensitive: !0,
                needle: o
              }),
              s = i.substring(n - 1, r + 1);
            if (a.test(s)) return a;
          }
        }
      }, this.onChangeFrontMarker = function () {
        this.renderer.updateFrontMarkers();
      }, this.onChangeBackMarker = function () {
        this.renderer.updateBackMarkers();
      }, this.onChangeBreakpoint = function () {
        this.renderer.updateBreakpoints();
      }, this.onChangeAnnotation = function () {
        this.renderer.setAnnotations(this.session.getAnnotations());
      }, this.onChangeMode = function (e) {
        this.renderer.updateText(), this._emit("changeMode", e);
      }, this.onChangeWrapLimit = function () {
        this.renderer.updateFull();
      }, this.onChangeWrapMode = function () {
        this.renderer.onResize(!0);
      }, this.onChangeFold = function () {
        this.$updateHighlightActiveLine(), this.renderer.updateFull();
      }, this.getSelectedText = function () {
        return this.session.getTextRange(this.getSelectionRange());
      }, this.getCopyText = function () {
        var e = this.getSelectedText(),
          t = this.session.doc.getNewLineCharacter(),
          n = !1;
        if (!e && this.$copyWithEmptySelection) {
          n = !0;
          for (var r = this.selection.getAllRanges(), i = 0; i < r.length; i++) {
            var o = r[i];
            i && r[i - 1].start.row == o.start.row || (e += this.session.getLine(o.start.row) + t);
          }
        }
        var a = {
          text: e
        };
        return this._signal("copy", a), w.lineMode = !!n && a.text, a.text;
      }, this.onCopy = function () {
        this.commands.exec("copy", this);
      }, this.onCut = function () {
        this.commands.exec("cut", this);
      }, this.onPaste = function (e, t) {
        var n = {
          text: e,
          event: t
        };
        this.commands.exec("paste", this, n);
      }, this.$handlePaste = function (e) {
        "string" == typeof e && (e = {
          text: e
        }), this._signal("paste", e);
        var t = e.text,
          n = t === w.lineMode,
          r = this.session;
        if (!this.inMultiSelectMode || this.inVirtualSelectionMode) n ? r.insert({
          row: this.selection.lead.row,
          column: 0
        }, t) : this.insert(t);else if (n) this.selection.rangeList.ranges.forEach(function (e) {
          r.insert({
            row: e.start.row,
            column: 0
          }, t);
        });else {
          var i = t.split(/\r\n|\r|\n/),
            o = this.selection.rangeList.ranges,
            a = 2 == i.length && (!i[0] || !i[1]);
          if (i.length != o.length || a) return this.commands.exec("insertstring", this, t);
          for (var s = o.length; s--;) {
            var l = o[s];
            l.isEmpty() || r.remove(l), r.insert(l.start, i[s]);
          }
        }
      }, this.execCommand = function (e, t) {
        return this.commands.exec(e, this, t);
      }, this.insert = function (e, t) {
        var n = this.session,
          r = n.getMode(),
          i = this.getCursorPosition();
        if (this.getBehavioursEnabled() && !t) {
          var o = r.transformAction(n.getState(i.row), "insertion", this, n, e);
          o && (e !== o.text && (this.inVirtualSelectionMode || (this.session.mergeUndoDeltas = !1, this.mergeNextCommand = !1)), e = o.text);
        }
        if ("\t" == e && (e = this.session.getTabString()), this.selection.isEmpty()) {
          if (this.session.getOverwrite() && -1 == e.indexOf("\n")) {
            a = new p.fromPoints(i, i);
            a.end.column += e.length, this.session.remove(a);
          }
        } else {
          var a = this.getSelectionRange();
          i = this.session.remove(a), this.clearSelection();
        }
        if ("\n" == e || "\r\n" == e) {
          var s = n.getLine(i.row);
          if (i.column > s.search(/\S|$/)) {
            var l = s.substr(i.column).search(/\S|$/);
            n.doc.removeInLine(i.row, i.column, i.column + l);
          }
        }
        this.clearSelection();
        var c = i.column,
          u = n.getState(i.row),
          h = (s = n.getLine(i.row), r.checkOutdent(u, s, e));
        if (n.insert(i, e), o && o.selection && (2 == o.selection.length ? this.selection.setSelectionRange(new p(i.row, c + o.selection[0], i.row, c + o.selection[1])) : this.selection.setSelectionRange(new p(i.row + o.selection[0], o.selection[1], i.row + o.selection[2], o.selection[3]))), this.$enableAutoIndent) {
          if (n.getDocument().isNewLine(e)) {
            var f = r.getNextLineIndent(u, s.slice(0, i.column), n.getTabString());
            n.insert({
              row: i.row + 1,
              column: 0
            }, f);
          }
          h && r.autoOutdent(u, n, i.row);
        }
      }, this.autoIndent = function () {
        var e,
          t,
          n = this.session,
          r = n.getMode();
        if (this.selection.isEmpty()) e = 0, t = n.doc.getLength() - 1;else {
          var i = this.getSelectionRange();
          e = i.start.row, t = i.end.row;
        }
        for (var o, a, s, l = "", c = "", u = "", h = n.getTabString(), f = e; f <= t; f++) f > 0 && (l = n.getState(f - 1), c = n.getLine(f - 1), u = r.getNextLineIndent(l, c, h)), o = n.getLine(f), a = r.$getIndent(o), u !== a && (a.length > 0 && (s = new p(f, 0, f, a.length), n.remove(s)), u.length > 0 && n.insert({
          row: f,
          column: 0
        }, u)), r.autoOutdent(l, n, f);
      }, this.onTextInput = function (e, t) {
        if (!t) return this.keyBinding.onTextInput(e);
        this.startOperation({
          command: {
            name: "insertstring"
          }
        });
        var n = this.applyComposition.bind(this, e, t);
        this.selection.rangeCount ? this.forEachSelection(n) : n(), this.endOperation();
      }, this.applyComposition = function (e, t) {
        if (t.extendLeft || t.extendRight) {
          var n = this.selection.getRange();
          n.start.column -= t.extendLeft, n.end.column += t.extendRight, n.start.column < 0 && (n.start.row--, n.start.column += this.session.getLine(n.start.row).length + 1), this.selection.setRange(n), e || n.isEmpty() || this.remove();
        }
        if (!e && this.selection.isEmpty() || this.insert(e, !0), t.restoreStart || t.restoreEnd) {
          n = this.selection.getRange();
          n.start.column -= t.restoreStart, n.end.column -= t.restoreEnd, this.selection.setRange(n);
        }
      }, this.onCommandKey = function (e, t, n) {
        return this.keyBinding.onCommandKey(e, t, n);
      }, this.setOverwrite = function (e) {
        this.session.setOverwrite(e);
      }, this.getOverwrite = function () {
        return this.session.getOverwrite();
      }, this.toggleOverwrite = function () {
        this.session.toggleOverwrite();
      }, this.setScrollSpeed = function (e) {
        this.setOption("scrollSpeed", e);
      }, this.getScrollSpeed = function () {
        return this.getOption("scrollSpeed");
      }, this.setDragDelay = function (e) {
        this.setOption("dragDelay", e);
      }, this.getDragDelay = function () {
        return this.getOption("dragDelay");
      }, this.setSelectionStyle = function (e) {
        this.setOption("selectionStyle", e);
      }, this.getSelectionStyle = function () {
        return this.getOption("selectionStyle");
      }, this.setHighlightActiveLine = function (e) {
        this.setOption("highlightActiveLine", e);
      }, this.getHighlightActiveLine = function () {
        return this.getOption("highlightActiveLine");
      }, this.setHighlightGutterLine = function (e) {
        this.setOption("highlightGutterLine", e);
      }, this.getHighlightGutterLine = function () {
        return this.getOption("highlightGutterLine");
      }, this.setHighlightSelectedWord = function (e) {
        this.setOption("highlightSelectedWord", e);
      }, this.getHighlightSelectedWord = function () {
        return this.$highlightSelectedWord;
      }, this.setAnimatedScroll = function (e) {
        this.renderer.setAnimatedScroll(e);
      }, this.getAnimatedScroll = function () {
        return this.renderer.getAnimatedScroll();
      }, this.setShowInvisibles = function (e) {
        this.renderer.setShowInvisibles(e);
      }, this.getShowInvisibles = function () {
        return this.renderer.getShowInvisibles();
      }, this.setDisplayIndentGuides = function (e) {
        this.renderer.setDisplayIndentGuides(e);
      }, this.getDisplayIndentGuides = function () {
        return this.renderer.getDisplayIndentGuides();
      }, this.setHighlightIndentGuides = function (e) {
        this.renderer.setHighlightIndentGuides(e);
      }, this.getHighlightIndentGuides = function () {
        return this.renderer.getHighlightIndentGuides();
      }, this.setShowPrintMargin = function (e) {
        this.renderer.setShowPrintMargin(e);
      }, this.getShowPrintMargin = function () {
        return this.renderer.getShowPrintMargin();
      }, this.setPrintMarginColumn = function (e) {
        this.renderer.setPrintMarginColumn(e);
      }, this.getPrintMarginColumn = function () {
        return this.renderer.getPrintMarginColumn();
      }, this.setReadOnly = function (e) {
        this.setOption("readOnly", e);
      }, this.getReadOnly = function () {
        return this.getOption("readOnly");
      }, this.setBehavioursEnabled = function (e) {
        this.setOption("behavioursEnabled", e);
      }, this.getBehavioursEnabled = function () {
        return this.getOption("behavioursEnabled");
      }, this.setWrapBehavioursEnabled = function (e) {
        this.setOption("wrapBehavioursEnabled", e);
      }, this.getWrapBehavioursEnabled = function () {
        return this.getOption("wrapBehavioursEnabled");
      }, this.setShowFoldWidgets = function (e) {
        this.setOption("showFoldWidgets", e);
      }, this.getShowFoldWidgets = function () {
        return this.getOption("showFoldWidgets");
      }, this.setFadeFoldWidgets = function (e) {
        this.setOption("fadeFoldWidgets", e);
      }, this.getFadeFoldWidgets = function () {
        return this.getOption("fadeFoldWidgets");
      }, this.remove = function (e) {
        this.selection.isEmpty() && ("left" == e ? this.selection.selectLeft() : this.selection.selectRight());
        var t = this.getSelectionRange();
        if (this.getBehavioursEnabled()) {
          var n = this.session,
            r = n.getState(t.start.row),
            i = n.getMode().transformAction(r, "deletion", this, n, t);
          if (0 === t.end.column) {
            var o = n.getTextRange(t);
            if ("\n" == o[o.length - 1]) {
              var a = n.getLine(t.end.row);
              /^\s+$/.test(a) && (t.end.column = a.length);
            }
          }
          i && (t = i);
        }
        this.session.remove(t), this.clearSelection();
      }, this.removeWordRight = function () {
        this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection();
      }, this.removeWordLeft = function () {
        this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection();
      }, this.removeToLineStart = function () {
        this.selection.isEmpty() && this.selection.selectLineStart(), this.selection.isEmpty() && this.selection.selectLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection();
      }, this.removeToLineEnd = function () {
        this.selection.isEmpty() && this.selection.selectLineEnd();
        var e = this.getSelectionRange();
        e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection();
      }, this.splitLine = function () {
        this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
        var e = this.getCursorPosition();
        this.insert("\n"), this.moveCursorToPosition(e);
      }, this.transposeLetters = function () {
        if (this.selection.isEmpty()) {
          var e = this.getCursorPosition(),
            t = e.column;
          if (0 !== t) {
            var n,
              r,
              i = this.session.getLine(e.row);
            t < i.length ? (n = i.charAt(t) + i.charAt(t - 1), r = new p(e.row, t - 1, e.row, t + 1)) : (n = i.charAt(t - 1) + i.charAt(t - 2), r = new p(e.row, t - 2, e.row, t)), this.session.replace(r, n), this.session.selection.moveToPosition(r.end);
          }
        }
      }, this.toLowerCase = function () {
        var e = this.getSelectionRange();
        this.selection.isEmpty() && this.selection.selectWord();
        var t = this.getSelectionRange(),
          n = this.session.getTextRange(t);
        this.session.replace(t, n.toLowerCase()), this.selection.setSelectionRange(e);
      }, this.toUpperCase = function () {
        var e = this.getSelectionRange();
        this.selection.isEmpty() && this.selection.selectWord();
        var t = this.getSelectionRange(),
          n = this.session.getTextRange(t);
        this.session.replace(t, n.toUpperCase()), this.selection.setSelectionRange(e);
      }, this.indent = function () {
        var e = this.session,
          t = this.getSelectionRange();
        if (!(t.start.row < t.end.row)) {
          if (t.start.column < t.end.column) {
            var n = e.getTextRange(t);
            if (!/^\s+$/.test(n)) {
              u = this.$getSelectedRows();
              return void e.indentRows(u.first, u.last, "\t");
            }
          }
          var r = e.getLine(t.start.row),
            i = t.start,
            o = e.getTabSize(),
            s = e.documentToScreenColumn(i.row, i.column);
          if (this.session.getUseSoftTabs()) var l = o - s % o,
            c = a.stringRepeat(" ", l);else {
            l = s % o;
            while (" " == r[t.start.column - 1] && l) t.start.column--, l--;
            this.selection.setSelectionRange(t), c = "\t";
          }
          return this.insert(c);
        }
        var u = this.$getSelectedRows();
        e.indentRows(u.first, u.last, "\t");
      }, this.blockIndent = function () {
        var e = this.$getSelectedRows();
        this.session.indentRows(e.first, e.last, "\t");
      }, this.blockOutdent = function () {
        var e = this.session.getSelection();
        this.session.outdentRows(e.getRange());
      }, this.sortLines = function () {
        for (var e = this.$getSelectedRows(), t = this.session, n = [], r = e.first; r <= e.last; r++) n.push(t.getLine(r));
        n.sort(function (e, t) {
          return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0;
        });
        var i = new p(0, 0, 0, 0);
        for (r = e.first; r <= e.last; r++) {
          var o = t.getLine(r);
          i.start.row = r, i.end.row = r, i.end.column = o.length, t.replace(i, n[r - e.first]);
        }
      }, this.toggleCommentLines = function () {
        var e = this.session.getState(this.getCursorPosition().row),
          t = this.$getSelectedRows();
        this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last);
      }, this.toggleBlockComment = function () {
        var e = this.getCursorPosition(),
          t = this.session.getState(e.row),
          n = this.getSelectionRange();
        this.session.getMode().toggleBlockComment(t, this.session, n, e);
      }, this.getNumberAt = function (e, t) {
        var n = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
        n.lastIndex = 0;
        var r = this.session.getLine(e);
        while (n.lastIndex < t) {
          var i = n.exec(r);
          if (i.index <= t && i.index + i[0].length >= t) {
            var o = {
              value: i[0],
              start: i.index,
              end: i.index + i[0].length
            };
            return o;
          }
        }
        return null;
      }, this.modifyNumber = function (e) {
        var t = this.selection.getCursor().row,
          n = this.selection.getCursor().column,
          r = new p(t, n - 1, t, n),
          i = this.session.getTextRange(r);
        if (!isNaN(parseFloat(i)) && isFinite(i)) {
          var o = this.getNumberAt(t, n);
          if (o) {
            var a = o.value.indexOf(".") >= 0 ? o.start + o.value.indexOf(".") + 1 : o.end,
              s = o.start + o.value.length - a,
              l = parseFloat(o.value);
            l *= Math.pow(10, s), a !== o.end && n < a ? e *= Math.pow(10, o.end - n - 1) : e *= Math.pow(10, o.end - n), l += e, l /= Math.pow(10, s);
            var c = l.toFixed(s),
              u = new p(t, o.start, t, o.end);
            this.session.replace(u, c), this.moveCursorTo(t, Math.max(o.start + 1, n + c.length - o.value.length));
          }
        } else this.toggleWord();
      }, this.$toggleWordPairs = [["first", "last"], ["true", "false"], ["yes", "no"], ["width", "height"], ["top", "bottom"], ["right", "left"], ["on", "off"], ["x", "y"], ["get", "set"], ["max", "min"], ["horizontal", "vertical"], ["show", "hide"], ["add", "remove"], ["up", "down"], ["before", "after"], ["even", "odd"], ["in", "out"], ["inside", "outside"], ["next", "previous"], ["increase", "decrease"], ["attach", "detach"], ["&&", "||"], ["==", "!="]], this.toggleWord = function () {
        var e = this.selection.getCursor().row,
          t = this.selection.getCursor().column;
        this.selection.selectWord();
        var n = this.getSelectedText(),
          r = this.selection.getWordRange().start.column,
          i = n.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g, "$1 ").split(/\s/),
          o = t - r - 1;
        o < 0 && (o = 0);
        var s = 0,
          l = 0,
          c = this;
        n.match(/[A-Za-z0-9_]+/) && i.forEach(function (t, i) {
          l = s + t.length, o >= s && o <= l && (n = t, c.selection.clearSelection(), c.moveCursorTo(e, s + r), c.selection.selectTo(e, l + r)), s = l;
        });
        for (var u, h = this.$toggleWordPairs, f = 0; f < h.length; f++) for (var d = h[f], p = 0; p <= 1; p++) {
          var m = +!p,
            g = n.match(new RegExp("^\\s?_?(" + a.escapeRegExp(d[p]) + ")\\s?$", "i"));
          if (g) {
            var v = n.match(new RegExp("([_]|^|\\s)(" + a.escapeRegExp(g[1]) + ")($|\\s)", "g"));
            v && (u = n.replace(new RegExp(a.escapeRegExp(d[p]), "i"), function (e) {
              var t = d[m];
              return e.toUpperCase() == e ? t = t.toUpperCase() : e.charAt(0).toUpperCase() == e.charAt(0) && (t = t.substr(0, 0) + d[m].charAt(0).toUpperCase() + t.substr(1)), t;
            }), this.insert(u), u = "");
          }
        }
      }, this.findLinkAt = function (e, t) {
        var n,
          i,
          o = this.session.getLine(e),
          a = o.split(/((?:https?|ftp):\/\/[\S]+)/),
          s = t;
        s < 0 && (s = 0);
        var l,
          c = 0,
          u = 0;
        try {
          for (var h = r(a), f = h.next(); !f.done; f = h.next()) {
            var d = f.value;
            if (u = c + d.length, s >= c && s <= u && d.match(/((?:https?|ftp):\/\/[\S]+)/)) {
              l = d.replace(/[\s:.,'";}\]]+$/, "");
              break;
            }
            c = u;
          }
        } catch (e) {
          n = {
            error: e
          };
        } finally {
          try {
            f && !f.done && (i = h.return) && i.call(h);
          } finally {
            if (n) throw n.error;
          }
        }
        return l;
      }, this.openLink = function () {
        var e = this.selection.getCursor(),
          t = this.findLinkAt(e.row, e.column);
        return t && window.open(t, "_blank"), null != t;
      }, this.removeLines = function () {
        var e = this.$getSelectedRows();
        this.session.removeFullLines(e.first, e.last), this.clearSelection();
      }, this.duplicateSelection = function () {
        var e = this.selection,
          t = this.session,
          n = e.getRange(),
          r = e.isBackwards();
        if (n.isEmpty()) {
          var i = n.start.row;
          t.duplicateLines(i, i);
        } else {
          var o = r ? n.start : n.end,
            a = t.insert(o, t.getTextRange(n), !1);
          n.start = o, n.end = a, e.setSelectionRange(n, r);
        }
      }, this.moveLinesDown = function () {
        this.$moveLines(1, !1);
      }, this.moveLinesUp = function () {
        this.$moveLines(-1, !1);
      }, this.moveText = function (e, t, n) {
        return this.session.moveText(e, t, n);
      }, this.copyLinesUp = function () {
        this.$moveLines(-1, !0);
      }, this.copyLinesDown = function () {
        this.$moveLines(1, !0);
      }, this.$moveLines = function (e, t) {
        var n,
          r,
          i = this.selection;
        if (!i.inMultiSelectMode || this.inVirtualSelectionMode) {
          var o = i.toOrientedRange();
          n = this.$getSelectedRows(o), r = this.session.$moveLines(n.first, n.last, t ? 0 : e), t && -1 == e && (r = 0), o.moveBy(r, 0), i.fromOrientedRange(o);
        } else {
          var a = i.rangeList.ranges;
          i.rangeList.detach(this.session), this.inVirtualSelectionMode = !0;
          for (var s = 0, l = 0, c = a.length, u = 0; u < c; u++) {
            var h = u;
            a[u].moveBy(s, 0), n = this.$getSelectedRows(a[u]);
            var f = n.first,
              d = n.last;
            while (++u < c) {
              l && a[u].moveBy(l, 0);
              var p = this.$getSelectedRows(a[u]);
              if (t && p.first != d) break;
              if (!t && p.first > d + 1) break;
              d = p.last;
            }
            u--, s = this.session.$moveLines(f, d, t ? 0 : e), t && -1 == e && (h = u + 1);
            while (h <= u) a[h].moveBy(s, 0), h++;
            t || (s = 0), l += s;
          }
          i.fromOrientedRange(i.ranges[0]), i.rangeList.attach(this.session), this.inVirtualSelectionMode = !1;
        }
      }, this.$getSelectedRows = function (e) {
        return e = (e || this.getSelectionRange()).collapseRows(), {
          first: this.session.getRowFoldStart(e.start.row),
          last: this.session.getRowFoldEnd(e.end.row)
        };
      }, this.onCompositionStart = function (e) {
        this.renderer.showComposition(e);
      }, this.onCompositionUpdate = function (e) {
        this.renderer.setCompositionText(e);
      }, this.onCompositionEnd = function () {
        this.renderer.hideComposition();
      }, this.getFirstVisibleRow = function () {
        return this.renderer.getFirstVisibleRow();
      }, this.getLastVisibleRow = function () {
        return this.renderer.getLastVisibleRow();
      }, this.isRowVisible = function (e) {
        return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow();
      }, this.isRowFullyVisible = function (e) {
        return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow();
      }, this.$getVisibleRowCount = function () {
        return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1;
      }, this.$moveByPage = function (e, t) {
        var n = this.renderer,
          r = this.renderer.layerConfig,
          i = e * Math.floor(r.height / r.lineHeight);
        !0 === t ? this.selection.$moveSelection(function () {
          this.moveCursorBy(i, 0);
        }) : !1 === t && (this.selection.moveCursorBy(i, 0), this.selection.clearSelection());
        var o = n.scrollTop;
        n.scrollBy(0, i * r.lineHeight), null != t && n.scrollCursorIntoView(null, .5), n.animateScrolling(o);
      }, this.selectPageDown = function () {
        this.$moveByPage(1, !0);
      }, this.selectPageUp = function () {
        this.$moveByPage(-1, !0);
      }, this.gotoPageDown = function () {
        this.$moveByPage(1, !1);
      }, this.gotoPageUp = function () {
        this.$moveByPage(-1, !1);
      }, this.scrollPageDown = function () {
        this.$moveByPage(1);
      }, this.scrollPageUp = function () {
        this.$moveByPage(-1);
      }, this.scrollToRow = function (e) {
        this.renderer.scrollToRow(e);
      }, this.scrollToLine = function (e, t, n, r) {
        this.renderer.scrollToLine(e, t, n, r);
      }, this.centerSelection = function () {
        var e = this.getSelectionRange(),
          t = {
            row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2),
            column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)
          };
        this.renderer.alignCursor(t, .5);
      }, this.getCursorPosition = function () {
        return this.selection.getCursor();
      }, this.getCursorPositionScreen = function () {
        return this.session.documentToScreenPosition(this.getCursorPosition());
      }, this.getSelectionRange = function () {
        return this.selection.getRange();
      }, this.selectAll = function () {
        this.selection.selectAll();
      }, this.clearSelection = function () {
        this.selection.clearSelection();
      }, this.moveCursorTo = function (e, t) {
        this.selection.moveCursorTo(e, t);
      }, this.moveCursorToPosition = function (e) {
        this.selection.moveCursorToPosition(e);
      }, this.jumpToMatching = function (e, t) {
        var n = this.getCursorPosition(),
          r = new b(this.session, n.row, n.column),
          i = r.getCurrentToken(),
          o = 0;
        i && -1 !== i.type.indexOf("tag-name") && (i = r.stepBackward());
        var a = i || r.stepForward();
        if (a) {
          var s,
            l,
            c = !1,
            u = {},
            h = n.column - a.start,
            f = {
              ")": "(",
              "(": "(",
              "]": "[",
              "[": "[",
              "{": "{",
              "}": "{"
            };
          do {
            if (a.value.match(/[{}()\[\]]/g)) {
              for (; h < a.value.length && !c; h++) if (f[a.value[h]]) switch (l = f[a.value[h]] + "." + a.type.replace("rparen", "lparen"), isNaN(u[l]) && (u[l] = 0), a.value[h]) {
                case "(":
                case "[":
                case "{":
                  u[l]++;
                  break;
                case ")":
                case "]":
                case "}":
                  u[l]--, -1 === u[l] && (s = "bracket", c = !0);
                  break;
              }
            } else -1 !== a.type.indexOf("tag-name") && (isNaN(u[a.value]) && (u[a.value] = 0), "<" === i.value && o > 1 ? u[a.value]++ : "</" === i.value && u[a.value]--, -1 === u[a.value] && (s = "tag", c = !0));
            c || (i = a, o++, a = r.stepForward(), h = 0);
          } while (a && !c);
          if (s) {
            var d, m;
            if ("bracket" === s) d = this.session.getBracketRange(n), d || (d = new p(r.getCurrentTokenRow(), r.getCurrentTokenColumn() + h - 1, r.getCurrentTokenRow(), r.getCurrentTokenColumn() + h - 1), m = d.start, (t || m.row === n.row && Math.abs(m.column - n.column) < 2) && (d = this.session.getBracketRange(m)));else if ("tag" === s) {
              if (!a || -1 === a.type.indexOf("tag-name")) return;
              if (d = new p(r.getCurrentTokenRow(), r.getCurrentTokenColumn() - 2, r.getCurrentTokenRow(), r.getCurrentTokenColumn() - 2), 0 === d.compare(n.row, n.column)) {
                var g = this.session.getMatchingTags(n);
                g && (g.openTag.contains(n.row, n.column) ? (d = g.closeTag, m = d.start) : (d = g.openTag, m = g.closeTag.start.row === n.row && g.closeTag.start.column === n.column ? d.end : d.start));
              }
              m = m || d.start;
            }
            m = d && d.cursor || m, m && (e ? d && t ? this.selection.setRange(d) : d && d.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(m.row, m.column) : this.selection.moveTo(m.row, m.column));
          }
        }
      }, this.gotoLine = function (e, t, n) {
        this.selection.clearSelection(), this.session.unfold({
          row: e - 1,
          column: t || 0
        }), this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(e - 1, t || 0), this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, n);
      }, this.navigateTo = function (e, t) {
        this.selection.moveTo(e, t);
      }, this.navigateUp = function (e) {
        if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
          var t = this.selection.anchor.getPosition();
          return this.moveCursorToPosition(t);
        }
        this.selection.clearSelection(), this.selection.moveCursorBy(-e || -1, 0);
      }, this.navigateDown = function (e) {
        if (this.selection.isMultiLine() && this.selection.isBackwards()) {
          var t = this.selection.anchor.getPosition();
          return this.moveCursorToPosition(t);
        }
        this.selection.clearSelection(), this.selection.moveCursorBy(e || 1, 0);
      }, this.navigateLeft = function (e) {
        if (this.selection.isEmpty()) {
          e = e || 1;
          while (e--) this.selection.moveCursorLeft();
        } else {
          var t = this.getSelectionRange().start;
          this.moveCursorToPosition(t);
        }
        this.clearSelection();
      }, this.navigateRight = function (e) {
        if (this.selection.isEmpty()) {
          e = e || 1;
          while (e--) this.selection.moveCursorRight();
        } else {
          var t = this.getSelectionRange().end;
          this.moveCursorToPosition(t);
        }
        this.clearSelection();
      }, this.navigateLineStart = function () {
        this.selection.moveCursorLineStart(), this.clearSelection();
      }, this.navigateLineEnd = function () {
        this.selection.moveCursorLineEnd(), this.clearSelection();
      }, this.navigateFileEnd = function () {
        this.selection.moveCursorFileEnd(), this.clearSelection();
      }, this.navigateFileStart = function () {
        this.selection.moveCursorFileStart(), this.clearSelection();
      }, this.navigateWordRight = function () {
        this.selection.moveCursorWordRight(), this.clearSelection();
      }, this.navigateWordLeft = function () {
        this.selection.moveCursorWordLeft(), this.clearSelection();
      }, this.replace = function (e, t) {
        t && this.$search.set(t);
        var n = this.$search.find(this.session),
          r = 0;
        return n ? (this.$tryReplace(n, e) && (r = 1), this.selection.setSelectionRange(n), this.renderer.scrollSelectionIntoView(n.start, n.end), r) : r;
      }, this.replaceAll = function (e, t) {
        t && this.$search.set(t);
        var n = this.$search.findAll(this.session),
          r = 0;
        if (!n.length) return r;
        var i = this.getSelectionRange();
        this.selection.moveTo(0, 0);
        for (var o = n.length - 1; o >= 0; --o) this.$tryReplace(n[o], e) && r++;
        return this.selection.setSelectionRange(i), r;
      }, this.$tryReplace = function (e, t) {
        var n = this.session.getTextRange(e);
        return t = this.$search.replace(n, t), null !== t ? (e.end = this.session.replace(e, t), e) : null;
      }, this.getLastSearchOptions = function () {
        return this.$search.getOptions();
      }, this.find = function (e, t, n) {
        t || (t = {}), "string" == typeof e || e instanceof RegExp ? t.needle = e : "object" == typeof e && i.mixin(t, e);
        var r = this.selection.getRange();
        null == t.needle && (e = this.session.getTextRange(r) || this.$search.$options.needle, e || (r = this.session.getWordRange(r.start.row, r.start.column), e = this.session.getTextRange(r)), this.$search.set({
          needle: e
        })), this.$search.set(t), t.start || this.$search.set({
          start: r
        });
        var o = this.$search.find(this.session);
        return t.preventScroll ? o : o ? (this.revealRange(o, n), o) : (t.backwards ? r.start = r.end : r.end = r.start, void this.selection.setRange(r));
      }, this.findNext = function (e, t) {
        this.find({
          skipCurrent: !0,
          backwards: !1
        }, e, t);
      }, this.findPrevious = function (e, t) {
        this.find(e, {
          skipCurrent: !0,
          backwards: !0
        }, t);
      }, this.revealRange = function (e, t) {
        this.session.unfold(e), this.selection.setSelectionRange(e);
        var n = this.renderer.scrollTop;
        this.renderer.scrollSelectionIntoView(e.start, e.end, .5), !1 !== t && this.renderer.animateScrolling(n);
      }, this.undo = function () {
        this.session.getUndoManager().undo(this.session), this.renderer.scrollCursorIntoView(null, .5);
      }, this.redo = function () {
        this.session.getUndoManager().redo(this.session), this.renderer.scrollCursorIntoView(null, .5);
      }, this.destroy = function () {
        this.$toDestroy && (this.$toDestroy.forEach(function (e) {
          e.destroy();
        }), this.$toDestroy = null), this.$mouseHandler && this.$mouseHandler.destroy(), this.renderer.destroy(), this._signal("destroy", this), this.session && this.session.destroy(), this._$emitInputEvent && this._$emitInputEvent.cancel(), this.removeAllListeners();
      }, this.setAutoScrollEditorIntoView = function (e) {
        if (e) {
          var t,
            n = this,
            r = !1;
          this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
          var i = this.$scrollAnchor;
          i.style.cssText = "position:absolute", this.container.insertBefore(i, this.container.firstChild);
          var o = this.on("changeSelection", function () {
              r = !0;
            }),
            a = this.renderer.on("beforeRender", function () {
              r && (t = n.renderer.container.getBoundingClientRect());
            }),
            s = this.renderer.on("afterRender", function () {
              if (r && t && (n.isFocused() || n.searchBox && n.searchBox.isFocused())) {
                var e = n.renderer,
                  o = e.$cursorLayer.$pixelPos,
                  a = e.layerConfig,
                  s = o.top - a.offset;
                r = o.top >= 0 && s + t.top < 0 || !(o.top < a.height && o.top + t.top + a.lineHeight > window.innerHeight) && null, null != r && (i.style.top = s + "px", i.style.left = o.left + "px", i.style.height = a.lineHeight + "px", i.scrollIntoView(r)), r = t = null;
              }
            });
          this.setAutoScrollEditorIntoView = function (e) {
            e || (delete this.setAutoScrollEditorIntoView, this.off("changeSelection", o), this.renderer.off("afterRender", s), this.renderer.off("beforeRender", a));
          };
        }
      }, this.$resetCursorStyle = function () {
        var e = this.$cursorStyle || "ace",
          t = this.renderer.$cursorLayer;
        t && (t.setSmoothBlinking(/smooth/.test(e)), t.isBlinking = !this.$readOnly && "wide" != e, o.setCssClass(t.element, "ace_slim-cursors", /slim/.test(e)));
      }, this.prompt = function (e, t, n) {
        var r = this;
        y.loadModule("./ext/prompt", function (i) {
          i.prompt(r, e, t, n);
        });
      };
    }.call(x.prototype), y.defineOptions(x.prototype, "editor", {
      selectionStyle: {
        set: function (e) {
          this.onSelectionChange(), this._signal("changeSelectionStyle", {
            data: e
          });
        },
        initialValue: "line"
      },
      highlightActiveLine: {
        set: function () {
          this.$updateHighlightActiveLine();
        },
        initialValue: !0
      },
      highlightSelectedWord: {
        set: function (e) {
          this.$onSelectionChange();
        },
        initialValue: !0
      },
      readOnly: {
        set: function (e) {
          this.textInput.setReadOnly(e), this.$resetCursorStyle();
        },
        initialValue: !1
      },
      copyWithEmptySelection: {
        set: function (e) {
          this.textInput.setCopyWithEmptySelection(e);
        },
        initialValue: !1
      },
      cursorStyle: {
        set: function (e) {
          this.$resetCursorStyle();
        },
        values: ["ace", "slim", "smooth", "wide"],
        initialValue: "ace"
      },
      mergeUndoDeltas: {
        values: [!1, !0, "always"],
        initialValue: !0
      },
      behavioursEnabled: {
        initialValue: !0
      },
      wrapBehavioursEnabled: {
        initialValue: !0
      },
      enableAutoIndent: {
        initialValue: !0
      },
      autoScrollEditorIntoView: {
        set: function (e) {
          this.setAutoScrollEditorIntoView(e);
        }
      },
      keyboardHandler: {
        set: function (e) {
          this.setKeyboardHandler(e);
        },
        get: function () {
          return this.$keybindingId;
        },
        handlesSet: !0
      },
      value: {
        set: function (e) {
          this.session.setValue(e);
        },
        get: function () {
          return this.getValue();
        },
        handlesSet: !0,
        hidden: !0
      },
      session: {
        set: function (e) {
          this.setSession(e);
        },
        get: function () {
          return this.session;
        },
        handlesSet: !0,
        hidden: !0
      },
      showLineNumbers: {
        set: function (e) {
          this.renderer.$gutterLayer.setShowLineNumbers(e), this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER), e && this.$relativeLineNumbers ? _.attach(this) : _.detach(this);
        },
        initialValue: !0
      },
      relativeLineNumbers: {
        set: function (e) {
          this.$showLineNumbers && e ? _.attach(this) : _.detach(this);
        }
      },
      placeholder: {
        set: function (e) {
          this.$updatePlaceholder || (this.$updatePlaceholder = function () {
            var e = this.session && (this.renderer.$composition || this.getValue());
            if (e && this.renderer.placeholderNode) this.renderer.off("afterRender", this.$updatePlaceholder), o.removeCssClass(this.container, "ace_hasPlaceholder"), this.renderer.placeholderNode.remove(), this.renderer.placeholderNode = null;else if (e || this.renderer.placeholderNode) !e && this.renderer.placeholderNode && (this.renderer.placeholderNode.textContent = this.$placeholder || "");else {
              this.renderer.on("afterRender", this.$updatePlaceholder), o.addCssClass(this.container, "ace_hasPlaceholder");
              var t = o.createElement("div");
              t.className = "ace_placeholder", t.textContent = this.$placeholder || "", this.renderer.placeholderNode = t, this.renderer.content.appendChild(this.renderer.placeholderNode);
            }
          }.bind(this), this.on("input", this.$updatePlaceholder)), this.$updatePlaceholder();
        }
      },
      customScrollbar: "renderer",
      hScrollBarAlwaysVisible: "renderer",
      vScrollBarAlwaysVisible: "renderer",
      highlightGutterLine: "renderer",
      animatedScroll: "renderer",
      showInvisibles: "renderer",
      showPrintMargin: "renderer",
      printMarginColumn: "renderer",
      printMargin: "renderer",
      fadeFoldWidgets: "renderer",
      showFoldWidgets: "renderer",
      displayIndentGuides: "renderer",
      highlightIndentGuides: "renderer",
      showGutter: "renderer",
      fontSize: "renderer",
      fontFamily: "renderer",
      maxLines: "renderer",
      minLines: "renderer",
      scrollPastEnd: "renderer",
      fixedWidthGutter: "renderer",
      theme: "renderer",
      hasCssTransforms: "renderer",
      maxPixelHeight: "renderer",
      useTextareaForIME: "renderer",
      scrollSpeed: "$mouseHandler",
      dragDelay: "$mouseHandler",
      dragEnabled: "$mouseHandler",
      focusTimeout: "$mouseHandler",
      tooltipFollowsMouse: "$mouseHandler",
      firstLineNumber: "session",
      overwrite: "session",
      newLineMode: "session",
      useWorker: "session",
      useSoftTabs: "session",
      navigateWithinSoftTabs: "session",
      tabSize: "session",
      wrap: "session",
      indentedSoftWrap: "session",
      foldStyle: "session",
      mode: "session"
    });
    var _ = {
      getText: function (e, t) {
        return (Math.abs(e.selection.lead.row - t) || t + 1 + (t < 9 ? "\xb7" : "")) + "";
      },
      getWidth: function (e, t, n) {
        return Math.max(t.toString().length, (n.lastRow + 1).toString().length, 2) * n.characterWidth;
      },
      update: function (e, t) {
        t.renderer.$loop.schedule(t.renderer.CHANGE_GUTTER);
      },
      attach: function (e) {
        e.renderer.$gutterLayer.$renderer = this, e.on("changeSelection", this.update), this.update(null, e);
      },
      detach: function (e) {
        e.renderer.$gutterLayer.$renderer == this && (e.renderer.$gutterLayer.$renderer = null), e.off("changeSelection", this.update), this.update(null, e);
      }
    };
    t.Editor = x;
  }), ace.define("ace/undomanager", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";

    var r = function () {
      this.$maxRev = 0, this.$fromUndo = !1, this.$undoDepth = 1 / 0, this.reset();
    };
    function i(e, t) {
      for (var n = t; n--;) {
        var r = e[n];
        if (r && !r[0].ignore) {
          while (n < t - 1) {
            var i = f(e[n], e[n + 1]);
            e[n] = i[0], e[n + 1] = i[1], n++;
          }
          return !0;
        }
      }
    }
    (function () {
      this.addSession = function (e) {
        this.$session = e;
      }, this.add = function (e, t, n) {
        if (!this.$fromUndo && e != this.$lastDelta) {
          if (this.$keepRedoStack || (this.$redoStack.length = 0), !1 === t || !this.lastDeltas) {
            this.lastDeltas = [];
            var r = this.$undoStack.length;
            r > this.$undoDepth - 1 && this.$undoStack.splice(0, r - this.$undoDepth + 1), this.$undoStack.push(this.lastDeltas), e.id = this.$rev = ++this.$maxRev;
          }
          "remove" != e.action && "insert" != e.action || (this.$lastDelta = e), this.lastDeltas.push(e);
        }
      }, this.addSelection = function (e, t) {
        this.selections.push({
          value: e,
          rev: t || this.$rev
        });
      }, this.startNewGroup = function () {
        return this.lastDeltas = null, this.$rev;
      }, this.markIgnored = function (e, t) {
        null == t && (t = this.$rev + 1);
        for (var n = this.$undoStack, r = n.length; r--;) {
          var i = n[r][0];
          if (i.id <= e) break;
          i.id < t && (i.ignore = !0);
        }
        this.lastDeltas = null;
      }, this.getSelection = function (e, t) {
        for (var n = this.selections, r = n.length; r--;) {
          var i = n[r];
          if (i.rev < e) return t && (i = n[r + 1]), i;
        }
      }, this.getRevision = function () {
        return this.$rev;
      }, this.getDeltas = function (e, t) {
        null == t && (t = this.$rev + 1);
        for (var n = this.$undoStack, r = null, i = 0, o = n.length; o--;) {
          var a = n[o][0];
          if (a.id < t && !r && (r = o + 1), a.id <= e) {
            i = o + 1;
            break;
          }
        }
        return n.slice(i, r);
      }, this.getChangedRanges = function (e, t) {
        null == t && (t = this.$rev + 1);
      }, this.getChangedLines = function (e, t) {
        null == t && (t = this.$rev + 1);
      }, this.undo = function (e, t) {
        this.lastDeltas = null;
        var n = this.$undoStack;
        if (i(n, n.length)) {
          e || (e = this.$session), this.$redoStackBaseRev !== this.$rev && this.$redoStack.length && (this.$redoStack = []), this.$fromUndo = !0;
          var r = n.pop(),
            o = null;
          return r && (o = e.undoChanges(r, t), this.$redoStack.push(r), this.$syncRev()), this.$fromUndo = !1, o;
        }
      }, this.redo = function (e, t) {
        if (this.lastDeltas = null, e || (e = this.$session), this.$fromUndo = !0, this.$redoStackBaseRev != this.$rev) {
          var n = this.getDeltas(this.$redoStackBaseRev, this.$rev + 1);
          y(this.$redoStack, n), this.$redoStackBaseRev = this.$rev, this.$redoStack.forEach(function (e) {
            e[0].id = ++this.$maxRev;
          }, this);
        }
        var r = this.$redoStack.pop(),
          i = null;
        return r && (i = e.redoChanges(r, t), this.$undoStack.push(r), this.$syncRev()), this.$fromUndo = !1, i;
      }, this.$syncRev = function () {
        var e = this.$undoStack,
          t = e[e.length - 1],
          n = t && t[0].id || 0;
        this.$redoStackBaseRev = n, this.$rev = n;
      }, this.reset = function () {
        this.lastDeltas = null, this.$lastDelta = null, this.$undoStack = [], this.$redoStack = [], this.$rev = 0, this.mark = 0, this.$redoStackBaseRev = this.$rev, this.selections = [];
      }, this.canUndo = function () {
        return this.$undoStack.length > 0;
      }, this.canRedo = function () {
        return this.$redoStack.length > 0;
      }, this.bookmark = function (e) {
        void 0 == e && (e = this.$rev), this.mark = e;
      }, this.isAtBookmark = function () {
        return this.$rev === this.mark;
      }, this.toJSON = function () {}, this.fromJSON = function () {}, this.hasUndo = this.canUndo, this.hasRedo = this.canRedo, this.isClean = this.isAtBookmark, this.markClean = this.bookmark, this.$prettyPrint = function (e) {
        return e ? c(e) : c(this.$undoStack) + "\n---\n" + c(this.$redoStack);
      };
    }).call(r.prototype);
    var o = e("./range").Range,
      a = o.comparePoints;
    o.comparePoints;
    function s(e) {
      return {
        row: e.row,
        column: e.column
      };
    }
    function l(e) {
      return {
        start: s(e.start),
        end: s(e.end),
        action: e.action,
        lines: e.lines.slice()
      };
    }
    function c(e) {
      if (e = e || this, Array.isArray(e)) return e.map(c).join("\n");
      var t = "";
      return e.action ? (t = "insert" == e.action ? "+" : "-", t += "[" + e.lines + "]") : e.value && (t = Array.isArray(e.value) ? e.value.map(u).join("\n") : u(e.value)), e.start && (t += u(e)), (e.id || e.rev) && (t += "\t(" + (e.id || e.rev) + ")"), t;
    }
    function u(e) {
      return e.start.row + ":" + e.start.column + "=>" + e.end.row + ":" + e.end.column;
    }
    function h(e, t) {
      var n = "insert" == e.action,
        r = "insert" == t.action;
      if (n && r) {
        if (a(t.start, e.end) >= 0) p(t, e, -1);else {
          if (!(a(t.start, e.start) <= 0)) return null;
          p(e, t, 1);
        }
      } else if (n && !r) {
        if (a(t.start, e.end) >= 0) p(t, e, -1);else {
          if (!(a(t.end, e.start) <= 0)) return null;
          p(e, t, -1);
        }
      } else if (!n && r) {
        if (a(t.start, e.start) >= 0) p(t, e, 1);else {
          if (!(a(t.start, e.start) <= 0)) return null;
          p(e, t, 1);
        }
      } else if (!n && !r) if (a(t.start, e.start) >= 0) p(t, e, 1);else {
        if (!(a(t.end, e.start) <= 0)) return null;
        p(e, t, -1);
      }
      return [t, e];
    }
    function f(e, t) {
      for (var n = e.length; n--;) for (var r = 0; r < t.length; r++) if (!h(e[n], t[r])) {
        while (n < e.length) {
          while (r--) h(t[r], e[n]);
          r = t.length, n++;
        }
        return [e, t];
      }
      return e.selectionBefore = t.selectionBefore = e.selectionAfter = t.selectionAfter = null, [t, e];
    }
    function d(e, t) {
      var n = "insert" == e.action,
        r = "insert" == t.action;
      if (n && r) a(e.start, t.start) < 0 ? p(t, e, 1) : p(e, t, 1);else if (n && !r) a(e.start, t.end) >= 0 ? p(e, t, -1) : a(e.start, t.start) <= 0 ? p(t, e, 1) : (p(e, o.fromPoints(t.start, e.start), -1), p(t, e, 1));else if (!n && r) a(t.start, e.end) >= 0 ? p(t, e, -1) : a(t.start, e.start) <= 0 ? p(e, t, 1) : (p(t, o.fromPoints(e.start, t.start), -1), p(e, t, 1));else if (!n && !r) if (a(t.start, e.end) >= 0) p(t, e, -1);else {
        var i, s;
        if (!(a(t.end, e.start) <= 0)) return a(e.start, t.start) < 0 && (i = e, e = g(e, t.start)), a(e.end, t.end) > 0 && (s = g(e, t.end)), m(t.end, e.start, e.end, -1), s && !i && (e.lines = s.lines, e.start = s.start, e.end = s.end, s = e), [t, i, s].filter(Boolean);
        p(e, t, -1);
      }
      return [t, e];
    }
    function p(e, t, n) {
      m(e.start, t.start, t.end, n), m(e.end, t.start, t.end, n);
    }
    function m(e, t, n, r) {
      e.row == (1 == r ? t : n).row && (e.column += r * (n.column - t.column)), e.row += r * (n.row - t.row);
    }
    function g(e, t) {
      var n = e.lines,
        r = e.end;
      e.end = s(t);
      var i = e.end.row - e.start.row,
        o = n.splice(i, n.length),
        a = i ? t.column : t.column - e.start.column;
      n.push(o[0].substring(0, a)), o[0] = o[0].substr(a);
      var l = {
        start: s(t),
        end: r,
        lines: o,
        action: e.action
      };
      return l;
    }
    function v(e, t) {
      t = l(t);
      for (var n = e.length; n--;) {
        for (var r = e[n], i = 0; i < r.length; i++) {
          var o = r[i],
            a = d(o, t);
          t = a[0], 2 != a.length && (a[2] ? (r.splice(i + 1, 1, a[1], a[2]), i++) : a[1] || (r.splice(i, 1), i--));
        }
        r.length || e.splice(n, 1);
      }
      return e;
    }
    function y(e, t) {
      for (var n = 0; n < t.length; n++) for (var r = t[n], i = 0; i < r.length; i++) v(e, r[i]);
    }
    t.UndoManager = r;
  }), ace.define("ace/layer/lines", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    var r = e("../lib/dom"),
      i = function (e, t) {
        this.element = e, this.canvasHeight = t || 5e5, this.element.style.height = 2 * this.canvasHeight + "px", this.cells = [], this.cellCache = [], this.$offsetCoefficient = 0;
      };
    (function () {
      this.moveContainer = function (e) {
        r.translate(this.element, 0, -e.firstRowScreen * e.lineHeight % this.canvasHeight - e.offset * this.$offsetCoefficient);
      }, this.pageChanged = function (e, t) {
        return Math.floor(e.firstRowScreen * e.lineHeight / this.canvasHeight) !== Math.floor(t.firstRowScreen * t.lineHeight / this.canvasHeight);
      }, this.computeLineTop = function (e, t, n) {
        var r = t.firstRowScreen * t.lineHeight,
          i = Math.floor(r / this.canvasHeight),
          o = n.documentToScreenRow(e, 0) * t.lineHeight;
        return o - i * this.canvasHeight;
      }, this.computeLineHeight = function (e, t, n) {
        return t.lineHeight * n.getRowLineCount(e);
      }, this.getLength = function () {
        return this.cells.length;
      }, this.get = function (e) {
        return this.cells[e];
      }, this.shift = function () {
        this.$cacheCell(this.cells.shift());
      }, this.pop = function () {
        this.$cacheCell(this.cells.pop());
      }, this.push = function (e) {
        if (Array.isArray(e)) {
          this.cells.push.apply(this.cells, e);
          for (var t = r.createFragment(this.element), n = 0; n < e.length; n++) t.appendChild(e[n].element);
          this.element.appendChild(t);
        } else this.cells.push(e), this.element.appendChild(e.element);
      }, this.unshift = function (e) {
        if (Array.isArray(e)) {
          this.cells.unshift.apply(this.cells, e);
          for (var t = r.createFragment(this.element), n = 0; n < e.length; n++) t.appendChild(e[n].element);
          this.element.firstChild ? this.element.insertBefore(t, this.element.firstChild) : this.element.appendChild(t);
        } else this.cells.unshift(e), this.element.insertAdjacentElement("afterbegin", e.element);
      }, this.last = function () {
        return this.cells.length ? this.cells[this.cells.length - 1] : null;
      }, this.$cacheCell = function (e) {
        e && (e.element.remove(), this.cellCache.push(e));
      }, this.createCell = function (e, t, n, i) {
        var o = this.cellCache.pop();
        if (!o) {
          var a = r.createElement("div");
          i && i(a), this.element.appendChild(a), o = {
            element: a,
            text: "",
            row: e
          };
        }
        return o.row = e, o;
      };
    }).call(i.prototype), t.Lines = i;
  }), ace.define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/layer/lines"], function (e, t, n) {
    "use strict";

    var r = e("../lib/dom"),
      i = e("../lib/oop"),
      o = e("../lib/lang"),
      a = e("../lib/event_emitter").EventEmitter,
      s = e("./lines").Lines,
      l = function (e) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$lines = new s(this.element), this.$lines.$offsetCoefficient = 1;
      };
    function c(e) {
      var t = document.createTextNode("");
      e.appendChild(t);
      var n = r.createElement("span");
      return e.appendChild(n), e;
    }
    (function () {
      i.implement(this, a), this.setSession = function (e) {
        this.session && this.session.off("change", this.$updateAnnotations), this.session = e, e && e.on("change", this.$updateAnnotations);
      }, this.addGutterDecoration = function (e, t) {
        window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t);
      }, this.removeGutterDecoration = function (e, t) {
        window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t);
      }, this.setAnnotations = function (e) {
        this.$annotations = [];
        for (var t = 0; t < e.length; t++) {
          var n = e[t],
            r = n.row,
            i = this.$annotations[r];
          i || (i = this.$annotations[r] = {
            text: []
          });
          var a = n.text;
          a = a ? o.escapeHTML(a) : n.html || "", -1 === i.text.indexOf(a) && i.text.push(a);
          var s = n.type,
            l = n.className;
          l ? i.className = l : "error" == s ? i.className = " ace_error" : "warning" == s && " ace_error" != i.className ? i.className = " ace_warning" : "info" != s || i.className || (i.className = " ace_info");
        }
      }, this.$updateAnnotations = function (e) {
        if (this.$annotations.length) {
          var t = e.start.row,
            n = e.end.row - t;
          if (0 === n) ;else if ("remove" == e.action) this.$annotations.splice(t, n + 1, null);else {
            var r = new Array(n + 1);
            r.unshift(t, 1), this.$annotations.splice.apply(this.$annotations, r);
          }
        }
      }, this.update = function (e) {
        this.config = e;
        var t = this.session,
          n = e.firstRow,
          r = Math.min(e.lastRow + e.gutterOffset, t.getLength() - 1);
        this.oldLastRow = r, this.config = e, this.$lines.moveContainer(e), this.$updateCursorRow();
        var i = t.getNextFoldLine(n),
          o = i ? i.start.row : 1 / 0,
          a = null,
          s = -1,
          l = n;
        while (1) {
          if (l > o && (l = i.end.row + 1, i = t.getNextFoldLine(l, i), o = i ? i.start.row : 1 / 0), l > r) {
            while (this.$lines.getLength() > s + 1) this.$lines.pop();
            break;
          }
          a = this.$lines.get(++s), a ? a.row = l : (a = this.$lines.createCell(l, e, this.session, c), this.$lines.push(a)), this.$renderCell(a, e, i, l), l++;
        }
        this._signal("afterRender"), this.$updateGutterWidth(e);
      }, this.$updateGutterWidth = function (e) {
        var t = this.session,
          n = t.gutterRenderer || this.$renderer,
          r = t.$firstLineNumber,
          i = this.$lines.last() ? this.$lines.last().text : "";
        (this.$fixedWidth || t.$useWrapMode) && (i = t.getLength() + r - 1);
        var o = n ? n.getWidth(t, i, e) : i.toString().length * e.characterWidth,
          a = this.$padding || this.$computePadding();
        o += a.left + a.right, o === this.gutterWidth || isNaN(o) || (this.gutterWidth = o, this.element.parentNode.style.width = this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._signal("changeGutterWidth", o));
      }, this.$updateCursorRow = function () {
        if (this.$highlightGutterLine) {
          var e = this.session.selection.getCursor();
          this.$cursorRow !== e.row && (this.$cursorRow = e.row);
        }
      }, this.updateLineHighlight = function () {
        if (this.$highlightGutterLine) {
          var e = this.session.selection.cursor.row;
          if (this.$cursorRow = e, !this.$cursorCell || this.$cursorCell.row != e) {
            this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", ""));
            var t = this.$lines.cells;
            this.$cursorCell = null;
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              if (r.row >= this.$cursorRow) {
                if (r.row > this.$cursorRow) {
                  var i = this.session.getFoldLine(this.$cursorRow);
                  if (!(n > 0 && i && i.start.row == t[n - 1].row)) break;
                  r = t[n - 1];
                }
                r.element.className = "ace_gutter-active-line " + r.element.className, this.$cursorCell = r;
                break;
              }
            }
          }
        }
      }, this.scrollLines = function (e) {
        var t = this.config;
        if (this.config = e, this.$updateCursorRow(), this.$lines.pageChanged(t, e)) return this.update(e);
        this.$lines.moveContainer(e);
        var n = Math.min(e.lastRow + e.gutterOffset, this.session.getLength() - 1),
          r = this.oldLastRow;
        if (this.oldLastRow = n, !t || r < e.firstRow) return this.update(e);
        if (n < t.firstRow) return this.update(e);
        if (t.firstRow < e.firstRow) for (var i = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); i > 0; i--) this.$lines.shift();
        if (r > n) for (i = this.session.getFoldedRowCount(n + 1, r); i > 0; i--) this.$lines.pop();
        e.firstRow < t.firstRow && this.$lines.unshift(this.$renderLines(e, e.firstRow, t.firstRow - 1)), n > r && this.$lines.push(this.$renderLines(e, r + 1, n)), this.updateLineHighlight(), this._signal("afterRender"), this.$updateGutterWidth(e);
      }, this.$renderLines = function (e, t, n) {
        var r = [],
          i = t,
          o = this.session.getNextFoldLine(i),
          a = o ? o.start.row : 1 / 0;
        while (1) {
          if (i > a && (i = o.end.row + 1, o = this.session.getNextFoldLine(i, o), a = o ? o.start.row : 1 / 0), i > n) break;
          var s = this.$lines.createCell(i, e, this.session, c);
          this.$renderCell(s, e, o, i), r.push(s), i++;
        }
        return r;
      }, this.$renderCell = function (e, t, n, i) {
        var o = e.element,
          a = this.session,
          s = o.childNodes[0],
          l = o.childNodes[1],
          c = a.$firstLineNumber,
          u = a.$breakpoints,
          h = a.$decorations,
          f = a.gutterRenderer || this.$renderer,
          d = this.$showFoldWidgets && a.foldWidgets,
          p = n ? n.start.row : Number.MAX_VALUE,
          m = "ace_gutter-cell ";
        if (this.$highlightGutterLine && (i == this.$cursorRow || n && i < this.$cursorRow && i >= p && this.$cursorRow <= n.end.row) && (m += "ace_gutter-active-line ", this.$cursorCell != e && (this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", "")), this.$cursorCell = e)), u[i] && (m += u[i]), h[i] && (m += h[i]), this.$annotations[i] && (m += this.$annotations[i].className), o.className != m && (o.className = m), d) {
          var g = d[i];
          null == g && (g = d[i] = a.getFoldWidget(i));
        }
        if (g) {
          m = "ace_fold-widget ace_" + g;
          "start" == g && i == p && i < n.end.row ? m += " ace_closed" : m += " ace_open", l.className != m && (l.className = m);
          var v = t.lineHeight + "px";
          r.setStyle(l.style, "height", v), r.setStyle(l.style, "display", "inline-block");
        } else l && r.setStyle(l.style, "display", "none");
        var y = (f ? f.getText(a, i) : i + c).toString();
        return y !== s.data && (s.data = y), r.setStyle(e.element.style, "height", this.$lines.computeLineHeight(i, t, a) + "px"), r.setStyle(e.element.style, "top", this.$lines.computeLineTop(i, t, a) + "px"), e.text = y, e;
      }, this.$fixedWidth = !1, this.$highlightGutterLine = !0, this.$renderer = "", this.setHighlightGutterLine = function (e) {
        this.$highlightGutterLine = e;
      }, this.$showLineNumbers = !0, this.$renderer = "", this.setShowLineNumbers = function (e) {
        this.$renderer = !e && {
          getWidth: function () {
            return 0;
          },
          getText: function () {
            return "";
          }
        };
      }, this.getShowLineNumbers = function () {
        return this.$showLineNumbers;
      }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function (e) {
        e ? r.addCssClass(this.element, "ace_folding-enabled") : r.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null;
      }, this.getShowFoldWidgets = function () {
        return this.$showFoldWidgets;
      }, this.$computePadding = function () {
        if (!this.element.firstChild) return {
          left: 0,
          right: 0
        };
        var e = r.computedStyle(this.element.firstChild);
        return this.$padding = {}, this.$padding.left = (parseInt(e.borderLeftWidth) || 0) + (parseInt(e.paddingLeft) || 0) + 1, this.$padding.right = (parseInt(e.borderRightWidth) || 0) + (parseInt(e.paddingRight) || 0), this.$padding;
      }, this.getRegion = function (e) {
        var t = this.$padding || this.$computePadding(),
          n = this.element.getBoundingClientRect();
        return e.x < t.left + n.left ? "markers" : this.$showFoldWidgets && e.x > n.right - t.right ? "foldWidgets" : void 0;
      };
    }).call(l.prototype), t.Gutter = l;
  }), ace.define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    var r = e("../range").Range,
      i = e("../lib/dom"),
      o = function (e) {
        this.element = i.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element);
      };
    (function () {
      function e(e, t, n, r) {
        return (e ? 1 : 0) | (t ? 2 : 0) | (n ? 4 : 0) | (r ? 8 : 0);
      }
      this.$padding = 0, this.setPadding = function (e) {
        this.$padding = e;
      }, this.setSession = function (e) {
        this.session = e;
      }, this.setMarkers = function (e) {
        this.markers = e;
      }, this.elt = function (e, t) {
        var n = -1 != this.i && this.element.childNodes[this.i];
        n ? this.i++ : (n = document.createElement("div"), this.element.appendChild(n), this.i = -1), n.style.cssText = t, n.className = e;
      }, this.update = function (e) {
        if (e) {
          var t;
          for (var n in this.config = e, this.i = 0, this.markers) {
            var r = this.markers[n];
            if (r.range) {
              var i = r.range.clipRows(e.firstRow, e.lastRow);
              if (!i.isEmpty()) if (i = i.toScreenRange(this.session), r.renderer) {
                var o = this.$getTop(i.start.row, e),
                  a = this.$padding + i.start.column * e.characterWidth;
                r.renderer(t, i, a, o, e);
              } else "fullLine" == r.type ? this.drawFullLineMarker(t, i, r.clazz, e) : "screenLine" == r.type ? this.drawScreenLineMarker(t, i, r.clazz, e) : i.isMultiLine() ? "text" == r.type ? this.drawTextMarker(t, i, r.clazz, e) : this.drawMultiLineMarker(t, i, r.clazz, e) : this.drawSingleLineMarker(t, i, r.clazz + " ace_start ace_br15", e);
            } else r.update(t, this, this.session, e);
          }
          if (-1 != this.i) while (this.i < this.element.childElementCount) this.element.removeChild(this.element.lastChild);
        }
      }, this.$getTop = function (e, t) {
        return (e - t.firstRowScreen) * t.lineHeight;
      }, this.drawTextMarker = function (t, n, i, o, a) {
        for (var s = this.session, l = n.start.row, c = n.end.row, u = l, h = 0, f = 0, d = s.getScreenLastRowColumn(u), p = new r(u, n.start.column, u, f); u <= c; u++) p.start.row = p.end.row = u, p.start.column = u == l ? n.start.column : s.getRowWrapIndent(u), p.end.column = d, h = f, f = d, d = u + 1 < c ? s.getScreenLastRowColumn(u + 1) : u == c ? 0 : n.end.column, this.drawSingleLineMarker(t, p, i + (u == l ? " ace_start" : "") + " ace_br" + e(u == l || u == l + 1 && n.start.column, h < f, f > d, u == c), o, u == c ? 0 : 1, a);
      }, this.drawMultiLineMarker = function (e, t, n, r, i) {
        var o = this.$padding,
          a = r.lineHeight,
          s = this.$getTop(t.start.row, r),
          l = o + t.start.column * r.characterWidth;
        if (i = i || "", this.session.$bidiHandler.isBidiRow(t.start.row)) {
          var c = t.clone();
          c.end.row = c.start.row, c.end.column = this.session.getLine(c.start.row).length, this.drawBidiSingleLineMarker(e, c, n + " ace_br1 ace_start", r, null, i);
        } else this.elt(n + " ace_br1 ace_start", "height:" + a + "px;right:0;top:" + s + "px;left:" + l + "px;" + (i || ""));
        if (this.session.$bidiHandler.isBidiRow(t.end.row)) {
          c = t.clone();
          c.start.row = c.end.row, c.start.column = 0, this.drawBidiSingleLineMarker(e, c, n + " ace_br12", r, null, i);
        } else {
          s = this.$getTop(t.end.row, r);
          var u = t.end.column * r.characterWidth;
          this.elt(n + " ace_br12", "height:" + a + "px;width:" + u + "px;top:" + s + "px;left:" + o + "px;" + (i || ""));
        }
        if (a = (t.end.row - t.start.row - 1) * r.lineHeight, !(a <= 0)) {
          s = this.$getTop(t.start.row + 1, r);
          var h = (t.start.column ? 1 : 0) | (t.end.column ? 0 : 8);
          this.elt(n + (h ? " ace_br" + h : ""), "height:" + a + "px;right:0;top:" + s + "px;left:" + o + "px;" + (i || ""));
        }
      }, this.drawSingleLineMarker = function (e, t, n, r, i, o) {
        if (this.session.$bidiHandler.isBidiRow(t.start.row)) return this.drawBidiSingleLineMarker(e, t, n, r, i, o);
        var a = r.lineHeight,
          s = (t.end.column + (i || 0) - t.start.column) * r.characterWidth,
          l = this.$getTop(t.start.row, r),
          c = this.$padding + t.start.column * r.characterWidth;
        this.elt(n, "height:" + a + "px;width:" + s + "px;top:" + l + "px;left:" + c + "px;" + (o || ""));
      }, this.drawBidiSingleLineMarker = function (e, t, n, r, i, o) {
        var a = r.lineHeight,
          s = this.$getTop(t.start.row, r),
          l = this.$padding,
          c = this.session.$bidiHandler.getSelections(t.start.column, t.end.column);
        c.forEach(function (e) {
          this.elt(n, "height:" + a + "px;width:" + e.width + (i || 0) + "px;top:" + s + "px;left:" + (l + e.left) + "px;" + (o || ""));
        }, this);
      }, this.drawFullLineMarker = function (e, t, n, r, i) {
        var o = this.$getTop(t.start.row, r),
          a = r.lineHeight;
        t.start.row != t.end.row && (a += this.$getTop(t.end.row, r) - o), this.elt(n, "height:" + a + "px;top:" + o + "px;left:0;right:0;" + (i || ""));
      }, this.drawScreenLineMarker = function (e, t, n, r, i) {
        var o = this.$getTop(t.start.row, r),
          a = r.lineHeight;
        this.elt(n, "height:" + a + "px;top:" + o + "px;left:0;right:0;" + (i || ""));
      };
    }).call(o.prototype), t.Marker = o;
  }), ace.define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/layer/lines", "ace/lib/event_emitter"], function (e, t, n) {
    "use strict";

    var r = e("../lib/oop"),
      i = e("../lib/dom"),
      o = e("../lib/lang"),
      a = e("./lines").Lines,
      s = e("../lib/event_emitter").EventEmitter,
      l = function (e) {
        this.dom = i, this.element = this.dom.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$updateEolChar = this.$updateEolChar.bind(this), this.$lines = new a(this.element);
      };
    (function () {
      r.implement(this, s), this.EOF_CHAR = "\xb6", this.EOL_CHAR_LF = "\xac", this.EOL_CHAR_CRLF = "\xa4", this.EOL_CHAR = this.EOL_CHAR_LF, this.TAB_CHAR = "\u2014", this.SPACE_CHAR = "\xb7", this.$padding = 0, this.MAX_LINE_LENGTH = 1e4, this.MAX_CHUNK_LENGTH = 250, this.$updateEolChar = function () {
        var e = this.session.doc,
          t = "\n" == e.getNewLineCharacter() && "windows" != e.getNewLineMode(),
          n = t ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
        if (this.EOL_CHAR != n) return this.EOL_CHAR = n, !0;
      }, this.setPadding = function (e) {
        this.$padding = e, this.element.style.margin = "0 " + e + "px";
      }, this.getLineHeight = function () {
        return this.$fontMetrics.$characterSize.height || 0;
      }, this.getCharacterWidth = function () {
        return this.$fontMetrics.$characterSize.width || 0;
      }, this.$setFontMetrics = function (e) {
        this.$fontMetrics = e, this.$fontMetrics.on("changeCharacterSize", function (e) {
          this._signal("changeCharacterSize", e);
        }.bind(this)), this.$pollSizeChanges();
      }, this.checkForSizeChanges = function () {
        this.$fontMetrics.checkForSizeChanges();
      }, this.$pollSizeChanges = function () {
        return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges();
      }, this.setSession = function (e) {
        this.session = e, e && this.$computeTabString();
      }, this.showInvisibles = !1, this.showSpaces = !1, this.showTabs = !1, this.showEOL = !1, this.setShowInvisibles = function (e) {
        return this.showInvisibles != e && (this.showInvisibles = e, "string" == typeof e ? (this.showSpaces = /tab/i.test(e), this.showTabs = /space/i.test(e), this.showEOL = /eol/i.test(e)) : this.showSpaces = this.showTabs = this.showEOL = e, this.$computeTabString(), !0);
      }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function (e) {
        return this.displayIndentGuides != e && (this.displayIndentGuides = e, this.$computeTabString(), !0);
      }, this.$highlightIndentGuides = !0, this.setHighlightIndentGuides = function (e) {
        return this.$highlightIndentGuides !== e && (this.$highlightIndentGuides = e, e);
      }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function () {
        var e = this.session.getTabSize();
        this.tabSize = e;
        for (var t = this.$tabStrings = [0], n = 1; n < e + 1; n++) if (this.showTabs) {
          var r = this.dom.createElement("span");
          r.className = "ace_invisible ace_invisible_tab", r.textContent = o.stringRepeat(this.TAB_CHAR, n), t.push(r);
        } else t.push(this.dom.createTextNode(o.stringRepeat(" ", n), this.element));
        if (this.displayIndentGuides) {
          this.$indentGuideRe = /\s\S| \t|\t |\s$/;
          var i = "ace_indent-guide",
            a = this.showSpaces ? " ace_invisible ace_invisible_space" : "",
            s = this.showSpaces ? o.stringRepeat(this.SPACE_CHAR, this.tabSize) : o.stringRepeat(" ", this.tabSize),
            l = this.showTabs ? " ace_invisible ace_invisible_tab" : "",
            c = this.showTabs ? o.stringRepeat(this.TAB_CHAR, this.tabSize) : s;
          r = this.dom.createElement("span");
          r.className = i + a, r.textContent = s, this.$tabStrings[" "] = r;
          r = this.dom.createElement("span");
          r.className = i + l, r.textContent = c, this.$tabStrings["\t"] = r;
        }
      }, this.updateLines = function (e, t, n) {
        if (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) return this.update(e);
        this.config = e;
        for (var r = Math.max(t, e.firstRow), i = Math.min(n, e.lastRow), o = this.element.childNodes, a = 0, s = e.firstRow; s < r; s++) {
          var l = this.session.getFoldLine(s);
          if (l) {
            if (l.containsRow(r)) {
              r = l.start.row;
              break;
            }
            s = l.end.row;
          }
          a++;
        }
        var c = !1,
          u = (s = r, l = this.session.getNextFoldLine(s), l ? l.start.row : 1 / 0);
        while (1) {
          if (s > u && (s = l.end.row + 1, l = this.session.getNextFoldLine(s, l), u = l ? l.start.row : 1 / 0), s > i) break;
          var h = o[a++];
          if (h) {
            this.dom.removeChildren(h), this.$renderLine(h, s, s == u && l), c && (h.style.top = this.$lines.computeLineTop(s, e, this.session) + "px");
            var f = e.lineHeight * this.session.getRowLength(s) + "px";
            h.style.height != f && (c = !0, h.style.height = f);
          }
          s++;
        }
        if (c) while (a < this.$lines.cells.length) {
          var d = this.$lines.cells[a++];
          d.element.style.top = this.$lines.computeLineTop(d.row, e, this.session) + "px";
        }
      }, this.scrollLines = function (e) {
        var t = this.config;
        if (this.config = e, this.$lines.pageChanged(t, e)) return this.update(e);
        this.$lines.moveContainer(e);
        var n = e.lastRow,
          r = t ? t.lastRow : -1;
        if (!t || r < e.firstRow) return this.update(e);
        if (n < t.firstRow) return this.update(e);
        if (!t || t.lastRow < e.firstRow) return this.update(e);
        if (e.lastRow < t.firstRow) return this.update(e);
        if (t.firstRow < e.firstRow) for (var i = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); i > 0; i--) this.$lines.shift();
        if (t.lastRow > e.lastRow) for (i = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); i > 0; i--) this.$lines.pop();
        e.firstRow < t.firstRow && this.$lines.unshift(this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1)), e.lastRow > t.lastRow && this.$lines.push(this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow)), this.$highlightIndentGuide();
      }, this.$renderLinesFragment = function (e, t, n) {
        var r = [],
          o = t,
          a = this.session.getNextFoldLine(o),
          s = a ? a.start.row : 1 / 0;
        while (1) {
          if (o > s && (o = a.end.row + 1, a = this.session.getNextFoldLine(o, a), s = a ? a.start.row : 1 / 0), o > n) break;
          var l = this.$lines.createCell(o, e, this.session),
            c = l.element;
          this.dom.removeChildren(c), i.setStyle(c.style, "height", this.$lines.computeLineHeight(o, e, this.session) + "px"), i.setStyle(c.style, "top", this.$lines.computeLineTop(o, e, this.session) + "px"), this.$renderLine(c, o, o == s && a), this.$useLineGroups() ? c.className = "ace_line_group" : c.className = "ace_line", r.push(l), o++;
        }
        return r;
      }, this.update = function (e) {
        this.$lines.moveContainer(e), this.config = e;
        var t = e.firstRow,
          n = e.lastRow,
          r = this.$lines;
        while (r.getLength()) r.pop();
        r.push(this.$renderLinesFragment(e, t, n));
      }, this.$textToken = {
        text: !0,
        rparen: !0,
        lparen: !0
      }, this.$renderTokenInChunks = function (e, t, n, r) {
        for (var i, o = 0; o < r.length; o += this.MAX_CHUNK_LENGTH) {
          var a = r.substring(o, o + this.MAX_CHUNK_LENGTH),
            s = {
              type: n.type,
              value: a
            };
          i = this.$renderToken(e, t + o, s, a);
        }
        return i;
      }, this.$renderToken = function (e, t, n, r) {
        var i,
          a = this,
          s = /(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC\u2066\u2067\u2068\u202A\u202B\u202D\u202E\u202C\u2069]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g,
          l = this.dom.createFragment(this.element),
          c = 0;
        while (i = s.exec(r)) {
          var u = i[1],
            h = i[2],
            f = i[3],
            d = i[4],
            p = i[5];
          if (a.showSpaces || !h) {
            var m = c != i.index ? r.slice(c, i.index) : "";
            if (c = i.index + i[0].length, m && l.appendChild(this.dom.createTextNode(m, this.element)), u) {
              var g = a.session.getScreenTabSize(t + i.index);
              l.appendChild(a.$tabStrings[g].cloneNode(!0)), t += g - 1;
            } else if (h) {
              if (a.showSpaces) {
                var v = this.dom.createElement("span");
                v.className = "ace_invisible ace_invisible_space", v.textContent = o.stringRepeat(a.SPACE_CHAR, h.length), l.appendChild(v);
              } else l.appendChild(this.com.createTextNode(h, this.element));
            } else if (f) {
              v = this.dom.createElement("span");
              v.className = "ace_invisible ace_invisible_space ace_invalid", v.textContent = o.stringRepeat(a.SPACE_CHAR, f.length), l.appendChild(v);
            } else if (d) {
              t += 1;
              v = this.dom.createElement("span");
              v.style.width = 2 * a.config.characterWidth + "px", v.className = a.showSpaces ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk", v.textContent = a.showSpaces ? a.SPACE_CHAR : d, l.appendChild(v);
            } else if (p) {
              t += 1;
              v = this.dom.createElement("span");
              v.style.width = 2 * a.config.characterWidth + "px", v.className = "ace_cjk", v.textContent = p, l.appendChild(v);
            }
          }
        }
        l.appendChild(this.dom.createTextNode(c ? r.slice(c) : r, this.element));
        v = this.dom.createElement("span");
        if (!this.$textToken[n.type]) {
          var y = "ace_" + n.type.replace(/\./g, " ace_");
          "fold" == n.type && (v.style.width = n.value.length * this.config.characterWidth + "px"), v.className = y;
        }
        return v.appendChild(l), e.appendChild(v), t + r.length;
      }, this.renderIndentGuide = function (e, t, n) {
        var r = t.search(this.$indentGuideRe);
        if (r <= 0 || r >= n) return t;
        if (" " == t[0]) {
          r -= r % this.tabSize;
          for (var i = r / this.tabSize, o = 0; o < i; o++) e.appendChild(this.$tabStrings[" "].cloneNode(!0));
          return this.$highlightIndentGuide(), t.substr(r);
        }
        if ("\t" == t[0]) {
          for (o = 0; o < r; o++) e.appendChild(this.$tabStrings["\t"].cloneNode(!0));
          return this.$highlightIndentGuide(), t.substr(r);
        }
        return this.$highlightIndentGuide(), t;
      }, this.$highlightIndentGuide = function () {
        if (this.$highlightIndentGuides && this.displayIndentGuides) {
          this.$highlightIndentGuideMarker = {
            indentLevel: void 0,
            start: void 0,
            end: void 0,
            dir: void 0
          };
          var e = this.session.doc.$lines;
          if (e) {
            var t = this.session.selection.getCursor(),
              n = /^\s*/.exec(this.session.doc.getLine(t.row))[0].length,
              r = Math.floor(n / this.tabSize);
            this.$highlightIndentGuideMarker = {
              indentLevel: r,
              start: t.row
            };
            var i = this.session.$bracketHighlight;
            if (i) for (var o = this.session.$bracketHighlight.ranges, a = 0; a < o.length; a++) if (t.row !== o[a].start.row) {
              this.$highlightIndentGuideMarker.end = o[a].start.row, t.row > o[a].start.row ? this.$highlightIndentGuideMarker.dir = -1 : this.$highlightIndentGuideMarker.dir = 1;
              break;
            }
            if (!this.$highlightIndentGuideMarker.end && "" !== e[t.row] && t.column === e[t.row].length) {
              this.$highlightIndentGuideMarker.dir = 1;
              for (a = t.row + 1; a < e.length; a++) {
                var s = e[a],
                  l = /^\s*/.exec(s)[0].length;
                if ("" !== s && (this.$highlightIndentGuideMarker.end = a, l <= n)) break;
              }
            }
            this.$renderHighlightIndentGuide();
          }
        }
      }, this.$clearActiveIndentGuide = function () {
        for (var e = this.$lines.cells, t = 0; t < e.length; t++) {
          var n = e[t],
            r = n.element.childNodes;
          if (r.length > 0) for (var i = 0; i < r.length; i++) if (r[i].classList && r[i].classList.contains("ace_indent-guide-active")) {
            r[i].classList.remove("ace_indent-guide-active");
            break;
          }
        }
      }, this.$setIndentGuideActive = function (e, t) {
        var n = this.session.doc.getLine(e.row);
        if ("" !== n) {
          var r = e.element.childNodes;
          if (r) {
            var i = r[t - 1];
            i && i.classList && i.classList.contains("ace_indent-guide") && i.classList.add("ace_indent-guide-active");
          }
        }
      }, this.$renderHighlightIndentGuide = function () {
        if (this.$lines) {
          var e = this.$lines.cells;
          this.$clearActiveIndentGuide();
          var t = this.$highlightIndentGuideMarker.indentLevel;
          if (0 !== t) if (1 === this.$highlightIndentGuideMarker.dir) for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (this.$highlightIndentGuideMarker.end && r.row >= this.$highlightIndentGuideMarker.start + 1) {
              if (r.row >= this.$highlightIndentGuideMarker.end) break;
              this.$setIndentGuideActive(r, t);
            }
          } else for (n = e.length - 1; n >= 0; n--) {
            r = e[n];
            if (this.$highlightIndentGuideMarker.end && r.row < this.$highlightIndentGuideMarker.start) {
              if (r.row <= this.$highlightIndentGuideMarker.end) break;
              this.$setIndentGuideActive(r, t);
            }
          }
        }
      }, this.$createLineElement = function (e) {
        var t = this.dom.createElement("div");
        return t.className = "ace_line", t.style.height = this.config.lineHeight + "px", t;
      }, this.$renderWrappedLine = function (e, t, n) {
        var r = 0,
          i = 0,
          a = n[0],
          s = 0,
          l = this.$createLineElement();
        e.appendChild(l);
        for (var c = 0; c < t.length; c++) {
          var u = t[c],
            h = u.value;
          if (0 == c && this.displayIndentGuides) {
            if (r = h.length, h = this.renderIndentGuide(l, h, a), !h) continue;
            r -= h.length;
          }
          if (r + h.length < a) s = this.$renderTokenInChunks(l, s, u, h), r += h.length;else {
            while (r + h.length >= a) s = this.$renderTokenInChunks(l, s, u, h.substring(0, a - r)), h = h.substring(a - r), r = a, l = this.$createLineElement(), e.appendChild(l), l.appendChild(this.dom.createTextNode(o.stringRepeat("\xa0", n.indent), this.element)), i++, s = 0, a = n[i] || Number.MAX_VALUE;
            0 != h.length && (r += h.length, s = this.$renderTokenInChunks(l, s, u, h));
          }
        }
        n[n.length - 1] > this.MAX_LINE_LENGTH && this.$renderOverflowMessage(l, s, null, "", !0);
      }, this.$renderSimpleLine = function (e, t) {
        for (var n = 0, r = 0; r < t.length; r++) {
          var i = t[r],
            o = i.value;
          if (0 != r || !this.displayIndentGuides || (o = this.renderIndentGuide(e, o), o)) {
            if (n + o.length > this.MAX_LINE_LENGTH) return void this.$renderOverflowMessage(e, n, i, o);
            n = this.$renderTokenInChunks(e, n, i, o);
          }
        }
      }, this.$renderOverflowMessage = function (e, t, n, r, i) {
        n && this.$renderTokenInChunks(e, t, n, r.slice(0, this.MAX_LINE_LENGTH - t));
        var o = this.dom.createElement("span");
        o.className = "ace_inline_button ace_keyword ace_toggle_wrap", o.textContent = i ? "<hide>" : "<click to see more...>", e.appendChild(o);
      }, this.$renderLine = function (e, t, n) {
        if (n || 0 == n || (n = this.session.getFoldLine(t)), n) var r = this.$getFoldLineTokens(t, n);else r = this.session.getTokens(t);
        var i = e;
        if (r.length) {
          var o = this.session.getRowSplitData(t);
          if (o && o.length) {
            this.$renderWrappedLine(e, r, o);
            i = e.lastChild;
          } else {
            i = e;
            this.$useLineGroups() && (i = this.$createLineElement(), e.appendChild(i)), this.$renderSimpleLine(i, r);
          }
        } else this.$useLineGroups() && (i = this.$createLineElement(), e.appendChild(i));
        if (this.showEOL && i) {
          n && (t = n.end.row);
          var a = this.dom.createElement("span");
          a.className = "ace_invisible ace_invisible_eol", a.textContent = t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, i.appendChild(a);
        }
      }, this.$getFoldLineTokens = function (e, t) {
        var n = this.session,
          r = [];
        function i(e, t, n) {
          var i = 0,
            o = 0;
          while (o + e[i].value.length < t) if (o += e[i].value.length, i++, i == e.length) return;
          if (o != t) {
            var a = e[i].value.substring(t - o);
            a.length > n - t && (a = a.substring(0, n - t)), r.push({
              type: e[i].type,
              value: a
            }), o = t + a.length, i += 1;
          }
          while (o < n && i < e.length) {
            a = e[i].value;
            a.length + o > n ? r.push({
              type: e[i].type,
              value: a.substring(0, n - o)
            }) : r.push(e[i]), o += a.length, i += 1;
          }
        }
        var o = n.getTokens(e);
        return t.walk(function (e, t, a, s, l) {
          null != e ? r.push({
            type: "fold",
            value: e
          }) : (l && (o = n.getTokens(t)), o.length && i(o, s, a));
        }, t.end.row, this.session.getLine(t.end.row).length), r;
      }, this.$useLineGroups = function () {
        return this.session.getUseWrapMode();
      }, this.destroy = function () {};
    }).call(l.prototype), t.Text = l;
  }), ace.define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    var r = e("../lib/dom"),
      i = function (e) {
        this.element = r.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), r.addCssClass(this.element, "ace_hidden-cursors"), this.$updateCursors = this.$updateOpacity.bind(this);
      };
    (function () {
      this.$updateOpacity = function (e) {
        for (var t = this.cursors, n = t.length; n--;) r.setStyle(t[n].style, "opacity", e ? "" : "0");
      }, this.$startCssAnimation = function () {
        for (var e = this.cursors, t = e.length; t--;) e[t].style.animationDuration = this.blinkInterval + "ms";
        this.$isAnimating = !0, setTimeout(function () {
          this.$isAnimating && r.addCssClass(this.element, "ace_animate-blinking");
        }.bind(this));
      }, this.$stopCssAnimation = function () {
        this.$isAnimating = !1, r.removeCssClass(this.element, "ace_animate-blinking");
      }, this.$padding = 0, this.setPadding = function (e) {
        this.$padding = e;
      }, this.setSession = function (e) {
        this.session = e;
      }, this.setBlinking = function (e) {
        e != this.isBlinking && (this.isBlinking = e, this.restartTimer());
      }, this.setBlinkInterval = function (e) {
        e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer());
      }, this.setSmoothBlinking = function (e) {
        e != this.smoothBlinking && (this.smoothBlinking = e, r.setCssClass(this.element, "ace_smooth-blinking", e), this.$updateCursors(!0), this.restartTimer());
      }, this.addCursor = function () {
        var e = r.createElement("div");
        return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e;
      }, this.removeCursor = function () {
        if (this.cursors.length > 1) {
          var e = this.cursors.pop();
          return e.parentNode.removeChild(e), e;
        }
      }, this.hideCursor = function () {
        this.isVisible = !1, r.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer();
      }, this.showCursor = function () {
        this.isVisible = !0, r.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer();
      }, this.restartTimer = function () {
        var e = this.$updateCursors;
        if (clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.$stopCssAnimation(), this.smoothBlinking && (this.$isSmoothBlinking = !1, r.removeCssClass(this.element, "ace_smooth-blinking")), e(!0), this.isBlinking && this.blinkInterval && this.isVisible) {
          if (this.smoothBlinking && (this.$isSmoothBlinking = !0, setTimeout(function () {
            this.$isSmoothBlinking && r.addCssClass(this.element, "ace_smooth-blinking");
          }.bind(this))), r.HAS_CSS_ANIMATION) this.$startCssAnimation();else {
            var t = function () {
              this.timeoutId = setTimeout(function () {
                e(!1);
              }, .6 * this.blinkInterval);
            }.bind(this);
            this.intervalId = setInterval(function () {
              e(!0), t();
            }, this.blinkInterval), t();
          }
        } else this.$stopCssAnimation();
      }, this.getPixelPosition = function (e, t) {
        if (!this.config || !this.session) return {
          left: 0,
          top: 0
        };
        e || (e = this.session.selection.getCursor());
        var n = this.session.documentToScreenPosition(e),
          r = this.$padding + (this.session.$bidiHandler.isBidiRow(n.row, e.row) ? this.session.$bidiHandler.getPosLeft(n.column) : n.column * this.config.characterWidth),
          i = (n.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
        return {
          left: r,
          top: i
        };
      }, this.isCursorInView = function (e, t) {
        return e.top >= 0 && e.top < t.maxHeight;
      }, this.update = function (e) {
        this.config = e;
        var t = this.session.$selectionMarkers,
          n = 0,
          i = 0;
        void 0 !== t && 0 !== t.length || (t = [{
          cursor: null
        }]);
        n = 0;
        for (var o = t.length; n < o; n++) {
          var a = this.getPixelPosition(t[n].cursor, !0);
          if (!((a.top > e.height + e.offset || a.top < 0) && n > 1)) {
            var s = this.cursors[i++] || this.addCursor(),
              l = s.style;
            this.drawCursor ? this.drawCursor(s, a, e, t[n], this.session) : this.isCursorInView(a, e) ? (r.setStyle(l, "display", "block"), r.translate(s, a.left, a.top), r.setStyle(l, "width", Math.round(e.characterWidth) + "px"), r.setStyle(l, "height", e.lineHeight + "px")) : r.setStyle(l, "display", "none");
          }
        }
        while (this.cursors.length > i) this.removeCursor();
        var c = this.session.getOverwrite();
        this.$setOverwrite(c), this.$pixelPos = a, this.restartTimer();
      }, this.drawCursor = null, this.$setOverwrite = function (e) {
        e != this.overwrite && (this.overwrite = e, e ? r.addCssClass(this.element, "ace_overwrite-cursors") : r.removeCssClass(this.element, "ace_overwrite-cursors"));
      }, this.destroy = function () {
        clearInterval(this.intervalId), clearTimeout(this.timeoutId);
      };
    }).call(i.prototype), t.Cursor = i;
  }), ace.define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./lib/dom"),
      o = e("./lib/event"),
      a = e("./lib/event_emitter").EventEmitter,
      s = 32768,
      l = function (e) {
        this.element = i.createElement("div"), this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix, this.inner = i.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.inner.textContent = "\xa0", this.element.appendChild(this.inner), e.appendChild(this.element), this.setVisible(!1), this.skipEvent = !1, o.addListener(this.element, "scroll", this.onScroll.bind(this)), o.addListener(this.element, "mousedown", o.preventDefault);
      };
    (function () {
      r.implement(this, a), this.setVisible = function (e) {
        this.element.style.display = e ? "" : "none", this.isVisible = e, this.coeff = 1;
      };
    }).call(l.prototype);
    var c = function (e, t) {
      l.call(this, e), this.scrollTop = 0, this.scrollHeight = 0, t.$scrollbarWidth = this.width = i.scrollbarWidth(e.ownerDocument), this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px", this.$minWidth = 0;
    };
    r.inherits(c, l), function () {
      this.classSuffix = "-v", this.onScroll = function () {
        if (!this.skipEvent) {
          if (this.scrollTop = this.element.scrollTop, 1 != this.coeff) {
            var e = this.element.clientHeight / this.scrollHeight;
            this.scrollTop = this.scrollTop * (1 - e) / (this.coeff - e);
          }
          this._emit("scroll", {
            data: this.scrollTop
          });
        }
        this.skipEvent = !1;
      }, this.getWidth = function () {
        return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0);
      }, this.setHeight = function (e) {
        this.element.style.height = e + "px";
      }, this.setInnerHeight = this.setScrollHeight = function (e) {
        this.scrollHeight = e, e > s ? (this.coeff = s / e, e = s) : 1 != this.coeff && (this.coeff = 1), this.inner.style.height = e + "px";
      }, this.setScrollTop = function (e) {
        this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = e, this.element.scrollTop = e * this.coeff);
      };
    }.call(c.prototype);
    var u = function (e, t) {
      l.call(this, e), this.scrollLeft = 0, this.height = t.$scrollbarWidth, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px";
    };
    r.inherits(u, l), function () {
      this.classSuffix = "-h", this.onScroll = function () {
        this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", {
          data: this.scrollLeft
        })), this.skipEvent = !1;
      }, this.getHeight = function () {
        return this.isVisible ? this.height : 0;
      }, this.setWidth = function (e) {
        this.element.style.width = e + "px";
      }, this.setInnerWidth = function (e) {
        this.inner.style.width = e + "px";
      }, this.setScrollWidth = function (e) {
        this.inner.style.width = e + "px";
      }, this.setScrollLeft = function (e) {
        this.scrollLeft != e && (this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = e);
      };
    }.call(u.prototype), t.ScrollBar = c, t.ScrollBarV = c, t.ScrollBarH = u, t.VScrollBar = c, t.HScrollBar = u;
  }), ace.define("ace/scrollbar_custom", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./lib/dom"),
      o = e("./lib/event"),
      a = e("./lib/event_emitter").EventEmitter;
    i.importCssString(".ace_editor>.ace_sb-v div, .ace_editor>.ace_sb-h div{\n  position: absolute;\n  background: rgba(128, 128, 128, 0.6);\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 1px solid #bbb;\n  border-radius: 2px;\n  z-index: 8;\n}\n.ace_editor>.ace_sb-v, .ace_editor>.ace_sb-h {\n  position: absolute;\n  z-index: 6;\n  background: none;\n  overflow: hidden!important;\n}\n.ace_editor>.ace_sb-v {\n  z-index: 6;\n  right: 0;\n  top: 0;\n  width: 12px;\n}\n.ace_editor>.ace_sb-v div {\n  z-index: 8;\n  right: 0;\n  width: 100%;\n}\n.ace_editor>.ace_sb-h {\n  bottom: 0;\n  left: 0;\n  height: 12px;\n}\n.ace_editor>.ace_sb-h div {\n  bottom: 0;\n  height: 100%;\n}\n.ace_editor>.ace_sb_grabbed {\n  z-index: 8;\n  background: #000;\n}", "ace_scrollbar.css", !1);
    var s = function (e) {
      this.element = i.createElement("div"), this.element.className = "ace_sb" + this.classSuffix, this.inner = i.createElement("div"), this.inner.className = "", this.element.appendChild(this.inner), this.VScrollWidth = 12, this.HScrollHeight = 12, e.appendChild(this.element), this.setVisible(!1), this.skipEvent = !1, o.addMultiMouseDownListener(this.element, [500, 300, 300], this, "onMouseDown");
    };
    (function () {
      r.implement(this, a), this.setVisible = function (e) {
        this.element.style.display = e ? "" : "none", this.isVisible = e, this.coeff = 1;
      };
    }).call(s.prototype);
    var l = function (e, t) {
      s.call(this, e), this.scrollTop = 0, this.scrollHeight = 0, this.parent = e, this.width = this.VScrollWidth, this.renderer = t, this.inner.style.width = this.element.style.width = (this.width || 15) + "px", this.$minWidth = 0;
    };
    r.inherits(l, s), function () {
      this.classSuffix = "-v", r.implement(this, a), this.onMouseDown = function (e, t) {
        if ("mousedown" === e && 0 === o.getButton(t) && 2 !== t.detail) {
          if (t.target === this.inner) {
            var n = this,
              r = t.clientY,
              i = function (e) {
                r = e.clientY;
              },
              a = function () {
                clearInterval(u);
              },
              s = t.clientY,
              l = this.thumbTop,
              c = function () {
                if (void 0 !== r) {
                  var e = n.scrollTopFromThumbTop(l + r - s);
                  e !== n.scrollTop && n._emit("scroll", {
                    data: e
                  });
                }
              };
            o.capture(this.inner, i, a);
            var u = setInterval(c, 20);
            return o.preventDefault(t);
          }
          var h = t.clientY - this.element.getBoundingClientRect().top - this.thumbHeight / 2;
          return this._emit("scroll", {
            data: this.scrollTopFromThumbTop(h)
          }), o.preventDefault(t);
        }
      }, this.getHeight = function () {
        return this.height;
      }, this.scrollTopFromThumbTop = function (e) {
        var t = e * (this.pageHeight - this.viewHeight) / (this.slideHeight - this.thumbHeight);
        return t >>= 0, t < 0 ? t = 0 : t > this.pageHeight - this.viewHeight && (t = this.pageHeight - this.viewHeight), t;
      }, this.getWidth = function () {
        return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0);
      }, this.setHeight = function (e) {
        this.height = Math.max(0, e), this.slideHeight = this.height, this.viewHeight = this.height, this.setScrollHeight(this.pageHeight, !0);
      }, this.setInnerHeight = this.setScrollHeight = function (e, t) {
        (this.pageHeight !== e || t) && (this.pageHeight = e, this.thumbHeight = this.slideHeight * this.viewHeight / this.pageHeight, this.thumbHeight > this.slideHeight && (this.thumbHeight = this.slideHeight), this.thumbHeight < 15 && (this.thumbHeight = 15), this.inner.style.height = this.thumbHeight + "px", this.scrollTop > this.pageHeight - this.viewHeight && (this.scrollTop = this.pageHeight - this.viewHeight, this.scrollTop < 0 && (this.scrollTop = 0), this._emit("scroll", {
          data: this.scrollTop
        })));
      }, this.setScrollTop = function (e) {
        this.scrollTop = e, e < 0 && (e = 0), this.thumbTop = e * (this.slideHeight - this.thumbHeight) / (this.pageHeight - this.viewHeight), this.inner.style.top = this.thumbTop + "px";
      };
    }.call(l.prototype);
    var c = function (e, t) {
      s.call(this, e), this.scrollLeft = 0, this.scrollWidth = 0, this.height = this.HScrollHeight, this.inner.style.height = this.element.style.height = (this.height || 12) + "px", this.renderer = t;
    };
    r.inherits(c, s), function () {
      this.classSuffix = "-h", r.implement(this, a), this.onMouseDown = function (e, t) {
        if ("mousedown" === e && 0 === o.getButton(t) && 2 !== t.detail) {
          if (t.target === this.inner) {
            var n = this,
              r = t.clientX,
              i = function (e) {
                r = e.clientX;
              },
              a = function () {
                clearInterval(u);
              },
              s = t.clientX,
              l = this.thumbLeft,
              c = function () {
                if (void 0 !== r) {
                  var e = n.scrollLeftFromThumbLeft(l + r - s);
                  e !== n.scrollLeft && n._emit("scroll", {
                    data: e
                  });
                }
              };
            o.capture(this.inner, i, a);
            var u = setInterval(c, 20);
            return o.preventDefault(t);
          }
          var h = t.clientX - this.element.getBoundingClientRect().left - this.thumbWidth / 2;
          return this._emit("scroll", {
            data: this.scrollLeftFromThumbLeft(h)
          }), o.preventDefault(t);
        }
      }, this.getHeight = function () {
        return this.isVisible ? this.height : 0;
      }, this.scrollLeftFromThumbLeft = function (e) {
        var t = e * (this.pageWidth - this.viewWidth) / (this.slideWidth - this.thumbWidth);
        return t >>= 0, t < 0 ? t = 0 : t > this.pageWidth - this.viewWidth && (t = this.pageWidth - this.viewWidth), t;
      }, this.setWidth = function (e) {
        this.width = Math.max(0, e), this.element.style.width = this.width + "px", this.slideWidth = this.width, this.viewWidth = this.width, this.setScrollWidth(this.pageWidth, !0);
      }, this.setInnerWidth = this.setScrollWidth = function (e, t) {
        (this.pageWidth !== e || t) && (this.pageWidth = e, this.thumbWidth = this.slideWidth * this.viewWidth / this.pageWidth, this.thumbWidth > this.slideWidth && (this.thumbWidth = this.slideWidth), this.thumbWidth < 15 && (this.thumbWidth = 15), this.inner.style.width = this.thumbWidth + "px", this.scrollLeft > this.pageWidth - this.viewWidth && (this.scrollLeft = this.pageWidth - this.viewWidth, this.scrollLeft < 0 && (this.scrollLeft = 0), this._emit("scroll", {
          data: this.scrollLeft
        })));
      }, this.setScrollLeft = function (e) {
        this.scrollLeft = e, e < 0 && (e = 0), this.thumbLeft = e * (this.slideWidth - this.thumbWidth) / (this.pageWidth - this.viewWidth), this.inner.style.left = this.thumbLeft + "px";
      };
    }.call(c.prototype), t.ScrollBar = l, t.ScrollBarV = l, t.ScrollBarH = c, t.VScrollBar = l, t.HScrollBar = c;
  }), ace.define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function (e, t, n) {
    "use strict";

    var r = e("./lib/event"),
      i = function (e, t) {
        this.onRender = e, this.pending = !1, this.changes = 0, this.$recursionLimit = 2, this.window = t || window;
        var n = this;
        this._flush = function (e) {
          n.pending = !1;
          var t = n.changes;
          if (t && (r.blockIdle(100), n.changes = 0, n.onRender(t)), n.changes) {
            if (n.$recursionLimit-- < 0) return;
            n.schedule();
          } else n.$recursionLimit = 2;
        };
      };
    (function () {
      this.schedule = function (e) {
        this.changes = this.changes | e, this.changes && !this.pending && (r.nextFrame(this._flush), this.pending = !0);
      }, this.clear = function (e) {
        var t = this.changes;
        return this.changes = 0, t;
      };
    }).call(i.prototype), t.RenderLoop = i;
  }), ace.define("ace/layer/font_metrics", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/event", "ace/lib/useragent", "ace/lib/event_emitter"], function (e, t, n) {
    var r = e("../lib/oop"),
      i = e("../lib/dom"),
      o = e("../lib/lang"),
      a = e("../lib/event"),
      s = e("../lib/useragent"),
      l = e("../lib/event_emitter").EventEmitter,
      c = 250,
      u = "function" == typeof ResizeObserver,
      h = 200,
      f = t.FontMetrics = function (e, t) {
        this.charCount = t || c, this.el = i.createElement("div"), this.$setMeasureNodeStyles(this.el.style, !0), this.$main = i.createElement("div"), this.$setMeasureNodeStyles(this.$main.style), this.$measureNode = i.createElement("div"), this.$setMeasureNodeStyles(this.$measureNode.style), this.el.appendChild(this.$main), this.el.appendChild(this.$measureNode), e.appendChild(this.el), this.$measureNode.textContent = o.stringRepeat("X", this.charCount), this.$characterSize = {
          width: 0,
          height: 0
        }, u ? this.$addObserver() : this.checkForSizeChanges();
      };
    (function () {
      r.implement(this, l), this.$characterSize = {
        width: 0,
        height: 0
      }, this.$setMeasureNodeStyles = function (e, t) {
        e.width = e.height = "auto", e.left = e.top = "0px", e.visibility = "hidden", e.position = "absolute", e.whiteSpace = "pre", s.isIE < 8 ? e["font-family"] = "inherit" : e.font = "inherit", e.overflow = t ? "hidden" : "visible";
      }, this.checkForSizeChanges = function (e) {
        if (void 0 === e && (e = this.$measureSizes()), e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
          this.$measureNode.style.fontWeight = "bold";
          var t = this.$measureSizes();
          this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.charSizes = Object.create(null), this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", {
            data: e
          });
        }
      }, this.$addObserver = function () {
        var e = this;
        this.$observer = new window.ResizeObserver(function (t) {
          e.checkForSizeChanges();
        }), this.$observer.observe(this.$measureNode);
      }, this.$pollSizeChanges = function () {
        if (this.$pollSizeChangesTimer || this.$observer) return this.$pollSizeChangesTimer;
        var e = this;
        return this.$pollSizeChangesTimer = a.onIdle(function t() {
          e.checkForSizeChanges(), a.onIdle(t, 500);
        }, 500);
      }, this.setPolling = function (e) {
        e ? this.$pollSizeChanges() : this.$pollSizeChangesTimer && (clearInterval(this.$pollSizeChangesTimer), this.$pollSizeChangesTimer = 0);
      }, this.$measureSizes = function (e) {
        e = e || this.$measureNode;
        var t = e.getBoundingClientRect(),
          n = {
            height: t.height,
            width: t.width / this.charCount
          };
        return 0 === n.width || 0 === n.height ? null : n;
      }, this.$measureCharWidth = function (e) {
        this.$main.textContent = o.stringRepeat(e, this.charCount);
        var t = this.$main.getBoundingClientRect();
        return t.width / this.charCount;
      }, this.getCharacterWidth = function (e) {
        var t = this.charSizes[e];
        return void 0 === t && (t = this.charSizes[e] = this.$measureCharWidth(e) / this.$characterSize.width), t;
      }, this.destroy = function () {
        clearInterval(this.$pollSizeChangesTimer), this.$observer && this.$observer.disconnect(), this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el);
      }, this.$getZoom = function e(t) {
        return t && t.parentElement ? (window.getComputedStyle(t).zoom || 1) * e(t.parentElement) : 1;
      }, this.$initTransformMeasureNodes = function () {
        var e = function (e, t) {
          return ["div", {
            style: "position: absolute;top:" + e + "px;left:" + t + "px;"
          }];
        };
        this.els = i.buildDom([e(0, 0), e(h, 0), e(0, h), e(h, h)], this.el);
      }, this.transformCoordinates = function (e, t) {
        if (e) {
          var n = this.$getZoom(this.el);
          e = a(1 / n, e);
        }
        function r(e, t, n) {
          var r = e[1] * t[0] - e[0] * t[1];
          return [(-t[1] * n[0] + t[0] * n[1]) / r, (+e[1] * n[0] - e[0] * n[1]) / r];
        }
        function i(e, t) {
          return [e[0] - t[0], e[1] - t[1]];
        }
        function o(e, t) {
          return [e[0] + t[0], e[1] + t[1]];
        }
        function a(e, t) {
          return [e * t[0], e * t[1]];
        }
        function s(e) {
          var t = e.getBoundingClientRect();
          return [t.left, t.top];
        }
        this.els || this.$initTransformMeasureNodes();
        var l = s(this.els[0]),
          c = s(this.els[1]),
          u = s(this.els[2]),
          f = s(this.els[3]),
          d = r(i(f, c), i(f, u), i(o(c, u), o(f, l))),
          p = a(1 + d[0], i(c, l)),
          m = a(1 + d[1], i(u, l));
        if (t) {
          var g = t,
            v = d[0] * g[0] / h + d[1] * g[1] / h + 1,
            y = o(a(g[0], p), a(g[1], m));
          return o(a(1 / v / h, y), l);
        }
        var b = i(e, l),
          w = r(i(p, a(d[0], b)), i(m, a(d[1], b)), b);
        return a(h, w);
      };
    }).call(f.prototype);
  }), ace.define("ace/css/editor.css", ["require", "exports", "module"], function (e, t, n) {
    n.exports = '/*\nstyles = []\nfor (var i = 1; i < 16; i++) {\n    styles.push(".ace_br" + i + "{" + (\n        ["top-left", "top-right", "bottom-right", "bottom-left"]\n    ).map(function(x, j) {\n        return i & (1<<j) ? "border-" + x + "-radius: 3px;" : "" \n    }).filter(Boolean).join(" ") + "}")\n}\nstyles.join("\\n")\n*/\n.ace_br1 {border-top-left-radius    : 3px;}\n.ace_br2 {border-top-right-radius   : 3px;}\n.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}\n.ace_br4 {border-bottom-right-radius: 3px;}\n.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}\n.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}\n.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}\n.ace_br8 {border-bottom-left-radius : 3px;}\n.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}\n.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}\n.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}\n.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}\n.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}\n.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}\n.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}\n\n\n.ace_editor {\n    position: relative;\n    overflow: hidden;\n    padding: 0;\n    font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;\n    direction: ltr;\n    text-align: left;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n.ace_scroller {\n    position: absolute;\n    overflow: hidden;\n    top: 0;\n    bottom: 0;\n    background-color: inherit;\n    -ms-user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    cursor: text;\n}\n\n.ace_content {\n    position: absolute;\n    box-sizing: border-box;\n    min-width: 100%;\n    contain: style size layout;\n    font-variant-ligatures: no-common-ligatures;\n}\n\n.ace_dragging .ace_scroller:before{\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    content: \'\';\n    background: rgba(250, 250, 250, 0.01);\n    z-index: 1000;\n}\n.ace_dragging.ace_dark .ace_scroller:before{\n    background: rgba(0, 0, 0, 0.01);\n}\n\n.ace_gutter {\n    position: absolute;\n    overflow : hidden;\n    width: auto;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    cursor: default;\n    z-index: 4;\n    -ms-user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    contain: style size layout;\n}\n\n.ace_gutter-active-line {\n    position: absolute;\n    left: 0;\n    right: 0;\n}\n\n.ace_scroller.ace_scroll-left {\n    box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;\n}\n\n.ace_gutter-cell {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    padding-left: 19px;\n    padding-right: 6px;\n    background-repeat: no-repeat;\n}\n\n.ace_gutter-cell.ace_error {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");\n    background-repeat: no-repeat;\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_warning {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");\n    background-position: 2px center;\n}\n\n.ace_gutter-cell.ace_info {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");\n    background-position: 2px center;\n}\n.ace_dark .ace_gutter-cell.ace_info {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");\n}\n\n.ace_scrollbar {\n    contain: strict;\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    z-index: 6;\n}\n\n.ace_scrollbar-inner {\n    position: absolute;\n    cursor: text;\n    left: 0;\n    top: 0;\n}\n\n.ace_scrollbar-v{\n    overflow-x: hidden;\n    overflow-y: scroll;\n    top: 0;\n}\n\n.ace_scrollbar-h {\n    overflow-x: scroll;\n    overflow-y: hidden;\n    left: 0;\n}\n\n.ace_print-margin {\n    position: absolute;\n    height: 100%;\n}\n\n.ace_text-input {\n    position: absolute;\n    z-index: 0;\n    width: 0.5em;\n    height: 1em;\n    opacity: 0;\n    background: transparent;\n    -moz-appearance: none;\n    appearance: none;\n    border: none;\n    resize: none;\n    outline: none;\n    overflow: hidden;\n    font: inherit;\n    padding: 0 1px;\n    margin: 0 -1px;\n    contain: strict;\n    -ms-user-select: text;\n    -moz-user-select: text;\n    -webkit-user-select: text;\n    user-select: text;\n    /*with `pre-line` chrome inserts &nbsp; instead of space*/\n    white-space: pre!important;\n}\n.ace_text-input.ace_composition {\n    background: transparent;\n    color: inherit;\n    z-index: 1000;\n    opacity: 1;\n}\n.ace_composition_placeholder { color: transparent }\n.ace_composition_marker { \n    border-bottom: 1px solid;\n    position: absolute;\n    border-radius: 0;\n    margin-top: 1px;\n}\n\n[ace_nocontext=true] {\n    transform: none!important;\n    filter: none!important;\n    clip-path: none!important;\n    mask : none!important;\n    contain: none!important;\n    perspective: none!important;\n    mix-blend-mode: initial!important;\n    z-index: auto;\n}\n\n.ace_layer {\n    z-index: 1;\n    position: absolute;\n    overflow: hidden;\n    /* workaround for chrome bug https://github.com/ajaxorg/ace/issues/2312*/\n    word-wrap: normal;\n    white-space: pre;\n    height: 100%;\n    width: 100%;\n    box-sizing: border-box;\n    /* setting pointer-events: auto; on node under the mouse, which changes\n        during scroll, will break mouse wheel scrolling in Safari */\n    pointer-events: none;\n}\n\n.ace_gutter-layer {\n    position: relative;\n    width: auto;\n    text-align: right;\n    pointer-events: auto;\n    height: 1000000px;\n    contain: style size layout;\n}\n\n.ace_text-layer {\n    font: inherit !important;\n    position: absolute;\n    height: 1000000px;\n    width: 1000000px;\n    contain: style size layout;\n}\n\n.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {\n    contain: style size layout;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n}\n\n.ace_hidpi .ace_text-layer,\n.ace_hidpi .ace_gutter-layer,\n.ace_hidpi .ace_content,\n.ace_hidpi .ace_gutter {\n    contain: strict;\n    will-change: transform;\n}\n.ace_hidpi .ace_text-layer > .ace_line, \n.ace_hidpi .ace_text-layer > .ace_line_group {\n    contain: strict;\n}\n\n.ace_cjk {\n    display: inline-block;\n    text-align: center;\n}\n\n.ace_cursor-layer {\n    z-index: 4;\n}\n\n.ace_cursor {\n    z-index: 4;\n    position: absolute;\n    box-sizing: border-box;\n    border-left: 2px solid;\n    /* workaround for smooth cursor repaintng whole screen in chrome */\n    transform: translatez(0);\n}\n\n.ace_multiselect .ace_cursor {\n    border-left-width: 1px;\n}\n\n.ace_slim-cursors .ace_cursor {\n    border-left-width: 1px;\n}\n\n.ace_overwrite-cursors .ace_cursor {\n    border-left-width: 0;\n    border-bottom: 1px solid;\n}\n\n.ace_hidden-cursors .ace_cursor {\n    opacity: 0.2;\n}\n\n.ace_hasPlaceholder .ace_hidden-cursors .ace_cursor {\n    opacity: 0;\n}\n\n.ace_smooth-blinking .ace_cursor {\n    transition: opacity 0.18s;\n}\n\n.ace_animate-blinking .ace_cursor {\n    animation-duration: 1000ms;\n    animation-timing-function: step-end;\n    animation-name: blink-ace-animate;\n    animation-iteration-count: infinite;\n}\n\n.ace_animate-blinking.ace_smooth-blinking .ace_cursor {\n    animation-duration: 1000ms;\n    animation-timing-function: ease-in-out;\n    animation-name: blink-ace-animate-smooth;\n}\n    \n@keyframes blink-ace-animate {\n    from, to { opacity: 1; }\n    60% { opacity: 0; }\n}\n\n@keyframes blink-ace-animate-smooth {\n    from, to { opacity: 1; }\n    45% { opacity: 1; }\n    60% { opacity: 0; }\n    85% { opacity: 0; }\n}\n\n.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {\n    position: absolute;\n    z-index: 3;\n}\n\n.ace_marker-layer .ace_selection {\n    position: absolute;\n    z-index: 5;\n}\n\n.ace_marker-layer .ace_bracket {\n    position: absolute;\n    z-index: 6;\n}\n\n.ace_marker-layer .ace_error_bracket {\n    position: absolute;\n    border-bottom: 1px solid #DE5555;\n    border-radius: 0;\n}\n\n.ace_marker-layer .ace_active-line {\n    position: absolute;\n    z-index: 2;\n}\n\n.ace_marker-layer .ace_selected-word {\n    position: absolute;\n    z-index: 4;\n    box-sizing: border-box;\n}\n\n.ace_line .ace_fold {\n    box-sizing: border-box;\n\n    display: inline-block;\n    height: 11px;\n    margin-top: -2px;\n    vertical-align: middle;\n\n    background-image:\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");\n    background-repeat: no-repeat, repeat-x;\n    background-position: center center, top left;\n    color: transparent;\n\n    border: 1px solid black;\n    border-radius: 2px;\n\n    cursor: pointer;\n    pointer-events: auto;\n}\n\n.ace_dark .ace_fold {\n}\n\n.ace_fold:hover{\n    background-image:\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),\n        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");\n}\n\n.ace_tooltip {\n    background-color: #FFF;\n    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));\n    border: 1px solid gray;\n    border-radius: 1px;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n    color: black;\n    max-width: 100%;\n    padding: 3px 4px;\n    position: fixed;\n    z-index: 999999;\n    box-sizing: border-box;\n    cursor: default;\n    white-space: pre;\n    word-wrap: break-word;\n    line-height: normal;\n    font-style: normal;\n    font-weight: normal;\n    letter-spacing: normal;\n    pointer-events: none;\n}\n\n.ace_folding-enabled > .ace_gutter-cell {\n    padding-right: 13px;\n}\n\n.ace_fold-widget {\n    box-sizing: border-box;\n\n    margin: 0 -12px 0 1px;\n    display: none;\n    width: 11px;\n    vertical-align: top;\n\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");\n    background-repeat: no-repeat;\n    background-position: center;\n\n    border-radius: 3px;\n    \n    border: 1px solid transparent;\n    cursor: pointer;\n}\n\n.ace_folding-enabled .ace_fold-widget {\n    display: inline-block;   \n}\n\n.ace_fold-widget.ace_end {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");\n}\n\n.ace_fold-widget.ace_closed {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");\n}\n\n.ace_fold-widget:hover {\n    border: 1px solid rgba(0, 0, 0, 0.3);\n    background-color: rgba(255, 255, 255, 0.2);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n}\n\n.ace_fold-widget:active {\n    border: 1px solid rgba(0, 0, 0, 0.4);\n    background-color: rgba(0, 0, 0, 0.05);\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);\n}\n/**\n * Dark version for fold widgets\n */\n.ace_dark .ace_fold-widget {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");\n}\n.ace_dark .ace_fold-widget.ace_end {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");\n}\n.ace_dark .ace_fold-widget.ace_closed {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");\n}\n.ace_dark .ace_fold-widget:hover {\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n    background-color: rgba(255, 255, 255, 0.1);\n}\n.ace_dark .ace_fold-widget:active {\n    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);\n}\n\n.ace_inline_button {\n    border: 1px solid lightgray;\n    display: inline-block;\n    margin: -1px 8px;\n    padding: 0 5px;\n    pointer-events: auto;\n    cursor: pointer;\n}\n.ace_inline_button:hover {\n    border-color: gray;\n    background: rgba(200,200,200,0.2);\n    display: inline-block;\n    pointer-events: auto;\n}\n\n.ace_fold-widget.ace_invalid {\n    background-color: #FFB4B4;\n    border-color: #DE5555;\n}\n\n.ace_fade-fold-widgets .ace_fold-widget {\n    transition: opacity 0.4s ease 0.05s;\n    opacity: 0;\n}\n\n.ace_fade-fold-widgets:hover .ace_fold-widget {\n    transition: opacity 0.05s ease 0.05s;\n    opacity:1;\n}\n\n.ace_underline {\n    text-decoration: underline;\n}\n\n.ace_bold {\n    font-weight: bold;\n}\n\n.ace_nobold .ace_bold {\n    font-weight: normal;\n}\n\n.ace_italic {\n    font-style: italic;\n}\n\n\n.ace_error-marker {\n    background-color: rgba(255, 0, 0,0.2);\n    position: absolute;\n    z-index: 9;\n}\n\n.ace_highlight-marker {\n    background-color: rgba(255, 255, 0,0.2);\n    position: absolute;\n    z-index: 8;\n}\n\n.ace_mobile-menu {\n    position: absolute;\n    line-height: 1.5;\n    border-radius: 4px;\n    -ms-user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    background: white;\n    box-shadow: 1px 3px 2px grey;\n    border: 1px solid #dcdcdc;\n    color: black;\n}\n.ace_dark > .ace_mobile-menu {\n    background: #333;\n    color: #ccc;\n    box-shadow: 1px 3px 2px grey;\n    border: 1px solid #444;\n\n}\n.ace_mobile-button {\n    padding: 2px;\n    cursor: pointer;\n    overflow: hidden;\n}\n.ace_mobile-button:hover {\n    background-color: #eee;\n    opacity:1;\n}\n.ace_mobile-button:active {\n    background-color: #ddd;\n}\n\n.ace_placeholder {\n    font-family: arial;\n    transform: scale(0.9);\n    transform-origin: left;\n    white-space: pre;\n    opacity: 0.7;\n    margin: 0 10px;\n}';
  }), ace.define("ace/layer/decorators", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event_emitter"], function (e, t, n) {
    "use strict";

    var r = e("../lib/dom"),
      i = e("../lib/oop"),
      o = e("../lib/event_emitter").EventEmitter,
      a = function (e, t) {
        this.canvas = r.createElement("canvas"), this.renderer = t, this.pixelRatio = 1, this.maxHeight = t.layerConfig.maxHeight, this.lineHeight = t.layerConfig.lineHeight, this.canvasHeight = e.parent.scrollHeight, this.heightRatio = this.canvasHeight / this.maxHeight, this.canvasWidth = e.width, this.minDecorationHeight = 2 * this.pixelRatio | 0, this.halfMinDecorationHeight = this.minDecorationHeight / 2 | 0, this.canvas.width = this.canvasWidth, this.canvas.height = this.canvasHeight, this.canvas.style.top = "0px", this.canvas.style.right = "0px", this.canvas.style.zIndex = "7px", this.canvas.style.position = "absolute", this.colors = {}, this.colors.dark = {
          error: "rgba(255, 18, 18, 1)",
          warning: "rgba(18, 136, 18, 1)",
          info: "rgba(18, 18, 136, 1)"
        }, this.colors.light = {
          error: "rgb(255,51,51)",
          warning: "rgb(32,133,72)",
          info: "rgb(35,68,138)"
        }, e.element.appendChild(this.canvas);
      };
    (function () {
      i.implement(this, o), this.$updateDecorators = function (e) {
        var t = !0 === this.renderer.theme.isDark ? this.colors.dark : this.colors.light;
        if (e) {
          this.maxHeight = e.maxHeight, this.lineHeight = e.lineHeight, this.canvasHeight = e.height;
          var n = (e.lastRow + 1) * this.lineHeight;
          n < this.canvasHeight ? this.heightRatio = 1 : this.heightRatio = this.canvasHeight / this.maxHeight;
        }
        var r = this.canvas.getContext("2d");
        function i(e, t) {
          return e.priority < t.priority ? -1 : e.priority > t.priority ? 1 : 0;
        }
        var o = this.renderer.session.$annotations;
        if (r.clearRect(0, 0, this.canvas.width, this.canvas.height), o) {
          var a = {
            info: 1,
            warning: 2,
            error: 3
          };
          o.forEach(function (e) {
            e.priority = a[e.type] || null;
          }), o = o.sort(i);
          for (var s = this.renderer.session.$foldData, l = 0; l < o.length; l++) {
            var c = o[l].row,
              u = this.compensateFoldRows(c, s),
              h = Math.round((c - u) * this.lineHeight * this.heightRatio),
              f = Math.round((c - u) * this.lineHeight * this.heightRatio),
              d = Math.round(((c - u) * this.lineHeight + this.lineHeight) * this.heightRatio),
              p = d - f;
            if (p < this.minDecorationHeight) {
              var m = (f + d) / 2 | 0;
              m < this.halfMinDecorationHeight ? m = this.halfMinDecorationHeight : m + this.halfMinDecorationHeight > this.canvasHeight && (m = this.canvasHeight - this.halfMinDecorationHeight), f = Math.round(m - this.halfMinDecorationHeight), d = Math.round(m + this.halfMinDecorationHeight);
            }
            r.fillStyle = t[o[l].type] || null, r.fillRect(0, h, this.canvasWidth, d - f);
          }
        }
        var g = this.renderer.session.selection.getCursor();
        if (g) {
          u = this.compensateFoldRows(g.row, s), h = Math.round((g.row - u) * this.lineHeight * this.heightRatio);
          r.fillStyle = "rgba(0, 0, 0, 0.5)", r.fillRect(0, h, this.canvasWidth, 2);
        }
      }, this.compensateFoldRows = function (e, t) {
        var n = 0;
        if (t && t.length > 0) for (var r = 0; r < t.length; r++) e > t[r].start.row && e < t[r].end.row ? n += e - t[r].start.row : e >= t[r].end.row && (n += t[r].end.row - t[r].start.row);
        return n;
      };
    }).call(a.prototype), t.Decorator = a;
  }), ace.define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/config", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/scrollbar", "ace/scrollbar_custom", "ace/scrollbar_custom", "ace/renderloop", "ace/layer/font_metrics", "ace/lib/event_emitter", "ace/css/editor.css", "ace/layer/decorators", "ace/lib/useragent"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = e("./lib/dom"),
      o = e("./config"),
      a = e("./layer/gutter").Gutter,
      s = e("./layer/marker").Marker,
      l = e("./layer/text").Text,
      c = e("./layer/cursor").Cursor,
      u = e("./scrollbar").HScrollBar,
      h = e("./scrollbar").VScrollBar,
      f = e("./scrollbar_custom").HScrollBar,
      d = e("./scrollbar_custom").VScrollBar,
      p = e("./renderloop").RenderLoop,
      m = e("./layer/font_metrics").FontMetrics,
      g = e("./lib/event_emitter").EventEmitter,
      v = e("./css/editor.css"),
      y = e("./layer/decorators").Decorator,
      b = e("./lib/useragent"),
      w = b.isIE;
    i.importCssString(v, "ace_editor.css", !1);
    var x = function (e, t) {
      var n = this;
      this.container = e || i.createElement("div"), i.addCssClass(this.container, "ace_editor"), i.HI_DPI && i.addCssClass(this.container, "ace_hidpi"), this.setTheme(t), null == o.get("useStrictCSP") && o.set("useStrictCSP", !1), this.$gutter = i.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.$gutter.setAttribute("aria-hidden", !0), this.scroller = i.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = i.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new a(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new s(this.content);
      var r = this.$textLayer = new l(this.content);
      this.canvas = r.element, this.$markerFront = new s(this.content), this.$cursorLayer = new c(this.content), this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new h(this.container, this), this.scrollBarH = new u(this.container, this), this.scrollBarV.on("scroll", function (e) {
        n.$scrollAnimation || n.session.setScrollTop(e.data - n.scrollMargin.top);
      }), this.scrollBarH.on("scroll", function (e) {
        n.$scrollAnimation || n.session.setScrollLeft(e.data - n.scrollMargin.left);
      }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = {
        row: 0,
        column: 0
      }, this.$fontMetrics = new m(this.container, this.$textLayer.MAX_CHUNK_LENGTH), this.$textLayer.$setFontMetrics(this.$fontMetrics), this.$textLayer.on("changeCharacterSize", function (e) {
        n.updateCharacterSize(), n.onResize(!0, n.gutterWidth, n.$size.width, n.$size.height), n._signal("changeCharacterSize", e);
      }), this.$size = {
        width: 0,
        height: 0,
        scrollerHeight: 0,
        scrollerWidth: 0,
        $dirty: !0
      }, this.layerConfig = {
        width: 1,
        padding: 0,
        firstRow: 0,
        firstRowScreen: 0,
        lastRow: 0,
        lineHeight: 0,
        characterWidth: 0,
        minHeight: 1,
        maxHeight: 1,
        offset: 0,
        height: 1,
        gutterOffset: 1
      }, this.scrollMargin = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        v: 0,
        h: 0
      }, this.margin = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        v: 0,
        h: 0
      }, this.$keepTextAreaAtCursor = !b.isIOS, this.$loop = new p(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), o.resetOptions(this), o._signal("renderer", this);
    };
    (function () {
      this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, r.implement(this, g), this.updateCharacterSize = function () {
        this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin(), i.setStyle(this.scroller.style, "line-height", this.lineHeight + "px");
      }, this.setSession = function (e) {
        this.session && this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode), this.session = e, e && this.scrollMargin.top && e.getScrollTop() <= 0 && e.setScrollTop(-this.scrollMargin.top), this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), e && (this.$loop.schedule(this.CHANGE_FULL), this.session.$setFontMetrics(this.$fontMetrics), this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null, this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this), this.onChangeNewLineMode(), this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode));
      }, this.updateLines = function (e, t, n) {
        if (void 0 === t && (t = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = {
          firstRow: e,
          lastRow: t
        }, this.$changedLines.lastRow < this.layerConfig.firstRow) {
          if (!n) return;
          this.$changedLines.lastRow = this.layerConfig.lastRow;
        }
        this.$changedLines.firstRow > this.layerConfig.lastRow || this.$loop.schedule(this.CHANGE_LINES);
      }, this.onChangeNewLineMode = function () {
        this.$loop.schedule(this.CHANGE_TEXT), this.$textLayer.$updateEolChar(), this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR);
      }, this.onChangeTabSize = function () {
        this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize();
      }, this.updateText = function () {
        this.$loop.schedule(this.CHANGE_TEXT);
      }, this.updateFull = function (e) {
        e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL);
      }, this.updateFontSize = function () {
        this.$textLayer.checkForSizeChanges();
      }, this.$changes = 0, this.$updateSizeAsync = function () {
        this.$loop.pending ? this.$size.$dirty = !0 : this.onResize();
      }, this.onResize = function (e, t, n, r) {
        if (!(this.resizing > 2)) {
          this.resizing > 0 ? this.resizing++ : this.resizing = e ? 1 : 0;
          var i = this.container;
          r || (r = i.clientHeight || i.scrollHeight), n || (n = i.clientWidth || i.scrollWidth);
          var o = this.$updateCachedSize(e, t, n, r);
          if (!this.$size.scrollerHeight || !n && !r) return this.resizing = 0;
          e && (this.$gutterLayer.$padding = null), e ? this.$renderChanges(o | this.$changes, !0) : this.$loop.schedule(o | this.$changes), this.resizing && (this.resizing = 0), this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null, this.$customScrollbar && this.$updateCustomScrollbar(!0);
        }
      }, this.$updateCachedSize = function (e, t, n, r) {
        r -= this.$extraHeight || 0;
        var o = 0,
          a = this.$size,
          s = {
            width: a.width,
            height: a.height,
            scrollerHeight: a.scrollerHeight,
            scrollerWidth: a.scrollerWidth
          };
        if (r && (e || a.height != r) && (a.height = r, o |= this.CHANGE_SIZE, a.scrollerHeight = a.height, this.$horizScroll && (a.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.setHeight(a.scrollerHeight), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", o |= this.CHANGE_SCROLL), n && (e || a.width != n)) {
          o |= this.CHANGE_SIZE, a.width = n, null == t && (t = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = t, i.setStyle(this.scrollBarH.element.style, "left", t + "px"), i.setStyle(this.scroller.style, "left", t + this.margin.left + "px"), a.scrollerWidth = Math.max(0, n - t - this.scrollBarV.getWidth() - this.margin.h), i.setStyle(this.$gutter.style, "left", this.margin.left + "px");
          var l = this.scrollBarV.getWidth() + "px";
          i.setStyle(this.scrollBarH.element.style, "right", l), i.setStyle(this.scroller.style, "right", l), i.setStyle(this.scroller.style, "bottom", this.scrollBarH.getHeight()), this.scrollBarH.setWidth(a.scrollerWidth), (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) && (o |= this.CHANGE_FULL);
        }
        return a.$dirty = !n || !r, o && this._signal("resize", s), o;
      }, this.onGutterResize = function (e) {
        var t = this.$showGutter ? e : 0;
        t != this.gutterWidth && (this.$changes |= this.$updateCachedSize(!0, t, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : this.$size.$dirty ? this.$loop.schedule(this.CHANGE_FULL) : this.$computeLayerConfig();
      }, this.adjustWrapLimit = function () {
        var e = this.$size.scrollerWidth - 2 * this.$padding,
          t = Math.floor(e / this.characterWidth);
        return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn);
      }, this.setAnimatedScroll = function (e) {
        this.setOption("animatedScroll", e);
      }, this.getAnimatedScroll = function () {
        return this.$animatedScroll;
      }, this.setShowInvisibles = function (e) {
        this.setOption("showInvisibles", e), this.session.$bidiHandler.setShowInvisibles(e);
      }, this.getShowInvisibles = function () {
        return this.getOption("showInvisibles");
      }, this.getDisplayIndentGuides = function () {
        return this.getOption("displayIndentGuides");
      }, this.setDisplayIndentGuides = function (e) {
        this.setOption("displayIndentGuides", e);
      }, this.getHighlightIndentGuides = function () {
        return this.getOption("highlightIndentGuides");
      }, this.setHighlightIndentGuides = function (e) {
        this.setOption("highlightIndentGuides", e);
      }, this.setShowPrintMargin = function (e) {
        this.setOption("showPrintMargin", e);
      }, this.getShowPrintMargin = function () {
        return this.getOption("showPrintMargin");
      }, this.setPrintMarginColumn = function (e) {
        this.setOption("printMarginColumn", e);
      }, this.getPrintMarginColumn = function () {
        return this.getOption("printMarginColumn");
      }, this.getShowGutter = function () {
        return this.getOption("showGutter");
      }, this.setShowGutter = function (e) {
        return this.setOption("showGutter", e);
      }, this.getFadeFoldWidgets = function () {
        return this.getOption("fadeFoldWidgets");
      }, this.setFadeFoldWidgets = function (e) {
        this.setOption("fadeFoldWidgets", e);
      }, this.setHighlightGutterLine = function (e) {
        this.setOption("highlightGutterLine", e);
      }, this.getHighlightGutterLine = function () {
        return this.getOption("highlightGutterLine");
      }, this.$updatePrintMargin = function () {
        if (this.$showPrintMargin || this.$printMarginEl) {
          if (!this.$printMarginEl) {
            var e = i.createElement("div");
            e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = i.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild);
          }
          var t = this.$printMarginEl.style;
          t.left = Math.round(this.characterWidth * this.$printMarginColumn + this.$padding) + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit();
        }
      }, this.getContainerElement = function () {
        return this.container;
      }, this.getMouseEventTarget = function () {
        return this.scroller;
      }, this.getTextAreaContainer = function () {
        return this.container;
      }, this.$moveTextAreaToCursor = function () {
        if (!this.$isMousePressed) {
          var e = this.textarea.style,
            t = this.$composition;
          if (this.$keepTextAreaAtCursor || t) {
            var n = this.$cursorLayer.$pixelPos;
            if (n) {
              t && t.markerRange && (n = this.$cursorLayer.getPixelPosition(t.markerRange.start, !0));
              var r = this.layerConfig,
                o = n.top,
                a = n.left;
              o -= r.offset;
              var s = t && t.useTextareaForIME ? this.lineHeight : w ? 0 : 1;
              if (o < 0 || o > r.height - s) i.translate(this.textarea, 0, 0);else {
                var l = 1,
                  c = this.$size.height - s;
                if (t) {
                  if (t.useTextareaForIME) {
                    var u = this.textarea.value;
                    l = this.characterWidth * this.session.$getStringScreenWidth(u)[0];
                  } else o += this.lineHeight + 2;
                } else o += this.lineHeight;
                a -= this.scrollLeft, a > this.$size.scrollerWidth - l && (a = this.$size.scrollerWidth - l), a += this.gutterWidth + this.margin.left, i.setStyle(e, "height", s + "px"), i.setStyle(e, "width", l + "px"), i.translate(this.textarea, Math.min(a, this.$size.scrollerWidth - l), Math.min(o, c));
              }
            }
          } else i.translate(this.textarea, -100, 0);
        }
      }, this.getFirstVisibleRow = function () {
        return this.layerConfig.firstRow;
      }, this.getFirstFullyVisibleRow = function () {
        return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1);
      }, this.getLastFullyVisibleRow = function () {
        var e = this.layerConfig,
          t = e.lastRow,
          n = this.session.documentToScreenRow(t, 0) * e.lineHeight;
        return n - this.session.getScrollTop() > e.height - e.lineHeight ? t - 1 : t;
      }, this.getLastVisibleRow = function () {
        return this.layerConfig.lastRow;
      }, this.$padding = null, this.setPadding = function (e) {
        this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin();
      }, this.setScrollMargin = function (e, t, n, r) {
        var i = this.scrollMargin;
        i.top = 0 | e, i.bottom = 0 | t, i.right = 0 | r, i.left = 0 | n, i.v = i.top + i.bottom, i.h = i.left + i.right, i.top && this.scrollTop <= 0 && this.session && this.session.setScrollTop(-i.top), this.updateFull();
      }, this.setMargin = function (e, t, n, r) {
        var i = this.margin;
        i.top = 0 | e, i.bottom = 0 | t, i.right = 0 | r, i.left = 0 | n, i.v = i.top + i.bottom, i.h = i.left + i.right, this.$updateCachedSize(!0, this.gutterWidth, this.$size.width, this.$size.height), this.updateFull();
      }, this.getHScrollBarAlwaysVisible = function () {
        return this.$hScrollBarAlwaysVisible;
      }, this.setHScrollBarAlwaysVisible = function (e) {
        this.setOption("hScrollBarAlwaysVisible", e);
      }, this.getVScrollBarAlwaysVisible = function () {
        return this.$vScrollBarAlwaysVisible;
      }, this.setVScrollBarAlwaysVisible = function (e) {
        this.setOption("vScrollBarAlwaysVisible", e);
      }, this.$updateScrollBarV = function () {
        var e = this.layerConfig.maxHeight,
          t = this.$size.scrollerHeight;
        !this.$maxLines && this.$scrollPastEnd && (e -= (t - this.lineHeight) * this.$scrollPastEnd, this.scrollTop > e - t && (e = this.scrollTop + t, this.scrollBarV.scrollTop = null)), this.scrollBarV.setScrollHeight(e + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
      }, this.$updateScrollBarH = function () {
        this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
      }, this.$frozen = !1, this.freeze = function () {
        this.$frozen = !0;
      }, this.unfreeze = function () {
        this.$frozen = !1;
      }, this.$renderChanges = function (e, t) {
        if (this.$changes && (e |= this.$changes, this.$changes = 0), this.session && this.container.offsetWidth && !this.$frozen && (e || t)) {
          if (this.$size.$dirty) return this.$changes |= e, this.onResize(!0);
          this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender", e), this.session && this.session.$bidiHandler && this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);
          var n = this.layerConfig;
          if (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL || e & this.CHANGE_H_SCROLL) {
            if (e |= this.$computeLayerConfig() | this.$loop.clear(), n.firstRow != this.layerConfig.firstRow && n.firstRowScreen == this.layerConfig.firstRowScreen) {
              var r = this.scrollTop + (n.firstRow - this.layerConfig.firstRow) * this.lineHeight;
              r > 0 && (this.scrollTop = r, e |= this.CHANGE_SCROLL, e |= this.$computeLayerConfig() | this.$loop.clear());
            }
            n = this.layerConfig, this.$updateScrollBarV(), e & this.CHANGE_H_SCROLL && this.$updateScrollBarH(), i.translate(this.content, -this.scrollLeft, -n.offset);
            var o = n.width + 2 * this.$padding + "px",
              a = n.minHeight + "px";
            i.setStyle(this.content.style, "width", o), i.setStyle(this.content.style, "height", a);
          }
          if (e & this.CHANGE_H_SCROLL && (i.translate(this.content, -this.scrollLeft, -n.offset), this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"), e & this.CHANGE_FULL) return this.$changedLines = null, this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n), this.$customScrollbar && this.$scrollDecorator.$updateDecorators(n), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), void this._signal("afterRender", e);
          if (e & this.CHANGE_SCROLL) return this.$changedLines = null, e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(n) : this.$textLayer.scrollLines(n), this.$showGutter && (e & this.CHANGE_GUTTER || e & this.CHANGE_LINES ? this.$gutterLayer.update(n) : this.$gutterLayer.scrollLines(n)), this.$customScrollbar && this.$scrollDecorator.$updateDecorators(n), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), void this._signal("afterRender", e);
          e & this.CHANGE_TEXT ? (this.$changedLines = null, this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n), this.$customScrollbar && this.$scrollDecorator.$updateDecorators(n)) : e & this.CHANGE_LINES ? ((this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(n), this.$customScrollbar && this.$scrollDecorator.$updateDecorators(n)) : e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER ? (this.$showGutter && this.$gutterLayer.update(n), this.$customScrollbar && this.$scrollDecorator.$updateDecorators(n)) : e & this.CHANGE_CURSOR && (this.$highlightGutterLine && this.$gutterLayer.updateLineHighlight(n), this.$customScrollbar && this.$scrollDecorator.$updateDecorators(n)), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(n), this.$moveTextAreaToCursor()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(n), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(n), this._signal("afterRender", e);
        } else this.$changes |= e;
      }, this.$autosize = function () {
        var e = this.session.getScreenLength() * this.lineHeight,
          t = this.$maxLines * this.lineHeight,
          n = Math.min(t, Math.max((this.$minLines || 1) * this.lineHeight, e)) + this.scrollMargin.v + (this.$extraHeight || 0);
        this.$horizScroll && (n += this.scrollBarH.getHeight()), this.$maxPixelHeight && n > this.$maxPixelHeight && (n = this.$maxPixelHeight);
        var r = n <= 2 * this.lineHeight,
          i = !r && e > t;
        if (n != this.desiredHeight || this.$size.height != this.desiredHeight || i != this.$vScroll) {
          i != this.$vScroll && (this.$vScroll = i, this.scrollBarV.setVisible(i));
          var o = this.container.clientWidth;
          this.container.style.height = n + "px", this.$updateCachedSize(!0, this.$gutterWidth, o, n), this.desiredHeight = n, this._signal("autosize");
        }
      }, this.$computeLayerConfig = function () {
        var e = this.session,
          t = this.$size,
          n = t.height <= 2 * this.lineHeight,
          r = this.session.getScreenLength(),
          i = r * this.lineHeight,
          o = this.$getLongestLine(),
          a = !n && (this.$hScrollBarAlwaysVisible || t.scrollerWidth - o - 2 * this.$padding < 0),
          s = this.$horizScroll !== a;
        s && (this.$horizScroll = a, this.scrollBarH.setVisible(a));
        var l = this.$vScroll;
        this.$maxLines && this.lineHeight > 1 && this.$autosize();
        var c = t.scrollerHeight + this.lineHeight,
          u = !this.$maxLines && this.$scrollPastEnd ? (t.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
        i += u;
        var h = this.scrollMargin;
        this.session.setScrollTop(Math.max(-h.top, Math.min(this.scrollTop, i - t.scrollerHeight + h.bottom))), this.session.setScrollLeft(Math.max(-h.left, Math.min(this.scrollLeft, o + 2 * this.$padding - t.scrollerWidth + h.right)));
        var f = !n && (this.$vScrollBarAlwaysVisible || t.scrollerHeight - i + u < 0 || this.scrollTop > h.top),
          d = l !== f;
        d && (this.$vScroll = f, this.scrollBarV.setVisible(f));
        var p,
          m,
          g = this.scrollTop % this.lineHeight,
          v = Math.ceil(c / this.lineHeight) - 1,
          y = Math.max(0, Math.round((this.scrollTop - g) / this.lineHeight)),
          b = y + v,
          w = this.lineHeight;
        y = e.screenToDocumentRow(y, 0);
        var x = e.getFoldLine(y);
        x && (y = x.start.row), p = e.documentToScreenRow(y, 0), m = e.getRowLength(y) * w, b = Math.min(e.screenToDocumentRow(b, 0), e.getLength() - 1), c = t.scrollerHeight + e.getRowLength(b) * w + m, g = this.scrollTop - p * w;
        var _ = 0;
        return (this.layerConfig.width != o || s) && (_ = this.CHANGE_H_SCROLL), (s || d) && (_ |= this.$updateCachedSize(!0, this.gutterWidth, t.width, t.height), this._signal("scrollbarVisibilityChanged"), d && (o = this.$getLongestLine())), this.layerConfig = {
          width: o,
          padding: this.$padding,
          firstRow: y,
          firstRowScreen: p,
          lastRow: b,
          lineHeight: w,
          characterWidth: this.characterWidth,
          minHeight: c,
          maxHeight: i,
          offset: g,
          gutterOffset: w ? Math.max(0, Math.ceil((g + t.height - t.scrollerHeight) / w)) : 0,
          height: this.$size.scrollerHeight
        }, this.session.$bidiHandler && this.session.$bidiHandler.setContentWidth(o - this.$padding), _;
      }, this.$updateLines = function () {
        if (this.$changedLines) {
          var e = this.$changedLines.firstRow,
            t = this.$changedLines.lastRow;
          this.$changedLines = null;
          var n = this.layerConfig;
          if (!(e > n.lastRow + 1) && !(t < n.firstRow)) return t === 1 / 0 ? (this.$showGutter && this.$gutterLayer.update(n), void this.$textLayer.update(n)) : (this.$textLayer.updateLines(n, e, t), !0);
        }
      }, this.$getLongestLine = function () {
        var e = this.session.getScreenWidth();
        return this.showInvisibles && !this.session.$useWrapMode && (e += 1), this.$textLayer && e > this.$textLayer.MAX_LINE_LENGTH && (e = this.$textLayer.MAX_LINE_LENGTH + 30), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth));
      }, this.updateFrontMarkers = function () {
        this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT);
      }, this.updateBackMarkers = function () {
        this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK);
      }, this.addGutterDecoration = function (e, t) {
        this.$gutterLayer.addGutterDecoration(e, t);
      }, this.removeGutterDecoration = function (e, t) {
        this.$gutterLayer.removeGutterDecoration(e, t);
      }, this.updateBreakpoints = function (e) {
        this.$loop.schedule(this.CHANGE_GUTTER);
      }, this.setAnnotations = function (e) {
        this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER);
      }, this.updateCursor = function () {
        this.$loop.schedule(this.CHANGE_CURSOR);
      }, this.hideCursor = function () {
        this.$cursorLayer.hideCursor();
      }, this.showCursor = function () {
        this.$cursorLayer.showCursor();
      }, this.scrollSelectionIntoView = function (e, t, n) {
        this.scrollCursorIntoView(e, n), this.scrollCursorIntoView(t, n);
      }, this.scrollCursorIntoView = function (e, t, n) {
        if (0 !== this.$size.scrollerHeight) {
          var r = this.$cursorLayer.getPixelPosition(e),
            i = r.left,
            o = r.top,
            a = n && n.top || 0,
            s = n && n.bottom || 0;
          this.$scrollAnimation && (this.$stopAnimation = !0);
          var l = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
          l + a > o ? (t && l + a > o + this.lineHeight && (o -= t * this.$size.scrollerHeight), 0 === o && (o = -this.scrollMargin.top), this.session.setScrollTop(o)) : l + this.$size.scrollerHeight - s < o + this.lineHeight && (t && l + this.$size.scrollerHeight - s < o - this.lineHeight && (o += t * this.$size.scrollerHeight), this.session.setScrollTop(o + this.lineHeight + s - this.$size.scrollerHeight));
          var c = this.scrollLeft;
          c > i ? (i < this.$padding + 2 * this.layerConfig.characterWidth && (i = -this.scrollMargin.left), this.session.setScrollLeft(i)) : c + this.$size.scrollerWidth < i + this.characterWidth ? this.session.setScrollLeft(Math.round(i + this.characterWidth - this.$size.scrollerWidth)) : c <= this.$padding && i - c < this.characterWidth && this.session.setScrollLeft(0);
        }
      }, this.getScrollTop = function () {
        return this.session.getScrollTop();
      }, this.getScrollLeft = function () {
        return this.session.getScrollLeft();
      }, this.getScrollTopRow = function () {
        return this.scrollTop / this.lineHeight;
      }, this.getScrollBottomRow = function () {
        return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1);
      }, this.scrollToRow = function (e) {
        this.session.setScrollTop(e * this.lineHeight);
      }, this.alignCursor = function (e, t) {
        "number" == typeof e && (e = {
          row: e,
          column: 0
        });
        var n = this.$cursorLayer.getPixelPosition(e),
          r = this.$size.scrollerHeight - this.lineHeight,
          i = n.top - r * (t || 0);
        return this.session.setScrollTop(i), i;
      }, this.STEPS = 8, this.$calcSteps = function (e, t) {
        var n = 0,
          r = this.STEPS,
          i = [],
          o = function (e, t, n) {
            return n * (Math.pow(e - 1, 3) + 1) + t;
          };
        for (n = 0; n < r; ++n) i.push(o(n / this.STEPS, e, t - e));
        return i;
      }, this.scrollToLine = function (e, t, n, r) {
        var i = this.$cursorLayer.getPixelPosition({
            row: e,
            column: 0
          }),
          o = i.top;
        t && (o -= this.$size.scrollerHeight / 2);
        var a = this.scrollTop;
        this.session.setScrollTop(o), !1 !== n && this.animateScrolling(a, r);
      }, this.animateScrolling = function (e, t) {
        var n = this.scrollTop;
        if (this.$animatedScroll) {
          var r = this;
          if (e != n) {
            if (this.$scrollAnimation) {
              var i = this.$scrollAnimation.steps;
              if (i.length && (e = i[0], e == n)) return;
            }
            var o = r.$calcSteps(e, n);
            this.$scrollAnimation = {
              from: e,
              to: n,
              steps: o
            }, clearInterval(this.$timer), r.session.setScrollTop(o.shift()), r.session.$scrollTop = n, this.$timer = setInterval(function () {
              if (!r.$stopAnimation) return r.session ? void (o.length ? (r.session.setScrollTop(o.shift()), r.session.$scrollTop = n) : null != n ? (r.session.$scrollTop = -1, r.session.setScrollTop(n), n = null) : a()) : clearInterval(r.$timer);
              a();
            }, 10);
          }
        }
        function a() {
          r.$timer = clearInterval(r.$timer), r.$scrollAnimation = null, r.$stopAnimation = !1, t && t();
        }
      }, this.scrollToY = function (e) {
        this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e);
      }, this.scrollToX = function (e) {
        this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL);
      }, this.scrollTo = function (e, t) {
        this.session.setScrollTop(t), this.session.setScrollLeft(e);
      }, this.scrollBy = function (e, t) {
        t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e);
      }, this.isScrollableBy = function (e, t) {
        return t < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top || t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom || e < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left || e > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right || void 0;
      }, this.pixelToScreenCoordinates = function (e, t) {
        var n;
        if (this.$hasCssTransforms) {
          n = {
            top: 0,
            left: 0
          };
          var r = this.$fontMetrics.transformCoordinates([e, t]);
          e = r[1] - this.gutterWidth - this.margin.left, t = r[0];
        } else n = this.scroller.getBoundingClientRect();
        var i = e + this.scrollLeft - n.left - this.$padding,
          o = i / this.characterWidth,
          a = Math.floor((t + this.scrollTop - n.top) / this.lineHeight),
          s = this.$blockCursor ? Math.floor(o) : Math.round(o);
        return {
          row: a,
          column: s,
          side: o - s > 0 ? 1 : -1,
          offsetX: i
        };
      }, this.screenToTextCoordinates = function (e, t) {
        var n;
        if (this.$hasCssTransforms) {
          n = {
            top: 0,
            left: 0
          };
          var r = this.$fontMetrics.transformCoordinates([e, t]);
          e = r[1] - this.gutterWidth - this.margin.left, t = r[0];
        } else n = this.scroller.getBoundingClientRect();
        var i = e + this.scrollLeft - n.left - this.$padding,
          o = i / this.characterWidth,
          a = this.$blockCursor ? Math.floor(o) : Math.round(o),
          s = Math.floor((t + this.scrollTop - n.top) / this.lineHeight);
        return this.session.screenToDocumentPosition(s, Math.max(a, 0), i);
      }, this.textToScreenCoordinates = function (e, t) {
        var n = this.scroller.getBoundingClientRect(),
          r = this.session.documentToScreenPosition(e, t),
          i = this.$padding + (this.session.$bidiHandler.isBidiRow(r.row, e) ? this.session.$bidiHandler.getPosLeft(r.column) : Math.round(r.column * this.characterWidth)),
          o = r.row * this.lineHeight;
        return {
          pageX: n.left + i - this.scrollLeft,
          pageY: n.top + o - this.scrollTop
        };
      }, this.visualizeFocus = function () {
        i.addCssClass(this.container, "ace_focus");
      }, this.visualizeBlur = function () {
        i.removeCssClass(this.container, "ace_focus");
      }, this.showComposition = function (e) {
        this.$composition = e, e.cssText || (e.cssText = this.textarea.style.cssText), void 0 == e.useTextareaForIME && (e.useTextareaForIME = this.$useTextareaForIME), this.$useTextareaForIME ? (i.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor(), this.$cursorLayer.element.style.display = "none") : e.markerId = this.session.addMarker(e.markerRange, "ace_composition_marker", "text");
      }, this.setCompositionText = function (e) {
        var t = this.session.selection.cursor;
        this.addToken(e, "composition_placeholder", t.row, t.column), this.$moveTextAreaToCursor();
      }, this.hideComposition = function () {
        if (this.$composition) {
          this.$composition.markerId && this.session.removeMarker(this.$composition.markerId), i.removeCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = this.$composition.cssText;
          var e = this.session.selection.cursor;
          this.removeExtraToken(e.row, e.column), this.$composition = null, this.$cursorLayer.element.style.display = "";
        }
      }, this.addToken = function (e, t, n, r) {
        var i = this.session;
        i.bgTokenizer.lines[n] = null;
        var o = {
            type: t,
            value: e
          },
          a = i.getTokens(n);
        if (null == r) a.push(o);else for (var s = 0, l = 0; l < a.length; l++) {
          var c = a[l];
          if (s += c.value.length, r <= s) {
            var u = c.value.length - (s - r),
              h = c.value.slice(0, u),
              f = c.value.slice(u);
            a.splice(l, 1, {
              type: c.type,
              value: h
            }, o, {
              type: c.type,
              value: f
            });
            break;
          }
        }
        this.updateLines(n, n);
      }, this.removeExtraToken = function (e, t) {
        this.updateLines(e, e);
      }, this.setTheme = function (e, t) {
        var n = this;
        if (this.$themeId = e, n._dispatchEvent("themeChange", {
          theme: e
        }), e && "string" != typeof e) a(e);else {
          var r = e || this.$options.theme.initialValue;
          o.loadModule(["theme", r], a);
        }
        function a(r) {
          if (n.$themeId != e) return t && t();
          if (!r || !r.cssClass) throw new Error("couldn't load module " + e + " or it didn't call define");
          r.$id && (n.$themeId = r.$id), i.importCssString(r.cssText, r.cssClass, n.container), n.theme && i.removeCssClass(n.container, n.theme.cssClass);
          var o = "padding" in r ? r.padding : "padding" in (n.theme || {}) ? 4 : n.$padding;
          n.$padding && o != n.$padding && n.setPadding(o), n.$theme = r.cssClass, n.theme = r, i.addCssClass(n.container, r.cssClass), i.setCssClass(n.container, "ace_dark", r.isDark), n.$size && (n.$size.width = 0, n.$updateSizeAsync()), n._dispatchEvent("themeLoaded", {
            theme: r
          }), t && t();
        }
      }, this.getTheme = function () {
        return this.$themeId;
      }, this.setStyle = function (e, t) {
        i.setCssClass(this.container, e, !1 !== t);
      }, this.unsetStyle = function (e) {
        i.removeCssClass(this.container, e);
      }, this.setCursorStyle = function (e) {
        i.setStyle(this.scroller.style, "cursor", e);
      }, this.setMouseCursor = function (e) {
        i.setStyle(this.scroller.style, "cursor", e);
      }, this.attachToShadowRoot = function () {
        i.importCssString(v, "ace_editor.css", this.container);
      }, this.destroy = function () {
        this.freeze(), this.$fontMetrics.destroy(), this.$cursorLayer.destroy(), this.removeAllListeners(), this.container.textContent = "";
      }, this.$updateCustomScrollbar = function (e) {
        var t = this;
        this.$horizScroll = this.$vScroll = null, this.scrollBarV.element.remove(), this.scrollBarH.element.remove(), this.$scrollDecorator && delete this.$scrollDecorator, !0 === e ? (this.scrollBarV = new d(this.container, this), this.scrollBarH = new f(this.container, this), this.scrollBarV.setHeight(this.$size.scrollerHeight), this.scrollBarH.setWidth(this.$size.scrollerWidth), this.scrollBarV.addEventListener("scroll", function (e) {
          t.$scrollAnimation || t.session.setScrollTop(e.data - t.scrollMargin.top);
        }), this.scrollBarH.addEventListener("scroll", function (e) {
          t.$scrollAnimation || t.session.setScrollLeft(e.data - t.scrollMargin.left);
        }), this.$scrollDecorator = new y(this.scrollBarV, this), this.$scrollDecorator.$updateDecorators()) : (this.scrollBarV = new h(this.container, this), this.scrollBarH = new u(this.container, this), this.scrollBarV.addEventListener("scroll", function (e) {
          t.$scrollAnimation || t.session.setScrollTop(e.data - t.scrollMargin.top);
        }), this.scrollBarH.addEventListener("scroll", function (e) {
          t.$scrollAnimation || t.session.setScrollLeft(e.data - t.scrollMargin.left);
        }));
      };
    }).call(x.prototype), o.defineOptions(x.prototype, "renderer", {
      animatedScroll: {
        initialValue: !1
      },
      showInvisibles: {
        set: function (e) {
          this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT);
        },
        initialValue: !1
      },
      showPrintMargin: {
        set: function () {
          this.$updatePrintMargin();
        },
        initialValue: !0
      },
      printMarginColumn: {
        set: function () {
          this.$updatePrintMargin();
        },
        initialValue: 80
      },
      printMargin: {
        set: function (e) {
          "number" == typeof e && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin();
        },
        get: function () {
          return this.$showPrintMargin && this.$printMarginColumn;
        }
      },
      showGutter: {
        set: function (e) {
          this.$gutter.style.display = e ? "block" : "none", this.$loop.schedule(this.CHANGE_FULL), this.onGutterResize();
        },
        initialValue: !0
      },
      fadeFoldWidgets: {
        set: function (e) {
          i.setCssClass(this.$gutter, "ace_fade-fold-widgets", e);
        },
        initialValue: !1
      },
      showFoldWidgets: {
        set: function (e) {
          this.$gutterLayer.setShowFoldWidgets(e), this.$loop.schedule(this.CHANGE_GUTTER);
        },
        initialValue: !0
      },
      displayIndentGuides: {
        set: function (e) {
          this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT);
        },
        initialValue: !0
      },
      highlightIndentGuides: {
        set: function (e) {
          1 == this.$textLayer.setHighlightIndentGuides(e) ? this.$textLayer.$highlightIndentGuide() : this.$textLayer.$clearActiveIndentGuide(this.$textLayer.$lines.cells);
        },
        initialValue: !0
      },
      highlightGutterLine: {
        set: function (e) {
          this.$gutterLayer.setHighlightGutterLine(e), this.$loop.schedule(this.CHANGE_GUTTER);
        },
        initialValue: !0
      },
      hScrollBarAlwaysVisible: {
        set: function (e) {
          this.$hScrollBarAlwaysVisible && this.$horizScroll || this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: !1
      },
      vScrollBarAlwaysVisible: {
        set: function (e) {
          this.$vScrollBarAlwaysVisible && this.$vScroll || this.$loop.schedule(this.CHANGE_SCROLL);
        },
        initialValue: !1
      },
      fontSize: {
        set: function (e) {
          "number" == typeof e && (e += "px"), this.container.style.fontSize = e, this.updateFontSize();
        },
        initialValue: 12
      },
      fontFamily: {
        set: function (e) {
          this.container.style.fontFamily = e, this.updateFontSize();
        }
      },
      maxLines: {
        set: function (e) {
          this.updateFull();
        }
      },
      minLines: {
        set: function (e) {
          this.$minLines < 562949953421311 || (this.$minLines = 0), this.updateFull();
        }
      },
      maxPixelHeight: {
        set: function (e) {
          this.updateFull();
        },
        initialValue: 0
      },
      scrollPastEnd: {
        set: function (e) {
          e = +e || 0, this.$scrollPastEnd != e && (this.$scrollPastEnd = e, this.$loop.schedule(this.CHANGE_SCROLL));
        },
        initialValue: 0,
        handlesSet: !0
      },
      fixedWidthGutter: {
        set: function (e) {
          this.$gutterLayer.$fixedWidth = !!e, this.$loop.schedule(this.CHANGE_GUTTER);
        }
      },
      customScrollbar: {
        set: function (e) {
          this.$updateCustomScrollbar(e);
        },
        initialValue: !1
      },
      theme: {
        set: function (e) {
          this.setTheme(e);
        },
        get: function () {
          return this.$themeId || this.theme;
        },
        initialValue: "./theme/textmate",
        handlesSet: !0
      },
      hasCssTransforms: {},
      useTextareaForIME: {
        initialValue: !b.isMobile && !b.isIE
      }
    }), t.VirtualRenderer = x;
  }), ace.define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter", "ace/config"], function (e, t, n) {
    "use strict";

    var r = e("../lib/oop"),
      i = e("../lib/net"),
      o = e("../lib/event_emitter").EventEmitter,
      a = e("../config");
    function s(e) {
      var t = "importScripts('" + i.qualifyURL(e) + "');";
      try {
        return new Blob([t], {
          type: "application/javascript"
        });
      } catch (e) {
        var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder,
          r = new n();
        return r.append(t), r.getBlob("application/javascript");
      }
    }
    function l(e) {
      if ("undefined" == typeof Worker) return {
        postMessage: function () {},
        terminate: function () {}
      };
      if (a.get("loadWorkerFromBlob")) {
        var t = s(e),
          n = window.URL || window.webkitURL,
          r = n.createObjectURL(t);
        return new Worker(r);
      }
      return new Worker(e);
    }
    var c = function (e) {
      e.postMessage || (e = this.$createWorkerFromOldConfig.apply(this, arguments)), this.$worker = e, this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), this.callbackId = 1, this.callbacks = {}, this.$worker.onmessage = this.onMessage;
    };
    (function () {
      r.implement(this, o), this.$createWorkerFromOldConfig = function (t, n, r, i, o) {
        if (e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl), a.get("packaged") || !e.toUrl) i = i || a.moduleUrl(n, "worker");else {
          var s = this.$normalizePath;
          i = i || s(e.toUrl("ace/worker/worker.js", null, "_"));
          var c = {};
          t.forEach(function (t) {
            c[t] = s(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""));
          });
        }
        return this.$worker = l(i), o && this.send("importScripts", o), this.$worker.postMessage({
          init: !0,
          tlns: c,
          module: n,
          classname: r
        }), this.$worker;
      }, this.onMessage = function (e) {
        var t = e.data;
        switch (t.type) {
          case "event":
            this._signal(t.name, {
              data: t.data
            });
            break;
          case "call":
            var n = this.callbacks[t.id];
            n && (n(t.data), delete this.callbacks[t.id]);
            break;
          case "error":
            this.reportError(t.data);
            break;
          case "log":
            window.console && console.log && console.log.apply(console, t.data);
            break;
        }
      }, this.reportError = function (e) {
        window.console && console.error && console.error(e);
      }, this.$normalizePath = function (e) {
        return i.qualifyURL(e);
      }, this.terminate = function () {
        this._signal("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc && this.$doc.off("change", this.changeListener), this.$doc = null;
      }, this.send = function (e, t) {
        this.$worker.postMessage({
          command: e,
          args: t
        });
      }, this.call = function (e, t, n) {
        if (n) {
          var r = this.callbackId++;
          this.callbacks[r] = n, t.push(r);
        }
        this.send(e, t);
      }, this.emit = function (e, t) {
        try {
          t.data && t.data.err && (t.data.err = {
            message: t.data.err.message,
            stack: t.data.err.stack,
            code: t.data.err.code
          }), this.$worker && this.$worker.postMessage({
            event: e,
            data: {
              data: t.data
            }
          });
        } catch (e) {
          console.error(e.stack);
        }
      }, this.attachToDocument = function (e) {
        this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener, !0);
      }, this.changeListener = function (e) {
        this.deltaQueue || (this.deltaQueue = [], setTimeout(this.$sendDeltaQueue, 0)), "insert" == e.action ? this.deltaQueue.push(e.start, e.lines) : this.deltaQueue.push(e.start, e.end);
      }, this.$sendDeltaQueue = function () {
        var e = this.deltaQueue;
        e && (this.deltaQueue = null, e.length > 50 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {
          data: e
        }));
      };
    }).call(c.prototype);
    var u = function (e, t, n) {
      var r = null,
        i = !1,
        s = Object.create(o),
        l = [],
        u = new c({
          messageBuffer: l,
          terminate: function () {},
          postMessage: function (e) {
            l.push(e), r && (i ? setTimeout(h) : h());
          }
        });
      u.setEmitSync = function (e) {
        i = e;
      };
      var h = function () {
        var e = l.shift();
        e.command ? r[e.command].apply(r, e.args) : e.event && s._signal(e.event, e.data);
      };
      return s.postMessage = function (e) {
        u.onMessage({
          data: e
        });
      }, s.callback = function (e, t) {
        this.postMessage({
          type: "call",
          id: t,
          data: e
        });
      }, s.emit = function (e, t) {
        this.postMessage({
          type: "event",
          name: e,
          data: t
        });
      }, a.loadModule(["worker", t], function (e) {
        r = new e[n](s);
        while (l.length) h();
      }), u;
    };
    t.UIWorkerClient = u, t.WorkerClient = c, t.createWorker = l;
  }), ace.define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function (e, t, n) {
    "use strict";

    var r = e("./range").Range,
      i = e("./lib/event_emitter").EventEmitter,
      o = e("./lib/oop"),
      a = function (e, t, n, r, i, o) {
        var a = this;
        this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = i, this.othersClass = o, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate, !0), this.$others = r, this.$onCursorChange = function () {
          setTimeout(function () {
            a.onCursorChange();
          });
        }, this.$pos = n;
        var s = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {
          length: -1
        };
        this.$undoStackDepth = s.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange);
      };
    (function () {
      o.implement(this, i), this.setup = function () {
        var e = this,
          t = this.doc,
          n = this.session;
        this.selectionBefore = n.selection.toJSON(), n.selection.inMultiSelectMode && n.selection.toSingleRange(), this.pos = t.createAnchor(this.$pos.row, this.$pos.column);
        var i = this.pos;
        i.$insertRight = !0, i.detach(), i.markerId = n.addMarker(new r(i.row, i.column, i.row, i.column + this.length), this.mainClass, null, !1), this.others = [], this.$others.forEach(function (n) {
          var r = t.createAnchor(n.row, n.column);
          r.$insertRight = !0, r.detach(), e.others.push(r);
        }), n.setUndoSelect(!1);
      }, this.showOtherMarkers = function () {
        if (!this.othersActive) {
          var e = this.session,
            t = this;
          this.othersActive = !0, this.others.forEach(function (n) {
            n.markerId = e.addMarker(new r(n.row, n.column, n.row, n.column + t.length), t.othersClass, null, !1);
          });
        }
      }, this.hideOtherMarkers = function () {
        if (this.othersActive) {
          this.othersActive = !1;
          for (var e = 0; e < this.others.length; e++) this.session.removeMarker(this.others[e].markerId);
        }
      }, this.onUpdate = function (e) {
        if (this.$updating) return this.updateAnchors(e);
        var t = e;
        if (t.start.row === t.end.row && t.start.row === this.pos.row) {
          this.$updating = !0;
          var n = "insert" === e.action ? t.end.column - t.start.column : t.start.column - t.end.column,
            i = t.start.column >= this.pos.column && t.start.column <= this.pos.column + this.length + 1,
            o = t.start.column - this.pos.column;
          if (this.updateAnchors(e), i && (this.length += n), i && !this.session.$fromUndo) if ("insert" === e.action) for (var a = this.others.length - 1; a >= 0; a--) {
            var s = this.others[a],
              l = {
                row: s.row,
                column: s.column + o
              };
            this.doc.insertMergedLines(l, e.lines);
          } else if ("remove" === e.action) for (a = this.others.length - 1; a >= 0; a--) {
            s = this.others[a], l = {
              row: s.row,
              column: s.column + o
            };
            this.doc.remove(new r(l.row, l.column, l.row, l.column - n));
          }
          this.$updating = !1, this.updateMarkers();
        }
      }, this.updateAnchors = function (e) {
        this.pos.onChange(e);
        for (var t = this.others.length; t--;) this.others[t].onChange(e);
        this.updateMarkers();
      }, this.updateMarkers = function () {
        if (!this.$updating) {
          var e = this,
            t = this.session,
            n = function (n, i) {
              t.removeMarker(n.markerId), n.markerId = t.addMarker(new r(n.row, n.column, n.row, n.column + e.length), i, null, !1);
            };
          n(this.pos, this.mainClass);
          for (var i = this.others.length; i--;) n(this.others[i], this.othersClass);
        }
      }, this.onCursorChange = function (e) {
        if (!this.$updating && this.session) {
          var t = this.session.selection.getCursor();
          t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e));
        }
      }, this.detach = function () {
        this.session.removeMarker(this.pos && this.pos.markerId), this.hideOtherMarkers(), this.doc.off("change", this.$onUpdate), this.session.selection.off("changeCursor", this.$onCursorChange), this.session.setUndoSelect(!0), this.session = null;
      }, this.cancel = function () {
        if (-1 !== this.$undoStackDepth) {
          for (var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth, n = 0; n < t; n++) e.undo(this.session, !0);
          this.selectionBefore && this.session.selection.fromJSON(this.selectionBefore);
        }
      };
    }).call(a.prototype), t.PlaceHolder = a;
  }), ace.define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (e, t, n) {
    var r = e("../lib/event"),
      i = e("../lib/useragent");
    function o(e, t) {
      return e.row == t.row && e.column == t.column;
    }
    function a(e) {
      var t = e.domEvent,
        n = t.altKey,
        a = t.shiftKey,
        s = t.ctrlKey,
        l = e.getAccelKey(),
        c = e.getButton();
      if (s && i.isMac && (c = t.button), e.editor.inMultiSelectMode && 2 == c) e.editor.textInput.onContextMenu(e.domEvent);else if (s || n || l) {
        if (0 === c) {
          var u,
            h = e.editor,
            f = h.selection,
            d = h.inMultiSelectMode,
            p = e.getDocumentPosition(),
            m = f.getCursor(),
            g = e.inSelection() || f.isEmpty() && o(p, m),
            v = e.x,
            y = e.y,
            b = function (e) {
              v = e.clientX, y = e.clientY;
            },
            w = h.session,
            x = h.renderer.pixelToScreenCoordinates(v, y),
            _ = x;
          if (h.$mouseHandler.$enableJumpToDef) s && n || l && n ? u = a ? "block" : "add" : n && h.$blockSelectEnabled && (u = "block");else if (l && !n) {
            if (u = "add", !d && a) return;
          } else n && h.$blockSelectEnabled && (u = "block");
          if (u && i.isMac && t.ctrlKey && h.$mouseHandler.cancelContextMenu(), "add" == u) {
            if (!d && g) return;
            if (!d) {
              var E = f.toOrientedRange();
              h.addSelectionMarker(E);
            }
            var S = f.rangeList.rangeAtPoint(p);
            h.inVirtualSelectionMode = !0, a && (S = null, E = f.ranges[0] || E, h.removeSelectionMarker(E)), h.once("mouseup", function () {
              var e = f.toOrientedRange();
              S && e.isEmpty() && o(S.cursor, e.cursor) ? f.substractPoint(e.cursor) : (a ? f.substractPoint(E.cursor) : E && (h.removeSelectionMarker(E), f.addRange(E)), f.addRange(e)), h.inVirtualSelectionMode = !1;
            });
          } else if ("block" == u) {
            var k;
            e.stop(), h.inVirtualSelectionMode = !0;
            var C = [],
              O = function () {
                var e = h.renderer.pixelToScreenCoordinates(v, y),
                  t = w.screenToDocumentPosition(e.row, e.column, e.offsetX);
                o(_, e) && o(t, f.lead) || (_ = e, h.selection.moveToPosition(t), h.renderer.scrollCursorIntoView(), h.removeSelectionMarkers(C), C = f.rectangularRangeBlock(_, x), h.$mouseHandler.$clickSelection && 1 == C.length && C[0].isEmpty() && (C[0] = h.$mouseHandler.$clickSelection.clone()), C.forEach(h.addSelectionMarker, h), h.updateSelectionMarkers());
              };
            d && !l ? f.toSingleRange() : !d && l && (k = f.toOrientedRange(), h.addSelectionMarker(k)), a ? x = w.documentToScreenPosition(f.lead) : f.moveToPosition(p), _ = {
              row: -1,
              column: -1
            };
            var T = function (e) {
                O(), clearInterval(A), h.removeSelectionMarkers(C), C.length || (C = [f.toOrientedRange()]), k && (h.removeSelectionMarker(k), f.toSingleRange(k));
                for (var t = 0; t < C.length; t++) f.addRange(C[t]);
                h.inVirtualSelectionMode = !1, h.$mouseHandler.$clickSelection = null;
              },
              L = O;
            r.capture(h.container, b, T);
            var A = setInterval(function () {
              L();
            }, 20);
            return e.preventDefault();
          }
        }
      } else 0 === c && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode();
    }
    t.onMouseDown = a;
  }), ace.define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function (e, t, n) {
    t.defaultCommands = [{
      name: "addCursorAbove",
      description: "Add cursor above",
      exec: function (e) {
        e.selectMoreLines(-1);
      },
      bindKey: {
        win: "Ctrl-Alt-Up",
        mac: "Ctrl-Alt-Up"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "addCursorBelow",
      description: "Add cursor below",
      exec: function (e) {
        e.selectMoreLines(1);
      },
      bindKey: {
        win: "Ctrl-Alt-Down",
        mac: "Ctrl-Alt-Down"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "addCursorAboveSkipCurrent",
      description: "Add cursor above (skip current)",
      exec: function (e) {
        e.selectMoreLines(-1, !0);
      },
      bindKey: {
        win: "Ctrl-Alt-Shift-Up",
        mac: "Ctrl-Alt-Shift-Up"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "addCursorBelowSkipCurrent",
      description: "Add cursor below (skip current)",
      exec: function (e) {
        e.selectMoreLines(1, !0);
      },
      bindKey: {
        win: "Ctrl-Alt-Shift-Down",
        mac: "Ctrl-Alt-Shift-Down"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectMoreBefore",
      description: "Select more before",
      exec: function (e) {
        e.selectMore(-1);
      },
      bindKey: {
        win: "Ctrl-Alt-Left",
        mac: "Ctrl-Alt-Left"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectMoreAfter",
      description: "Select more after",
      exec: function (e) {
        e.selectMore(1);
      },
      bindKey: {
        win: "Ctrl-Alt-Right",
        mac: "Ctrl-Alt-Right"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectNextBefore",
      description: "Select next before",
      exec: function (e) {
        e.selectMore(-1, !0);
      },
      bindKey: {
        win: "Ctrl-Alt-Shift-Left",
        mac: "Ctrl-Alt-Shift-Left"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "selectNextAfter",
      description: "Select next after",
      exec: function (e) {
        e.selectMore(1, !0);
      },
      bindKey: {
        win: "Ctrl-Alt-Shift-Right",
        mac: "Ctrl-Alt-Shift-Right"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }, {
      name: "toggleSplitSelectionIntoLines",
      description: "Split into lines",
      exec: function (e) {
        e.multiSelect.rangeCount > 1 ? e.multiSelect.joinSelections() : e.multiSelect.splitIntoLines();
      },
      bindKey: {
        win: "Ctrl-Alt-L",
        mac: "Ctrl-Alt-L"
      },
      readOnly: !0
    }, {
      name: "splitSelectionIntoLines",
      description: "Split into lines",
      exec: function (e) {
        e.multiSelect.splitIntoLines();
      },
      readOnly: !0
    }, {
      name: "alignCursors",
      description: "Align cursors",
      exec: function (e) {
        e.alignCursors();
      },
      bindKey: {
        win: "Ctrl-Alt-A",
        mac: "Ctrl-Alt-A"
      },
      scrollIntoView: "cursor"
    }, {
      name: "findAll",
      description: "Find all",
      exec: function (e) {
        e.findAll();
      },
      bindKey: {
        win: "Ctrl-Alt-K",
        mac: "Ctrl-Alt-G"
      },
      scrollIntoView: "cursor",
      readOnly: !0
    }], t.multiSelectCommands = [{
      name: "singleSelection",
      description: "Single selection",
      bindKey: "esc",
      exec: function (e) {
        e.exitMultiSelectMode();
      },
      scrollIntoView: "cursor",
      readOnly: !0,
      isAvailable: function (e) {
        return e && e.inMultiSelectMode;
      }
    }];
    var r = e("../keyboard/hash_handler").HashHandler;
    t.keyboardHandler = new r(t.multiSelectCommands);
  }), ace.define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"], function (e, t, n) {
    var r = e("./range_list").RangeList,
      i = e("./range").Range,
      o = e("./selection").Selection,
      a = e("./mouse/multi_select_handler").onMouseDown,
      s = e("./lib/event"),
      l = e("./lib/lang"),
      c = e("./commands/multi_select_commands");
    t.commands = c.defaultCommands.concat(c.multiSelectCommands);
    var u = e("./search").Search,
      h = new u();
    function f(e, t, n) {
      return h.$options.wrap = !0, h.$options.needle = t, h.$options.backwards = -1 == n, h.find(e);
    }
    var d = e("./edit_session").EditSession;
    (function () {
      this.getSelectionMarkers = function () {
        return this.$selectionMarkers;
      };
    }).call(d.prototype), function () {
      this.ranges = null, this.rangeList = null, this.addRange = function (e, t) {
        if (e) {
          if (!this.inMultiSelectMode && 0 === this.rangeCount) {
            var n = this.toOrientedRange();
            if (this.rangeList.add(n), this.rangeList.add(e), 2 != this.rangeList.ranges.length) return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
            this.rangeList.removeAll(), this.rangeList.add(n), this.$onAddRange(n);
          }
          e.cursor || (e.cursor = e.end);
          var r = this.rangeList.add(e);
          return this.$onAddRange(e), r.length && this.$onRemoveRange(r), this.rangeCount > 1 && !this.inMultiSelectMode && (this._signal("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e);
        }
      }, this.toSingleRange = function (e) {
        e = e || this.ranges[0];
        var t = this.rangeList.removeAll();
        t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e);
      }, this.substractPoint = function (e) {
        var t = this.rangeList.substractPoint(e);
        if (t) return this.$onRemoveRange(t), t[0];
      }, this.mergeOverlappingRanges = function () {
        var e = this.rangeList.merge();
        e.length && this.$onRemoveRange(e);
      }, this.$onAddRange = function (e) {
        this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._signal("addRange", {
          range: e
        });
      }, this.$onRemoveRange = function (e) {
        if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
          var t = this.rangeList.ranges.pop();
          e.push(t), this.rangeCount = 0;
        }
        for (var n = e.length; n--;) {
          var r = this.ranges.indexOf(e[n]);
          this.ranges.splice(r, 1);
        }
        this._signal("removeRange", {
          ranges: e
        }), 0 === this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._signal("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), t = t || this.ranges[0], t && !t.isEqual(this.getRange()) && this.fromOrientedRange(t);
      }, this.$initRangeList = function () {
        this.rangeList || (this.rangeList = new r(), this.ranges = [], this.rangeCount = 0);
      }, this.getAllRanges = function () {
        return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()];
      }, this.splitIntoLines = function () {
        for (var e = this.ranges.length ? this.ranges : [this.getRange()], t = [], n = 0; n < e.length; n++) {
          var r = e[n],
            o = r.start.row,
            a = r.end.row;
          if (o === a) t.push(r.clone());else {
            t.push(new i(o, r.start.column, o, this.session.getLine(o).length));
            while (++o < a) t.push(this.getLineRange(o, !0));
            t.push(new i(a, 0, a, r.end.column));
          }
          0 != n || this.isBackwards() || (t = t.reverse());
        }
        this.toSingleRange();
        for (n = t.length; n--;) this.addRange(t[n]);
      }, this.joinSelections = function () {
        var e = this.rangeList.ranges,
          t = e[e.length - 1],
          n = i.fromPoints(e[0].start, t.end);
        this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start);
      }, this.toggleBlockSelection = function () {
        if (this.rangeCount > 1) {
          var e = this.rangeList.ranges,
            t = e[e.length - 1],
            n = i.fromPoints(e[0].start, t.end);
          this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start);
        } else {
          var r = this.session.documentToScreenPosition(this.cursor),
            o = this.session.documentToScreenPosition(this.anchor),
            a = this.rectangularRangeBlock(r, o);
          a.forEach(this.addRange, this);
        }
      }, this.rectangularRangeBlock = function (e, t, n) {
        var r = [],
          o = e.column < t.column;
        if (o) var a = e.column,
          s = t.column,
          l = e.offsetX,
          c = t.offsetX;else a = t.column, s = e.column, l = t.offsetX, c = e.offsetX;
        var u,
          h = e.row < t.row;
        if (h) var f = e.row,
          d = t.row;else f = t.row, d = e.row;
        a < 0 && (a = 0), f < 0 && (f = 0), f == d && (n = !0);
        for (var p = f; p <= d; p++) {
          var g = i.fromPoints(this.session.screenToDocumentPosition(p, a, l), this.session.screenToDocumentPosition(p, s, c));
          if (g.isEmpty()) {
            if (u && m(g.end, u)) break;
            u = g.end;
          }
          g.cursor = o ? g.start : g.end, r.push(g);
        }
        if (h && r.reverse(), !n) {
          var v = r.length - 1;
          while (r[v].isEmpty() && v > 0) v--;
          if (v > 0) {
            var y = 0;
            while (r[y].isEmpty()) y++;
          }
          for (var b = v; b >= y; b--) r[b].isEmpty() && r.splice(b, 1);
        }
        return r;
      };
    }.call(o.prototype);
    var p = e("./editor").Editor;
    function m(e, t) {
      return e.row == t.row && e.column == t.column;
    }
    function g(e) {
      e.$multiselectOnSessionChange || (e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), e.$multiselectOnSessionChange = t.onSessionChange.bind(e), e.$checkMultiselectChange = e.$checkMultiselectChange.bind(e), e.$multiselectOnSessionChange(e), e.on("changeSession", e.$multiselectOnSessionChange), e.on("mousedown", a), e.commands.addCommands(c.defaultCommands), v(e));
    }
    function v(e) {
      if (e.textInput) {
        var t = e.textInput.getElement(),
          n = !1;
        s.addListener(t, "keydown", function (t) {
          var i = 18 == t.keyCode && !(t.ctrlKey || t.shiftKey || t.metaKey);
          e.$blockSelectEnabled && i ? n || (e.renderer.setMouseCursor("crosshair"), n = !0) : n && r();
        }, e), s.addListener(t, "keyup", r, e), s.addListener(t, "blur", r, e);
      }
      function r(t) {
        n && (e.renderer.setMouseCursor(""), n = !1);
      }
    }
    (function () {
      this.updateSelectionMarkers = function () {
        this.renderer.updateCursor(), this.renderer.updateBackMarkers();
      }, this.addSelectionMarker = function (e) {
        e.cursor || (e.cursor = e.end);
        var t = this.getSelectionStyle();
        return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e;
      }, this.removeSelectionMarker = function (e) {
        if (e.marker) {
          this.session.removeMarker(e.marker);
          var t = this.session.$selectionMarkers.indexOf(e);
          -1 != t && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
        }
      }, this.removeSelectionMarkers = function (e) {
        for (var t = this.session.$selectionMarkers, n = e.length; n--;) {
          var r = e[n];
          if (r.marker) {
            this.session.removeMarker(r.marker);
            var i = t.indexOf(r);
            -1 != i && t.splice(i, 1);
          }
        }
        this.session.selectionMarkerCount = t.length;
      }, this.$onAddRange = function (e) {
        this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
      }, this.$onRemoveRange = function (e) {
        this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
      }, this.$onMultiSelect = function (e) {
        this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(c.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers());
      }, this.$onSingleSelect = function (e) {
        this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(c.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers(), this._emit("changeSelection"));
      }, this.$onMultiSelectExec = function (e) {
        var t = e.command,
          n = e.editor;
        if (n.multiSelect) {
          if (t.multiSelectAction) "forEach" == t.multiSelectAction ? r = n.forEachSelection(t, e.args) : "forEachLine" == t.multiSelectAction ? r = n.forEachSelection(t, e.args, !0) : "single" == t.multiSelectAction ? (n.exitMultiSelectMode(), r = t.exec(n, e.args || {})) : r = t.multiSelectAction(n, e.args || {});else {
            var r = t.exec(n, e.args || {});
            n.multiSelect.addRange(n.multiSelect.toOrientedRange()), n.multiSelect.mergeOverlappingRanges();
          }
          return r;
        }
      }, this.forEachSelection = function (e, t, n) {
        if (!this.inVirtualSelectionMode) {
          var r,
            i = n && n.keepOrder,
            a = 1 == n || n && n.$byLines,
            s = this.session,
            l = this.selection,
            c = l.rangeList,
            u = (i ? l : c).ranges;
          if (!u.length) return e.exec ? e.exec(this, t || {}) : e(this, t || {});
          var h = l._eventRegistry;
          l._eventRegistry = {};
          var f = new o(s);
          this.inVirtualSelectionMode = !0;
          for (var d = u.length; d--;) {
            if (a) while (d > 0 && u[d].start.row == u[d - 1].end.row) d--;
            f.fromOrientedRange(u[d]), f.index = d, this.selection = s.selection = f;
            var p = e.exec ? e.exec(this, t || {}) : e(this, t || {});
            r || void 0 === p || (r = p), f.toOrientedRange(u[d]);
          }
          f.detach(), this.selection = s.selection = l, this.inVirtualSelectionMode = !1, l._eventRegistry = h, l.mergeOverlappingRanges(), l.ranges[0] && l.fromOrientedRange(l.ranges[0]);
          var m = this.renderer.$scrollAnimation;
          return this.onCursorChange(), this.onSelectionChange(), m && m.from == m.to && this.renderer.animateScrolling(m.from), r;
        }
      }, this.exitMultiSelectMode = function () {
        this.inMultiSelectMode && !this.inVirtualSelectionMode && this.multiSelect.toSingleRange();
      }, this.getSelectedText = function () {
        var e = "";
        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
          for (var t = this.multiSelect.rangeList.ranges, n = [], r = 0; r < t.length; r++) n.push(this.session.getTextRange(t[r]));
          var i = this.session.getDocument().getNewLineCharacter();
          e = n.join(i), e.length == (n.length - 1) * i.length && (e = "");
        } else this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
        return e;
      }, this.$checkMultiselectChange = function (e, t) {
        if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
          var n = this.multiSelect.ranges[0];
          if (this.multiSelect.isEmpty() && t == this.multiSelect.anchor) return;
          var r = t == this.multiSelect.anchor ? n.cursor == n.start ? n.end : n.start : n.cursor;
          r.row != t.row || this.session.$clipPositionToDocument(r.row, r.column).column != t.column ? this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()) : this.multiSelect.mergeOverlappingRanges();
        }
      }, this.findAll = function (e, t, n) {
        if (t = t || {}, t.needle = e || t.needle, void 0 == t.needle) {
          var r = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
          t.needle = this.session.getTextRange(r);
        }
        this.$search.set(t);
        var i = this.$search.findAll(this.session);
        if (!i.length) return 0;
        var o = this.multiSelect;
        n || o.toSingleRange(i[0]);
        for (var a = i.length; a--;) o.addRange(i[a], !0);
        return r && o.rangeList.rangeAtPoint(r.start) && o.addRange(r, !0), i.length;
      }, this.selectMoreLines = function (e, t) {
        var n = this.selection.toOrientedRange(),
          r = n.cursor == n.end,
          o = this.session.documentToScreenPosition(n.cursor);
        this.selection.$desiredColumn && (o.column = this.selection.$desiredColumn);
        var a = this.session.screenToDocumentPosition(o.row + e, o.column);
        if (n.isEmpty()) l = a;else var s = this.session.documentToScreenPosition(r ? n.end : n.start),
          l = this.session.screenToDocumentPosition(s.row + e, s.column);
        if (r) {
          var c = i.fromPoints(a, l);
          c.cursor = c.start;
        } else {
          c = i.fromPoints(l, a);
          c.cursor = c.end;
        }
        if (c.desiredColumn = o.column, this.selection.inMultiSelectMode) {
          if (t) var u = n.cursor;
        } else this.selection.addRange(n);
        this.selection.addRange(c), u && this.selection.substractPoint(u);
      }, this.transposeSelections = function (e) {
        for (var t = this.session, n = t.multiSelect, r = n.ranges, i = r.length; i--;) {
          var o = r[i];
          if (o.isEmpty()) {
            var a = t.getWordRange(o.start.row, o.start.column);
            o.start.row = a.start.row, o.start.column = a.start.column, o.end.row = a.end.row, o.end.column = a.end.column;
          }
        }
        n.mergeOverlappingRanges();
        var s = [];
        for (i = r.length; i--;) {
          o = r[i];
          s.unshift(t.getTextRange(o));
        }
        e < 0 ? s.unshift(s.pop()) : s.push(s.shift());
        for (i = r.length; i--;) {
          o = r[i], a = o.clone();
          t.replace(o, s[i]), o.start.row = a.start.row, o.start.column = a.start.column;
        }
        n.fromOrientedRange(n.ranges[0]);
      }, this.selectMore = function (e, t, n) {
        var r = this.session,
          i = r.multiSelect,
          o = i.toOrientedRange();
        if (!o.isEmpty() || (o = r.getWordRange(o.start.row, o.start.column), o.cursor = -1 == e ? o.start : o.end, this.multiSelect.addRange(o), !n)) {
          var a = r.getTextRange(o),
            s = f(r, a, e);
          s && (s.cursor = -1 == e ? s.start : s.end, this.session.unfold(s), this.multiSelect.addRange(s), this.renderer.scrollCursorIntoView(null, .5)), t && this.multiSelect.substractPoint(o.cursor);
        }
      }, this.alignCursors = function () {
        var e = this.session,
          t = e.multiSelect,
          n = t.ranges,
          r = -1,
          o = n.filter(function (e) {
            if (e.cursor.row == r) return !0;
            r = e.cursor.row;
          });
        if (n.length && o.length != n.length - 1) {
          o.forEach(function (e) {
            t.substractPoint(e.cursor);
          });
          var a = 0,
            s = 1 / 0,
            c = n.map(function (t) {
              var n = t.cursor,
                r = e.getLine(n.row),
                i = r.substr(n.column).search(/\S/g);
              return -1 == i && (i = 0), n.column > a && (a = n.column), i < s && (s = i), i;
            });
          n.forEach(function (t, n) {
            var r = t.cursor,
              o = a - r.column,
              u = c[n] - s;
            o > u ? e.insert(r, l.stringRepeat(" ", o - u)) : e.remove(new i(r.row, r.column, r.row, r.column - o + u)), t.start.column = t.end.column = a, t.start.row = t.end.row = r.row, t.cursor = t.end;
          }), t.fromOrientedRange(n[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers();
        } else {
          var u = this.selection.getRange(),
            h = u.start.row,
            f = u.end.row,
            d = h == f;
          if (d) {
            var p,
              m = this.session.getLength();
            do {
              p = this.session.getLine(f);
            } while (/[=:]/.test(p) && ++f < m);
            do {
              p = this.session.getLine(h);
            } while (/[=:]/.test(p) && --h > 0);
            h < 0 && (h = 0), f >= m && (f = m - 1);
          }
          var g = this.session.removeFullLines(h, f);
          g = this.$reAlignText(g, d), this.session.insert({
            row: h,
            column: 0
          }, g.join("\n") + "\n"), d || (u.start.column = 0, u.end.column = g[g.length - 1].length), this.selection.setRange(u);
        }
      }, this.$reAlignText = function (e, t) {
        var n,
          r,
          i,
          o = !0,
          a = !0;
        return e.map(function (e) {
          var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
          return t ? null == n ? (n = t[1].length, r = t[2].length, i = t[3].length, t) : (n + r + i != t[1].length + t[2].length + t[3].length && (a = !1), n != t[1].length && (o = !1), n > t[1].length && (n = t[1].length), r < t[2].length && (r = t[2].length), i > t[3].length && (i = t[3].length), t) : [e];
        }).map(t ? c : o ? a ? u : c : h);
        function s(e) {
          return l.stringRepeat(" ", e);
        }
        function c(e) {
          return e[2] ? s(n) + e[2] + s(r - e[2].length + i) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0];
        }
        function u(e) {
          return e[2] ? s(n + r - e[2].length) + e[2] + s(i) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0];
        }
        function h(e) {
          return e[2] ? s(n) + e[2] + s(i) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0];
        }
      };
    }).call(p.prototype), t.onSessionChange = function (e) {
      var t = e.session;
      t && !t.multiSelect && (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t && t.multiSelect;
      var n = e.oldSession;
      n && (n.multiSelect.off("addRange", this.$onAddRange), n.multiSelect.off("removeRange", this.$onRemoveRange), n.multiSelect.off("multiSelect", this.$onMultiSelect), n.multiSelect.off("singleSelect", this.$onSingleSelect), n.multiSelect.lead.off("change", this.$checkMultiselectChange), n.multiSelect.anchor.off("change", this.$checkMultiselectChange)), t && (t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), t.multiSelect.lead.on("change", this.$checkMultiselectChange), t.multiSelect.anchor.on("change", this.$checkMultiselectChange)), t && this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect());
    }, t.MultiSelect = g, e("./config").defineOptions(p.prototype, "editor", {
      enableMultiselect: {
        set: function (e) {
          g(this), e ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", a)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", a));
        },
        value: !0
      },
      enableBlockSelect: {
        set: function (e) {
          this.$blockSelectEnabled = e;
        },
        value: !0
      }
    });
  }), ace.define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("../../range").Range,
      i = t.FoldMode = function () {};
    (function () {
      this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function (e, t, n) {
        var r = e.getLine(n);
        return this.foldingStartMarker.test(r) ? "start" : "markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(r) ? "end" : "";
      }, this.getFoldWidgetRange = function (e, t, n) {
        return null;
      }, this.indentationBlock = function (e, t, n) {
        var i = /\S/,
          o = e.getLine(t),
          a = o.search(i);
        if (-1 != a) {
          var s = n || o.length,
            l = e.getLength(),
            c = t,
            u = t;
          while (++t < l) {
            var h = e.getLine(t).search(i);
            if (-1 != h) {
              if (h <= a) {
                var f = e.getTokenAt(t, 0);
                if (!f || "string" !== f.type) break;
              }
              u = t;
            }
          }
          if (u > c) {
            var d = e.getLine(u).length;
            return new r(c, s, u, d);
          }
        }
      }, this.openingBracketBlock = function (e, t, n, i, o) {
        var a = {
            row: n,
            column: i + 1
          },
          s = e.$findClosingBracket(t, a, o);
        if (s) {
          var l = e.foldWidgets[s.row];
          return null == l && (l = e.getFoldWidget(s.row)), "start" == l && s.row > a.row && (s.row--, s.column = e.getLine(s.row).length), r.fromPoints(a, s);
        }
      }, this.closingBracketBlock = function (e, t, n, i, o) {
        var a = {
            row: n,
            column: i
          },
          s = e.$findOpeningBracket(t, a);
        if (s) return s.column++, a.column--, r.fromPoints(s, a);
      };
    }).call(i.prototype);
  }), ace.define("ace/line_widgets", ["require", "exports", "module", "ace/lib/dom"], function (e, t, n) {
    "use strict";

    var r = e("./lib/dom");
    function i(e) {
      this.session = e, this.session.widgetManager = this, this.session.getRowLength = this.getRowLength, this.session.$getWidgetScreenLength = this.$getWidgetScreenLength, this.updateOnChange = this.updateOnChange.bind(this), this.renderWidgets = this.renderWidgets.bind(this), this.measureWidgets = this.measureWidgets.bind(this), this.session._changedWidgets = [], this.$onChangeEditor = this.$onChangeEditor.bind(this), this.session.on("change", this.updateOnChange), this.session.on("changeFold", this.updateOnFold), this.session.on("changeEditor", this.$onChangeEditor);
    }
    (function () {
      this.getRowLength = function (e) {
        var t;
        return t = this.lineWidgets && this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0, this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t;
      }, this.$getWidgetScreenLength = function () {
        var e = 0;
        return this.lineWidgets.forEach(function (t) {
          t && t.rowCount && !t.hidden && (e += t.rowCount);
        }), e;
      }, this.$onChangeEditor = function (e) {
        this.attach(e.editor);
      }, this.attach = function (e) {
        e && e.widgetManager && e.widgetManager != this && e.widgetManager.detach(), this.editor != e && (this.detach(), this.editor = e, e && (e.widgetManager = this, e.renderer.on("beforeRender", this.measureWidgets), e.renderer.on("afterRender", this.renderWidgets)));
      }, this.detach = function (e) {
        var t = this.editor;
        if (t) {
          this.editor = null, t.widgetManager = null, t.renderer.off("beforeRender", this.measureWidgets), t.renderer.off("afterRender", this.renderWidgets);
          var n = this.session.lineWidgets;
          n && n.forEach(function (e) {
            e && e.el && e.el.parentNode && (e._inDocument = !1, e.el.parentNode.removeChild(e.el));
          });
        }
      }, this.updateOnFold = function (e, t) {
        var n = t.lineWidgets;
        if (n && e.action) {
          for (var r = e.data, i = r.start.row, o = r.end.row, a = "add" == e.action, s = i + 1; s < o; s++) n[s] && (n[s].hidden = a);
          n[o] && (a ? n[i] ? n[o].hidden = a : n[i] = n[o] : (n[i] == n[o] && (n[i] = void 0), n[o].hidden = a));
        }
      }, this.updateOnChange = function (e) {
        var t = this.session.lineWidgets;
        if (t) {
          var n = e.start.row,
            r = e.end.row - n;
          if (0 === r) ;else if ("remove" == e.action) {
            var i = t.splice(n + 1, r);
            !t[n] && i[i.length - 1] && (t[n] = i.pop()), i.forEach(function (e) {
              e && this.removeLineWidget(e);
            }, this), this.$updateRows();
          } else {
            var o = new Array(r);
            t[n] && null != t[n].column && e.start.column > t[n].column && n++, o.unshift(n, 0), t.splice.apply(t, o), this.$updateRows();
          }
        }
      }, this.$updateRows = function () {
        var e = this.session.lineWidgets;
        if (e) {
          var t = !0;
          e.forEach(function (e, n) {
            if (e) {
              t = !1, e.row = n;
              while (e.$oldWidget) e.$oldWidget.row = n, e = e.$oldWidget;
            }
          }), t && (this.session.lineWidgets = null);
        }
      }, this.$registerLineWidget = function (e) {
        this.session.lineWidgets || (this.session.lineWidgets = new Array(this.session.getLength()));
        var t = this.session.lineWidgets[e.row];
        return t && (e.$oldWidget = t, t.el && t.el.parentNode && (t.el.parentNode.removeChild(t.el), t._inDocument = !1)), this.session.lineWidgets[e.row] = e, e;
      }, this.addLineWidget = function (e) {
        if (this.$registerLineWidget(e), e.session = this.session, !this.editor) return e;
        var t = this.editor.renderer;
        e.html && !e.el && (e.el = r.createElement("div"), e.el.innerHTML = e.html), e.el && (r.addCssClass(e.el, "ace_lineWidgetContainer"), e.el.style.position = "absolute", e.el.style.zIndex = 5, t.container.appendChild(e.el), e._inDocument = !0, e.coverGutter || (e.el.style.zIndex = 3), null == e.pixelHeight && (e.pixelHeight = e.el.offsetHeight)), null == e.rowCount && (e.rowCount = e.pixelHeight / t.layerConfig.lineHeight);
        var n = this.session.getFoldAt(e.row, 0);
        if (e.$fold = n, n) {
          var i = this.session.lineWidgets;
          e.row != n.end.row || i[n.start.row] ? e.hidden = !0 : i[n.start.row] = e;
        }
        return this.session._emit("changeFold", {
          data: {
            start: {
              row: e.row
            }
          }
        }), this.$updateRows(), this.renderWidgets(null, t), this.onWidgetChanged(e), e;
      }, this.removeLineWidget = function (e) {
        if (e._inDocument = !1, e.session = null, e.el && e.el.parentNode && e.el.parentNode.removeChild(e.el), e.editor && e.editor.destroy) try {
          e.editor.destroy();
        } catch (e) {}
        if (this.session.lineWidgets) {
          var t = this.session.lineWidgets[e.row];
          if (t == e) this.session.lineWidgets[e.row] = e.$oldWidget, e.$oldWidget && this.onWidgetChanged(e.$oldWidget);else while (t) {
            if (t.$oldWidget == e) {
              t.$oldWidget = e.$oldWidget;
              break;
            }
            t = t.$oldWidget;
          }
        }
        this.session._emit("changeFold", {
          data: {
            start: {
              row: e.row
            }
          }
        }), this.$updateRows();
      }, this.getWidgetsAtRow = function (e) {
        var t = this.session.lineWidgets,
          n = t && t[e],
          r = [];
        while (n) r.push(n), n = n.$oldWidget;
        return r;
      }, this.onWidgetChanged = function (e) {
        this.session._changedWidgets.push(e), this.editor && this.editor.renderer.updateFull();
      }, this.measureWidgets = function (e, t) {
        var n = this.session._changedWidgets,
          r = t.layerConfig;
        if (n && n.length) {
          for (var i = 1 / 0, o = 0; o < n.length; o++) {
            var a = n[o];
            if (a && a.el && a.session == this.session) {
              if (!a._inDocument) {
                if (this.session.lineWidgets[a.row] != a) continue;
                a._inDocument = !0, t.container.appendChild(a.el);
              }
              a.h = a.el.offsetHeight, a.fixedWidth || (a.w = a.el.offsetWidth, a.screenWidth = Math.ceil(a.w / r.characterWidth));
              var s = a.h / r.lineHeight;
              a.coverLine && (s -= this.session.getRowLineCount(a.row), s < 0 && (s = 0)), a.rowCount != s && (a.rowCount = s, a.row < i && (i = a.row));
            }
          }
          i != 1 / 0 && (this.session._emit("changeFold", {
            data: {
              start: {
                row: i
              }
            }
          }), this.session.lineWidgetWidth = null), this.session._changedWidgets = [];
        }
      }, this.renderWidgets = function (e, t) {
        var n = t.layerConfig,
          r = this.session.lineWidgets;
        if (r) {
          var i = Math.min(this.firstRow, n.firstRow),
            o = Math.max(this.lastRow, n.lastRow, r.length);
          while (i > 0 && !r[i]) i--;
          this.firstRow = n.firstRow, this.lastRow = n.lastRow, t.$cursorLayer.config = n;
          for (var a = i; a <= o; a++) {
            var s = r[a];
            if (s && s.el) if (s.hidden) s.el.style.top = -100 - (s.pixelHeight || 0) + "px";else {
              s._inDocument || (s._inDocument = !0, t.container.appendChild(s.el));
              var l = t.$cursorLayer.getPixelPosition({
                row: a,
                column: 0
              }, !0).top;
              s.coverLine || (l += n.lineHeight * this.session.getRowLineCount(s.row)), s.el.style.top = l - n.offset + "px";
              var c = s.coverGutter ? 0 : t.gutterWidth;
              s.fixedWidth || (c -= t.scrollLeft), s.el.style.left = c + "px", s.fullWidth && s.screenWidth && (s.el.style.minWidth = n.width + 2 * n.padding + "px"), s.fixedWidth ? s.el.style.right = t.scrollBar.getWidth() + "px" : s.el.style.right = "";
            }
          }
        }
      };
    }).call(i.prototype), t.LineWidgets = i;
  }), ace.define("ace/ext/error_marker", ["require", "exports", "module", "ace/line_widgets", "ace/lib/dom", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("../line_widgets").LineWidgets,
      i = e("../lib/dom"),
      o = e("../range").Range;
    function a(e, t, n) {
      var r = 0,
        i = e.length - 1;
      while (r <= i) {
        var o = r + i >> 1,
          a = n(t, e[o]);
        if (a > 0) r = o + 1;else {
          if (!(a < 0)) return o;
          i = o - 1;
        }
      }
      return -(r + 1);
    }
    function s(e, t, n) {
      var r = e.getAnnotations().sort(o.comparePoints);
      if (r.length) {
        var i = a(r, {
          row: t,
          column: -1
        }, o.comparePoints);
        i < 0 && (i = -i - 1), i >= r.length ? i = n > 0 ? 0 : r.length - 1 : 0 === i && n < 0 && (i = r.length - 1);
        var s = r[i];
        if (s && n) {
          if (s.row === t) {
            do {
              s = r[i += n];
            } while (s && s.row === t);
            if (!s) return r.slice();
          }
          var l = [];
          t = s.row;
          do {
            l[n < 0 ? "unshift" : "push"](s), s = r[i += n];
          } while (s && s.row == t);
          return l.length && l;
        }
      }
    }
    t.showErrorMarker = function (e, t) {
      var n = e.session;
      n.widgetManager || (n.widgetManager = new r(n), n.widgetManager.attach(e));
      var o = e.getCursorPosition(),
        a = o.row,
        l = n.widgetManager.getWidgetsAtRow(a).filter(function (e) {
          return "errorMarker" == e.type;
        })[0];
      l ? l.destroy() : a -= t;
      var c,
        u = s(n, a, t);
      if (u) {
        var h = u[0];
        o.column = (h.pos && "number" != typeof h.column ? h.pos.sc : h.column) || 0, o.row = h.row, c = e.renderer.$gutterLayer.$annotations[o.row];
      } else {
        if (l) return;
        c = {
          text: ["Looks good!"],
          className: "ace_ok"
        };
      }
      e.session.unfold(o.row), e.selection.moveToPosition(o);
      var f = {
          row: o.row,
          fixedWidth: !0,
          coverGutter: !0,
          el: i.createElement("div"),
          type: "errorMarker"
        },
        d = f.el.appendChild(i.createElement("div")),
        p = f.el.appendChild(i.createElement("div"));
      p.className = "error_widget_arrow " + c.className;
      var m = e.renderer.$cursorLayer.getPixelPosition(o).left;
      p.style.left = m + e.renderer.gutterWidth - 5 + "px", f.el.className = "error_widget_wrapper", d.className = "error_widget " + c.className, d.innerHTML = c.text.join("<br>"), d.appendChild(i.createElement("div"));
      var g = function (e, t, n) {
        if (0 === t && ("esc" === n || "return" === n)) return f.destroy(), {
          command: "null"
        };
      };
      f.destroy = function () {
        e.$mouseHandler.isMousePressed || (e.keyBinding.removeKeyboardHandler(g), n.widgetManager.removeLineWidget(f), e.off("changeSelection", f.destroy), e.off("changeSession", f.destroy), e.off("mouseup", f.destroy), e.off("change", f.destroy));
      }, e.keyBinding.addKeyboardHandler(g), e.on("changeSelection", f.destroy), e.on("changeSession", f.destroy), e.on("mouseup", f.destroy), e.on("change", f.destroy), e.session.widgetManager.addLineWidget(f), f.el.onmousedown = e.focus.bind(e), e.renderer.scrollCursorIntoView(null, .5, {
        bottom: f.el.offsetHeight
      });
    }, i.importCssString("\n    .error_widget_wrapper {\n        background: inherit;\n        color: inherit;\n        border:none\n    }\n    .error_widget {\n        border-top: solid 2px;\n        border-bottom: solid 2px;\n        margin: 5px 0;\n        padding: 10px 40px;\n        white-space: pre-wrap;\n    }\n    .error_widget.ace_error, .error_widget_arrow.ace_error{\n        border-color: #ff5a5a\n    }\n    .error_widget.ace_warning, .error_widget_arrow.ace_warning{\n        border-color: #F1D817\n    }\n    .error_widget.ace_info, .error_widget_arrow.ace_info{\n        border-color: #5a5a5a\n    }\n    .error_widget.ace_ok, .error_widget_arrow.ace_ok{\n        border-color: #5aaa5a\n    }\n    .error_widget_arrow {\n        position: absolute;\n        border: solid 5px;\n        border-top-color: transparent!important;\n        border-right-color: transparent!important;\n        border-left-color: transparent!important;\n        top: -5px;\n    }\n", "error_marker.css", !1);
  }), ace.define("ace/ace", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/range", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/multi_select", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/ext/error_marker", "ace/config", "ace/loader_build"], function (e, t, n) {
    "use strict";

    e("./loader_build")(t);
    var r = e("./lib/dom"),
      i = e("./lib/event"),
      o = e("./range").Range,
      a = e("./editor").Editor,
      s = e("./edit_session").EditSession,
      l = e("./undomanager").UndoManager,
      c = e("./virtual_renderer").VirtualRenderer;
    e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./multi_select"), e("./mode/folding/fold_mode"), e("./theme/textmate"), e("./ext/error_marker"), t.config = e("./config"), t.edit = function (e, n) {
      if ("string" == typeof e) {
        var o = e;
        if (e = document.getElementById(o), !e) throw new Error("ace.edit can't find div #" + o);
      }
      if (e && e.env && e.env.editor instanceof a) return e.env.editor;
      var s = "";
      if (e && /input|textarea/i.test(e.tagName)) {
        var l = e;
        s = l.value, e = r.createElement("pre"), l.parentNode.replaceChild(e, l);
      } else e && (s = e.textContent, e.innerHTML = "");
      var u = t.createEditSession(s),
        h = new a(new c(e), u, n),
        f = {
          document: u,
          editor: h,
          onResize: h.resize.bind(h, null)
        };
      return l && (f.textarea = l), i.addListener(window, "resize", f.onResize), h.on("destroy", function () {
        i.removeListener(window, "resize", f.onResize), f.editor.container.env = null;
      }), h.container.env = h.env = f, h;
    }, t.createEditSession = function (e, t) {
      var n = new s(e, t);
      return n.setUndoManager(new l()), n;
    }, t.Range = o, t.Editor = a, t.EditSession = s, t.UndoManager = l, t.VirtualRenderer = c, t.version = t.config.version;
  }), function () {
    ace.require(["ace/ace"], function (t) {
      for (var n in t && (t.config.init(!0), t.define = ace.define), window.ace || (window.ace = t), t) t.hasOwnProperty(n) && (window.ace[n] = t[n]);
      window.ace["default"] = window.ace, e && (e.exports = window.ace);
    });
  }();
}).call(this, require("./59755469.js")(legacyModule));
