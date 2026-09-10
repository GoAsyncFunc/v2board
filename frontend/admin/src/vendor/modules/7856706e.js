let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./54345547.js"),
  i = require("./62597459.js"),
  o = require("./446c4136.js"),
  a = require("./792b5674.js"),
  s = require("./33736f46.js"),
  l = require("./4e433138.js");
function u(e) {
  return Object(i["r"])(e[0]);
}
function c(e, t) {
  for (var n = [], r = e.length, i = 0; i < r; i++) n.push({
    one: e[i],
    many: []
  });
  for (i = 0; i < t.length; i++) {
    var o = t[i].length,
      a = void 0;
    for (a = 0; a < o; a++) n[a % r].many.push(t[i][a]);
  }
  var s = 0;
  for (i = r - 1; i >= 0; i--) if (!n[i].many.length) {
    var l = n[s].many;
    if (l.length <= 1) {
      if (!s) return n;
      s = 0;
    }
    o = l.length;
    var u = Math.ceil(o / 2);
    n[i].many = l.slice(u, o), n[s].many = l.slice(0, u), s++;
  }
  return n;
}
var f = {
  clone: function (e) {
    for (var t = [], n = 1 - Math.pow(1 - e.path.style.opacity, 1 / e.count), r = 0; r < e.count; r++) {
      var i = Object(l["a"])(e.path);
      i.setStyle("opacity", n), t.push(i);
    }
    return t;
  },
  split: null
};
function d(e, t, n, r, a, l) {
  if (e.length && t.length) {
    var d = Object(s["a"])("update", r, a);
    if (d && d.duration > 0) {
      var h,
        p,
        g = r.getModel("universalTransition").get("delay"),
        m = Object.assign({
          setToFinal: !0
        }, d);
      u(e) && (h = e, p = t), u(t) && (h = t, p = e);
      for (var v = h ? h === e : e.length > t.length, y = h ? c(p, h) : c(v ? t : e, [v ? e : t]), b = 0, x = 0; x < y.length; x++) b += y[x].many.length;
      var _ = 0;
      for (x = 0; x < y.length; x++) w(y[x], v, _, b), _ += y[x].many.length;
    }
  }
  function w(e, t, r, a, s) {
    var u = e.many,
      c = e.one;
    if (1 !== u.length || s) for (var d = Object(i["i"])({
        dividePath: f[n],
        individualDelay: g && function (e, t, n, i) {
          return g(e + r, a);
        }
      }, m), h = t ? Object(o["a"])(u, c, d) : Object(o["d"])(c, u, d), p = h.fromIndividuals, v = h.toIndividuals, y = p.length, b = 0; b < y; b++) {
      O = g ? Object(i["i"])({
        delay: g(b, y)
      }, m) : m;
      l(p[b], v[b], t ? u[b] : e.one, t ? e.one : u[b], O);
    } else {
      var x = t ? u[0] : c,
        _ = t ? c : u[0];
      if (Object(o["b"])(x)) w({
        many: [x],
        one: _
      }, !0, r, a, !0);else {
        var O = g ? Object(i["i"])({
          delay: g(r, a)
        }, m) : m;
        Object(o["c"])(x, _, O), l(x, _, x, _, O);
      }
    }
  }
}
function h(e) {
  if (!e) return [];
  if (Object(i["r"])(e)) {
    for (var t = [], n = 0; n < e.length; n++) t.push(h(e[n]));
    return t;
  }
  var r = [];
  return e.traverse(function (e) {
    e instanceof a["b"] && !e.disableMorphing && !e.invisible && !e.ignore && r.push(e);
  }), r;
}
var p = require("./6750416f.js"),
  g = require("./344e4f34.js"),
  m = (require("./37613470.js"), require("./47657637.js"));
defineExport(legacyExports, "a", function () {
  return E;
});
var v = 1e4,
  y = Object(g["m"])();
