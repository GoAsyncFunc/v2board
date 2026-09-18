let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./59454956.js"),
  o = interopDefault(r),
  i = require("./51624c5a.js"),
  a = interopDefault(i),
  s = require("./classCallCheck.js"),
  c = interopDefault(s),
  u = require("./56376f43.js"),
  l = interopDefault(u),
  f = require("./46597733.js"),
  p = interopDefault(f),
  d = require("./6d526730.js"),
  h = interopDefault(d),
  m = require("./reactRuntime.js"),
  v = interopDefault(m),
  y = require("./classNames.js"),
  g = interopDefault(y),
  b = require("./propTypesRuntime.js"),
  w = interopDefault(b),
  x = function (e) {
    var t,
      n = e.rootPrefixCls + "-item",
      r = g()(n, n + "-" + e.page, (t = {}, o()(t, n + "-active", e.active), o()(t, e.className, !!e.className), o()(t, n + "-disabled", !e.page), t)),
      i = function () {
        e.onClick(e.page);
      },
      a = function (t) {
        e.onKeyPress(t, e.onClick, e.page);
      };
    return v.a.createElement("li", {
      title: e.showTitle ? e.page : null,
      className: r,
      onClick: i,
      onKeyPress: a,
      tabIndex: "0"
    }, e.itemRender(e.page, "page", v.a.createElement("a", null, e.page)));
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
var O = x,
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
  _ = function (e) {
    function t() {
      var e, n, r, o;
      c()(this, t);
      for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
      return r = p()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.state = {
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
          o = t.quickGo,
          i = t.rootPrefixCls;
        n || e.relatedTarget && (e.relatedTarget.className.indexOf(i + "-prev") >= 0 || e.relatedTarget.className.indexOf(i + "-next") >= 0) || o(r.getValidValue());
      }, r.go = function (e) {
        var t = r.state.goInputText;
        "" !== t && (e.keyCode !== E.ENTER && "click" !== e.type || (r.setState({
          goInputText: ""
        }), r.props.quickGo(r.getValidValue())));
      }, o = n, p()(r, o);
    }
    return h()(t, e), l()(t, [{
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
          o = t.locale,
          i = t.rootPrefixCls,
          a = t.changeSize,
          s = t.quickGo,
          c = t.goButton,
          u = t.selectComponentClass,
          l = t.buildOptionText,
          f = t.selectPrefixCls,
          p = t.disabled,
          d = this.state.goInputText,
          h = i + "-options",
          m = u,
          y = null,
          g = null,
          b = null;
        if (!a && !s) return null;
        if (a && m) {
          var w = r.map(function (t, n) {
            return v.a.createElement(m.Option, {
              key: n,
              value: t
            }, (l || e.buildOptionText)(t));
          });
          y = v.a.createElement(m, {
            disabled: p,
            prefixCls: f,
            showSearch: !1,
            className: h + "-size-changer",
            optionLabelProp: "children",
            dropdownMatchSelectWidth: !1,
            value: (n || r[0]).toString(),
            onChange: this.changeSize,
            getPopupContainer: function (e) {
              return e.parentNode;
            }
          }, w);
        }
        return s && (c && (b = "boolean" === typeof c ? v.a.createElement("button", {
          type: "button",
          onClick: this.go,
          onKeyUp: this.go,
          disabled: p
        }, o.jump_to_confirm) : v.a.createElement("span", {
          onClick: this.go,
          onKeyUp: this.go
        }, c)), g = v.a.createElement("div", {
          className: h + "-quick-jumper"
        }, o.jump_to, v.a.createElement("input", {
          disabled: p,
          type: "text",
          value: d,
          onChange: this.handleChange,
          onKeyUp: this.go,
          onBlur: this.handleBlur
        }), o.page, b)), v.a.createElement("li", {
          className: "" + h
        }, y, g);
      }
    }]), t;
  }(v.a.Component);
_.propTypes = {
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
}, _.defaultProps = {
  pageSizeOptions: ["10", "20", "30", "40"]
};
var k = _,
  S = require("./4e324b6b.js"),
  C = require("./reactLifecyclesCompat.js");
