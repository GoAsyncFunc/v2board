let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./classCallCheck.js"),
  i = interopDefault(r),
  o = require("./possibleConstructorReturn.js"),
  a = interopDefault(o),
  s = require("./6d526730.js"),
  l = interopDefault(s),
  c = require("./reactRuntime.js"),
  u = interopDefault(c),
  h = {
    DATE_ROW_COUNT: 6,
    DATE_COL_COUNT: 7
  },
  f = require("./momentRuntime.js"),
  d = interopDefault(f),
  p = function (e) {
    function t() {
      return i()(this, t), a()(this, e.apply(this, arguments));
    }
    return l()(t, e), t.prototype.render = function () {
      for (var e = this.props, t = e.value, n = t.localeData(), r = e.prefixCls, i = [], o = [], a = n.firstDayOfWeek(), s = void 0, l = d()(), c = 0; c < h.DATE_COL_COUNT; c++) {
        var f = (a + c) % h.DATE_COL_COUNT;
        l.day(f), i[c] = n.weekdaysMin(l), o[c] = n.weekdaysShort(l);
      }
      e.showWeekNumber && (s = u.a.createElement("th", {
        role: "columnheader",
        className: r + "-column-header " + r + "-week-number-header"
      }, u.a.createElement("span", {
        className: r + "-column-header-inner"
      }, "x")));
      var p = o.map(function (e, t) {
        return u.a.createElement("th", {
          key: t,
          role: "columnheader",
          title: e,
          className: r + "-column-header"
        }, u.a.createElement("span", {
          className: r + "-column-header-inner"
        }, i[t]));
      });
      return u.a.createElement("thead", null, u.a.createElement("tr", {
        role: "row"
      }, s, p));
    }, t;
  }(u.a.Component),
  m = p,
  g = require("./propTypesRuntime.js"),
  v = interopDefault(g),
  y = require("./classNames.js"),
  b = interopDefault(y),
  w = require("./47727448.js");
function x(e, t) {
  return e && t && e.isSame(t, "day");
}
function _(e, t) {
  return e.year() < t.year() ? 1 : e.year() === t.year() && e.month() < t.month();
}
function E(e, t) {
  return e.year() > t.year() ? 1 : e.year() === t.year() && e.month() > t.month();
}
function S(e) {
  return "rc-calendar-" + e.year() + "-" + e.month() + "-" + e.date();
}
var k = function (e) {
  function t() {
    return i()(this, t), a()(this, e.apply(this, arguments));
  }
  return l()(t, e), t.prototype.render = function () {
    var e = this.props,
      t = e.contentRender,
      n = e.prefixCls,
      r = e.selectedValue,
      i = e.value,
      o = e.showWeekNumber,
      a = e.dateRender,
      s = e.disabledDate,
      l = e.hoverValue,
      c = void 0,
      f = void 0,
      d = void 0,
      p = [],
      m = Object(w["e"])(i),
      g = n + "-cell",
      v = n + "-week-number-cell",
      y = n + "-date",
      k = n + "-today",
      C = n + "-selected-day",
      O = n + "-selected-date",
      T = n + "-selected-start-date",
      L = n + "-selected-end-date",
      A = n + "-in-range-cell",
      P = n + "-last-month-cell",
      j = n + "-next-month-btn-day",
      M = n + "-disabled-cell",
      R = n + "-disabled-cell-first-of-row",
      N = n + "-disabled-cell-last-of-row",
      D = n + "-last-day-of-month",
      I = i.clone();
    I.date(1);
    var $ = I.day(),
      F = ($ + 7 - i.localeData().firstDayOfWeek()) % 7,
      B = I.clone();
    B.add(0 - F, "days");
    var V = 0;
    for (c = 0; c < h.DATE_ROW_COUNT; c++) for (f = 0; f < h.DATE_COL_COUNT; f++) d = B, V && (d = d.clone(), d.add(V, "days")), p.push(d), V++;
    var W = [];
    for (V = 0, c = 0; c < h.DATE_ROW_COUNT; c++) {
      var H,
        U = void 0,
        z = void 0,
        G = !1,
        q = [];
      for (o && (z = u.a.createElement("td", {
        key: p[V].week(),
        role: "gridcell",
        className: v
      }, p[V].week())), f = 0; f < h.DATE_COL_COUNT; f++) {
        var K = null,
          Y = null;
        d = p[V], f < h.DATE_COL_COUNT - 1 && (K = p[V + 1]), f > 0 && (Y = p[V - 1]);
        var X = g,
          Q = !1,
          Z = !1;
        x(d, m) && (X += " " + k, U = !0);
        var J = _(d, i),
          ee = E(d, i);
        if (r && Array.isArray(r)) {
          var te = l.length ? l : r;
          if (!J && !ee) {
            var ne = te[0],
              re = te[1];
            ne && x(d, ne) && (Z = !0, G = !0, X += " " + T), (ne || re) && (x(d, re) ? (Z = !0, G = !0, X += " " + L) : (null !== ne && void 0 !== ne || !d.isBefore(re, "day")) && (null !== re && void 0 !== re || !d.isAfter(ne, "day")) ? d.isAfter(ne, "day") && d.isBefore(re, "day") && (X += " " + A) : X += " " + A);
          }
        } else x(d, i) && (Z = !0, G = !0);
        x(d, r) && (X += " " + O), J && (X += " " + P), ee && (X += " " + j), d.clone().endOf("month").date() === d.date() && (X += " " + D), s && s(d, i) && (Q = !0, Y && s(Y, i) || (X += " " + R), K && s(K, i) || (X += " " + N)), Z && (X += " " + C), Q && (X += " " + M);
        var ie = void 0;
        if (a) ie = a(d, i);else {
          var oe = t ? t(d, i) : d.date();
          ie = u.a.createElement("div", {
            key: S(d),
            className: y,
            "aria-selected": Z,
            "aria-disabled": Q
          }, oe);
        }
        q.push(u.a.createElement("td", {
          key: V,
          onClick: Q ? void 0 : e.onSelect.bind(null, d),
          onMouseEnter: Q ? void 0 : e.onDayHover && e.onDayHover.bind(null, d) || void 0,
          role: "gridcell",
          title: Object(w["d"])(d),
          className: X
        }, ie)), V++;
      }
      W.push(u.a.createElement("tr", {
        key: c,
        role: "row",
        className: b()((H = {}, H[n + "-current-week"] = U, H[n + "-active-week"] = G, H))
      }, z, q));
    }
    return u.a.createElement("tbody", {
      className: n + "-tbody"
    }, W);
  }, t;
}(u.a.Component);
k.propTypes = {
  contentRender: v.a.func,
  dateRender: v.a.func,
  disabledDate: v.a.func,
  prefixCls: v.a.string,
  selectedValue: v.a.oneOfType([v.a.object, v.a.arrayOf(v.a.object)]),
  value: v.a.object,
  hoverValue: v.a.any,
  showWeekNumber: v.a.bool
}, k.defaultProps = {
  hoverValue: []
};
var C = k,
  O = function (e) {
    function t() {
      return i()(this, t), a()(this, e.apply(this, arguments));
    }
    return l()(t, e), t.prototype.render = function () {
      var e = this.props,
        t = e.prefixCls;
      return u.a.createElement("table", {
        className: t + "-table",
        cellSpacing: "0",
        role: "grid"
      }, u.a.createElement(m, e), u.a.createElement(C, e));
    }, t;
  }(u.a.Component);
legacyExports["a"] = O;
