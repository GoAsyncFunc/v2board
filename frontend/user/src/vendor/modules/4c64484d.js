let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./reactRuntime.js"),
  o = interopDefault(r);
function i(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function a(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? s(e) : t;
}
function s(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function c(e) {
  return c = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, c(e);
}
function u(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && l(e, t);
}
function l(e, t) {
  return l = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, l(e, t);
}
var f = function (e) {
  function t() {
    return i(this, t), a(this, c(t).apply(this, arguments));
  }
  return u(t, e), t;
}(r["Component"]);
f.isSelectOptGroup = !0;
var p = require("./propTypesRuntime.js");
function d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? m(e) : t;
}
function m(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function v(e) {
  return v = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, v(e);
}
function y(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && g(e, t);
}
function g(e, t) {
  return g = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, g(e, t);
}
var b = function (e) {
  function t() {
    return d(this, t), h(this, v(t).apply(this, arguments));
  }
  return y(t, e), t;
}(r["Component"]);
function w(e) {
  return E(e) || O(e) || x();
}
function x() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function O(e) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
}
function E(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function _() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var r = t[0],
    o = t[1],
    i = t[2],
    a = t.slice(3),
    s = p["oneOfType"]([p["string"], p["number"]]),
    c = p["shape"]({
      key: s.isRequired,
      label: p["node"]
    });
  if (!r.labelInValue) {
    if (("multiple" === r.mode || "tags" === r.mode || r.multiple || r.tags) && "" === r[o]) return new Error("Invalid prop `".concat(o, "` of type `string` supplied to `").concat(i, "`, ") + "expected `array` when `multiple` or `tags` is `true`.");
    var u = p["oneOfType"]([p["arrayOf"](s), s]);
    return u.apply(void 0, [r, o, i].concat(w(a)));
  }
  var l = p["oneOfType"]([p["arrayOf"](c), c]),
    f = l.apply(void 0, [r, o, i].concat(w(a)));
  return f ? new Error("Invalid prop `".concat(o, "` supplied to `").concat(i, "`, ") + "when you set `labelInValue` to `true`, `".concat(o, "` should in ") + "shape of `{ key: string | number, label?: ReactNode }`.") : null;
}
b.propTypes = {
  value: p["oneOfType"]([p["string"], p["number"]])
}, b.isSelectOption = !0;
var k = {
    id: p["string"],
    defaultActiveFirstOption: p["bool"],
    multiple: p["bool"],
    filterOption: p["any"],
    children: p["any"],
    showSearch: p["bool"],
    disabled: p["bool"],
    allowClear: p["bool"],
    showArrow: p["bool"],
    tags: p["bool"],
    prefixCls: p["string"],
    className: p["string"],
    transitionName: p["string"],
    optionLabelProp: p["string"],
    optionFilterProp: p["string"],
    animation: p["string"],
    choiceTransitionName: p["string"],
    open: p["bool"],
    defaultOpen: p["bool"],
    onChange: p["func"],
    onBlur: p["func"],
    onFocus: p["func"],
    onSelect: p["func"],
    onSearch: p["func"],
    onPopupScroll: p["func"],
    onMouseEnter: p["func"],
    onMouseLeave: p["func"],
    onInputKeyDown: p["func"],
    placeholder: p["any"],
    onDeselect: p["func"],
    labelInValue: p["bool"],
    loading: p["bool"],
    value: _,
    defaultValue: _,
    dropdownStyle: p["object"],
    maxTagTextLength: p["number"],
    maxTagCount: p["number"],
    maxTagPlaceholder: p["oneOfType"]([p["node"], p["func"]]),
    tokenSeparators: p["arrayOf"](p["string"]),
    getInputElement: p["func"],
    showAction: p["arrayOf"](p["string"]),
    clearIcon: p["node"],
    inputIcon: p["node"],
    removeIcon: p["node"],
    menuItemSelectedIcon: p["oneOfType"]([p["func"], p["node"]]),
    dropdownRender: p["func"]
  },
  S = k,
  C = require("./classNames.js"),
  j = interopDefault(C),
  P = require("./5046577a.js"),
  T = interopDefault(P),
  L = require("./4d466a32.js"),
  N = require("./316a3577.js"),
  M = require("./reactIsLegacyEntry.js");
function A(e) {
  var t = [];
  return o.a.Children.forEach(e, function (e) {
    void 0 !== e && null !== e && (Array.isArray(e) ? t = t.concat(A(e)) : Object(M["isFragment"])(e) && e.props ? t = t.concat(A(e.props.children)) : t.push(e));
  }), t;
}
var D = require("./34496c57.js"),
  I = require("./reactDomRuntime.js"),
  R = require("./reactLifecyclesCompat.js"),
  F = require("./3257367a.js"),
  V = interopDefault(F),
  z = require("./animationFrameRuntime.js"),
  B = interopDefault(z),
  W = require("./75636958.js"),
  U = require("./scrollIntoViewEntry.js"),
  q = interopDefault(U);
function H(e) {
  return "string" === typeof e ? e : "";
}
function Y(e) {
  if (!e) return null;
  var t = e.props;
  if ("value" in t) return t.value;
  if (e.key) return e.key;
  if (e.type && e.type.isSelectOptGroup && t.label) return t.label;
  throw new Error("Need at least a key or a value or a label (only for OptGroup) for ".concat(e));
}
function G(e, t) {
  return "value" === t ? Y(e) : e.props[t];
}
function K(e) {
  return e.multiple;
}
function Z(e) {
  return e.combobox;
}
function Q(e) {
  return e.multiple || e.tags;
}
function X(e) {
  return Q(e) || Z(e);
}
function J(e) {
  return !X(e);
}
function $(e) {
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
  if (e = $(e), e) for (var r = 0; r < e.length; r++) if (e[r].key === t) {
    n = e[r].label;
    break;
  }
  return n;
}
function oe(e, t) {
  if (null === t || void 0 === t) return [];
  var n = [];
  return o.a.Children.forEach(e, function (e) {
    var r = e.type;
    if (r.isMenuItemGroup) n = n.concat(oe(e.props.children, t));else {
      var o = Y(e),
        i = e.key;
      -1 !== ne(t, o) && i && n.push(i);
    }
  }), n;
}
var ie = {
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
function ce(e, t) {
  for (var n = 0; n < t.length; ++n) if (e.lastIndexOf(t[n]) > 0) return !0;
  return !1;
}
function ue(e, t) {
  var n = new RegExp("[".concat(t.join(), "]"));
  return e.split(n).filter(function (e) {
    return e;
  });
}
function le(e, t) {
  if (t.props.disabled) return !1;
  var n = $(G(t, this.props.optionFilterProp)).join("");
  return n.toLowerCase().indexOf(e.toLowerCase()) > -1;
}
function fe(e, t) {
  if (!J(t) && !K(t) && "string" !== typeof e) throw new Error("Invalid `value` of type `".concat(typeof e, "` supplied to Option, ") + "expected `string` when `tags/combobox` is `true`.");
}
function pe(e, t) {
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
function he() {
  return he = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, he.apply(this, arguments);
}
function me(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ve(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function ye(e, t, n) {
  return t && ve(e.prototype, t), n && ve(e, n), e;
}
function ge(e, t) {
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
  }), t && Oe(e, t);
}
function Oe(e, t) {
  return Oe = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Oe(e, t);
}
var Ee = function (e) {
  function t(e) {
    var n;
    return me(this, t), n = ge(this, be(t).call(this, e)), n.rafInstance = null, n.lastVisible = !1, n.scrollActiveItemToView = function () {
      var e = Object(I["findDOMNode"])(n.firstActiveItem),
        t = n.props,
        r = t.visible,
        o = t.firstActiveValue,
        i = n.props.value;
      if (e && r) {
        var a = {
          onlyScrollIfNeeded: !0
        };
        i && 0 !== i.length || !o || (a.alignWithTop = !0), n.rafInstance = B()(function () {
          q()(e, Object(I["findDOMNode"])(n.menuRef), a);
        });
      }
    }, n.renderMenu = function () {
      var e = n.props,
        t = e.menuItems,
        o = e.menuItemSelectedIcon,
        i = e.defaultActiveFirstOption,
        a = e.prefixCls,
        s = e.multiple,
        c = e.onMenuSelect,
        u = e.inputValue,
        l = e.backfillValue,
        f = e.onMenuDeselect,
        p = e.visible,
        d = n.props.firstActiveValue;
      if (t && t.length) {
        var h = {};
        s ? (h.onDeselect = f, h.onSelect = c) : h.onClick = c;
        var m = n.props.value,
          v = oe(t, m),
          y = {},
          g = i,
          b = t;
        if (v.length || d) {
          p && !n.lastVisible ? y.activeKey = v[0] || d : p || (v[0] && (g = !1), y.activeKey = void 0);
          var w = !1,
            x = function (e) {
              var t = e.key;
              return !w && -1 !== v.indexOf(t) || !w && !v.length && -1 !== d.indexOf(e.key) ? (w = !0, r["cloneElement"](e, {
                ref: function (e) {
                  n.firstActiveItem = e;
                }
              })) : e;
            };
          b = t.map(function (e) {
            if (e.type.isMenuItemGroup) {
              var t = A(e.props.children).map(x);
              return r["cloneElement"](e, {}, t);
            }
            return x(e);
          });
        } else n.firstActiveItem = null;
        var O = m && m[m.length - 1];
        return u === n.lastInputValue || O && O === l || (y.activeKey = ""), r["createElement"](N["e"], he({
          ref: n.saveMenuRef,
          style: n.props.dropdownMenuStyle,
          defaultActiveFirst: g,
          role: "listbox",
          itemIcon: s ? o : null
        }, y, {
          multiple: s
        }, h, {
          selectedKeys: v,
          prefixCls: "".concat(a, "-menu")
        }), b);
      }
      return null;
    }, n.lastInputValue = e.inputValue, n.saveMenuRef = pe(we(n), "menuRef"), n;
  }
  return xe(t, e), ye(t, [{
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
      this.rafInstance && B.a.cancel(this.rafInstance);
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
function _e(e, t, n) {
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
function Se(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Ce(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function je(e, t, n) {
  return t && Ce(e.prototype, t), n && Ce(e, n), e;
}
function Pe(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? Le(e) : t;
}
function Te(e) {
  return Te = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Te(e);
}
function Le(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ne(e, t) {
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
  ariaId: p["string"],
  defaultActiveFirstOption: p["bool"],
  value: p["any"],
  dropdownMenuStyle: p["object"],
  multiple: p["bool"],
  onPopupFocus: p["func"],
  onPopupScroll: p["func"],
  onMenuDeSelect: p["func"],
  onMenuSelect: p["func"],
  prefixCls: p["string"],
  menuItems: p["any"],
  inputValue: p["string"],
  visible: p["bool"],
  firstActiveValue: p["string"],
  menuItemSelectedIcon: p["oneOfType"]([p["func"], p["node"]])
};
var Ae = function (e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var o = 0;
    for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  }
  return n;
};
W["a"].displayName = "Trigger";
var De = {
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
  Ie = function (e) {
    function t(e) {
      var n;
      return Se(this, t), n = Pe(this, Te(t).call(this, e)), n.dropdownMenuRef = null, n.rafInstance = null, n.setDropdownWidth = function () {
        n.cancelRafInstance(), n.rafInstance = B()(function () {
          var e = I["findDOMNode"](Le(n)),
            t = e.offsetWidth;
          t !== n.state.dropdownWidth && n.setState({
            dropdownWidth: t
          });
        });
      }, n.cancelRafInstance = function () {
        n.rafInstance && B.a.cancel(n.rafInstance);
      }, n.getInnerMenu = function () {
        return n.dropdownMenuRef && n.dropdownMenuRef.menuRef;
      }, n.getPopupDOMNode = function () {
        return n.triggerRef.getPopupDomNode();
      }, n.getDropdownElement = function (e) {
        var t = n.props,
          o = t.dropdownRender,
          i = t.ariaId,
          a = r["createElement"](Ee, ke({
            ref: n.saveDropdownMenuRef
          }, e, {
            ariaId: i,
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
        return o ? o(a, t) : null;
      }, n.getDropdownTransitionName = function () {
        var e = n.props,
          t = e.transitionName;
        return !t && e.animation && (t = "".concat(n.getDropdownPrefixCls(), "-").concat(e.animation)), t;
      }, n.getDropdownPrefixCls = function () {
        return "".concat(n.props.prefixCls, "-dropdown");
      }, n.saveDropdownMenuRef = pe(Le(n), "dropdownMenuRef"), n.saveTriggerRef = pe(Le(n), "triggerRef"), n.state = {
        dropdownWidth: 0
      }, n;
    }
    return Ne(t, e), je(t, [{
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
          o = n.onPopupFocus,
          i = n.empty,
          a = Ae(n, ["onPopupFocus", "empty"]),
          s = a.multiple,
          c = a.visible,
          u = a.inputValue,
          l = a.dropdownAlign,
          f = a.disabled,
          p = a.showSearch,
          d = a.dropdownClassName,
          h = a.dropdownStyle,
          m = a.dropdownMatchSelectWidth,
          v = this.getDropdownPrefixCls(),
          y = (e = {}, _e(e, d, !!d), _e(e, "".concat(v, "--").concat(s ? "multiple" : "single"), 1), _e(e, "".concat(v, "--empty"), i), e),
          g = this.getDropdownElement({
            menuItems: a.options,
            onPopupFocus: o,
            multiple: s,
            inputValue: u,
            visible: c
          });
        t = f ? [] : J(a) && !p ? ["click"] : ["blur"];
        var b = ke({}, h),
          w = m ? "width" : "minWidth";
        return this.state.dropdownWidth && (b[w] = "".concat(this.state.dropdownWidth, "px")), r["createElement"](W["a"], ke({}, a, {
          showAction: f ? [] : this.props.showAction,
          hideAction: t,
          ref: this.saveTriggerRef,
          popupPlacement: "bottomLeft",
          builtinPlacements: De,
          prefixCls: v,
          popupTransitionName: this.getDropdownTransitionName(),
          onPopupVisibleChange: a.onDropdownVisibleChange,
          popup: g,
          popupAlign: l,
          popupVisible: c,
          getPopupContainer: a.getPopupContainer,
          popupClassName: j()(y),
          popupStyle: b
        }), a.children);
      }
    }]), t;
  }(r["Component"]);
function Re(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Fe() {
  return Fe = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Fe.apply(this, arguments);
}
function Ve(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ze(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Be(e, t, n) {
  return t && ze(e.prototype, t), n && ze(e, n), e;
}
function We(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? qe(e) : t;
}
function Ue(e) {
  return Ue = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Ue(e);
}
function qe(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function He(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Ye(e, t);
}
function Ye(e, t) {
  return Ye = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Ye(e, t);
}
function Ge(e) {
  return !e || null === e.offsetParent;
}
Ie.defaultProps = {
  dropdownRender: function (e) {
    return e;
  }
}, Ie.propTypes = {
  onPopupFocus: p["func"],
  onPopupScroll: p["func"],
  dropdownMatchSelectWidth: p["bool"],
  dropdownAlign: p["object"],
  visible: p["bool"],
  disabled: p["bool"],
  showSearch: p["bool"],
  dropdownClassName: p["string"],
  multiple: p["bool"],
  inputValue: p["string"],
  filterOption: p["any"],
  options: p["any"],
  prefixCls: p["string"],
  popupClassName: p["string"],
  children: p["any"],
  showAction: p["arrayOf"](p["string"]),
  menuItemSelectedIcon: p["oneOfType"]([p["func"], p["node"]]),
  dropdownRender: p["func"],
  ariaId: p["string"]
}, Ie.displayName = "SelectTrigger";
var Ke = "RC_SELECT_EMPTY_VALUE_KEY",
  Ze = function () {
    return null;
  };
function Qe() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return function () {
    for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
    for (var o = 0; o < t.length; o++) t[o] && "function" === typeof t[o] && t[o].apply(Qe, n);
  };
}
var Xe = function (e) {
  function t(e) {
    var n;
    Ve(this, t), n = We(this, Ue(t).call(this, e)), n.inputRef = null, n.inputMirrorRef = null, n.topCtrlRef = null, n.selectTriggerRef = null, n.rootRef = null, n.selectionRef = null, n.dropdownContainer = null, n.blurTimer = null, n.focusTimer = null, n.comboboxTimer = null, n._focused = !1, n._mouseDown = !1, n._options = [], n._empty = !1, n.onInputChange = function (e) {
      var t = n.props.tokenSeparators,
        r = e.target.value;
      if (Q(n.props) && t.length && ce(r, t)) {
        var o = n.getValueByInput(r);
        return void 0 !== o && n.fireChange(o), n.setOpenState(!1, {
          needFocus: !0
        }), void n.setInputValue("", !1);
      }
      n.setInputValue(r), n.setState({
        open: !0
      }), Z(n.props) && n.fireChange([r]);
    }, n.onDropdownVisibleChange = function (e) {
      e && !n._focused && (n.clearBlurTime(), n.timeoutFocus(), n._focused = !0, n.updateFocusClassName()), n.setOpenState(e);
    }, n.onKeyDown = function (e) {
      var t = n.state.open,
        r = n.props.disabled;
      if (!r) {
        var o = e.keyCode;
        t && !n.getInputDOMNode() ? n.onInputKeyDown(e) : o === D["a"].ENTER || o === D["a"].DOWN ? (t || n.setOpenState(!0), e.preventDefault()) : o === D["a"].SPACE && (t || (n.setOpenState(!0), e.preventDefault()));
      }
    }, n.onInputKeyDown = function (e) {
      var t = n.props,
        r = t.disabled,
        o = t.combobox,
        i = t.defaultActiveFirstOption;
      if (!r) {
        var a = n.state,
          s = n.getRealOpenState(a),
          c = e.keyCode;
        if (!Q(n.props) || e.target.value || c !== D["a"].BACKSPACE) {
          if (c === D["a"].DOWN) {
            if (!a.open) return n.openIfHasChildren(), e.preventDefault(), void e.stopPropagation();
          } else if (c === D["a"].ENTER && a.open) !s && o || e.preventDefault(), s && o && !1 === i && (n.comboboxTimer = setTimeout(function () {
            n.setOpenState(!1);
          }));else if (c === D["a"].ESC) return void (a.open && (n.setOpenState(!1), e.preventDefault(), e.stopPropagation()));
          if (s && n.selectTriggerRef) {
            var u = n.selectTriggerRef.getInnerMenu();
            u && u.onKeyDown(e, n.handleBackfill) && (e.preventDefault(), e.stopPropagation());
          }
        } else {
          e.preventDefault();
          var l = a.value;
          l.length && n.removeSelected(l[l.length - 1]);
        }
      }
    }, n.onMenuSelect = function (e) {
      var t = e.item;
      if (t) {
        var r = n.state.value,
          o = n.props,
          i = Y(t),
          a = r[r.length - 1],
          s = !1;
        if (Q(o) ? -1 !== ne(r, i) ? s = !0 : r = r.concat([i]) : Z(o) || void 0 === a || a !== i || i === n.state.backfillValue ? (r = [i], n.setOpenState(!1, {
          needFocus: !0,
          fireSearch: !1
        })) : (n.setOpenState(!1, {
          needFocus: !0,
          fireSearch: !1
        }), s = !0), s || n.fireChange(r), n.fireSelect(i), !s) {
          var c = Z(o) ? G(t, o.optionLabelProp) : "";
          o.autoClearSearchValue && n.setInputValue(c, !1);
        }
      }
    }, n.onMenuDeselect = function (e) {
      var t = e.item,
        r = e.domEvent;
      if ("keydown" !== r.type || r.keyCode !== D["a"].ENTER) {
        "click" === r.type && n.removeSelected(Y(t));
        var o = n.props;
        o.autoClearSearchValue && n.setInputValue("");
      } else {
        var i = I["findDOMNode"](t);
        Ge(i) || n.removeSelected(Y(t));
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
        t && e.target === n.rootRef || (X(n.props) || e.target !== t) && (n._focused || (n._focused = !0, n.updateFocusClassName(), Q(n.props) && n._mouseDown || n.timeoutFocus()));
      }
    }, n.onPopupFocus = function () {
      n.maybeFocus(!0, !0);
    }, n.onOuterBlur = function (e) {
      n.props.disabled ? e.preventDefault() : n.blurTimer = window.setTimeout(function () {
        n._focused = !1, n.updateFocusClassName();
        var e = n.props,
          t = n.state.value,
          r = n.state.inputValue;
        if (J(e) && e.showSearch && r && e.defaultActiveFirstOption) {
          var o = n._options || [];
          if (o.length) {
            var i = se(o);
            i && (t = [Y(i)], n.fireChange(t));
          }
        } else if (Q(e) && r) {
          n._mouseDown ? n.setInputValue("") : (n.state.inputValue = "", n.getInputDOMNode && n.getInputDOMNode() && (n.getInputDOMNode().value = ""));
          var a = n.getValueByInput(r);
          void 0 !== a && (t = a, n.fireChange(t));
        }
        if (Q(e) && n._mouseDown) return n.maybeFocus(!0, !0), void (n._mouseDown = !1);
        n.setOpenState(!1), e.onBlur && e.onBlur(n.getVLForOnChange(t));
      }, 10);
    }, n.onClearSelection = function (e) {
      var t = n.props,
        r = n.state;
      if (!t.disabled) {
        var o = r.inputValue,
          i = r.value;
        e.stopPropagation(), (o || i.length) && (i.length && n.fireChange([]), n.setOpenState(!1, {
          needFocus: !0
        }), o && n.setInputValue(""));
      }
    }, n.onChoiceAnimationLeave = function () {
      n.forcePopupAlign();
    }, n.getOptionInfoBySingleValue = function (e, t) {
      var o;
      if (t = t || n.state.optionsInfo, t[ee(e)] && (o = t[ee(e)]), o) return o;
      var i = e;
      if (n.props.labelInValue) {
        var a = re(n.props.value, e),
          s = re(n.props.defaultValue, e);
        void 0 !== a ? i = a : void 0 !== s && (i = s);
      }
      var c = {
        option: r["createElement"](b, {
          value: e,
          key: e
        }, e),
        value: e,
        label: i
      };
      return c;
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
        var o = n.state.optionsInfo[r],
          i = o.disabled;
        if (!i) {
          var a = $(o.label);
          a && a.join("") === e && (t = o.value);
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
      }), Q(n.props) ? t : t[0]) : t;
    }, n.getLabelBySingleValue = function (e, t) {
      var r = n.getOptionInfoBySingleValue(e, t),
        o = r.label;
      return o;
    }, n.getDropdownContainer = function () {
      return n.dropdownContainer || (n.dropdownContainer = document.createElement("div"), document.body.appendChild(n.dropdownContainer)), n.dropdownContainer;
    }, n.getPlaceholderElement = function () {
      var e = n.props,
        t = n.state,
        o = !1;
      t.inputValue && (o = !0);
      var i = t.value;
      i.length && (o = !0), Z(e) && 1 === i.length && t.value && !t.value[0] && (o = !1);
      var a = e.placeholder;
      return a ? r["createElement"]("div", Fe({
        onMouseDown: te,
        style: Fe({
          display: o ? "none" : "block"
        }, ie)
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
        o = e.getInputElement ? e.getInputElement() : t,
        i = j()(o.props.className, Re({}, "".concat(e.prefixCls, "-search__field"), !0));
      return r["createElement"]("div", {
        className: "".concat(e.prefixCls, "-search__field__wrap")
      }, r["cloneElement"](o, {
        ref: n.saveInputRef,
        onChange: n.onInputChange,
        onKeyDown: Qe(n.onInputKeyDown, o.props.onKeyDown, n.props.onInputKeyDown),
        value: n.state.inputValue,
        disabled: e.disabled,
        className: i
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
        o = t.fireSearch,
        i = n.props,
        a = n.state;
      if (a.open !== e) {
        n.props.onDropdownVisibleChange && n.props.onDropdownVisibleChange(e);
        var s = {
          open: e,
          backfillValue: ""
        };
        !e && J(i) && i.showSearch && n.setInputValue("", o), e || n.maybeFocus(e, !!r), n.setState(Fe({
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
        o = t.tokenSeparators,
        i = n.state.value,
        a = !1;
      return ue(e, o).forEach(function (e) {
        var t = [e];
        if (r) {
          var o = n.getValueByLabel(e);
          o && -1 === ne(i, o) && (i = i.concat(o), a = !0, n.fireSelect(o));
        } else -1 === ne(i, e) && (i = i.concat(t), a = !0, n.fireSelect(e));
      }), a ? i : void 0;
    }, n.getRealOpenState = function (e) {
      var t = n.props.open;
      if ("boolean" === typeof t) return t;
      var r = (e || n.state).open,
        o = n._options || [];
      return !X(n.props) && n.props.showSearch || r && !o.length && (r = !1), r;
    }, n.markMouseDown = function () {
      n._mouseDown = !0;
    }, n.markMouseLeave = function () {
      n._mouseDown = !1;
    }, n.handleBackfill = function (e) {
      if (n.props.backfill && (J(n.props) || Z(n.props))) {
        var t = Y(e);
        Z(n.props) && n.setInputValue(t, !1), n.setState({
          value: [t],
          backfillValue: t
        });
      }
    }, n.filterOption = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : le,
        o = n.state.value,
        i = o[o.length - 1];
      if (!e || i && i === n.state.backfillValue) return !0;
      var a = n.props.filterOption;
      return "filterOption" in n.props ? !0 === a && (a = r.bind(qe(n))) : a = r.bind(qe(n)), !a || ("function" === typeof a ? a.call(qe(n), e, t) : !t.props.disabled);
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
      n._focused ? T()(e).add("".concat(t.prefixCls, "-focused")) : T()(e).remove("".concat(t.prefixCls, "-focused"));
    }, n.maybeFocus = function (e, t) {
      if (t || e) {
        var r = n.getInputDOMNode(),
          o = document,
          i = o.activeElement;
        r && (e || X(n.props)) ? i !== r && (r.focus(), n._focused = !0) : i !== n.selectionRef && n.selectionRef && (n.selectionRef.focus(), n._focused = !0);
      }
    }, n.removeSelected = function (e, t) {
      var r = n.props;
      if (!r.disabled && !n.isChildDisabled(e)) {
        t && t.stopPropagation && t.stopPropagation();
        var o = n.state.value,
          i = o.filter(function (t) {
            return t !== e;
          }),
          a = Q(r);
        if (a) {
          var s = e;
          r.labelInValue && (s = {
            key: e,
            label: n.getLabelBySingleValue(e)
          }), r.onDeselect && r.onDeselect(s, n.getOptionBySingleValue(e));
        }
        n.fireChange(i);
      }
    }, n.openIfHasChildren = function () {
      var e = n.props;
      (r["Children"].count(e.children) || J(e)) && n.setOpenState(!0);
    }, n.fireSelect = function (e) {
      n.props.onSelect && n.props.onSelect(n.getVLBySingleValue(e), n.getOptionBySingleValue(e));
    }, n.fireChange = function (e) {
      var t = n.props;
      "value" in t || n.setState({
        value: e
      }, n.forcePopupAlign);
      var r = n.getVLForOnChange(e),
        o = n.getOptionsBySingleValue(e);
      t.onChange && t.onChange(r, Q(n.props) ? o : o[0]);
    }, n.isChildDisabled = function (e) {
      return A(n.props.children).some(function (t) {
        var n = Y(t);
        return n === e && t.props && t.props.disabled;
      });
    }, n.forcePopupAlign = function () {
      n.state.open && n.selectTriggerRef && n.selectTriggerRef.triggerRef && n.selectTriggerRef.triggerRef.forcePopupAlign();
    }, n.renderFilterOptions = function () {
      var e = n.state.inputValue,
        t = n.props,
        o = t.children,
        i = t.tags,
        a = t.notFoundContent,
        s = [],
        c = [],
        u = !1,
        l = n.renderFilterOptionsFromChildren(o, c, s);
      if (i) {
        var f = n.state.value;
        f = f.filter(function (t) {
          return -1 === c.indexOf(t) && (!e || String(t).indexOf(String(e)) > -1);
        }), f.sort(function (e, t) {
          return e.length - t.length;
        }), f.forEach(function (e) {
          var t = e,
            n = r["createElement"](N["b"], {
              style: ie,
              role: "option",
              attribute: ae,
              value: t,
              key: t
            }, t);
          l.push(n), s.push(n);
        }), e && s.every(function (t) {
          return Y(t) !== e;
        }) && l.unshift(r["createElement"](N["b"], {
          style: ie,
          role: "option",
          attribute: ae,
          value: e,
          key: e
        }, e));
      }
      return !l.length && a && (u = !0, l = [r["createElement"](N["b"], {
        style: ie,
        attribute: ae,
        disabled: !0,
        role: "option",
        value: "NOT_FOUND",
        key: "NOT_FOUND"
      }, a)]), {
        empty: u,
        options: l
      };
    }, n.renderFilterOptionsFromChildren = function (e, t, o) {
      var i = [],
        a = n.props,
        s = n.state.inputValue,
        c = a.tags;
      return r["Children"].forEach(e, function (e) {
        if (e) {
          var a = e.type;
          if (a.isSelectOptGroup) {
            var u = e.props.label,
              l = e.key;
            if (l || "string" !== typeof u ? !u && l && (u = l) : l = u, s && n.filterOption(s, e)) {
              var f = A(e.props.children).map(function (e) {
                var t = Y(e) || e.key;
                return r["createElement"](N["b"], Fe({
                  key: t,
                  value: t
                }, e.props));
              });
              i.push(r["createElement"](N["c"], {
                key: l,
                title: u
              }, f));
            } else {
              var p = n.renderFilterOptionsFromChildren(e.props.children, t, o);
              p.length && i.push(r["createElement"](N["c"], {
                key: l,
                title: u
              }, p));
            }
          } else {
            V()(a.isSelectOption, "the children of `Select` should be `Select.Option` or `Select.OptGroup`, " + "instead of `".concat(a.name || a.displayName || e.type, "`."));
            var d = Y(e);
            if (fe(d, n.props), n.filterOption(s, e)) {
              var h = r["createElement"](N["b"], Fe({
                style: ie,
                attribute: ae,
                value: d,
                key: d,
                role: "option"
              }, e.props));
              i.push(h), o.push(h);
            }
            c && t.push(d);
          }
        }
      }), i;
    }, n.renderTopControlNode = function () {
      var e = n.state,
        t = e.open,
        o = e.inputValue,
        i = n.state.value,
        a = n.props,
        s = a.choiceTransitionName,
        c = a.prefixCls,
        u = a.maxTagTextLength,
        l = a.maxTagCount,
        f = a.showSearch,
        p = a.removeIcon,
        d = a.maxTagPlaceholder,
        h = "".concat(c, "-selection__rendered"),
        m = null;
      if (J(a)) {
        var v = null;
        if (i.length) {
          var y = !1,
            g = 1;
          f && t ? (y = !o, y && (g = .4)) : y = !0;
          var b = i[0],
            w = n.getOptionInfoBySingleValue(b),
            x = w.label,
            O = w.title;
          v = r["createElement"]("div", {
            key: "value",
            className: "".concat(c, "-selection-selected-value"),
            title: H(O || x),
            style: {
              display: y ? "block" : "none",
              opacity: g
            }
          }, x);
        }
        m = f ? [v, r["createElement"]("div", {
          className: "".concat(c, "-search ").concat(c, "-search--inline"),
          key: "input",
          style: {
            display: t ? "block" : "none"
          }
        }, n.getInputElement())] : [v];
      } else {
        var E,
          _ = [],
          k = i;
        if (void 0 !== l && i.length > l) {
          k = k.slice(0, l);
          var S = n.getVLForOnChange(i.slice(l, i.length)),
            C = "+ ".concat(i.length - l, " ...");
          d && (C = "function" === typeof d ? d(S) : d), E = r["createElement"]("li", Fe({
            style: ie
          }, ae, {
            role: "presentation",
            onMouseDown: te,
            className: "".concat(c, "-selection__choice ").concat(c, "-selection__choice__disabled"),
            key: "maxTagPlaceholder",
            title: H(C)
          }), r["createElement"]("div", {
            className: "".concat(c, "-selection__choice__content")
          }, C));
        }
        Q(a) && (_ = k.map(function (e) {
          var t = n.getOptionInfoBySingleValue(e),
            o = t.label,
            i = t.title || o;
          u && "string" === typeof o && o.length > u && (o = "".concat(o.slice(0, u), "..."));
          var a = n.isChildDisabled(e),
            s = a ? "".concat(c, "-selection__choice ").concat(c, "-selection__choice__disabled") : "".concat(c, "-selection__choice");
          return r["createElement"]("li", Fe({
            style: ie
          }, ae, {
            onMouseDown: te,
            className: s,
            role: "presentation",
            key: e || Ke,
            title: H(i)
          }), r["createElement"]("div", {
            className: "".concat(c, "-selection__choice__content")
          }, o), a ? null : r["createElement"]("span", {
            onClick: function (t) {
              n.removeSelected(e, t);
            },
            className: "".concat(c, "-selection__choice__remove")
          }, p || r["createElement"]("i", {
            className: "".concat(c, "-selection__choice__remove-icon")
          }, "\xd7")));
        })), E && _.push(E), _.push(r["createElement"]("li", {
          className: "".concat(c, "-search ").concat(c, "-search--inline"),
          key: "__input"
        }, n.getInputElement())), m = Q(a) && s ? r["createElement"](L["a"], {
          onLeave: n.onChoiceAnimationLeave,
          component: "ul",
          transitionName: s
        }, _) : r["createElement"]("ul", null, _);
      }
      return r["createElement"]("div", {
        className: h,
        ref: n.saveTopCtrlRef
      }, n.getPlaceholderElement(), m);
    };
    var o = t.getOptionsInfoFromProps(e);
    if (e.tags && "function" !== typeof e.filterOption) {
      var i = Object.keys(o).some(function (e) {
        return o[e].disabled;
      });
      V()(!i, "Please avoid setting option to disabled in tags mode since user can always type text as tag.");
    }
    return n.state = {
      value: t.getValueFromProps(e, !0),
      inputValue: e.combobox ? t.getInputValueForCombobox(e, o, !0) : "",
      open: e.defaultOpen,
      optionsInfo: o,
      backfillValue: "",
      skipBuildOptionsInfo: !0,
      ariaId: ""
    }, n.saveInputRef = pe(qe(n), "inputRef"), n.saveInputMirrorRef = pe(qe(n), "inputMirrorRef"), n.saveTopCtrlRef = pe(qe(n), "topCtrlRef"), n.saveSelectTriggerRef = pe(qe(n), "selectTriggerRef"), n.saveRootRef = pe(qe(n), "rootRef"), n.saveSelectionRef = pe(qe(n), "selectionRef"), n;
  }
  return He(t, e), Be(t, [{
    key: "componentDidMount",
    value: function () {
      (this.props.autoFocus || this.state.open) && this.focus(), this.setState({
        ariaId: de()
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      if (Q(this.props)) {
        var e = this.getInputDOMNode(),
          t = this.getInputMirrorDOMNode();
        e && e.value && t ? (e.style.width = "", e.style.width = "".concat(t.clientWidth, "px")) : e && (e.style.width = "");
      }
      this.forcePopupAlign();
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.clearFocusTime(), this.clearBlurTime(), this.clearComboboxTime(), this.dropdownContainer && (I["unmountComponentAtNode"](this.dropdownContainer), document.body.removeChild(this.dropdownContainer), this.dropdownContainer = null);
    }
  }, {
    key: "focus",
    value: function () {
      J(this.props) && this.selectionRef ? this.selectionRef.focus() : this.getInputDOMNode() && this.getInputDOMNode().focus();
    }
  }, {
    key: "blur",
    value: function () {
      J(this.props) && this.selectionRef ? this.selectionRef.blur() : this.getInputDOMNode() && this.getInputDOMNode().blur();
    }
  }, {
    key: "renderArrow",
    value: function (e) {
      var t = this.props,
        n = t.showArrow,
        o = void 0 === n ? !e : n,
        i = t.loading,
        a = t.inputIcon,
        s = t.prefixCls;
      if (!o && !i) return null;
      var c = i ? r["createElement"]("i", {
        className: "".concat(s, "-arrow-loading")
      }) : r["createElement"]("i", {
        className: "".concat(s, "-arrow-icon")
      });
      return r["createElement"]("span", Fe({
        key: "arrow",
        className: "".concat(s, "-arrow"),
        style: ie
      }, ae, {
        onClick: this.onArrowClick
      }), a || c);
    }
  }, {
    key: "renderClear",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.allowClear,
        o = e.clearIcon,
        i = this.state.inputValue,
        a = this.state.value,
        s = r["createElement"]("span", Fe({
          key: "clear",
          className: "".concat(t, "-selection__clear"),
          onMouseDown: te,
          style: ie
        }, ae, {
          onClick: this.onClearSelection
        }), o || r["createElement"]("i", {
          className: "".concat(t, "-selection__clear-icon")
        }, "\xd7"));
      return n ? Z(this.props) ? i ? s : null : i || a.length ? s : null : null;
    }
  }, {
    key: "render",
    value: function () {
      var e,
        t = this.props,
        n = Q(t),
        o = t.showArrow,
        i = void 0 === o || o,
        a = this.state,
        s = t.className,
        c = t.disabled,
        u = t.prefixCls,
        l = t.loading,
        f = this.renderTopControlNode(),
        p = this.state,
        d = p.open,
        h = p.ariaId;
      if (d) {
        var m = this.renderFilterOptions();
        this._empty = m.empty, this._options = m.options;
      }
      var v = this.getRealOpenState(),
        y = this._empty,
        g = this._options || [],
        b = {};
      Object.keys(t).forEach(function (e) {
        !Object.prototype.hasOwnProperty.call(t, e) || "data-" !== e.substr(0, 5) && "aria-" !== e.substr(0, 5) && "role" !== e || (b[e] = t[e]);
      });
      var w = Fe({}, b);
      X(t) || (w = Fe(Fe({}, w), {
        onKeyDown: this.onKeyDown,
        tabIndex: t.disabled ? -1 : t.tabIndex
      }));
      var x = (e = {}, Re(e, s, !!s), Re(e, u, 1), Re(e, "".concat(u, "-open"), d), Re(e, "".concat(u, "-focused"), d || !!this._focused), Re(e, "".concat(u, "-combobox"), Z(t)), Re(e, "".concat(u, "-disabled"), c), Re(e, "".concat(u, "-enabled"), !c), Re(e, "".concat(u, "-allow-clear"), !!t.allowClear), Re(e, "".concat(u, "-no-arrow"), !i), Re(e, "".concat(u, "-loading"), !!l), e);
      return r["createElement"](Ie, {
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
        options: g,
        empty: y,
        multiple: n,
        disabled: c,
        visible: v,
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
        ariaId: h
      }, r["createElement"]("div", {
        id: t.id,
        style: t.style,
        ref: this.saveRootRef,
        onBlur: this.onOuterBlur,
        onFocus: this.onOuterFocus,
        className: j()(x),
        onMouseDown: this.markMouseDown,
        onMouseUp: this.markMouseLeave,
        onMouseOut: this.markMouseLeave
      }, r["createElement"]("div", Fe({
        ref: this.saveSelectionRef,
        key: "selection",
        className: "".concat(u, "-selection\n            ").concat(u, "-selection--").concat(n ? "multiple" : "single"),
        role: "combobox",
        "aria-autocomplete": "list",
        "aria-haspopup": "true",
        "aria-controls": h,
        "aria-expanded": v
      }, w), f, this.renderClear(), this.renderArrow(!!n))));
    }
  }]), t;
}(r["Component"]);
Xe.propTypes = S, Xe.defaultProps = {
  prefixCls: "rc-select",
  defaultOpen: !1,
  labelInValue: !1,
  defaultActiveFirstOption: !0,
  showSearch: !0,
  allowClear: !1,
  placeholder: "",
  onChange: Ze,
  onFocus: Ze,
  onBlur: Ze,
  onSelect: Ze,
  onSearch: Ze,
  onDeselect: Ze,
  onInputKeyDown: Ze,
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
}, Xe.getDerivedStateFromProps = function (e, t) {
  var n = t.skipBuildOptionsInfo ? t.optionsInfo : Xe.getOptionsInfoFromProps(e, t),
    r = {
      optionsInfo: n,
      skipBuildOptionsInfo: !1
    };
  if ("open" in e && (r.open = e.open), e.disabled && t.open && (r.open = !1), "value" in e) {
    var o = Xe.getValueFromProps(e);
    r.value = o, e.combobox && (r.inputValue = Xe.getInputValueForCombobox(e, n));
  }
  return r;
}, Xe.getOptionsFromChildren = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
  return r["Children"].forEach(e, function (e) {
    if (e) {
      var n = e.type;
      n.isSelectOptGroup ? Xe.getOptionsFromChildren(e.props.children, t) : t.push(e);
    }
  }), t;
}, Xe.getInputValueForCombobox = function (e, t, n) {
  var r = [];
  if ("value" in e && !n && (r = $(e.value)), "defaultValue" in e && n && (r = $(e.defaultValue)), !r.length) return "";
  r = r[0];
  var o = r;
  return e.labelInValue ? o = r.label : t[ee(r)] && (o = t[ee(r)].label), void 0 === o && (o = ""), o;
}, Xe.getLabelFromOption = function (e, t) {
  return G(t, e.optionLabelProp);
}, Xe.getOptionsInfoFromProps = function (e, t) {
  var n = Xe.getOptionsFromChildren(e.children),
    r = {};
  if (n.forEach(function (t) {
    var n = Y(t);
    r[ee(n)] = {
      option: t,
      value: n,
      label: Xe.getLabelFromOption(e, t),
      title: t.props.title,
      disabled: t.props.disabled
    };
  }), t) {
    var o = t.optionsInfo,
      i = t.value;
    i && i.forEach(function (e) {
      var t = ee(e);
      r[t] || void 0 === o[t] || (r[t] = o[t]);
    });
  }
  return r;
}, Xe.getValueFromProps = function (e, t) {
  var n = [];
  return "value" in e && !t && (n = $(e.value)), "defaultValue" in e && t && (n = $(e.defaultValue)), e.labelInValue && (n = n.map(function (e) {
    return e.key;
  })), n;
}, Xe.displayName = "Select", Object(R["polyfill"])(Xe);
var Je = Xe;
defineExport(legacyExports, "b", function () {
  return b;
}), defineExport(legacyExports, "a", function () {
  return f;
}), Je.Option = b, Je.OptGroup = f;
legacyExports["c"] = Je;