function j() {}
function P(e) {
  return "number" === typeof e && isFinite(e) && Math.floor(e) === e;
}
function T(e, t, n) {
  return n;
}
function L(e, t, n) {
  var r = e;
  return "undefined" === typeof r && (r = t.pageSize), Math.floor((n.total - 1) / r) + 1;
}
var N = function (e) {
  function t(e) {
    c()(this, t);
    var n = p()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
    M.call(n);
    var r = e.onChange !== j,
      o = "current" in e;
    o && !r && console.warn("Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.");
    var i = e.defaultCurrent;
    "current" in e && (i = e.current);
    var a = e.defaultPageSize;
    return "pageSize" in e && (a = e.pageSize), i = Math.min(i, L(a, void 0, e)), n.state = {
      current: i,
      currentInputValue: i,
      pageSize: a
    }, n;
  }
  return h()(t, e), l()(t, [{
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
        n = L(void 0, this.state, this.props),
        r = this.state.currentInputValue,
        o = void 0;
      return o = "" === t ? t : isNaN(Number(t)) ? r : t >= n ? n : Number(t), o;
    }
  }, {
    key: "render",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.className,
        r = e.disabled;
      if (!0 === this.props.hideOnSinglePage && this.props.total <= this.state.pageSize) return null;
      var i = this.props,
        s = i.locale,
        c = L(void 0, this.state, this.props),
        u = [],
        l = null,
        f = null,
        p = null,
        d = null,
        h = null,
        m = i.showQuickJumper && i.showQuickJumper.goButton,
        y = i.showLessItems ? 1 : 2,
        b = this.state,
        w = b.current,
        x = b.pageSize,
        E = w - 1 > 0 ? w - 1 : 0,
        _ = w + 1 < c ? w + 1 : c,
        S = Object.keys(i).reduce(function (e, t) {
          return "data-" !== t.substr(0, 5) && "aria-" !== t.substr(0, 5) && "role" !== t || (e[t] = i[t]), e;
        }, {});
      if (i.simple) return m && (h = "boolean" === typeof m ? v.a.createElement("button", {
        type: "button",
        onClick: this.handleGoTO,
        onKeyUp: this.handleGoTO
      }, s.jump_to_confirm) : v.a.createElement("span", {
        onClick: this.handleGoTO,
        onKeyUp: this.handleGoTO
      }, m), h = v.a.createElement("li", {
        title: i.showTitle ? "" + s.jump_to + this.state.current + "/" + c : null,
        className: t + "-simple-pager"
      }, h)), v.a.createElement("ul", a()({
        className: t + " " + t + "-simple " + i.className,
        style: i.style,
        ref: this.savePaginationNode
      }, S), v.a.createElement("li", {
        title: i.showTitle ? s.prev_page : null,
        onClick: this.prev,
        tabIndex: this.hasPrev() ? 0 : null,
        onKeyPress: this.runIfEnterPrev,
        className: (this.hasPrev() ? "" : t + "-disabled") + " " + t + "-prev",
        "aria-disabled": !this.hasPrev()
      }, i.itemRender(E, "prev", this.getItemIcon(i.prevIcon))), v.a.createElement("li", {
        title: i.showTitle ? this.state.current + "/" + c : null,
        className: t + "-simple-pager"
      }, v.a.createElement("input", {
        type: "text",
        value: this.state.currentInputValue,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        onChange: this.handleKeyUp,
        size: "3"
      }), v.a.createElement("span", {
        className: t + "-slash"
      }, "/"), c), v.a.createElement("li", {
        title: i.showTitle ? s.next_page : null,
        onClick: this.next,
        tabIndex: this.hasPrev() ? 0 : null,
        onKeyPress: this.runIfEnterNext,
        className: (this.hasNext() ? "" : t + "-disabled") + " " + t + "-next",
        "aria-disabled": !this.hasNext()
      }, i.itemRender(_, "next", this.getItemIcon(i.nextIcon))), h);
      if (c <= 5 + 2 * y) {
        var C = {
          locale: s,
          rootPrefixCls: t,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          showTitle: i.showTitle,
          itemRender: i.itemRender
        };
        c || u.push(v.a.createElement(O, a()({}, C, {
          key: "noPager",
          page: c,
          className: t + "-disabled"
        })));
        for (var j = 1; j <= c; j++) {
          var P = this.state.current === j;
          u.push(v.a.createElement(O, a()({}, C, {
            key: j,
            page: j,
            active: P
          })));
        }
      } else {
        var T = i.showLessItems ? s.prev_3 : s.prev_5,
          N = i.showLessItems ? s.next_3 : s.next_5;
        if (i.showPrevNextJumpers) {
          var M = t + "-jump-prev";
          i.jumpPrevIcon && (M += " " + t + "-jump-prev-custom-icon"), l = v.a.createElement("li", {
            title: i.showTitle ? T : null,
            key: "prev",
            onClick: this.jumpPrev,
            tabIndex: "0",
            onKeyPress: this.runIfEnterJumpPrev,
            className: M
          }, i.itemRender(this.getJumpPrevPage(), "jump-prev", this.getItemIcon(i.jumpPrevIcon)));
          var A = t + "-jump-next";
          i.jumpNextIcon && (A += " " + t + "-jump-next-custom-icon"), f = v.a.createElement("li", {
            title: i.showTitle ? N : null,
            key: "next",
            tabIndex: "0",
            onClick: this.jumpNext,
            onKeyPress: this.runIfEnterJumpNext,
            className: A
          }, i.itemRender(this.getJumpNextPage(), "jump-next", this.getItemIcon(i.jumpNextIcon)));
        }
        d = v.a.createElement(O, {
          locale: i.locale,
          last: !0,
          rootPrefixCls: t,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: c,
          page: c,
          active: !1,
          showTitle: i.showTitle,
          itemRender: i.itemRender
        }), p = v.a.createElement(O, {
          locale: i.locale,
          rootPrefixCls: t,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          key: 1,
          page: 1,
          active: !1,
          showTitle: i.showTitle,
          itemRender: i.itemRender
        });
        var D = Math.max(1, w - y),
          I = Math.min(w + y, c);
        w - 1 <= y && (I = 1 + 2 * y), c - w <= y && (D = c - 2 * y);
        for (var R = D; R <= I; R++) {
          var F = w === R;
          u.push(v.a.createElement(O, {
            locale: i.locale,
            rootPrefixCls: t,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            key: R,
            page: R,
            active: F,
            showTitle: i.showTitle,
            itemRender: i.itemRender
          }));
        }
        w - 1 >= 2 * y && 3 !== w && (u[0] = v.a.cloneElement(u[0], {
          className: t + "-item-after-jump-prev"
        }), u.unshift(l)), c - w >= 2 * y && w !== c - 2 && (u[u.length - 1] = v.a.cloneElement(u[u.length - 1], {
          className: t + "-item-before-jump-next"
        }), u.push(f)), 1 !== D && u.unshift(p), I !== c && u.push(d);
      }
      var V = null;
      i.showTotal && (V = v.a.createElement("li", {
        className: t + "-total-text"
      }, i.showTotal(i.total, [0 === i.total ? 0 : (w - 1) * x + 1, w * x > i.total ? i.total : w * x])));
      var z = !this.hasPrev() || !c,
        B = !this.hasNext() || !c;
      return v.a.createElement("ul", a()({
        className: g()(t, n, o()({}, t + "-disabled", r)),
        style: i.style,
        unselectable: "unselectable",
        ref: this.savePaginationNode
      }, S), V, v.a.createElement("li", {
        title: i.showTitle ? s.prev_page : null,
        onClick: this.prev,
        tabIndex: z ? null : 0,
        onKeyPress: this.runIfEnterPrev,
        className: (z ? t + "-disabled" : "") + " " + t + "-prev",
        "aria-disabled": z
      }, i.itemRender(E, "prev", this.getItemIcon(i.prevIcon))), u, v.a.createElement("li", {
        title: i.showTitle ? s.next_page : null,
        onClick: this.next,
        tabIndex: B ? null : 0,
        onKeyPress: this.runIfEnterNext,
        className: (B ? t + "-disabled" : "") + " " + t + "-next",
        "aria-disabled": B
      }, i.itemRender(_, "next", this.getItemIcon(i.nextIcon))), v.a.createElement(k, {
        disabled: r,
        locale: i.locale,
        rootPrefixCls: t,
        selectComponentClass: i.selectComponentClass,
        selectPrefixCls: i.selectPrefixCls,
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
          o = L(e.pageSize, t, e);
        r = r > o ? o : r, "current" in e || (n.current = r, n.currentInputValue = r), n.pageSize = e.pageSize;
      }
      return n;
    }
  }]), t;
}(v.a.Component);
N.propTypes = {
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
}, N.defaultProps = {
  defaultCurrent: 1,
  total: 0,
  defaultPageSize: 10,
  onChange: j,
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
  onShowSizeChange: j,
  locale: S["a"],
  style: {},
  itemRender: T
};
var M = function () {
  var e = this;
  this.getJumpPrevPage = function () {
    return Math.max(1, e.state.current - (e.props.showLessItems ? 3 : 5));
  }, this.getJumpNextPage = function () {
    return Math.min(L(void 0, e.state, e.props), e.state.current + (e.props.showLessItems ? 3 : 5));
  }, this.getItemIcon = function (t) {
    var n = e.props.prefixCls,
      r = t || v.a.createElement("a", {
        className: n + "-item-link"
      });
    return "function" === typeof t && (r = v.a.createElement(t, a()({}, e.props))), r;
  }, this.savePaginationNode = function (t) {
    e.paginationNode = t;
  }, this.isValid = function (t) {
    return P(t) && t !== e.state.current;
  }, this.shouldDisplayQuickJumper = function () {
    var t = e.props,
      n = t.showQuickJumper,
      r = t.pageSize,
      o = t.total;
    return !(o <= r) && n;
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
      r = L(t, e.state, e.props);
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
      var o = L(void 0, e.state, e.props);
      r > o ? r = o : r < 1 && (r = 1), "current" in e.props || e.setState({
        current: r,
        currentInputValue: r
      });
      var i = e.state.pageSize;
      return e.props.onChange(r, i), r;
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
    return e.state.current < L(void 0, e.state, e.props);
  }, this.runIfEnter = function (e, t) {
    for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) r[o - 2] = arguments[o];
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
Object(C["polyfill"])(N);
var A = N;
defineExport(legacyExports, "a", function () {
  return A;
});
