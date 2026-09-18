let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return H;
});
var n,
  r = require("./reactRuntime.js"),
  o = require("./reactDomRuntime.js"),
  l = require("./cssAnimationEvents.js"),
  a = require("./requestAnimationFrame.js"),
  i = require("./48383455.js");
function u(e) {
  "@babel/helpers - typeof";

  return u = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, u(e);
}
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function f(e, t, c) {
  return t && h(e.prototype, t), c && h(e, c), e;
}
function v(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && p(e, t);
}
function p(e, t) {
  return p = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, p(e, t);
}
function m(e) {
  var t = y();
  return function () {
    var c,
      n = b(e);
    if (t) {
      var r = b(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return d(this, c);
  };
}
function d(e, t) {
  return !t || "object" !== u(t) && "function" !== typeof t ? z(e) : t;
}
function z(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function b(e) {
  return b = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, b(e);
}
function M(e) {
  return !e || null === e.offsetParent;
}
function g(e) {
  var t = (e || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  return !(t && t[1] && t[2] && t[3]) || !(t[1] === t[2] && t[2] === t[3]);
}
var H = function (e) {
  v(c, e);
  var t = m(c);
  function c() {
    var e;
    return s(this, c), e = t.apply(this, arguments), e.animationStart = !1, e.destroy = !1, e.onClick = function (t, c) {
      if (!(!t || M(t) || t.className.indexOf("-leave") >= 0)) {
        var r = e.props.insertExtraNode;
        e.extraNode = document.createElement("div");
        var o = z(e),
          a = o.extraNode;
        a.className = "ant-click-animating-node";
        var i = e.getAttributeName();
        t.setAttribute(i, "true"), n = n || document.createElement("style"), c && "#ffffff" !== c && "rgb(255, 255, 255)" !== c && g(c) && !/rgba\(\d*, \d*, \d*, 0\)/.test(c) && "transparent" !== c && (e.csp && e.csp.nonce && (n.nonce = e.csp.nonce), a.style.borderColor = c, n.innerHTML = "\n      [ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {\n        --antd-wave-shadow-color: ".concat(c, ";\n      }"), document.body.contains(n) || document.body.appendChild(n)), r && t.appendChild(a), l.addStartEventListener(t, e.onTransitionStart), l.addEndEventListener(t, e.onTransitionEnd);
      }
    }, e.onTransitionStart = function (t) {
      if (!e.destroy) {
        var c = Object(o["findDOMNode"])(z(e));
        t && t.target === c && (e.animationStart || e.resetEffect(c));
      }
    }, e.onTransitionEnd = function (t) {
      t && "fadeEffect" === t.animationName && e.resetEffect(t.target);
    }, e.bindAnimationEvent = function (t) {
      if (t && t.getAttribute && !t.getAttribute("disabled") && !(t.className.indexOf("disabled") >= 0)) {
        var c = function (c) {
          if ("INPUT" !== c.target.tagName && !M(c.target)) {
            e.resetEffect(t);
            var n = getComputedStyle(t).getPropertyValue("border-top-color") || getComputedStyle(t).getPropertyValue("border-color") || getComputedStyle(t).getPropertyValue("background-color");
            e.clickWaveTimeoutId = window.setTimeout(function () {
              return e.onClick(t, n);
            }, 0), a["a"].cancel(e.animationStartId), e.animationStart = !0, e.animationStartId = Object(a["a"])(function () {
              e.animationStart = !1;
            }, 10);
          }
        };
        return t.addEventListener("click", c, !0), {
          cancel: function () {
            t.removeEventListener("click", c, !0);
          }
        };
      }
    }, e.renderWave = function (t) {
      var c = t.csp,
        n = e.props.children;
      return e.csp = c, n;
    }, e;
  }
  return f(c, [{
    key: "componentDidMount",
    value: function () {
      var e = Object(o["findDOMNode"])(this);
      e && 1 === e.nodeType && (this.instance = this.bindAnimationEvent(e));
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.instance && this.instance.cancel(), this.clickWaveTimeoutId && clearTimeout(this.clickWaveTimeoutId), this.destroy = !0;
    }
  }, {
    key: "getAttributeName",
    value: function () {
      var e = this.props.insertExtraNode;
      return e ? "ant-click-animating" : "ant-click-animating-without-extra-node";
    }
  }, {
    key: "resetEffect",
    value: function (e) {
      if (e && e !== this.extraNode && e instanceof Element) {
        var t = this.props.insertExtraNode,
          c = this.getAttributeName();
        e.setAttribute(c, "false"), n && (n.innerHTML = ""), t && this.extraNode && e.contains(this.extraNode) && e.removeChild(this.extraNode), l.removeStartEventListener(e, this.onTransitionStart), l.removeEndEventListener(e, this.onTransitionEnd);
      }
    }
  }, {
    key: "render",
    value: function () {
      return r["createElement"](i["a"], null, this.renderWave);
    }
  }]), c;
}(r["Component"]);
