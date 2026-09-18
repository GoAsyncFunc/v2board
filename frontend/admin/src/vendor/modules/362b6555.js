let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./59454956.js"),
  i = interopDefault(r),
  o = require("./51624c5a.js"),
  a = interopDefault(o),
  s = require("./classCallCheck.js"),
  l = interopDefault(s),
  c = require("./56376f43.js"),
  u = interopDefault(c),
  h = require("./46597733.js"),
  f = interopDefault(h),
  d = require("./6d526730.js"),
  p = interopDefault(d),
  m = require("./reactRuntime.js"),
  g = interopDefault(m),
  v = require("./classNames.js"),
  y = interopDefault(v),
  b = require("./propTypesRuntime.js"),
  w = interopDefault(b),
  x = function (e) {
    var t,
      n = e.rootPrefixCls + "-item",
      r = y()(n, n + "-" + e.page, (t = {}, i()(t, n + "-active", e.active), i()(t, e.className, !!e.className), i()(t, n + "-disabled", !e.page), t)),
      o = function () {
        e.onClick(e.page);
      },
      a = function (t) {
        e.onKeyPress(t, e.onClick, e.page);
      };
    return g.a.createElement("li", {
      title: e.showTitle ? e.page : null,
      className: r,
      onClick: o,
      onKeyPress: a,
      tabIndex: "0"
    }, e.itemRender(e.page, "page", g.a.createElement("a", null, e.page)));
  };
