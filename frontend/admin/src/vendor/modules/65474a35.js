let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./reactRuntime.js"),
  a = require("./69436335.js"),
  s = interopDefault(a),
  l = require("./46597733.js"),
  c = interopDefault(l),
  u = require("./6d526730.js"),
  h = interopDefault(u),
  f = require("./reactDomRuntime.js"),
  d = require("./34496c57.js"),
  p = require("./6c346159.js"),
  m = require("./4d466a32.js"),
  g = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var i = 0;
      for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && (n[r[i]] = e[r[i]]);
    }
    return n;
  },
  v = function (e) {
    function t() {
      return s()(this, t), c()(this, e.apply(this, arguments));
    }
    return h()(t, e), t.prototype.shouldComponentUpdate = function (e) {
      return !!e.forceRender || !!e.hiddenClassName || !!e.visible;
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.className,
        n = e.hiddenClassName,
        r = e.visible,
        a = (e.forceRender, g(e, ["className", "hiddenClassName", "visible", "forceRender"])),
        s = t;
      return n && !r && (s += " " + n), o["createElement"]("div", i()({}, a, {
        className: s
      }));
    }, t;
  }(o["Component"]),
  y = v,
  b = 0;
function w(e, t) {
  var n = e["page" + (t ? "Y" : "X") + "Offset"],
    r = "scroll" + (t ? "Top" : "Left");
  if ("number" !== typeof n) {
    var i = e.document;
    n = i.documentElement[r], "number" !== typeof n && (n = i.body[r]);
  }
  return n;
}
function x(e, t) {
  var n = e.style;
  ["Webkit", "Moz", "Ms", "ms"].forEach(function (e) {
    n[e + "TransformOrigin"] = t;
  }), n["transformOrigin"] = t;
}
function _(e) {
  var t = e.getBoundingClientRect(),
    n = {
      left: t.left,
      top: t.top
    },
    r = e.ownerDocument,
    i = r.defaultView || r.parentWindow;
  return n.left += w(i), n.top += w(i, !0), n;
}
var E = function (e) {
    function t(n) {
      s()(this, t);
      var r = c()(this, e.call(this, n));
      return r.inTransition = !1, r.onAnimateLeave = function () {
        var e = r.props.afterClose;
        r.wrap && (r.wrap.style.display = "none"), r.inTransition = !1, r.switchScrollingEffect(), e && e();
      }, r.onDialogMouseDown = function () {
        r.dialogMouseDown = !0;
      }, r.onMaskMouseUp = function () {
        r.dialogMouseDown && (r.timeoutId = setTimeout(function () {
          r.dialogMouseDown = !1;
        }, 0));
      }, r.onMaskClick = function (e) {
        Date.now() - r.openTime < 300 || e.target !== e.currentTarget || r.dialogMouseDown || r.close(e);
      }, r.onKeyDown = function (e) {
        var t = r.props;
        if (t.keyboard && e.keyCode === d["a"].ESC) return e.stopPropagation(), void r.close(e);
        if (t.visible && e.keyCode === d["a"].TAB) {
          var n = document.activeElement,
            i = r.sentinelStart;
          e.shiftKey ? n === i && r.sentinelEnd.focus() : n === r.sentinelEnd && i.focus();
        }
      }, r.getDialogElement = function () {
        var e = r.props,
          t = e.closable,
          n = e.prefixCls,
          a = {};
        void 0 !== e.width && (a.width = e.width), void 0 !== e.height && (a.height = e.height);
        var s = void 0;
        e.footer && (s = o["createElement"]("div", {
          className: n + "-footer",
          ref: r.saveRef("footer")
        }, e.footer));
        var l = void 0;
        e.title && (l = o["createElement"]("div", {
          className: n + "-header",
          ref: r.saveRef("header")
        }, o["createElement"]("div", {
          className: n + "-title",
          id: r.titleId
        }, e.title)));
        var c = void 0;
        t && (c = o["createElement"]("button", {
          type: "button",
          onClick: r.close,
          "aria-label": "Close",
          className: n + "-close"
        }, e.closeIcon || o["createElement"]("span", {
          className: n + "-close-x"
        })));
        var u = i()({}, e.style, a),
          h = {
            width: 0,
            height: 0,
            overflow: "hidden",
            outline: "none"
          },
          f = r.getTransitionName(),
          d = o["createElement"](y, {
            key: "dialog-element",
            role: "document",
            ref: r.saveRef("dialog"),
            style: u,
            className: n + " " + (e.className || ""),
            visible: e.visible,
            forceRender: e.forceRender,
            onMouseDown: r.onDialogMouseDown
          }, o["createElement"]("div", {
            tabIndex: 0,
            ref: r.saveRef("sentinelStart"),
            style: h,
            "aria-hidden": "true"
          }), o["createElement"]("div", {
            className: n + "-content"
          }, c, l, o["createElement"]("div", i()({
            className: n + "-body",
            style: e.bodyStyle,
            ref: r.saveRef("body")
          }, e.bodyProps), e.children), s), o["createElement"]("div", {
            tabIndex: 0,
            ref: r.saveRef("sentinelEnd"),
            style: h,
            "aria-hidden": "true"
          }));
        return o["createElement"](m["a"], {
          key: "dialog",
          showProp: "visible",
          onLeave: r.onAnimateLeave,
          transitionName: f,
          component: "",
          transitionAppear: !0
        }, e.visible || !e.destroyOnClose ? d : null);
      }, r.getZIndexStyle = function () {
        var e = {},
          t = r.props;
        return void 0 !== t.zIndex && (e.zIndex = t.zIndex), e;
      }, r.getWrapStyle = function () {
        return i()({}, r.getZIndexStyle(), r.props.wrapStyle);
      }, r.getMaskStyle = function () {
        return i()({}, r.getZIndexStyle(), r.props.maskStyle);
      }, r.getMaskElement = function () {
        var e = r.props,
          t = void 0;
        if (e.mask) {
          var n = r.getMaskTransitionName();
          t = o["createElement"](y, i()({
            style: r.getMaskStyle(),
            key: "mask",
            className: e.prefixCls + "-mask",
            hiddenClassName: e.prefixCls + "-mask-hidden",
            visible: e.visible
          }, e.maskProps)), n && (t = o["createElement"](m["a"], {
            key: "mask",
            showProp: "visible",
            transitionAppear: !0,
            component: "",
            transitionName: n
          }, t));
        }
        return t;
      }, r.getMaskTransitionName = function () {
        var e = r.props,
          t = e.maskTransitionName,
          n = e.maskAnimation;
        return !t && n && (t = e.prefixCls + "-" + n), t;
      }, r.getTransitionName = function () {
        var e = r.props,
          t = e.transitionName,
          n = e.animation;
        return !t && n && (t = e.prefixCls + "-" + n), t;
      }, r.close = function (e) {
        var t = r.props.onClose;
        t && t(e);
      }, r.saveRef = function (e) {
        return function (t) {
          r[e] = t;
        };
      }, r.titleId = "rcDialogTitle" + b++, r.switchScrollingEffect = n.switchScrollingEffect || function () {}, r;
    }
    return h()(t, e), t.prototype.componentDidMount = function () {
      this.componentDidUpdate({}), (this.props.forceRender || !1 === this.props.getContainer && !this.props.visible) && this.wrap && (this.wrap.style.display = "none");
    }, t.prototype.componentDidUpdate = function (e) {
      var t = this.props,
        n = t.visible,
        r = t.mask,
        i = t.focusTriggerAfterClose,
        o = this.props.mousePosition;
      if (n) {
        if (!e.visible) {
          this.openTime = Date.now(), this.switchScrollingEffect(), this.tryFocus();
          var a = f["findDOMNode"](this.dialog);
          if (o) {
            var s = _(a);
            x(a, o.x - s.left + "px " + (o.y - s.top) + "px");
          } else x(a, "");
        }
      } else if (e.visible && (this.inTransition = !0, r && this.lastOutSideFocusNode && i)) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }, t.prototype.componentWillUnmount = function () {
      var e = this.props,
        t = e.visible,
        n = e.getOpenCount;
      !t && !this.inTransition || n() || this.switchScrollingEffect(), clearTimeout(this.timeoutId);
    }, t.prototype.tryFocus = function () {
      Object(p["a"])(this.wrap, document.activeElement) || (this.lastOutSideFocusNode = document.activeElement, this.sentinelStart.focus());
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.maskClosable,
        r = this.getWrapStyle();
      return e.visible && (r.display = null), o["createElement"]("div", {
        className: t + "-root"
      }, this.getMaskElement(), o["createElement"]("div", i()({
        tabIndex: -1,
        onKeyDown: this.onKeyDown,
        className: t + "-wrap " + (e.wrapClassName || ""),
        ref: this.saveRef("wrap"),
        onClick: n ? this.onMaskClick : null,
        onMouseUp: n ? this.onMaskMouseUp : null,
        role: "dialog",
        "aria-labelledby": e.title ? this.titleId : null,
        style: r
      }, e.wrapProps), this.getDialogElement()));
    }, t;
  }(o["Component"]),
  S = E;
E.defaultProps = {
  className: "",
  mask: !0,
  visible: !1,
  keyboard: !0,
  closable: !0,
  maskClosable: !0,
  destroyOnClose: !1,
  prefixCls: "rc-dialog",
  focusTriggerAfterClose: !0
};
var k = require("./31572f39.js");
legacyExports["a"] = function (e) {
  var t = e.visible,
    n = e.getContainer,
    r = e.forceRender;
  return !1 === n ? o["createElement"](S, i()({}, e, {
    getOpenCount: function () {
      return 2;
    }
  })) : o["createElement"](k["a"], {
    visible: t,
    forceRender: r,
    getContainer: n
  }, function (t) {
    return o["createElement"](S, i()({}, e, t));
  });
};
