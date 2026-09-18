let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./reactRuntime.js"),
  i = interopDefault(r);
function o(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function a(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? s(e) : t;
}
function s(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function l(e) {
  return l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, l(e);
}
function c(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && u(e, t);
}
function u(e, t) {
  return u = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, u(e, t);
}
var h = function (e) {
  function t() {
    return o(this, t), a(this, l(t).apply(this, arguments));
  }
  return c(t, e), t;
}(r["Component"]);
h.isSelectOptGroup = !0;
var f = require("./propTypesRuntime.js");
function d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function p(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? m(e) : t;
}
function m(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function g(e) {
  return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, g(e);
}
function v(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && y(e, t);
}
function y(e, t) {
  return y = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, y(e, t);
}
var b = function (e) {
  function t() {
    return d(this, t), p(this, g(t).apply(this, arguments));
  }
  return v(t, e), t;
}(r["Component"]);
function w(e) {
  return E(e) || _(e) || x();
}
function x() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _(e) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
}
function E(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function S() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var r = t[0],
    i = t[1],
    o = t[2],
    a = t.slice(3),
    s = f["oneOfType"]([f["string"], f["number"]]),
    l = f["shape"]({
      key: s.isRequired,
      label: f["node"]
    });
  if (!r.labelInValue) {
    if (("multiple" === r.mode || "tags" === r.mode || r.multiple || r.tags) && "" === r[i]) return new Error("Invalid prop `".concat(i, "` of type `string` supplied to `").concat(o, "`, ") + "expected `array` when `multiple` or `tags` is `true`.");
    var c = f["oneOfType"]([f["arrayOf"](s), s]);
    return c.apply(void 0, [r, i, o].concat(w(a)));
  }
  var u = f["oneOfType"]([f["arrayOf"](l), l]),
    h = u.apply(void 0, [r, i, o].concat(w(a)));
  return h ? new Error("Invalid prop `".concat(i, "` supplied to `").concat(o, "`, ") + "when you set `labelInValue` to `true`, `".concat(i, "` should in ") + "shape of `{ key: string | number, label?: ReactNode }`.") : null;
}
b.propTypes = {
  value: f["oneOfType"]([f["string"], f["number"]])
}, b.isSelectOption = !0;
var k = {
    id: f["string"],
    defaultActiveFirstOption: f["bool"],
    multiple: f["bool"],
    filterOption: f["any"],
    children: f["any"],
    showSearch: f["bool"],
    disabled: f["bool"],
    allowClear: f["bool"],
    showArrow: f["bool"],
    tags: f["bool"],
    prefixCls: f["string"],
    className: f["string"],
    transitionName: f["string"],
    optionLabelProp: f["string"],
    optionFilterProp: f["string"],
    animation: f["string"],
    choiceTransitionName: f["string"],
    open: f["bool"],
    defaultOpen: f["bool"],
    onChange: f["func"],
    onBlur: f["func"],
    onFocus: f["func"],
    onSelect: f["func"],
    onSearch: f["func"],
    onPopupScroll: f["func"],
    onMouseEnter: f["func"],
    onMouseLeave: f["func"],
    onInputKeyDown: f["func"],
    placeholder: f["any"],
    onDeselect: f["func"],
    labelInValue: f["bool"],
    loading: f["bool"],
    value: S,
    defaultValue: S,
    dropdownStyle: f["object"],
    maxTagTextLength: f["number"],
    maxTagCount: f["number"],
    maxTagPlaceholder: f["oneOfType"]([f["node"], f["func"]]),
    tokenSeparators: f["arrayOf"](f["string"]),
    getInputElement: f["func"],
    showAction: f["arrayOf"](f["string"]),
    clearIcon: f["node"],
    inputIcon: f["node"],
    removeIcon: f["node"],
    menuItemSelectedIcon: f["oneOfType"]([f["func"], f["node"]]),
    dropdownRender: f["func"]
  },
  C = k,
  O = require("./classNames.js"),
  T = interopDefault(O),
  L = require("./5046577a.js"),
  A = interopDefault(L),
  P = require("./4d466a32.js"),
  j = require("./316a3577.js"),
  M = require("./reactIsLegacyEntry.js");
function R(e) {
  var t = [];
  return i.a.Children.forEach(e, function (e) {
    void 0 !== e && null !== e && (Array.isArray(e) ? t = t.concat(R(e)) : Object(M["isFragment"])(e) && e.props ? t = t.concat(R(e.props.children)) : t.push(e));
  }), t;
}
var N = require("./34496c57.js"),
  D = require("./reactDomRuntime.js"),
  I = require("./reactLifecyclesCompat.js"),
  $ = require("./3257367a.js"),
  F = interopDefault($),
  B = require("./animationFrameRuntime.js"),
  V = interopDefault(B),
  W = require("./75636958.js"),
  H = require("./scrollIntoViewEntry.js"),
  U = interopDefault(H);
function z(e) {
  return "string" === typeof e ? e : "";
}
function G(e) {
  if (!e) return null;
  var t = e.props;
  if ("value" in t) return t.value;
  if (e.key) return e.key;
  if (e.type && e.type.isSelectOptGroup && t.label) return t.label;
  throw new Error("Need at least a key or a value or a label (only for OptGroup) for ".concat(e));
}
function q(e, t) {
  return "value" === t ? G(e) : e.props[t];
}
function K(e) {
  return e.multiple;
}
function Y(e) {
  return e.combobox;
}
function X(e) {
  return e.multiple || e.tags;
}
function Q(e) {
  return X(e) || Y(e);
}
function Z(e) {
  return !Q(e);
}
function J(e) {
  var t = e;
  return void 0 === e ? t = [] : Array.isArray(e) || (t = [e]), t;
}
function ee(e) {
  return "".concat(typeof e, "-").concat(e);
}
function te(e) {
  e.preventDefault();
}
function ne(e, t) {
  var n = -1;
  if (e) for (var r = 0; r < e.length; r++) if (e[r] === t) {
    n = r;
    break;
  }
  return n;
}
function re(e, t) {
  var n;
  if (e = J(e), e) for (var r = 0; r < e.length; r++) if (e[r].key === t) {
    n = e[r].label;
    break;
  }
  return n;
}
function ie(e, t) {
  if (null === t || void 0 === t) return [];
  var n = [];
  return i.a.Children.forEach(e, function (e) {
    var r = e.type;
    if (r.isMenuItemGroup) n = n.concat(ie(e.props.children, t));else {
      var i = G(e),
        o = e.key;
      -1 !== ne(t, i) && o && n.push(o);
    }
  }), n;
}
var oe = {
    userSelect: "none",
    WebkitUserSelect: "none"
  },
  ae = {
    unselectable: "on"
  };
function se(e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    if (n.type.isMenuItemGroup) {
      var r = se(n.props.children);
      if (r) return r;
    } else if (!n.props.disabled) return n;
  }
  return null;
}
function le(e, t) {
  for (var n = 0; n < t.length; ++n) if (e.lastIndexOf(t[n]) > 0) return !0;
  return !1;
}
function ce(e, t) {
  var n = new RegExp("[".concat(t.join(), "]"));
  return e.split(n).filter(function (e) {
    return e;
  });
}
function ue(e, t) {
  if (t.props.disabled) return !1;
  var n = J(q(t, this.props.optionFilterProp)).join("");
  return n.toLowerCase().indexOf(e.toLowerCase()) > -1;
}
function he(e, t) {
  if (!Z(t) && !K(t) && "string" !== typeof e) throw new Error("Invalid `value` of type `".concat(typeof e, "` supplied to Option, ") + "expected `string` when `tags/combobox` is `true`.");
}
function fe(e, t) {
  return function (n) {
    e[t] = n;
  };
}
function de() {
  var e = new Date().getTime(),
    t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var n = (e + 16 * Math.random()) % 16 | 0;
      return e = Math.floor(e / 16), ("x" === t ? n : 7 & n | 8).toString(16);
    });
  return t;
}
function pe() {
  return pe = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, pe.apply(this, arguments);
}
function me(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ge(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function ve(e, t, n) {
  return t && ge(e.prototype, t), n && ge(e, n), e;
}
function ye(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? we(e) : t;
}
function be(e) {
  return be = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, be(e);
}
function we(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function xe(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && _e(e, t);
}
function _e(e, t) {
  return _e = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, _e(e, t);
}
var Ee = function (e) {
  function t(e) {
    var n;
    return me(this, t), n = ye(this, be(t).call(this, e)), n.rafInstance = null, n.lastVisible = !1, n.scrollActiveItemToView = function () {
      var e = Object(D["findDOMNode"])(n.firstActiveItem),
        t = n.props,
        r = t.visible,
        i = t.firstActiveValue,
        o = n.props.value;
      if (e && r) {
        var a = {
          onlyScrollIfNeeded: !0
        };
        o && 0 !== o.length || !i || (a.alignWithTop = !0), n.rafInstance = V()(function () {
          U()(e, Object(D["findDOMNode"])(n.menuRef), a);
        });
      }
    }, n.renderMenu = function () {
      var e = n.props,
        t = e.menuItems,
        i = e.menuItemSelectedIcon,
        o = e.defaultActiveFirstOption,
        a = e.prefixCls,
        s = e.multiple,
        l = e.onMenuSelect,
        c = e.inputValue,
        u = e.backfillValue,
        h = e.onMenuDeselect,
        f = e.visible,
        d = n.props.firstActiveValue;
      if (t && t.length) {
        var p = {};
        s ? (p.onDeselect = h, p.onSelect = l) : p.onClick = l;
        var m = n.props.value,
          g = ie(t, m),
          v = {},
          y = o,
          b = t;
        if (g.length || d) {
          f && !n.lastVisible ? v.activeKey = g[0] || d : f || (g[0] && (y = !1), v.activeKey = void 0);
          var w = !1,
            x = function (e) {
              var t = e.key;
              return !w && -1 !== g.indexOf(t) || !w && !g.length && -1 !== d.indexOf(e.key) ? (w = !0, r["cloneElement"](e, {
                ref: function (e) {
                  n.firstActiveItem = e;
                }
              })) : e;
            };
          b = t.map(function (e) {
            if (e.type.isMenuItemGroup) {
              var t = R(e.props.children).map(x);
              return r["cloneElement"](e, {}, t);
            }
            return x(e);
          });
        } else n.firstActiveItem = null;
        var _ = m && m[m.length - 1];
        return c === n.lastInputValue || _ && _ === u || (v.activeKey = ""), r["createElement"](j["e"], pe({
          ref: n.saveMenuRef,
          style: n.props.dropdownMenuStyle,
          defaultActiveFirst: y,
          role: "listbox",
          itemIcon: s ? i : null
        }, v, {
          multiple: s
        }, p, {
          selectedKeys: g,
          prefixCls: "".concat(a, "-menu")
        }), b);
      }
      return null;
    }, n.lastInputValue = e.inputValue, n.saveMenuRef = fe(we(n), "menuRef"), n;
  }
  return xe(t, e), ve(t, [{
    key: "componentDidMount",
    value: function () {
      this.scrollActiveItemToView(), this.lastVisible = this.props.visible;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function (e) {
      return e.visible || (this.lastVisible = !1), this.props.visible && !e.visible || e.visible || e.inputValue !== this.props.inputValue;
    }
  }, {
    key: "componentDidUpdate",
    value: function (e) {
      var t = this.props;
      !e.visible && t.visible && this.scrollActiveItemToView(), this.lastVisible = t.visible, this.lastInputValue = t.inputValue;
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.rafInstance && V.a.cancel(this.rafInstance);
    }
  }, {
    key: "render",
    value: function () {
      var e = this.renderMenu();
      return e ? r["createElement"]("div", {
        style: {
          overflow: "auto",
          transform: "translateZ(0)"
        },
        id: this.props.ariaId,
        onFocus: this.props.onPopupFocus,
        onMouseDown: te,
        onScroll: this.props.onPopupScroll
      }, e) : null;
    }
  }]), t;
}(r["Component"]);
function Se(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ke() {
  return ke = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ke.apply(this, arguments);
}
function Ce(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Oe(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Te(e, t, n) {
  return t && Oe(e.prototype, t), n && Oe(e, n), e;
}
function Le(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? Pe(e) : t;
}
function Ae(e) {
  return Ae = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Ae(e);
}
function Pe(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function je(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Me(e, t);
}
function Me(e, t) {
  return Me = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Me(e, t);
}
Ee.displayName = "DropdownMenu", Ee.propTypes = {
  ariaId: f["string"],
  defaultActiveFirstOption: f["bool"],
  value: f["any"],
  dropdownMenuStyle: f["object"],
  multiple: f["bool"],
  onPopupFocus: f["func"],
  onPopupScroll: f["func"],
  onMenuDeSelect: f["func"],
  onMenuSelect: f["func"],
  prefixCls: f["string"],
  menuItems: f["any"],
  inputValue: f["string"],
  visible: f["bool"],
  firstActiveValue: f["string"],
  menuItemSelectedIcon: f["oneOfType"]([f["func"], f["node"]])
};
var Re = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var i = 0;
    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  }
  return n;
};
W["a"].displayName = "Trigger";
var Ne = {
    bottomLeft: {
      points: ["tl", "bl"],
      offset: [0, 4],
      overflow: {
        adjustX: 0,
        adjustY: 1
      }
    },
    topLeft: {
      points: ["bl", "tl"],
      offset: [0, -4],
      overflow: {
        adjustX: 0,
        adjustY: 1
      }
    }
  },
  De = function (e) {
    function t(e) {
      var n;
      return Ce(this, t), n = Le(this, Ae(t).call(this, e)), n.dropdownMenuRef = null, n.rafInstance = null, n.setDropdownWidth = function () {
        n.cancelRafInstance(), n.rafInstance = V()(function () {
          var e = D["findDOMNode"](Pe(n)),
            t = e.offsetWidth;
          t !== n.state.dropdownWidth && n.setState({
            dropdownWidth: t
          });
        });
      }, n.cancelRafInstance = function () {
        n.rafInstance && V.a.cancel(n.rafInstance);
      }, n.getInnerMenu = function () {
        return n.dropdownMenuRef && n.dropdownMenuRef.menuRef;
      }, n.getPopupDOMNode = function () {
        return n.triggerRef.getPopupDomNode();
      }, n.getDropdownElement = function (e) {
        var t = n.props,
          i = t.dropdownRender,
          o = t.ariaId,
          a = r["createElement"](Ee, ke({
            ref: n.saveDropdownMenuRef
          }, e, {
            ariaId: o,
            prefixCls: n.getDropdownPrefixCls(),
            onMenuSelect: t.onMenuSelect,
            onMenuDeselect: t.onMenuDeselect,
            onPopupScroll: t.onPopupScroll,
            value: t.value,
            backfillValue: t.backfillValue,
            firstActiveValue: t.firstActiveValue,
            defaultActiveFirstOption: t.defaultActiveFirstOption,
            dropdownMenuStyle: t.dropdownMenuStyle,
            menuItemSelectedIcon: t.menuItemSelectedIcon
          }));
        return i ? i(a, t) : null;
      }, n.getDropdownTransitionName = function () {
        var e = n.props,
          t = e.transitionName;
        return !t && e.animation && (t = "".concat(n.getDropdownPrefixCls(), "-").concat(e.animation)), t;
      }, n.getDropdownPrefixCls = function () {
        return "".concat(n.props.prefixCls, "-dropdown");
      }, n.saveDropdownMenuRef = fe(Pe(n), "dropdownMenuRef"), n.saveTriggerRef = fe(Pe(n), "triggerRef"), n.state = {
        dropdownWidth: 0
      }, n;
    }
    return je(t, e), Te(t, [{
      key: "componentDidMount",
      value: function () {
        this.setDropdownWidth();
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        this.setDropdownWidth();
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.cancelRafInstance();
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t,
          n = this.props,
          i = n.onPopupFocus,
          o = n.empty,
          a = Re(n, ["onPopupFocus", "empty"]),
          s = a.multiple,
          l = a.visible,
          c = a.inputValue,
          u = a.dropdownAlign,
          h = a.disabled,
          f = a.showSearch,
          d = a.dropdownClassName,
          p = a.dropdownStyle,
          m = a.dropdownMatchSelectWidth,
          g = this.getDropdownPrefixCls(),
          v = (e = {}, Se(e, d, !!d), Se(e, "".concat(g, "--").concat(s ? "multiple" : "single"), 1), Se(e, "".concat(g, "--empty"), o), e),
          y = this.getDropdownElement({
            menuItems: a.options,
            onPopupFocus: i,
            multiple: s,
            inputValue: c,
            visible: l
          });
        t = h ? [] : Z(a) && !f ? ["click"] : ["blur"];
        var b = ke({}, p),
          w = m ? "width" : "minWidth";
        return this.state.dropdownWidth && (b[w] = "".concat(this.state.dropdownWidth, "px")), r["createElement"](W["a"], ke({}, a, {
          showAction: h ? [] : this.props.showAction,
          hideAction: t,
          ref: this.saveTriggerRef,
          popupPlacement: "bottomLeft",
          builtinPlacements: Ne,
          prefixCls: g,
          popupTransitionName: this.getDropdownTransitionName(),
          onPopupVisibleChange: a.onDropdownVisibleChange,
          popup: y,
          popupAlign: u,
          popupVisible: l,
          getPopupContainer: a.getPopupContainer,
          popupClassName: T()(v),
          popupStyle: b
        }), a.children);
      }
    }]), t;
  }(r["Component"]);
function Ie(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function $e() {
  return $e = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, $e.apply(this, arguments);
}
function Fe(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Be(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Ve(e, t, n) {
  return t && Be(e.prototype, t), n && Be(e, n), e;
}
function We(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? Ue(e) : t;
}
function He(e) {
  return He = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, He(e);
}
function Ue(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ze(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Ge(e, t);
}
function Ge(e, t) {
  return Ge = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Ge(e, t);
}
function qe(e) {
  return !e || null === e.offsetParent;
}
De.defaultProps = {
  dropdownRender: function (e) {
    return e;
  }
}, De.propTypes = {
  onPopupFocus: f["func"],
  onPopupScroll: f["func"],
  dropdownMatchSelectWidth: f["bool"],
  dropdownAlign: f["object"],
  visible: f["bool"],
  disabled: f["bool"],
  showSearch: f["bool"],
  dropdownClassName: f["string"],
  multiple: f["bool"],
  inputValue: f["string"],
  filterOption: f["any"],
  options: f["any"],
  prefixCls: f["string"],
  popupClassName: f["string"],
  children: f["any"],
  showAction: f["arrayOf"](f["string"]),
  menuItemSelectedIcon: f["oneOfType"]([f["func"], f["node"]]),
  dropdownRender: f["func"],
  ariaId: f["string"]
}, De.displayName = "SelectTrigger";
var Ke = "RC_SELECT_EMPTY_VALUE_KEY",
  Ye = function () {
    return null;
  };
function Xe() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return function () {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
    for (var i = 0; i < t.length; i++) t[i] && "function" === typeof t[i] && t[i].apply(Xe, n);
  };
}
var Qe = function (e) {
  function t(e) {
    var n;
    Fe(this, t), n = We(this, He(t).call(this, e)), n.inputRef = null, n.inputMirrorRef = null, n.topCtrlRef = null, n.selectTriggerRef = null, n.rootRef = null, n.selectionRef = null, n.dropdownContainer = null, n.blurTimer = null, n.focusTimer = null, n.comboboxTimer = null, n._focused = !1, n._mouseDown = !1, n._options = [], n._empty = !1, n.onInputChange = function (e) {
      var t = n.props.tokenSeparators,
        r = e.target.value;
      if (X(n.props) && t.length && le(r, t)) {
        var i = n.getValueByInput(r);
        return void 0 !== i && n.fireChange(i), n.setOpenState(!1, {
          needFocus: !0
        }), void n.setInputValue("", !1);
      }
      n.setInputValue(r), n.setState({
        open: !0
      }), Y(n.props) && n.fireChange([r]);
    }, n.onDropdownVisibleChange = function (e) {
      e && !n._focused && (n.clearBlurTime(), n.timeoutFocus(), n._focused = !0, n.updateFocusClassName()), n.setOpenState(e);
    }, n.onKeyDown = function (e) {
      var t = n.state.open,
        r = n.props.disabled;
      if (!r) {
        var i = e.keyCode;
        t && !n.getInputDOMNode() ? n.onInputKeyDown(e) : i === N["a"].ENTER || i === N["a"].DOWN ? (t || n.setOpenState(!0), e.preventDefault()) : i === N["a"].SPACE && (t || (n.setOpenState(!0), e.preventDefault()));
      }
    }, n.onInputKeyDown = function (e) {
      var t = n.props,
        r = t.disabled,
        i = t.combobox,
        o = t.defaultActiveFirstOption;
      if (!r) {
        var a = n.state,
          s = n.getRealOpenState(a),
          l = e.keyCode;
        if (!X(n.props) || e.target.value || l !== N["a"].BACKSPACE) {
          if (l === N["a"].DOWN) {
            if (!a.open) return n.openIfHasChildren(), e.preventDefault(), void e.stopPropagation();
          } else if (l === N["a"].ENTER && a.open) !s && i || e.preventDefault(), s && i && !1 === o && (n.comboboxTimer = setTimeout(function () {
            n.setOpenState(!1);
          }));else if (l === N["a"].ESC) return void (a.open && (n.setOpenState(!1), e.preventDefault(), e.stopPropagation()));
          if (s && n.selectTriggerRef) {
            var c = n.selectTriggerRef.getInnerMenu();
            c && c.onKeyDown(e, n.handleBackfill) && (e.preventDefault(), e.stopPropagation());
          }
        } else {
          e.preventDefault();
          var u = a.value;
          u.length && n.removeSelected(u[u.length - 1]);
        }
      }
    }, n.onMenuSelect = function (e) {
      var t = e.item;
      if (t) {
        var r = n.state.value,
          i = n.props,
          o = G(t),
          a = r[r.length - 1],
          s = !1;
        if (X(i) ? -1 !== ne(r, o) ? s = !0 : r = r.concat([o]) : Y(i) || void 0 === a || a !== o || o === n.state.backfillValue ? (r = [o], n.setOpenState(!1, {
          needFocus: !0,
          fireSearch: !1
        })) : (n.setOpenState(!1, {
          needFocus: !0,
          fireSearch: !1
        }), s = !0), s || n.fireChange(r), n.fireSelect(o), !s) {
          var l = Y(i) ? q(t, i.optionLabelProp) : "";
          i.autoClearSearchValue && n.setInputValue(l, !1);
        }
      }
    }, n.onMenuDeselect = function (e) {
      var t = e.item,
        r = e.domEvent;
      if ("keydown" !== r.type || r.keyCode !== N["a"].ENTER) {
        "click" === r.type && n.removeSelected(G(t));
        var i = n.props;
        i.autoClearSearchValue && n.setInputValue("");
      } else {
        var o = D["findDOMNode"](t);
        qe(o) || n.removeSelected(G(t));
      }
    }, n.onArrowClick = function (e) {
      e.stopPropagation(), e.preventDefault(), n.props.disabled || n.setOpenState(!n.state.open, {
        needFocus: !n.state.open
      });
    }, n.onPlaceholderClick = function () {
      n.getInputDOMNode && n.getInputDOMNode() && n.getInputDOMNode().focus();
    }, n.onOuterFocus = function (e) {
      if (n.props.disabled) e.preventDefault();else {
        n.clearBlurTime();
        var t = n.getInputDOMNode();
        t && e.target === n.rootRef || (Q(n.props) || e.target !== t) && (n._focused || (n._focused = !0, n.updateFocusClassName(), X(n.props) && n._mouseDown || n.timeoutFocus()));
      }
    }, n.onPopupFocus = function () {
      n.maybeFocus(!0, !0);
    }, n.onOuterBlur = function (e) {
      n.props.disabled ? e.preventDefault() : n.blurTimer = window.setTimeout(function () {
        n._focused = !1, n.updateFocusClassName();
        var e = n.props,
          t = n.state.value,
          r = n.state.inputValue;
        if (Z(e) && e.showSearch && r && e.defaultActiveFirstOption) {
          var i = n._options || [];
          if (i.length) {
            var o = se(i);
            o && (t = [G(o)], n.fireChange(t));
          }
        } else if (X(e) && r) {
          n._mouseDown ? n.setInputValue("") : (n.state.inputValue = "", n.getInputDOMNode && n.getInputDOMNode() && (n.getInputDOMNode().value = ""));
          var a = n.getValueByInput(r);
          void 0 !== a && (t = a, n.fireChange(t));
        }
        if (X(e) && n._mouseDown) return n.maybeFocus(!0, !0), void (n._mouseDown = !1);
        n.setOpenState(!1), e.onBlur && e.onBlur(n.getVLForOnChange(t));
      }, 10);
    }, n.onClearSelection = function (e) {
      var t = n.props,
        r = n.state;
      if (!t.disabled) {
        var i = r.inputValue,
          o = r.value;
        e.stopPropagation(), (i || o.length) && (o.length && n.fireChange([]), n.setOpenState(!1, {
          needFocus: !0
        }), i && n.setInputValue(""));
      }
    }, n.onChoiceAnimationLeave = function () {
      n.forcePopupAlign();
    }, n.getOptionInfoBySingleValue = function (e, t) {
      var i;
      if (t = t || n.state.optionsInfo, t[ee(e)] && (i = t[ee(e)]), i) return i;
      var o = e;
      if (n.props.labelInValue) {
        var a = re(n.props.value, e),
          s = re(n.props.defaultValue, e);
        void 0 !== a ? o = a : void 0 !== s && (o = s);
      }
      var l = {
        option: r["createElement"](b, {
          value: e,
          key: e
        }, e),
        value: e,
        label: o
      };
      return l;
    }, n.getOptionBySingleValue = function (e) {
      var t = n.getOptionInfoBySingleValue(e),
        r = t.option;
      return r;
    }, n.getOptionsBySingleValue = function (e) {
      return e.map(function (e) {
        return n.getOptionBySingleValue(e);
      });
    }, n.getValueByLabel = function (e) {
      if (void 0 === e) return null;
      var t = null;
      return Object.keys(n.state.optionsInfo).forEach(function (r) {
        var i = n.state.optionsInfo[r],
          o = i.disabled;
        if (!o) {
          var a = J(i.label);
          a && a.join("") === e && (t = i.value);
        }
      }), t;
    }, n.getVLBySingleValue = function (e) {
      return n.props.labelInValue ? {
        key: e,
        label: n.getLabelBySingleValue(e)
      } : e;
    }, n.getVLForOnChange = function (e) {
      var t = e;
      return void 0 !== t ? (t = n.props.labelInValue ? t.map(function (e) {
        return {
          key: e,
          label: n.getLabelBySingleValue(e)
        };
      }) : t.map(function (e) {
        return e;
      }), X(n.props) ? t : t[0]) : t;
    }, n.getLabelBySingleValue = function (e, t) {
      var r = n.getOptionInfoBySingleValue(e, t),
        i = r.label;
      return i;
    }, n.getDropdownContainer = function () {
      return n.dropdownContainer || (n.dropdownContainer = document.createElement("div"), document.body.appendChild(n.dropdownContainer)), n.dropdownContainer;
    }, n.getPlaceholderElement = function () {
      var e = n.props,
        t = n.state,
        i = !1;
      t.inputValue && (i = !0);
      var o = t.value;
      o.length && (i = !0), Y(e) && 1 === o.length && t.value && !t.value[0] && (i = !1);
      var a = e.placeholder;
      return a ? r["createElement"]("div", $e({
        onMouseDown: te,
        style: $e({
          display: i ? "none" : "block"
        }, oe)
      }, ae, {
        onClick: n.onPlaceholderClick,
        className: "".concat(e.prefixCls, "-selection__placeholder")
      }), a) : null;
    }, n.getInputElement = function () {
      var e = n.props,
        t = r["createElement"]("input", {
          id: e.id,
          autoComplete: "off"
        }),
        i = e.getInputElement ? e.getInputElement() : t,
        o = T()(i.props.className, Ie({}, "".concat(e.prefixCls, "-search__field"), !0));
      return r["createElement"]("div", {
        className: "".concat(e.prefixCls, "-search__field__wrap")
      }, r["cloneElement"](i, {
        ref: n.saveInputRef,
        onChange: n.onInputChange,
        onKeyDown: Xe(n.onInputKeyDown, i.props.onKeyDown, n.props.onInputKeyDown),
        value: n.state.inputValue,
        disabled: e.disabled,
        className: o
      }), r["createElement"]("span", {
        ref: n.saveInputMirrorRef,
        className: "".concat(e.prefixCls, "-search__field__mirror")
      }, n.state.inputValue, "\xa0"));
    }, n.getInputDOMNode = function () {
      return n.topCtrlRef ? n.topCtrlRef.querySelector("input,textarea,div[contentEditable]") : n.inputRef;
    }, n.getInputMirrorDOMNode = function () {
      return n.inputMirrorRef;
    }, n.getPopupDOMNode = function () {
      if (n.selectTriggerRef) return n.selectTriggerRef.getPopupDOMNode();
    }, n.getPopupMenuComponent = function () {
      if (n.selectTriggerRef) return n.selectTriggerRef.getInnerMenu();
    }, n.setOpenState = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = t.needFocus,
        i = t.fireSearch,
        o = n.props,
        a = n.state;
      if (a.open !== e) {
        n.props.onDropdownVisibleChange && n.props.onDropdownVisibleChange(e);
        var s = {
          open: e,
          backfillValue: ""
        };
        !e && Z(o) && o.showSearch && n.setInputValue("", i), e || n.maybeFocus(e, !!r), n.setState($e({
          open: e
        }, s), function () {
          e && n.maybeFocus(e, !!r);
        });
      } else n.maybeFocus(e, !!r);
    }, n.setInputValue = function (e) {
      var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
        r = n.props.onSearch;
      e !== n.state.inputValue && n.setState(function (n) {
        return t && e !== n.inputValue && r && r(e), {
          inputValue: e
        };
      }, n.forcePopupAlign);
    }, n.getValueByInput = function (e) {
      var t = n.props,
        r = t.multiple,
        i = t.tokenSeparators,
        o = n.state.value,
        a = !1;
      return ce(e, i).forEach(function (e) {
        var t = [e];
        if (r) {
          var i = n.getValueByLabel(e);
          i && -1 === ne(o, i) && (o = o.concat(i), a = !0, n.fireSelect(i));
        } else -1 === ne(o, e) && (o = o.concat(t), a = !0, n.fireSelect(e));
      }), a ? o : void 0;
    }, n.getRealOpenState = function (e) {
      var t = n.props.open;
      if ("boolean" === typeof t) return t;
      var r = (e || n.state).open,
        i = n._options || [];
      return !Q(n.props) && n.props.showSearch || r && !i.length && (r = !1), r;
    }, n.markMouseDown = function () {
      n._mouseDown = !0;
    }, n.markMouseLeave = function () {
      n._mouseDown = !1;
    }, n.handleBackfill = function (e) {
      if (n.props.backfill && (Z(n.props) || Y(n.props))) {
        var t = G(e);
        Y(n.props) && n.setInputValue(t, !1), n.setState({
          value: [t],
          backfillValue: t
        });
      }
    }, n.filterOption = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ue,
        i = n.state.value,
        o = i[i.length - 1];
      if (!e || o && o === n.state.backfillValue) return !0;
      var a = n.props.filterOption;
      return "filterOption" in n.props ? !0 === a && (a = r.bind(Ue(n))) : a = r.bind(Ue(n)), !a || ("function" === typeof a ? a.call(Ue(n), e, t) : !t.props.disabled);
    }, n.timeoutFocus = function () {
      var e = n.props.onFocus;
      n.focusTimer && n.clearFocusTime(), n.focusTimer = window.setTimeout(function () {
        e && e();
      }, 10);
    }, n.clearFocusTime = function () {
      n.focusTimer && (clearTimeout(n.focusTimer), n.focusTimer = null);
    }, n.clearBlurTime = function () {
      n.blurTimer && (clearTimeout(n.blurTimer), n.blurTimer = null);
    }, n.clearComboboxTime = function () {
      n.comboboxTimer && (clearTimeout(n.comboboxTimer), n.comboboxTimer = null);
    }, n.updateFocusClassName = function () {
      var e = n.rootRef,
        t = n.props;
      n._focused ? A()(e).add("".concat(t.prefixCls, "-focused")) : A()(e).remove("".concat(t.prefixCls, "-focused"));
    }, n.maybeFocus = function (e, t) {
      if (t || e) {
        var r = n.getInputDOMNode(),
          i = document,
          o = i.activeElement;
        r && (e || Q(n.props)) ? o !== r && (r.focus(), n._focused = !0) : o !== n.selectionRef && n.selectionRef && (n.selectionRef.focus(), n._focused = !0);
      }
    }, n.removeSelected = function (e, t) {
      var r = n.props;
      if (!r.disabled && !n.isChildDisabled(e)) {
        t && t.stopPropagation && t.stopPropagation();
        var i = n.state.value,
          o = i.filter(function (t) {
            return t !== e;
          }),
          a = X(r);
        if (a) {
          var s = e;
          r.labelInValue && (s = {
            key: e,
            label: n.getLabelBySingleValue(e)
          }), r.onDeselect && r.onDeselect(s, n.getOptionBySingleValue(e));
        }
        n.fireChange(o);
      }
    }, n.openIfHasChildren = function () {
      var e = n.props;
      (r["Children"].count(e.children) || Z(e)) && n.setOpenState(!0);
    }, n.fireSelect = function (e) {
      n.props.onSelect && n.props.onSelect(n.getVLBySingleValue(e), n.getOptionBySingleValue(e));
    }, n.fireChange = function (e) {
      var t = n.props;
      "value" in t || n.setState({
        value: e
      }, n.forcePopupAlign);
      var r = n.getVLForOnChange(e),
        i = n.getOptionsBySingleValue(e);
      t.onChange && t.onChange(r, X(n.props) ? i : i[0]);
    }, n.isChildDisabled = function (e) {
      return R(n.props.children).some(function (t) {
        var n = G(t);
        return n === e && t.props && t.props.disabled;
      });
    }, n.forcePopupAlign = function () {
      n.state.open && n.selectTriggerRef && n.selectTriggerRef.triggerRef && n.selectTriggerRef.triggerRef.forcePopupAlign();
    }, n.renderFilterOptions = function () {
      var e = n.state.inputValue,
        t = n.props,
        i = t.children,
        o = t.tags,
        a = t.notFoundContent,
        s = [],
        l = [],
        c = !1,
        u = n.renderFilterOptionsFromChildren(i, l, s);
      if (o) {
        var h = n.state.value;
        h = h.filter(function (t) {
          return -1 === l.indexOf(t) && (!e || String(t).indexOf(String(e)) > -1);
        }), h.sort(function (e, t) {
          return e.length - t.length;
        }), h.forEach(function (e) {
          var t = e,
            n = r["createElement"](j["b"], {
              style: oe,
              role: "option",
              attribute: ae,
              value: t,
              key: t
            }, t);
          u.push(n), s.push(n);
        }), e && s.every(function (t) {
          return G(t) !== e;
        }) && u.unshift(r["createElement"](j["b"], {
          style: oe,
          role: "option",
          attribute: ae,
          value: e,
          key: e
        }, e));
      }
      return !u.length && a && (c = !0, u = [r["createElement"](j["b"], {
        style: oe,
        attribute: ae,
        disabled: !0,
        role: "option",
        value: "NOT_FOUND",
        key: "NOT_FOUND"
      }, a)]), {
        empty: c,
        options: u
      };
    }, n.renderFilterOptionsFromChildren = function (e, t, i) {
      var o = [],
        a = n.props,
        s = n.state.inputValue,
        l = a.tags;
      return r["Children"].forEach(e, function (e) {
        if (e) {
          var a = e.type;
          if (a.isSelectOptGroup) {
            var c = e.props.label,
              u = e.key;
            if (u || "string" !== typeof c ? !c && u && (c = u) : u = c, s && n.filterOption(s, e)) {
              var h = R(e.props.children).map(function (e) {
                var t = G(e) || e.key;
                return r["createElement"](j["b"], $e({
                  key: t,
                  value: t
                }, e.props));
              });
              o.push(r["createElement"](j["c"], {
                key: u,
                title: c
              }, h));
            } else {
              var f = n.renderFilterOptionsFromChildren(e.props.children, t, i);
              f.length && o.push(r["createElement"](j["c"], {
                key: u,
                title: c
              }, f));
            }
          } else {
            F()(a.isSelectOption, "the children of `Select` should be `Select.Option` or `Select.OptGroup`, " + "instead of `".concat(a.name || a.displayName || e.type, "`."));
            var d = G(e);
            if (he(d, n.props), n.filterOption(s, e)) {
              var p = r["createElement"](j["b"], $e({
                style: oe,
                attribute: ae,
                value: d,
                key: d,
                role: "option"
              }, e.props));
              o.push(p), i.push(p);
            }
            l && t.push(d);
          }
        }
      }), o;
    }, n.renderTopControlNode = function () {
      var e = n.state,
        t = e.open,
        i = e.inputValue,
        o = n.state.value,
        a = n.props,
        s = a.choiceTransitionName,
        l = a.prefixCls,
        c = a.maxTagTextLength,
        u = a.maxTagCount,
        h = a.showSearch,
        f = a.removeIcon,
        d = a.maxTagPlaceholder,
        p = "".concat(l, "-selection__rendered"),
        m = null;
      if (Z(a)) {
        var g = null;
        if (o.length) {
          var v = !1,
            y = 1;
          h && t ? (v = !i, v && (y = .4)) : v = !0;
          var b = o[0],
            w = n.getOptionInfoBySingleValue(b),
            x = w.label,
            _ = w.title;
          g = r["createElement"]("div", {
            key: "value",
            className: "".concat(l, "-selection-selected-value"),
            title: z(_ || x),
            style: {
              display: v ? "block" : "none",
              opacity: y
            }
          }, x);
        }
        m = h ? [g, r["createElement"]("div", {
          className: "".concat(l, "-search ").concat(l, "-search--inline"),
          key: "input",
          style: {
            display: t ? "block" : "none"
          }
        }, n.getInputElement())] : [g];
      } else {
        var E,
          S = [],
          k = o;
        if (void 0 !== u && o.length > u) {
          k = k.slice(0, u);
          var C = n.getVLForOnChange(o.slice(u, o.length)),
            O = "+ ".concat(o.length - u, " ...");
          d && (O = "function" === typeof d ? d(C) : d), E = r["createElement"]("li", $e({
            style: oe
          }, ae, {
            role: "presentation",
            onMouseDown: te,
            className: "".concat(l, "-selection__choice ").concat(l, "-selection__choice__disabled"),
            key: "maxTagPlaceholder",
            title: z(O)
          }), r["createElement"]("div", {
            className: "".concat(l, "-selection__choice__content")
          }, O));
        }
        X(a) && (S = k.map(function (e) {
          var t = n.getOptionInfoBySingleValue(e),
            i = t.label,
            o = t.title || i;
          c && "string" === typeof i && i.length > c && (i = "".concat(i.slice(0, c), "..."));
          var a = n.isChildDisabled(e),
            s = a ? "".concat(l, "-selection__choice ").concat(l, "-selection__choice__disabled") : "".concat(l, "-selection__choice");
          return r["createElement"]("li", $e({
            style: oe
          }, ae, {
            onMouseDown: te,
            className: s,
            role: "presentation",
            key: e || Ke,
            title: z(o)
          }), r["createElement"]("div", {
            className: "".concat(l, "-selection__choice__content")
          }, i), a ? null : r["createElement"]("span", {
            onClick: function (t) {
              n.removeSelected(e, t);
            },
            className: "".concat(l, "-selection__choice__remove")
          }, f || r["createElement"]("i", {
            className: "".concat(l, "-selection__choice__remove-icon")
          }, "\xd7")));
        })), E && S.push(E), S.push(r["createElement"]("li", {
          className: "".concat(l, "-search ").concat(l, "-search--inline"),
          key: "__input"
        }, n.getInputElement())), m = X(a) && s ? r["createElement"](P["a"], {
          onLeave: n.onChoiceAnimationLeave,
          component: "ul",
          transitionName: s
        }, S) : r["createElement"]("ul", null, S);
      }
      return r["createElement"]("div", {
        className: p,
        ref: n.saveTopCtrlRef
      }, n.getPlaceholderElement(), m);
    };
    var i = t.getOptionsInfoFromProps(e);
    if (e.tags && "function" !== typeof e.filterOption) {
      var o = Object.keys(i).some(function (e) {
        return i[e].disabled;
      });
      F()(!o, "Please avoid setting option to disabled in tags mode since user can always type text as tag.");
    }
    return n.state = {
      value: t.getValueFromProps(e, !0),
      inputValue: e.combobox ? t.getInputValueForCombobox(e, i, !0) : "",
      open: e.defaultOpen,
      optionsInfo: i,
      backfillValue: "",
      skipBuildOptionsInfo: !0,
      ariaId: ""
    }, n.saveInputRef = fe(Ue(n), "inputRef"), n.saveInputMirrorRef = fe(Ue(n), "inputMirrorRef"), n.saveTopCtrlRef = fe(Ue(n), "topCtrlRef"), n.saveSelectTriggerRef = fe(Ue(n), "selectTriggerRef"), n.saveRootRef = fe(Ue(n), "rootRef"), n.saveSelectionRef = fe(Ue(n), "selectionRef"), n;
  }
  return ze(t, e), Ve(t, [{
    key: "componentDidMount",
    value: function () {
      (this.props.autoFocus || this.state.open) && this.focus(), this.setState({
        ariaId: de()
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      if (X(this.props)) {
        var e = this.getInputDOMNode(),
          t = this.getInputMirrorDOMNode();
        e && e.value && t ? (e.style.width = "", e.style.width = "".concat(t.clientWidth, "px")) : e && (e.style.width = "");
      }
      this.forcePopupAlign();
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.clearFocusTime(), this.clearBlurTime(), this.clearComboboxTime(), this.dropdownContainer && (D["unmountComponentAtNode"](this.dropdownContainer), document.body.removeChild(this.dropdownContainer), this.dropdownContainer = null);
    }
  }, {
    key: "focus",
    value: function () {
      Z(this.props) && this.selectionRef ? this.selectionRef.focus() : this.getInputDOMNode() && this.getInputDOMNode().focus();
    }
  }, {
    key: "blur",
    value: function () {
      Z(this.props) && this.selectionRef ? this.selectionRef.blur() : this.getInputDOMNode() && this.getInputDOMNode().blur();
    }
  }, {
    key: "renderArrow",
    value: function (e) {
      var t = this.props,
        n = t.showArrow,
        i = void 0 === n ? !e : n,
        o = t.loading,
        a = t.inputIcon,
        s = t.prefixCls;
      if (!i && !o) return null;
      var l = o ? r["createElement"]("i", {
        className: "".concat(s, "-arrow-loading")
      }) : r["createElement"]("i", {
        className: "".concat(s, "-arrow-icon")
      });
      return r["createElement"]("span", $e({
        key: "arrow",
        className: "".concat(s, "-arrow"),
        style: oe
      }, ae, {
        onClick: this.onArrowClick
      }), a || l);
    }
  }, {
    key: "renderClear",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.allowClear,
        i = e.clearIcon,
        o = this.state.inputValue,
        a = this.state.value,
        s = r["createElement"]("span", $e({
          key: "clear",
          className: "".concat(t, "-selection__clear"),
          onMouseDown: te,
          style: oe
        }, ae, {
          onClick: this.onClearSelection
        }), i || r["createElement"]("i", {
          className: "".concat(t, "-selection__clear-icon")
        }, "\xd7"));
      return n ? Y(this.props) ? o ? s : null : o || a.length ? s : null : null;
    }
  }, {
    key: "render",
    value: function () {
      var e,
        t = this.props,
        n = X(t),
        i = t.showArrow,
        o = void 0 === i || i,
        a = this.state,
        s = t.className,
        l = t.disabled,
        c = t.prefixCls,
        u = t.loading,
        h = this.renderTopControlNode(),
        f = this.state,
        d = f.open,
        p = f.ariaId;
      if (d) {
        var m = this.renderFilterOptions();
        this._empty = m.empty, this._options = m.options;
      }
      var g = this.getRealOpenState(),
        v = this._empty,
        y = this._options || [],
        b = {};
      Object.keys(t).forEach(function (e) {
        !Object.prototype.hasOwnProperty.call(t, e) || "data-" !== e.substr(0, 5) && "aria-" !== e.substr(0, 5) && "role" !== e || (b[e] = t[e]);
      });
      var w = $e({}, b);
      Q(t) || (w = $e($e({}, w), {
        onKeyDown: this.onKeyDown,
        tabIndex: t.disabled ? -1 : t.tabIndex
      }));
      var x = (e = {}, Ie(e, s, !!s), Ie(e, c, 1), Ie(e, "".concat(c, "-open"), d), Ie(e, "".concat(c, "-focused"), d || !!this._focused), Ie(e, "".concat(c, "-combobox"), Y(t)), Ie(e, "".concat(c, "-disabled"), l), Ie(e, "".concat(c, "-enabled"), !l), Ie(e, "".concat(c, "-allow-clear"), !!t.allowClear), Ie(e, "".concat(c, "-no-arrow"), !o), Ie(e, "".concat(c, "-loading"), !!u), e);
      return r["createElement"](De, {
        onPopupFocus: this.onPopupFocus,
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        dropdownAlign: t.dropdownAlign,
        dropdownClassName: t.dropdownClassName,
        dropdownMatchSelectWidth: t.dropdownMatchSelectWidth,
        defaultActiveFirstOption: t.defaultActiveFirstOption,
        dropdownMenuStyle: t.dropdownMenuStyle,
        transitionName: t.transitionName,
        animation: t.animation,
        prefixCls: t.prefixCls,
        dropdownStyle: t.dropdownStyle,
        combobox: t.combobox,
        showSearch: t.showSearch,
        options: y,
        empty: v,
        multiple: n,
        disabled: l,
        visible: g,
        inputValue: a.inputValue,
        value: a.value,
        backfillValue: a.backfillValue,
        firstActiveValue: t.firstActiveValue,
        onDropdownVisibleChange: this.onDropdownVisibleChange,
        getPopupContainer: t.getPopupContainer,
        onMenuSelect: this.onMenuSelect,
        onMenuDeselect: this.onMenuDeselect,
        onPopupScroll: t.onPopupScroll,
        showAction: t.showAction,
        ref: this.saveSelectTriggerRef,
        menuItemSelectedIcon: t.menuItemSelectedIcon,
        dropdownRender: t.dropdownRender,
        ariaId: p
      }, r["createElement"]("div", {
        id: t.id,
        style: t.style,
        ref: this.saveRootRef,
        onBlur: this.onOuterBlur,
        onFocus: this.onOuterFocus,
        className: T()(x),
        onMouseDown: this.markMouseDown,
        onMouseUp: this.markMouseLeave,
        onMouseOut: this.markMouseLeave
      }, r["createElement"]("div", $e({
        ref: this.saveSelectionRef,
        key: "selection",
        className: "".concat(c, "-selection\n            ").concat(c, "-selection--").concat(n ? "multiple" : "single"),
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-haspopup": "true",
        "aria-controls": p,
        "aria-expanded": g
      }, w), h, this.renderClear(), this.renderArrow(!!n))));
    }
  }]), t;
}(r["Component"]);
Qe.propTypes = C, Qe.defaultProps = {
  prefixCls: "rc-select",
  defaultOpen: !1,
  labelInValue: !1,
  defaultActiveFirstOption: !0,
  showSearch: !0,
  allowClear: !1,
  placeholder: "",
  onChange: Ye,
  onFocus: Ye,
  onBlur: Ye,
  onSelect: Ye,
  onSearch: Ye,
  onDeselect: Ye,
  onInputKeyDown: Ye,
  dropdownMatchSelectWidth: !0,
  dropdownStyle: {},
  dropdownMenuStyle: {},
  optionFilterProp: "value",
  optionLabelProp: "value",
  notFoundContent: "Not Found",
  backfill: !1,
  showAction: ["click"],
  tokenSeparators: [],
  autoClearSearchValue: !0,
  tabIndex: 0,
  dropdownRender: function (e) {
    return e;
  }
}, Qe.getDerivedStateFromProps = function (e, t) {
  var n = t.skipBuildOptionsInfo ? t.optionsInfo : Qe.getOptionsInfoFromProps(e, t),
    r = {
      optionsInfo: n,
      skipBuildOptionsInfo: !1
    };
  if ("open" in e && (r.open = e.open), e.disabled && t.open && (r.open = !1), "value" in e) {
    var i = Qe.getValueFromProps(e);
    r.value = i, e.combobox && (r.inputValue = Qe.getInputValueForCombobox(e, n));
  }
  return r;
}, Qe.getOptionsFromChildren = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
  return r["Children"].forEach(e, function (e) {
    if (e) {
      var n = e.type;
      n.isSelectOptGroup ? Qe.getOptionsFromChildren(e.props.children, t) : t.push(e);
    }
  }), t;
}, Qe.getInputValueForCombobox = function (e, t, n) {
  var r = [];
  if ("value" in e && !n && (r = J(e.value)), "defaultValue" in e && n && (r = J(e.defaultValue)), !r.length) return "";
  r = r[0];
  var i = r;
  return e.labelInValue ? i = r.label : t[ee(r)] && (i = t[ee(r)].label), void 0 === i && (i = ""), i;
}, Qe.getLabelFromOption = function (e, t) {
  return q(t, e.optionLabelProp);
}, Qe.getOptionsInfoFromProps = function (e, t) {
  var n = Qe.getOptionsFromChildren(e.children),
    r = {};
  if (n.forEach(function (t) {
    var n = G(t);
    r[ee(n)] = {
      option: t,
      value: n,
      label: Qe.getLabelFromOption(e, t),
      title: t.props.title,
      disabled: t.props.disabled
    };
  }), t) {
    var i = t.optionsInfo,
      o = t.value;
    o && o.forEach(function (e) {
      var t = ee(e);
      r[t] || void 0 === i[t] || (r[t] = i[t]);
    });
  }
  return r;
}, Qe.getValueFromProps = function (e, t) {
  var n = [];
  return "value" in e && !t && (n = J(e.value)), "defaultValue" in e && t && (n = J(e.defaultValue)), e.labelInValue && (n = n.map(function (e) {
    return e.key;
  })), n;
}, Qe.displayName = "Select", Object(I["polyfill"])(Qe);
var Ze = Qe;
defineExport(legacyExports, "b", function () {
  return b;
}), defineExport(legacyExports, "a", function () {
  return h;
}), Ze.Option = b, Ze.OptGroup = h;
legacyExports["c"] = Ze;
