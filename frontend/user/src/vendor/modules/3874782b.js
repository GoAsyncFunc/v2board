let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./6a6f3659.js"),
  o = interopDefault(r),
  i = require("./59454956.js"),
  a = interopDefault(i),
  s = require("./51624c5a.js"),
  c = interopDefault(s),
  u = require("./69436335.js"),
  l = interopDefault(u),
  f = require("./56376f43.js"),
  p = interopDefault(f),
  d = require("./46597733.js"),
  h = interopDefault(d),
  m = require("./6d526730.js"),
  v = interopDefault(m),
  y = require("./71317449.js"),
  g = interopDefault(y),
  b = require("./31377839.js"),
  w = interopDefault(b),
  x = require("./69386934.js"),
  O = interopDefault(x),
  E = require("./4d466a32.js"),
  _ = require("./32475336.js"),
  k = require("./54535951.js"),
  S = interopDefault(k),
  C = function (e) {
    function t() {
      var e, n, r, o;
      l()(this, t);
      for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
      return r = h()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.close = function (e) {
        e && e.stopPropagation(), r.clearCloseTimer(), r.props.onClose();
      }, r.startCloseTimer = function () {
        r.props.duration && (r.closeTimer = setTimeout(function () {
          r.close();
        }, 1e3 * r.props.duration));
      }, r.clearCloseTimer = function () {
        r.closeTimer && (clearTimeout(r.closeTimer), r.closeTimer = null);
      }, o = n, h()(r, o);
    }
    return v()(t, e), p()(t, [{
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
        return g.a.createElement("div", {
          className: S()(r),
          style: t.style,
          onMouseEnter: this.clearCloseTimer,
          onMouseLeave: this.startCloseTimer,
          onClick: t.onClick
        }, g.a.createElement("div", {
          className: n + "-content"
        }, t.children), t.closable ? g.a.createElement("a", {
          tabIndex: "0",
          onClick: this.close,
          className: n + "-close"
        }, t.closeIcon || g.a.createElement("span", {
          className: n + "-close-x"
        })) : null);
      }
    }]), t;
  }(y["Component"]);
C.propTypes = {
  duration: w.a.number,
  onClose: w.a.func,
  children: w.a.any,
  update: w.a.bool,
  closeIcon: w.a.node
}, C.defaultProps = {
  onEnd: function () {},
  onClose: function () {},
  duration: 1.5,
  style: {
    right: "50%"
  }
};
var j = C,
  P = 0,
  T = Date.now();
function L() {
  return "rcNotification_" + T + "_" + P++;
}
var N = function (e) {
  function t() {
    var e, n, r, o;
    l()(this, t);
    for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
    return r = h()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.state = {
      notices: []
    }, r.add = function (e) {
      var t = e.key = e.key || L(),
        n = r.props.maxCount;
      r.setState(function (r) {
        var o = r.notices,
          i = o.map(function (e) {
            return e.key;
          }).indexOf(t),
          a = o.concat();
        return -1 !== i ? a.splice(i, 1, e) : (n && o.length >= n && (e.updateKey = a[0].updateKey || a[0].key, a.shift()), a.push(e)), {
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
    }, o = n, h()(r, o);
  }
  return v()(t, e), p()(t, [{
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
        o = r.map(function (e, o) {
          var i = Boolean(o === r.length - 1 && e.updateKey),
            a = e.updateKey ? e.updateKey : e.key,
            s = Object(_["a"])(t.remove.bind(t, e.key), e.onClose);
          return g.a.createElement(j, c()({
            prefixCls: n.prefixCls
          }, e, {
            key: a,
            update: i,
            onClose: s,
            onClick: e.onClick,
            closeIcon: n.closeIcon
          }), e.content);
        }),
        i = (e = {}, a()(e, n.prefixCls, 1), a()(e, n.className, !!n.className), e);
      return g.a.createElement("div", {
        className: S()(i),
        style: n.style
      }, g.a.createElement(E["a"], {
        transitionName: this.getTransitionName()
      }, o));
    }
  }]), t;
}(y["Component"]);
N.propTypes = {
  prefixCls: w.a.string,
  transitionName: w.a.string,
  animation: w.a.oneOfType([w.a.string, w.a.object]),
  style: w.a.object,
  maxCount: w.a.number,
  closeIcon: w.a.node
}, N.defaultProps = {
  prefixCls: "rc-notification",
  animation: "fade",
  style: {
    top: 65,
    left: "50%"
  }
}, N.newInstance = function (e, t) {
  var n = e || {},
    r = n.getContainer,
    i = o()(n, ["getContainer"]),
    a = document.createElement("div");
  if (r) {
    var s = r();
    s.appendChild(a);
  } else document.body.appendChild(a);
  var u = !1;
  function l(e) {
    u || (u = !0, t({
      notice: function (t) {
        e.add(t);
      },
      removeNotice: function (t) {
        e.remove(t);
      },
      component: e,
      destroy: function () {
        O.a.unmountComponentAtNode(a), a.parentNode.removeChild(a);
      }
    }));
  }
  O.a.render(g.a.createElement(N, c()({}, i, {
    ref: l
  })), a);
};
var M = N;
legacyExports["a"] = M;