x.propTypes = {
  page: w.a.number,
  active: w.a.bool,
  last: w.a.bool,
  locale: w.a.object,
  className: w.a.string,
  showTitle: w.a.bool,
  rootPrefixCls: w.a.string,
  onClick: w.a.func,
  onKeyPress: w.a.func,
  itemRender: w.a.func
};
var _ = x,
  E = {
    ZERO: 48,
    NINE: 57,
    NUMPAD_ZERO: 96,
    NUMPAD_NINE: 105,
    BACKSPACE: 8,
    DELETE: 46,
    ENTER: 13,
    ARROW_UP: 38,
    ARROW_DOWN: 40
  },
  S = function (e) {
    function t() {
      var e, n, r, i;
      l()(this, t);
      for (var o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
      return r = f()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.state = {
        goInputText: ""
      }, r.buildOptionText = function (e) {
        return e + " " + r.props.locale.items_per_page;
      }, r.changeSize = function (e) {
        r.props.changeSize(Number(e));
      }, r.handleChange = function (e) {
        r.setState({
          goInputText: e.target.value
        });
      }, r.handleBlur = function (e) {
        var t = r.props,
          n = t.goButton,
          i = t.quickGo,
          o = t.rootPrefixCls;
        n || e.relatedTarget && (e.relatedTarget.className.indexOf(o + "-prev") >= 0 || e.relatedTarget.className.indexOf(o + "-next") >= 0) || i(r.getValidValue());
      }, r.go = function (e) {
        var t = r.state.goInputText;
        "" !== t && (e.keyCode !== E.ENTER && "click" !== e.type || (r.setState({
          goInputText: ""
        }), r.props.quickGo(r.getValidValue())));
      }, i = n, f()(r, i);
    }
    return p()(t, e), u()(t, [{
      key: "getValidValue",
      value: function () {
        var e = this.state,
          t = e.goInputText,
          n = e.current;
        return !t || isNaN(t) ? n : Number(t);
      }
    }, {
      key: "render",
      value: function () {
        var e = this,
          t = this.props,
          n = t.pageSize,
          r = t.pageSizeOptions,
          i = t.locale,
          o = t.rootPrefixCls,
          a = t.changeSize,
          s = t.quickGo,
          l = t.goButton,
          c = t.selectComponentClass,
          u = t.buildOptionText,
          h = t.selectPrefixCls,
          f = t.disabled,
          d = this.state.goInputText,
          p = o + "-options",
          m = c,
          v = null,
          y = null,
          b = null;
        if (!a && !s) return null;
        if (a && m) {
          var w = r.map(function (t, n) {
            return g.a.createElement(m.Option, {
              key: n,
              value: t
            }, (u || e.buildOptionText)(t));
          });
          v = g.a.createElement(m, {
            disabled: f,
            prefixCls: h,
            showSearch: !1,
            className: p + "-size-changer",
            optionLabelProp: "children",
            dropdownMatchSelectWidth: !1,
            value: (n || r[0]).toString(),
            onChange: this.changeSize,
            getPopupContainer: function (e) {
              return e.parentNode;
            }
          }, w);
        }
        return s && (l && (b = "boolean" === typeof l ? g.a.createElement("button", {
          type: "button",
          onClick: this.go,
          onKeyUp: this.go,
          disabled: f
        }, i.jump_to_confirm) : g.a.createElement("span", {
          onClick: this.go,
          onKeyUp: this.go
        }, l)), y = g.a.createElement("div", {
          className: p + "-quick-jumper"
        }, i.jump_to, g.a.createElement("input", {
          disabled: f,
          type: "text",
          value: d,
          onChange: this.handleChange,
          onKeyUp: this.go,
          onBlur: this.handleBlur
        }), i.page, b)), g.a.createElement("li", {
          className: "" + p
        }, v, y);
      }
    }]), t;
  }(g.a.Component);
S.propTypes = {
  disabled: w.a.bool,
  changeSize: w.a.func,
  quickGo: w.a.func,
  selectComponentClass: w.a.func,
  current: w.a.number,
  pageSizeOptions: w.a.arrayOf(w.a.string),
  pageSize: w.a.number,
  buildOptionText: w.a.func,
  locale: w.a.object,
  rootPrefixCls: w.a.string,
  selectPrefixCls: w.a.string,
  goButton: w.a.oneOfType([w.a.bool, w.a.node])
}, S.defaultProps = {
  pageSizeOptions: ["10", "20", "30", "40"]
};
var k = S,
  C = require("./4e324b6b.js"),
  O = require("./reactLifecyclesCompat.js");
function T() {}
function L(e) {
  return "number" === typeof e && isFinite(e) && Math.floor(e) === e;
}
function A(e, t, n) {
  return n;
}
function P(e, t, n) {
  var r = e;
  return "undefined" === typeof r && (r = t.pageSize), Math.floor((n.total - 1) / r) + 1;
}
var j = function (e) {
  function t(e) {
    l()(this, t);
    var n = f()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
    M.call(n);
    var r = e.onChange !== T,
      i = "current" in e;
    i && !r && console.warn("Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.");
    var o = e.defaultCurrent;
    "current" in e && (o = e.current);
    var a = e.defaultPageSize;
    return "pageSize" in e && (a = e.pageSize), o = Math.min(o, P(a, void 0, e)), n.state = {
      current: o,
      currentInputValue: o,
      pageSize: a
    }, n;
  }
  return p()(t, e), u()(t, [{
    key: "componentDidUpdate",
    value: function (e, t) {
      var n = this.props.prefixCls;
      if (t.current !== this.state.current && this.paginationNode) {
        var r = this.paginationNode.querySelector("." + n + "-item-" + t.current);
        r && document.activeElement === r && r.blur();
      }
    }
  }, {
    key: "getValidValue",
    value: function (e) {
      var t = e.target.value,
        n = P(void 0, this.state, this.props),
        r = this.state.currentInputValue,
        i = void 0;
      return i = "" === t ? t : isNaN(Number(t)) ? r : t >= n ? n : Number(t), i;
    }
  }, {
    key: "render",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.className,
        r = e.disabled;
      if (!0 === this.props.hideOnSinglePage && this.props.total <= this.state.pageSize) return null;
      var o = this.props,
        s = o.locale,
        l = P(void 0, this.state, this.props),
        c = [],
        u = null,
        h = null,
        f = null,
        d = null,
        p = null,
        m = o.showQuickJumper && o.showQuickJumper.goButton,
        v = o.showLessItems ? 1 : 2,
        b = this.state,
        w = b.current,
        x = b.pageSize,
        E = w - 1 > 0 ? w - 1 : 0,
        S = w + 1 < l ? w + 1 : l,
        C = Object.keys(o).reduce(function (e, t) {
          return "data-" !== t.substr(0, 5) && "aria-" !== t.substr(0, 5) && "role" !== t || (e[t] = o[t]), e;
        }, {});
      if (o.simple) return m && (p = "boolean" === typeof m ? g.a.createElement("button", {
        type: "button",
        onClick: this.handleGoTO,
        onKeyUp: this.handleGoTO
      }, s.jump_to_confirm) : g.a.createElement("span", {
        onClick: this.handleGoTO,
        onKeyUp: this.handleGoTO
      }, m), p = g.a.createElement("li", {
        title: o.showTitle ? "" + s.jump_to + this.state.current + "/" + l : null,
        className: t + "-simple-pager"
      }, p)), g.a.createElement("ul", a()({
        className: t + " " + t + "-simple " + o.className,
        style: o.style,
        ref: this.savePaginationNode
      }, C), g.a.createElement("li", {
        title: o.showTitle ? s.prev_page : null,
        onClick: this.prev,
        tabIndex: this.hasPrev() ? 0 : null,
        onKeyPress: this.runIfEnterPrev,
        className: (this.hasPrev() ? "" : t + "-disabled") + " " + t + "-prev",
        "aria-disabled": !this.hasPrev()
      }, o.itemRender(E, "prev", this.getItemIcon(o.prevIcon))), g.a.createElement("li", {
        title: o.showTitle ? this.state.current + "/" + l : null,
        className: t + "-simple-pager"
      }, g.a.createElement("input", {
        type: "text",
        value: this.state.currentInputValue,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        onChange: this.handleKeyUp,
        size: "3"
      }), g.a.createElement("span", {
        className: t + "-slash"
      }, "/"), l), g.a.createElement("li", {
        title: o.showTitle ? s.next_page : null,
        onClick: this.next,
        tabIndex: this.hasPrev() ? 0 : null,
        onKeyPress: this.runIfEnterNext,
        className: (this.hasNext() ? "" : t + "-disabled") + " " + t + "-next",
        "aria-disabled": !this.hasNext()
      }, o.itemRender(S, "next", this.getItemIcon(o.nextIcon))), p);
      if (l <= 5 + 2 * v) {
        var O = {
          locale: s,
          rootPrefixCls: t,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          showTitle: o.showTitle,
          itemRender: o.itemRender
        };
        l || c.push(g.a.createElement(_, a()({}, O, {
          key: "noPager",
          page: l,
          className: t + "-disabled"
        })));
        for (var T = 1; T <= l; T++) {
          var L = this.state.current === T;
          c.push(g.a.createElement(_, a()({}, O, {
            key: T,
            page: T,
            active: L
          })));
        }
      } else {
        var A = o.showLessItems ? s.prev_3 : s.prev_5,
          j = o.showLessItems ? s.next_3 : s.next_5;
        if (o.showPrevNextJumpers) {
          var M = t + "-jump-prev";
          o.jumpPrevIcon && (M += " " + t + "-jump-prev-custom-icon"), u = g.a.createElement("li", {
            title: o.showTitle ? A : null,
            key: "prev",
            onClick: this.jumpPrev,
            tabIndex: "0",
            onKeyPress: this.runIfEnterJumpPrev,
            className: M
          }, o.itemRender(this.getJumpPrevPage(), "jump-prev", this.getItemIcon(o.jumpPrevIcon)));
          var R = t + "-jump-next";
          o.jumpNextIcon && (R += " " + t + "-jump-next-custom-icon"), h = g.a.createElement("li", {
            title: o.showTitle ? j : null,
            key: "next",
            tabIndex: "0",
            onClick: this.jumpNext,
            onKeyPress: this.runIfEnterJumpNext,
            className: R
          }, o.itemRender(this.getJumpNextPage(), "jump-next", this.getItemIcon(o.jumpNextIcon)));
        }
        d = g.a.createElement(_, {
          locale: o.locale,
          last: !0,
          rootPrefixCls: t,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: l,
          page: l,
          active: !1,
          showTitle: o.showTitle,
          itemRender: o.itemRender
        }), f = g.a.createElement(_, {
          locale: o.locale,
          rootPrefixCls: t,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: 1,
          page: 1,
          active: !1,
          showTitle: o.showTitle,
          itemRender: o.itemRender
        });
        var N = Math.max(1, w - v),
          D = Math.min(w + v, l);
        w - 1 <= v && (D = 1 + 2 * v), l - w <= v && (N = l - 2 * v);
        for (var I = N; I <= D; I++) {
          var $ = w === I;
          c.push(g.a.createElement(_, {
            locale: o.locale,
            rootPrefixCls: t,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            key: I,
            page: I,
            active: $,
            showTitle: o.showTitle,
            itemRender: o.itemRender
          }));
        }
        w - 1 >= 2 * v && 3 !== w && (c[0] = g.a.cloneElement(c[0], {
          className: t + "-item-after-jump-prev"
        }), c.unshift(u)), l - w >= 2 * v && w !== l - 2 && (c[c.length - 1] = g.a.cloneElement(c[c.length - 1], {
          className: t + "-item-before-jump-next"
        }), c.push(h)), 1 !== N && c.unshift(f), D !== l && c.push(d);
      }
      var F = null;
      o.showTotal && (F = g.a.createElement("li", {
        className: t + "-total-text"
      }, o.showTotal(o.total, [0 === o.total ? 0 : (w - 1) * x + 1, w * x > o.total ? o.total : w * x])));
      var B = !this.hasPrev() || !l,
        V = !this.hasNext() || !l;
      return g.a.createElement("ul", a()({
        className: y()(t, n, i()({}, t + "-disabled", r)),
        style: o.style,
        unselectable: "unselectable",
        ref: this.savePaginationNode
      }, C), F, g.a.createElement("li", {
        title: o.showTitle ? s.prev_page : null,
        onClick: this.prev,
        tabIndex: B ? null : 0,
        onKeyPress: this.runIfEnterPrev,
        className: (B ? t + "-disabled" : "") + " " + t + "-prev",
        "aria-disabled": B
      }, o.itemRender(E, "prev", this.getItemIcon(o.prevIcon))), c, g.a.createElement("li", {
        title: o.showTitle ? s.next_page : null,
        onClick: this.next,
        tabIndex: V ? null : 0,
        onKeyPress: this.runIfEnterNext,
        className: (V ? t + "-disabled" : "") + " " + t + "-next",
        "aria-disabled": V
      }, o.itemRender(S, "next", this.getItemIcon(o.nextIcon))), g.a.createElement(k, {
        disabled: r,
        locale: o.locale,
        rootPrefixCls: t,
        selectComponentClass: o.selectComponentClass,
        selectPrefixCls: o.selectPrefixCls,
        changeSize: this.props.showSizeChanger ? this.changePageSize : null,
        current: this.state.current,
        pageSize: this.state.pageSize,
        pageSizeOptions: this.props.pageSizeOptions,
        quickGo: this.shouldDisplayQuickJumper() ? this.handleChange : null,
        goButton: m
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e, t) {
      var n = {};
      if ("current" in e && (n.current = e.current, e.current !== t.current && (n.currentInputValue = n.current)), "pageSize" in e && e.pageSize !== t.pageSize) {
        var r = t.current,
          i = P(e.pageSize, t, e);
        r = r > i ? i : r, "current" in e || (n.current = r, n.currentInputValue = r), n.pageSize = e.pageSize;
      }
      return n;
    }
  }]), t;
}(g.a.Component);
j.propTypes = {
  disabled: w.a.bool,
  prefixCls: w.a.string,
  className: w.a.string,
  current: w.a.number,
  defaultCurrent: w.a.number,
  total: w.a.number,
  pageSize: w.a.number,
  defaultPageSize: w.a.number,
  onChange: w.a.func,
  hideOnSinglePage: w.a.bool,
  showSizeChanger: w.a.bool,
  showLessItems: w.a.bool,
  onShowSizeChange: w.a.func,
  selectComponentClass: w.a.func,
  showPrevNextJumpers: w.a.bool,
  showQuickJumper: w.a.oneOfType([w.a.bool, w.a.object]),
  showTitle: w.a.bool,
  pageSizeOptions: w.a.arrayOf(w.a.string),
  showTotal: w.a.func,
  locale: w.a.object,
  style: w.a.object,
  itemRender: w.a.func,
  prevIcon: w.a.oneOfType([w.a.func, w.a.node]),
  nextIcon: w.a.oneOfType([w.a.func, w.a.node]),
  jumpPrevIcon: w.a.oneOfType([w.a.func, w.a.node]),
  jumpNextIcon: w.a.oneOfType([w.a.func, w.a.node])
}, j.defaultProps = {
  defaultCurrent: 1,
  total: 0,
  defaultPageSize: 10,
  onChange: T,
  className: "",
  selectPrefixCls: "rc-select",
  prefixCls: "rc-pagination",
  selectComponentClass: null,
  hideOnSinglePage: !1,
  showPrevNextJumpers: !0,
  showQuickJumper: !1,
  showSizeChanger: !1,
  showLessItems: !1,
  showTitle: !0,
  onShowSizeChange: T,
  locale: C["a"],
  style: {},
  itemRender: A
};
var M = function () {
  var e = this;
  this.getJumpPrevPage = function () {
    return Math.max(1, e.state.current - (e.props.showLessItems ? 3 : 5));
  }, this.getJumpNextPage = function () {
    return Math.min(P(void 0, e.state, e.props), e.state.current + (e.props.showLessItems ? 3 : 5));
  }, this.getItemIcon = function (t) {
    var n = e.props.prefixCls,
      r = t || g.a.createElement("a", {
        className: n + "-item-link"
      });
    return "function" === typeof t && (r = g.a.createElement(t, a()({}, e.props))), r;
  }, this.savePaginationNode = function (t) {
    e.paginationNode = t;
  }, this.isValid = function (t) {
    return L(t) && t !== e.state.current;
  }, this.shouldDisplayQuickJumper = function () {
    var t = e.props,
      n = t.showQuickJumper,
      r = t.pageSize,
      i = t.total;
    return !(i <= r) && n;
  }, this.handleKeyDown = function (e) {
    e.keyCode !== E.ARROW_UP && e.keyCode !== E.ARROW_DOWN || e.preventDefault();
  }, this.handleKeyUp = function (t) {
    var n = e.getValidValue(t),
      r = e.state.currentInputValue;
    n !== r && e.setState({
      currentInputValue: n
    }), t.keyCode === E.ENTER ? e.handleChange(n) : t.keyCode === E.ARROW_UP ? e.handleChange(n - 1) : t.keyCode === E.ARROW_DOWN && e.handleChange(n + 1);
  }, this.changePageSize = function (t) {
    var n = e.state.current,
      r = P(t, e.state, e.props);
    n = n > r ? r : n, 0 === r && (n = e.state.current), "number" === typeof t && ("pageSize" in e.props || e.setState({
      pageSize: t
    }), "current" in e.props || e.setState({
      current: n,
      currentInputValue: n
    })), e.props.onShowSizeChange(n, t);
  }, this.handleChange = function (t) {
    var n = e.props.disabled,
      r = t;
    if (e.isValid(r) && !n) {
      var i = P(void 0, e.state, e.props);
      r > i ? r = i : r < 1 && (r = 1), "current" in e.props || e.setState({
        current: r,
        currentInputValue: r
      });
      var o = e.state.pageSize;
      return e.props.onChange(r, o), r;
    }
    return e.state.current;
  }, this.prev = function () {
    e.hasPrev() && e.handleChange(e.state.current - 1);
  }, this.next = function () {
    e.hasNext() && e.handleChange(e.state.current + 1);
  }, this.jumpPrev = function () {
    e.handleChange(e.getJumpPrevPage());
  }, this.jumpNext = function () {
    e.handleChange(e.getJumpNextPage());
  }, this.hasPrev = function () {
    return e.state.current > 1;
  }, this.hasNext = function () {
    return e.state.current < P(void 0, e.state, e.props);
  }, this.runIfEnter = function (e, t) {
    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
    "Enter" !== e.key && 13 !== e.charCode || t.apply(void 0, r);
  }, this.runIfEnterPrev = function (t) {
    e.runIfEnter(t, e.prev);
  }, this.runIfEnterNext = function (t) {
    e.runIfEnter(t, e.next);
  }, this.runIfEnterJumpPrev = function (t) {
    e.runIfEnter(t, e.jumpPrev);
  }, this.runIfEnterJumpNext = function (t) {
    e.runIfEnter(t, e.jumpNext);
  }, this.handleGoTO = function (t) {
    t.keyCode !== E.ENTER && "click" !== t.type || e.handleChange(e.state.currentInputValue);
  };
};
Object(O["polyfill"])(j);
var R = j;
defineExport(legacyExports, "a", function () {
  return R;
});
