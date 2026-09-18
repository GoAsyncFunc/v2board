let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  o = interopDefault(r),
  i = require("./reactRuntime.js"),
  a = require("./69436335.js"),
  s = interopDefault(a),
  c = require("./46597733.js"),
  u = interopDefault(c),
  l = require("./6d526730.js"),
  f = interopDefault(l),
  p = require("./69386934.js"),
  d = require("./34496c57.js"),
  h = require("./6c346159.js"),
  m = require("./4d466a32.js"),
  v = function (e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var o = 0;
      for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && (n[r[o]] = e[r[o]]);
    }
    return n;
  },
  y = function (e) {
    function t() {
      return s()(this, t), u()(this, e.apply(this, arguments));
    }
    return f()(t, e), t.prototype.shouldComponentUpdate = function (e) {
      return !!e.forceRender || !!e.hiddenClassName || !!e.visible;
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.className,
        n = e.hiddenClassName,
        r = e.visible,
        a = (e.forceRender, v(e, ["className", "hiddenClassName", "visible", "forceRender"])),
        s = t;
      return n && !r && (s += " " + n), i["createElement"]("div", o()({}, a, {
        className: s
      }));
    }, t;
  }(i["Component"]),
  g = y,
  b = 0;
function w(e, t) {
  var n = e["page" + (t ? "Y" : "X") + "Offset"],
    r = "scroll" + (t ? "Top" : "Left");
  if ("number" !== typeof n) {
    var o = e.document;
    n = o.documentElement[r], "number" !== typeof n && (n = o.body[r]);
  }
  return n;
}
function x(e, t) {
  var n = e.style;
  ["Webkit", "Moz", "Ms", "ms"].forEach(function (e) {
    n[e + "TransformOrigin"] = t;
  }), n["transformOrigin"] = t;
}
function O(e) {
  var t = e.getBoundingClientRect(),
    n = {
      left: t.left,
      top: t.top
    },
    r = e.ownerDocument,
    o = r.defaultView || r.parentWindow;
  return n.left += w(o), n.top += w(o, !0), n;
}
var E = function (e) {
    function t(n) {
      s()(this, t);
      var r = u()(this, e.call(this, n));
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
            o = r.sentinelStart;
          e.shiftKey ? n === o && r.sentinelEnd.focus() : n === r.sentinelEnd && o.focus();
        }
      }, r.getDialogElement = function () {
        var e = r.props,
          t = e.closable,
          n = e.prefixCls,
          a = {};
        void 0 !== e.width && (a.width = e.width), void 0 !== e.height && (a.height = e.height);
        var s = void 0;
        e.footer && (s = i["createElement"]("div", {
          className: n + "-footer",
          ref: r.saveRef("footer")
        }, e.footer));
        var c = void 0;
        e.title && (c = i["createElement"]("div", {
          className: n + "-header",
          ref: r.saveRef("header")
        }, i["createElement"]("div", {
          className: n + "-title",
          id: r.titleId
        }, e.title)));
        var u = void 0;
        t && (u = i["createElement"]("button", {
          type: "button",
          onClick: r.close,
          "aria-label": "Close",
          className: n + "-close"
        }, e.closeIcon || i["createElement"]("span", {
          className: n + "-close-x"
        })));
        var l = o()({}, e.style, a),
          f = {
            width: 0,
            height: 0,
            overflow: "hidden",
            outline: "none"
          },
          p = r.getTransitionName(),
          d = i["createElement"](g, {
            key: "dialog-element",
            role: "document",
            ref: r.saveRef("dialog"),
            style: l,
            className: n + " " + (e.className || ""),
            visible: e.visible,
            forceRender: e.forceRender,
            onMouseDown: r.onDialogMouseDown
          }, i["createElement"]("div", {
            tabIndex: 0,
            ref: r.saveRef("sentinelStart"),
            style: f,
            "aria-hidden": "true"
          }), i["createElement"]("div", {
            className: n + "-content"
          }, u, c, i["createElement"]("div", o()({
            className: n + "-body",
            style: e.bodyStyle,
            ref: r.saveRef("body")
          }, e.bodyProps), e.children), s), i["createElement"]("div", {
            tabIndex: 0,
            ref: r.saveRef("sentinelEnd"),
            style: f,
            "aria-hidden": "true"
          }));
        return i["createElement"](m["a"], {
          key: "dialog",
          showProp: "visible",
          onLeave: r.onAnimateLeave,
          transitionName: p,
          component: "",
          transitionAppear: !0
        }, e.visible || !e.destroyOnClose ? d : null);
      }, r.getZIndexStyle = function () {
        var e = {},
          t = r.props;
        return void 0 !== t.zIndex && (e.zIndex = t.zIndex), e;
      }, r.getWrapStyle = function () {
        return o()({}, r.getZIndexStyle(), r.props.wrapStyle);
      }, r.getMaskStyle = function () {
        return o()({}, r.getZIndexStyle(), r.props.maskStyle);
      }, r.getMaskElement = function () {
        var e = r.props,
          t = void 0;
        if (e.mask) {
          var n = r.getMaskTransitionName();
          t = i["createElement"](g, o()({
            style: r.getMaskStyle(),
            key: "mask",
            className: e.prefixCls + "-mask",
            hiddenClassName: e.prefixCls + "-mask-hidden",
            visible: e.visible
          }, e.maskProps)), n && (t = i["createElement"](m["a"], {
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
    return f()(t, e), t.prototype.componentDidMount = function () {
      this.componentDidUpdate({}), (this.props.forceRender || !1 === this.props.getContainer && !this.props.visible) && this.wrap && (this.wrap.style.display = "none");
    }, t.prototype.componentDidUpdate = function (e) {
      var t = this.props,
        n = t.visible,
        r = t.mask,
        o = t.focusTriggerAfterClose,
        i = this.props.mousePosition;
      if (n) {
        if (!e.visible) {
          this.openTime = Date.now(), this.switchScrollingEffect(), this.tryFocus();
          var a = p["findDOMNode"](this.dialog);
          if (i) {
            var s = O(a);
            x(a, i.x - s.left + "px " + (i.y - s.top) + "px");
          } else x(a, "");
        }
      } else if (e.visible && (this.inTransition = !0, r && this.lastOutSideFocusNode && o)) {
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
      Object(h["a"])(this.wrap, document.activeElement) || (this.lastOutSideFocusNode = document.activeElement, this.sentinelStart.focus());
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.maskClosable,
        r = this.getWrapStyle();
      return e.visible && (r.display = null), i["createElement"]("div", {
        className: t + "-root"
      }, this.getMaskElement(), i["createElement"]("div", o()({
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
  }(i["Component"]),
  _ = E;
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
  return !1 === n ? i["createElement"](_, o()({}, e, {
    getOpenCount: function () {
      return 2;
    }
  })) : i["createElement"](k["a"], {
    visible: t,
    forceRender: r,
    getContainer: n
  }, function (t) {
    return i["createElement"](_, o()({}, e, t));
  });
};
