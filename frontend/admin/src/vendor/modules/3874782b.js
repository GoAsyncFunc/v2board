let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./6a6f3659.js"),
  i = interopDefault(r),
  o = require("./59454956.js"),
  a = interopDefault(o),
  s = require("./51624c5a.js"),
  l = interopDefault(s),
  c = require("./69436335.js"),
  u = interopDefault(c),
  h = require("./56376f43.js"),
  f = interopDefault(h),
  d = require("./46597733.js"),
  p = interopDefault(d),
  m = require("./6d526730.js"),
  g = interopDefault(m),
  v = require("./reactRuntime.js"),
  y = interopDefault(v),
  b = require("./propTypesRuntime.js"),
  w = interopDefault(b),
  x = require("./69386934.js"),
  _ = interopDefault(x),
  E = require("./4d466a32.js"),
  S = require("./32475336.js"),
  k = require("./classNames.js"),
  C = interopDefault(k),
  O = function (e) {
    function t() {
      var e, n, r, i;
      u()(this, t);
      for (var o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
      return r = p()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.close = function (e) {
        e && e.stopPropagation(), r.clearCloseTimer(), r.props.onClose();
      }, r.startCloseTimer = function () {
        r.props.duration && (r.closeTimer = setTimeout(function () {
          r.close();
        }, 1e3 * r.props.duration));
      }, r.clearCloseTimer = function () {
        r.closeTimer && (clearTimeout(r.closeTimer), r.closeTimer = null);
      }, i = n, p()(r, i);
    }
    return g()(t, e), f()(t, [{
      key: "componentDidMount",
      value: function () {
        this.startCloseTimer();
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        (this.props.duration !== e.duration || this.props.update) && this.restartCloseTimer();
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.clearCloseTimer();
      }
    }, {
      key: "restartCloseTimer",
      value: function () {
        this.clearCloseTimer(), this.startCloseTimer();
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this.props,
          n = t.prefixCls + "-notice",
          r = (e = {}, a()(e, "" + n, 1), a()(e, n + "-closable", t.closable), a()(e, t.className, !!t.className), e);
        return y.a.createElement("div", {
          className: C()(r),
          style: t.style,
          onMouseEnter: this.clearCloseTimer,
          onMouseLeave: this.startCloseTimer,
          onClick: t.onClick
        }, y.a.createElement("div", {
          className: n + "-content"
        }, t.children), t.closable ? y.a.createElement("a", {
          tabIndex: "0",
          onClick: this.close,
          className: n + "-close"
        }, t.closeIcon || y.a.createElement("span", {
          className: n + "-close-x"
        })) : null);
      }
    }]), t;
  }(v["Component"]);
O.propTypes = {
  duration: w.a.number,
  onClose: w.a.func,
  children: w.a.any,
  update: w.a.bool,
  closeIcon: w.a.node
}, O.defaultProps = {
  onEnd: function () {},
  onClose: function () {},
  duration: 1.5,
  style: {
    right: "50%"
  }
};
var T = O,
  L = 0,
  A = Date.now();
function P() {
  return "rcNotification_" + A + "_" + L++;
}
var j = function (e) {
  function t() {
    var e, n, r, i;
    u()(this, t);
    for (var o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
    return r = p()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.state = {
      notices: []
    }, r.add = function (e) {
      var t = e.key = e.key || P(),
        n = r.props.maxCount;
      r.setState(function (r) {
        var i = r.notices,
          o = i.map(function (e) {
            return e.key;
          }).indexOf(t),
          a = i.concat();
        return -1 !== o ? a.splice(o, 1, e) : (n && i.length >= n && (e.updateKey = a[0].updateKey || a[0].key, a.shift()), a.push(e)), {
          notices: a
        };
      });
    }, r.remove = function (e) {
      r.setState(function (t) {
        return {
          notices: t.notices.filter(function (t) {
            return t.key !== e;
          })
        };
      });
    }, i = n, p()(r, i);
  }
  return g()(t, e), f()(t, [{
    key: "getTransitionName",
    value: function () {
      var e = this.props,
        t = e.transitionName;
      return !t && e.animation && (t = e.prefixCls + "-" + e.animation), t;
    }
  }, {
    key: "render",
    value: function () {
      var e,
        t = this,
        n = this.props,
        r = this.state.notices,
        i = r.map(function (e, i) {
          var o = Boolean(i === r.length - 1 && e.updateKey),
            a = e.updateKey ? e.updateKey : e.key,
            s = Object(S["a"])(t.remove.bind(t, e.key), e.onClose);
          return y.a.createElement(T, l()({
            prefixCls: n.prefixCls
          }, e, {
            key: a,
            update: o,
            onClose: s,
            onClick: e.onClick,
            closeIcon: n.closeIcon
          }), e.content);
        }),
        o = (e = {}, a()(e, n.prefixCls, 1), a()(e, n.className, !!n.className), e);
      return y.a.createElement("div", {
        className: C()(o),
        style: n.style
      }, y.a.createElement(E["a"], {
        transitionName: this.getTransitionName()
      }, i));
    }
  }]), t;
}(v["Component"]);
j.propTypes = {
  prefixCls: w.a.string,
  transitionName: w.a.string,
  animation: w.a.oneOfType([w.a.string, w.a.object]),
  style: w.a.object,
  maxCount: w.a.number,
  closeIcon: w.a.node
}, j.defaultProps = {
  prefixCls: "rc-notification",
  animation: "fade",
  style: {
    top: 65,
    left: "50%"
  }
}, j.newInstance = function (e, t) {
  var n = e || {},
    r = n.getContainer,
    o = i()(n, ["getContainer"]),
    a = document.createElement("div");
  if (r) {
    var s = r();
    s.appendChild(a);
  } else document.body.appendChild(a);
  var c = !1;
  function u(e) {
    c || (c = !0, t({
      notice: function (t) {
        e.add(t);
      },
      removeNotice: function (t) {
        e.remove(t);
      },
      component: e,
      destroy: function () {
        _.a.unmountComponentAtNode(a), a.parentNode.removeChild(a);
      }
    }));
  }
  _.a.render(y.a.createElement(j, l()({}, o, {
    ref: u
  })), a);
};
var M = j;
legacyExports["a"] = M;