function b(e) {
  for (var t = e.dimensions, n = 0; n < t.length; n++) {
    var r = e.getDimensionInfo(t[n]);
    if (r && 0 === r.otherDims.itemGroupId) return t[n];
  }
}
function x(e) {
  var t = [];
  return Object(i["j"])(e, function (e) {
    var n = e.data;
    if (!(n.count() > v)) for (var r = n.getIndices(), i = b(n), o = 0; o < r.length; o++) t.push({
      data: n,
      dim: e.dim || i,
      divide: e.divide,
      dataIndex: o
    });
  }), t;
}
function _(e, t, n) {
  e.traverse(function (e) {
    e instanceof a["b"] && Object(s["c"])(e, {
      style: {
        opacity: 0
      }
    }, t, {
      dataIndex: n,
      isFrom: !0
    });
  });
}
function w(e) {
  if (e.parent) {
    var t = e.getComputedTransform();
    e.setLocalTransform(t), e.parent.remove(e);
  }
}
function O(e) {
  e.stopAnimation(), e.isGroup && e.traverse(function (e) {
    e.stopAnimation();
  });
}
function S(e, t, n) {
  var r = Object(s["a"])("update", n, t);
  r && e.traverse(function (e) {
    if (e instanceof m["c"]) {
      var t = Object(s["b"])(e);
      t && e.animateFrom({
        style: t
      }, r);
    }
  });
}
function k(e, t) {
  var n = e.length;
  if (n !== t.length) return !1;
  for (var r = 0; r < n; r++) {
    var i = e[r],
      o = t[r];
    if (i.data.getId(i.dataIndex) !== o.data.getId(o.dataIndex)) return !1;
  }
  return !0;
}
function j(e, t, n) {
  var r = x(e),
    o = x(t);
  function l(e, t, n, r, o) {
    (n || e) && t.animateFrom({
      style: n && n !== e ? Object(i["l"])(Object(i["l"])({}, n.style), e.style) : e.style
    }, o);
  }
  function u(e) {
    for (var t = 0; t < e.length; t++) if (e[t].dim) return e[t].dim;
  }
  var c = u(r),
    f = u(o),
    g = !1;
  function m(e, t) {
    return function (n) {
      var r = n.data,
        i = n.dataIndex;
      if (t) return r.getId(i);
      var o = r.hostModel && r.hostModel.get("dataGroupId"),
        a = e ? c || f : f || c,
        s = a && r.getDimensionInfo(a),
        l = s && s.ordinalMeta;
      if (s) {
        var u = r.get(s.name, i);
        return l && l.categories[u] || u + "";
      }
      var d = r.getRawDataItem(i);
      return d && d.groupId ? d.groupId + "" : o || r.getId(i);
    };
  }
  var v = k(r, o),
    y = {};
  if (!v) for (var b = 0; b < o.length; b++) {
    var j = o[b],
      M = j.data.getItemGraphicEl(j.dataIndex);
    M && (y[M.id] = !0);
  }
  function C(e, t) {
    var n = r[t],
      i = o[e],
      a = i.data.hostModel,
      s = n.data.getItemGraphicEl(n.dataIndex),
      u = i.data.getItemGraphicEl(i.dataIndex);
    s !== u ? s && y[s.id] || u && (O(u), s ? (O(s), w(s), g = !0, d(h(s), h(u), i.divide, a, e, l)) : _(u, a, e)) : u && S(u, i.dataIndex, a);
  }
  new p["a"](r, o, m(!0, v), m(!1, v), null, "multiple").update(C).updateManyToOne(function (e, t) {
    var n = o[e],
      a = n.data,
      s = a.hostModel,
      u = a.getItemGraphicEl(n.dataIndex),
      c = Object(i["m"])(Object(i["D"])(t, function (e) {
        return r[e].data.getItemGraphicEl(r[e].dataIndex);
      }), function (e) {
        return e && e !== u && !y[e.id];
      });
    u && (O(u), c.length ? (Object(i["j"])(c, function (e) {
      O(e), w(e);
    }), g = !0, d(h(c), h(u), n.divide, s, e, l)) : _(u, s, n.dataIndex));
  }).updateOneToMany(function (e, t) {
    var n = r[t],
      a = n.data.getItemGraphicEl(n.dataIndex);
    if (!a || !y[a.id]) {
      var s = Object(i["m"])(Object(i["D"])(e, function (e) {
          return o[e].data.getItemGraphicEl(o[e].dataIndex);
        }), function (e) {
          return e && e !== a;
        }),
        u = o[e[0]].data.hostModel;
      s.length && (Object(i["j"])(s, function (e) {
        return O(e);
      }), a ? (O(a), w(a), g = !0, d(h(a), h(s), n.divide, u, e[0], l)) : Object(i["j"])(s, function (t) {
        return _(t, u, e[0]);
      }));
    }
  }).updateManyToMany(function (e, t) {
    new p["a"](t, e, function (e) {
      return r[e].data.getId(r[e].dataIndex);
    }, function (e) {
      return o[e].data.getId(o[e].dataIndex);
    }).update(function (n, r) {
      C(e[n], t[r]);
    }).execute();
  }).execute(), g && Object(i["j"])(t, function (e) {
    var t = e.data,
      r = t.hostModel,
      i = r && n.getViewOfSeriesModel(r),
      o = Object(s["a"])("update", r, 0);
    i && r.isAnimationEnabled() && o && o.duration > 0 && i.group.traverse(function (e) {
      e instanceof a["b"] && !e.animators.length && e.animateFrom({
        style: {
          opacity: 0
        }
      }, o);
    });
  });
}
function M(e) {
  var t = e.getModel("universalTransition").get("seriesKey");
  return t || e.id;
}
function C(e) {
  return Object(i["r"])(e) ? e.sort().join(",") : e;
}
function T(e) {
  if (e.hostModel) return e.hostModel.getModel("universalTransition").get("divideShape");
}
function I(e, t) {
  var n = Object(i["f"])(),
    r = Object(i["f"])(),
    o = Object(i["f"])();
  return Object(i["j"])(e.oldSeries, function (t, n) {
    var a = e.oldData[n],
      s = M(t),
      l = C(s);
    r.set(l, a), Object(i["r"])(s) && Object(i["j"])(s, function (e) {
      o.set(e, {
        data: a,
        key: l
      });
    });
  }), Object(i["j"])(t.updatedSeries, function (e) {
    if (e.isUniversalTransitionEnabled() && e.isAnimationEnabled()) {
      var t = e.getData(),
        a = M(e),
        s = C(a),
        l = r.get(s);
      if (l) n.set(s, {
        oldSeries: [{
          divide: T(l),
          data: l
        }],
        newSeries: [{
          divide: T(t),
          data: t
        }]
      });else if (Object(i["r"])(a)) {
        0;
        var u = [];
        Object(i["j"])(a, function (e) {
          var t = r.get(e);
          t && u.push({
            divide: T(t),
            data: t
          });
        }), u.length && n.set(s, {
          oldSeries: u,
          newSeries: [{
            data: t,
            divide: T(t)
          }]
        });
      } else {
        var c = o.get(a);
        if (c) {
          var f = n.get(c.key);
          f || (f = {
            oldSeries: [{
              data: c.data,
              divide: T(c.data)
            }],
            newSeries: []
          }, n.set(c.key, f)), f.newSeries.push({
            data: t,
            divide: T(t)
          });
        }
      }
    }
  }), n;
}
function D(e, t) {
  for (var n = 0; n < e.length; n++) {
    var r = null != t.seriesIndex && t.seriesIndex === e[n].seriesIndex || null != t.seriesId && t.seriesId === e[n].id;
    if (r) return n;
  }
}
function A(e, t, n, r) {
  var o = [],
    a = [];
  Object(i["j"])(Object(g["p"])(e.from), function (e) {
    var n = D(t.oldSeries, e);
    n >= 0 && o.push({
      data: t.oldData[n],
      divide: T(t.oldData[n]),
      dim: e.dimension
    });
  }), Object(i["j"])(Object(g["p"])(e.to), function (e) {
    var t = D(n.updatedSeries, e);
    if (t >= 0) {
      var r = n.updatedSeries[t].getData();
      a.push({
        data: r,
        divide: T(r),
        dim: e.dimension
      });
    }
  }), o.length > 0 && a.length > 0 && j(o, a, r);
}
function E(e) {
  e.registerUpdateLifecycle("series:beforeupdate", function (e, t, n) {
    Object(i["j"])(Object(g["p"])(n.seriesTransition), function (e) {
      Object(i["j"])(Object(g["p"])(e.to), function (e) {
        for (var t = n.updatedSeries, i = 0; i < t.length; i++) (null != e.seriesIndex && e.seriesIndex === t[i].seriesIndex || null != e.seriesId && e.seriesId === t[i].id) && (t[i][r["a"]] = !0);
      });
    });
  }), e.registerUpdateLifecycle("series:transition", function (e, t, n) {
    var o = y(t);
    if (o.oldSeries && n.updatedSeries && n.optionChanged) {
      var a = n.seriesTransition;
      if (a) Object(i["j"])(Object(g["p"])(a), function (e) {
        A(e, o, n, t);
      });else {
        var s = I(o, n);
        Object(i["j"])(s.keys(), function (e) {
          var n = s.get(e);
          j(n.oldSeries, n.newSeries, t);
        });
      }
      Object(i["j"])(n.updatedSeries, function (e) {
        e[r["a"]] && (e[r["a"]] = !1);
      });
    }
    for (var l = e.getSeries(), u = o.oldSeries = [], c = o.oldData = [], f = 0; f < l.length; f++) {
      var d = l[f].getData();
      d.count() < v && (u.push(l[f]), c.push(d));
    }
  });
}
